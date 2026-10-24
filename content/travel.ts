export const brand = {
  name: "Tourmelloh",
  descriptor: "Journeys with a sense of place",
  isWorkingTitle: false,
  phone: "+91 77069 97271",
  phoneHref: "tel:+917706997271",
  email: "tourmelloh@gmail.com",
  location: "Varanasi, Uttar Pradesh",
};

export const destinations = [
  {
    name: "Varanasi",
    region: "THE RIVER & THE RITUAL",
    image: "varanasi",
    note: "Some places are seen. Kashi is felt.",
    description:
      "Follow the river at first light, wander the old city and leave an afternoon for Sarnath. Varanasi reveals itself one small moment at a time.",
    highlights: "Ghats · Ganga aarti · Sarnath",
  },
  {
    name: "Ayodhya",
    region: "A JOURNEY OF FAITH",
    image: "ayodhya",
    note: "Temple courtyards. Sarayu evenings.",
    description:
      "Find time for Ram Mandir, the lanes around Hanuman Garhi and an evening beside the Sarayu. Plan temple visits with room for queues and quiet pauses.",
    highlights: "Ram Mandir · Hanuman Garhi · Sarayu",
  },
  {
    name: "Agra",
    region: "BEYOND THE POSTCARD",
    image: "agra",
    note: "A wonder, and the world around it.",
    description:
      "Make space for the Taj Mahal, the red-sandstone walls of Agra Fort and the Mughal stories that connect them. Taj Mahal visits need to be planned around its Friday closure.",
    highlights: "Taj Mahal · Agra Fort · Mughal heritage",
  },
  {
    name: "Prayagraj",
    region: "WHERE RIVERS MEET",
    image: "prayagraj",
    note: "A pause at the sacred confluence.",
    description:
      "At the Sangam, the Ganga and Yamuna meet. The confluence also carries the sacred tradition of the mythical Saraswati, making this a deeply significant pilgrimage stop.",
    highlights: "Triveni Sangam · Riverfront · Pilgrimage",
  },
  {
    name: "Lucknow",
    region: "THE ART OF AWADH",
    image: "lucknow",
    note: "Grand gateways. Gracious traditions.",
    description:
      "Explore the architecture of the Imambaras and Rumi Darwaza, then turn to the food and craft traditions that give the city its unmistakable character.",
    highlights: "Bara Imambara · Rumi Darwaza · Awadhi food",
  },
  {
    name: "Bodhgaya",
    region: "ROOM FOR STILLNESS",
    image: "bodhgaya",
    note: "A quieter kind of discovery.",
    description:
      "Bodh Gaya centres on the UNESCO-listed Mahabodhi Temple and Buddhist monasteries. Pair it with Sarnath for a journey through Buddhist heritage.",
    highlights: "Mahabodhi Temple · Monasteries · Buddhist heritage",
  },
  {
    name: "Vrindavan",
    region: "IN THE LANES OF BRAJ",
    image: "vrindavan",
    note: "A place that moves to devotion.",
    description:
      "Temple lanes and devotional music shape the rhythm of Vrindavan. Explore the traditions of Braj through Banke Bihari, Prem Mandir and nearby Mathura.",
    highlights: "Banke Bihari · Prem Mandir · Braj traditions",
  },
  {
    name: "Gaya",
    region: "A JOURNEY OF REMEMBRANCE",
    image: "gaya",
    note: "Personal journeys. Sacred traditions.",
    description:
      "Gaya is associated with Vishnupad Temple and ancestral rites. It is distinct from nearby Bodh Gaya; your reasons for visiting should guide how each place fits into the journey.",
    highlights: "Vishnupad Temple · Ancestral traditions · Pilgrimage",
  },
] as const;

export type JourneyCategory =
  "All journeys" | "Sacred journeys" | "Culture & heritage" | "Buddhist trails";
