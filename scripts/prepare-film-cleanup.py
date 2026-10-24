"""Verify exact Git recovery for superseded generated public assets before removal."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import shutil
import subprocess

root = Path(__file__).resolve().parents[1]
revision = "b0da8bcdbec7932203738582c746413d7d49e5bd"
files = ["public/videos/varanasi-desktop.mp4", "public/videos/varanasi-mobile.mp4",
         "public/images/varanasi-film-poster.webp"]
subprocess.run(["git", "merge-base", "--is-ancestor", revision, "origin/preview/client-review"], cwd=root, check=True)
source = root / "research/media/hero-film/36631860-original.mp4"
assert hashlib.sha256(source.read_bytes()).hexdigest() == "aac7f97f1dffcf0bfb092e3076632b0c402939f229f22e43609ff666460a2a20"
assert (root / "research/media/hero-film/build-hero.py").is_file()
for replacement in ["public/videos/india-desktop.mp4", "public/videos/india-mobile.mp4", "public/images/india-film-poster.webp"]:
    assert (root / replacement).stat().st_size > 10000
manifest = {"preparedAt": datetime.now(timezone.utc).isoformat(), "scope": str(root),
            "beforeFreeBytes": {d: shutil.disk_usage(f"{d}:/").free for d in ["C", "D"]},
            "files": [], "sourceAndRebuildScriptRetained": True}
for relative in files:
    file = root / relative
    assert file.resolve().is_relative_to(root) and not file.is_symlink() and not file.is_junction()
    data = file.read_bytes()
    recovery = subprocess.check_output(["git", "show", f"{revision}:{relative}"], cwd=root)
    digest = hashlib.sha256(data).hexdigest()
    assert len(data) == len(recovery) and digest == hashlib.sha256(recovery).hexdigest()
    manifest["files"].append({"path": str(file.resolve()), "bytes": len(data), "sha256": digest,
                             "reason": "Superseded generated single-place web export; new four-place film is integrated and verified.",
                             "retainedCopy": f"git:{revision}:{relative}", "recoveryBytesAndSHA256Verified": True})
(root / ".vercel/film-cleanup-manifest.json").write_text(json.dumps(manifest, indent=2))
print(json.dumps({"verifiedFiles": len(files), "bytes": sum(f["bytes"] for f in manifest["files"])}))
