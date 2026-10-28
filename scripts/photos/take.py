"""Download the chosen photographs into public/images/library and write content/catalog/media.ts.

python scripts/photos/take.py <ranked.json>
Choices: index 0 unless PICKS names another index, or ("key", index) to borrow another key's candidate.
Every file is resized on the Pexels CDN to 2600 px on the long side, saved as WebP, and recorded
with its photographer and page in research/photo-library.json.
"""
import io, json, os, re, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "public", "images", "library")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"}
LONG = 2600

PICKS = {
    "varanasi-aerial-ghats": 2, "varanasi-silk-weaving": 5, "lucknow-bara-imambara": 6,
    "agra-marble-inlay": 2, "vrindavan-holi": 3, "vrindavan-devotees": 2, "bodhgaya-prayer-flags": 1,
    "delhi-lodhi-garden": 2, "jaipur-balloon": 2, "jodhpur-stepwell": 4, "jaisalmer-desert-camp": 2,
    "ranthambore-fort": 3, "ranthambore-safari": 1, "central-india-safari": 1, "orchha-cenotaphs": 6, "ujjain-mahakal": 1,
    "ujjain-shipra-ghats": 1, "omkareshwar-island": 6, "himachal-toy-train": 2, "dharamshala-monastery": 6,
    "ladakh-khardung-la": 2, "ladakh-monks": 2, "darjeeling-toy-train": 3, "sikkim-prayer-flags": 1,
    "kerala-ayurveda": 5, "andaman-coral": 1, "andaman-cellular-jail": 1, "andaman-kayak": 1,
    "andaman-boat": ("andaman-cellular-jail", 6), "luxury-dining": 3, "private-car": 2,
    "textiles-colour": 1, "train-journey": 6,
}
# Sourced elsewhere (no suitable Pexels photograph).
SKIP = {"ayodhya-ram-mandir", "ayodhya-ram-ki-paidi", "ayodhya-sarayu-evening", "gaya-vishnupad", "amritsar-langar"}

# Captions where the photograph is not quite what its key suggests.
ALT = {
    "jodhpur-stepwell": "Panna Meena ka Kund, a stepwell near Amber in Rajasthan",
    "rameswaram-corridor": "The Pamban bridges crossing the sea to Rameswaram",
    "agra-taj-arch": "The great gateway of the Taj Mahal reflected in the garden canal",
    "andaman-boat": "A boat on clear water off Port Blair in the Andaman Islands",
    "himachal-toy-train": "A tunnel portal on the Kalka–Shimla mountain railway",
    "jaisalmer-desert-camp": "Inside a luxury tent at a desert camp in Rajasthan",
    "bodhgaya-prayer-flags": "A garlanded Buddha image with offerings",
    "ujjain-mahakal": "The adorned image of Mahakaleshwar at Ujjain",
    "ujjain-shipra-ghats": "Ram Ghat on the Shipra river at Ujjain",
}


def choose(ranked, key):
    pick = PICKS.get(key, 0)
    if isinstance(pick, tuple):
        return ranked[pick[0]][pick[1]]
    return ranked[key][pick]


def clean_alt(c, key):
    if key in ALT:
        return ALT[key]
    text = (c.get("alt") or c.get("title") or key.replace("-", " ")).strip().rstrip(".")
    text = re.sub(r"\s+", " ", text)
    return text[:1].upper() + text[1:]


def fetch(item):
    key, c = item
    target = os.path.join(OUT, f"{key}.webp")
    portrait = c["h"] > c["w"]
    url = f"{c['dl']}?auto=compress&cs=tinysrgb&{'h' if portrait else 'w'}={LONG}"
    if not os.path.exists(target):
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()
        except Exception as error:
            print("FAILED", key, url, error)
            return key, None
        im = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert("RGB")
        im.thumbnail((LONG, LONG), Image.Resampling.LANCZOS)
        im.save(target, "WEBP", quality=82, method=6)
    with Image.open(target) as im:
        w, h = im.size
    return key, {
        "src": f"/images/library/{key}.webp", "width": w, "height": h, "alt": clean_alt(c, key),
        "by": c["by"], "page": f"https://www.pexels.com/photo/{c['slug']}-{c['id']}/" if c["slug"] else f"https://www.pexels.com/photo/{c['id']}/",
        "license": "https://www.pexels.com/license/", "pexelsId": c["id"],
    }


def main():
    ranked = json.load(open(sys.argv[1], encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)
    jobs = [(k, choose(ranked, k)) for k in ranked if k not in SKIP]
    ids = [c["id"] for _, c in jobs]
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        raise SystemExit(f"same photograph chosen twice: {dupes}")
    with ThreadPoolExecutor(8) as ex:
        records = {k: v for k, v in ex.map(fetch, jobs) if v}
    lib = os.path.join(ROOT, "research", "photo-library.json")
    old = json.load(open(lib, encoding="utf-8")) if os.path.exists(lib) else {}
    old.update(records)
    json.dump(dict(sorted(old.items())), open(lib, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(len(records), "photographs ->", OUT)


if __name__ == "__main__":
    main()