export const categories: JourneyCategory[] = [
  "All journeys",
  "Sacred journeys",
  "Culture & heritage",
  "Buddhist trails",
];

export const journeys = [
  {
    id: "kashi",
    slug: "kashi-before-the-world-wakes",
    title: "Kashi, before the world wakes",
    category: "Culture & heritage",
    image: "varanasi",
    duration: "4 days / 3 nights",
    route: "Varanasi · Sarnath",
    places: ["Varanasi"],
    intro:
      "River mornings, old-city lanes and an unhurried afternoon in Sarnath.",
    stages: [
      "Arrive & settle into Kashi",
      "The river, ghats & old city",
      "An afternoon in Sarnath",
      "One last morning by the Ganga",
    ],
    tag: "THE VARANASI EDIT",
  },
  {
    id: "sacred",
    slug: "along-the-sacred-rivers",
    title: "Along the sacred rivers",
    category: "Sacred journeys",
    image: "ayodhya",
    duration: "6 days / 5 nights",
    route: "Varanasi · Prayagraj · Ayodhya",
    places: ["Varanasi", "Prayagraj", "Ayodhya"],
    intro:
      "From the ghats of Kashi to the Sangam and the temples beside the Sarayu.",
    stages: [
      "Varanasi & Sarnath · 3 nights",
      "Prayagraj & the Sangam · 1 night",
      "Ayodhya & the Sarayu · 1 night",
    ],
    tag: "FAITH & CONNECTION",
  },
  {
    id: "buddhist",
    slug: "the-road-to-bodh-gaya",
    title: "The road to Bodh Gaya",
    category: "Buddhist trails",
    image: "bodhgaya",
    duration: "5 days / 4 nights",
    route: "Varanasi · Sarnath · Bodhgaya",
    places: ["Varanasi", "Bodhgaya", "Gaya"],
    intro:
      "Trace Buddhist heritage, with time for stillness around the Mahabodhi Temple.",
    stages: [
      "Varanasi & Sarnath · 2 nights",
      "Bodh Gaya & monasteries · 2 nights",
      "A separate Gaya visit, if it matters to you",
    ],
    tag: "PATHS TO STILLNESS",
  },
  {
    id: "heritage",
    slug: "awadh-agra-and-braj",
    title: "Awadh, Agra & the lanes of Braj",
    category: "Culture & heritage",
    image: "agra",
    duration: "7 days / 6 nights",
    route: "Lucknow · Agra · Vrindavan",
    places: ["Lucknow", "Agra", "Vrindavan"],
    intro:
      "Awadhi flavours, Mughal architecture and the devotional rhythm of Braj.",
    stages: [
      "Lucknow & Awadhi heritage · 2 nights",
      "Agra & Mughal architecture · 2 nights",
      "Vrindavan & Mathura · 2 nights",
    ],
    tag: "CULTURE, IN COLOUR",
  },
] as const;

export const faqs = [
  {
    question: "Can I combine more than one destination?",
    answer:
      "Start with the places that matter most to you. Your travel dates, arrival city and preferred pace help shape a practical route. The suggested journeys above are starting points for that conversation.",
  },
  {
    question: "How much time should I allow for Varanasi?",
    answer:
      "Three nights is a useful starting point for the ghats, old city and Sarnath without fitting every experience into a single day. Longer routes can add Prayagraj, Ayodhya or Bodhgaya. This is a planning suggestion, rather than a fixed package.",
  },
  {
    question:
      "What should I consider when travelling with older family members?",
    answer:
      "Share walking limits, stair concerns and rest preferences at the planning stage. Temple lanes and river ghats can involve steps and walking, so these details should shape the itinerary from the beginning.",
  },
  {
    question: "Are Gaya and Bodhgaya the same destination?",
    answer:
      "They are distinct places with different pilgrimage traditions. Gaya is associated with Vishnupad Temple and ancestral rites; Bodhgaya centres on the Mahabodhi Temple and Buddhist heritage.",
  },
] as const;
