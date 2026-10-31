import type { MediaKey } from "./media-plan";

/**
 * Venues couples can consider. Listed by name only: no partnership or exclusive access is implied.
 * Each is a real, operating Varanasi property that hosts weddings (checked by web search, 31 Oct 2026).
 * Photos are generic mood images from the media plan and never show, or claim to show, the venue itself.
 * Capacities, rates and availability are deliberately left out: they are the venue's own and change by date.
 */
export const weddingVenues: { name: string; kind: string; note: string; photo: MediaKey }[] = [
  {
    name: "BrijRama Palace",
    kind: "Heritage hotel on the ghats",
    note: "A historic palace above Darbhanga Ghat, suited to smaller celebrations with the river close by. A venue we can help you consider and approach; access to the ghat-side lanes shapes guest arrivals, which we plan for.",
    photo: "varanasi-boats-evening",
  },
  {
    name: "Amritara Suryauday Haveli",
    kind: "Riverside haveli hotel",
    note: "A haveli at Shivala Ghat for intimate ceremonies and family functions near the water. A venue we can help you consider and approach, with parking and vehicle access in the old city planned around your guests.",
    photo: "varanasi-diya-floating",
  },
  {
    name: "Taj Nadesar Palace",
    kind: "Palace hotel in private gardens",
    note: "A small palace hotel set in the gardens of the Nadesar estate, away from the old city, for an intimate wedding or a single special function. A venue we can help you consider and approach.",
    photo: "luxury-palace-courtyard",
  },
  {
    name: "Taj Ganges",
    kind: "Hotel with lawns and banquet halls",
    note: "A large hotel in Nadesar with garden lawns and indoor halls that can hold several functions across the wedding days. A venue we can help you consider and approach; we can also ask about rooms there for your guests.",
    photo: "wedding-decor",
  },
  {
    name: "DoubleTree by Hilton Varanasi",
    kind: "City hotel with lawn and ballroom",
    note: "A city hotel with an outdoor poolside lawn and an indoor ballroom, useful when you want guest rooms and functions under one roof. A venue we can help you consider and approach.",
    photo: "luxury-pool",
  },
  {
    name: "Ramada Plaza by Wyndham JHV Varanasi",
    kind: "Hotel with lawn and banquet halls",
    note: "A hotel in the Cantonment with a lawn for outdoor functions and banquet halls for receptions, convenient for guests arriving by road or rail. A venue we can help you consider and approach.",
    photo: "wedding-ceremony",
  },
  {
    name: "Radisson Hotel Varanasi",
    kind: "City hotel with banquet hall",
    note: "A Cantonment hotel with an indoor banquet hall for receptions and smaller functions, with rooms for guests on site. A venue we can help you consider and approach.",
    photo: "luxury-dining",
  },
  {
    name: "Hotel Surya, Kaiser Palace",
    kind: "Hotel with lawn and banquet halls",
    note: "A hotel in the Cantonment with a garden lawn and indoor halls used for weddings and receptions. A venue we can help you consider and approach, depending on your guest count and dates.",
    photo: "wedding-haldi",
  },
];
