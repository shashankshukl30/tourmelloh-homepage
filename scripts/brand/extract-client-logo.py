"""Extract the client's logo (TOURMELLOH BRAND GUIDELINES.pdf, cover page) as clean vector SVGs.

python scripts/brand/extract-client-logo.py "<path to guidelines pdf>"

The cover holds the wordmark, the "TRAVEL DESTINATION PARTNER" line and the "VARANASI | INDIA | BEYOND"
line as filled vector paths. Each is written out in the client's colours (green #093629, copper #B96024)
and in a reversed cream version (#FFF3E3) for dark backgrounds. Nothing is redrawn or re-typeset.
"""
import json, sys
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "brand"
GREEN, COPPER, CREAM = "#093629", "#B96024", "#FFF3E3"

pdf = fitz.open(sys.argv[1])
page = pdf[0]
drawings = [d for d in page.get_drawings() if d.get("fill")]


def is_copper(fill):
    r, g, b = fill
    return r > g + 0.2


def path_data(d):
    """One SVG path from PyMuPDF items; a segment continues the subpath when it starts where the last ended."""
    out, cur = [], None
    def move(p):
        nonlocal cur
        if cur is None or abs(cur.x - p.x) > 0.01 or abs(cur.y - p.y) > 0.01:
            if out:
                out.append("Z")
            out.append(f"M{p.x:.3f} {p.y:.3f}")
    for item in d["items"]:
        kind = item[0]
        if kind == "l":
            move(item[1]); out.append(f"L{item[2].x:.3f} {item[2].y:.3f}"); cur = item[2]
        elif kind == "c":
            a, c1, c2, b = item[1:5]
            move(a); out.append(f"C{c1.x:.3f} {c1.y:.3f} {c2.x:.3f} {c2.y:.3f} {b.x:.3f} {b.y:.3f}"); cur = b
        elif kind == "re":
            r = item[1]
            if out: out.append("Z")
            out.append(f"M{r.x0:.3f} {r.y0:.3f}H{r.x1:.3f}V{r.y1:.3f}H{r.x0:.3f}Z"); cur = None
        elif kind == "qu":
            q = item[1]
            if out: out.append("Z")
            out.append(f"M{q.ul.x:.3f} {q.ul.y:.3f}L{q.ur.x:.3f} {q.ur.y:.3f}L{q.lr.x:.3f} {q.lr.y:.3f}L{q.ll.x:.3f} {q.ll.y:.3f}Z"); cur = None
    if out and out[-1] != "Z" and not out[-1].endswith("Z"):
        out.append("Z")
    return "".join(out)


def band(y0, y1):
    return [d for d in drawings if d["rect"].y0 >= y0 and d["rect"].y1 <= y1]


# Bands on the cover (points): wordmark, tagline, place line. Found from the drawing boxes.
rows = sorted({round(d["rect"].y0) for d in drawings})
word = [d for d in drawings if d["rect"].y1 <= 300]
tag = [d for d in drawings if 300 < d["rect"].y0 and d["rect"].y1 <= 335]
places = [d for d in drawings if 335 < d["rect"].y0 and d["rect"].y1 <= 380]


def bbox(ds):
    r = fitz.Rect(ds[0]["rect"])
    for d in ds[1:]:
        r |= d["rect"]
    return r


def svg(groups, title, primary, accent, pad=2.0):
    box = bbox([d for g in groups for d in g])
    box = fitz.Rect(box.x0 - pad, box.y0 - pad, box.x1 + pad, box.y1 + pad)
    paths = []
    for g in groups:
        for d in g:
            colour = accent if is_copper(d["fill"]) else primary
            rule = ' fill-rule="evenodd"' if d.get("even_odd") else ""
            paths.append(f'<path fill="{colour}"{rule} d="{path_data(d)}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{box.x0:.2f} {box.y0:.2f} {box.width:.2f} {box.height:.2f}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{"".join(paths)}</svg>\n'), box


outputs = {}
for name, groups, title in [
    ("tourmelloh-wordmark", [word], "Tourmelloh"),
    ("tourmelloh-lockup", [word, tag], "Tourmelloh, Travel Destination Partner"),
    ("tourmelloh-lockup-full", [word, tag, places], "Tourmelloh, Travel Destination Partner. Varanasi, India, Beyond"),
]:
    for suffix, primary, accent in [("", GREEN, COPPER), ("-cream", CREAM, COPPER)]:
        text, box = svg(groups, title, primary, accent)
        (OUT / f"{name}{suffix}.svg").write_text(text, encoding="utf-8")
        outputs[f"{name}{suffix}.svg"] = {"width_pt": round(box.width, 2), "height_pt": round(box.height, 2)}

# Favicon: the wordmark's "T" (the left-most drawing), cream on a green rounded square.
t = min(word, key=lambda d: d["rect"].x0)
tr = t["rect"]
size = max(tr.width, tr.height) * 1.5
cx, cy = (tr.x0 + tr.x1) / 2, (tr.y0 + tr.y1) / 2
x0, y0 = cx - size / 2, cy - size / 2
fav = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.2f} {y0:.2f} {size:.2f} {size:.2f}" role="img" aria-label="Tourmelloh">'
       f'<rect x="{x0:.2f}" y="{y0:.2f}" width="{size:.2f}" height="{size:.2f}" rx="{size * 0.22:.2f}" fill="{GREEN}"/>'
       f'<path fill="{CREAM}" d="{path_data(t)}"/>'
       f'<rect x="{cx - size * 0.16:.2f}" y="{tr.y1 + size * 0.07:.2f}" width="{size * 0.32:.2f}" height="{size * 0.045:.2f}" rx="{size * 0.02:.2f}" fill="{COPPER}"/>'
       f'</svg>\n')
(OUT / "tourmelloh-icon.svg").write_text(fav, encoding="utf-8")

(OUT / "client-logo.json").write_text(json.dumps({
    "source": "TOURMELLOH BRAND GUIDELINES.pdf (client, designmonkey.in), cover page vector paths",
    "colours": {"green": GREEN, "copper": COPPER, "cream": CREAM},
    "exports": outputs, "icon": "tourmelloh-icon.svg", "drawings": {"wordmark": len(word), "tagline": len(tag), "places": len(places)},
}, indent=1), encoding="utf-8")
print(json.dumps(outputs, indent=1), len(word), len(tag), len(places), rows[:12])
