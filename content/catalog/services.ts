import type { Service } from "./types";

/**
 * Services S01-S34 from the client brief v5 (section 6). These are CMS service records, not claims of
 * secured suppliers: every price is quoted, and every arrangement is confirmed in the guest's quotation.
 */
export const services: Service[] = [
  {
    id: "S01",
    slug: "airport-and-railway-station-transfers",
    status: "published",
    title: "Airport and railway station transfers",
    category: "Arrival & transport",
    summary:
      "Private pickups and drops between Varanasi airport, the city's railway stations and your hotel, timed to your flight or train and sized to your party and luggage.",
    body: [
      "Lal Bahadur Shastri International Airport at Babatpur sits about 25 km north-west of the old city, and the drive often takes an hour, longer at busy times. Varanasi Junction, Banaras and Pt. Deen Dayal Upadhyaya Junction (Mughalsarai) each serve different trains, so we plan the pickup point from your ticket rather than a guess.",
      "Share your flight or train number and we use it to time the pickup and keep an eye on delays. The vehicle is chosen for the number of people and bags: a sedan suits two guests with two suitcases, while a larger party or heavy luggage needs an MPV or a second car.",
      "Transfers at other gateways on your route, such as Prayagraj, Ayodhya, Gaya or Gorakhpur, are arranged the same way and confirmed in your quotation.",
    ],
    weAsk: [
      "Pickup and drop points: the airport, which railway station, your hotel or another address",
      "Date and time of arrival or departure",
      "Flight or train number, if you already have it",
      "Number of passengers, including children and their ages",
      "Number and size of bags, and any wheelchair, pram or bulky items",
    ],
    scope: [
      "One-way private transfer in an air-conditioned vehicle with a driver.",
      "Vehicle size is matched to passengers and luggage; one sedan does not fit every party.",
      "The waiting allowance for a delayed flight or train is stated in your quotation.",
      "The driver handles the transfer only and is not a sightseeing guide.",
      "Being met by our team at the arrival point is a separate service, Arrival Welcome & Assistance.",
    ],
    locations:
      "Varanasi airport (Babatpur), Varanasi Junction, Banaras and Pt. Deen Dayal Upadhyaya Junction, plus gateways on your journey route",
    unit: "Per vehicle, per one-way transfer",
    price: { mode: "quote" },
    relations: {},
    hero: "train-station",
    seo: {
      title: "Airport and Railway Station Transfers, Varanasi | Tourmelloh",
      description:
        "Private pickups and drops between Varanasi airport, Varanasi Junction, Banaras and DDU stations and your hotel, timed to your flight or train.",
    },
  },
  {
    id: "S02",
    slug: "private-chauffeured-transport",
    status: "published",
    title: "Private chauffeured transport",
    category: "Arrival & transport",
    summary:
      "A private air-conditioned car and driver for local sightseeing days and intercity legs, planned by route, hours and luggage, with the vehicle confirmed in your quotation.",
    body: [
      "Most journeys in the region move by road. Sarnath is a short drive from Varanasi, while Prayagraj, Ayodhya and Gaya take a morning or most of a day. A private vehicle with a driver lets you stop for chai, rest when you need to and keep your bags with you between visits.",
      "Standard journeys use a private air-conditioned sedan or suitable equivalent; Premium moves up to an MPV or SUV such as an Innova Crysta or equivalent. We size the vehicle to adults, children, luggage and any assistance needs, and state the included hours and distance in your quotation.",
      "If you would prefer a female driver, tell us and we record the preference. It depends on who is available for your dates and is confirmed only in writing.",
    ],
    weAsk: [
      "Local days, an intercity route, or both",
      "Dates, number of days and the hours you expect to use the car each day",
      "Number of passengers and their ages",
      "Number of suitcases, and any wheelchair, pram or walker to carry",
      "Whether you would prefer a female driver",
    ],
    scope: [
      "Private vehicle with a driver for the hours, days and distance stated in your quotation.",
      "Use beyond the included hours or distance is reviewed and quoted.",
      "A driver is not a sightseeing guide; guiding is a separate service.",
      "A female driver is a recorded preference, subject to availability and written confirmation.",
      "Private taxi, premium car and VIP car requests all lead here; a specific model is requested through the vehicle upgrade.",
      "Tolls, parking and interstate permits are shown in your quotation.",
    ],
    locations:
      "Varanasi and Sarnath, and road legs to Prayagraj, Ayodhya, Chitrakoot, Gaya, Bodh Gaya, Kushinagar and other journey destinations",
    unit: "Per vehicle, per day or per route",
    price: { mode: "quote" },
    relations: {
      synonyms: ["private taxi", "premium car", "VIP car", "Mercedes", "Fortuner"],
      replacementGroup: "vehicle",
    },
    hero: "private-car",
    seo: {
      title: "Private Car and Driver in Varanasi | Tourmelloh",
      description:
        "A private air-conditioned car and driver for Varanasi sightseeing and road journeys to Prayagraj, Ayodhya and Gaya, confirmed in your quotation.",
    },
  },
  {
    id: "S03",
    slug: "premium-and-luxury-vehicle-upgrade",
    status: "published",
    title: "Premium and luxury vehicle upgrade",
    category: "Arrival & transport",
    summary:
      "Request a larger or premium vehicle in place of your journey car, such as an SUV, Fortuner or Mercedes, with the actual model confirmed in your quotation.",
    body: [
      "This is a replacement, not an extra car. The upgraded vehicle takes the place of the one in your journey for the same days, and any difference is worked out in your quotation rather than shown as a fixed add-on.",
      "Tell us the model you have in mind. A Toyota Fortuner suits families who want height and boot space; a Mercedes sedan suits couples who want a quieter ride on city days. Fleets vary by city and season, so we confirm the actual vehicle and its seating once your dates are known.",
      "Luxury journeys already include a specifically confirmed premium vehicle chosen for the party and route. On those journeys this service is only needed for a particular model or a second vehicle.",
    ],
    weAsk: [
      "Which vehicle in your journey you want to replace, and for which days",
      "The model or class you have in mind, for example an SUV, Fortuner or Mercedes",
      "Number of passengers and suitcases",
      "Whether the upgrade is for intercity legs, city days or both",
    ],
    scope: [
      "Replaces the journey vehicle for the same days; it is not charged as a second car.",
      "Model requests are preferences; the actual vehicle is named in your quotation.",
      "We cannot promise a Mercedes or a particular model in every city.",
      "If the requested model is unavailable, we offer a suitable alternative for your approval and never downgrade without telling you.",
    ],
    locations: "Varanasi and journey routes across Uttar Pradesh and Bihar, subject to fleet availability",
    unit: "Per vehicle, per day, replacing the included vehicle",
    price: { mode: "quote" },
    relations: {
      synonyms: ["private taxi", "premium car", "VIP car", "Mercedes", "Fortuner"],
      replacementGroup: "vehicle",
    },
    hero: "car-premium",
    seo: {
      title: "Premium Car Upgrade: SUV, Fortuner, Mercedes | Tourmelloh",
      description:
        "Replace your journey car with an SUV, Fortuner, Mercedes or similar premium vehicle. Model requests are noted; the actual vehicle is named in your quote.",
    },
  },
  {
    id: "S04",
    slug: "arrival-welcome-and-assistance",
    status: "published",
    title: "Arrival Welcome & Assistance",
    category: "Arrival & transport",
    summary:
      "Someone from our team meets you at the airport or railway station, helps with bags and the car, and settles you at your hotel, with assistance agreed beforehand.",
    body: [
      "The first hour in Varanasi can be the hardest: a busy arrivals hall, a crowded platform, strangers offering taxis. With this service a team member waits with a name board at the agreed meeting point, walks you to your vehicle and stays with you until you are checked in.",
      "Meeting points depend on the place. At the airport we usually meet guests in the public arrivals area outside the terminal; at railway stations we meet at the platform or the entrance, depending on the train and on station rules. We do not offer access to restricted areas, baggage belts or airside zones unless a specific authorised service is confirmed in writing.",
      "It pairs naturally with a transfer, and can include a short briefing on the days ahead, a stop for a local SIM card on the way, or extra help for a parent who needs a slower pace.",
    ],
    weAsk: [
      "Arrival point (the airport, or which railway station) and date",
      "Flight or train number and expected arrival time",
      "Names of the guests, for the name board",
      "What help you need: bags, a wheelchair, an older parent, a briefing",
      "Where you are staying",
    ],
    scope: [
      "Meeting in the public arrivals area, or at the station entrance or platform as station rules allow.",
      "No access to restricted areas, baggage belts or airside zones unless an authorised service is confirmed.",
      "Porter help with heavy luggage is arranged separately where available.",
      "The vehicle is quoted under Airport and railway station transfers, not here.",
      "Assistance ends once you are checked in, unless a longer scope is agreed.",
    ],
    locations: "Varanasi airport and railway stations, and other journey gateways on request",
    unit: "Per arrival or departure",
    price: { mode: "quote" },
    relations: {},
    hero: "arrival-welcome",
    seo: {
      title: "Arrival Welcome and Assistance in Varanasi | Tourmelloh",
      description:
        "Be met at Varanasi airport or railway station by our team, helped to your car and settled at your hotel, with the assistance scope agreed in advance.",
    },
  },
  {
    id: "S05",
    slug: "luggage-and-porter-assistance",
    status: "published",
    title: "Luggage and porter assistance",
    category: "Arrival & transport",
    summary:
      "Help with heavy bags at railway stations, ghats, hotels and lanes where cars cannot reach, arranged with licensed porters or hotel staff where available.",
    body: [
      "Many Varanasi hotels and guesthouses near the ghats sit inside lanes too narrow for cars, so the last few hundred metres are on foot, sometimes down steps. Railway platforms can mean long walks and footbridges. A porter turns all of that into a simple handover.",
      "At railway stations we arrange a licensed railway porter or a team member to meet you; at lane-side hotels we coordinate with the hotel's own staff or a local carrier. Tell us how many bags you have and roughly how heavy they are, so enough help is there.",
      "Keep passports, cash, medicines and anything precious in a small bag that stays with you. Porter charges are confirmed in your quotation.",
    ],
    weAsk: [
      "Where help is needed: a station, a hotel lane, a ghat or a boat boarding point",
      "Date and approximate time",
      "Number of bags and roughly how heavy they are",
      "Any fragile items or mobility equipment",
    ],
    scope: [
      "Arranged with licensed porters, hotel staff or local carriers, depending on the place.",
      "Subject to who is available at that place and time.",
      "Keep valuables, documents and medicines with you rather than in porter-carried bags.",
      "Charges are confirmed in your quotation.",
    ],
    locations: "Varanasi railway stations, ghat-side hotels and lanes, and other journey stops on request",
    unit: "Per location, per occasion",
    price: { mode: "quote" },
    relations: {},
    hero: "porter",
    seo: {
      title: "Luggage and Porter Assistance in Varanasi | Tourmelloh",
      description:
        "Help with heavy bags at Varanasi railway stations, ghat-side hotels and narrow lanes where cars cannot reach, arranged with porters or hotel staff.",
    },
  },
  {
    id: "S06",
    slug: "upgrade-your-boat-ride-boat-booking",
    status: "published",
    title: "Upgrade Your Boat Ride / Boat Booking",
    category: "River & boats",
    summary:
      "Choose the boat for a river session, from a shared ride to a private rowing boat, motorboat or covered vessel, replacing your included ride for that session.",
    body: [
      "Many journeys include a boat ride on the Ganga, and the journey page shows exactly which one: shared or private, dawn or evening. If you want something different, choose a replacement here. A private boat for the same session takes the place of the shared ride, so you are never charged for two boats when you sit in one. Our team works out any price difference and shows it in your quotation.",
      "The categories we work with are a shared scheduled ride, a private traditional rowing boat, a private motorboat and, where one is actually operating, a covered or seated cruise vessel. Rowing boats are quiet and slow, lovely at dawn along the ghats; motorboats cover the whole riverfront in less time; covered vessels give shade and proper seats for older guests. Cruise tickets are seats on a scheduled sailing, not a private charter.",
      "If your journey has no boat, the same choices appear as Add a Boat Ride, and an extra outing on top of an included one is labelled Additional session. Boarding usually means steps down the ghat and a step into the boat, and every outing depends on river level, weather and local restrictions on the day.",
    ],
    weAsk: [
      "Which included boat session you want to change, or that you want an additional session",
      "Preferred category: shared ride, private rowing boat, private motorboat or covered vessel",
      "Preferred time: dawn, daytime or evening",
      "Number of people, and whether anyone needs help with steps or boarding",
    ],
    scope: [
      "Replaces the included ride for the same session; the two are never charged together.",
      "A separate extra outing can be requested and is labelled Additional session.",
      "The price difference is calculated by our team and shown in your quotation, not as a fixed figure.",
      "Only boats with a confirmed operator, capacity and boarding point are offered.",
      "Live music and guiding are separate experiences, not boat categories.",
      "River outings depend on water level, weather and local restrictions on the day.",
    ],
    locations: "Varanasi ghats on the Ganga, and boat sessions at Prayagraj or Ayodhya where a journey includes one",
    unit: "Per boat, per session (per seat for shared rides)",
    price: { mode: "quote" },
    relations: { replacementGroup: "boat" },
    hero: "boat-motor",
    seo: {
      title: "Upgrade Your Boat Ride on the Ganga, Varanasi | Tourmelloh",
      description:
        "Swap a shared Ganga boat ride for a private rowing boat, motorboat or covered vessel in Varanasi. It replaces the included ride; any difference is quoted.",
    },
  },
  {
    id: "S07",
    slug: "aarti-viewing-and-seating-arrangements",
    status: "published",
    title: "Aarti viewing and seating arrangements",
    category: "Temple, ritual & puja",
    summary:
      "Plan where and how you watch the evening Ganga aarti, from a seat on the ghat to a boat facing the ceremony, with timing and confirmation explained.",
    body: [
      "The evening aarti at Dashashwamedh Ghat draws large crowds, especially at weekends, on festival days and through the cooler months. Arriving late can mean watching over a sea of heads. We plan your arrival time and viewing position in advance, and tell you plainly what has been confirmed and what depends on the crowd.",
      "There are two main ways to watch: from the ghat steps or a seating area where one is available, or from a boat moored facing the ceremony. A boat gives a clear view and an easy exit but depends on river level; the steps bring you closer to the chanting and the lamps. A team member can accompany you and walk you back through the lanes afterwards.",
      "The morning aarti at Assi Ghat can be arranged the same way. Seating on the ghats is managed by local organisers and their rules apply; where a seat cannot be confirmed in advance, your quotation says so.",
    ],
    weAsk: [
      "Date, and whether you prefer the evening aarti or the morning aarti at Assi Ghat",
      "Viewing preference: ghat steps or seating, or from a boat",
      "Number of people, and anyone who cannot manage steps or long standing",
      "Whether you want a team member to accompany you",
    ],
    scope: [
      "Viewing position and arrangements are stated in your quotation with their confirmation status.",
      "Ghat seating is managed by local organisers and depends on their rules and the crowd.",
      "Boat viewing depends on river level, weather and local restrictions on the day.",
      "Boat viewing uses the boat chosen under Upgrade Your Boat Ride, not a second boat.",
      "This is a viewing arrangement; it does not include taking part in the ceremony.",
    ],
    locations:
      "Dashashwamedh Ghat and Assi Ghat, Varanasi; aarti at Prayagraj or Ayodhya where the journey includes it",
    unit: "Per party, per aarti",
    price: { mode: "quote" },
    relations: {},
    hero: "varanasi-ganga-aarti",
    seo: {
      title: "Ganga Aarti Viewing and Seating, Varanasi | Tourmelloh",
      description:
        "Plan how you watch the Ganga aarti at Dashashwamedh or Assi Ghat, from the ghat steps or a boat, with timing, accompaniment and confirmation explained.",
    },
  },
  {
    id: "S08",
    slug: "darshan-and-temple-visit-assistance",
    status: "published",
    title: "Darshan and temple visit assistance",
    category: "Temple, ritual & puja",
    summary:
      "Planned temple visits with clear timings, footwear and dress guidance, a team member alongside where agreed, and any official booking stated separately and transparently.",
    body: [
      "Temples such as Shri Kashi Vishwanath, Sankat Mochan and Kaal Bhairav each have their own timings, security checks and rules on phones, bags and footwear. Queues change with the day of the week and the festival calendar, and Mondays in the month of Shravan can be very crowded. We plan visits around these patterns and tell you what to carry and what to leave behind.",
      "Depending on your tier, a team member can walk you to the temple gate or stay with you through the visit, help with lockers and shoes, and keep the group together. Where a temple offers an official ticketed darshan or puja booking, we explain it and, if you want it, add it as a separate line in your quotation.",
      "We cannot shorten queues, arrange special entry or promise darshan at a particular time. Temple administrations decide access and can change arrangements at short notice.",
    ],
    weAsk: [
      "Which temples you would like to visit, and on which days",
      "Preferred time of day, for example early morning",
      "Whether you want accompaniment, and for how much of the visit",
      "Anyone who needs help with steps, standing or crowds",
      "Whether you want us to look into an official ticketed darshan or puja, where one exists",
    ],
    scope: [
      "Planning, timings and guidance for temple visits on your itinerary.",
      "The accompanying role, to the gate or through the visit, is stated in your quotation.",
      "Official ticketed darshan or puja bookings, where they exist, are separate lines.",
      "No queue-skipping, special entry or access privilege is offered or implied.",
      "Darshan depends on the temple's own rules, security and crowds on the day.",
    ],
    locations:
      "Varanasi temples, and temples on journey routes in Prayagraj, Ayodhya, Chitrakoot, Gaya and Vindhyachal",
    unit: "Per party, per temple visit or half day",
    price: { mode: "quote" },
    relations: {},
    hero: "varanasi-vishwanath",
    seo: {
      title: "Darshan and Temple Visit Assistance, Varanasi | Tourmelloh",
      description:
        "Planned temple visits in Varanasi with timings, dress and footwear guidance, and accompaniment where agreed. No queue-skipping or special entry is offered.",
    },
  },
  {
    id: "S09",
    slug: "dedicated-travel-concierge",
    status: "published",
    title: "Dedicated Travel Concierge",
    category: "Hosts, guides & companions",
    summary:
      "One named person who looks after every arrangement on agreed days, in person or remotely, with hours and coverage written into your quotation before you travel.",
    body: [
      "A concierge holds the whole journey together: confirming cars and boats each morning, reshaping the day when a train runs late, booking a table, finding a pharmacy, moving a temple visit around the crowd. You have one number to call instead of five.",
      "The role can be remote, by phone and WhatsApp during agreed hours, or accompanying, travelling with you on specified days. Luxury journeys include a dedicated travel concierge with agreed support hours; on Standard and Premium journeys you can add one for the days that matter most, such as arrival day or a festival evening.",
      "Your concierge and Your Travel Host can be the same professional covering both roles. When that is the case, we quote the coverage once.",
    ],
    weAsk: [
      "Days and places where you want concierge cover",
      "In person, remote, or a mix of the two",
      "Daily hours of support you expect, including early starts and late evenings",
      "Languages you would like spoken",
    ],
    scope: [
      "Coverage days, hours and the in-person or remote role are fixed in your quotation.",
      "Not unlimited or round-the-clock unless that coverage is expressly agreed.",
      "Not a security officer, sightseeing guide or medical carer.",
      "If the same professional also acts as your host, the coverage is charged once.",
    ],
    locations: "Varanasi and all journey destinations",
    unit: "Per day (in person) or per journey (remote)",
    price: { mode: "quote" },
    relations: { overlapsWith: ["S10"] },
    hero: "varanasi-aerial-ghats",
    seo: {
      title: "Dedicated Travel Concierge for Varanasi Journeys | Tourmelloh",
      description:
        "One named concierge who looks after your arrangements on agreed days in Varanasi and beyond, in person or remotely, with hours set in your quotation.",
    },
  },
  {
    id: "S10",
    slug: "your-travel-host",
    status: "published",
    title: "Your Travel Host",
    category: "Hosts, guides & companions",
    summary:
      "An accompanying person who walks with you on the visits or journey days you choose, handling tickets, shoes, timings and pace, distinct from a guide or security.",
    body: [
      "A travel host is with you in person for the sessions or days you choose. They meet you at the hotel, manage the car and driver, carry the water, deal with shoe stands and tickets, watch the time and make sure nobody in the group is left behind in a crowded lane.",
      "This is different from remote coordination, where a named coordinator supports you by phone. It is also different from a sightseeing guide, who explains history and meaning, and from security personnel. Many guests pair a host with a specialist guide for the main visits.",
      "Hosting is usually in Hindi and English, and other languages can be requested subject to availability. Premium journeys include defined hosted assistance; on other journeys you can add a host for selected days.",
    ],
    weAsk: [
      "The exact sessions or days you want a host",
      "Preferred language",
      "Size of your group, including children or older guests",
      "What you most want help with on those days",
    ],
    scope: [
      "In-person accompaniment for the sessions or days stated in your quotation.",
      "Non-medical: not a nurse or carer, and not a licensed sightseeing guide or security officer.",
      "Distinct from remote coordination by phone.",
      "Where one professional covers both host and concierge roles, the time is charged once.",
    ],
    locations: "Varanasi, Sarnath and journey destinations",
    unit: "Per session (half day) or per day",
    price: { mode: "quote" },
    relations: { overlapsWith: ["S09"] },
    hero: "travel-host",
    seo: {
      title: "Your Travel Host in Varanasi | Tourmelloh",
      description:
        "An accompanying host who walks with you on chosen visits or days in Varanasi, handling tickets, shoes, timings and pace. Distinct from a guide or security.",
    },
  },
  {
    id: "S11",
    slug: "female-accompanying-host",
    status: "published",
    title: "Female accompanying host",
    category: "Hosts, guides & companions",
    summary:
      "A woman host who travels with you for agreed days or sessions, essential on Her Own Way departures and available on request to any guest who prefers one.",
    body: [
      "Some guests simply feel more at ease with a woman beside them in crowded lanes, at temples or on an early walk to the ghats. A female accompanying host gives the same practical support as Your Travel Host, with the comfort many women, mothers travelling with daughters and older women ask for.",
      "On Her Own Way, our women-only departures, a female host is part of the programme and cannot be removed. For private journeys, choose the days or sessions you want her with you, and the language you would like her to speak.",
      "The host is a woman; other people on your journey, such as drivers, boatmen or temple staff, may not be, unless a specific role is confirmed in writing.",
    ],
    weAsk: [
      "The days or sessions you want covered",
      "Preferred language",
      "Whether this is for a Her Own Way departure or a private journey",
      "Size of your group and anything specific you would like help with",
    ],
    scope: [
      "In-person, non-medical accompaniment for the coverage stated in your quotation.",
      "Mandatory on Her Own Way departures; optional on private journeys.",
      "Drivers, boatmen and other suppliers are not promised to be women unless each role is confirmed.",
      "Not a sightseeing guide or security officer unless that role is separately confirmed.",
    ],
    locations: "Varanasi and journey destinations",
    unit: "Per session or per day",
    price: { mode: "quote" },
    relations: {},
    hero: "women-travellers",
    seo: {
      title: "Female Accompanying Host in Varanasi | Tourmelloh",
      description:
        "A woman host who travels with you on agreed days in Varanasi and beyond. Essential on Her Own Way women's departures and available to any guest on request.",
    },
  },
  {
    id: "S12",
    slug: "private-sightseeing-or-specialist-guide",
    status: "published",
    title: "Private sightseeing or specialist guide",
    category: "Hosts, guides & companions",
    summary:
      "A private guide for a destination or subject, from Sarnath's Buddhist history to Kashi's temples and textiles, booked by session length and language.",
    body: [
      "A good guide changes what you see. At Sarnath they explain the Dhamek Stupa, the Lion Capital in the museum and the first sermon; in the old city they read the lanes, shrines and ghats; at Bodh Gaya or Nalanda they bring the ruins back to life. We match the guide to the subject, not only to the place.",
      "Guides work in sessions, usually a half day or a full day, in the language you request. At monuments where approved guides are the norm, we use them.",
      "A driver is not a guide, and neither is a travel host. Standard journeys exclude a sightseeing guide unless the itinerary lists one, and you can add one here for any visit.",
    ],
    weAsk: [
      "Destination, and the subject you are most interested in",
      "Language you would like",
      "Session length: half day, full day or a specific visit",
      "Group size and ages, including children",
    ],
    scope: [
      "Private guiding for the destination, subject and session stated in your quotation.",
      "Entry tickets, transport and boats are separate unless listed.",
      "Guides explain and accompany; they do not arrange special access or skip queues.",
      "Language availability depends on the destination and is confirmed in your quotation.",
    ],
    locations:
      "Varanasi, Sarnath, Prayagraj, Ayodhya, Bodh Gaya, Rajgir, Nalanda, Kushinagar and other journey destinations",
    unit: "Per guide, per session",
    price: { mode: "quote" },
    relations: {},
    hero: "varanasi-old-city-lanes",
    seo: {
      title: "Private Guide for Varanasi, Sarnath and Beyond | Tourmelloh",
      description:
        "Book a private sightseeing or specialist guide for Varanasi, Sarnath, Bodh Gaya and other sites, matched to your subject, language and session length.",
    },
  },
  {
    id: "S13",
    slug: "language-assistance-and-interpreters",
    status: "published",
    title: "Language Assistance & Interpreters",
    category: "Hosts, guides & companions",
    summary:
      "An interpreter or language assistant for visits, rituals and conversations, in the language you request, confirmed with a named supplier before your journey.",
    body: [
      "Varanasi lives largely in Hindi and Bhojpuri, and many guests want to understand what a priest is saying during a ritual, ask a weaver about the loom or simply talk with the boatman. An interpreter makes those moments two-way.",
      "Buddhist pilgrims at Sarnath, Bodh Gaya and Kushinagar may need Thai, Japanese, Sinhala, Vietnamese or another language. Availability varies a great deal by language and date, so we confirm a named interpreter with the supplier before it appears in your quotation.",
      "Interpreters translate; they are not sightseeing guides unless that role is confirmed. If you would rather have a guide who already speaks your language, see Private sightseeing or specialist guide.",
    ],
    weAsk: [
      "Language needed, and whether it is for conversation, ritual explanation or both",
      "Sessions or days, and the places they cover",
      "Group size",
      "Any specialist vocabulary, for example ritual or textile terms",
    ],
    scope: [
      "Interpretation for the sessions and places stated in your quotation.",
      "Subject to supplier confirmation; less common languages may not be available on every date.",
      "Not a sightseeing guide unless that role is separately confirmed.",
      "Spoken interpretation only, not certified translation of documents.",
    ],
    locations: "Varanasi, Sarnath, Bodh Gaya, Kushinagar and other journey destinations",
    unit: "Per interpreter, per session or per day",
    price: { mode: "quote" },
    relations: {},
    hero: "sarnath-monks",
    seo: {
      title: "Interpreters and Language Assistance, Varanasi | Tourmelloh",
      description:
        "Interpreters for rituals, visits and conversations in Varanasi, Sarnath and Bodh Gaya, in the language you request, confirmed with a named supplier.",
    },
  },
  {
    id: "S14",
    slug: "nanny-or-childcare-arrangements",
    status: "published",
    title: "Nanny or childcare arrangements",
    category: "Family, senior & accessible travel",
    summary:
      "Non-medical childcare by a confirmed provider during agreed hours, so parents can manage an early temple visit or a late aarti while children rest.",
    body: [
      "Dawn boat rides, crowded evening aartis and long temple queues are not always right for small children. A nanny lets parents take part while the children nap, play or eat at the hotel.",
      "We arrange childcare only through a provider confirmed for your dates, such as the hotel's own childcare service or an agency, and agree the supervision arrangement in advance: where the child will be, who is responsible and how you can reach the carer at any time.",
      "Childcare is non-medical. Nannies do not provide medical or nursing care, and a parent or guardian stays reachable throughout.",
    ],
    weAsk: [
      "How many children, and their ages",
      "Dates and hours you need care",
      "Location: your hotel room, a hotel play area or elsewhere",
      "The supervision arrangement you are comfortable with",
      "Allergies, routines, naps and food preferences",
    ],
    scope: [
      "Non-medical childcare during the hours stated in your quotation.",
      "Arranged only through a confirmed provider, never through unconfirmed individuals.",
      "A parent or guardian stays reachable throughout.",
      "No medical or nursing care.",
    ],
    locations: "Varanasi hotels, and other journey stops where a provider is confirmed",
    unit: "Per carer, per block of hours",
    price: { mode: "quote" },
    relations: {},
    hero: "childcare",
    seo: {
      title: "Nanny and Childcare Arrangements in Varanasi | Tourmelloh",
      description:
        "Non-medical childcare in Varanasi through a confirmed provider, so parents can join an early boat ride or late aarti while children rest at the hotel.",
    },
  },
  {
    id: "S15",
    slug: "baby-and-family-comfort-arrangements",
    status: "published",
    title: "Baby and family comfort arrangements",
    category: "Family, senior & accessible travel",
    summary:
      "Cots, child seats, high chairs, interconnecting rooms and family-friendly pacing requested in advance, with each item confirmed with the hotel or car supplier.",
    body: [
      "Travelling with a baby or young children is easier when the room and the car are ready before you arrive. Tell us what you need, and we request it from the hotel and the transport supplier as part of your journey.",
      "Common requests include a cot or extra bed, a child seat in the car, a high chair at breakfast, a kettle for bottles, a quiet room away from the lift, and rest breaks on long road days. We also look at pacing: shorter sightseeing blocks, a midday rest and a realistic plan for early starts.",
      "Child seats and cots are not standard everywhere in the region, so nothing is confirmed until the supplier agrees it in writing. If a child seat cannot be confirmed, we tell you in good time so you can bring your own.",
    ],
    weAsk: [
      "Ages of the children",
      "Equipment needed: cot, child seat, booster, high chair or other items",
      "Room preferences: interconnecting rooms, an extra bed, a ground floor",
      "Nap times, meal routines and any food preferences",
    ],
    scope: [
      "Requests are passed to hotels and car suppliers and confirmed item by item.",
      "Cot and child-seat availability is never assumed; unconfirmed items are shown as unconfirmed.",
      "Care by a nanny is a separate service, Nanny or childcare arrangements.",
      "Baby food, nappies and medicines are not supplied unless listed.",
    ],
    locations: "Varanasi and journey destinations",
    unit: "Per journey, item by item",
    price: { mode: "quote" },
    relations: {},
    hero: "family-travellers",
    seo: {
      title: "Baby and Family Comfort Arrangements, Varanasi | Tourmelloh",
      description:
        "Cots, child seats, high chairs, interconnecting rooms and family pacing for journeys in Varanasi, each requested in advance and confirmed item by item.",
    },
  },
  {
    id: "S16",
    slug: "senior-travel-companion",
    status: "published",
    title: "Senior Travel Companion",
    category: "Family, senior & accessible travel",
    summary:
      "A companion for older guests who sets a comfortable pace, helps with steps and crowds, and keeps family informed with consent, within a defined non-medical scope.",
    body: [
      "Many of our guests are parents on a long-awaited pilgrimage, often booked by sons and daughters who live far away. A senior travel companion stays with them through the day: an arm on the ghat steps, a seat found in the shade, meals and rest on time, and an unhurried pace at the temple.",
      "Before the journey we talk through mobility, pacing, meal routines and the help that will genuinely be needed, and agree the companion's scope in writing. With the traveller's permission, the companion can send short updates or photographs to family at home.",
      "This service is part of every SHRAVAN journey, whatever the tier, and can be added to any other journey. The companion is not a nurse or carer: if personal or medical care is needed, it is assessed separately under Specialist care support on request.",
    ],
    weAsk: [
      "Age and mobility of each traveller: stairs, walking distance and standing time",
      "Preferred pace, rest times and meal routines",
      "Who is travelling, and who is making the booking if that is someone else",
      "Whether the traveller agrees to family updates, photographs or location sharing",
      "Language preferences",
    ],
    scope: [
      "Non-medical companionship and practical assistance for the days stated in your quotation.",
      "Included in every SHRAVAN journey and cannot be removed from it.",
      "Not nursing, personal care or medical supervision.",
      "Family updates, photographs and location sharing happen only with the traveller's permission.",
      "Mobility and pacing are assessed before travel; some routes may need a longer duration.",
    ],
    locations: "Varanasi and journey destinations",
    unit: "Per companion, per day",
    price: { mode: "quote" },
    relations: { synonyms: ["old-age friendly", "elderly-friendly", "SHRAVAN"] },
    hero: "senior-travellers",
    seo: {
      title: "Senior Travel Companion for Parents, Varanasi | Tourmelloh",
      description:
        "A non-medical companion for older guests in Varanasi who sets a gentle pace, helps with steps and crowds, and shares updates with family by consent.",
    },
  },
  {
    id: "S17",
    slug: "wheelchair-and-mobility-assistance",
    status: "published",
    title: "Wheelchair and mobility assistance",
    category: "Family, senior & accessible travel",
    summary:
      "Wheelchairs, walking aids and assistants requested separately, with each part of your route assessed for steps, ramps and boarding before anything is confirmed.",
    body: [
      "Varanasi is a city of steps. Most ghats drop steeply to the river, old-city lanes are uneven and crowded, and boarding a boat means a step down from the ghat. Some temples and Buddhist sites have ramps or level paths; many do not. We assess each part of your route before we suggest it.",
      "We separate equipment from people. Equipment means a wheelchair, walker or folding stool for your use. An assistant is a person who pushes the chair, steadies you on steps or helps at boarding. You may need one, both or neither on different days.",
      "We do not describe any route as fully accessible. Instead, your quotation shows which visits suit wheelchair users, which need an assistant and which we suggest replacing.",
    ],
    weAsk: [
      "Equipment needed: a wheelchair, walker, stool or other aid, and whether you bring your own",
      "Whether you need a person to assist, and when",
      "Walking distance, steps and standing time you can manage",
      "Places you most want to reach, so we can assess access",
    ],
    scope: [
      "Equipment and assistants are quoted as separate lines.",
      "Each visit is assessed for steps, ramps, surfaces and boarding.",
      "No blanket accessibility claim is made for any destination or route.",
      "Assistants help with movement only and do not provide medical or nursing care.",
    ],
    locations: "Varanasi, Sarnath and journey destinations, subject to route assessment",
    unit: "Per item per day (equipment); per assistant per day",
    price: { mode: "quote" },
    relations: {},
    hero: "wheelchair-assist",
    seo: {
      title: "Wheelchair and Mobility Assistance, Varanasi | Tourmelloh",
      description:
        "Wheelchairs, walking aids and assistants for travel in Varanasi, arranged separately, with each part of your route assessed for steps, ramps and boarding.",
    },
  },
  {
    id: "S18",
    slug: "specialist-care-support-on-request",
    status: "published",
    title: "Specialist care support on request",
    category: "Family, senior & accessible travel",
    summary:
      "Where a traveller needs personal or clinical care, we look for a separately assessed qualified provider; ordinary hosts and companions do not provide this care.",
    body: [
      "Some guests need more than a helping hand: help with bathing or dressing, a trained attendant, or care linked to a health condition. A travel host or senior companion cannot meet these needs, and we do not pretend otherwise.",
      "When you tell us such care is needed, we treat it as a separate request. We look for a qualified provider in the relevant city, share what they can and cannot do, and include the service only once the provider, their qualifications and the scope are confirmed. Health details are discussed privately, never through the website form or a WhatsApp link.",
      "In some places a suitable provider may not be available. If so, we say so plainly and suggest a route or pace that works with the support you can bring.",
    ],
    weAsk: [
      "The general type of support needed, such as personal care or an attendant",
      "Days, hours and places it is needed",
      "Whether you travel with your own carer",
      "A convenient time for a private call to discuss details, outside the website form",
    ],
    scope: [
      "Arranged only through a separately assessed, qualified provider.",
      "Not part of any host, companion, concierge or SHRAVAN support.",
      "Tourmelloh does not itself provide medical, nursing or personal care.",
      "Subject to provider availability; it may not be possible in every destination.",
      "Health information is collected privately, not through public forms or messaging links.",
    ],
    locations: "Varanasi; other destinations only where a qualified provider is confirmed",
    unit: "Quoted to the provider's agreed scope",
    price: { mode: "quote" },
    relations: {},
    hero: "elder-portrait",
    seo: {
      title: "Specialist Care Support on Request, Varanasi | Tourmelloh",
      description:
        "When a traveller needs personal or clinical care, we look for a separately assessed qualified provider. Hosts and companions do not provide this care.",
    },
  },
  {
    id: "S19",
    slug: "priest-and-ritual-coordination",
    status: "published",
    title: "Priest and ritual coordination",
    category: "Temple, ritual & puja",
    summary:
      "We find a priest for the ritual you have in mind, agree the place, materials, timing and dakshina, and explain what you will need to do.",
    body: [
      "Families come to Kashi for rituals of every kind, from a simple sankalp at the river to a griha shanti or a puja for a family occasion. The right priest, the right place and the right materials matter, and so does knowing what is expected of you.",
      "Tell us the ritual and its purpose. We coordinate with a priest suited to it, agree the location, duration and samagri (ritual materials), and confirm the priest's dakshina and any venue charges in your quotation. We also tell you what to wear, whether to fast, what to bring and who should take part.",
      "Rudrabhishek, Ganga puja and Pind Daan have their own dedicated services. Use this one for other rituals, or when you are not yet sure what you need.",
    ],
    weAsk: [
      "The ritual you have in mind, or its purpose if you are unsure",
      "Preferred place, date and time",
      "Number of participants, and your family gotra if the ritual needs it (shared privately)",
      "Language for explanation",
      "Any requirements for materials or food offerings",
    ],
    scope: [
      "Priest, place, materials, timing and charges are stated in your quotation.",
      "The priest's dakshina and materials are itemised, not hidden in another price.",
      "Rituals on temple premises depend on the temple's own permission and rules.",
      "Rudrabhishek, Ganga puja and Pind Daan are booked through their own services, so nothing is charged twice.",
    ],
    locations: "Varanasi, Prayagraj, Ayodhya, Gaya and other journey destinations",
    unit: "Per ritual",
    price: { mode: "quote" },
    relations: {},
    hero: "varanasi-aarti-lamp",
    seo: {
      title: "Priest and Ritual Coordination in Varanasi | Tourmelloh",
      description:
        "Find the right priest in Varanasi for your ritual, with place, materials, timing and dakshina agreed in advance and itemised in your quotation.",
    },
  },
  {
    id: "S20",
    slug: "rudrabhishek-arrangements",
    status: "published",
    title: "Rudrabhishek arrangements",
    category: "Temple, ritual & puja",
    summary:
      "A Rudrabhishek arranged with a priest at an approved venue and time, with participants, materials and any permission needed confirmed before you travel.",
    body: [
      "Rudrabhishek is the ritual bathing of the Shiva lingam with water, milk, curd, honey, ghee and other offerings while Vedic hymns such as the Rudram are chanted. In Kashi, the city of Shiva, many families plan one as the heart of their visit.",
      "We arrange the priest, the samagri and a suitable venue, which may be a temple that permits such rituals, a riverside spot or your hotel. Timing, the number of participants and the length of the ritual are agreed in advance, along with any written permission the venue requires.",
      "This is also the service that delivers the Rudrabhishek Experience and the Rudrabhishek within Sacred Moments. If you book either of those, you are not charged for this service again.",
    ],
    weAsk: [
      "Preferred venue type: a temple, the riverside or your hotel",
      "Date and preferred time",
      "Number of participants, and who will sit for the ritual",
      "Length or form of the ritual, if you have a preference",
      "Language for explanation",
    ],
    scope: [
      "Priest, materials, venue, timing and participants are stated in your quotation.",
      "Temple venues only where the temple permits it; documented permission is obtained where needed.",
      "Delivers the Rudrabhishek Experience: booking both never means paying twice.",
      "Entry to inner sanctums or special darshan is not included or implied.",
    ],
    locations: "Varanasi, and other journey destinations on request",
    unit: "Per ritual (group)",
    price: { mode: "quote" },
    relations: {},
    hero: "rudrabhishek",
    seo: {
      title: "Rudrabhishek Arrangements in Varanasi | Tourmelloh",
      description:
        "Rudrabhishek in Kashi with a priest at an approved venue and time, with participants, samagri and any permission confirmed before you travel.",
    },
  },
  {
    id: "S21",
    slug: "ganga-puja-arrangements",
    status: "published",
    title: "Ganga puja arrangements",
    category: "Temple, ritual & puja",
    summary:
      "A Ganga puja on the riverbank or from a boat, with a priest, materials, duration and participants agreed, and the approved scope written into your quotation.",
    body: [
      "A Ganga puja is an offering to the river herself: flowers, a lamp and a sankalp spoken with the priest, often at sunrise or as evening falls. It can be a quiet personal moment or a family ceremony for a birthday, an anniversary or a remembrance.",
      "We arrange a priest, the materials and a suitable spot on the ghats, or a boat if you prefer to make the offering on the water. Duration, participants and what the priest will perform are agreed before the day.",
      "This service also delivers the Ganga Puja Experience, so booking the experience does not mean paying for the puja twice. Pujas from a boat depend on river level and local restrictions on the day.",
    ],
    weAsk: [
      "Preferred location: a particular ghat, or from a boat",
      "Date and time of day",
      "Number of participants",
      "The purpose or occasion, if you would like the priest to include it",
    ],
    scope: [
      "Priest, materials, location, duration and participants are stated in your quotation.",
      "Delivers the Ganga Puja Experience; the same puja is never charged twice.",
      "Boat-based pujas depend on river level, weather and local restrictions.",
      "Where a boat is already included that session, the puja uses it rather than adding a second boat.",
    ],
    locations: "Varanasi ghats, and the Sangam at Prayagraj on request",
    unit: "Per ritual (group)",
    price: { mode: "quote" },
    relations: {},
    hero: "varanasi-puja",
    seo: {
      title: "Ganga Puja Arrangements in Varanasi | Tourmelloh",
      description:
        "A Ganga puja on the Varanasi ghats or from a boat, with a priest, materials, duration and participants agreed and written into your quotation.",
    },
  },
  {
    id: "S22",
    slug: "pind-daan-and-ancestral-rites-arrangements",
    status: "published",
    title: "Pind Daan and ancestral rites arrangements",
    category: "Temple, ritual & puja",
    summary:
      "Pind Daan, shraddh and related rites for ancestors at Gaya, Kashi or another requested site, with priest, materials, timing and charges agreed in advance.",
    body: [
      "For many Hindu families, offering pind to the ancestors at Gaya is a duty carried across generations. Rites are performed along the Falgu river, at the Vishnupad temple and at the associated vedis, and in Kashi on the ghats of the Ganga and at Pishach Mochan Kund.",
      "Families often have a pandit their elders used; if so, tell us and we will coordinate with them. Otherwise we arrange a priest suited to your tradition, agree the rites, duration and materials, and itemise the priest's charges. How many vedis you visit at Gaya, and how many days it takes, differs from one family to the next.",
      "Pind Daan is a Hindu rite. A journey to Gaya for these rites does not include a Buddhist programme at Bodh Gaya unless you ask for one. On A Journey of Remembrance, these arrangements are already part of the journey and are not charged again.",
    ],
    weAsk: [
      "Site: Gaya, Kashi, Prayagraj or another place",
      "The rites you have in mind, or your family's custom",
      "Preferred dates, including any tithi or Pitru Paksha timing",
      "Whether you have a family pandit we should contact",
      "Number of family members taking part",
    ],
    scope: [
      "Priest, rites, materials, timing and charges are agreed and itemised in your quotation.",
      "The number of vedis and days at Gaya depends on the rites your family chooses.",
      "Where these rites are part of a journey, they are not charged again through an experience.",
      "A Buddhist visit to Bodh Gaya is separate and only added on request.",
      "Pitru Paksha brings large crowds; timings and venues are confirmed nearer the date.",
    ],
    locations: "Gaya, Varanasi (Kashi) and Prayagraj, or another requested site",
    unit: "Per family, per ritual programme",
    price: { mode: "quote" },
    relations: {},
    hero: "gaya-falgu",
    seo: {
      title: "Pind Daan and Ancestral Rites at Gaya and Kashi | Tourmelloh",
      description:
        "Pind Daan and shraddh rites at Gaya, Kashi or Prayagraj, with priest, materials, timing and charges agreed in advance and itemised in your quotation.",
    },
  },
  {
    id: "S23",
    slug: "security-assistance",
    status: "published",
    title: "Security assistance",
    category: "Specialist services",
    summary:
      "Professional security personnel for a stated purpose, place and number of hours, arranged through a confirmed provider, with no queue-clearing or special access implied.",
    body: [
      "Some guests travel with a public profile, valuables or a large family group in crowded places, and prefer trained security close by. We arrange this only through a confirmed professional provider, and only for a clearly stated purpose, place and duration.",
      "Tell us why you want security and where: a festival evening on the ghats, a wedding event, an airport arrival or a full day of temple visits. The provider proposes the number of personnel and their hours, and both appear in your quotation.",
      "Security personnel protect; they do not clear queues, move other visitors aside or obtain access that others do not have. On Luxury journeys, security is included when requested, applicable and expressly accepted in your quotation; it is never deployed automatically.",
    ],
    weAsk: [
      "Purpose: what you want security for",
      "Locations and dates",
      "Hours per day",
      "Number of people in your party, and any public profile we should know about",
    ],
    scope: [
      "Arranged only through a confirmed professional security provider.",
      "Number of personnel and their hours are stated in your quotation.",
      "No queue-clearing, crowd-moving or access privilege is offered or implied.",
      "On Luxury journeys, included only when requested, applicable and accepted in your quotation.",
    ],
    locations: "Varanasi and journey destinations, subject to provider confirmation",
    unit: "Per person deployed, per block of hours",
    price: { mode: "quote" },
    relations: {},
    hero: "varanasi-dev-deepawali",
    seo: {
      title: "Security Assistance for Travel in Varanasi | Tourmelloh",
      description:
        "Professional security personnel in Varanasi for a stated purpose, place and hours, through a confirmed provider. No queue-clearing or special access.",
    },
  },
  {
    id: "S24",
    slug: "professional-photography",
    status: "published",
    title: "Professional photography",
    category: "Photography & films",
    summary:
      "A professional photographer joins a walk, boat ride, ritual or family moment, with session length, edited image count, delivery time and consent agreed beforehand.",
    body: [
      "Most guests come home with plenty of photographs and very few of themselves together. A photographer joins you for a defined session, at dawn on the ghats, during a puja or on an evening boat, and captures your party in the places you came for.",
      "We agree the session length, the location, the number of edited images and when you will receive them, all before the day. Many temples do not allow cameras inside, and cremation grounds are never photographed; we brief the photographer on these limits.",
      "This service adds a photographer to another activity. Varanasi Through Your Lens is different: a photography-led experience where you learn and shoot. If you add a photographer to that experience, we ask whether you want extended coverage so the same work is not booked twice.",
    ],
    weAsk: [
      "Session length and preferred time of day",
      "Locations or activities to photograph",
      "Number of edited images you would like, and when you need them",
      "Consent from everyone to be photographed, and how you plan to use the images",
    ],
    scope: [
      "Session length, location, edited-image count and delivery time are stated in your quotation.",
      "No photography where temples, rituals or cremation grounds do not permit it.",
      "Images are for your personal use unless other usage is agreed in writing.",
      "Luxury journeys include a defined professional session where applicable; this service adds to or extends it.",
    ],
    locations: "Varanasi, Sarnath and journey destinations",
    unit: "Per photographer, per session",
    price: { mode: "quote" },
    relations: { overlapsWith: ["E17"] },
    hero: "photographer",
    seo: {
      title: "Professional Photographer in Varanasi | Tourmelloh",
      description:
        "A professional photographer for your walk, boat ride, ritual or family moment in Varanasi, with session length, edited images and delivery agreed.",
    },
  },
  {
    id: "S25",
    slug: "videography",
    status: "published",
    title: "Videography",
    category: "Photography & films",
    summary:
      "Video coverage of your journey or a special day, with filming hours, locations, deliverables, editing and delivery timeline agreed in writing before filming starts.",
    body: [
      "Videography suits families marking a milestone, a ritual they want to keep, or a journey they want to share with relatives who could not come. A videographer films for agreed hours and places and delivers an edited film, with raw footage if you ask for it.",
      "Before filming we agree the hours, the places, what you receive (a longer edited film, highlights, raw clips), how many revisions are included and the delivery date. Filming at temples and ghats follows local rules, and cremation grounds are not filmed.",
      "For a short, polished reel to share, see Your Journey in Film. If you book both, we reconcile shared filming hours and any reel already included here before quoting, so nothing is charged twice. Drone footage is not included unless separately approved and permitted.",
    ],
    weAsk: [
      "Hours of filming, and on which days",
      "Locations and activities to film",
      "Deliverables: edited film length, highlights, raw footage",
      "Revisions and the delivery timeline",
      "Consent from everyone being filmed",
    ],
    scope: [
      "Hours, locations, deliverables, editing and delivery are stated in your quotation.",
      "Filming hours shared with a cinematic reel are reconciled before quoting.",
      "No filming where temples, rituals or cremation grounds do not permit it.",
      "Drone footage is excluded unless separately approved and permitted.",
    ],
    locations: "Varanasi and journey destinations",
    unit: "Per videographer, per block of hours",
    price: { mode: "quote" },
    relations: { overlapsWith: ["S34"] },
    hero: "varanasi-boats-evening",
    seo: {
      title: "Videography for Your Varanasi Journey | Tourmelloh",
      description:
        "Video coverage of your journey or a special day in Varanasi, with filming hours, locations, deliverables, editing and delivery agreed in writing.",
    },
  },
  {
    id: "S26",
    slug: "birthday-anniversary-and-occasion-arrangements",
    status: "published",
    title: "Birthday anniversary and occasion arrangements",
    category: "Occasions, dining & gifts",
    summary:
      "A birthday, anniversary or family milestone marked during your journey, with the occasion, venue, budget and exact deliverables agreed before anything is arranged.",
    body: [
      "A sixtieth birthday on the ghats, an anniversary dinner on a terrace above the river, a cake and flowers waiting in the room. Occasions on a journey need quiet planning behind the scenes, and a clear list of what will actually be there.",
      "Tell us the occasion and the budget you have in mind. We propose a venue and a list of deliverables, such as flowers, a cake, a table setting, a priest's blessing or a musician, and confirm each one in your quotation. Nothing is added beyond the agreed list.",
      "For a celebration on the river itself, Your Occasion, on the Ganges is the dedicated experience. If you book both, we reconcile them so the same arrangement is not paid for twice.",
    ],
    weAsk: [
      "The occasion, the date and who it is for",
      "Preferred venue type: hotel, restaurant, rooftop or riverside",
      "The budget you have in mind",
      "Exact items you would like: cake, flowers, decor, music, a blessing",
      "Whether it should be a surprise",
    ],
    scope: [
      "Only the deliverables listed in your quotation are arranged.",
      "Venue bookings depend on the venue's availability and rules.",
      "Overlaps with Your Occasion, on the Ganges are reconciled before quoting.",
      "Weddings are planned separately through Destination Weddings.",
    ],
    locations: "Varanasi, and journey destinations on request",
    unit: "Per occasion",
    price: { mode: "quote" },
    relations: { overlapsWith: ["E18"] },
    hero: "diwali-lamps",
    seo: {
      title: "Birthday and Anniversary Arrangements, Varanasi | Tourmelloh",
      description:
        "Mark a birthday, anniversary or family milestone during your Varanasi journey, with venue, budget and exact deliverables agreed before anything is booked.",
    },
  },
  {
    id: "S27",
    slug: "dining-reservations-and-dietary-coordination",
    status: "published",
    title: "Dining reservations and dietary coordination",
    category: "Occasions, dining & gifts",
    summary:
      "Restaurant reservations and a clear relay of your dietary needs, from Jain and sattvic meals to allergies, with included meals kept separate from extra bookings.",
    body: [
      "Food in Varanasi runs from kachori-sabzi at a lane stall to a quiet thali in a heritage hotel. Many pilgrims also eat strictly vegetarian, Jain or sattvic food without onion and garlic, especially on ritual days. We help you eat well without the guesswork.",
      "We book tables at restaurants you choose or we suggest, and pass your dietary requirements to hotels, restaurants and anyone serving food during an experience. Allergies are relayed in writing, but kitchens in the region often handle nuts, dairy and gluten, so we cannot promise an allergen-free meal.",
      "Your quotation shows clearly which meals are included in the journey, usually breakfast on hotel nights, and which are reservations you pay for at the table or as an extra.",
    ],
    weAsk: [
      "Dietary needs for each guest: vegetarian, Jain, sattvic, no onion or garlic, vegan, allergies",
      "Restaurants or kinds of food you would like to try",
      "Dates, times and party size for reservations",
      "Whether you want meals included in the quotation or paid at the table",
    ],
    scope: [
      "Reservations and dietary relay; meals are paid as stated in your quotation.",
      "Included journey meals and extra reservations are listed separately.",
      "Allergy information is passed on in writing, but allergen-free kitchens cannot be promised.",
      "Reservations depend on the restaurant's availability.",
    ],
    locations: "Varanasi and journey destinations",
    unit: "Per reservation; dietary coordination per journey",
    price: { mode: "quote" },
    relations: {},
    hero: "indian-dining",
    seo: {
      title: "Dining Reservations and Dietary Needs, Varanasi | Tourmelloh",
      description:
        "Restaurant bookings in Varanasi and a clear relay of Jain, sattvic, vegan and allergy needs, with included meals kept separate from extra reservations.",
    },
  },
  {
    id: "S28",
    slug: "hotel-stay-extension-or-room-upgrade",
    status: "published",
    title: "Hotel stay extension or room upgrade",
    category: "Stays, tickets & insurance",
    summary:
      "Add nights in a city or move to a better room category, with meals and room allocation reviewed by our team and confirmed in your quotation.",
    body: [
      "Varanasi often asks for more time than people plan. An extra night gives you a second dawn on the river or a slow day after an early ritual. Equally, you may want a river-view room, a suite for parents or interconnecting rooms for a family.",
      "Every extension or upgrade is reviewed, never added automatically. We check the hotel's availability, the room allocation for your party, the meal plan, and what an extra night does to transfers and onward travel. It is then quoted with the actual room category named.",
      "A room upgrade replaces the room in your journey for the same nights; an extension adds nights. Hotel categories follow the tier you choose, and a particular room category cannot be promised in every destination.",
    ],
    weAsk: [
      "City and number of extra nights, or the nights you want upgraded",
      "Room category or feature you would like: river view, suite, interconnecting rooms",
      "Room allocation: who shares with whom",
      "Meal plan preference",
    ],
    scope: [
      "Always reviewed and quoted; never confirmed automatically.",
      "The actual hotel and room category are named in your quotation.",
      "Upgrades replace the room for the same nights; extensions add nights.",
      "Extra nights may change transfers, vehicle days and onward travel, which are reviewed together.",
    ],
    locations: "Varanasi and journey destinations",
    unit: "Per room, per night",
    price: { mode: "quote" },
    relations: {},
    hero: "luxury-suite",
    seo: {
      title: "Hotel Stay Extension or Room Upgrade, Varanasi | Tourmelloh",
      description:
        "Add nights or move to a better room in Varanasi and other journey cities. Every extension or upgrade is reviewed and quoted with the room category named.",
    },
  },
  {
    id: "S29",
    slug: "flight-and-train-booking-assistance",
    status: "published",
    title: "Flight and train booking assistance",
    category: "Stays, tickets & insurance",
    summary:
      "Help finding and booking flights and trains that fit your journey, with fares and terms shown separately and nothing treated as confirmed until tickets are issued.",
    body: [
      "Good timings shape a journey. A late arrival can cost you the evening aarti; an overnight train can save a hotel night. We look at your route, suggest connections that suit your pace, and then help you book them.",
      "Train reservations in India open a fixed number of days before travel, and busy trains fill quickly, especially around festivals. Waitlisted and RAC tickets are not confirmed berths. We tell you the status honestly and plan a fallback for the legs that matter most.",
      "We collect passport or identity details only when a booking actually needs them, through a secure process and never through the website enquiry form. Fares, fees and cancellation terms belong to the airline or railway and are shown separately from your journey quotation.",
    ],
    weAsk: [
      "Route, dates and preferred times",
      "Number of passengers and their ages",
      "Class of travel, for example AC 2-tier, AC first class, economy or business",
      "Passenger identity details, only when we are ready to book and through a secure channel",
    ],
    scope: [
      "Fares and terms are set by the airline or railway and shown separately.",
      "No ticket is promised until it is issued; waitlisted and RAC tickets are not confirmed berths.",
      "Identity details are collected securely, and only when a booking needs them.",
      "Schedule changes and cancellations follow the airline's or railway's own terms.",
    ],
    locations: "Flights and trains to and from Varanasi and the gateways on your journey",
    unit: "Per booking",
    price: { mode: "quote" },
    relations: {},
    hero: "train-journey",
    seo: {
      title: "Flight and Train Booking Assistance, Varanasi | Tourmelloh",
      description:
        "Help booking flights and trains that fit your Varanasi journey, with fares and terms shown separately and nothing confirmed until tickets are issued.",
    },
  },
  {
    // Brief v5: publish only once an appropriate partner and actual service scope are confirmed.
    id: "S30",
    slug: "travel-insurance-enquiry-assistance",
    status: "draft",
    title: "Travel insurance enquiry assistance",
    category: "Stays, tickets & insurance",
    summary:
      "An optional request for help finding travel insurance for your journey, through an appropriate partner, once that partner and service scope are confirmed.",
    body: [
      "Travel insurance can cover cancellations, delays, lost baggage and medical costs, depending on the policy. Overseas guests usually arrange it at home before they fly; travellers from within India sometimes add it when booking tickets.",
      "Once this service is in place, we pass your request to an appropriate insurance partner, who advises on and issues any policy. Tourmelloh does not sell insurance or advise on which policy is right for you.",
      "This is an optional request only. Policy terms, exclusions and claims are between you and the insurer.",
    ],
    weAsk: [
      "Travel dates and destinations",
      "Number of guests and their ages",
      "Country of residence",
      "What you would like the policy to cover",
    ],
    scope: [
      "Optional request only; not required for any journey.",
      "Policies are advised on and issued by the partner, not by Tourmelloh.",
      "Available only once an appropriate partner and service scope are confirmed.",
      "Terms, exclusions and claims are between you and the insurer.",
    ],
    locations: "Journeys arranged by Tourmelloh",
    unit: "Per request",
    price: { mode: "quote" },
    relations: {},
    hero: "varanasi-river-mist",
    seo: {
      title: "Travel Insurance Enquiry Assistance | Tourmelloh",
      description:
        "An optional request for help finding travel insurance for your Tourmelloh journey, through an appropriate partner once the service scope is confirmed.",
    },
  },
  {
    id: "S31",
    slug: "welcome-amenities-and-celebration-gifts",
    status: "published",
    title: "Welcome amenities and celebration gifts",
    category: "Occasions, dining & gifts",
    summary:
      "A welcome hamper, refreshments or a celebration gift waiting at your hotel, with contents defined in advance and allergies taken into account.",
    body: [
      "Arriving to find a box of Banarasi sweets, seasonal fruit and a handwritten note makes a long journey feel looked after. A gift can also mark a birthday or anniversary, or say thank you to parents on a SHRAVAN journey.",
      "We agree the contents beforehand, so you know exactly what will be there: sweets, fruit, flowers, a small Banarasi textile, tea or a local craft. We check allergies and dietary rules, such as Jain or eggless preferences, before anything is chosen.",
      "Where a journey includes a welcome amenity, it is listed in your quotation. Gifts you request beyond that are quoted separately.",
    ],
    weAsk: [
      "Occasion: a welcome, birthday, anniversary or thank you",
      "Preferred contents or style: sweets, fruit, flowers, textile, craft",
      "Allergies and dietary rules for anyone who will eat from it",
      "Delivery place and date",
      "A message for the card, if any",
    ],
    scope: [
      "Contents are defined in your quotation; nothing is substituted without telling you.",
      "Allergies and dietary rules are checked before contents are chosen.",
      "Perishable items depend on the season and local availability.",
      "Amenities included in a journey are listed separately from extra gifts.",
    ],
    locations: "Hotels in Varanasi and journey destinations",
    unit: "Per hamper or gift",
    price: { mode: "quote" },
    relations: {},
    hero: "gift-hamper",
    seo: {
      title: "Welcome Amenities and Gifts in Varanasi | Tourmelloh",
      description:
        "A welcome hamper, refreshments or celebration gift waiting at your Varanasi hotel, with contents defined in advance and allergies taken into account.",
    },
  },
  {
    // Brief v5: the founder's proposed astrologer credentials stay off the page until verified.
    id: "S32",
    slug: "astrologer-consultation",
    status: "published",
    title: "Astrologer Consultation",
    category: "Specialist services",
    summary:
      "A consultation with a Vedic astrologer, in person in Varanasi or online, with session length, language and format agreed in advance.",
    body: [
      "Kashi has long been a centre of jyotish, the traditional Indian study of astrology, and many visitors like to consult an astrologer while they are here: for a personal reading, a muhurat for a family event or a question about timing.",
      "We arrange a session with an astrologer, either in person in Varanasi or online before or after your journey. Session length, language and format are agreed in advance. Birth details are shared directly with the astrologer through a private channel, never through the website form or a WhatsApp link.",
      "A consultation offers perspective and tradition, not certainty. No outcome is promised, and astrological advice is not a substitute for medical, legal or financial advice.",
    ],
    weAsk: [
      "Format: in person in Varanasi, or online",
      "Preferred session length and language",
      "The purpose of the consultation, in general terms",
      "Preferred date and time",
      "Birth details, shared privately with the astrologer once the session is confirmed",
    ],
    scope: [
      "Session length, language, format, location and fee scope are stated in your quotation.",
      "No particular outcome is promised.",
      "Not a substitute for medical, legal or financial advice.",
      "Birth details are shared privately, never through public forms or messaging links.",
      "No institutional endorsement is stated or implied.",
    ],
    locations: "Varanasi (in person) or online",
    unit: "Per consultation",
    price: { mode: "quote" },
    relations: {},
    hero: "astrology",
    seo: {
      title: "Astrologer Consultation in Varanasi | Tourmelloh",
      description:
        "Consult a Vedic astrologer in person in Varanasi or online, with session length, language and format agreed in advance. No particular outcome is promised.",
    },
  },
  {
    id: "S33",
    slug: "helicopter-transfers",
    status: "published",
    title: "Helicopter Transfers",
    category: "Specialist services",
    summary:
      "Enquiry-only helicopter transfers for a requested route and date, subject to operator, aircraft, landing permissions, weather and availability, and never booked instantly.",
    body: [
      "On some journeys a helicopter can turn a long road day into a short flight, for example between Varanasi and another pilgrimage destination, or for a family with very little time. These are charter flights, and they depend on a great deal outside our control.",
      "Tell us the route, date, number of passengers, baggage and any help needed at boarding. We take the request to licensed operators, who confirm whether an aircraft is available, whether landing permissions can be obtained at both ends, and which weight and baggage limits apply. Only then does it appear in your quotation.",
      "Weather can ground flights at short notice, and permissions can change. Every helicopter plan comes with a road alternative, and no transfer is confirmed until the operator confirms it in writing. Chopper and helicopter requests are the same service.",
    ],
    weAsk: [
      "Route: departure and arrival points",
      "Preferred date and time, and how flexible you are",
      "Number of passengers, and approximate weights if the operator asks for them",
      "Baggage: number and size of bags",
      "Any help needed for boarding",
    ],
    scope: [
      "Enquiry only; there is no instant booking.",
      "Subject to operator, aircraft, landing permissions, weather and availability.",
      "No transfer is promised until the operator confirms it in writing.",
      "Baggage and weight limits are set by the operator and can be strict.",
      "A road alternative is planned in case the flight cannot operate.",
    ],
    locations:
      "Routes between Varanasi and journey destinations, where an operator and landing permissions are available",
    unit: "Per charter flight",
    price: { mode: "quote" },
    relations: { synonyms: ["chopper"] },
    hero: "helicopter",
    seo: {
      title: "Helicopter Transfers on Request, Varanasi | Tourmelloh",
      description:
        "Enquire about helicopter transfers from Varanasi, subject to operator, aircraft, landing permissions and weather. Enquiry only and never booked instantly.",
    },
  },
  {
    // The brief joins the two parts of this title with an em dash; house style bans em dashes, so a colon does the job.
    id: "S34",
    slug: "your-journey-in-film-cinematic-reel",
    status: "published",
    title: "Your Journey in Film: Cinematic Reel",
    category: "Photography & films",
    summary:
      "A short cinematic reel of your journey, filmed and edited for sharing, with filming time, locations, format, music rights and revisions agreed in advance.",
    body: [
      "A cinematic reel is a short, carefully edited film of your days in Kashi: the boat at first light, the aarti flames, your family on the ghat steps. It is made to be watched on a phone and shared with the people who could not come.",
      "Before filming we agree the filming time and locations, how many reels you receive and how long each one is, vertical or horizontal format, the number of edits and revisions, the music and its rights, and the delivery date. Everyone filmed gives consent, and temple and cremation-ground rules are respected.",
      "Drone footage is excluded unless separately approved and permitted for the location. If you also book Videography, we reconcile shared filming hours and any reel already included there before quoting.",
    ],
    weAsk: [
      "Filming duration, and on which days",
      "Locations and moments you want in the reel",
      "Number of reels, length of each, and vertical or horizontal format",
      "Music preference, edits and revisions",
      "Delivery timeline, and consent from everyone being filmed",
    ],
    scope: [
      "Filming time, locations, reel count and length, format, revisions and delivery are stated in your quotation.",
      "Music rights are stated in your quotation; commercial use needs a separate agreement.",
      "Drone footage is excluded unless separately approved and permitted.",
      "Filming shared with Videography is reconciled, so nothing is charged twice.",
      "No filming where temples, rituals or cremation grounds do not permit it.",
    ],
    locations: "Varanasi and journey destinations",
    unit: "Per reel package",
    price: { mode: "quote" },
    relations: { overlapsWith: ["S25"] },
    hero: "varanasi-boat-sunrise",
    seo: {
      title: "Cinematic Reel of Your Varanasi Journey | Tourmelloh",
      description:
        "A short cinematic reel of your Varanasi journey, with filming time, locations, format, music rights and revisions agreed. Drone footage only if approved.",
    },
  },
];
