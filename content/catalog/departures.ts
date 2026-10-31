import type { Departure } from "./types";

/**
 * Her Own Way hosted women's departures (brief v5, section 4).
 * No dates, minimum, capacity, room policy or confirmation deadline have been supplied: these are founder-entered
 * fields. Until approved dates (with approver and timestamp) are added, each departure stays "Dates coming soon"
 * and the page offers Register Interest in Future Dates.
 */

const hostScope =
  "A female accompanying host travels with the group for the hosted programme days stated on this departure. She welcomes the group on arrival, keeps the day's timings and pace, accompanies the planned visits, helps with check-ins, meals and small practical needs, and is the group's first point of contact on the ground, working alongside the named remote coordinator. She is not a sightseeing guide unless guided visits are listed, and she is not a medical or security provider. Drivers, guides, boat operators, priests and hotel staff are arranged through Tourmelloh's suppliers and are not promised to be women; a request for a female driver or guide is recorded and confirmed only where a supplier can provide one.";

const shared = [
  "A female accompanying host for the hosted programme, with her coverage and language stated for the departure",
  "A named Tourmelloh coordinator before and during the journey",
  "Hotel stays at the tier you choose, with the property and room arrangement confirmed in your quotation",
  "Breakfast on hotel nights; any other meals listed in the quotation",
  "Private air-conditioned transport for the group programme, sized to the group and its luggage",
  "The planned visits of the parent journey, paced for a shared group with rest built in",
];

export const departures: Departure[] = [
  {
    id: "W01",
    title: "Her Own Way: Varanasi Escape",
    parent: "P01",
    route: "Varanasi with Sarnath",
    status: "Dates coming soon",
    tiers: ["standard", "premium", "luxury"],
    hostScope,
    inclusions: [
      ...shared,
      "A river outing on the Ganga where the programme includes one, subject to river level, weather and local orders",
      "A visit to Sarnath as part of the hosted programme",
    ],
  },
  {
    id: "W02",
    title: "Her Own Way: The Sacred Confluence",
    parent: "P06",
    route: "Varanasi, Prayagraj and Ayodhya",
    status: "Dates coming soon",
    tiers: ["standard", "premium", "luxury"],
    hostScope,
    inclusions: [
      ...shared,
      "Road travel between Varanasi, Prayagraj and Ayodhya, planned with breaks on the longer stretches",
      "Planned temple visits with clearly stated arrangements, within each temple's own rules and timings",
      "A boat at the Sangam in Prayagraj where the programme includes one, subject to river conditions and local orders",
    ],
  },
  {
    id: "W03",
    title: "Her Own Way: Bodh Gaya & Sarnath",
    parent: "P14",
    route: "Varanasi, Sarnath and Bodh Gaya",
    status: "Dates coming soon",
    tiers: ["standard", "premium", "luxury"],
    hostScope,
    inclusions: [
      ...shared,
      "Road travel between Varanasi and Bodh Gaya, with the order of places set by the approved route and gateways",
      "Planned visits at Sarnath and Bodh Gaya, with any guided visits listed in the quotation",
    ],
  },
];
