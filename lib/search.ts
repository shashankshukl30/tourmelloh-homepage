export type SearchKind = "Journey" | "Region" | "City" | "Experience" | "Article" | "Page";

export type SearchEntry = {
  id: string;
  kind: SearchKind;
  title: string;
  href: string;
  detail: string;
  description: string;
  thumb?: { src: string; blur: string };
  /** Weighted search text: [title & names, places & aliases, highlights, body]. */
  fields: [string, string, string, string];
};

const WEIGHTS = [10, 6, 3, 1];
const KIND_BOOST: Record<SearchKind, number> = { Journey: 1.15, City: 1.1, Region: 1.1, Experience: 1, Article: 0.85, Page: 0.7 };

/** Other names people type for the same place or idea. */
export const SYNONYMS: Record<string, string> = {
  banaras: "varanasi", benares: "varanasi", benaras: "varanasi", kashi: "varanasi", varansi: "varanasi",
  allahabad: "prayagraj", cochin: "kochi", alappuzha: "alleppey", alleppy: "alleppey", swaraj: "havelock",
  shaheed: "neil", sri: "", vijaya: "port", puram: "blair", madras: "chennai", bangalore: "bengaluru",
  calcutta: "kolkata", bombay: "mumbai", gurgaon: "delhi", ncr: "delhi", taj: "taj", bodhgaya: "bodh",
  budh: "bodh", buddha: "buddha", ladak: "ladakh", leh: "leh", darjiling: "darjeeling", rishikesh: "rishikesh",
  kedar: "kedarnath", badri: "badrinath", chardham: "char", mahakaleshwar: "mahakal", ujjian: "ujjain",
  amritsar: "amritsar", harmandir: "golden", honeymoon: "couples", couple: "couples", tigers: "tiger",
  safari: "safari", beaches: "beach", island: "islands", mountains: "himalaya", hills: "himalaya",
  pilgrimage: "sacred", pilgrimages: "sacred", yatra: "sacred", spiritual: "sacred", temples: "temple",
  palaces: "palace", desert: "thar", camel: "thar", backwaters: "backwater", houseboat: "houseboat",
  scuba: "diving", dive: "diving", snorkelling: "diving", snorkeling: "diving", wellness: "ayurveda",
  family: "families", kids: "families", elderly: "elders", parents: "elders",
};

export function normalize(value: string) {
  return value.toLocaleLowerCase("en-IN").normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function distance(a: string, b: string, limit: number) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let prevPrev: number[] = [];
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) value = Math.min(value, prevPrev[j - 2] + 1);
      row.push(value);
      best = Math.min(best, value);
    }
    if (best > limit) return limit + 1;
    prevPrev = prev.slice();
    prev.splice(0, prev.length, ...row);
  }
  return prev[b.length];
}

type Prepared = { entry: SearchEntry; tokens: string[][]; phrase: string[] };

export function prepare(entries: SearchEntry[]): Prepared[] {
  return entries.map((entry) => {
    const phrase = entry.fields.map(normalize);
    return { entry, phrase, tokens: phrase.map((field) => Array.from(new Set(field.split(" ").filter(Boolean)))) };
  });
}

/** Best quality of one query term against one field: exact 1, prefix .8, typo .5. */
function termQuality(term: string, tokens: string[]) {
  let best = 0;
  const limit = term.length >= 7 ? 2 : term.length >= 4 ? 1 : 0;
  for (const token of tokens) {
    if (token === term) return 1;
    if (token.startsWith(term) && term.length >= 2) best = Math.max(best, 0.8);
    else if (term.length >= 5 && token.includes(term)) best = Math.max(best, 0.6);
    else if (limit && best < 0.5 && distance(term, token, limit) <= limit) best = 0.5;
  }
  return best;
}

export function queryTerms(query: string) {
  const raw = normalize(query).split(" ").filter(Boolean);
  const terms = raw.map((t) => (t in SYNONYMS ? SYNONYMS[t] || t : t)).filter((t) => t.length > 0);
  const corrected = raw.some((t) => Boolean(SYNONYMS[t]) && SYNONYMS[t] !== t);
  return { raw, terms: Array.from(new Set(terms)), corrected };
}

export function search(prepared: Prepared[], query: string, kind: "All" | SearchKind = "All") {
  const { terms } = queryTerms(query);
  if (!terms.length) return { results: [] as SearchEntry[], partial: false };
  const whole = normalize(query);
  const scored = prepared
    .filter((p) => kind === "All" || p.entry.kind === kind)
    .map((p) => {
      let score = 0;
      let matched = 0;
      for (const term of terms) {
        let best = 0;
        p.tokens.forEach((tokens, f) => { best = Math.max(best, termQuality(term, tokens) * WEIGHTS[f]); });
        if (best > 0) matched++;
        score += best;
      }
      if (whole.length > 3 && p.phrase[0].includes(whole)) score += 14;
      if (p.phrase[0] === whole) score += 20;
      return { entry: p.entry, score: score * KIND_BOOST[p.entry.kind], matched };
    })
    .filter((r) => r.score > 0);
  const all = scored.filter((r) => r.matched === terms.length);
  const partial = all.length === 0;
  const list = (partial ? scored.filter((r) => r.matched >= Math.ceil(terms.length / 2)) : all)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry);
  return { results: list, partial };
}
