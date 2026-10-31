export type SearchKind = "Journey" | "Service" | "Experience" | "Guide" | "Article" | "Page";

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
const KIND_BOOST: Record<SearchKind, number> = { Journey: 1.15, Service: 1.05, Experience: 1.05, Guide: 1, Article: 0.85, Page: 0.75 };

/** Other names people type for the same place or idea. */
export const SYNONYMS: Record<string, string> = {
  banaras: "varanasi", benares: "varanasi", benaras: "varanasi", kashi: "varanasi", varansi: "varanasi",
  allahabad: "prayagraj", prayag: "prayagraj", sangam: "sangam", triveni: "sangam", kumbh: "sangam",
  bodhgaya: "bodh", budh: "bodh", buddhist: "buddha", mahabodhi: "bodh", ayodhyaji: "ayodhya", ram: "ayodhya",
  vindhyachal: "vindhyachal", mirzapur: "vindhyachal", chitrakut: "chitrakoot", naimisharanya: "naimisharanya",
  gaya: "gaya", pind: "pind", pinddaan: "pind", shraddh: "pind", ancestors: "pind",
  taxi: "car", cab: "car", driver: "car", sedan: "car", suv: "car", innova: "car", tempo: "traveller",
  chopper: "helicopter", heli: "helicopter", airport: "arrival", pickup: "arrival", transfer: "arrival",
  aarti: "aarti", arti: "aarti", ganga: "river", ganges: "river", boat: "boat", bajra: "boat", cruise: "boat",
  pooja: "puja", pujan: "puja", rudrabhishek: "puja", priest: "puja", pandit: "puja", darshan: "darshan", vip: "darshan",
  wheelchair: "accessible", elderly: "senior", parents: "senior", elders: "senior", old: "senior", shravan: "senior",
  kids: "family", children: "family", families: "family", ladies: "women", womens: "women", female: "women", solo: "women",
  photographer: "photography", photoshoot: "photography", photos: "photography", video: "film",
  marriage: "wedding", shaadi: "wedding", vivah: "wedding", venue: "wedding",
  ayurveda: "wellness", yoga: "wellness", meditation: "wellness", spa: "wellness",
  food: "food", street: "food", chaat: "food", kachori: "food", lassi: "food", silk: "silk", saree: "silk", weaving: "silk",
  music: "music", sitar: "music", tabla: "music", pilgrimage: "sacred", yatra: "sacred", spiritual: "sacred", temples: "temple",
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
  // Compare whole titles against what the visitor meant (Banaras -> varanasi), not what they typed.
  const whole = terms.join(" ");
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
