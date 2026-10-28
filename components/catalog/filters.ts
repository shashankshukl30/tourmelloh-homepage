import { collections } from "@/content/catalog";

export const collectionFilters = [
  { name: "All journeys", href: "/journeys" },
  ...collections.map((c) => ({ name: c.name, href: `/collections/${c.slug}` })),
];
