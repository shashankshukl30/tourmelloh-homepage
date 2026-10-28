/**
 * Checks the catalogue against docs/CONTENT-BRIEF.md.
 * Run: npx tsx scripts/validate-catalog.ts   (exit 1 on any problem)
 */
import {
  articles,
  cities,
  collections,
  destinations,
  experiences,
  journeys,
  pages,
} from "../content/catalog";
import { navCities, navCollections, navDestinations } from "../content/catalog/nav";

const problems: string[] = [];
const fail = (where: string, what: string) => problems.push(`${where}: ${what}`);

const banned = [
  "—", "nestled", "tapestry", "embark", "unforgettable", "hidden gem", "breathtaking",
  "delve", "testament", "bucket list", "magical", "once-in-a-lifetime", "seamless",
  "elevate", "immerse yourself", "symphony", "₹", "starting at", "guaranteed", "!",
  "todo", "lorem", "placeholder",
];
const words = (text: string) => text.trim().split(/\s+/).length;

function scan(where: string, value: unknown) {
  const text = JSON.stringify(value).toLowerCase();
  for (const term of banned) if (text.includes(term)) fail(where, `contains "${term}"`);
}
function seo(where: string, s: { title: string; description: string }) {
  if (s.title.length < 45 || s.title.length > 62) fail(where, `seo.title is ${s.title.length} chars`);
  if (s.description.length < 130 || s.description.length > 165)
    fail(where, `seo.description is ${s.description.length} chars`);
}
function unique<T>(where: string, label: string, list: T[]) {
  const seen = new Set<T>();
  for (const item of list) {
    if (seen.has(item)) fail(where, `${label} repeats "${String(item)}"`);
    seen.add(item);
  }
}

const citySlugs = new Set(cities.map((c) => c.slug));
const destinationSlugs = new Set(destinations.map((d) => d.slug));
const experienceSlugs = new Set(experiences.map((e) => e.slug));
const journeySlugs = new Set(journeys.map((j) => j.slug));

unique("catalogue", "journey slug", journeys.map((j) => j.slug));
unique("catalogue", "city slug", cities.map((c) => c.slug));
// Cards of one kind appear side by side, so no two may open on the same photograph.
unique("catalogue", "journey hero", journeys.map((j) => j.hero));
unique("catalogue", "city hero", cities.map((c) => c.hero));
unique("catalogue", "destination hero", destinations.map((d) => d.hero));
unique("catalogue", "experience hero", experiences.map((e) => e.hero));

for (const j of journeys) {
  const at = `journey ${j.slug}`;
  scan(at, j);
  seo(at, j.seo);
  if (j.days !== j.nights + 1) fail(at, "days must equal nights + 1");
  if (j.itinerary.length !== j.days) fail(at, `${j.itinerary.length} itinerary days for ${j.days} days`);
  j.itinerary.forEach((d, i) => {
    if (d.day !== i + 1) fail(at, `day ${i + 1} numbered ${d.day}`);
    const n = words(d.text);
    if (n < 60 || n > 125) fail(at, `day ${d.day} text is ${n} words`);
  });
  unique(at, "photo", [j.hero, ...j.gallery, ...j.itinerary.map((d) => d.photo)]);
  if (j.signature.length < 3 || j.signature.length > 4) fail(at, "needs 3–4 signature moments");
  j.cities.forEach((c) => citySlugs.has(c) || fail(at, `unknown city ${c}`));
  j.destinations.forEach((d) => destinationSlugs.has(d) || fail(at, `unknown destination ${d}`));
  j.experiences.forEach((e) => experienceSlugs.has(e) || fail(at, `unknown experience ${e}`));
  const n = words(j.lead);
  if (n < 50 || n > 100) fail(at, `lead is ${n} words`);
}

for (const d of destinations) {
  const at = `destination ${d.slug}`;
  scan(at, d);
  seo(at, d.seo);
  d.cities.forEach((c) => citySlugs.has(c) || fail(at, `unknown city ${c}`));
  unique(at, "photo", [d.hero, ...d.gallery]);
}

for (const c of cities) {
  const at = `city ${c.slug}`;
  scan(at, c);
  seo(at, c.seo);
  if (c.destination && !destinationSlugs.has(c.destination)) fail(at, `unknown destination ${c.destination}`);
  unique(at, "photo", [c.hero, ...c.gallery]);
}

for (const e of experiences) {
  const at = `experience ${e.slug}`;
  scan(at, e);
  seo(at, e.seo);
  if (!citySlugs.has(e.city)) fail(at, `unknown city ${e.city}`);
}

for (const c of collections) {
  scan(`collection ${c.id}`, c);
  seo(`collection ${c.id}`, c.seo);
}

for (const a of articles) {
  const at = `article ${a.slug}`;
  scan(at, a);
  seo(at, a.seo);
  a.journeys.forEach((j) => journeySlugs.has(j) || fail(at, `unknown journey ${j}`));
  a.places.forEach((p) => citySlugs.has(p) || destinationSlugs.has(p) || fail(at, `unknown place ${p}`));
}

for (const p of pages) {
  scan(`page ${p.slug}`, p);
  seo(`page ${p.slug}`, p.seo);
}

navCollections.forEach((c) => collections.some((x) => x.slug === c.slug) || fail("nav", `unknown collection ${c.slug}`));
navDestinations.forEach((d) => destinationSlugs.has(d.slug) || fail("nav", `unknown destination ${d.slug}`));
navCities.forEach((c) => citySlugs.has(c.slug) || fail("nav", `unknown city ${c.slug}`));

console.log(
  `${journeys.length} journeys, ${destinations.length} destinations, ${cities.length} cities, ` +
    `${experiences.length} experiences, ${collections.length} collections, ${articles.length} articles, ${pages.length} pages`,
);
if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join("\n"));
  console.error(`${problems.length} problem(s)`);
  process.exit(1);
}
console.log("✓ catalogue valid");
