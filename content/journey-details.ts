export type DayPlan = {
  day: number;
  title: string;
  location: string;
  description: string;
  moments: string[];
};

export type JourneyDetail = {
  id: string;
  slug: string;
  kicker: string;
  lead: string;
  pace: string;
  arrival: string;
  departure: string;
  dayPlans: DayPlan[];
  planningNotes: { title: string; text: string }[];
  highlights: string[];
};

export const journeyDetails: JourneyDetail[] = [
  {
    id: "kashi",
    slug: "kashi-before-the-world-wakes",
    kicker: "THE VARANASI EDIT",
    lead: "A suggested four-day stay with one base and time to settle in. Begin beside the Ganga, find your way through the old city, then spend an afternoon with the Buddhist heritage of Sarnath.",
    pace: "One base, early mornings and time to rest",
    arrival: "Varanasi",
    departure: "Varanasi",
    dayPlans: [
      {
        day: 1,
        title: "A first evening by the river",
        location: "Varanasi",
        description:
          "Keep arrival day light. Settle in, take a short walk towards the ghats and, if your arrival allows, make time for evening Ganga aarti. There is no need to see everything on the first night.",
        moments: [
          "An easy arrival",
          "A first riverfront walk",
          "Night in Varanasi",
        ],
      },
      {
        day: 2,
        title: "The river, then the lanes",
        location: "Varanasi",
        description:
          "Start beside the Ganga before moving into the old city. A morning boat ride is an option when local conditions permit; a walk offers another view. Leave space for Kashi Vishwanath if temple visits are part of your plans.",
        moments: [
          "Ghats in the morning light",
          "Old-city lanes and a chai stop",
          "Night in Varanasi",
        ],
      },
      {
        day: 3,
        title: "An afternoon in Sarnath",
        location: "Varanasi & Sarnath",
        description:
          "Allow a slower start before heading to Sarnath. The Dhamek Stupa and archaeological remains give this afternoon its focus. Add the museum on an open day, then return to Varanasi for your final evening.",
        moments: [
          "Dhamek Stupa and the excavated site",
          "Museum visit, when open",
          "Night in Varanasi",
        ],
      },
      {
        day: 4,
        title: "One last morning in Kashi",
        location: "Varanasi",
        description:
          "Let your departure time set the pace. There may be room for a final cup of chai or a return to a favourite ghat; an early connection can simply mean an unhurried start and time to leave.",
        moments: [
          "A flexible final morning",
          "Time for your onward connection",
          "Depart Varanasi",
        ],
      },
    ],
    planningNotes: [
      {
        title: "Three nights, one base",
        text: "This route keeps all three nights in Varanasi. Choose accommodation with your walking preferences in mind, and check the last stretch of access to any old-city property before confirming.",
      },
      {
        title: "Keep Sarnath flexible",
        text: "Sarnath Archaeological Museum closes on Fridays. Move the museum afternoon to another day if it matters to your visit; the museum and the outdoor archaeological site are separate stops.",
      },
      {
        title: "Leave room for the river",
        text: "Treat a boat ride as a possible addition. River conditions and local operating restrictions need checking near your travel date; a ghat walk can keep the morning centred on the Ganga.",
      },
      {
        title: "Set your walking pace",
        text: "Ghats involve steps, and old-city exploring can mean time on foot. Flag stair concerns and rest preferences early. Temple entry, security and belongings rules also need checking before the visit.",
      },
    ],
    highlights: [
      "Three nights in Varanasi",
      "Ganga mornings and evening aarti",
      "The old city at walking pace",
      "An afternoon in Sarnath",
    ],
  },
  {
    id: "sacred",
    slug: "along-the-sacred-rivers",
    kicker: "FAITH & CONNECTION",
    lead: "A suggested six-day route through Varanasi, Prayagraj and Ayodhya. Give Kashi three nights, pause at the Sangam, then follow the journey towards the temples and riverfront of Ayodhya.",
    pace: "Three bases, temple visits and two travel days",
    arrival: "Varanasi",
    departure: "Ayodhya",
    dayPlans: [
      {
        day: 1,
        title: "Settle into Varanasi",
        location: "Varanasi",
        description:
          "Begin with time to arrive and settle in. If the evening is free, head towards the Ganga for your first view of the ghats and aarti. Keep the rest of the day open around your arrival.",
        moments: [
          "A gentle first day",
          "Evening by the Ganga",
          "Night in Varanasi",
        ],
      },
      {
        day: 2,
        title: "A day for Kashi",
        location: "Varanasi",
        description:
          "Give the riverfront and old city a day of their own. Plan Kashi Vishwanath around current entry arrangements, with time for queues and a break afterwards. A short ghat walk can bring the day back to the river.",
        moments: [
          "Kashi Vishwanath, subject to entry arrangements",
          "Old-city lanes",
          "Night in Varanasi",
        ],
      },
      {
        day: 3,
        title: "A different chapter at Sarnath",
        location: "Varanasi & Sarnath",
        description:
          "Leave part of the day for Sarnath's Buddhist heritage. Walk through the archaeological site and consider the museum if it is open. Return to Varanasi with enough evening left to rest before changing cities.",
        moments: [
          "Sarnath archaeological site",
          "Time to rest before travelling",
          "Night in Varanasi",
        ],
      },
      {
        day: 4,
        title: "Pause at the Sangam",
        location: "Varanasi to Prayagraj",
        description:
          "Set aside the first part of the day for the journey to Prayagraj. Spend the remaining time around the Sangam, where the Ganga and Yamuna meet. A river visit should follow the day's conditions and local guidance.",
        moments: [
          "Travel to Prayagraj",
          "The Sangam and its riverfront",
          "Night in Prayagraj",
        ],
      },
      {
        day: 5,
        title: "Towards the Sarayu",
        location: "Prayagraj to Ayodhya",
        description:
          "Make Ayodhya your next base and leave room for the journey itself. After settling in, consider an evening around Ram Ki Paidi and the Sarayu. Keep the main temple visits for a time that fits current access arrangements.",
        moments: [
          "Travel to Ayodhya",
          "Ram Ki Paidi and the Sarayu",
          "Night in Ayodhya",
        ],
      },
      {
        day: 6,
        title: "An Ayodhya morning",
        location: "Ayodhya",
        description:
          "Make Ram Mandir the focus if darshan is central to your journey. Hanuman Garhi or Kanak Bhawan can fit around it when time and energy allow. Set the departure plan after allowing for entry, queues and rest.",
        moments: [
          "Ram Mandir, subject to current access",
          "Choose a further temple visit",
          "Depart Ayodhya",
        ],
      },
    ],
    planningNotes: [
      {
        title: "Five nights, three cities",
        text: "The proposed split is three nights in Varanasi, one in Prayagraj and one in Ayodhya. It finishes in Ayodhya, so confirm your onward connection before fixing the final day's visits.",
      },
      {
        title: "Temple visits need breathing room",
        text: "Darshan arrangements and security rules can change. Confirm them for your dates and allow for queues. This suggested route does not include a promise of priority access or any particular pass.",
      },
      {
        title: "Plan the Sarnath day",
        text: "The archaeological museum is closed on Fridays. The three-night Varanasi stay leaves room to exchange the second and third days when the museum is a priority.",
      },
      {
        title: "Make space for personal traditions",
        text: "If a family ceremony or a particular temple is the reason for travelling, put it at the centre of the plan. Ritual arrangements, costs and any additional time should be discussed separately.",
      },
    ],
    highlights: [
      "Three nights to settle into Kashi",
      "Sarnath's Buddhist heritage",
      "Prayagraj and the Sangam",
      "Ayodhya's temples and Sarayu riverfront",
    ],
  },
  {
    id: "buddhist",
    slug: "the-road-to-bodh-gaya",
    kicker: "PATHS TO STILLNESS",
    lead: "A suggested five-day journey linking Sarnath with Bodh Gaya, with two nights in each base. Give the Buddhist sites time and attention, and leave a separate Gaya visit to your own interests.",
    pace: "Two bases, one main travel day and quiet time",
    arrival: "Varanasi",
    departure: "Gaya / Bodh Gaya",
    dayPlans: [
      {
        day: 1,
        title: "Begin beside the Ganga",
        location: "Varanasi",
        description:
          "Arrive in Varanasi and keep the first day simple. A short riverfront walk offers a sense of the city before tomorrow's focus on Sarnath. Evening aarti is an option if your arrival and energy allow.",
        moments: [
          "Arrive and settle in",
          "A first look at the ghats",
          "Night in Varanasi",
        ],
      },
      {
        day: 2,
        title: "Time with Sarnath",
        location: "Varanasi & Sarnath",
        description:
          "Give Sarnath the largest part of the day. Visit the Dhamek Stupa and archaeological remains, then consider the museum's collection on an open day. Return to Varanasi without adding another long list of stops.",
        moments: [
          "Dhamek Stupa",
          "Archaeology and museum collections",
          "Night in Varanasi",
        ],
      },
      {
        day: 3,
        title: "The journey to Bodh Gaya",
        location: "Varanasi to Bodh Gaya",
        description:
          "Reserve the day for travelling between the two bases. Settle into Bodh Gaya and leave the evening light. An orientation walk may suit an earlier arrival; the main temple visit has its own time tomorrow.",
        moments: [
          "A dedicated travel day",
          "Settle into Bodh Gaya",
          "Night in Bodh Gaya",
        ],
      },
      {
        day: 4,
        title: "Around the Mahabodhi Temple",
        location: "Bodh Gaya",
        description:
          "Spend the morning around the Mahabodhi Temple, the World Heritage site associated with the Buddha's enlightenment. Leave time simply to sit. Later, choose a small number of the town's Buddhist temples and monasteries, following their visitor rules.",
        moments: [
          "Mahabodhi Temple complex",
          "Time for quiet observation",
          "Night in Bodh Gaya",
        ],
      },
      {
        day: 5,
        title: "A morning shaped around you",
        location: "Bodh Gaya & optional Gaya",
        description:
          "Keep the final morning open around your onward journey. If Gaya is part of your reasons for travelling, consider a separate visit to the Vishnupad area when the schedule allows. Otherwise, leave this as a quiet departure day.",
        moments: [
          "An optional, separate Gaya visit",
          "Time for your onward connection",
          "Depart the Gaya area",
        ],
      },
    ],
    planningNotes: [
      {
        title: "Four nights, two bases",
        text: "This plan allows two nights in Varanasi and two in Bodh Gaya. Keep the move between them as a travel day, and confirm onward rail or flight plans before adding visits to the last morning.",
      },
      {
        title: "Check the Sarnath date",
        text: "Sarnath Archaeological Museum closes on Fridays. If the museum is essential, adjust the arrival date or the order of the Varanasi days before confirming the route.",
      },
      {
        title: "Respect each place of worship",
        text: "Check current entry, photography and belongings rules at Mahabodhi and each monastery. Dress modestly and give worshippers space. A visitor itinerary does not imply access to organised meditation or religious programmes.",
      },
      {
        title: "Gaya is a separate choice",
        text: "Gaya's Vishnupad Temple and ancestral traditions differ from Bodh Gaya's Buddhist focus. Temple access and any requested ritual arrangements need separate confirmation; additional time may be needed for a visit with a specific religious purpose.",
      },
    ],
    highlights: [
      "Sarnath's stupas and archaeology",
      "Two nights in Bodh Gaya",
      "Mahabodhi Temple complex",
      "Room for a separate Gaya visit",
    ],
  },
  {
    id: "heritage",
    slug: "awadh-agra-and-braj",
    kicker: "CULTURE, IN COLOUR",
    lead: "A suggested week with two nights each in Lucknow, Agra and Vrindavan. Move from Awadhi architecture and food to Mughal monuments, then finish among the temple traditions of Braj.",
    pace: "Three bases, city walks and two travel days",
    arrival: "Lucknow",
    departure: "Vrindavan / Mathura",
    dayPlans: [
      {
        day: 1,
        title: "An introduction to Lucknow",
        location: "Lucknow",
        description:
          "Let the first day revolve around arrival and a good meal. If there is time, take a short walk to get your bearings. Save the city's major monuments for a day when you can give them your attention.",
        moments: [
          "Arrive and settle in",
          "A first taste of Awadhi cooking",
          "Night in Lucknow",
        ],
      },
      {
        day: 2,
        title: "Gateways, courtyards and Awadh",
        location: "Lucknow",
        description:
          "Build the day around Bara Imambara and Rumi Darwaza, with Chota Imambara as a further stop if the pace suits. Break for lunch, then leave some time for the old city's shops and food traditions.",
        moments: [
          "Bara Imambara and Rumi Darwaza",
          "An afternoon at your pace",
          "Night in Lucknow",
        ],
      },
      {
        day: 3,
        title: "Across to Agra",
        location: "Lucknow to Agra",
        description:
          "Give the move to Agra enough room in the day. After arrival, settle in and keep the evening simple. Tomorrow is for the major monuments, with the order adjusted if the dates meet the Taj Mahal's Friday closure.",
        moments: [
          "Travel from Lucknow to Agra",
          "A relaxed evening",
          "Night in Agra",
        ],
      },
      {
        day: 4,
        title: "The Taj, and the city around it",
        location: "Agra",
        description:
          "Choose a visiting time for the Taj Mahal, then pause before continuing to Agra Fort. Seeing both gives the day two different perspectives on Mughal architecture. Keep the evening free instead of adding another distant excursion.",
        moments: ["Taj Mahal, on an open day", "Agra Fort", "Night in Agra"],
      },
      {
        day: 5,
        title: "Into the lanes of Braj",
        location: "Agra to Vrindavan",
        description:
          "Travel to Vrindavan and settle into your final base. A first temple visit can introduce the town's devotional life; Prem Mandir is one option to consider around current opening times. Leave the remainder of the day easy.",
        moments: [
          "Travel to Vrindavan",
          "An introduction to its temple traditions",
          "Night in Vrindavan",
        ],
      },
      {
        day: 6,
        title: "Vrindavan, with room for Mathura",
        location: "Vrindavan & Mathura",
        description:
          "Plan Banke Bihari around the temple's current darshan arrangements. If the day allows, continue to nearby Mathura for another perspective on Braj. Choose the places that matter to you and keep time for meals, queues and rest.",
        moments: [
          "Banke Bihari, subject to current access",
          "A possible visit to Mathura",
          "Night in Vrindavan",
        ],
      },
      {
        day: 7,
        title: "A final morning in Braj",
        location: "Vrindavan / Mathura",
        description:
          "Leave the last morning flexible. A nearby temple, a short walk or simply breakfast may be enough before travelling onward. Confirm where your next connection begins before deciding how much to fit into the day.",
        moments: [
          "A flexible final morning",
          "Time for your onward connection",
          "Depart the Braj area",
        ],
      },
    ],
    planningNotes: [
      {
        title: "Six nights, evenly spaced",
        text: "The suggested split is two nights in Lucknow, two in Agra and two in Vrindavan. Arrival is in Lucknow; departure is from the Vrindavan or Mathura area, with the onward connection planned separately.",
      },
      {
        title: "Work around Friday",
        text: "The Taj Mahal is closed to general sightseeing on Fridays. If your full Agra day falls on Friday, move the Taj visit to an arrival or departure day only when the travel schedule allows, or adjust the stay.",
      },
      {
        title: "Choose the right amount of walking",
        text: "Monument visits and temple lanes can involve time on foot. Mention stair concerns and rest needs while planning, and decide whether any optional areas or extra stops suit your group.",
      },
      {
        title: "Make room for temple routines",
        text: "Vrindavan visits need to follow each temple's current opening and darshan arrangements. Check your dates before fixing the order of the day, and allow extra flexibility around festivals.",
      },
    ],
    highlights: [
      "Lucknow's Imambaras and Awadhi food",
      "Taj Mahal and Agra Fort",
      "Two nights in Vrindavan",
      "Braj traditions, with time for Mathura",
    ],
  },
];
