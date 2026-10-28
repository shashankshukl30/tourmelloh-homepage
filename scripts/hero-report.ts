import { articles, cities, collections, destinations, experiences, journeys } from "../content/catalog";
const groups: Record<string, [string, string][]> = {
  journeys: journeys.map((j) => [j.slug, j.hero]),
  cities: cities.map((c) => [c.slug, c.hero]),
  destinations: destinations.map((d) => [d.slug, d.hero]),
  experiences: experiences.map((e) => [e.slug, e.hero]),
  articles: articles.map((a) => [a.slug, a.hero]),
  collections: collections.map((c) => [c.id, c.hero]),
};
for (const [name, list] of Object.entries(groups)) {
  const by = new Map<string, string[]>();
  list.forEach(([slug, hero]) => by.set(hero, [...(by.get(hero) ?? []), slug]));
  for (const [hero, slugs] of by) if (slugs.length > 1) console.log(name, hero, slugs.join(", "));
}
const used = new Set(Object.values(groups).flat().map(([, h]) => h));
console.log("heroes in use:", used.size);
