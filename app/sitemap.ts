import type { MetadataRoute } from "next";
import { articles, collections, experiences, guides, journeys, pages, services } from "@/content/catalog";
import { absolute } from "@/lib/site";
import { media } from "@/content/catalog/media";
import type { MediaKey } from "@/content/catalog/media-plan";

const updated = new Date("2026-10-31");

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
    entry("/journeys", 0.95),
    entry("/journeys/standard", 0.7),
    entry("/journeys/premium", 0.7),
    entry("/journeys/luxury", 0.7),
    entry("/services", 0.85),
    entry("/experiences", 0.85),
    entry("/experiences/walks", 0.6),
    entry("/guides", 0.7),
    entry("/journal", 0.6),
    entry("/help-me-plan", 0.8),
    entry("/faq", 0.6),
    entry("/contact", 0.6),
    entry("/photo-credits", 0.2),
    ...collections.map((c) => entry(`/journeys/${c.slug}`, 0.85, c.hero)),
    ...journeys.map((j) => entry(`/journeys/${j.slug}`, 0.9, j.hero)),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.7, s.hero)),
    ...experiences.map((e) => entry(`/experiences/${e.slug}`, 0.7, e.hero)),
    ...guides.map((g) => entry(`/guides/${g.slug}`, 0.7, g.hero)),
    ...articles.map((a) => entry(`/journal/${a.slug}`, 0.6, a.hero)),
    ...pages.map((p) => entry(`/${p.slug}`, ["privacy", "terms", "booking-terms"].includes(p.slug) ? 0.3 : 0.65)),
  ];
}
