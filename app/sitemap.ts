import type { MetadataRoute } from "next";
import { articles, cities, collections, destinations, experiences, journeys, pages } from "@/content/catalog";
import { absolute } from "@/lib/site";
import { media } from "@/content/catalog/media";
import type { MediaKey } from "@/content/catalog/media-plan";

const updated = new Date("2026-10-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, image?: MediaKey) => ({
    url: absolute(path),
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority,
    ...(image ? { images: [absolute(media[image].src)] } : {}),
  });
  return [
    entry("/", 1),
    entry("/journeys", 0.9),
    entry("/destinations", 0.9),
    entry("/cities", 0.8),
    entry("/experiences", 0.8),
    entry("/journal", 0.7),
    entry("/plan", 0.8),
    entry("/contact", 0.6),
    ...collections.map((c) => entry(`/collections/${c.slug}`, 0.85, c.hero)),
    ...journeys.map((j) => entry(`/journeys/${j.slug}`, 0.9, j.hero)),
    ...destinations.map((d) => entry(`/destinations/${d.slug}`, 0.85, d.hero)),
    ...cities.map((c) => entry(`/cities/${c.slug}`, 0.8, c.hero)),
    ...experiences.map((e) => entry(`/experiences/${e.slug}`, 0.7, e.hero)),
    ...articles.map((a) => entry(`/journal/${a.slug}`, 0.6, a.hero)),
    ...pages.map((p) => entry(`/${p.slug}`, ["privacy", "terms", "booking-terms"].includes(p.slug) ? 0.3 : 0.6)),
  ];
}
