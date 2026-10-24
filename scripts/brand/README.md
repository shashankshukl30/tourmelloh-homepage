# Tourmelloh vector source

The primary signature combines an original three-path T/river symbol and ten
outlined glyphs spelling `tourmelloh`. The double `l` is intentional and each
letter is a separate outlined glyph.

## Re-export

From the project root:

```powershell
python scripts/brand/generate.py
node scripts/brand/render.cjs
```

The Python source requires FontTools with WOFF2 support and the project's
installed Instrument Sans package. The renderer uses Playwright, falling back
to the existing `D:/remotion-studio` installation on this machine. It launches
a separate headless Chromium process and closes it after export.

## Masters

- `public/brand/tourmelloh-logo.svg`: forest horizontal signature.
- `public/brand/tourmelloh-logo-ivory.svg`: reversed horizontal signature.
- `public/brand/tourmelloh-symbol.svg`: transparent forest symbol.
- `public/brand/tourmelloh-symbol-ivory.svg`: transparent ivory symbol.
- `public/brand/tourmelloh-symbol-copper.svg`: transparent copper symbol.
- `public/brand/tourmelloh-favicon.svg`: ivory symbol on a forest tile.

Horizontal artwork is `646.466 × 112`, an aspect ratio of `5.772:1`.
Symbol artwork is `112 × 112`. Preserve these proportions; use CSS `height:
auto` or a matching aspect ratio. All SVG artwork is paths with real transparent
negative space. No fonts, masks, raster images or network requests are needed
to display the exported marks.

The wordmark uses Instrument Sans at variable weight 580, width 100, with
explicit optical pair adjustments. The font license is retained alongside
this source. Text is outlined in the SVG exports.

## Colours and preview

Forest `#123F32`, ivory `#F8F4EB`, copper `#B87648`.
`logo-preview.html` and `logo-preview.png` show the primary and reversed
signatures, symbol, colour palette and favicon at 16, 24, 32 and 48 pixels.
Transparent horizontal PNGs are 2400 × 416; symbol PNGs are 1024 × 1024.

The source recreates the T/river concept using authored curves rather than
tracing the image-generation concept board.
