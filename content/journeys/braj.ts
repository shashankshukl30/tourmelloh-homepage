import type { JourneyDetail } from "../journey-types";
import { heritageJourney } from "./heritage";

export const brajJourney: JourneyDetail = {
  id: "braj",
  slug: "taj-mahal-and-the-lanes-of-braj",
  kicker: "Agra & Vrindavan in four days",
  lead: "A suggested four-day route with two nights in Agra and one in Vrindavan. Give the Taj Mahal and Agra Fort a full day, then move into Braj for a temple-focused evening and morning. The short route concentrates on these two bases; Mathura or further Braj destinations can be added when your onward plans allow.",
  pace: "Two bases; one short intercity leg; a full day in Agra",
  arrival: "Agra",
  departure: "Vrindavan / Mathura",
  bestFor: "Travellers combining a first Taj Mahal visit with Vrindavan, or a short northern India trip that balances architecture and pilgrimage.",
  season: "October to March is the preferred general sightseeing season for Agra. Match Vrindavan visits to the current temple and festival calendar, and plan the route around the Taj Mahal's Friday closure.",
  highlights: ["Taj Mahal and Agra Fort", "Two nights in Agra before changing base", "A Vrindavan evening and temple morning", "One direct move from Agra into Braj"],
  dayPlans: [
    {
      day: 1,
      title: "Arrive in Agra and prepare for tomorrow's monuments",
      location: "Agra",
      description: "Begin with an easy Agra arrival and leave the Taj Mahal for a full visiting day. If you arrive early and want a smaller first outing, the Tomb of Itimad-ud-Daulah is an option across the Yamuna. Keep the visit flexible around the actual arrival and time to settle in.",
      moments: ["Settle into the Agra base", "Optional Itimad-ud-Daulah visit", "Prepare for the Taj's entry arrangements"],
      schedule: [
        { part: "Arrival", title: "Start with check-in and a meal", text: "Reach the chosen accommodation and rest before deciding whether to go out. Confirm the actual airport or railway station for the arrival transfer. A road arrival from Delhi is a separate journey with its own allowance; it is not automatically included in an itinerary starting in Agra." },
        { part: "Afternoon", title: "An optional smaller monument", text: "If the schedule permits, consider the Tomb of Itimad-ud-Daulah for its marble work and riverside setting. The Agra district identifies it as a separate monument across the Yamuna. Leave it out after a late arrival rather than rushing there immediately before closing." },
        { part: "Evening", title: "Prepare for the full Agra day", text: "Check the next morning's entry plan, permitted belongings and final approach to the Taj gate. Keep the evening relaxed. If tomorrow is Friday, the Taj visit must move to a workable open day or the stay must change before reservations are made." },
      ],
      overnight: "Agra · first of two nights",
      travel: "Arrival transfer within Agra as agreed; Delhi road transfers require a separate plan.",
      walking: "Optional monument grounds only; the arrival day can remain free of sightseeing.",
    },
    { ...heritageJourney.dayPlans[3], day: 2 },
    {
      ...heritageJourney.dayPlans[4],
      day: 3,
      overnight: "Vrindavan · one night",
      description: "After two nights in Agra, move to Vrindavan and take time to settle in. Use the evening for one chosen temple, such as Prem Mandir, with the timing checked locally. The following morning remains available for Banke Bihari if it fits your onward connection.",
    },
    {
      day: 4,
      title: "A Vrindavan morning before travelling onward",
      location: "Vrindavan / Mathura",
      description: "Use the final morning for your principal Vrindavan temple visit, with Banke Bihari as the proposed focus. A later departure is preferable when darshan matters. Mathura is an optional extension to discuss, not another full programme automatically squeezed in before a train or flight.",
      moments: ["Banke Bihari if current access and departure allow", "A meal and time to collect luggage", "Depart from the agreed Braj connection"],
      schedule: [
        { part: "Morning", title: "Put darshan ahead of extra stops", text: "Plan Banke Bihari around the temple's current visiting arrangements, allowing for the approach and queue. Agree a meeting point before entering busy lanes. Leave a generous window for darshan, with a later onward connection or another night if the visit needs more time." },
        { part: "After the visit", title: "Keep the rest of the morning useful", text: "Take breakfast or an early meal, collect belongings and check out. If you want to visit Mathura's Shri Krishna Janmabhoomi or Vishram Ghat, discuss the additional visit and travel time before fixing transport. Choose an additional stop only when there is time for the visit as well as the journey to the station." },
        { part: "Departure", title: "Leave from the exact booked endpoint", text: "Travel to the station or airport named on your onward ticket. Mathura, Agra and Delhi require different allowances and costs. The four-day route ends in the Braj area; any further road transfer needs to be written into the final proposal." },
      ],
      overnight: "No overnight stay proposed · depart the Vrindavan / Mathura area",
      travel: "Final transfer is set from the confirmed accommodation to the booked connection; Delhi is not an assumed endpoint.",
      walking: "Temple lanes and standing in queues. Keep additional visits conditional on energy and time.",
    },
  ],
  planningNotes: [
    { title: "Friday determines the Agra order", text: "The Taj Mahal is closed to general sightseeing on Fridays. This route needs a workable open-day visit: change the order only when arrival and transfer times permit, otherwise adjust the dates or add a night." },
    { title: "Three nights, two bases", text: "The proposed split is two nights in Agra and one in Vrindavan. A Delhi arrival or departure is extra travel to plan explicitly. More time in Mathura, Barsana or other Braj places calls for an extension rather than a longer checklist." },
    { title: "Read the monument rules before leaving", text: "The Taj's official visitor guidance covers the final approach, prohibited belongings and the photography restriction inside the main mausoleum. Check the current rules and carry only what is permitted; ticket and guide arrangements must be stated separately." },
    { title: "Protect the final temple morning", text: "Banke Bihari's current darshan arrangements and local access determine the final morning. Choose a suitable onward connection, and allow for queues. The Agra–Vrindavan road allowance is a planning estimate, not a live traffic promise." },
  ],
  arrangements: {
    included: ["Two Agra nights and one Vrindavan night, with named properties and meal plans", "Agra–Vrindavan transfer and the agreed arrival / departure transport", "Monument admissions, guiding and temple visit scope", "Optional Itimad-ud-Daulah, Mathura or Delhi transfers only when listed"],
    excluded: ["Flights and rail tickets unless specifically included in the quote", "Unlisted meals, shopping, offerings and gratuities", "Special Taj viewing or priority temple access not expressly confirmed", "Extra Braj destinations and onward Delhi travel unless added"],
  },
};
