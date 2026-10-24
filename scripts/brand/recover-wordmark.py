"""Recover the approved concept lettering as reusable vector paths.

This is a contour recovery of the existing artwork, not a font substitution.
The original PNG remains untouched. The exported JSON is the editable vector
master, so routine SVG exports need neither the raster nor tracing libraries.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
import potrace
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / ".skill-archive/logo-creator/2026-10-24-tourmelloh/ai-refined-concept.png"
EXPECTED_HASH = "90c373eeda38da6f33c40312abed5774f60f032dfd6da1f4972adc2d956a5e81"
WORD = "tourmelloh"
ROI = [405, 235, 1446, 430]


def number(value: float) -> str:
    return f"{value:.4f}".rstrip("0").rstrip(".")


source_hash = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
assert source_hash == EXPECTED_HASH, "The approved concept changed; inspect it before recovery."
pixels = np.array(Image.open(SOURCE).convert("RGB"))
crop = pixels[ROI[1]:ROI[3], ROI[0]:ROI[2]]
foreground = (
    (crop[:, :, 1] > crop[:, :, 0] * 1.2)
    & (crop[:, :, 0] < 100)
    & (crop[:, :, 1] < 150)
    & (crop[:, :, 2] < 120)
).astype("uint8")
count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground, 8)
components = sorted(
    [index for index in range(1, count) if stats[index, 4] > 1000],
    key=lambda index: stats[index, 0],
)
assert len(components) == len(WORD), "Expected ten separate original glyphs."
selected = np.isin(labels, components)
ys, xs = np.where(selected)
left, top = int(xs.min()), int(ys.min())
width, height = int(xs.max() - left + 1), int(ys.max() - top + 1)
glyphs = []
for character, component in zip(WORD, components):
    x, y, w, h, area = (int(value) for value in stats[component])
    # Potrace treats dark (False) pixels as foreground. Keep four clear pixels
    # around every glyph so edge curves are never clipped by the bitmap border.
    mask = np.pad(labels[y:y + h, x:x + w] == component, 4)
    curves = potrace.Bitmap(~mask).trace(
        turdsize=2, alphamax=1.0, opticurve=True, opttolerance=0.2,
    )

    def point(value: object) -> str:
        return f"{number(value.x + x - left - 4)} {number(value.y + y - top - 4)}"

    segments = []
    contour_count = 0
    for curve in curves:
        contour_count += 1
        segments.append("M" + point(curve.start_point))
        for segment in curve:
            if segment.is_corner:
                segments.append("L" + point(segment.c) + " " + point(segment.end_point))
            else:
                segments.append(
                    "C" + point(segment.c1) + " " + point(segment.c2) + " " + point(segment.end_point)
                )
        segments.append("Z")
    glyphs.append({
        "character": character,
        "source_bounds": [x + ROI[0], y + ROI[1], w, h],
        "foreground_pixels": area,
        "contours": contour_count,
        "path": "".join(segments),
    })

master = {
    "wordmark": WORD,
    "source": str(SOURCE.relative_to(ROOT)).replace("\\", "/"),
    "source_sha256": source_hash,
    "source_size": [int(pixels.shape[1]), int(pixels.shape[0])],
    "source_bounds": [left + ROI[0], top + ROI[1], width, height],
    "viewbox": [0, 0, width, height],
    "method": "Original concept foreground contours fitted to closed cubic Bezier paths; no font substitution.",
    "trace": {"engine": "potrace", "turdsize": 2, "alphamax": 1.0, "opttolerance": 0.2},
    "glyphs": glyphs,
}
destination = Path(__file__).with_name("wordmark-source.json")
destination.write_text(json.dumps(master, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"master": str(destination), "glyphs": len(glyphs), "viewbox": master["viewbox"]}))
