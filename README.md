# Tourmelloh — client design preview

An isolated client review build. Next.js 16 App Router, strict TypeScript,
Tailwind v4, Framer Motion, locally hosted Newsreader and Instrument Sans.

## Preview

Public client link: https://tourmelloh-preview.vercel.app/ — no Vercel login or share token.
After each reviewed preview deployment, assign this alias to the verified deployment with `vercel alias set <deployment-url> tourmelloh-preview.vercel.app --scope omvitys-projects`. The GitHub repository remains private.

```powershell
npm install
npm run dev
```

Open http://localhost:3108. For the production build: `npm run build`, then `npm start`.

## Scope

- A fourteen-page preview: a film-led homepage, journey collection, seven detailed itinerary pages, four destination guides and working site search.
- Real Tourmelloh name, city, phone and email verified against the user-supplied certificate.
- Trip finder, an eight-place destination index, category/destination/shortlist filters, 32 daily plans, device-local shortlist and downloadable planning brief.
- Search indexes all seven journeys and eight destinations, including familiar names such as Kashi, Banaras, Bodh Gaya and Taj Mahal. Results link to real guides, itineraries or the selected destination in the homepage index.
- The planner is a labelled preview: no booking, payment or enquiry request is sent. The phone and email links use the visitor's own apps.
- No invented rates, reviews, awards, fleet claims, guide credentials or guarantees.
- Noindex remains enabled until the client approves the site and operational content.

## Design and assets

Newsreader provides the editorial voice; Instrument Sans handles navigation and forms.
Real destination photos and Varanasi river footage, warm paper, forest green and a restrained clay accent. All surfaces use a rounded scale; small copy is at least 14px, with 16px or larger body text and controls.
The Tourmelloh mark explores a T crossed by a river channel; AI exploration is retained
in `.skill-archive`, and code-drawn SVG/PNG exports live in `public/brand`.

All six content references and six design references are documented under `research`.
Current photography and film permissions are recorded privately in `evidence/media-upgrade.json` and `evidence/video-sources.json`. All displayed media permits use without visible attribution; retired attribution-required images are archived locally outside the public app and Git uploads. Licensed font packages carry their OFL files.

The hero uses separate desktop/portrait H.264 films with a one-second loop dissolve, a real poster, a pause/play control and reduced-motion support. The source original and rebuild recipe remain local under ignored `research/media/`.
The complete hero fits the viewport below the navigation, including short laptop and phone landscape layouts. Navigation has an animated rounded backplate; buttons, photo frames and caption surfaces respond to pointer and keyboard use. The hero entrance and section reveals use Framer Motion. Reduced-motion mode keeps the same content and controls without displacement or automatic film playback.
Tour research, transfer-estimate assumptions and source references are in `research/tour-upgrade.json`. The routes are proposals, not confirmed product inventory.

## Checks

```powershell
npm run typecheck
npm run build
npm run check:preview
python scripts/check-responsive-matrix.py
```

Browser evidence and review reports are retained under `evidence`.
The final interaction revision is in `evidence/interaction-final`, with dedicated viewport, navigation, button and photo-motion checks alongside it.
The full preview check covers all fourteen routes at four widths, accessible controls,
shortlist persistence, route-aware planning, downloadable briefs, search, destination selection, video controls and a branded 404. The wider layout matrix covers fifteen widths from 320px to 1920px.
Development filesystem caching is disabled because this Next.js version retained
a stale missing-import result while new page stylesheets were being added.
The production build and its caching remain unchanged.

## Client document handling

The supplied Udyam PDF stays in the original location, unchanged. It is explicitly
excluded from Git and Vercel uploads. The homepage uses only the business name,
phone, email and city/state; personal address and registration details are not published.

## Next phase

Client approval of this selected page set precedes the full multipage build. Actual tour
inventory, pricing, inclusions, service commitments, cancellation terms and enquiry
delivery need the client's operational information before launch.
