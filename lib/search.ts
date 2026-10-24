export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: "Journey" | "Destination" | "Article";
  detail: string;
  keywords: string;
};

function normalize(value: string) {
  return value.toLocaleLowerCase("en-IN").normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

// The browser receives only the compact index, never the complete article bodies.
export function searchTravel(entries: SearchEntry[], query: string, kind: "All" | SearchEntry["kind"] = "All") {
  const terms = normalize(query).split(" ").filter(Boolean);
  return entries
    .filter(entry => kind === "All" || entry.kind === kind)
    .map(entry => {
      const title = normalize(entry.title);
      const keywords = normalize(entry.keywords);
      const all = normalize(`${entry.title} ${entry.description} ${entry.detail} ${entry.keywords}`);
      const matches = terms.every(term => all.includes(term));
      const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 8 : keywords.includes(term) ? 4 : 1), 0);
      return { entry, score, matches };
    })
    .filter(result => result.matches)
    .sort((a, b) => b.score - a.score)
    .map(result => result.entry);
}
