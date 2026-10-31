import type { Experience, Journey, Service, Status, Tier, ItemId } from "./types";
import { journeys as journeysA } from "./journeys/p01-p06";
import { journeys as journeysB } from "./journeys/p07-p13";
import { journeys as journeysC } from "./journeys/p14-p20";
import { services as allServices } from "./services";
import { experiences as allExperiences } from "./experiences";
import { collections } from "./collections";
import { departures } from "./departures";
import { guides as allGuides } from "./guides";
import { articles as allArticles } from "./journal";
import { pages } from "./pages";
import { reviews as allReviews } from "./reviews";
import { faqGroups } from "./faqs";
import { weddingVenues } from "./wedding";

const live = <T extends { status: Status }>(list: T[]) => list.filter((item) => item.status === "published");

/** Every record, drafts included (for validation and the team). */
export const catalogue = {
  journeys: [...journeysA, ...journeysB, ...journeysC],
  services: allServices,
  experiences: allExperiences,
  guides: allGuides,
  articles: allArticles,
  reviews: allReviews,
};

/** What the website shows: published records only. Drafts never render, link or index. */
export const journeys: Journey[] = live(catalogue.journeys);
export const services: Service[] = live(allServices);
export const experiences: Experience[] = live(allExperiences);
export const guides = live(allGuides);
export const articles = live(allArticles);
export const reviews = live(allReviews).sort((a, b) => a.order - b.order);
export { collections, departures, pages, faqGroups, weddingVenues };

export const journeyById = (id: string) => journeys.find((j) => j.id === id);
export const itemById = (id: string) =>
  (id.startsWith("S") ? services.find((s) => s.id === id) : experiences.find((e) => e.id === id)) ?? undefined;
export const itemHref = (id: ItemId) => {
  const item = itemById(id);
  if (!item) return undefined;
  return id.startsWith("S") ? `/services/${item.slug}` : `/experiences/${item.slug}`;
};

/** Is this service or experience part of a journey's tier manifest? */
export const includedIn = (journey: Journey, tier: Tier, id: ItemId) =>
  journey.tiers[tier].lines.some((line) => line.item === id);

export const tierLabel: Record<Tier, string> = { standard: "Standard", premium: "Premium", luxury: "Luxury" };
