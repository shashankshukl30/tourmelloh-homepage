import type { MediaKey } from "./media-plan";

export type { MediaKey };

/** Two-part display title: the first part sets in roman, the second in italic. */
export type Display = [string, string];

export type Seo = {
  /** 50–60 characters, including "| Tourmelloh" when it fits. */
  title: string;
  /** 140–160 characters. */
  description: string;
};

export type Faq = { q: string; a: string };

export type CollectionId =
  | "sacred"
  | "golden-triangle"
  | "heritage"
  | "coast"
  | "himalaya"
  | "wildlife";

export type JourneyDay = {
  day: number;
  title: string;
  /** Where the day is spent, e.g. "Varanasi" or "Agra → Jaipur". */
  place: string;
  photo: MediaKey;
  /** 70–110 words. */
  text: string;
  /** 2–3 short moments, each under 10 words. */
  moments: string[];
  /** e.g. "Taj Nadesar Palace, Varanasi" or "Departure". */
  overnight: string;
};

export type Journey = {
  slug: string;
  collection: CollectionId;
  title: string;
  display: Display;
  /** One line under the title on cards, under 12 words. */
  kicker: string;
  /** Card copy, 18–28 words. */
  summary: string;
  /** Opening paragraph on the journey page, 60–90 words. */
  lead: string;
  days: number;
  nights: number;
  /** Ordered stops shown as the route line. */
  route: string[];
  /** City slugs this journey visits (must exist in cities). */
  cities: string[];
  /** Destination slugs (must exist in destinations). */
  destinations: string[];
  /** Experience slugs woven into this journey. */
  experiences: string[];
  hero: MediaKey;
  gallery: [MediaKey, MediaKey, MediaKey];
  bestFor: string;
  /** Season guidance, one or two sentences. */
  season: string;
  pace: string;
  /** 5–6 headline highlights, each under 10 words. */
  highlights: string[];
  /** 3–4 private, premium moments arranged for this journey. */
  signature: { title: string; text: string }[];
  /** Suggested stays per stop, always "or similar". */
  stays: { place: string; nights: number; stay: string }[];
  itinerary: JourneyDay[];
  included: string[];
  excluded: string[];
  /** 2–4 practical notes that protect the experience. */
  notes: { title: string; text: string }[];
  faqs: Faq[];
  seo: Seo;
};

export type Destination = {
  slug: string;
  name: string;
  /** e.g. "Islands of the Bay of Bengal". */
  label: string;
  display: Display;
  hero: MediaKey;
  gallery: [MediaKey, MediaKey, MediaKey];
  /** 50–70 words. */
  intro: string;
  /** 2–3 paragraphs of 70–100 words. */
  body: string[];
  /** 4–6 reasons to go, each with its own photo. */
  highlights: { title: string; text: string; photo: MediaKey }[];
  bestTime: string;
  gettingThere: string;
  /** City slugs in this destination (must exist in cities). */
  cities: string[];
  faqs: Faq[];
  seo: Seo;
};

export type City = {
  slug: string;
  name: string;
  /** State or territory, e.g. "Uttar Pradesh". */
  state: string;
  /** Destination slug it belongs to, or null (Delhi, Amritsar, Hampi). */
  destination: string | null;
  /** e.g. "The river and the ritual". */
  label: string;
  display: Display;
  hero: MediaKey;
  gallery: [MediaKey, MediaKey, MediaKey];
  /** 50–70 words. */
  intro: string;
  /** 2–3 paragraphs of 70–100 words. */
  body: string[];
  /** 5–6 places or moments not to miss. */
  essentials: { title: string; text: string; photo?: MediaKey }[];
  /** 2–4 luxury hotels worth staying in, real and currently operating. */
  stays: { name: string; note: string }[];
  bestTime: string;
  howLong: string;
  gettingThere: string;
  faqs: Faq[];
  seo: Seo;
};

export type ExperienceCategory =
  | "On the water"
  | "Walks & heritage"
  | "Craft & culture"
  | "Food & table"
  | "Wildlife & nature"
  | "Wellness & spirit"
  | "Adventure";

export type Experience = {
  slug: string;
  title: string;
  display: Display;
  category: ExperienceCategory;
  /** City slug where it happens. */
  city: string;
  hero: MediaKey;
  gallery: [MediaKey, MediaKey];
  /** Card copy, 18–28 words. */
  summary: string;
  /** 2–3 paragraphs of 70–100 words. */
  body: string[];
  duration: string;
  bestTime: string;
  /** 4–5 steps or moments, each a short sentence. */
  expect: string[];
  /** 3–4 practical notes. */
  goodToKnow: string[];
  seo: Seo;
};

export type Collection = {
  id: CollectionId;
  slug: string;
  name: string;
  display: Display;
  hero: MediaKey;
  /** 40–60 words. */
  intro: string;
  /** 1–2 paragraphs of 70–100 words. */
  body: string[];
  seo: Seo;
};

export type Article = {
  slug: string;
  title: string;
  /** 20–30 words. */
  excerpt: string;
  category: "Journal" | "Field notes" | "Planning" | "Places";
  hero: MediaKey;
  /** City or destination slugs the article is about. */
  places: string[];
  /** Journey slugs worth linking from the article. */
  journeys: string[];
  sections: { heading: string; paragraphs: string[] }[];
  takeaways: string[];
  seo: Seo;
};

export type PageCopy = {
  slug: string;
  title: string;
  display: Display;
  hero?: MediaKey;
  lead: string;
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
  seo: Seo;
};
