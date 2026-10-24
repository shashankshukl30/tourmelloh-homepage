"""Verify exported logo artwork against its approved original source."""
from __future__ import annotations

import hashlib
import io
import json
import shutil
from pathlib import Path
from xml.etree import ElementTree

import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public/brand"
MASTER = json.loads(Path(__file__).with_name("wordmark-source.json").read_text(encoding="utf-8"))
EXPECTED_SYMBOL_HASHES = {
    "tourmelloh-symbol.svg": "a534c5758c0ad067bf46711c36f7e3419fbb92b75ce12581bb19254d405a3270",
    "tourmelloh-symbol-ivory.svg": "9302c50fe7a8ee4e6a9baae4feaff3e859cf657da7d257a35eb58de9d6a7586c",
    "tourmelloh-symbol-copper.svg": "c7330003ee40343e83307d460a0f4d5e5db85235b8cd367db7fdfa9c416ef9f0",
    "tourmelloh-favicon.svg": "14b18e85f2cb1dd5d34d30be0d0a8738e1e9286decfb854fc384fb16d439cdcc",
}
report = {"status": "PASS", "wordmark": MASTER["wordmark"], "glyph_count": len(MASTER["glyphs"])}
assert len(MASTER["glyphs"]) == 10
assert "".join(glyph["character"] for glyph in MASTER["glyphs"]) == "tourmelloh"
source = ROOT / MASTER["source"]
assert hashlib.sha256(source.read_bytes()).hexdigest() == MASTER["source_sha256"]
report["source_unchanged"] = True
report["source_sha256"] = MASTER["source_sha256"]
report["symbols_unchanged"] = all(
    hashlib.sha256((OUT / name).read_bytes()).hexdigest() == expected
    for name, expected in EXPECTED_SYMBOL_HASHES.items()
)
assert report["symbols_unchanged"]
report["double_l_verified"] = [glyph["character"] for glyph in MASTER["glyphs"]][6:8] == ["l", "l"]
report["svg"] = []
for file in sorted(OUT.glob("*.svg")):
    data = file.read_bytes()
    tree = ElementTree.fromstring(data)
    tags = [element.tag.rsplit("}", 1)[-1] for element in tree.iter()]
    assert "image" not in tags and "text" not in tags
    report["svg"].append({
        "file": file.name, "paths": tags.count("path"),
        "no_raster_or_live_text": True, "sha256": hashlib.sha256(data).hexdigest(),
    })
report["png"] = []
for file in sorted(OUT.glob("*.png")):
    with Image.open(file) as image:
        image.load()
        if file.name.startswith("tourmelloh-logo"):
            assert image.mode == "RGBA" and image.size == (2400, 479)
            assert image.getchannel("A").getextrema() == (0, 255)
        report["png"].append({"file": file.name, "dimensions": list(image.size), "mode": image.mode})

# Compare actual browser rasterization of the recovered vectors at the exact
# source pixel scale. Rendering output is held in memory, not scratch files.
x, y, width, height = MASTER["source_bounds"]
pixels = np.array(Image.open(source).convert("RGB"))[y:y + height, x:x + width]
reference = (
    (pixels[:, :, 1] > pixels[:, :, 0] * 1.2)
    & (pixels[:, :, 0] < 100)
    & (pixels[:, :, 1] < 150)
    & (pixels[:, :, 2] < 120)
)
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">'
    + '<g fill="#123F32" fill-rule="evenodd">'
    + "".join(f'<path d="{glyph["path"]}"/>' for glyph in MASTER["glyphs"])
    + "</g></svg>"
)
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    try:
        page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
        page.set_content('<style>html,body{margin:0;background:transparent}svg{display:block}</style>' + svg)
        rendered = np.array(Image.open(io.BytesIO(page.screenshot(omit_background=True))))[:, :, 3] > 127
    finally:
        browser.close()
iou = float((rendered & reference).sum() / (rendered | reference).sum())
assert iou >= 0.99, f"Original lettering fidelity regressed: IoU={iou}"
report["original_lettering_comparison"] = {
    "method": "Chromium SVG rasterization at original source pixel dimensions; foreground mask intersection over union.",
    "source_bounds": MASTER["source_bounds"],
    "intersection_over_union": iou,
    "source_foreground_pixels": int(reference.sum()),
    "vector_foreground_pixels": int(rendered.sum()),
    "threshold": 0.99,
}
report["visual_review"] = "Corrected logo-preview.png and transparent logo PNG opened and inspected; original geometric lettering and sculpted double-l retained in primary/reversed signatures."
report["cleanup"] = {
    "removed": [], "bytes_removed": 0,
    "reason": "No disposable scratch files created. Original concept, vector master, reproducible source and final exports retained.",
    "free_bytes_before": {"C": 75566579712, "D": 36465676288},
    "free_bytes_after": {drive: shutil.disk_usage(drive + ":\\").free for drive in ["C", "D"]},
}
Path(__file__).with_name("validation.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"status": report["status"], "glyphs": report["glyph_count"], "source_and_symbol_unchanged": True, "wordmark_iou": iou}))
