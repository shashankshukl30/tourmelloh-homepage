"""Record this revision's completed cleanup and retained source integrity."""
import hashlib
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(relative):
    return json.loads((ROOT / relative).read_text(encoding="utf-8-sig"))


def sha256(file):
    digest = hashlib.sha256()
    with file.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


video = read("evidence/video-sources.json")
photos = read("evidence/media-upgrade.json")
removed = video["cleanup"]["removed"] + photos["cleanup"]["selection_scratch_removed"]
for item in removed:
    target = Path(item["path"]).resolve()
    if ROOT not in target.parents or target.exists():
        raise RuntimeError(f"Cleanup evidence not confirmed: {target}")

archives = []
for item in photos["archive"]:
    survivor = Path(item["retained_copy"])
    valid = survivor.stat().st_size == item["bytes"] and sha256(survivor) == item["sha256"]
    if not valid:
        raise RuntimeError(f"Archived asset integrity failed: {survivor}")
    archives.append({**item, "retained_copy_verified": valid})

certificate = ROOT / "Print _ Udyam Registration Certificate TOURMELLOH.pdf"
certificate_hash = sha256(certificate)
expected = "bf75cd7ef9dd4edf6b39053ec65cdcb7a2c5c5d17923339759676bb762aa8ac4"
if certificate_hash != expected:
    raise RuntimeError("Client certificate changed")

report = {
    "recorded_at": datetime.now(timezone.utc).isoformat(),
    "scope": str(ROOT),
    "revision_start_free_bytes": {"C": 76012974080, "D": 36805107712},
    "after_free_bytes": {drive: shutil.disk_usage(f"{drive}:/").free for drive in ["C", "D"]},
    "removed": removed,
    "removed_bytes": sum(item["bytes"] for item in removed),
    "archive_integrity": archives,
    "certificate": {"sha256": certificate_hash, "unchanged": True, "excluded_from_publication": True},
    "retained": [
        "Editable website code, dependencies and the active production build",
        "Selected unmodified film original and its rebuild scripts",
        "Source and licence records, selected photographs and brand exports",
        "Browser verification evidence including the recorded harness fixes",
        "User-supplied registration PDF and exact retired-image recovery copies",
    ],
    "notes": [
        "Cleanup was completed by the media tasks; paths and nonexistence rechecked at closeout.",
        "No further files were positively identified as disposable. No blanket cache or temporary-directory purge.",
        "Archived images are retained recovery material and are not counted as reclaimed space.",
        "Free-space change also reflects new assets and build/evidence files, not only removed bytes.",
        "All 14 pages and current image dependencies passed Chromium and WebKit browser checks after media cleanup.",
    ],
}
(ROOT / "evidence/cinematic-cleanup.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"removed_bytes": report["removed_bytes"], "after_free_bytes": report["after_free_bytes"], "certificate_unchanged": True}))
