"""Rebuild Tourmelloh's lossless, weight-pinned Newsreader web fonts.

Run from any directory: python scripts/build-display-fonts.py
Requires fontTools with WOFF2 support (fonttools[woff]); no network access.

Provenance: @fontsource-variable/newsreader, SIL Open Font License 1.1,
Copyright 2020 The Newsreader Project Authors.
Upstream: https://github.com/productiontype/Newsreader
The package's original Latin WOFF2 files and full licence remain untouched.

Browser audit on every preview route found all rendered Newsreader text uses
weight 400, including italic. Only the unused weight axis is pinned; the full
6..72 optical-size axis, glyph repertoire, hinting and layout tables remain.
The generator compares every glyph's decomposed outlines and advance width
against the original at 15 optical sizes before writing either derived font.
It also checks character mapping, axis mapping and vertical font metrics.
"""

from __future__ import annotations

import hashlib
import json
from copy import deepcopy
from io import BytesIO
from pathlib import Path

import fontTools
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.varLib.models import supportScalar

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "node_modules/@fontsource-variable/newsreader"
OUTPUT = ROOT / "public/fonts"
OPTICAL_SIZES = (6, 8, 10, 12, 14, 16, 18, 22, 26, 32, 40, 48, 56, 64, 72)
EPSILON = 1e-6


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def compare_values(before, after) -> float:
    if isinstance(before, (int, float)) and isinstance(after, (int, float)):
        delta = abs(before - after)
        assert delta <= EPSILON, f"Outline coordinate changed by {delta} units"
        return delta
    if isinstance(before, (tuple, list)):
        assert isinstance(after, (tuple, list)) and len(before) == len(after)
        return max((compare_values(a, b) for a, b in zip(before, after)), default=0)
    assert before == after, f"Outline command changed: {before!r} != {after!r}"
    return 0


def verify(original: TTFont, derived: TTFont) -> dict:
    glyph_names = original.getGlyphOrder()
    assert glyph_names == derived.getGlyphOrder(), "Glyph order changed"
    assert original.getBestCmap() == derived.getBestCmap(), "Character coverage changed"
    axes = derived["fvar"].axes
    assert len(axes) == 1 and axes[0].axisTag == "opsz"
    original_axis = next(a for a in original["fvar"].axes if a.axisTag == "opsz")
    for field in ("minValue", "defaultValue", "maxValue"):
        assert getattr(original_axis, field) == getattr(axes[0], field)
    if "avar" in original:
        assert original["avar"].segments["opsz"] == derived["avar"].segments["opsz"]
    for table in ("GSUB", "GPOS", "GDEF", "fpgm", "prep", "cvt "):
        assert (table in original) == (table in derived), f"Missing {table} table"
    for table, fields in {
        "head": ("unitsPerEm",),
        "hhea": ("ascent", "descent", "lineGap"),
        "OS/2": ("sTypoAscender", "sTypoDescender", "sTypoLineGap", "usWinAscent", "usWinDescent", "sxHeight", "sCapHeight"),
    }.items():
        for field in fields:
            assert getattr(original[table], field) == getattr(derived[table], field), f"Metric changed: {table}.{field}"
    maximum_delta = 0
    for size in OPTICAL_SIZES:
        before = original.getGlyphSet(location={"wght": 400, "opsz": size})
        after = derived.getGlyphSet(location={"opsz": size})
        for name in glyph_names:
            before_pen = DecomposingRecordingPen(before)
            after_pen = DecomposingRecordingPen(after)
            before[name].draw(before_pen)
            after[name].draw(after_pen)
            maximum_delta = max(maximum_delta, compare_values(before_pen.value, after_pen.value))
            compare_values(before[name].width, after[name].width)
    return {
        "glyphs": len(glyph_names), "mappedCharacters": len(original.getBestCmap()),
        "opticalSizesCompared": list(OPTICAL_SIZES),
        "outlineComparisons": len(glyph_names) * len(OPTICAL_SIZES),
        "maximumCoordinateDifference": maximum_delta,
        "advanceWidthsAndVerticalMetrics": "identical",
        "remainingAxis": {"tag": "opsz", "minimum": axes[0].minValue, "default": axes[0].defaultValue, "maximum": axes[0].maxValue},
    }


def pin_default_weight(original: TTFont) -> TTFont:
    weight = next(axis for axis in original["fvar"].axes if axis.axisTag == "wght")
    assert weight.defaultValue == 400, "This exact pruning method requires the default weight"
    derived = instantiateVariableFont(original, {"wght": 400}, inplace=False)
    # The general instancer rounds a few implied half-unit points while it
    # rewrites gvar. At the default weight we can avoid that rewrite entirely:
    # keep the original outlines and remove only tuples whose weight support
    # is exactly zero. No surviving optical-size coordinate is recalculated.
    derived["glyf"] = deepcopy(original["glyf"])
    derived["gvar"] = deepcopy(original["gvar"])
    derived["hmtx"] = deepcopy(original["hmtx"])
    for name, variations in derived["gvar"].variations.items():
        retained = []
        for variation in variations:
            weight_support = variation.axes.pop("wght", None)
            scalar = supportScalar({"wght": 0}, {"wght": weight_support}) if weight_support else 1
            assert scalar in (0, 1), "Unexpected non-default tuple; do not approximate"
            if scalar == 1:
                retained.append(variation)
        derived["gvar"].variations[name] = retained
    return derived


def main() -> None:
    results = []
    pending = []
    for style in ("normal", "italic"):
        source = PACKAGE / f"files/newsreader-latin-standard-{style}.woff2"
        original_data = source.read_bytes()
        original = TTFont(BytesIO(original_data), recalcTimestamp=False)
        derived = pin_default_weight(original)
        derived.recalcTimestamp = False
        derived.flavor = "woff2"
        stream = BytesIO()
        derived.save(stream)
        data = stream.getvalue()
        # Verify the actual encoded/decoded deliverable, not only the in-memory instance.
        verification = verify(original, TTFont(BytesIO(data), recalcTimestamp=False))
        name = f"newsreader-400-opsz-{style}.woff2"
        pending.append((name, data))
        results.append({
            "style": style, "source": source.relative_to(ROOT).as_posix(),
            "sourceSHA256": digest(original_data), "sourceBytes": len(original_data),
            "output": f"public/fonts/{name}", "outputSHA256": digest(data),
            "outputBytes": len(data), "savedBytes": len(original_data) - len(data),
            "verification": verification,
        })
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name, data in pending:
        (OUTPUT / name).write_bytes(data)
    (OUTPUT / "LICENSE-Newsreader.txt").write_bytes((PACKAGE / "LICENSE").read_bytes())
    report = {
        "packageVersion": json.loads((PACKAGE / "package.json").read_text(encoding="utf-8"))["version"],
        "fontToolsVersion": fontTools.__version__, "pinnedWeight": 400,
        "fonts": results, "savedBytes": sum(row["savedBytes"] for row in results),
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
