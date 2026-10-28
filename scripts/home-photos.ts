import { collections, destinations, experiences, journeys } from "../content/catalog";
const sig = ["royal-rajasthan","kashi-before-the-world-wakes","andaman-island-escape","char-dham-by-helicopter","kerala-backwaters-and-hills","ladakh-the-high-passes"];
const used = new Set<string>([...collections.map(c=>c.hero), ...sig.map(s=>journeys.find(j=>j.slug===s)!.hero), destinations.find(d=>d.slug==="uttar-pradesh")!.hero, "varanasi-river-mist"]);
console.log("used:", [...used].join(" "));
for (const e of experiences) console.log(used.has(e.hero) ? "DUP " : "ok  ", e.slug, e.hero);
