import data from "@/content/destination-guides.json";

export type DestinationGuide = {
  slug: string;
  name: string;
  region: string;
  lead: string;
  intro: string;
  hero: string;
  heroAlt: string;
  heroCaption: string;
  visits: { title: string; text: string }[];
  practical: { title: string; text: string }[];
  season: string;
  sources: string[];
};

export const destinationGuides: DestinationGuide[] = data.destinations;
