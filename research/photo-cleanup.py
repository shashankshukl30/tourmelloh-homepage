"""Remove only two explicitly retired artifacts from this photo research task."""
from pathlib import Path
import hashlib
import json
import shutil
from PIL import Image

root = Path(__file__).resolve().parents[1]
scope = root.resolve()
before = {drive: shutil.disk_usage(drive + ':\\').free for drive in ['C', 'D']}
retired = [
    (root/'public'/'images'/'varanasi-night.webp', 'Optional night photograph excluded by project art direction; unused in build.'),
    (root/'research'/'photo-hero-review.jpg', 'Intermediate hero candidate sheet superseded by final photo-contact-sheet.jpg.'),
]
removed = []
for target, reason in retired:
    resolved = target.resolve()
    assert resolved.is_relative_to(scope), str(target)
    for ancestor in [target, *target.parents]:
        if ancestor == scope.parent:
            break
        assert not ancestor.is_symlink(), str(ancestor)
        assert not (hasattr(ancestor, 'is_junction') and ancestor.is_junction()), str(ancestor)
    if not target.exists():
        continue
    payload = target.read_bytes()
    removed.append({'path':str(target),'reason':reason,'bytes':len(payload),'sha256':hashlib.sha256(payload).hexdigest()})
    target.unlink()
checks = []
for asset in sorted((root/'public'/'images').glob('*.webp')):
    with Image.open(asset) as im:
        im.load()
        checks.append({'file':asset.name,'dimensions':list(im.size),'bytes':asset.stat().st_size})
with Image.open(root/'research'/'photo-contact-sheet.jpg') as sheet:
    sheet.load()
after = {drive: shutil.disk_usage(drive + ':\\').free for drive in ['C', 'D']}
report = {'task':'Licensed destination photographs','scope':str(scope),'free_bytes_before':before,'free_bytes_after':after,'removed':removed,'removed_bytes':sum(r['bytes'] for r in removed),'retained_asset_checks':checks,'original_downloads':'Decoded in memory, never stored as duplicate files. Download source URLs retained in photo-sources.json.','required_attributions':'Ayodhya: PMO / GODL-India. Gaya: Surajkumar12111 / CC BY-SA 4.0. Full credits and source links in photo-sources.json.'}
(root/'research'/'photo-cleanup.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
