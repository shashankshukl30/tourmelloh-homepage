"""Rebuild the four-place hero loop from licensed source footage, sequentially on CPU.

Usage: python scripts/build-india-film.py --storyboard
       python scripts/build-india-film.py --render
The edit manifest is the source of truth for source in-points and crop positions.
"""
from pathlib import Path
import argparse
import hashlib
import io
import json
import subprocess
import sys

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "research/india-film-edit.json"
EVIDENCE = ROOT / "evidence/india-film"
LOCK = Path("D:/Digiocular/Motion-Lab/tools/renderlock.py")
FPS = 24


def run(command):
    subprocess.run([sys.executable, str(LOCK), "--label", "tourmelloh-india", "--", *command], check=True)


def framing(scene, portrait):
    width, height = (720, 1280) if portrait else (1920, 1080)
    x, y = scene.get("mobileFocus" if portrait else "desktopFocus", [0.5, 0.5])
    return (f"scale={width}:{height}:force_original_aspect_ratio=increase:flags=lanczos,"
            f"crop={width}:{height}:(iw-ow)*{x}:(ih-oh)*{y},setsar=1")


def storyboard(edit):
    for portrait in (False, True):
        w, h = (180, 320) if portrait else (480, 270)
        # First and last chosen frame expose crop drift before the full render.
        sheet = Image.new("RGB", (w * 4, (h + 32) * 2), "#f6f2e9")
        draw = ImageDraw.Draw(sheet)
        for i, scene in enumerate(edit["scenes"]):
            for end in (False, True):
                t = scene["start"] + (scene.get("sourceDuration", scene["duration"]) - 1 / FPS if end else 0)
                image_data = subprocess.check_output([
                    "ffmpeg", "-v", "error", "-threads", "3", "-ss", str(t),
                    "-i", str(ROOT / scene["source"]), "-frames:v", "1",
                    "-vf", framing(scene, portrait) + f",scale={w}:{h}",
                    "-threads", "3", "-f", "image2pipe", "-vcodec", "mjpeg", "pipe:1",
                ])
                x, y = i * w, int(end) * (h + 32)
                draw.text((x + 8, y + 8), f"{scene['place']} / {t:.2f}s", fill="#183f32")
                sheet.paste(Image.open(io.BytesIO(image_data)), (x, y + 32))
        sheet.save(EVIDENCE / f"storyboard-{'mobile' if portrait else 'desktop'}.jpg", quality=93)


def render(edit, portrait):
    scenes = edit["scenes"]
    dissolve = edit["dissolveSeconds"]
    command = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "warning"]
    for scene in scenes:
        command.extend(["-threads", "3", "-i", str(ROOT / scene["source"])])
    filters = []
    for i, scene in enumerate(scenes):
        source_duration = scene.get("sourceDuration", scene["duration"])
        stretch = scene["duration"] / source_duration
        filters.append(
            f"[{i}:v]trim=start={scene['start']}:duration={source_duration},setpts=(PTS-STARTPTS)*{stretch},"
            f"{framing(scene, portrait)},fps={FPS},settb=AVTB,format=yuv420p[s{i}]"
        )
    # The loop begins one second into the first clip. Its preceding second is
    # reserved for the closing dissolve, then playback advances into frame one.
    filters.append(f"[s0]split=2[first][headInput]")
    filters.append(f"[first]trim=start={dissolve},setpts=PTS-STARTPTS[v0]")
    filters.append(f"[headInput]trim=duration={dissolve},setpts=PTS-STARTPTS[head]")
    length = scenes[0]["duration"] - dissolve
    for i in range(1, len(scenes)):
        filters.append(f"[v{i-1}][s{i}]xfade=transition=fade:duration={dissolve}:offset={length-dissolve}[v{i}]")
        length += scenes[i]["duration"] - dissolve
    filters.append(f"[v{len(scenes)-1}][head]xfade=transition=fade:duration={dissolve}:offset={length-dissolve},format=yuv420p[out]")
    filename = f"india-{'mobile' if portrait else 'desktop'}.mp4"
    output = ROOT / "public/videos" / filename
    command.extend([
        "-filter_complex_threads", "1", "-filter_complex", ";".join(filters),
        "-map", "[out]", "-an", "-sn", "-dn", "-c:v", "libx264", "-threads", "3",
        "-preset", "slow", "-crf", "27" if portrait else "26",
        "-maxrate", "2800k" if portrait else "6500k", "-bufsize", "5600k" if portrait else "13000k",
        "-profile:v", "high", "-level:v", "4.1", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", "-g", "48", "-frames:v", str(round(length * FPS)),
        "-map_metadata", "-1", str(output),
    ])
    run(command)
    print(json.dumps({"file": filename, "duration": length, "bytes": output.stat().st_size,
                      "sha256": hashlib.sha256(output.read_bytes()).hexdigest()}), flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--storyboard", action="store_true")
    parser.add_argument("--render", action="store_true")
    args = parser.parse_args()
    edit = json.loads(MANIFEST.read_text(encoding="utf-8"))
    assert len(edit["scenes"]) == 4
    for scene in edit["scenes"]:
        assert (ROOT / scene["source"]).is_file(), scene["source"]
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    if args.storyboard:
        storyboard(edit)
    if args.render:
        for portrait in (False, True):
            render(edit, portrait)
        run([
            "ffmpeg", "-y", "-v", "error", "-threads", "3",
            "-i", str(ROOT / "public/videos/india-desktop.mp4"),
            "-frames:v", "1", "-c:v", "libwebp", "-quality", "88", "-threads", "3",
            str(ROOT / "public/images/india-film-poster.webp"),
        ])


if __name__ == "__main__":
    main()
