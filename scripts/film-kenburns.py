"""Gentle, sub-pixel Ken Burns clips from licensed library stills (PIL affine per frame, no zoompan jitter).
python scripts/film-kenburns.py
"""
import json, subprocess
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LIB = json.loads((ROOT / "research/photo-library.json").read_text(encoding="utf-8"))
OUT = ROOT / "research/media/india-v5"
W, H, FPS, SECONDS = 2560, 1440, 24, 6
CLIPS = [
    # key, zoom from -> to, focus x/y at start -> end (fractions of the image)
    ("prayagraj-sangam-birds", 1.00, 1.08, (0.50, 0.52), (0.46, 0.50)),
    ("ayodhya-ram-mandir", 1.08, 1.00, (0.50, 0.42), (0.50, 0.46)),
]

def ease(t):  # smoothstep: no visible start or stop jolt
    return t * t * (3 - 2 * t)

for key, z0, z1, f0, f1 in CLIPS:
    src = Image.open(ROOT / "public" / LIB[key]["src"].lstrip("/")).convert("RGB")
    sw, sh = src.size
    base = max(W / sw, H / sh)  # cover the frame at zoom 1
    out = OUT / f"{key}-kenburns.mp4"
    enc = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                            "-c:v", "libx264", "-preset", "slow", "-crf", "12", "-pix_fmt", "yuv420p", "-threads", "3", str(out)], stdin=subprocess.PIPE)
    n = FPS * SECONDS
    for i in range(n):
        t = ease(i / (n - 1))
        z = base * (z0 + (z1 - z0) * t)
        fx = f0[0] + (f1[0] - f0[0]) * t
        fy = f0[1] + (f1[1] - f0[1]) * t
        vw, vh = W / z, H / z  # visible source window
        x = min(max(fx * sw - vw / 2, 0), sw - vw)
        y = min(max(fy * sh - vh / 2, 0), sh - vh)
        frame = src.transform((W, H), Image.Transform.AFFINE, (vw / W, 0, x, 0, vh / H, y), resample=Image.Resampling.BICUBIC)
        enc.stdin.write(frame.tobytes())
    enc.stdin.close(); enc.wait()
    print(key, out.name, LIB[key]["by"], LIB[key].get("page"))
