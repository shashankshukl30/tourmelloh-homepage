"""Fetch licensed destination photographs; keep only verified web derivatives."""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from io import BytesIO
from pathlib import Path
import json
import requests
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'images'
OUT.mkdir(parents=True, exist_ok=True)
UNSPLASH = 'https://unsplash.com/license'
PEXELS = 'https://www.pexels.com/license/'
assets = [
    dict(file='varanasi-riverfront.webp', subject='Varanasi ghats and boats on the Ganges in warm daylight', author='Martijn Vonk', source='https://unsplash.com/photos/a-group-of-boats-floating-on-top-of-a-river-wloNuC7qKf8', image='https://images.unsplash.com/photo-1706186839147-0d708602587b?w=2200&q=90&fit=max', license=UNSPLASH, width=2200),
    dict(file='varanasi-evening.webp', subject='Varanasi riverfront ghats in the evening', author='Yash Choudhary', source='https://www.pexels.com/photo/scenic-view-of-varanasi-ghats-at-sunset-30854162/', image='https://images.pexels.com/photos/30854162/pexels-photo-30854162.jpeg?auto=compress&cs=tinysrgb&w=2200', license=PEXELS, width=2200),
    dict(file='varanasi-boats.webp', subject='Boats along the Ganges in Varanasi at sunset', author='Arto Suraj', source='https://www.pexels.com/photo/sunset-over-ganges-river-with-boats-in-varanasi-34741292/', image='https://images.pexels.com/photos/34741292/pexels-photo-34741292.jpeg?auto=compress&cs=tinysrgb&w=1800', license=PEXELS, width=1800),
    dict(file='agra-taj-mahal.webp', subject='Taj Mahal, Agra', author='Jovyn Chamb', source='https://unsplash.com/photos/taj-mahal-india-iWMfiInivp4', image='https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=90&fit=max', license=UNSPLASH, width=1200),
    dict(file='lucknow-rumi-darwaza.webp', subject='Rumi Darwaza, Lucknow', author='Sourabh Pandey', source='https://unsplash.com/photos/a-very-large-building-with-a-massive-entrance-EOm5YV73zns', image='https://images.unsplash.com/photo-1688287580970-70fe8e0f4bef?w=1000&q=90&fit=max', license=UNSPLASH, width=1000),
    dict(file='prayagraj-yamuna.webp', subject='Boats on the Yamuna near New Yamuna Bridge, Prayagraj', author='Faisal Qureshi', source='https://unsplash.com/photos/a-group-of-boats-floating-on-top-of-a-lake-next-to-a-bridge-gCAqJBnmeRo', image='https://images.unsplash.com/photo-1645344273898-7fd1e33803c2?w=1000&q=90&fit=max', license=UNSPLASH, width=1000),
    dict(file='bodhgaya-mahabodhi.webp', subject='Mahabodhi Temple, Bodhgaya', author='Vishwjeet Kumar', source='https://unsplash.com/photos/a-very-tall-building-with-a-very-tall-tower-_RstDhmP2dU', image='https://images.unsplash.com/photo-1679806893392-29f024308936?w=1000&q=90&fit=max', license=UNSPLASH, width=900),
    dict(file='vrindavan-madan-mohan.webp', subject='Madan Mohan Temple, Vrindavan', author='Vikas Kumar', source='https://unsplash.com/photos/an-old-building-with-a-bird-flying-over-it-NNdS6CSIqgE', image='https://images.unsplash.com/photo-1697528556914-5b2e767bbb5f?w=1000&q=90&fit=max', license=UNSPLASH, width=1000),
    dict(file='ayodhya-ram-mandir.webp', subject='Shri Ram Janambhoomi Mandir, Ayodhya, November 2025', author="Prime Minister's Office, Government of India", source='https://commons.wikimedia.org/wiki/File:Shri_Ram_Janambhoomi_Mandir.jpg', image='https://static.pib.gov.in/WriteReadData/Gallery/PhotoGallery/2025/Nov/H20251125197420.JPG', license='https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf', license_name='Government Open Data License - India (GODL)', attribution_required=True, attribution="Photo: Prime Minister's Office / Press Information Bureau, Government of India, GODL-India. Source: https://commons.wikimedia.org/wiki/File:Shri_Ram_Janambhoomi_Mandir.jpg. Resized and converted to WebP.", width=1000),
    dict(file='varanasi-aerial.webp', subject='Aerial view of Varanasi ghats along the Ganges', author="Raghu Manda's", source='https://www.pexels.com/photo/aerial-view-of-varanasi-ghats-along-the-ganges-39256046/', image='https://images.pexels.com/photos/39256046/pexels-photo-39256046.jpeg?auto=compress&cs=tinysrgb&w=2400', license=PEXELS, width=2400),
    dict(file='gaya-vishnupad.webp', subject='Vishnupad Temple, Gaya, Bihar', author='Surajkumar12111', source='https://commons.wikimedia.org/wiki/File:Vishnupad_temple_gaya_bihar.jpg', image='https://upload.wikimedia.org/wikipedia/commons/e/ee/Vishnupad_temple_gaya_bihar.jpg', license='https://creativecommons.org/licenses/by-sa/4.0/', license_name='CC BY-SA 4.0', attribution_required=True, attribution='Photo: Surajkumar12111 / Wikimedia Commons, CC BY-SA 4.0. Source: https://commons.wikimedia.org/wiki/File:Vishnupad_temple_gaya_bihar.jpg. Resized and converted to WebP; derivative remains CC BY-SA 4.0.', width=1000),
]

