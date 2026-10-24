"""Summarize controlled browser runs without confusing lab data with field data."""
from pathlib import Path
from statistics import median
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "evidence/performance"
before = json.loads((OUT / "baseline-local.json").read_text())
after = json.loads((OUT / "after-local.json").read_text())
report = {"method": before["conditions"], "scope": "Controlled local production builds; 3 fresh browser runs per profile. Not real-user or CrUX data.", "profiles": []}
for profile in ("mobile", "desktop"):
    old = [r for r in before["runs"] if r["profile"]["name"] == profile]
    new = [r for r in after["runs"] if r["profile"]["name"] == profile]
    result = {"profile": old[0]["profile"], "metrics": {}}
    for name, metric in (("largestContentfulPaint", lambda r: r["lcp"][-1]["time"]), ("firstVideoFrame", lambda r: r["firstVideoFrame"]), ("firstContentfulPaint", lambda r: next(p["time"] for p in r["paints"] if p["name"] == "first-contentful-paint"))):
        initial = [metric(r) for r in old]
        final = [metric(r) for r in new]
        a, b = median(initial), median(final)
        result["metrics"][name] = {"beforeMedianMs": round(a), "afterMedianMs": round(b), "improvementPercent": round((a-b)/a*100, 1), "beforeRangeMs": [round(min(initial)), round(max(initial))], "afterRangeMs": [round(min(final)), round(max(final))]}
    result["maximumCLSAfter"] = max(r["cls"] for r in new)
    report["profiles"].append(result)
report["decisions"] = [
    {"change": "Weight-pinned Newsreader fonts with original optical-size variation", "decision": "kept", "proof": "157688 fewer font bytes; every glyph outline, advance and sampled browser pixels match. See evidence/display-font-build.json and display-font-proof.json."},
    {"change": "Early high-priority poster and native responsive film source discovery", "decision": "kept", "proof": "LCP and first video frame improved beyond measured spread. Media files are byte-for-byte unchanged. No first-paint improvement is claimed: mobile FCP remains inside the measured spread; desktop FCP changed by12ms."},
    {"change": "Accurate portrait-guide responsive image sizes", "decision": "kept", "proof": "Same photos and quality90, adequate crop pixel coverage in48 cases; desktop image bytes reduced59% for Agra and47% for Bodh Gaya."},
    {"change": "Broad homepage JavaScript rewrite", "decision": "not attempted", "proof": "Audit found homepage-specific bundle only8.9KB gzip. Heavy framework shared code was not a demonstrated bottleneck."},
]
(OUT / "comparison.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
