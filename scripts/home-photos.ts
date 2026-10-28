import { collections, destinations, experiences, journeys } from "../content/catalog";
import { navDestinations } from "../content/catalog/nav";
const sig = ["royal-rajasthan","kashi-before-the-world-wakes","andaman-island-escape","char-dham-by-helicopter","kerala-backwaters-and-hills","ladakh-the-high-passes"];
const feat = ["the-taj-mahal-at-sunrise","balloon-over-the-aravallis","a-dawn-shikara-on-dal-lake","a-night-on-the-thar"];
const used = new Set<string>([...collections.map(c=>c.hero), ...sig.map(s=>journeys.find(j=>j.slug===s)!.hero), ...feat.map(s=>experiences.find(e=>e.slug===s)!.hero), "varanasi-river-mist"]);
for (const n of navDestinations) { const d = destinations.find(x=>x.slug===n.slug)!; console.log(used.has(d.hero) ? "DUP" : "ok ", d.slug, d.hero, "| gallery:", d.gallery.join(" ")); }
