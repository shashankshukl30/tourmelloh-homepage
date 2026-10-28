import { prepare, search } from "../lib/search";
import { buildSearchIndex } from "../lib/search-index";
const p = prepare(buildSearchIndex());
const queries = ["banaras", "varansi", "taj mahal", "andman", "golden triangel", "honeymoon", "tiger", "char dham", "cochin", "swaraj dweep", "ladak", "kerla houseboat", "jaipur balloon", "udaipur", "pilgrimage", "kedarnath helicopter", "beach", "rishikesh yoga", "allahabad", "sri vijaya puram", "golden temple", "buddhist", "snow", "elderly parents"];
for (const q of queries) {
  const { results, partial } = search(p, q);
  console.log(`${q.padEnd(22)} ${String(results.length).padStart(3)}${partial ? "~" : " "} ${results.slice(0, 3).map((r) => `${r.kind}:${r.title}`).join(" | ")}`);
}
