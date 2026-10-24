# Tourmelloh — homepage concept

An isolated, single-page client review build. Next.js 16 App Router, strict TypeScript,
Tailwind v4, Framer Motion, locally hosted Newsreader and Instrument Sans.

## Preview

```powershell
npm install
npm run dev
```

Open http://localhost:3108. For the production build: `npm run build`, then `npm start`.

## Scope

- Homepage only. Destinations, suggested journeys, Varanasi editorial, planning brief and FAQs stay on the same page.
- Real Tourmelloh name, city, phone and email verified against the user-supplied certificate.
- Trip finder, category filtering, destination details, itinerary expansion, device-local shortlist and downloadable planning brief.
- The planner is a labelled preview: no booking, payment or enquiry request is sent. The phone and email links use the visitor's own apps.
- No invented rates, reviews, awards, fleet claims, guide credentials or guarantees.
- Noindex remains enabled until the client approves the site and operational content.

## Design and assets

Newsreader provides the editorial voice; Instrument Sans handles navigation and forms.
Real destination photos, warm paper, forest green and a restrained clay accent.
The Tourmelloh mark explores a T crossed by a river channel; AI exploration is retained
in `.skill-archive`, and code-drawn SVG/PNG exports live in `public/brand`.

All six content references and six design references are documented under `research`.
Photography attribution and licences are recorded in `research/photo-sources.json`
and available from the footer. Licensed font packages carry their OFL files.

## Checks

```powershell
npm run typecheck
npm run build
python scripts/check-layout.py
node scripts/check-accessibility.cjs
```

Browser evidence and review reports are retained under `evidence`.

## Client document handling

The supplied Udyam PDF stays in the original location, unchanged. It is explicitly
excluded from Git and Vercel uploads. The homepage uses only the business name,
phone, email and city/state; personal address and registration details are not published.

## Next phase

Client approval of the homepage look and feel precedes internal pages. Actual tour
inventory, pricing, inclusions, service commitments, cancellation terms and enquiry
delivery need the client's operational information before launch.
