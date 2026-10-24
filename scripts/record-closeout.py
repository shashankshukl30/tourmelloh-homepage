"""Record cleanup and delivery evidence without deleting user or source files."""
from pathlib import Path
import hashlib
import json
import shutil
from datetime import datetime, timezone

root = Path(__file__).resolve().parents[1]
baseline = json.loads((root/'research/cleanup-baseline.json').read_text(encoding='utf-8'))
photo = json.loads((root/'research/photo-cleanup.json').read_text(encoding='utf-8'))
design = json.loads((root/'evidence/design-review/cleanup.json').read_text(encoding='utf-8-sig'))
removed = photo['removed'] + design['removed']
cert = root/'Print _ Udyam Registration Certificate TOURMELLOH.pdf'
client = json.loads((root/'research/client-public-details.json').read_text(encoding='utf-8'))
certificate_unchanged = hashlib.sha256(cert.read_bytes()).hexdigest() == client['source']['sha256']
assert certificate_unchanged
required = ['public/brand/tourmelloh-logo.svg','public/brand/tourmelloh-logo.png','public/brand/tourmelloh-logo-ivory.svg','public/brand/logo-preview.png','public/images/varanasi-aerial.webp','public/og.jpg','app/page.tsx','app/journeys/page.tsx','app/journeys/[slug]/page.tsx','app/destinations/varanasi/page.tsx','content/journey-details.ts','package-lock.json']
assert all((root/p).is_file() for p in required)
record = {
    'recorded_at': datetime.now(timezone.utc).isoformat(),
    'scope': str(root),
    'before_free_bytes': baseline['drivesBeforeBytes'],
    'after_free_bytes': {drive: shutil.disk_usage(drive+':/').free for drive in ['C','D']},
    'removed': removed,
    'total_bytes_removed': sum(item['bytes'] for item in removed),
    'retained': 'All source, source generators, selected licensed images, image credits, font licenses, final evidence, active dependencies and build output.',
    'archived': {'from':'public/icon.svg','to':'.skill-archive/logo-creator/2026-10-24-tourmelloh/initial-unbranded-icon.svg','reason':'Preserve the initial editable symbol while the public app uses the confirmed Tourmelloh identity.'},
    'certificate_unchanged': certificate_unchanged,
    'certificate_publication': 'Excluded by .gitignore and .vercelignore; outside public assets; only verified public business fields used.',
    'further_safe_disposables': 'None identified. Active build and dependencies remain required.',
    'delivery_dependencies_verified': required,
    'note': 'Drive free-space changes include dependency/build growth and concurrent machine activity; reclaimed bytes are the explicit manifest sum.'
}
(root/'evidence/cleanup-closeout.json').write_text(json.dumps(record,indent=2),encoding='utf-8')
print(json.dumps({k:record[k] for k in ['total_bytes_removed','certificate_unchanged','after_free_bytes']},indent=2))
