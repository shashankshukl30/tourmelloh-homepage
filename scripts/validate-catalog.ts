/**
 * Checks the catalogue against the client brief v5 and docs/CONTENT-BRIEF.md.
 * Run: npm run validate   (exit 1 on any problem)
 */
import { catalogue, collections, departures, faqGroups, pages, weddingVenues } from "../content/catalog";
import { TIERS, type ItemId, type Journey } from "../content/catalog/types";

const problems: string[] = [];
const fail = (where: string, what: string) => problems.push(`${where}: ${what}`);

const banned = [
  "—", "nestled", "tapestry", "embark", "unforgettable", "hidden gem", "breathtaking", "delve", "testament",
  "bucket list", "magical", "once-in-a-lifetime", "seamless", "elevate", "immerse yourself", "symphony",
  "₹", "starting at", "guaranteed", "!", "todo", "lorem", "placeholder", "no. 1", "most popular",
];
// Rupee amounts written out ("Rs. 500", "INR 2,000", "500 rupees").
const money = /\b(rs\.?|inr)\s*\d|\d[\d,]*\s*rupees\b/i;
const words = (text: string) => text.trim().split(/\s+/).length;
const scan = (where: string, value: unknown) => {
  const text = JSON.stringify(value).toLowerCase();
  for (const term of banned) if (text.includes(term)) fail(where, `contains "${term}"`);
  if (money.test(text)) fail(where, "contains a price");
};
const seo = (where: string, s: { title: string; description: string }) => {
  if (s.title.length < 40 || s.title.length > 62) fail(where, `seo.title is ${s.title.length} chars`);
  if (s.description.length < 120 || s.description.length > 165) fail(where, `seo.description is ${s.description.length} chars`);
};
const unique = <T>(where: string, label: string, list: T[]) => {
  const seen = new Set<T>();
  for (const item of list) {
    if (seen.has(item)) fail(where, `${label} repeats "${String(item)}"`);
    seen.add(item);
  }
};

const { journeys, services, experiences, guides, articles, reviews } = catalogue;
const itemIds = new Set<string>([...services.map((s) => s.id), ...experiences.map((e) => e.id)]);
const publishedItems = new Set<string>([...services, ...experiences].filter((i) => i.status === "published").map((i) => i.id));
const journeyIds = new Set<string>(journeys.map((j) => j.id));
const publishedJourneys = new Set<string>(journeys.filter((j) => j.status === "published").map((j) => j.id));
const delivered = new Map<string, string[]>(
  [...services, ...experiences].map((i) => [i.id, i.relations.deliveredBy ?? []]),
);

unique("catalogue", "journey id", journeys.map((j) => j.id));
unique("catalogue", "journey slug", journeys.map((j) => j.slug));
unique("catalogue", "service id", services.map((s) => s.id));
unique("catalogue", "service slug", services.map((s) => s.slug));
unique("catalogue", "experience id", experiences.map((e) => e.id));
unique("catalogue", "experience slug", experiences.map((e) => e.slug));
unique("catalogue", "published journey hero", journeys.filter((j) => j.status === "published").map((j) => j.hero));

const checkRef = (where: string, id: string, published: boolean) => {
  if (!itemIds.has(id)) fail(where, `unknown item ${id}`);
  else if (published && !publishedItems.has(id)) fail(where, `published record links draft item ${id}`);
};

function checkJourney(j: Journey) {
  const at = `journey ${j.id}`;
  scan(at, j);
  if (j.status !== "published") return;
  seo(at, j.seo);
  if (j.days !== j.nights + 1) fail(at, "days must equal nights + 1");
  if (j.itinerary.length !== j.days) fail(at, `${j.itinerary.length} itinerary days for ${j.days} days`);
  const overnightNights = j.overnights.reduce((sum, o) => sum + o.nights, 0);
  if (overnightNights !== j.nights) fail(at, `overnights add to ${overnightNights}, not ${j.nights}`);
  j.itinerary.forEach((d, i) => {
    if (d.day !== i + 1) fail(at, `day ${i + 1} numbered ${d.day}`);
    if (!d.blocks.length) fail(at, `day ${d.day} has no blocks`);
  });
  unique(at, "photo", [j.hero, ...j.gallery, ...j.itinerary.map((d) => d.photo)]);
  for (const tier of TIERS) {
    const m = j.tiers[tier];
    const fields = [m.hotels, m.vehicle, m.meals, m.boat, m.darshan, m.assistance, m.guide, m.admissions, m.photography, m.security];
    if (fields.some((f) => !f.trim())) fail(at, `${tier} manifest has an empty field`);
    if (!m.lines.length) fail(at, `${tier} manifest has no inclusion lines`);
    if (!m.excluded.length) fail(at, `${tier} manifest lists no exclusions`);
    m.lines.forEach((line) => checkRef(`${at} ${tier}`, line.item, true));
    // A ritual booked as an experience is delivered by its service: never list both in one tier.
    const ids = new Set<string>(m.lines.map((l) => l.item));
    for (const id of ids) for (const via of delivered.get(id) ?? []) if (ids.has(via)) fail(at, `${tier} lists ${id} and its delivery ${via}`);
  }
  // Luxury keeps everything Standard has, unless it replaces it in the same session (a better boat).
  const lux = j.tiers.luxury.lines;
  for (const line of j.tiers.standard.lines) {
    const kept = lux.some((l) => l.item === line.item || (line.replacementGroup && l.replacementGroup === line.replacementGroup));
    if (!kept) fail(at, `luxury drops standard item ${line.item}`);
  }
  j.related.forEach((id) => checkRef(`${at} related`, id, true));
  if (words(j.lead) < 40) fail(at, "lead is too short");
}

