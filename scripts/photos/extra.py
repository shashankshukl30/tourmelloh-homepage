"""Photographs Pexels could not supply: Unsplash (no attribution needed) and Wikimedia Commons /
Government of India (credit required, listed on /photo-credits). python scripts/photos/extra.py"""
import io, json, os, urllib.request
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "public", "images", "library")
UA = {"User-Agent": "TourmellohPhotoResearch/1.0 (tourmelloh.com; tourmelloh@gmail.com)"}
LONG = 2600
UNSPLASH = "https://unsplash.com/license"

EXTRA = {
    "ayodhya-ram-ki-paidi": dict(
        image="https://images.unsplash.com/photo-1652059468417-3b44ff25afdf", by="Shivam Tiwari",
        page="https://unsplash.com/photos/yRzcLVJTxUw", license=UNSPLASH,
        alt="Stepped ghats and pavilions beside the water at Ram Ki Paidi, Ayodhya"),
    "ayodhya-sarayu-evening": dict(
        image="https://images.unsplash.com/photo-1549225480-ce72840aa6c8", by="Ayush Srivastava",
        page="https://unsplash.com/photos/RGgLRaWfHrw", license=UNSPLASH,
        alt="Boats and ghats along the Sarayu river at Ayodhya"),
    "ayodhya-ram-mandir": dict(
        image="https://upload.wikimedia.org/wikipedia/commons/f/f2/Shri_Ram_Janambhoomi_Mandir.jpg",
        by="Prime Minister's Office, Government of India", page="https://commons.wikimedia.org/wiki/File:Shri_Ram_Janambhoomi_Mandir.jpg",
        license="https://data.gov.in/government-open-data-license-india", license_name="GODL-India", credit=True,
        alt="Shri Ram Janmabhoomi Mandir in Ayodhya, with its carved pink sandstone spires"),
    "gaya-vishnupad": dict(
        image="https://upload.wikimedia.org/wikipedia/commons/7/7d/Vishnupad_temple_at_gaya.JPG",
        by="Wikimedia Commons contributor", page="https://commons.wikimedia.org/wiki/File:Vishnupad_temple_at_gaya.JPG",
        license="https://creativecommons.org/licenses/by-sa/3.0/", license_name="CC BY-SA 3.0", credit=True,
        alt="The stone shikhara and dome of the Vishnupad Temple, Gaya"),
    "amritsar-langar": dict(
        image="https://upload.wikimedia.org/wikipedia/commons/4/4b/Guru_Ram_Das_Langar_in_the_golden_temple_complex_in_Amritsar_09.jpg",
        by="Wikimedia Commons contributor", page="https://commons.wikimedia.org/wiki/File:Guru_Ram_Das_Langar_in_the_golden_temple_complex_in_Amritsar_09.jpg",
        license="https://creativecommons.org/licenses/by-sa/4.0/", license_name="CC BY-SA 4.0", credit=True,
        alt="Steel thalis stacked high in the Guru Ram Das Langar at the Golden Temple, Amritsar"),
}


def commons_author(page):
    """Read the Artist field so the credit names the photographer."""
    import re, urllib.parse
    title = page.rsplit("/wiki/", 1)[1]
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(
        dict(action="query", format="json", titles=urllib.parse.unquote(title), prop="imageinfo", iiprop="extmetadata"))
    data = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60))
    meta = next(iter(data["query"]["pages"].values()))["imageinfo"][0]["extmetadata"]
    return re.sub(r"<[^>]+>", "", meta.get("Artist", {}).get("value", "")).strip()


def main():
    lib_path = os.path.join(ROOT, "research", "photo-library.json")
    lib = json.load(open(lib_path, encoding="utf-8"))
    for key, item in EXTRA.items():
        target = os.path.join(OUT, f"{key}.webp")
        url = item["image"] + ("?w=2600&q=88&fm=jpg" if "unsplash" in item["image"] else "")
        if not os.path.exists(target):
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=180).read()
            im = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert("RGB")
            im.thumbnail((LONG, LONG), Image.Resampling.LANCZOS)
            im.save(target, "WEBP", quality=84, method=6)
        with Image.open(target) as im:
            w, h = im.size
        by = item["by"]
        if "commons.wikimedia" in item["page"] and by == "Wikimedia Commons contributor":
            by = commons_author(item["page"]) or by
        lib[key] = {"src": f"/images/library/{key}.webp", "width": w, "height": h, "alt": item["alt"], "by": by,
                    "page": item["page"], "license": item["license"], "licenseName": item.get("license_name", "Unsplash License"),
                    "credit": item.get("credit", False)}
        print(key, w, h, by)
    json.dump(dict(sorted(lib.items())), open(lib_path, "w", encoding="utf-8"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
