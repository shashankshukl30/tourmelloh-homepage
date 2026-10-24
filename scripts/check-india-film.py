"""Verify final encoded India hero films; no browser, source edits, or parallel media jobs.

Adapted from research/media/hero-film/check-hero.py. Checks actual decoded media,
not encoder logs. Low motion is measured but is never called a freeze: exact
full-resolution decoded frame hashes identify repeated-frame runs separately.
Run after the sequential render has finished: python scripts/check-india-film.py
"""
from datetime import datetime, timezone
from fractions import Fraction
import hashlib
import json
from pathlib import Path
import struct
import subprocess

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "evidence/india-film"
MANIFEST = ROOT / "research/india-film-edit.json"


def sample_times(edit):
    duration = edit["durationSeconds"]
    section = duration / len(edit["scenes"])
    return [0, section / 2, section - .5, section * 1.5,
            section * 2 - .5, section * 2.5, section * 3 - .5,
            section * 3.5, duration - .5, round(duration - 1 / edit["fps"], 3)]


def ffmpeg(path, *options):
    return subprocess.check_output([
        "ffmpeg", "-v", "error", "-threads", "3", "-i", str(path),
        "-an", "-sn", "-dn", "-filter_threads", "1", *options,
        "-threads", "3", "pipe:1",
    ])


def atoms(path):
    result = []
    total = path.stat().st_size
    with path.open("rb") as stream:
        offset = 0
        while offset + 8 <= total:
            stream.seek(offset)
            size, tag = struct.unpack(">I4s", stream.read(8))
            if size == 1:
                size = struct.unpack(">Q", stream.read(8))[0]
            elif size == 0:
                size = total - offset
            if size < 8 or offset + size > total:
                raise ValueError(f"Invalid MP4 atom at {offset}: {size}")
            result.append({"type": tag.decode("ascii", errors="replace"), "offset": offset, "size": size})
            offset += size
    return result


def repeated_runs(hashes, fps):
    result, start = [], 0
    for index in range(1, len(hashes) + 1):
        if index < len(hashes) and hashes[index] == hashes[index - 1]:
            continue
        count = index - start
        if count > 1:
            result.append({"firstFrame": start, "lastFrame": index - 1,
                           "frames": count, "seconds": count / fps})
        start = index
    return result


