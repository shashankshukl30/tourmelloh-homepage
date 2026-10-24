# Tourmelloh vector source

The primary signature combines the existing approved three-path T/river symbol
and ten recovered original glyphs spelling `tourmelloh`. The flat-topped `t`,
rounded geometric bowls and sculpted double `l` come from the large wordmark in
the original AI concept. They are not replacement font outlines.

## Re-export

From the project root:

```powershell
python scripts/brand/generate.py
node scripts/brand/render.cjs
```

The Python exporter uses only the standard library and the committed
`wordmark-source.json` vector master. The renderer uses Playwright, falling back
to the existing `D:/remotion-studio` installation on this machine. It launches
a separate headless Chromium process and closes it after export.

## Masters

- `public/brand/tourmelloh-logo.svg`: forest horizontal signature.
- `public/brand/tourmelloh-logo-ivory.svg`: reversed horizontal signature.
- `public/brand/tourmelloh-symbol.svg`: transparent forest symbol.
- `public/brand/tourmelloh-symbol-ivory.svg`: transparent ivory symbol.
- `public/brand/tourmelloh-symbol-copper.svg`: transparent copper symbol.
- `public/brand/tourmelloh-favicon.svg`: ivory symbol on a forest tile.

Horizontal artwork is `561.255 × 112`, an aspect ratio of `5.011205:1`.
Symbol artwork is `112 × 112`. Preserve these proportions; use CSS `height:
auto` or a matching aspect ratio. All SVG artwork is paths with real transparent
negative space. No fonts, masks, raster images or network requests are needed
to display the exported marks.

The wordmark master stores closed cubic Bezier contours recovered from
`.skill-archive/logo-creator/2026-10-24-tourmelloh/ai-refined-concept.png`.
Its source bounds are `x=409, y=242, width=1031, height=180`; the original
letter spacing is retained. All ten letters are separate paths with transparent
counters. The existing symbol paths are unchanged. The wordmark's former
vertical bounds are retained; only the horizontal logo aspect ratio changes.

`recover-wordmark.py` documents and reproduces the one-time raster-to-vector
recovery. It requires Pillow, NumPy, OpenCV and Potrace, and verifies the source
SHA256 before tracing. Routine exports do not require those dependencies or the
archived raster. `validate.py` checks actual Chromium output against the original
lettering, the ten glyphs, transparency, and unchanged symbol/source hashes.

The previous Instrument Sans substitution and its license remain in repository
history. `INSTRUMENT-SANS-OFL.txt` is retained for the earlier exports; the current
logo has no font dependency.

## Colours and preview

Forest `#123F32`, ivory `#F8F4EB`, copper `#B87648`.
`logo-preview.html` and `logo-preview.png` show the primary and reversed
signatures, symbol, colour palette and favicon at 16, 24, 32 and 48 pixels.
Transparent horizontal PNGs are 2400 × 479; symbol PNGs are 1024 × 1024.

The source combines the unchanged authored T/river symbol with faithfully
recovered lettering. The concept PNG remains untouched. `validation.json`
records raster fidelity and export verification.
