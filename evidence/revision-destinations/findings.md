# Destination page browser review

Checked on 24 October 2026 at `http://127.0.0.1:3108` using Chromium, desktop 1440×1000 and mobile 390×844 / 320×740. Reduced motion was enabled for consistent capture. No application source was edited.

## Issues to resolve

1. **Bodh Gaya region label contrast.** The white 16px “Bihar” label sits over pale sky at all three tested widths. Desktop background sampling gives **1.50:1** contrast. See `contrast.json`, `bodh-gaya-1440-hero.jpg`, `bodh-gaya-390-hero.jpg`, and `bodh-gaya-320-hero.jpg`. Add a shade reaching the label, ideally with a horizontal component on this image.
2. **Desktop portrait-image framing.** At 1440px, the Agra hero clips the Taj Mahal’s main dome at its top edge, while the Bodh Gaya hero clips the entire upper spire. See `agra-1440-hero.jpg` and `bodh-gaya-1440-hero.jpg`. Adjust per-image desktop framing or use a suitably wide desktop image. Both portraits frame considerably better on mobile.

## Verified

- All nine page/viewport combinations returned HTTP 200 and rendered the expected page heading.
- All nine have `body.scrollWidth === viewportWidth` and document width equal to viewport width. No offscreen content was found.
- No uncaught browser JavaScript errors occurred.
- All hero images loaded with valid natural dimensions and destination-accurate alt text.
- All three practical-note accordions toggle on every page and viewport.
- Eyebrow labels stay on one line. Visit rows, numbered columns, route links and footer content remain readable and inside their bounds.
- No actual clipped body or heading text was found. Raw metrics flag the open summary’s rotated plus icon extending 4px and the 320px Ayodhya heading extending 2px beyond its text box; neither is visually clipped or causes page overflow.
- Full-page and first-screen screenshots are retained for every combination. `report.json` contains exact geometry, labels, links, image state and accordion results.

This report describes the captured version before the root agent’s corrections.
