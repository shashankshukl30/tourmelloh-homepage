export type DayPlan = {
  day: number;
  title: string;
  location: string;
  description: string;
  moments: string[];
  schedule: { part: string; title: string; text: string }[];
  overnight: string;
  travel?: string;
  walking?: string;
};

export type JourneyDetail = {
  id: string;
  slug: string;
  kicker: string;
  lead: string;
  pace: string;
  arrival: string;
  departure: string;
  bestFor: string;
  season: string;
  dayPlans: DayPlan[];
  planningNotes: { title: string; text: string }[];
  highlights: string[];
  arrangements: { included: string[]; excluded: string[] };
};
