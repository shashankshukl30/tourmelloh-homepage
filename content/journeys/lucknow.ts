import type { JourneyDetail } from "../journey-types";
import { heritageJourney } from "./heritage";

export const lucknowJourney: JourneyDetail = {
  id: "lucknow",
  slug: "a-weekend-in-lucknow",
  kicker: "Three days in the city of Awadh",
  lead: "A suggested three-day Lucknow stay with two nights in one base. Give Bara Imambara, Rumi Darwaza and Chota Imambara a full day, with time for Awadhi food and chikankari. A later departure can add the Residency and its account of 1857 without turning the city break into a rushed monument circuit.",
  pace: "One base; a full old-city day; an optional history visit before departure",
  arrival: "Lucknow",
  departure: "Lucknow",
  bestFor: "A short break built around architecture, food and textiles, or travellers who want to explore Lucknow properly before continuing elsewhere.",
  season: "Suggested planning window: October to March for a walking-led city break. Set outdoor visits around the day's weather and check monument arrangements before fixing the sequence.",
  highlights: ["Bara Imambara and the optional Bhool Bhulaiya", "Rumi Darwaza and Chota Imambara", "Awadhi food and time for chikankari", "The Residency if your departure allows"],
  dayPlans: [
    {
      ...heritageJourney.dayPlans[0],
      title: "Arrive, settle in and choose an Awadhi dinner",
      description: "Start your Lucknow break with an easy arrival and a first meal. The principal monuments have a full day tomorrow, so a delayed connection does not spoil the route. An early arrival leaves room for a short local outing rather than another compulsory circuit.",
      schedule: [
        { part: "Arrival", title: "Settle into one base for two nights", text: "Reach the chosen accommodation, unpack and rest. Confirm the next day's starting point and tell the planner about any concerns with stairs or a longer market walk. The stay is designed around one base, so there is no need to repack before exploring the city." },
        { part: "Late afternoon", title: "Consider a short Hazratganj outing", text: "If the arrival gives you time, explore a manageable stretch of Hazratganj or stop for tea nearby. Shopping can be as brief as a look at the textiles. Keep a longer old-city walk for tomorrow, when it can be combined with the monument visits." },
        { part: "Evening", title: "Make food a personal choice", text: "Choose an Awadhi meal according to your interests and dietary preferences. A restaurant reservation or guided tasting can be discussed separately. Kebabs, biryani and sweets are part of the city's food traditions; vegetarian choices and personal favourites can shape the meal. Keep the remaining evening easy." },
      ],
    },
    {
      ...heritageJourney.dayPlans[1],
      schedule: [
        ...heritageJourney.dayPlans[1].schedule.slice(0, 2),
        { part: "Evening", title: "Food, textiles or simply an easy evening", text: "Choose a short old-city market visit for chikankari, a meal, or time back at the accommodation. Shopping is optional and should suit your interest rather than a seller's itinerary. If a textile workshop visit is requested, its availability and any fee need separate confirmation." },
      ],
    },
    {
      day: 3,
      title: "The Residency, if the departure leaves room",
      location: "Lucknow",
      description: "A later departure makes space for the Residency, a different historical chapter from the previous day's Nawabi architecture. Its remains and the 1857 Memorial Museum should be visited with time to read and understand the site. An early connection means leaving this visit for a longer stay.",
      moments: ["Optional Residency visit", "The 1857 Memorial Museum when open", "Depart from your confirmed Lucknow connection"],
      schedule: [
        { part: "Morning", title: "Choose the Residency over several quick stops", text: "After breakfast, consider the Residency's grounds and ruined buildings if the departure schedule permits. The site is associated with the events of 1857. Give the visit a clear time window and avoid fitting several other monuments into the same morning." },
        { part: "At the site", title: "Check the museum separately", text: "The 1857 Memorial Museum sits within the complex and provides further historical context. Confirm its current open day and hours before relying on it. If it is closed or time is short, decide whether the grounds alone suit your interest rather than implying access to both." },
        { part: "Departure", title: "Return for luggage and leave comfortably", text: "Allow time to return, check out and reach the exact station or airport on your ticket. If the transfer window is tight, keep the entire morning free. A food walk or shopping session that needs longer is a reason to extend the visit, not compress the departure." },
      ],
      overnight: "No overnight stay proposed · depart Lucknow",
      travel: "Local sightseeing and departure transfer, planned around the precise accommodation and booked connection.",
      walking: "The optional Residency visit involves time outdoors across the grounds; choose the extent according to the group and weather.",
    },
  ],
  planningNotes: [
    { title: "One base, with time for food and textiles", text: "Two nights are proposed in Lucknow. Food and textile stops should follow your preferences. A workshop, tasting, named restaurant or particular guide requires an explicit arrangement and cannot be assumed from the destination description." },
    { title: "Choose the Bhool Bhulaiya separately", text: "The district's visitor information describes stairs into the maze and recommends an authorised guide. Keep it optional when steps are a concern; the rest of the Imambara programme can still be planned around your interests." },
    { title: "Match the Residency to the departure", text: "The grounds and the 1857 Memorial Museum are related but distinct parts of the visit. Verify current access and museum hours, and only include the outing when there is a sensible margin before your onward connection." },
    { title: "Set the food plan before the walk", text: "Share vegetarian preferences, food interests and dietary requirements before any tasting is arranged. No meal or restaurant is included until the written proposal states it, and shopping remains entirely optional." },
  ],
  arrangements: {
    included: ["Two Lucknow nights with named accommodation and meal plan", "Agreed arrival, departure and city transport", "Monument admissions and guiding scope, including any maze visit", "A food experience, workshop or restaurant reservation only if specifically arranged"],
    excluded: ["Flights or rail tickets unless listed", "Meals and tastings outside the confirmed plan", "Textiles, shopping, gratuities and personal expenses", "Unlisted excursions or access to closed visitor areas"],
  },
};
