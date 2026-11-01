import type { Collection } from "./types";

/**
 * The five specialist collections from brief v5, section 4.
 * A collection links to existing itineraries and adds the support that defines it; it never duplicates a journey.
 * Women's dated departures live in departures.ts (W01 to W03); WL01 is the wellness programme record.
 */
export const collections: Collection[] = [
  {
    id: "womens-journeys",
    slug: "womens-journeys",
    name: "Her Own Way by Tourmelloh",
    subtitle: "Women-only journeys with a female accompanying host",
    display: ["Her Own Way,", "with a woman as your host."],
    hero: "women-travellers",
    lead:
      "Her Own Way is a small set of scheduled, women-only group departures on three of our Varanasi journeys. A female accompanying host travels with the group, the pace is set for the people in it, and every arrangement around you, from rooms to road days, is planned with women travelling together in mind.",
    body: [
      "Tourmelloh was founded by a woman, and that shows most clearly in how these departures are built rather than in anything we could say about them. A woman joining alone should know who will meet her at the station, who walks with the group into the lanes before dawn, how rooms are shared and what happens on a free evening. Each departure answers those questions in writing before anyone books.",
      "The host is with the group for the hosted programme. She keeps the day's timings, accompanies the planned visits, helps at check-ins and meals, and is the first person to turn to on the ground. Behind her, a named coordinator handles the planning, the confirmations and any change of plan. Drivers, guides, boat operators and hotel staff are arranged through our suppliers; we do not promise that every one of them is a woman, and where you ask for a female driver or guide we confirm only what can actually be provided.",
      "Departures run on fixed, founder-approved dates. Until a date is approved, a departure shows as Dates coming soon and you can register interest in future dates. Once dates are published, each departure states its route, tiers, room arrangements and the minimum group it needs, and you enquire for that departure specifically.",
    ],
    essentials: [
      {
        title: "A female accompanying host",
        text: "Every Her Own Way departure includes a female accompanying host for the hosted programme. Her coverage, language and days are stated for each departure. She defines the product, so she is never an optional extra and cannot be removed.",
      },
      {
        title: "Scheduled dates, shown only when approved",
        text: "These are group departures on fixed dates, not a flexible date picker. Dates appear on a departure only after the founder has approved them. A departure can have approved dates and still be waiting for its minimum group; both facts are shown separately.",
      },
      {
        title: "Pace and rooms set out in advance",
        text: "The group programme follows the parent journey at a pace suited to a shared group, with rest built in. Room-sharing and single-room options are stated for each departure, and your preference is recorded with your enquiry.",
      },
      {
        title: "A named coordinator behind the group",
        text: "Before you travel, a named Tourmelloh coordinator answers your questions, confirms arrangements and sends the complete quotation. During the journey the coordinator stays reachable by phone and WhatsApp alongside the host.",
      },
    ],
    offers: [],
    journeys: ["P01", "P06", "P14"],
    cta: "Enquire About This Departure",
    faqs: [
      {
        q: "What does the female accompanying host do?",
        a: "She travels with the group for the hosted programme days stated on the departure. She welcomes the group, keeps timings and pace, accompanies the planned visits, helps with check-ins, meals and small practical needs, and is your first point of contact on the ground. She is not a sightseeing guide unless the departure lists guided visits, and she is not a medical or security provider.",
      },
      {
        q: "Is everyone working on the departure a woman?",
        a: "The host is. Drivers, guides, boat operators, priests and hotel staff are arranged through our suppliers, and we do not promise an entirely female team. If you would like a female driver or guide, tell us in your enquiry and we will confirm in writing what can be arranged.",
      },
      {
        q: "What does ‘subject to minimum group size’ mean?",
        a: "Each departure needs a minimum number of confirmed travellers, set by Tourmelloh and shown on the departure. Registering interest or sending an enquiry does not count towards that minimum and does not confirm a booking. We confirm the departure and the complete price before we ask for any booking payment. A group confirmed in one tier does not count towards the minimum of a separate group.",
      },
      {
        q: "What happens if a departure does not reach its minimum?",
        a: "We tell you as soon as we know. You can move your interest to another approved date, or, if you wish, ask us for a private journey on the same route, which we quote separately as a new quotation. We never switch you to a private tour without asking.",
      },
    ],
    seo: {
      title: "Her Own Way: Women-Only Journeys from Varanasi | Tourmelloh",
      description:
        "Scheduled women-only group departures in Varanasi, Prayagraj, Ayodhya and Bodh Gaya, with a female accompanying host and clear room and group terms.",
    },
  },
  {
    id: "shravan",
    slug: "shravan",
    name: "SHRAVAN by Tourmelloh",
    subtitle: "Thoughtfully accompanied journeys for parents and senior travellers",
    display: ["SHRAVAN,", "for parents who travel at their own pace."],
    hero: "senior-travellers",
    lead:
      "SHRAVAN is our collection for parents and senior travellers, including journeys arranged by sons and daughters who live overseas or cannot travel with them. Every SHRAVAN journey, at every tier, includes named accompaniment, a pace agreed in advance and assistance we have assessed with you before we quote.",
    body: [
      "A pilgrimage to Kashi, Ayodhya or Gaya often matters most to the people who find it hardest to manage alone. The steps down to the river, the long wait at a temple, a road day that runs late, a meal that comes at the wrong hour: none of these is difficult to plan for, but each one needs someone to think of it in advance and someone present on the day.",
      "When you choose a SHRAVAN journey, we add the accompanying-support bundle and our team reviews the plan before quoting: how far your parents walk comfortably, how they manage steps and boarding, their meal and rest routines, and the scope of assistance they need. Sometimes that review means suggesting an extra day. We would rather say so than fit a full programme into a schedule that tires them.",
      "We keep two people clear in our records: the person who books and the person who travels. Updates to family, and any sharing of photographs or location, happen only with the traveller's own permission.",
    ],
    essentials: [
      {
        title: "Named accompaniment at every tier",
        text: "A named person accompanies your parents for the agreed days and visits. SHRAVAN is never a driver-only itinerary, including at Standard; the tiers change the hotels, vehicle and level of service, not the presence of support.",
      },
      {
        title: "Senior travel companion",
        text: "The senior travel companion helps with walking pace, steps, boarding, check-ins and meal routines, within a defined, non-medical scope agreed before travel. The companion is not a nurse or carer. Where specialist care is needed, it is assessed separately with a qualified provider.",
      },
      {
        title: "Pacing and assistance reviewed before we quote",
        text: "Our team reviews each SHRAVAN plan for pace, mobility, meal routines and assistance scope. Rest periods are part of the day, and a longer duration may be suggested if the route needs it.",
      },
      {
        title: "Family updates, with the traveller's consent",
        text: "We record the booking contact separately from the travelling parent. With your parents' permission, the coordinator shares updates with the family at agreed points, and photographs or location only if they have agreed to that too.",
      },
    ],
    offers: [
      {
        id: "SH01",
        title: "SHRAVAN Varanasi",
        parent: "P02",
        note: "Varanasi at Your Pace with named accompaniment for the visiting days, rest between temple visits and boarding points chosen for ease.",
      },
      {
        id: "SH02",
        title: "SHRAVAN Varanasi and Ayodhya",
        parent: "P05",
        note: "Varanasi and Ayodhya with the companion travelling throughout, the road journey broken where needed and the duration reviewed for your parents' pace.",
      },
      {
        id: "SH03",
        title: "SHRAVAN Sacred Confluence",
        parent: "P06",
        note: "Varanasi, Prayagraj and Ayodhya at an assisted pace. This route may need extra days for older travellers; we review it with you before quoting.",
      },
      {
        id: "SH04",
        title: "SHRAVAN Varanasi and Gaya",
        parent: "P09",
        note: "Varanasi and Gaya, with ancestral rites at Gaya scoped individually with the priest and the companion helping with pace, seating and rest around them. Bodh Gaya is a separate place and is added only on request.",
      },
    ],
    journeys: ["P02", "P05", "P06", "P09"],
    cta: "Plan a SHRAVAN Journey",
    faqs: [
      {
        q: "I am arranging this for my parents from abroad. How do updates work?",
        a: "You can be the booking contact while your parents are the ones travelling. Before the journey we ask your parents whether they are happy for us to share updates with you, how often, and on which channel. Photographs and location are shared only if they agree. If they prefer privacy on a given day, we respect that.",
      },
      {
        q: "Is the senior travel companion a nurse or carer?",
        a: "No. The companion provides defined, non-medical assistance: pace, steps, boarding, check-ins, meals and general reassurance. The companion does not give medical or personal care. If your parents need specialist care, tell us early and we assess it separately with a qualified provider. Please do not send medical records through the website; we arrange anything sensitive through a separate process.",
      },
      {
        q: "Can my parents manage the ghats and temples?",
        a: "Many ghats and temple approaches involve steps, uneven stone and crowds, and some cannot be avoided. We ask about mobility at the start, choose boarding points and visiting times with that in mind, and tell you plainly where a visit may be hard. Wheelchair and mobility assistance can be requested; we assess each route rather than promise that everything is accessible.",
      },
      {
        q: "Is SHRAVAN available at Standard?",
        a: "Yes. Every SHRAVAN journey includes its accompanying support at Standard, Premium and Luxury. The tier changes the hotels, vehicle and other inclusions; it does not remove the companion.",
      },
    ],
    seo: {
      title: "SHRAVAN: Accompanied Journeys for Parents | Tourmelloh",
      description:
        "Accompanied pilgrimages for parents and senior travellers in Varanasi, Ayodhya, Prayagraj and Gaya, with named support, gentle pacing and family updates.",
    },
  },
  {
    id: "family-journeys",
    slug: "family-journeys",
    name: "Together by Tourmelloh",
    subtitle: "Journeys for families and generations",
    display: ["Together,", "for families and generations."],
    hero: "family-travellers",
    lead:
      "Together adapts two of our Varanasi journeys for families: young children, grandparents and everyone in between. We plan rooms, meals, rest and road time around the people in your party, so the day works for the youngest and the oldest at once.",
    body: [
      "A family in Kashi moves differently from a couple. A five-year-old will not stand through a long aarti; a grandparent may want the temple visit and then a quiet afternoon; someone needs a vegetarian meal at noon and someone else needs a nap. We ask about all of it at the start and build the programme around what you tell us.",
      "Together journeys follow the route of their parent itinerary, adapted for your party. Rooms are allocated to suit how you want to sleep, vehicles are chosen for the number of people, luggage and any child seats, and boat rides and walks are timed for shorter attention spans.",
      "Roots and homecoming journeys, and accessible or assisted travel, are welcome as custom enquiries. Tell us what you have in mind and we will plan from there rather than fit you into a fixed programme.",
    ],
    essentials: [
      {
        title: "Children's needs, asked at the start",
        text: "We ask for children's ages, room arrangements, meal preferences, nap and rest needs and any assistance preferences. These shape the hotels, the vehicle and the pace of every day.",
      },
      {
        title: "A pace that suits every generation",
        text: "Shorter sightseeing blocks, rest in the heat of the day and early evenings when children need them. The programme bends to your family rather than the other way round.",
      },
      {
        title: "Rooms and vehicles sized to the party",
        text: "We assess capacity across adults, children, luggage and assistance needs instead of assuming one car fits everyone. Cots, child seats and childcare can be requested and are confirmed with the hotel or provider before we include them.",
      },
      {
        title: "One plan and one coordinator",
        text: "A named coordinator keeps the whole family's arrangements in one place, from arrival to departure, and is reachable during the journey.",
      },
    ],
    offers: [
      {
        id: "F01",
        title: "Together: Varanasi",
        parent: "P01",
        note: "First Impressions of Varanasi, adapted for your party: the ghats, the river and Sarnath, with rest time and room arrangements planned for children and grandparents.",
      },
      {
        id: "F02",
        title: "Together: The Sacred Confluence",
        parent: "P06",
        note: "Varanasi, Prayagraj and Ayodhya adapted for families, with road days broken into manageable stretches and the duration reviewed for your party.",
      },
    ],
    journeys: ["P01", "P06"],
    cta: "Plan a Family Journey",
    faqs: [
      {
        q: "What do you need to know about the children?",
        a: "Their ages, how you would like rooms arranged, what they eat, when they nap or rest, and anything that helps them travel comfortably. We use this only to plan your journey.",
      },
      {
        q: "Can you arrange childcare, cots or child seats?",
        a: "Yes, on request. Nanny or childcare arrangements depend on a confirmed provider, and cots and child seats depend on the hotel and vehicle. We confirm each one before it appears in your quotation as included.",
      },
      {
        q: "Are the boat rides suitable for young children?",
        a: "Boarding at the ghats usually means steps and stepping onto a boat from the stone edge. We choose boarding points and boat types with children in mind, keep river outings short, and ask the operator what child life jackets are available. Boats depend on river level and local orders, so timings can change.",
      },
      {
        q: "Can you plan a roots or homecoming journey?",
        a: "Yes, as a custom enquiry. Tell us the places and family connections you would like to visit and we will design a route around them. These are planned individually rather than offered as a fixed programme.",
      },
    ],
    seo: {
      title: "Together: Family Journeys in Varanasi | Tourmelloh",
      description:
        "Family journeys in Varanasi, Prayagraj and Ayodhya planned around children and grandparents, with rooms, meals, rest and vehicles sized to your party.",
    },
  },
  {
    id: "buddhist-journeys",
    slug: "buddhist-journeys",
    name: "In the Footsteps of the Buddha",
    subtitle: "Buddhist journeys across Uttar Pradesh and Bihar",
    display: ["In the Footsteps", "of the Buddha."],
    hero: "bodhgaya-monks",
    lead:
      "Our Buddhist journeys begin at Sarnath, a short drive from Varanasi, where the Buddha gave his first teaching. From there they reach Kushinagar and Shravasti in Uttar Pradesh, or cross into Bihar for Bodh Gaya, Rajgir and Nalanda. Every journey names its destinations and duration up front.",
    body: [
      "This collection groups six existing itineraries. It is not a separate tier or a new journey; you still choose Standard, Premium or Luxury on each journey's own page. Three journeys stay within Uttar Pradesh and three cross into Bihar, and we keep that distinction clear because it changes the road time, the gateways and the number of nights.",
      "Distances between the sites are real. Several hours by road separate some of them, so the suggested versions build in travel days and quieter afternoons rather than racing from one stupa to the next. Some of the longer routes are still being finalised, and their pages appear once the exact route and sites are approved.",
      "Gaya and Bodh Gaya are different places. A Buddhist journey here does not include Hindu ancestral rites at Gaya, and a rites journey does not include a Buddhist programme, unless you ask us to add it. Lumbini, in Nepal, is handled as a separate extension enquiry.",
    ],
    essentials: [
      {
        title: "Destinations named on every journey",
        text: "Sarnath and Kushinagar; Sarnath, Kushinagar and Shravasti; the extended Uttar Pradesh route adding Sankisa; Bodh Gaya and Sarnath; Sarnath, Bodh Gaya, Rajgir and Nalanda; and the full route across both states. No journey is sold under a generic circuit name.",
      },
      {
        title: "Uttar Pradesh only, or Uttar Pradesh and Bihar",
        text: "The journeys linking Sarnath with Kushinagar, Shravasti and Sankisa stay within Uttar Pradesh. Every journey that includes Bodh Gaya crosses into Bihar. Each page shows its gateways, overnight places and travel days.",
      },
      {
        title: "Gaya and Bodh Gaya kept distinct",
        text: "Bodh Gaya, where the Buddha attained awakening, and Gaya, the Hindu pilgrimage town nearby, are separate destinations. Any combined visit is added expressly, never assumed.",
      },
      {
        title: "Lumbini as a separate extension",
        text: "Lumbini lies across the border in Nepal. It is never part of an Uttar Pradesh journey; if you would like to include it, we treat it as a separate extension enquiry with its own planning and documents.",
      },
    ],
    offers: [],
    journeys: ["P11", "P12", "P13", "P14", "P15", "P16"],
    cta: "Plan a Buddhist Journey",
    faqs: [
      {
        q: "What is the difference between the Uttar Pradesh and Bihar journeys?",
        a: "The Uttar Pradesh journeys link Sarnath with Kushinagar, Shravasti and, on the extended version, Sankisa. The Uttar Pradesh and Bihar journeys add Bodh Gaya, and on longer versions Rajgir and Nalanda. Crossing into Bihar changes the gateways and adds road days, so the durations are longer.",
      },
      {
        q: "Are Gaya and Bodh Gaya the same place?",
        a: "No. They are close to each other but are separate destinations with different purposes. Our Buddhist journeys go to Bodh Gaya. Gaya, known for Hindu ancestral rites, is part of our Varanasi and Gaya journeys, and is added to a Buddhist journey only if you ask.",
      },
      {
        q: "Can Lumbini be added?",
        a: "Lumbini is in Nepal and is handled as a separate extension enquiry, with its own route, border crossing and documents. Tell us in your enquiry and we will advise whether it fits your dates.",
      },
      {
        q: "Will a guide explain the sites?",
        a: "It depends on the tier and what is listed. Standard includes a named remote coordinator, and a sightseeing guide only where the journey lists one. Premium adds selected guided visits, and Luxury includes a dedicated concierge for agreed support hours each day. A specialist guide for Sarnath, or for other sites, can be added to any tier.",
      },
    ],
    seo: {
      title: "Buddhist Journeys from Sarnath to Bodh Gaya | Tourmelloh",
      description:
        "Buddhist journeys from Varanasi to Sarnath, Kushinagar, Shravasti, Bodh Gaya, Rajgir and Nalanda, with destinations, road days and duration shown up front.",
    },
  },
  {
    id: "wellness-in-varanasi",
    slug: "wellness-in-varanasi",
    name: "Stillness by the Ganges",
    subtitle: "Rest, mindful movement and personal wellbeing by the Ganges",
    display: ["Stillness", "by the Ganges."],
    hero: "varanasi-yoga-ghat",
    lead:
      "Stillness by the Ganges is a personalised wellness stay in Varanasi: rest, yoga and breathwork, an agreed session with an Ayurvedacharya, and unhurried time by the river. You choose a wellness retreat or a Ganga-side ashram, and we shape the days around how much you want to do.",
    body: [
      "Varanasi is loud and crowded in places, and almost silent in others, often a few steps apart. Early on the ghats, before the boats fill, the city offers exactly the kind of quiet this programme is built on. We plan the days so that rest comes first and everything else fits around it.",
      "An indicative programme begins with arrival and a day to settle. It then brings together an agreed practitioner session, yoga or breathwork suited to you, time by the river and, if you wish, gentle cultural visits such as an early boat or a short walk. Duration and daily intensity are personalised; there is no fixed length.",
      "Every element depends on a named property and a named practitioner. We confirm the property, the practitioner and their credentials, and the exact programme before anything is offered as included. Treatments or medicines that carry a separate charge are stated in your quotation.",
    ],
    essentials: [
      {
        title: "A wellness retreat or a Ganga-side ashram",
        text: "Two alternative ways to stay, not a promise that every property offers both. An ashram is described for what it is, without hotel star ratings, and not every type of stay supports every tier. For each property we state the meals, room facilities, privacy, river access, walking and steps, and how yoga is offered.",
      },
      {
        title: "Ayurvedacharya visits and consultations",
        text: "Arranged visits or consultations with an Ayurvedacharya, subject to named practitioner and property confirmation. We tell you the consultation length and language beforehand, and whether any treatment or medicine is charged separately.",
      },
      {
        title: "Yogacharya-guided sessions",
        text: "Guided yoga and breathwork with a Yogacharya, at a level that suits you, subject to named practitioner and property confirmation. The format, whether private or in a small group, and the place are stated in advance.",
      },
      {
        title: "Wellbeing, not treatment",
        text: "This programme makes no claims to cure, detoxify or produce any treatment outcome. The website enquiry is not a medical assessment. Clinical care is possible only through a separately agreed scope with a qualified provider.",
      },
    ],
    offers: [],
    journeys: [],
    cta: "Plan My Wellness Journey",
    faqs: [
      {
        q: "Should I choose a retreat or an ashram stay?",
        a: "A wellness retreat usually offers more privacy and room facilities; an ashram offers a simpler, more communal rhythm close to the river, with its own routines and house rules. We describe each confirmed property honestly, including meals, rooms, privacy, steps and river access, so you can choose.",
      },
      {
        q: "Who are the practitioners?",
        a: "Sessions are arranged with an Ayurvedacharya and a Yogacharya whom we name, with their credentials, before your programme is confirmed. Until a practitioner and property are confirmed, we describe the session as a request rather than an inclusion.",
      },
      {
        q: "Can the programme help with a health condition?",
        a: "We do not offer cures, detoxification or treatment outcomes, and our enquiry form is not a medical assessment. If you are managing a condition, please speak to your own doctor before travelling. Please do not share medical histories in the public form; any clinical scope is agreed separately with a qualified provider.",
      },
      {
        q: "How long should I stay?",
        a: "There is no fixed duration. Tell us how many days you have and how active you would like each day to be, and we will suggest a length and a daily rhythm that leaves room for rest.",
      },
    ],
    seo: {
      title: "Stillness by the Ganges: Wellness in Varanasi | Tourmelloh",
      description:
        "A personalised wellness stay in Varanasi: a retreat or Ganga-side ashram, yoga and breathwork, Ayurvedacharya sessions and quiet time by the river.",
    },
  },
];