def label(second, edit):
    scenes = edit["scenes"]
    section = edit["durationSeconds"] / len(scenes)
    index = min(len(scenes) - 1, int(second // section))
    scene = scenes[index]
    if second % section >= section - edit["dissolveSeconds"]:
        next_scene = scenes[(index + 1) % len(scenes)]
        suffix = "loop dissolve" if index == len(scenes) - 1 else "dissolve"
        return f"{scene['place']} > {next_scene['place']} / {suffix}"
    return f"{scene['place']} / {scene['landmark']}"


def sheet(path, portrait, fps, total_frames, edit):
    times = sample_times(edit)
    width, height = (216, 384) if portrait else (480, 270)
    indices = [min(total_frames - 1, round(t * fps)) for t in times]
    selector = "+".join(f"eq(n,{n})" for n in indices)
    raw = ffmpeg(path, "-vf", f"select='{selector}',scale={width}:{height}",
                 "-fps_mode", "vfr", "-pix_fmt", "rgb24", "-f", "rawvideo")
    frames = np.frombuffer(raw, dtype=np.uint8).reshape(-1, height, width, 3)
    if len(frames) != len(times):
        raise AssertionError(f"Expected {len(times)} contact frames, got {len(frames)}")
    label_height = 49
    output = Image.new("RGB", (width * 5, (height + label_height) * 2), "#f6f2e9")
    draw = ImageDraw.Draw(output)
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 12 if portrait else 16)
    except OSError:
        font = ImageFont.load_default()
    for index, frame in enumerate(frames):
        x = (index % 5) * width
        y = (index // 5) * (height + label_height)
        draw.text((x + 7, y + 4), f"{times[index]:.3f}s / frame {indices[index]}", font=font, fill="#183f32")
        draw.text((x + 7, y + 25), label(times[index], edit), font=font, fill="#183f32")
        output.paste(Image.fromarray(frame), (x, y + label_height))
    target = OUTPUT / f"encoded-{'mobile' if portrait else 'desktop'}-contact-sheet.jpg"
    output.save(target, quality=94)
    return str(target.relative_to(ROOT)).replace("\\", "/")


def inspect(path, portrait, edit):
    fps = edit["fps"]
    expected_frames = round(edit["durationSeconds"] * fps)
    probe = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration,size:stream=codec_type,codec_name,profile,level,width,height,r_frame_rate,avg_frame_rate,nb_frames,pix_fmt,duration",
        "-of", "json", str(path),
    ]))
    video = next(s for s in probe["streams"] if s["codec_type"] == "video")
    width, height = (180, 320) if portrait else (320, 180)
    raw = ffmpeg(path, "-vf", f"scale={width}:{height}", "-pix_fmt", "gray", "-f", "rawvideo")
    frames = np.frombuffer(raw, dtype=np.uint8).reshape(-1, height, width).astype(np.float32)
    changes = np.abs(frames[1:] - frames[:-1]).mean(axis=(1, 2))
    means = frames.mean(axis=(1, 2))
    black_pixels = (frames <= 10).mean(axis=(1, 2))
    black = np.flatnonzero((means < 4) & (black_pixels > .99)).tolist()
    seam = float(np.abs(frames[-1] - frames[0]).mean())
    edge_changes = np.concatenate((changes[:12], changes[-12:]))
    edge_p95 = float(np.percentile(edge_changes, 95))
    # Allow a small absolute floor for nearly static encodes; report every metric.
    # A loop seam must not be a disproportionate jump vs adjacent edge frames.
    seam_limit = max(.75, edge_p95 * 2.5)
    hashes = [line.rsplit(",", 1)[1].strip() for line in
              ffmpeg(path, "-f", "framemd5").decode("utf-8").splitlines()
              if line and not line.startswith("#")]
    runs = repeated_runs(hashes, fps)
    frozen = [run for run in runs if run["seconds"] >= 1]
    boxes = atoms(path)
    positions = {item["type"]: item["offset"] for item in boxes}
    dimensions = [720, 1280] if portrait else [1920, 1080]
    checks = {
        "matchesManifestDuration": abs(float(probe["format"]["duration"]) - edit["durationSeconds"]) < .001,
        "decodedFrameCountMatchesManifest": len(frames) == expected_frames == len(hashes),
        "declaredFrameCountMatchesManifest": int(video.get("nb_frames", 0)) == expected_frames,
        "h264": video["codec_name"] == "h264",
        "mainProfile": video["profile"] == "Main",
        "compatibleLevel": video["level"] == (31 if portrait else 40),
        "yuv420p": video["pix_fmt"] == "yuv420p",
        "matchesManifestFps": float(Fraction(video["r_frame_rate"])) == fps,
        "correctDimensions": [video["width"], video["height"]] == dimensions,
        "silent": not any(s["codec_type"] == "audio" for s in probe["streams"]),
        "noBlackFrames": not black,
        "noFrozenRunsOfOneSecond": not frozen,
        "loopSeamComparableToAdjacentFrames": seam <= seam_limit,
        "fastStartMoovBeforeMdat": "moov" in positions and "mdat" in positions and positions["moov"] < positions["mdat"],
    }
    return {
        "path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "bytes": path.stat().st_size, "probe": probe, "decodedFrames": len(frames),
        "expected": {"durationSeconds": edit["durationSeconds"], "fps": fps,
                     "frames": expected_frames, "profile": "Main", "level": 31 if portrait else 40},
        "analysisResolution": [width, height],
        "luma": {"minimumMean": float(means.min()), "blackFrames": black},
        "motion": {"minimumAdjacentChange": float(changes.min()),
                   "medianAdjacentChange": float(np.median(changes)),
                   "maximumAdjacentChange": float(changes.max()),
                   "lowMotionPairsBelow0_05": int(np.sum(changes < .05)),
                   "exactRepeatedFrameRuns": runs, "frozenRunsOfOneSecond": frozen,
                   "note": "Low-motion differences do not fail. Repetition is measured with full-resolution decoded frame MD5; runs under1second remain informational."},
        "loop": {"lastToFirstMeanDifference": seam,
                 "edgeAdjacentMedian": float(np.median(edge_changes)),
                 "edgeAdjacentP95": edge_p95, "edgeAdjacentMaximum": float(edge_changes.max()),
                 "comparisonLimit": seam_limit, "seamToEdgeP95Ratio": seam / max(edge_p95, 1e-6)},
        "mp4Atoms": boxes, "contactSheet": sheet(path, portrait, fps, len(frames), edit),
        "checks": checks, "passed": all(checks.values()),
    }


def main():
    edit = json.loads(MANIFEST.read_text(encoding="utf-8"))
    assert edit["durationSeconds"] > 0 and edit["fps"] > 0 and len(edit["scenes"]) == 4
    OUTPUT.mkdir(parents=True, exist_ok=True)
    report = {"startedAt": datetime.now(timezone.utc).isoformat(),
              "manifest": str(MANIFEST.relative_to(ROOT)).replace("\\", "/"),
              "sampleTimes": sample_times(edit), "files": [], "visualReview": "pending"}
    for portrait in [False, True]:
        path = ROOT / f"public/videos/india-{'mobile' if portrait else 'desktop'}.mp4"
        result = inspect(path, portrait, edit)
        report["files"].append(result)
        print(json.dumps({"path": result["path"], "checks": result["checks"], "loop": result["loop"]}), flush=True)
    report["finishedAt"] = datetime.now(timezone.utc).isoformat()
    report["passed"] = all(item["passed"] for item in report["files"])
    (OUTPUT / "encoded-verification.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"passed": report["passed"], "files": len(report["files"])}), flush=True)
    raise SystemExit(0 if report["passed"] else 1)


if __name__ == "__main__":
    main()
