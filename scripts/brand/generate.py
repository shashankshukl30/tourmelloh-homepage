"""Export Tourmelloh's approved symbol and recovered original lettering.

Run from the project root:
  python scripts/brand/generate.py
  node scripts/brand/render.cjs

The approved symbol geometry stays unchanged. The wordmark comes from the
original concept's recovered Bezier paths, not replacement font outlines.
No raster embedding, live text, or font dependency is used in the exports.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "brand"
OUT.mkdir(parents=True, exist_ok=True)
WORDMARK_SOURCE = Path(__file__).with_name("wordmark-source.json")
PALETTE = {"forest": "#123F32", "ivory": "#F8F4EB", "copper": "#B87648"}
WORD = "tourmelloh"
WORDMARK_X = 125.55
WORDMARK_Y = 17.56
WORDMARK_HEIGHT = 74.48

# Three solid visual masses define a T, with an open, winding channel.
# Each mass is a closed path; transparency is real negative space.
# Units are intentionally generous so the channel stays open at favicon size.
SYMBOL_PATHS = [
    "M8 8H41C51 13 61 18 68 23C75 28 73 33 65 35C61 36 57 36 52 36H32C18.745 36 8 25.255 8 12Z",
    "M53 8H104V12C104 25.255 93.255 36 80 36H78C71 41 64 45 58 50C45 59 38 68 35 79V64C35 50 44 43 59 39C74 35 82 31 78 25C75 20 65 14 53 8Z",
    "M76 48V82C76 94.15 66.15 104 54 104H41V95C41 82 45 73 54 64C61 58 68 53 76 48Z",
]

def number(v: float) -> str:
    return f"{v:.3f}".rstrip("0").rstrip(".")

def symbol_paths(colour: str, transform: str = "") -> str:
    group = f'<g fill="{colour}"' + (f' transform="{transform}"' if transform else "") + ">"
    return group + "".join(f'<path d="{d}"/>' for d in SYMBOL_PATHS) + "</g>"

def svg(width: float, height: float, content: str, desc: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {number(width)} {number(height)}" '
        f'width="{number(width)}" height="{number(height)}" role="img" aria-labelledby="title desc">'
        f'<title id="title">Tourmelloh</title><desc id="desc">{desc}</desc>{content}</svg>\n'
    )

wordmark = json.loads(WORDMARK_SOURCE.read_text(encoding="utf-8"))
assert wordmark["wordmark"] == WORD and len(wordmark["glyphs"]) == len(WORD)
scale = WORDMARK_HEIGHT / wordmark["viewbox"][3]
word_paths = [glyph["path"] for glyph in wordmark["glyphs"]]
LOGO_W = round(WORDMARK_X + wordmark["viewbox"][2] * scale + 9.1, 3)
LOGO_H = 112
for name, colour in [("tourmelloh-logo", PALETTE["forest"]), ("tourmelloh-logo-ivory", PALETTE["ivory"])]:
    content = symbol_paths(colour)
    content += (
        f'<g fill="{colour}" fill-rule="evenodd" transform="translate({number(WORDMARK_X)} {number(WORDMARK_Y)}) scale({scale:.9f})">'
        + "".join(f'<path d="{path}"/>' for path in word_paths) + "</g>"
    )
    (OUT / f"{name}.svg").write_text(svg(LOGO_W, LOGO_H, content, "Approved T and river symbol with original lowercase tourmelloh lettering recovered as vector outlines."), encoding="utf-8")

for name, colour in [("tourmelloh-symbol", PALETTE["forest"]), ("tourmelloh-symbol-ivory", PALETTE["ivory"]), ("tourmelloh-symbol-copper", PALETTE["copper"])]:
    (OUT / f"{name}.svg").write_text(svg(112, 112, symbol_paths(colour), "An original T shaped symbol with a generous river channel."), encoding="utf-8")

favicon = f'<path fill="{PALETTE["forest"]}" d="M28 0H100C115.464 0 128 12.536 128 28V100C128 115.464 115.464 128 100 128H28C12.536 128 0 115.464 0 100V28C0 12.536 12.536 0 28 0Z"/>'
favicon += symbol_paths(PALETTE["ivory"], "translate(8 8)")
(OUT / "tourmelloh-favicon.svg").write_text(svg(128, 128, favicon, "Tourmelloh favicon. Ivory T and river symbol on forest green."), encoding="utf-8")

manifest = {
    "brand": "Tourmelloh", "wordmark": WORD, "wordmark_character_count": len(WORD),
    "lettering": {"source": wordmark["source"], "source_sha256": wordmark["source_sha256"], "vector_master": "scripts/brand/wordmark-source.json", "method": wordmark["method"], "font_substitution": False, "outline_note": "Ten original glyphs, each a standalone vector path. No external font is needed to render the SVG."},
    "geometry": {"horizontal_viewbox": [0, 0, LOGO_W, LOGO_H], "aspect_ratio": round(LOGO_W / LOGO_H, 5), "symbol_viewbox": [0, 0, 112, 112], "favicon_viewbox": [0, 0, 128, 128], "symbol_path_count": len(SYMBOL_PATHS)},
    "palette": PALETTE, "glyphs": [{"index": index, "character": glyph["character"], "source_bounds": glyph["source_bounds"], "contours": glyph["contours"]} for index, glyph in enumerate(wordmark["glyphs"])],
    "provenance": "Existing approved three-path symbol retained unchanged. Original generated concept lettering recovered as fitted vector contours. No font substitution, live text, or raster embedding.",
    "exports": ["tourmelloh-symbol.svg", "tourmelloh-symbol-ivory.svg", "tourmelloh-symbol-copper.svg", "tourmelloh-logo.svg", "tourmelloh-logo-ivory.svg", "tourmelloh-favicon.svg", "tourmelloh-logo.png", "tourmelloh-logo-ivory.png", "tourmelloh-symbol.png", "logo-preview.png"]
}
(OUT / "brand-assets.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

# The presentation uses the exact SVG exports, not lookalike live type.
html = """<!doctype html><html lang="en"><meta charset="utf-8"><title>Tourmelloh — vector identity</title>
<style>
*{box-sizing:border-box}html,body{margin:0;width:1600px;background:#F8F4EB;color:#123F32;font-family:Arial,sans-serif}
.board{width:1600px;height:1120px;padding:54px 66px;display:grid;grid-template-rows:30px 340px 340px 124px 32px;gap:29px}
.label{font-size:11px;letter-spacing:2.2px;line-height:1.4;font-weight:500}
.head{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #123F3230;padding-bottom:24px}
.hero{display:flex;align-items:center;justify-content:center}
.hero img{width:1270px;height:auto}
.middle{display:grid;grid-template-columns:380px 1fr;gap:28px}
.symbol{border:1px solid #123F3230;display:flex;align-items:center;justify-content:center;position:relative}
.symbol>img{width:230px;height:230px}.symbol>.label{position:absolute;left:24px;top:22px;font-size:9px}
.reverse{background:#123F32;display:flex;align-items:center;justify-content:center;position:relative}
.reverse>img{width:820px;height:auto}.reverse>.label{color:#F8F4EB;position:absolute;left:28px;top:24px;font-size:9px}
.bottom{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.tiny{border-top:1px solid #123F3230;padding-top:22px;display:flex;align-items:center;gap:35px}
.tiny>span{font-size:10px;letter-spacing:1.4px;max-width:100px;line-height:1.6}
.sample{display:flex;align-items:center;gap:10px;font-size:10px;color:#123F3290}.sample img{image-rendering:auto}
.swatches{border-top:1px solid #123F3230;padding-top:22px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.swatch{display:flex;align-items:center;gap:13px;font-size:10px;line-height:1.7}.swatch i{display:block;width:48px;height:48px;border-radius:50%;border:1px solid #123F3230;flex-shrink:0}.swatch b{font-size:10px;font-weight:500;letter-spacing:1.2px}
.foot{border-top:1px solid #123F3230;padding-top:18px;display:flex;justify-content:space-between;align-items:flex-start;font-size:9px;letter-spacing:1.2px}
</style>
<main class="board">
<header class="head"><span class="label">TOURMELLOH · VISUAL IDENTITY</span><span class="label">VECTOR MASTER / 01</span></header>
<div class="hero"><img src="tourmelloh-logo.svg" alt="Tourmelloh primary logo"></div>
<section class="middle">
<div class="symbol"><span class="label">THE SYMBOL</span><img src="tourmelloh-symbol.svg" alt="Tourmelloh symbol"></div>
<div class="reverse"><span class="label">REVERSED SIGNATURE</span><img src="tourmelloh-logo-ivory.svg" alt="Ivory Tourmelloh logo"></div>
</section>
<section class="bottom">
<div class="tiny"><span>SMALL SCALE<br>16 / 24 / 32 / 48</span><div class="sample"><img src="tourmelloh-favicon.svg" width="16" height="16"><span>16</span></div><div class="sample"><img src="tourmelloh-favicon.svg" width="24" height="24"><span>24</span></div><div class="sample"><img src="tourmelloh-favicon.svg" width="32" height="32"><span>32</span></div><div class="sample"><img src="tourmelloh-favicon.svg" width="48" height="48"><span>48</span></div></div>
<div class="swatches"><div class="swatch"><i style="background:#123F32"></i><span><b>FOREST</b><br>#123F32</span></div><div class="swatch"><i style="background:#F8F4EB"></i><span><b>IVORY</b><br>#F8F4EB</span></div><div class="swatch"><i style="background:#B87648"></i><span><b>COPPER</b><br>#B87648</span></div></div>
</section>
<footer class="foot"><span>A DISTINCTIVE T. A WAY THROUGH.</span><span>OUTLINED TYPE · OPEN CHANNEL · ONE COLOUR READY</span></footer>
</main></html>"""
(OUT / "logo-preview.html").write_text(html, encoding="utf-8")
print(json.dumps({"horizontal": [LOGO_W, LOGO_H], "aspect": LOGO_W / LOGO_H, "characters": len(WORD), "output": str(OUT)}, indent=2))
