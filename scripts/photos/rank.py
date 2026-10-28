"""Rank Pexels candidates per photo key and draw review sheets.

python scripts/photos/rank.py <candidates.json> <workdir> [--alts key,key,...]
  Writes <workdir>/ranked.json and sheet-NN.jpg (top pick per key, 24 per sheet).
  With --alts, draws alts-<key>.jpg showing the next 12 candidates for each key named.
"""
import io, json, os, re, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageDraw, ImageFont, ImageOps

sys.path.insert(0, os.path.dirname(__file__))
from queries import Q

MIN_LONG = 2400
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"}
try:
    FONT = ImageFont.truetype("arial.ttf", 18)
except OSError:
    FONT = ImageFont.load_default()


def has_word(text, w):
    return re.search(r"(?<![a-z])" + re.escape(w) + r"(?![a-z])", text) is not None


def rank(cands):
    by_key = {}
    for key, items in cands.items():
        must = Q[key][1]
        seen, keep = set(), []
        for pos, c in enumerate(items):
            if c["id"] in seen or max(c["w"], c["h"]) < MIN_LONG or not c["dl"]:
                continue
            seen.add(c["id"])
            text = " ".join([c["title"], c["alt"], c["desc"], " ".join(c["tags"]), c["loc"], c["slug"].replace("-", " ")]).lower()
            place = any(has_word(text, m) for m in must)
            landscape = c["w"] >= c["h"]
            score = (40 if place else 0) + (8 if landscape else 0) + min(c["likes"], 400) / 20 - pos * 0.6
            keep.append({**c, "place": place, "score": round(score, 1)})
        keep.sort(key=lambda c: -c["score"])
        by_key[key] = keep
    return by_key


def thumb(url):
    if not url:
        return Image.new("RGB", (300, 200), "white")
    try:
        data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read()
        return ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert("RGB")
    except Exception:
        return Image.new("RGB", (300, 200), (200, 60, 60))


def tile(im, w=300, h=220):
    return ImageOps.fit(im, (w, h))


def sheet(entries, path, cols=6, w=300, h=220):
    rows = (len(entries) + cols - 1) // cols
    canvas = Image.new("RGB", (cols * w, rows * (h + 48)), "white")
    draw = ImageDraw.Draw(canvas)
    with ThreadPoolExecutor(12) as ex:
        ims = list(ex.map(lambda e: thumb(e[1]["thumb"]), entries))
    for i, ((label, c), im) in enumerate(zip(entries, ims)):
        x, y = (i % cols) * w, (i // cols) * (h + 48)
        canvas.paste(tile(im, w - 6, h), (x + 3, y))
        mark = "" if c.get("place") else " ?"
        draw.text((x + 6, y + h + 2), f"{label}{mark}", fill="black", font=FONT)
        draw.text((x + 6, y + h + 23), f"{c['w']}x{c['h']}", fill=(110, 110, 110), font=FONT)
    canvas.save(path, quality=80)


def main():
    src, work = sys.argv[1], sys.argv[2]
    os.makedirs(work, exist_ok=True)
    ranked = rank(json.load(open(src, encoding="utf-8")))
    json.dump(ranked, open(os.path.join(work, "ranked.json"), "w", encoding="utf-8"), ensure_ascii=False)
    if "--alts" in sys.argv:
        keys = sys.argv[sys.argv.index("--alts") + 1].split(",")
        for n in range(0, len(keys), 6):
            entries = []
            for key in keys[n:n + 6]:
                alts = [(f"{key[:22]} #{i}", c) for i, c in enumerate(ranked[key][1:7], 1)]
                entries += alts + [("-", {"thumb": "", "w": 0, "h": 0, "place": True})] * (6 - len(alts))
            sheet(entries, os.path.join(work, f"alts-{n // 6:02d}.jpg"), cols=6, w=280, h=190)
        return
    keys = list(ranked)
    empty = [k for k in keys if not ranked[k]]
    print("no candidates:", empty)
    picks = [(k, ranked[k][0]) for k in keys if ranked[k]]
    for n in range(0, len(picks), 24):
        sheet(picks[n:n + 24], os.path.join(work, f"sheet-{n // 24:02d}.jpg"))
    print(len(picks), "picks;", sum(1 for _, c in picks if not c["place"]), "without a place match")


if __name__ == "__main__":
    main()