journeys.forEach(checkJourney);

for (const s of services) {
  const at = `service ${s.id}`;
  scan(at, s);
  if (s.status === "published") seo(at, s.seo);
  for (const id of [...(s.relations.deliveredBy ?? []), ...(s.relations.overlapsWith ?? [])]) if (!itemIds.has(id)) fail(at, `unknown relation ${id}`);
  if (s.price.mode === "fixed") fail(at, "fixed price present: needs approved currency, tax, unit and validity");
}
for (const e of experiences) {
  const at = `experience ${e.id}`;
  scan(at, e);
  if (e.status === "published") seo(at, e.seo);
  for (const id of [...(e.relations.deliveredBy ?? []), ...(e.relations.overlapsWith ?? [])]) if (!itemIds.has(id)) fail(at, `unknown relation ${id}`);
  unique(at, "photo", [e.hero, ...e.gallery]);
  if (e.price.mode === "fixed") fail(at, "fixed price present: needs approved currency, tax, unit and validity");
}

for (const c of collections) {
  const at = `collection ${c.id}`;
  scan(at, c);
  seo(at, c.seo);
  c.journeys.forEach((id) => journeyIds.has(id) || fail(at, `unknown journey ${id}`));
  c.offers.forEach((o) => journeyIds.has(o.parent) || fail(at, `offer ${o.id} has unknown parent ${o.parent}`));
}
for (const d of departures) {
  const at = `departure ${d.id}`;
  scan(at, d);
  if (!journeyIds.has(d.parent)) fail(at, `unknown parent ${d.parent}`);
  if (d.dates && (!d.dates.approvedBy || !d.dates.approvedAt)) fail(at, "dates shown without approval metadata");
  if (!d.dates && d.status !== "Dates coming soon") fail(at, `status "${d.status}" needs approved dates`);
  if (!d.hostScope.trim()) fail(at, "female host scope missing");
}
for (const g of guides) {
  scan(`guide ${g.slug}`, g);
  if (g.status === "published") seo(`guide ${g.slug}`, g.seo);
}
for (const a of articles) {
  const at = `article ${a.slug}`;
  scan(at, a);
  if (a.status !== "published") continue;
  seo(at, a.seo);
  a.journeys.forEach((id) => publishedJourneys.has(id) || fail(at, `links unpublished journey ${id}`));
  a.items.forEach((id: ItemId) => checkRef(at, id, true));
}
for (const r of reviews) {
  if (r.status === "published" && !r.consent.recordedOn) fail(`review ${r.id}`, "published without recorded consent");
}
for (const p of pages) {
  scan(`page ${p.slug}`, p);
  seo(`page ${p.slug}`, p.seo);
}
faqGroups.forEach((g) => scan(`faq ${g.heading}`, g));
weddingVenues.forEach((v) => scan(`venue ${v.name}`, v));

const count = (list: { status: string }[]) => `${list.filter((i) => i.status === "published").length}/${list.length}`;
console.log(
  `journeys ${count(journeys)}, services ${count(services)}, experiences ${count(experiences)}, ` +
    `guides ${count(guides)}, articles ${count(articles)}, collections ${collections.length}, departures ${departures.length}, pages ${pages.length} (published/all)`,
);
if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join("\n"));
  console.error(`${problems.length} problem(s)`);
  process.exit(1);
}
console.log("✓ catalogue valid");
