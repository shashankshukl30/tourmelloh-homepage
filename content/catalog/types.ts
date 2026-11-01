import type { MediaKey } from "./media-plan";

export type { MediaKey };

/**
 * The Tourmelloh catalogue, modelled on the developer brief v5 (31 Oct 2026).
 * IDs (P01, S06, E12...) are the brief's stable IDs. A record with status "draft" stays in the
 * repository but is never rendered, linked, indexed or searchable.
 */
export type Status = "published" | "draft";
export type Tier = "standard" | "premium" | "luxury";
export const TIERS: Tier[] = ["standard", "premium", "luxury"];

export type Display = [string, string];
export type Seo = { title: string; description: string };
export type Faq = { q: string; a: string };

export type JourneyId = `P${string}`;
export type ServiceId = `S${string}`;
export type ExperienceId = `E${string}`;
export type ItemId = ServiceId | ExperienceId;

/** Enquiry-stage pricing. Fixed prices only once currency, tax, unit, minimum and validity are approved. */
export type PriceMode =
  | { mode: "quote" }
  | { mode: "fixed"; amount: number; currency: "INR"; tax: string; unit: string; minimum?: string; validFrom: string; validTo: string };

/** Destinations Tourmelloh actually offers. Gaya and Bodh Gaya are distinct records. */
export type DestinationId =
  | "varanasi" | "sarnath" | "prayagraj" | "ayodhya" | "chitrakoot" | "gaya" | "bodh-gaya"
  | "rajgir" | "nalanda" | "kushinagar" | "shravasti" | "sankisa" | "naimisharanya"
  | "vindhyachal" | "chunar" | "lumbini";

export type JourneyType = "hindu-pilgrimage" | "buddhist" | "heritage" | "culture" | "ancestral-rites";
export type CollectionId = "womens-journeys" | "shravan" | "family-journeys" | "buddhist-journeys" | "wellness-in-varanasi";

/** One deliverable inside a tier: a service or experience, where and how much. */
export type InclusionLine = {
  item: ItemId;
  /** Day number in the programme, if tied to one. */
  day?: number;
  /** "Morning", "Evening", "Day 2 afternoon"... */
  session?: string;
  quantity?: number;
  /** What exactly is included, in plain words. */
  scope: string;
  /** Conditional = only if requested and confirmed in the quotation (e.g. security). */
  state: "included" | "conditional";
  /** Mandatory items define the product and cannot be declined (e.g. SHRAVAN support). */
  mandatory: boolean;
  /** Items in the same group replace one another for the same session (e.g. "boat-day2-morning"). */
  replacementGroup?: string;
};

/** What a tier actually includes on one journey. No published journey may have a blank manifest. */
export type TierManifest = {
  /** The client's short tier lines (2026-10-31 doc), shown on cards and the mobile comparison. */
  highlights?: string[];
  hotels: string;
  vehicle: string;
  meals: string;
  boat: string;
  darshan: string;
  assistance: string;
  guide: string;
  admissions: string;
  photography: string;
  security: string;
  lines: InclusionLine[];
  /** What is not included at this tier. */
  excluded: string[];
};

export type DayBlock = {
  kind: "travel" | "visit" | "rest" | "experience" | "arrival" | "departure" | "free";
  time: string;
  title: string;
  text: string;
};

export type JourneyDay = {
  day: number;
  title: string;
  place: string;
  photo: MediaKey;
  blocks: DayBlock[];
  overnight: string;
};

export type Journey = {
  id: JourneyId;
  slug: string;
  status: Status;
  /** The brief's "Initial setup" note, kept for the team. */
  setup: string;
  title: string;
  /** The descriptive route, always shown beside the title. */
  route: string;
  destinations: DestinationId[];
  types: JourneyType[];
  nights: number;
  days: number;
  /** e.g. "Longer assisted version available" or "7N/8D to 8N/9D". */
  durationNote?: string;
  overnights: { place: string; nights: number }[];
  suits: string;
  style: string;
  summary: string;
  lead: string;
  gateways: { arrival: string; departure: string; timingWarning: string };
  itinerary: JourneyDay[];
  practical: { walking: string; earlyStarts: string; boarding: string; mobility: string; seasonal: string };
  tiers: Record<Tier, TierManifest>;
  /** Experiences and services worth adding, beyond the manifests. */
  related: ItemId[];
  faqs: Faq[];
  hero: MediaKey;
  gallery: [MediaKey, MediaKey, MediaKey];
  seo: Seo;
};

export type ServiceCategory =
  | "Arrival & transport"
  | "River & boats"
  | "Temple, ritual & puja"
  | "Hosts, guides & companions"
  | "Family, senior & accessible travel"
  | "Photography & films"
  | "Occasions, dining & gifts"
  | "Stays, tickets & insurance"
  | "Specialist services";