manifest = ROOT/'research'/'photo-sources.json'
previous = {a['file']: a for a in json.loads(manifest.read_text(encoding='utf-8'))['sources']} if manifest.exists() else {}

def download(asset):
    target = OUT / asset['file']
    if target.exists() and Image.open(target).width <= asset['width']:
        asset = {**previous.get(asset['file'], {}), **asset}
        im = Image.open(target)
        asset['dimensions'] = list(im.size)
        asset['bytes'] = target.stat().st_size
        asset['sha256'] = sha256(target.read_bytes()).hexdigest()
        return asset
    response = requests.get(asset['image'], timeout=60, headers={'User-Agent':'DigiocularPhotoResearch/1.0'})
    response.raise_for_status()
    image = ImageOps.exif_transpose(Image.open(BytesIO(response.content))).convert('RGB')
    asset['download_dimensions'] = list(image.size)
    asset['download_bytes'] = len(response.content)
    image.thumbnail((asset['width'], asset['width']*2), Image.Resampling.LANCZOS)
    image.save(target, 'WEBP', quality=86, method=6)
    with Image.open(target) as verify:
        verify.load()
        asset['dimensions'] = list(verify.size)
    asset['bytes'] = target.stat().st_size
    asset['sha256'] = sha256(target.read_bytes()).hexdigest()
    asset['processing'] = 'EXIF orientation, proportional resize, WebP conversion. No generative manipulation. Download buffer not written to disk.'
    print(asset['file'], asset['dimensions'], asset['bytes'], flush=True)
    return asset

if __name__ == '__main__':
    results = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        for result in executor.map(download, assets):
            results.append(result)
    (ROOT/'research'/'photo-sources.json').write_text(json.dumps({'researched_on':'2026-10-24','sources':results}, indent=2), encoding='utf-8')
    sheet = Image.new('RGB', (1440, 340*((len(results)+2)//3)), '#ece7df')
    draw = ImageDraw.Draw(sheet)
    for i, asset in enumerate(results):
        thumb = ImageOps.contain(Image.open(OUT/asset['file']), (460, 295))
        x,y = (i%3)*480, (i//3)*340
        sheet.paste(thumb, (x+(480-thumb.width)//2,y))
        draw.text((x+10,y+303), asset['file'], fill='#222222')
    sheet.save(ROOT/'research'/'photo-contact-sheet.jpg', quality=88)
