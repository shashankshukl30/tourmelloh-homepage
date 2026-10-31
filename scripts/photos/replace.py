"""Replace single library photographs with a chosen Pexels picture, then re-emit media.ts and the share card.

python scripts/photos/replace.py "key=pexelsId|photographer|page-slug|alt" ...
Downloads only from the public image CDN; photographer and page come from the photo's public Pexels page.
"""
import io, json, os, subprocess, sys, urllib.request
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LIB = os.path.join(ROOT, "research", "photo-library.json")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"}
LONG = 2600


def main():
    lib = json.load(open(LIB, encoding="utf-8"))
    for arg in sys.argv[1:]:
        key, rest = arg.split("=", 1)
        pid, by, slug, alt = rest.split("|", 3)
        data = urllib.request.urlopen(urllib.request.Request(f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg", headers=UA), timeout=180).read()
        im = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert("RGB")
        im.thumbnail((LONG, LONG), Image.Resampling.LANCZOS)
        # A new photograph gets a new filename: library files are served immutable, so overwriting would never reach cached visitors.
        name = f"{key}-{pid}.webp"
        old = lib.get(key, {}).get("src", "")
        im.save(os.path.join(ROOT, "public", "images", "library", name), "WEBP", quality=90, method=6)
        if old and not old.endswith(name) and os.path.exists(os.path.join(ROOT, "public", old.lstrip("/"))):
            os.remove(os.path.join(ROOT, "public", old.lstrip("/")))
        og = ImageOps.fit(im, (1200, 630), Image.Resampling.LANCZOS, centering=(0.5, 0.45))
        og.save(os.path.join(ROOT, "public", "og", f"{key}.jpg"), "JPEG", quality=86, optimize=True, progressive=True)
        lib[key] = {
            "src": f"/images/library/{name}", "width": im.width, "height": im.height, "alt": alt, "by": by,
            "page": f"https://www.pexels.com/photo/{slug + '-' if slug else ''}{pid}/",
            "license": "https://www.pexels.com/license/", "pexelsId": int(pid),
        }
        print(key, im.size, by)
    json.dump(lib, open(LIB, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "photos", "emit.py")], check=True)


main()