export type Relations = {
  /** Other records that deliver this one (E28 is delivered by S20): never charged twice. */
  deliveredBy?: ItemId[];
  /** Same group = mutually exclusive for one session (boats). */
  replacementGroup?: string;
  /** Selecting both needs staff review (E01/E08 breakfast, S24 + E17). */
  overlapsWith?: ItemId[];
  /** Display synonyms for search ("private taxi" -> S02). */
  synonyms?: string[];
};

export type Service = {
  id: ServiceId;
  slug: string;
  status: Status;
  title: string;
  category: ServiceCategory;
  summary: string;
  /** 2-3 short paragraphs on what it is and how it works. */
  body: string[];
  /** What we need to know to arrange it (the brief's "configuration required"). */
  weAsk: string[];
  /** Plain statements of scope and limits. */
  scope: string[];
  locations: string;
  unit: string;
  price: PriceMode;
  relations: Relations;
  hero: MediaKey;
  seo: Seo;
};

export type ExperienceCategory =
  | "Walks"
  | "Food & tastings"
  | "On the river"
  | "Crafts & culture"
  | "Music"
  | "Sacred & ritual"
  | "Excursions";

export type Experience = {
  id: ExperienceId;
  slug: string;
  status: Status;
  title: string;
  /** Approved explanatory subtitle, stored separately (the part after the dash). */
  subtitle?: string;
  category: ExperienceCategory;
  summary: string;
  body: string[];
  expect: string[];
  practical: string[];
  locations: string;
  unit: string;
  price: PriceMode;
  relations: Relations;
  hero: MediaKey;
  gallery: [MediaKey, MediaKey];
  seo: Seo;
};

export type DepartureStatus =
  | "Dates coming soon" | "Open for enquiries" | "Minimum group pending"
  | "Departure confirmed" | "Full" | "Closed" | "Cancelled";

/** A hosted women's group departure. Dates appear only once approved, with approver and time. */
export type Departure = {
  id: `W${string}`;
  title: string;
  parent: JourneyId;
  route: string;
  status: DepartureStatus;
  tiers: Tier[];
  dates?: { start: string; end: string; approvedBy: string; approvedAt: string };
  minimum?: number;
  capacity?: number;
  roomPolicy?: string;
  confirmationDeadline?: string;
  hostScope: string;
  inclusions: string[];
};

/** A named collection offer (SHRAVAN SH01, Together F01) that adapts an existing itinerary. */
export type CollectionOffer = { id: string; title: string; parent: JourneyId; note: string };

export type Collection = {
  id: CollectionId;
  slug: string;
  name: string;
  subtitle: string;
  display: Display;
  hero: MediaKey;
  lead: string;
  body: string[];
  /** Support that defines the product and cannot be removed (female host, SHRAVAN companion). */
  essentials: { title: string; text: string }[];
  offers: CollectionOffer[];
  /** Linked itineraries (Buddhist collection P11-P16). */
  journeys: JourneyId[];
  cta: string;
  faqs: Faq[];
  seo: Seo;
};

export type Guide = {
  slug: DestinationId;
  name: string;
  state: string;
  status: Status;
  reviewedOn: string;
  display: Display;
  hero: MediaKey;
  gallery: [MediaKey, MediaKey, MediaKey];
  intro: string;
  body: string[];
  essentials: { title: string; text: string; photo?: MediaKey }[];
  gateways: string;
  pacing: string;
  physical: string;
  season: string;
  etiquette: string;
  faqs: Faq[];
  seo: Seo;
};

export type Article = {
  slug: string;
  status: Status;
  title: string;
  excerpt: string;
  category: "Planning" | "Places" | "Journeys" | "Weddings";
  hero: MediaKey;
  journeys: JourneyId[];
  items: ItemId[];
  sections: { heading: string; paragraphs: string[] }[];
  takeaways: string[];
  seo: Seo;
};

export type Review = {
  id: string;
  status: Status;
  kind: "written" | "video";
  name: string;
  place?: string;
  journey: string;
  /** The package travelled (P01 to P20): links the review to its page and drives the review filters. */
  journeyId?: string;
  /** Direct link for the package label when it is a collection rather than one package. */
  href?: string;
  /** "testimonial": a longer story featured at the top of /reviews. "review": a short star-rated review. */
  format?: "testimonial" | "review";
  /** The guest's headline. */
  title?: string;
  text?: string;
  photo?: string;
  video?: { src: string; captions: string; poster: string };
  source?: string;
  consent: { recordedOn: string; scope: string };
  order: number;
  /** 1 to 5, as the guest gave it. */
  rating?: number;
  /** "March 2026": when they travelled. */
  month?: string;
  /** Design samples: shown on preview builds only, never on tourmelloh.com, never published. */
  sample?: boolean;
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
