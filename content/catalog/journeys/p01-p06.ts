import type { InclusionLine, Journey } from "../types";

/*
 * P01 to P06: the Varanasi, Sarnath, Prayagraj and Ayodhya journeys from the client brief v5,
 * with day plans and tier lines aligned to the client's three-tier document of 31 October 2026.
 * Every programme here is a proposed planning version. Manifests are proposals for founder and
 * operations approval (brief sections 10 and 17); nothing below confirms a supplier, a boat, a
 * darshan slot or a price. Brief titles that contain a dash use an en dash, because the catalogue
 * validator bans the em dash.
 */

// Gateways and conditions shared by several journeys (checked October 2026).
const VARANASI_ARRIVAL =
  "Varanasi: Lal Bahadur Shastri International Airport at Babatpur, about 26 km north-west of the city, or Varanasi Junction and Banaras railway stations in the city.";
const AYODHYA_DEPARTURE =
  "Ayodhya: Maharishi Valmiki International Airport, about 10 km from the temple area, or Ayodhya Dham Junction, about 2 km from the Ram Janmabhoomi Mandir. Lucknow airport and stations, about three hours by road, have more flights and trains and are included as a departure point.";
const KASHI_VISHWANATH_RULES =
  "Phones, smartwatches, cameras and other electronic devices are not allowed inside and are deposited before entry, and footwear is left outside. Queues can take minutes or hours, and darshan timing cannot be promised.";
const RAM_MANDIR_RULES =
  "Phones and bags are not allowed inside and are deposited before the security check. Opening hours change by season, with a winter schedule from November, so timings are confirmed for your dates.";

// Tier wording shared across the six journeys (brief section 5, client tier lines of 31 Oct 2026).
const STANDARD_ASSISTANCE =
  "A named remote coordinator, by phone and WhatsApp from planning to departure, who confirms each arrangement and is your contact if plans change. No one accompanies you on visits unless a host or guide is added.";
const LUXURY_ASSISTANCE =
  "A dedicated travel concierge for the whole journey, with support hours agreed in your quotation, and a personal host with you for every sightseeing session.";
const PHOTO_OPTIONAL = "Not included. A photographer, videographer or short cinematic reel can be added.";
const SECURITY_ON_REQUEST = "On request; reviewed and quoted separately if you ask for it.";
const SECURITY_LUXURY =
  "Included only if you request it, it applies to your journey and it is accepted in your final quotation. It carries no queue or access privileges.";
const PREMIUM_VEHICLE = (drives: string) =>
  `An air-conditioned Innova or Innova Crysta-class SUV with driver for ${drives}. Subject to availability; the actual vehicle is named in your quotation.`;
const LUXURY_VEHICLE = (roads: string) =>
  `A luxury SUV or car, such as an Innova Crysta, a Fortuner or a Mercedes, chosen for your party and ${roads}, with driver. Subject to availability; the actual vehicle is named in your quotation.`;
const PREMIUM_PRIORITY =
  "A VIP or priority line is used only where the temple's official arrangements allow it on your date; otherwise you join the general queue with your host.";
const LUXURY_FAST_TRACK =
  "Fast-track or VIP darshan is requested only through the temple trust's own system, where its official arrangements allow it on your date; otherwise your host stays with you in the general queue.";

// Lines that read the same wherever a tier includes them.
const securityLine: InclusionLine = {
  item: "S23",
  scope: "Security assistance from a confirmed professional provider, for the purpose, places and hours you request. It gives no queue-clearing or access privileges.",
  state: "conditional",
  mandatory: false,
};
const welcomeLine: InclusionLine = {
  item: "S31",
  day: 1,
  session: "On arrival",
  scope: "A welcome of seasonal fruit and Banarasi sweets in your room, with allergies and preferences checked beforehand.",
  state: "included",
  mandatory: false,
};
const premiumVehicleLine: InclusionLine = {
  item: "S03",
  session: "Whole journey",
  scope: "Vehicle upgraded to an Innova or Innova Crysta-class SUV, confirmed for your party and luggage; subject to availability and named in your quotation.",
  state: "included",
  mandatory: false,
};
const luxuryVehicleLine: InclusionLine = {
  item: "S03",
  session: "Whole journey",
  scope: "A luxury SUV or car, such as an Innova Crysta, a Fortuner or a Mercedes, subject to availability and named in your quotation.",
  state: "included",
  mandatory: false,
};
const concierge = (where: string): InclusionLine => ({
  item: "S09",
  session: "Whole journey",
  scope: `A dedicated travel concierge across ${where}, in person and by phone at agreed support hours, coordinating every arrangement. Not a round-the-clock service unless your quotation says so.`,
  state: "included",
  mandatory: false,
});
const porters = (where: string): InclusionLine => ({
  item: "S05",
  session: "Arrival, departure and hotel changes",
  scope: `Luggage and porter help ${where}, wherever porters are available.`,
  state: "included",
  mandatory: false,
});

export const journeys: Journey[] = [
  // ---------------------------------------------------------------------------------------------
  {
    id: "P01",
    slug: "first-impressions-of-varanasi",
    status: "published",
    setup: "Priority launch candidate",
    title: "First Impressions of Varanasi – Varanasi & Sarnath",
    route: "Varanasi with Sarnath",
    destinations: ["varanasi", "sarnath"],
    types: ["heritage", "culture"],
    nights: 2,
    days: 3,
    overnights: [{ place: "Varanasi", nights: 2 }],
    suits:
      "First-time visitors with two nights to give, couples, friends and families with older children who want the temple, the river, Sarnath and the old lanes without racing between them.",
    style:
      "Private, at a steady pace from one Varanasi hotel: one dawn start, a midday rest on the Sarnath day and short drives. Your tier decides how much is hosted, guided and private.",
    summary:
      "A suggested three-day first visit: Kashi Vishwanath and the evening aarti, a sunrise boat along the ghats, Sarnath, and an old-city walk with a silk handloom visit, all from one Varanasi hotel.",
    lead: "Two nights is enough to begin to understand Varanasi, if the hours are chosen well. This suggested three-day version opens with Kashi Vishwanath, Manikarnika and the evening aarti at Dashashwamedh. The second day begins on the river at sunrise, continues at Assi Ghat and Sankat Mochan, and ends at Sarnath, ten kilometres away, where the Buddha gave his first teaching. The last morning is for the old lanes and the silk looms that still work in them.",
    gateways: {
      arrival: `${VARANASI_ARRIVAL} Arriving by late morning on Day 1 leaves time for Kashi Vishwanath in the afternoon and the evening aarti.`,
      departure:
        "The same airport or stations on Day 3. Allow about an hour and a half from the old city to the airport, more at busy times.",
      timingWarning:
        "If you land after about 2 p.m. on Day 1, the temple visit moves to Day 2 and the evening aarti may be missed. Fog can delay flights and trains on December and January mornings, so a Day 3 departure after midday is safer and keeps the heritage walk. Some long-distance trains stop only at Pt. Deen Dayal Upadhyaya Junction, across the river, which means a longer transfer.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival & Kashi Vishwanath Darshan",
        place: "Varanasi",
        photo: "varanasi-aarti-lamp",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "arrival",
            time: "On arrival",
            title: "Met at the airport or station",
            text: "You are met and driven to your hotel to check in. From the airport the drive usually takes about an hour; from the railway stations, less.",
          },
          {
            kind: "visit",
            time: "Afternoon",
            title: "Shri Kashi Vishwanath",
            text: `The temple and its broad corridor down to the river. In Standard you join the general darshan line with a timing plan from your coordinator; in Premium your host escorts you, using a VIP line where the temple allows; in Luxury a personal priest and your host go with you, with fast-track darshan where the temple's arrangements allow. ${KASHI_VISHWANATH_RULES}`,
          },
          {
            kind: "visit",
            time: "Late afternoon",
            title: "Manikarnika Ghat",
            text: "From the corridor, a short walk to Manikarnika, the cremation ghat, where fires have burned for centuries. It is seen from a respectful distance, quietly and without photographs.",
          },
          {
            kind: "experience",
            time: "Early evening",
            title: "Ganga aarti at Dashashwamedh",
            text: "The grand evening aarti begins around sunset. In Standard you watch from the ghat steps with clear directions from your coordinator; in Premium your host takes you to an arranged viewing place; in Luxury you watch from a private boat held off the ghat.",
          },
          {
            kind: "rest",
            time: "Night",
            title: "An early night",
            text: "Back to the hotel for dinner and sleep before tomorrow's dawn start.",
          },
        ],
      },
      {
        day: 2,
        title: "Subah-e-Banaras & Sarnath Excursion",
        place: "Varanasi and Sarnath",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "travel",
            time: "Before sunrise",
            title: "Down to the river",
            text: "A short drive in the dark, then a walk down the ghat steps to the boat.",
          },
          {
            kind: "experience",
            time: "Sunrise",
            title: "A boat along the historic ghats",
            text: "About an hour on the water as the sun clears the far bank, past bathers, morning prayers and the palaces above the ghats. Standard shares a scheduled guided boat; Premium has a private motorboat; Luxury a private bajra, the traditional wooden boat, with a sitar player and refreshments on board. Boats run only when the river level and local rules allow.",
          },
          {
            kind: "visit",
            time: "Morning",
            title: "Assi Ghat and Sankat Mochan",
            text: "Time on Assi Ghat, home of the Subah-e-Banaras dawn programme of aarti, music and yoga, then a short drive to the Sankat Mochan Hanuman temple. Phones are not allowed inside Sankat Mochan, so they stay in the car.",
          },
          {
            kind: "rest",
            time: "Midday",
            title: "Lunch and a proper rest",
            text: "Back at the hotel through the hottest part of the day.",
          },
          {
            kind: "travel",
            time: "Early afternoon",
            title: "To Sarnath",
            text: "About 30 to 45 minutes by road, 10 km north-east of the city.",
          },
          {
            kind: "visit",
            time: "Afternoon",
            title: "Sarnath",
            text: "The Dhamek Stupa, the excavated monastery ruins and the Archaeological Museum, home of the Lion Capital of Ashoka. In Standard you visit with your driver; in Premium and Luxury with a specialist guide. The museum is closed on Fridays; if Day 2 falls on one, the stupa and site stay open and we rearrange the days so you can see the museum where your timings allow.",
          },
          {
            kind: "free",
            time: "Evening",
            title: "Your own evening",
            text: "Rest, or walk down to the ghats at your own pace.",
          },
        ],
      },
      {
        day: 3,
        title: "Heritage Walk & Departure",
        place: "Varanasi",
        photo: "varanasi-chai",
        overnight: "Departure",
        blocks: [
          {
            kind: "experience",
            time: "Early morning",
            title: "The old alleys on foot",
            text: "A heritage walk through the old city's lanes, past household shrines, brass and puja stalls and the trades that open first. Premium and Luxury have a guide; in Standard your coordinator sends a route and your driver drops you at the start, and a guide can be added.",
          },
          {
            kind: "experience",
            time: "Morning",
            title: "A silk handloom visit",
            text: "A visit to a Banarasi weaving workshop to watch brocade grow on the handloom. In Premium and Luxury it is a prearranged visit with a weaving family; in Standard your driver takes you to a workshop your coordinator has arranged. Buying is entirely your choice.",
          },
          {
            kind: "experience",
            time: "Late morning",
            title: "A local breakfast",
            text: "A Banarasi breakfast of kachori, sabzi and jalebi at a well-known local shop, paid locally unless your quotation lists it, before heading back to the hotel.",
          },
          {
            kind: "departure",
            time: "As your travel allows",
            title: "To your flight or train",
            text: "Checkout and transfer to the airport or station, allowing for traffic out of the old city. A late checkout is requested where the hotel can offer one, never assumed.",
          },
        ],
      },
    ],
    practical: {
      walking:
        "Expect uneven stone steps on the ghats, some steep and without rails, 10 to 15 minutes on foot from the nearest car drop to Dashashwamedh, and narrow, crowded lanes on the Day 3 heritage walk. Kashi Vishwanath means queuing and walking barefoot on stone. Sarnath is level, with about an hour on gravel paths and through the museum.",
      earlyStarts:
        "One dawn start, on Day 2, leaving the hotel before sunrise, which comes at about 5 a.m. in early summer and nearer 6.45 a.m. in midwinter. The Day 3 heritage walk also begins early, before the lanes grow busy.",
      boarding:
        "Boats are boarded from ghat steps that can be wet and uneven; the boatman helps you in, and in Premium and Luxury so does your host. Life jackets should be worn. When the river runs high, usually July to September, the administration can stop boats, and the boat is moved or replaced with a walk.",
      mobility:
        "Not well suited to guests who cannot manage steps without help. Sarnath and an arranged aarti viewing place are manageable for most; the ghats, the temple lanes and the heritage walk are hard going in a wheelchair. Tell us before booking so the route and any assistance can be reviewed.",
      seasonal:
        "October to March is the most comfortable season, with fog on some winter mornings. April to June is very hot, so outings keep to early mornings and evenings. Dev Deepawali on the Kartik full moon in November, Mahashivratri and the month of Shravan bring very large crowds and changed temple arrangements.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotel in Varanasi",
          "AC sedan with driver",
          "Shared Ganga boat ride at sunrise",
          "Standard darshan at Kashi Vishwanath",
        ],
        hotels:
          "A selected 3-star hotel in Varanasi for two nights. Subject to availability; the property and room type are named in your quotation.",
        vehicle:
          "Private air-conditioned sedan or suitable equivalent with driver for arrival, departure and the programme's drives. The driver is not a sightseeing guide.",
        meals: "Breakfast on both hotel nights. Lunches, dinners and the Day 3 local breakfast are not included.",
        boat: "One included boat: a shared, scheduled guided sunrise boat along the ghats on Day 2.",
        darshan:
          "Standard darshan at Kashi Vishwanath on Day 1 in the general line, with timing, device rules and the walking route explained by your coordinator. No accompaniment inside, and no paid darshan ticket unless you ask and it is confirmed.",
        assistance: STANDARD_ASSISTANCE,
        guide:
          "No sightseeing guide. The sunrise boat has its own guide. A specialist guide for Sarnath and a guide for the heritage walk can be added.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum. Temple offerings, puja materials and camera fees are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 3 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Days 1 to 3",
            scope:
              "Private sedan or suitable equivalent with driver for the temple and aarti drops on Day 1, the dawn drive, Sankat Mochan and the return trip to Sarnath on Day 2, and the drops for the walk and the weaving workshop on Day 3. Not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E12",
            day: 2,
            session: "Sunrise",
            scope: "A seat on a shared, scheduled sunrise boat of about an hour with the boat's guide; boarding point and time confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day2-dawn",
          },
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Lunches, dinners and the Day 3 local breakfast",
          "A host or sightseeing guide for the temple, Sarnath and the heritage walk",
          "A private boat, an evening boat or aarti seating",
          "Paid darshan tickets, puja, offerings and donations",
          "Arrival welcome inside the terminal and porters",
          "Travel insurance, camera fees, tips and personal expenses",
        ],
      },
      premium: {
        highlights: [
          "4-star or heritage hotel in Varanasi",
          "AC Innova with driver",
          "Private motor boat at sunrise",
          "Escorted darshan, VIP line where the temple allows",
        ],
        hotels:
          "A selected 4-star or heritage hotel in Varanasi for two nights. Subject to availability; the property and room type are named in your quotation.",
        vehicle: PREMIUM_VEHICLE("every transfer and drive in the programme"),
        meals: "Breakfast on both hotel nights. Lunches, dinners and the Day 3 local breakfast are not included.",
        boat: "The Day 2 sunrise boat becomes a private motorboat for your party; its capacity is confirmed in your quotation.",
        darshan: `Escorted darshan at Kashi Vishwanath on Day 1: your host plans the timing, helps with the deposit of devices and footwear and stays with you as far as the temple's rules allow. ${PREMIUM_PRIORITY}`,
        assistance:
          "Your named coordinator, a welcome on arrival, and a travel host with you for Kashi Vishwanath, Manikarnika and the aarti on Day 1, and the sunrise boat, Assi Ghat and Sankat Mochan on Day 2.",
        guide: "A specialist guide at Sarnath, and a guided old-city heritage walk and weaving visit on Day 3.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum, and the temple trust's own priority darshan ticket where one is booked for you. Offerings, puja materials and camera fees are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 3 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive in the programme, including Sarnath. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          premiumVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at the airport arrivals exit or station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S10",
            session: "Day 1 afternoon and evening, Day 2 morning",
            scope: "A travel host with you for Kashi Vishwanath, Manikarnika, the aarti, the sunrise boat, Assi Ghat and Sankat Mochan. A companion and organiser, not a guide or security officer.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S08",
            day: 1,
            session: "Afternoon",
            scope: "Escorted darshan at Kashi Vishwanath: timing plan, cloakroom and device deposit, and company in the queue as far as permitted, with a VIP line only where the temple's official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S07",
            day: 1,
            session: "Evening",
            scope: "An arranged viewing place for the Dashashwamedh aarti: a seat on the ghat or on a viewing boat, as available that evening.",
            state: "included",
            mandatory: false,
            replacementGroup: "aarti-day1-evening",
          },
          {
            item: "S06",
            day: 2,
            session: "Sunrise",
            scope: "A private motorboat for your party in place of the shared ride, for about an hour along the ghats.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day2-dawn",
          },
          {
            item: "E24",
            day: 2,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E03",
            day: 3,
            session: "Early morning",
            scope: "A guided heritage walk of about two hours through the old city's lanes, markets and makers.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E19",
            day: 3,
            session: "Morning",
            scope: "Threads of Banaras: a prearranged visit with a weaving family and their handloom, with retail expectations explained in advance.",
            state: "included",
            mandatory: false,
          },
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Lunches, dinners and the Day 3 local breakfast",
          "A host or guide outside the listed sessions",
          "An evening boat or any additional boat session",
          "Puja, offerings, donations and purchases at the weaving workshop",
          "Professional photography and porters",
          "Travel insurance, camera fees, tips and personal expenses",
        ],
      },
      luxury: {
        highlights: [
          "5-star stay such as Taj Ganges or BrijRama Palace",
          "Private luxury SUV with driver",
          "Private bajra at sunrise with live sitar and refreshments",
          "Personal priest and fast-track darshan where allowed",
        ],
        hotels:
          "A selected 5-star or heritage hotel in Varanasi for two nights, such as Taj Ganges or BrijRama Palace. Subject to availability; the property and room are named in your quotation.",
        vehicle: LUXURY_VEHICLE("the old-city roads"),
        meals: "Breakfast on both hotel nights and refreshments on the sunrise bajra. No other meals are included unless listed in your quotation.",
        boat: "Two private river sessions: the Day 1 aarti watched from a private boat, and a private bajra, the traditional wooden boat, for the Day 2 sunrise with a sitar player and refreshments on board. The bajra and the musician are confirmed for your date in your quotation; if no bajra operates, the most suitable private boat is used.",
        darshan: `A personal priest and your host go with you to Kashi Vishwanath on Day 1, with dedicated coordination within the temple's rules. ${LUXURY_FAST_TRACK}`,
        assistance: LUXURY_ASSISTANCE,
        guide: "A specialist guide at Sarnath, and a guided old-city heritage walk and weaving visit on Day 3, with your host throughout.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum, and the temple trust's own fast-track darshan ticket where one is booked for you. Offerings, puja materials and camera fees are not included.",
        photography:
          "A professional photography session of about one hour during the Day 3 heritage walk, with your consent; the number of edited images and the delivery time are stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 3 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive in the programme, including Sarnath. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          luxuryVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at the airport arrivals exit or station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          porters("at arrival and departure"),
          concierge("Varanasi and Sarnath"),
          {
            item: "S10",
            session: "Every sightseeing session",
            scope: "A personal host with you for the temple, the aarti, both river sessions, Assi Ghat, Sankat Mochan, Sarnath and the heritage walk.",
            state: "included",
            mandatory: false,
          },
          welcomeLine,
          {
            item: "S19",
            day: 1,
            session: "Afternoon",
            scope: "A personal priest who accompanies your Kashi Vishwanath darshan and explains the rituals, arranged in advance with your language and tradition. Dakshina and offerings are your own.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S08",
            day: 1,
            session: "Afternoon",
            scope: "Dedicated coordination and accompaniment at Kashi Vishwanath within the temple's rules, with fast-track darshan only where the temple's official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E13",
            day: 1,
            session: "Evening",
            scope: "Evening on the Ganges as a private boat session for your party, held off Dashashwamedh so the aarti is watched from the water.",
            state: "included",
            mandatory: false,
            replacementGroup: "aarti-day1-evening",
          },
          {
            item: "E14",
            day: 2,
            session: "Sunrise",
            scope: "Sur on the Ganges: a private bajra for your party at sunrise with a live sitar player and refreshments on board, subject to a confirmed musician and vessel; otherwise the most suitable private boat.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day2-dawn",
          },
          {
            item: "E24",
            day: 2,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E03",
            day: 3,
            session: "Early morning",
            scope: "A guided heritage walk of about two hours through the old city's lanes, markets and makers.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E19",
            day: 3,
            session: "Morning",
            scope: "Threads of Banaras: a prearranged visit with a weaving family and their handloom, with retail expectations explained in advance.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S24",
            day: 3,
            session: "Early morning",
            scope: "A professional photographer for about one hour during the heritage walk; edited-image count and delivery time stated in your quotation.",
            state: "included",
            mandatory: false,
          },
          securityLine,
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Lunches and dinners unless listed in your quotation",
          "Puja, offerings, donations and dakshina",
          "Purchases at the weaving workshop",
          "Videography and cinematic reels",
          "Additional days, sessions or support hours beyond the agreed programme",
          "Travel insurance, camera fees, tips and personal expenses",
        ],
      },
    },
    related: ["E04", "E09", "E08", "E15", "S27", "S17"],
    faqs: [
      {
        q: "Is two nights enough for a first visit?",
        a: "For a first look, yes: Kashi Vishwanath, the aarti, the river at sunrise, Sarnath and the old lanes. It leaves little room for food walks or music. The Many Moods of Varanasi adds a night and those experiences, and Varanasi at Your Pace slows the temple days down.",
      },
      {
        q: "What if our Sarnath day falls on a Friday?",
        a: "The Sarnath museum, which holds the Lion Capital of Ashoka, is closed on Fridays. Once your dates are known we arrange the days so you can see it; the stupa and the excavated site are open as usual.",
      },
      {
        q: "Can we take our phones into Kashi Vishwanath?",
        a: "No. Phones, smartwatches, cameras and other electronic devices are not allowed inside and are deposited before you enter. Carry as little as you can. In Premium and Luxury your host helps with the deposit; in Standard your coordinator explains where to leave them.",
      },
      {
        q: "Can you promise VIP darshan in Premium and Luxury?",
        a: "No temple line can be promised. Your host escorts you in Premium, and a personal priest joins you in Luxury, but a VIP or fast-track line is used only where the temple trust's official arrangements allow it on your date. On festival days these are often withdrawn.",
      },
      {
        q: "What happens if the boats are not running?",
        a: "The administration can stop boats when the river is high, usually in the monsoon, or when visibility is poor. We move the boat to another session if the programme allows, or replace it with a walk along the ghats, and confirm any change with you in writing.",
      },
    ],
    hero: "varanasi-ghats-dawn",
    gallery: ["varanasi-ganga-aarti", "sarnath-monks", "varanasi-old-city-lanes"],
    seo: {
      title: "First Impressions of Varanasi: Ghats & Sarnath | Tourmelloh",
      description:
        "A suggested three-day first visit to Varanasi: Kashi Vishwanath, the evening aarti, a sunrise boat, Sarnath and an old-city walk, in Standard, Premium or Luxury.",
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    id: "P02",
    slug: "varanasi-at-your-pace",
    status: "published",
    setup: "Priority launch candidate",
    title: "Varanasi at Your Pace – An Unhurried Pilgrimage",
    route: "Varanasi temples and Sarnath, with rest periods",
    destinations: ["varanasi", "sarnath"],
    types: ["hindu-pilgrimage"],
    nights: 3,
    days: 4,
    overnights: [{ place: "Varanasi", nights: 3 }],
    suits:
      "Devotees who want the temples of Kashi without strain, travelling parents and senior travellers (this is the parent journey for SHRAVAN Varanasi), and anyone who would rather do less each day and do it properly.",
    style:
      "Private and deliberately slow, from one Varanasi hotel: one main visit per session, a long rest every afternoon, and drives in place of long walks wherever the lanes allow.",
    summary:
      "A suggested four-day Varanasi pilgrimage with rest every afternoon: the evening aarti, Kashi Vishwanath and Vishalakshi, an evening of music, a sunrise boat with a scholar, Sarnath and a wellness morning.",
    lead: "Varanasi asks a lot of the body: early hours, crowds, steps and heat. This suggested four-day version is for people who want its temples without being worn down by them. The first day is a gentle welcome that ends at the evening aarti. Kashi Vishwanath and Vishalakshi have a morning to themselves, followed by a long rest and an evening of music. The river is seen at sunrise with a scholar who knows it, Sarnath is taken slowly, and the last morning begins with yoga on the ghat.",
    gateways: {
      arrival: `${VARANASI_ARRIVAL} Day 1 holds only the evening aarti, so any arrival before late afternoon works; earlier simply means more rest.`,
      departure:
        "The same airport or stations on Day 4. Allow about an hour and a half from the old city to the airport, more at busy times.",
      timingWarning:
        "Arriving after about 4 p.m. on Day 1 means the aarti moves to another evening. A Day 4 departure after midday leaves room for the dawn yoga, breakfast and some shopping; an early flight shortens the morning. Fog can delay flights and trains on December and January mornings.",
    },
    itinerary: [
      {
        day: 1,
        title: "Gentle Welcome & Evening Aarti",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "arrival",
            time: "On arrival",
            title: "A private transfer to your hotel",
            text: "In Premium and Luxury you are welcomed at the exit and helped with luggage; in Standard your driver meets you. About an hour by road from the airport, less from the railway stations.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "A rest period",
            text: "Check in, eat something light and rest after the journey. Your coordinator, or your concierge in Luxury, talks you through the days ahead.",
          },
          {
            kind: "experience",
            time: "Early evening",
            title: "A gentle stroll to the Ganga aarti",
            text: "A short drive, then an unhurried walk of 10 to 15 minutes to Dashashwamedh Ghat for the evening aarti. In Standard you watch from the ghat steps with directions from your coordinator; in Premium and Luxury your host takes you to an arranged seat.",
          },
          {
            kind: "rest",
            time: "Night",
            title: "Dinner at the hotel",
            text: "An early night.",
          },
        ],
      },
      {
        day: 2,
        title: "Kashi Vishwanath & Sacred Temples",
        place: "Varanasi",
        photo: "temple-shrine",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "travel",
            time: "Early morning",
            title: "Towards the temples",
            text: "A short drive. Cars stop at a distance from the temple, and the last stretch is on foot or by rickshaw.",
          },
          {
            kind: "visit",
            time: "Morning",
            title: "Shri Kashi Vishwanath and Vishalakshi",
            text: `Darshan at Kashi Vishwanath early, before the heat, with time afterwards to sit in the temple corridor above the river, then the Vishalakshi temple in the lanes nearby. In Standard your coordinator plans the timing and route; in Premium your host escorts you; in Luxury your host and a dedicated escort stay with you throughout. ${KASHI_VISHWANATH_RULES} A VIP or fast-track line is used only where the temple's official arrangements allow.`,
          },
          {
            kind: "rest",
            time: "Late morning to late afternoon",
            title: "Lunch and a long rest",
            text: "Back at the hotel until the light softens.",
          },
          {
            kind: "experience",
            time: "Evening",
            title: "An evening of music",
            text: "In Premium and Luxury, An Evening in Raag: an intimate live performance of Hindustani music with confirmed musicians at an agreed venue. In Standard your coordinator suggests a public concert or cultural programme running that evening, with any tickets at your own cost, and the private performance can be added.",
          },
        ],
      },
      {
        day: 3,
        title: "Ghats by Boat & Classical Sarnath",
        place: "Varanasi and Sarnath",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "experience",
            time: "Sunrise",
            title: "The ghats by boat",
            text: "About an hour on the water as the city comes down to bathe. In Standard, a shared boat with the boat's own guide; in Premium, a private boat with a local scholar guide on board; in Luxury, a private boat with a scholar guide and a live musician. Boats run only when the river level and local rules allow.",
          },
          {
            kind: "rest",
            time: "Morning",
            title: "Breakfast and rest",
            text: "Back at the hotel until early afternoon.",
          },
          {
            kind: "travel",
            time: "Early afternoon",
            title: "To Sarnath",
            text: "About 30 to 45 minutes by road, 10 km north-east of the city.",
          },
          {
            kind: "visit",
            time: "Afternoon",
            title: "Sarnath, at a leisurely pace",
            text: "The Dhamek Stupa and a slow tour of the Archaeological Museum, home of the Lion Capital of Ashoka, with seats along the way. With a specialist guide in Premium and Luxury, with your driver in Standard. The museum is closed on Fridays, so Sarnath moves to another day if Day 3 falls on one.",
          },
          {
            kind: "rest",
            time: "Evening",
            title: "A quiet evening",
            text: "Dinner at the hotel and an early night.",
          },
        ],
      },
      {
        day: 4,
        title: "Wellness Morning & Departure",
        place: "Varanasi",
        photo: "varanasi-yoga-ghat",
        overnight: "Departure",
        blocks: [
          {
            kind: "experience",
            time: "Dawn",
            title: "Yoga and meditation on the ghat",
            text: "A gentle yoga and meditation session at dawn on the ghat, joining the public Subah-e-Banaras session at Assi Ghat. Every movement is optional, and you may simply sit and watch the river.",
          },
          {
            kind: "rest",
            time: "Morning",
            title: "Breakfast and packing",
            text: "Back at the hotel. A late checkout is requested where the hotel can offer one.",
          },
          {
            kind: "free",
            time: "Late morning",
            title: "Handicraft shopping",
            text: "An hour for Banarasi silk, brassware or wooden toys at shops your coordinator suggests, with your host in Premium and Luxury. Buying is entirely your choice.",
          },
          {
            kind: "departure",
            time: "Midday onwards",
            title: "To your flight or train",
            text: "Transfer to the airport or station.",
          },
        ],
      },
    ],
    practical: {
      walking:
        "Less walking than most Varanasi itineraries, but not none. The stroll to Dashashwamedh is 10 to 15 minutes from the car drop. Kashi Vishwanath and Vishalakshi involve queuing, stone floors and walking barefoot. The boat and the yoga session involve steep ghat steps, often without rails. Sarnath is level, with seats in the museum.",
      earlyStarts:
        "Day 2 begins early for the temples, Day 3 before sunrise for the boat, and the Day 4 yoga session is at dawn, though you may skip it.",
      boarding:
        "The sunrise boat is boarded from ghat steps; the boatman helps you on, and in Premium and Luxury so does your host. Life jackets should be worn. Boats can be stopped by the administration when the river is high, usually July to September.",
      mobility:
        "Designed for slower walkers, but the ghats and temple lanes are not wheelchair friendly. Wheelchair and assistant arrangements, and the senior travel companion that comes with SHRAVAN bookings, are assessed before your quotation. No medical or nursing care is included.",
      seasonal:
        "October to March is cooler and easier on older travellers, so it suits this journey best. Shravan, usually July to August, and Mahashivratri bring very large crowds to Kashi Vishwanath, and paid darshan tickets are often withdrawn then; other dates suit this journey better. April to June is very hot.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star deluxe hotel in Varanasi",
          "AC sedan with driver",
          "Shared sunrise boat ride",
          "Darshan planned and assisted by your coordinator",
        ],
        hotels:
          "A selected 3-star deluxe hotel in Varanasi for three nights. Subject to availability; the property and room type are named in your quotation.",
        vehicle:
          "Private air-conditioned sedan or suitable equivalent with driver for arrival, departure and every drive in the programme. The driver is not a sightseeing guide.",
        meals: "Breakfast on all three hotel nights. Lunches and dinners are not included.",
        boat: "One included boat: a seat on a shared sunrise boat on Day 3, with the boat's own guide.",
        darshan:
          "Assisted darshan at Kashi Vishwanath and Vishalakshi on Day 2: your coordinator plans the timing, the deposit of phones and footwear and the walking route, and stays on call. No one accompanies you inside, and no paid darshan ticket unless you ask and it is confirmed.",
        assistance: STANDARD_ASSISTANCE,
        guide: "No sightseeing guide. The sunrise boat has its own guide. A scholar guide, a Sarnath specialist and a host can be added.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum. Puja, priest fees, offerings and donations are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Days 1 to 4",
            scope: "Private sedan or suitable equivalent with driver for the aarti drop, the temple drive, the dawn drive to the boat, the return trip to Sarnath and the Day 4 drives. Not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E12",
            day: 3,
            session: "Sunrise",
            scope: "A seat on a shared, scheduled sunrise boat of about an hour with the boat's guide; boarding point confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-dawn",
          },
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Lunches and dinners",
          "A host or guide at the temples and Sarnath",
          "A private boat, aarti seating and the private music performance",
          "Puja, priest fees, offerings and donations",
          "Arrival welcome inside the terminal, porters and wheelchair assistance",
          "Travel insurance, tips and personal expenses",
        ],
      },
      premium: {
        highlights: [
          "4-star hotel or resort in Varanasi",
          "AC SUV such as an Innova Crysta",
          "Private sunrise boat with a scholar guide",
          "Escorted darshan, VIP line where the temple allows",
        ],
        hotels:
          "A selected 4-star hotel or resort in Varanasi for three nights. Subject to availability; the property and room type are named in your quotation.",
        vehicle: PREMIUM_VEHICLE("every transfer and drive in the programme"),
        meals: "Breakfast on all three hotel nights. Lunches and dinners are not included.",
        boat: "The Day 3 sunrise boat becomes a private boat for your party, with a local scholar guide on board; its category and capacity are confirmed in your quotation.",
        darshan: `Escorted darshan at Kashi Vishwanath and Vishalakshi on Day 2: your host plans the timing, helps with devices and footwear and stays with you as far as each temple's rules allow. ${PREMIUM_PRIORITY}`,
        assistance:
          "Your named coordinator, a welcome on arrival, and a travel host with you for the Day 1 aarti, the Day 2 temples and evening performance, the Day 3 boat and the Day 4 shopping.",
        guide: "A local scholar guide on the Day 3 sunrise boat and a specialist guide for an unhurried Sarnath museum tour.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum, and the temple trust's own priority darshan ticket where one is booked for you. Offerings, donations and dakshina remain your own.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive in the programme, including Sarnath. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          premiumVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at the airport arrivals exit or station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S07",
            day: 1,
            session: "Evening",
            scope: "An arranged seat for the Dashashwamedh aarti on the ghat, as available that evening.",
            state: "included",
            mandatory: false,
            replacementGroup: "aarti-day1-evening",
          },
          {
            item: "S10",
            session: "Days 1 to 4",
            scope: "A travel host with you for the aarti, the temples, the evening performance, the sunrise boat and the Day 4 shopping. A companion and organiser, not a guide or carer.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S08",
            day: 2,
            session: "Morning",
            scope: "Escorted darshan at Kashi Vishwanath and Vishalakshi: timing plan, cloakroom and device deposit, and company in the queue as far as permitted, with a VIP line only where the temple's official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E22",
            day: 2,
            session: "Evening",
            scope: "An Evening in Raag: a hosted live Hindustani music session of about ninety minutes with confirmed musicians and venue.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 3,
            session: "Sunrise",
            scope: "A private boat for your party in place of the shared boat, for about an hour; a rowing boat or motorboat as available and suitable.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-dawn",
          },
          {
            item: "S12",
            day: 3,
            session: "Sunrise",
            scope: "A local scholar guide on the sunrise boat, on the ghats, their temples and the history of the riverfront.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E24",
            day: 3,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide at a leisurely pace: the Dhamek Stupa and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Lunches and dinners",
          "Puja, Rudrabhishek, offerings, donations and dakshina",
          "Any additional boat session",
          "Porters, wheelchair assistance and a senior travel companion",
          "Professional photography",
          "Travel insurance, tips and personal expenses",
        ],
      },
      luxury: {
        highlights: [
          "5-star riverside palace stay, such as BrijRama Palace",
          "Luxury SUV with driver",
          "Private sunrise boat with a live musician",
          "Personal escort and VIP darshan where allowed",
          "A spa session during your stay",
        ],
        hotels:
          "A selected 5-star riverside palace hotel in Varanasi for three nights, such as BrijRama Palace on Darbhanga Ghat, with one spa session at the hotel's spa or a confirmed spa nearby. Subject to availability; the property, room and treatment are named in your quotation.",
        vehicle: LUXURY_VEHICLE("the old-city roads"),
        meals: "Breakfast on all three hotel nights. No other meals are included unless listed in your quotation.",
        boat: "A private boat for the Day 3 sunrise with a live musician and a local scholar guide on board, subject to a confirmed musician; the boat and performer are named in your quotation.",
        darshan: `Personal escort at Kashi Vishwanath and Vishalakshi on Day 2, with your host and dedicated coordination within each temple's rules. ${LUXURY_FAST_TRACK}`,
        assistance: LUXURY_ASSISTANCE,
        guide: "A local scholar guide on the sunrise boat and a specialist guide at Sarnath, with your host throughout.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum, and the temple trust's own fast-track darshan ticket where one is booked for you. Offerings, donations and dakshina remain your own.",
        photography:
          "A professional photography session of about one hour on the Day 3 sunrise boat, only with your consent; the number of edited images and the delivery time are stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive in the programme, including Sarnath. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          luxuryVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at the airport arrivals exit or station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          porters("at arrival and departure"),
          concierge("Varanasi and Sarnath"),
          {
            item: "S10",
            session: "Every sightseeing session",
            scope: "A personal host and escort with you for the aarti, every temple visit, the music evening, the boat, Sarnath and the Day 4 morning.",
            state: "included",
            mandatory: false,
          },
          welcomeLine,
          {
            item: "S07",
            day: 1,
            session: "Evening",
            scope: "An arranged seat for the Dashashwamedh aarti on the ghat, as available that evening.",
            state: "included",
            mandatory: false,
            replacementGroup: "aarti-day1-evening",
          },
          {
            item: "S08",
            day: 2,
            session: "Morning",
            scope: "Dedicated coordination and personal escort at Kashi Vishwanath and Vishalakshi within each temple's rules, with VIP darshan only where the temple's official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E22",
            day: 2,
            session: "Evening",
            scope: "An Evening in Raag: a hosted live Hindustani music session of about ninety minutes with confirmed musicians and venue.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E14",
            day: 3,
            session: "Sunrise",
            scope: "Sur on the Ganges: a private boat for your party at sunrise with a live musician on board, subject to a confirmed performer.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-dawn",
          },
          {
            item: "S12",
            day: 3,
            session: "Sunrise",
            scope: "A local scholar guide on the sunrise boat, on the ghats, their temples and the history of the riverfront.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S24",
            day: 3,
            session: "Sunrise",
            scope: "A professional photographer for about one hour on the sunrise boat, with your consent; edited-image count and delivery time stated in your quotation.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E24",
            day: 3,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide at a leisurely pace: the Dhamek Stupa and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          securityLine,
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Lunches and dinners unless listed in your quotation",
          "Puja, Rudrabhishek, offerings, donations and dakshina",
          "Wheelchair assistance and a senior travel companion, unless booked through SHRAVAN or added",
          "Additional days, sessions or support hours beyond the agreed programme",
          "Travel insurance, tips and personal expenses",
        ],
      },
    },
    related: ["S16", "S17", "E29", "E28", "S27", "S19"],
    faqs: [
      {
        q: "Is this the right journey for our parents?",
        a: "It is the parent itinerary for SHRAVAN Varanasi. Booked through SHRAVAN, it adds a senior travel companion, a review of pacing, meals and mobility before we quote, and family updates with the traveller's permission. Booked on its own, it keeps the same gentle pace without the companion.",
      },
      {
        q: "Can you arrange VIP darshan at Kashi Vishwanath?",
        a: "We do not sell priority access and we do not use touts. Premium includes an escorted visit and Luxury a personal escort, and where the temple trust offers its own VIP or paid darshan, we book it through its system; it needs identity details and can be withdrawn in Shravan and on festival days. An early visit with a host is usually the calmest way in.",
      },
      {
        q: "Can we add a puja that follows our family's tradition?",
        a: "Yes. A Ganga puja at dawn or a Rudrabhishek can be added to any tier. Tell us your tradition, language and any preferences about the priest; the priest, materials and timing are set out in your quotation, and offerings and dakshina stay your own choice.",
      },
      {
        q: "How much walking is involved?",
        a: "Less than most Varanasi journeys. The longest walks are the stroll to the aarti, the last stretch to Kashi Vishwanath and the steps down to the boat and the ghat for yoga. If steps are difficult, tell us before booking so wheelchair or assistant support and suitable boarding points can be planned.",
      },
    ],
    hero: "varanasi-vishwanath",
    gallery: ["varanasi-puja", "varanasi-diya-floating", "elder-portrait"],
    seo: {
      title: "Varanasi at Your Pace: An Unhurried Pilgrimage | Tourmelloh",
      description:
        "A gentle four-day Varanasi pilgrimage with rest every afternoon: the aarti, Kashi Vishwanath and Vishalakshi, a sunrise boat, Sarnath and a wellness morning.",
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    id: "P03",
    slug: "many-moods-of-varanasi",
    status: "published",
    setup: "Priority launch candidate",
    title: "The Many Moods of Varanasi – Heritage, Food & the Ganges",
    route: "Varanasi culture, food, river and Sarnath",
    destinations: ["varanasi", "sarnath"],
    types: ["culture", "heritage"],
    nights: 3,
    days: 4,
    overnights: [{ place: "Varanasi", nights: 3 }],
    suits:
      "Curious travellers, food lovers, couples, friends and families with older children who want to know how the city lives, eats, works and prays, not only what it looks like.",
    style:
      "Private, with guided walks and tastings at its core in every tier. Active mornings and evenings on foot, a rest in the middle of most days, one Varanasi hotel.",
    summary:
      "A suggested four-day Varanasi journey through its evening food lanes, breakfasts, temples and silk weavers, with the river at sunrise, the ghats on foot, Sarnath and Subah-e-Banaras. Guided walks and tastings are in every tier.",
    lead: "Varanasi is many cities at once: a street-food town after dark, a breakfast town of kachori and jalebi, a temple city guarded by Kal Bhairav, a workshop of silk looms in its weaving neighbourhoods and, a short drive away, Sarnath, where the Buddha first taught. This suggested four-day version reads those moods with people who know them. The evening food trail, the Banarasi breakfast walk, the weavers and the ghat walk are in every tier, because they are the journey. Premium adds a curated trail, a private boat and Sarnath with a specialist; Luxury a chef-led trail and a decorated bajra with high tea.",
    gateways: {
      arrival: `${VARANASI_ARRIVAL} Arrive by mid-afternoon on Day 1: the street food trail begins in the early evening.`,
      departure:
        "The same airport or stations on Day 4. Allow about an hour and a half from the old city to the airport, more at busy times.",
      timingWarning:
        "Arriving after about 5 p.m. means the Day 1 food trail moves or shortens. Fog can delay flights and trains on December and January mornings, so a Day 4 departure after midday is safer and keeps the dawn at Assi Ghat. Some long-distance trains stop only at Pt. Deen Dayal Upadhyaya Junction, across the river, which means a longer transfer.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival & Culinary Introduction",
        place: "Varanasi",
        photo: "varanasi-street-food",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "arrival",
            time: "On arrival",
            title: "Met at the airport or station",
            text: "You are met and driven to your hotel, about an hour from the airport.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "Check in and rest",
            text: "A light lunch and a pause before the evening on foot.",
          },
          {
            kind: "experience",
            time: "Evening",
            title: "Banaras After Sunset",
            text: "A guided street food trail through the evening lanes: tamatar chaat, lassi at the Blue Lassi shop, a tobacco-free Banarasi paan to finish and, in the cooler months, malaiyo, the saffron milk froth made at dawn, where a stall still has some. In Standard a food guide leads it; in Premium it is a curated, longer trail ending with a Banarasi sweets tasting; in Luxury it is led by a chef or culinary specialist named in your quotation. Dietary needs are passed on in advance.",
          },
        ],
      },
      {
        day: 2,
        title: "Spiritual Core & Artisans Walk",
        place: "Varanasi",
        photo: "varanasi-vishwanath",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "experience",
            time: "Early morning",
            title: "A Banarasi Morning",
            text: "A food-led breakfast walk of about two and a half hours through the lanes of the old city: kachori with sabzi, jalebi from the pan and lassi in clay cups, with stories from the people who make them. Included in every tier.",
          },
          {
            kind: "visit",
            time: "Late morning",
            title: "Kashi Vishwanath and Kal Bhairav",
            text: `Darshan at Shri Kashi Vishwanath, then Kal Bhairav, the guardian deity of Kashi, whom pilgrims traditionally visit to complete their darshan. In Standard you join the general lines with a plan from your coordinator; in Premium your host accompanies you; in Luxury your host and dedicated coordination. ${KASHI_VISHWANATH_RULES}`,
          },
          {
            kind: "rest",
            time: "Early afternoon",
            title: "Lunch and rest",
            text: "Back at the hotel for a pause.",
          },
          {
            kind: "experience",
            time: "Late afternoon",
            title: "Threads of Banaras",
            text: "A drive to a traditional weaving neighbourhood for a prearranged visit with a weaving family, to watch Banarasi brocade grow on the handloom and talk with the makers about their craft. Included in every tier. Retail expectations are explained beforehand, and buying is entirely your choice.",
          },
          {
            kind: "free",
            time: "Evening",
            title: "Your own evening",
            text: "Free. The evening Ganga aarti at Dashashwamedh is a short drive away if you would like to see it.",
          },
        ],
      },
      {
        day: 3,
        title: "Sunrise Boat Ride & Sarnath Excursion",
        place: "Varanasi and Sarnath",
        photo: "sarnath-dhamek-stupa",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "experience",
            time: "Sunrise",
            title: "Across the famous ghats by boat",
            text: "About an hour on the water as the city comes down to bathe: a shared boat in Standard, a private motorboat in Premium, and in Luxury a private decorated bajra, the traditional wooden boat, with high tea served on board. Boats run only when the river level and local rules allow.",
          },
          {
            kind: "experience",
            time: "Morning",
            title: "Along the Ghats",
            text: "From where the boat lands, a guided walk of about two hours along the riverfront, reading the ghats' palaces, bathing steps and daily life. Included in every tier.",
          },
          {
            kind: "rest",
            time: "Midday",
            title: "Lunch and rest",
            text: "Back at the hotel through the hottest part of the day.",
          },
          {
            kind: "travel",
            time: "Early afternoon",
            title: "To Sarnath",
            text: "About 30 to 45 minutes by road, 10 km north-east of the city.",
          },
          {
            kind: "visit",
            time: "Afternoon",
            title: "The Sarnath heritage complex",
            text: "The Dhamek Stupa, the excavated monasteries and the Archaeological Museum with the Lion Capital of Ashoka: with a specialist guide in Premium and Luxury, with your driver in Standard. The museum is closed on Fridays, so Sarnath moves to another day if Day 3 falls on one.",
          },
        ],
      },
      {
        day: 4,
        title: "Morning Ragas & Departure",
        place: "Varanasi",
        photo: "varanasi-aerial-ghats",
        overnight: "Departure",
        blocks: [
          {
            kind: "experience",
            time: "Dawn",
            title: "Subah-e-Banaras at Assi Ghat",
            text: "The dawn programme at Assi Ghat: the morning aarti, a raga performed as the light comes up, and yoga for anyone who wants to join. It is a public programme, so you are a guest among locals; your host comes with you in Premium and Luxury.",
          },
          {
            kind: "free",
            time: "Morning",
            title: "Souvenirs to take home",
            text: "Time to collect souvenirs, from Banarasi silk and wooden toys to tea and sweets for the journey, at shops your coordinator suggests. Buying is entirely your choice.",
          },
          {
            kind: "departure",
            time: "Midday onwards",
            title: "To your flight or train",
            text: "Checkout and transfer to the airport or station. A late checkout is requested where the hotel can offer one.",
          },
        ],
      },
    ],
    practical: {
      walking:
        "This is the most walking of the Varanasi journeys: the evening food trail on Day 1, two to three hours through lanes on the Day 2 breakfast walk followed by the temple queues, and about two hours on the ghats on Day 3. Expect uneven paving, steep ghat steps, crowds, cattle and motorbikes in narrow lanes. Sarnath is level.",
      earlyStarts:
        "Three early mornings: the Day 2 breakfast walk, the Day 3 sunrise boat, and Subah-e-Banaras at Assi Ghat at dawn on Day 4.",
      boarding:
        "Boats are boarded from ghat steps that can be wet and uneven; life jackets should be worn. When the river runs high, usually July to September, the administration can stop boats and the session is moved or replaced with a walk.",
      mobility:
        "Best for guests who walk comfortably for two to three hours at a time. It is not suited to wheelchair users or anyone who finds crowds and steps difficult; First Impressions of Varanasi or Varanasi at Your Pace may suit better.",
      seasonal:
        "October to March is the best season for walking and eating, and malaiyo is only made in the cooler months, early in the day. April to June is very hot, so walks keep to early mornings and late evenings. Dev Deepawali in November and festival days bring very large crowds to the ghats and temples.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotel in Varanasi",
          "AC sedan with driver",
          "Shared sunrise boat on the Ganga",
          "Guided street food walk",
        ],
        hotels:
          "A selected 3-star hotel in Varanasi for three nights. Subject to availability; the property and room type are named in your quotation.",
        vehicle:
          "Private air-conditioned sedan or suitable equivalent with driver for arrival, departure and the programme's drives, including Sarnath and the weavers. The driver is not a sightseeing guide.",
        meals:
          "Breakfast on all three hotel nights, plus the tastings on the evening food trail and the Banarasi breakfast walk. Other lunches and dinners are not included.",
        boat: "One included boat: a shared, scheduled sunrise boat on Day 3.",
        darshan:
          "Planned visits to Kashi Vishwanath and Kal Bhairav on Day 2 in the general lines, with timing, device rules and the route explained by your coordinator. No accompaniment inside, and no paid darshan ticket unless you ask and it is confirmed.",
        assistance: STANDARD_ASSISTANCE,
        guide:
          "Guides lead the evening food trail, the breakfast walk and the ghat walk, and a host takes you to the weavers; together they define this journey. No guide at the temples or Sarnath unless added.",
        admissions: "Entry tickets for the Sarnath archaeological site and museum. Offerings and camera fees are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Days 1 to 4",
            scope: "Private sedan or suitable equivalent with driver for drops to the walks and temples, the weavers, the dawn drives to the river and the return trip to Sarnath. Not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E09",
            day: 1,
            session: "Evening",
            scope: "Banaras After Sunset: a guided evening street food trail with defined tastings, including chaat, lassi and tobacco-free paan. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "E08",
            day: 2,
            session: "Early morning",
            scope: "A Banarasi Morning: a guided breakfast walk of about two and a half hours with defined tastings. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "E19",
            day: 2,
            session: "Late afternoon",
            scope: "Threads of Banaras: a prearranged visit with a weaving family and their handloom, about ninety minutes, with retail expectations explained in advance.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E12",
            day: 3,
            session: "Sunrise",
            scope: "A seat on a shared, scheduled sunrise boat of about an hour with the boat's guide; boarding point and time confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-dawn",
          },
          {
            item: "E02",
            day: 3,
            session: "Morning",
            scope: "Along the Ghats: a guided riverfront walk of about two hours after the sunrise boat. Core to this journey.",
            state: "included",
            mandatory: true,
          },
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Meals other than breakfast and the listed tastings",
          "A guide at the temples and Sarnath, and the sweets tasting",
          "A private boat",
          "Purchases at the weaving workshop and souvenirs",
          "Arrival welcome inside the terminal and porters",
          "Travel insurance, camera fees, tips and personal expenses",
        ],
      },
      premium: {
        highlights: [
          "4-star boutique hotel in Varanasi",
          "AC Innova with driver",
          "Private motor boat at sunrise",
          "Curated street food trail",
        ],
        hotels:
          "A selected 4-star boutique hotel in Varanasi for three nights. Subject to availability; the property and room type are named in your quotation.",
        vehicle: PREMIUM_VEHICLE("every transfer and drive in the programme"),
        meals:
          "Breakfast on all three hotel nights, plus the tastings on the curated food trail, its sweets tasting and the breakfast walk. Other meals are not included.",
        boat: "The Day 3 sunrise boat becomes a private motorboat for your party; its capacity is confirmed in your quotation.",
        darshan:
          "Accompanied visits to Kashi Vishwanath and Kal Bhairav on Day 2: your host plans the timing, helps with devices and footwear and stays with you as far as each temple's rules allow. No priority access is promised.",
        assistance:
          "Your named coordinator, a welcome on arrival, and a travel host for the Day 2 temples, the Day 3 sunrise boat and Subah-e-Banaras on Day 4.",
        guide:
          "Guides for the curated food trail, the breakfast walk and the ghat walk, a host for the weavers and a specialist guide at Sarnath.",
        admissions: "Entry tickets for the Sarnath archaeological site and museum. Offerings and camera fees are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive in the programme, including Sarnath. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          premiumVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at the airport arrivals exit or station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S10",
            session: "Day 2 morning, Day 3 sunrise and Day 4 dawn",
            scope: "A travel host with you for the temples, the sunrise boat and Subah-e-Banaras. A companion and organiser, not a guide.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E09",
            day: 1,
            session: "Evening",
            scope: "Banaras After Sunset as a curated, longer trail with defined tastings, including chaat, lassi and tobacco-free paan. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "E10",
            day: 1,
            session: "Evening",
            scope: "Banarasi Sweets Tasting at the end of the curated trail, with portions and ingredients set out for dietary needs.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E08",
            day: 2,
            session: "Early morning",
            scope: "A Banarasi Morning: a guided breakfast walk of about two and a half hours with defined tastings. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "S08",
            day: 2,
            session: "Late morning",
            scope: "Accompanied assistance at Kashi Vishwanath and Kal Bhairav: timing plan, cloakroom and device deposit, and company in the queue as far as permitted.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E19",
            day: 2,
            session: "Late afternoon",
            scope: "Threads of Banaras: a prearranged visit with a weaving family and their handloom, about ninety minutes, with retail expectations explained in advance.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 3,
            session: "Sunrise",
            scope: "A private motorboat for your party in place of the shared ride, for about an hour along the ghats.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-dawn",
          },
          {
            item: "E02",
            day: 3,
            session: "Morning",
            scope: "Along the Ghats: a guided riverfront walk of about two hours after the sunrise boat. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "E24",
            day: 3,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Meals other than breakfast and the listed tastings",
          "Purchases at the weaving workshop and souvenirs",
          "Live music, the paan tasting session and any additional boat session",
          "Professional photography and porters",
          "Travel insurance, camera fees, tips and personal expenses",
        ],
      },
      luxury: {
        highlights: [
          "5-star luxury hotel in Varanasi",
          "Private luxury car with driver",
          "Private decorated bajra with high tea",
          "Chef-led premium food trail",
        ],
        hotels:
          "A selected 5-star hotel in Varanasi for three nights, such as Taj Ganges or BrijRama Palace. Subject to availability; the property and room are named in your quotation.",
        vehicle: LUXURY_VEHICLE("the old-city roads"),
        meals:
          "Breakfast on all three hotel nights, plus the tastings on the chef-led food trail, its sweets tasting, the breakfast walk and high tea on the bajra. No other meals unless listed in your quotation.",
        boat: "A private decorated bajra, the traditional wooden boat, for the Day 3 sunrise, with high tea served on board. The vessel is confirmed for your date in your quotation; if no bajra operates, the most suitable private boat is used.",
        darshan:
          "Dedicated coordination and accompaniment at Kashi Vishwanath and Kal Bhairav within each temple's rules. Any paid darshan ticket is requested through the temple trust's own system, where offered.",
        assistance: LUXURY_ASSISTANCE,
        guide:
          "A chef or culinary specialist for the food trail, guides for the breakfast walk and the ghat walk, a host for the weavers and a specialist guide at Sarnath, with your personal host throughout.",
        admissions: "Entry tickets for the Sarnath archaeological site and museum. Offerings and camera fees are not included.",
        photography:
          "A professional photography session of about one hour during the Day 2 breakfast walk, with your consent; the number of edited images and the delivery time are stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "One arrival and one departure transfer between Varanasi airport or railway station and your hotel.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive in the programme, including Sarnath. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          luxuryVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at the airport arrivals exit or station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          porters("at arrival and departure"),
          concierge("Varanasi and Sarnath"),
          {
            item: "S10",
            session: "Every session",
            scope: "A personal host who accompanies you to each walk, tasting, temple and visit and between them, alongside the specialist guides.",
            state: "included",
            mandatory: false,
          },
          welcomeLine,
          {
            item: "E09",
            day: 1,
            session: "Evening",
            scope: "Banaras After Sunset led by a chef or culinary specialist named in your quotation, with defined tastings including chaat, lassi and tobacco-free paan. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "E10",
            day: 1,
            session: "Evening",
            scope: "Banarasi Sweets Tasting at the end of the trail, with portions and ingredients set out for dietary needs.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E08",
            day: 2,
            session: "Early morning",
            scope: "A Banarasi Morning: a guided breakfast walk of about two and a half hours with defined tastings. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "S24",
            day: 2,
            session: "Early morning",
            scope: "A professional photographer for about one hour during the breakfast walk; edited-image count and delivery time stated in your quotation.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S08",
            day: 2,
            session: "Late morning",
            scope: "Dedicated coordination and accompaniment at Kashi Vishwanath and Kal Bhairav within each temple's rules.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E19",
            day: 2,
            session: "Late afternoon",
            scope: "Threads of Banaras: a prearranged visit with a weaving family and their handloom, about ninety minutes, with retail expectations explained in advance.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E16",
            day: 3,
            session: "Sunrise",
            scope: "A private decorated bajra chartered for your party at sunrise, with high tea served on board; the vessel, operator and duration are named in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-dawn",
          },
          {
            item: "E02",
            day: 3,
            session: "Morning",
            scope: "Along the Ghats: a guided riverfront walk of about two hours after the sunrise boat. Core to this journey.",
            state: "included",
            mandatory: true,
          },
          {
            item: "E24",
            day: 3,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          securityLine,
        ],
        excluded: [
          "Flights and trains to and from Varanasi",
          "Meals other than breakfast, high tea and the listed tastings",
          "Purchases at the weaving workshop and souvenirs",
          "Videography and cinematic reels",
          "Additional days, sessions or support hours beyond the agreed programme",
          "Travel insurance, camera fees, tips and personal expenses",
        ],
      },
    },
    related: ["E22", "E11", "E05", "E06", "E20", "E21"],
    faqs: [
      {
        q: "Are the food walks suitable for vegetarians?",
        a: "Yes. Banarasi breakfasts and street food are largely vegetarian already, and the paan is always tobacco-free. Tell us about allergies and Jain or no-onion, no-garlic diets, and we pass them to the guides in advance. Guides favour busy stalls with quick turnover, but kitchen conditions at street stalls are outside our control.",
      },
      {
        q: "Why are the walks included even in Standard?",
        a: "Because they are the journey. The evening food trail, the Banarasi breakfast, the weavers and the ghat walk are what make this a cultural journey rather than a hotel stay with sightseeing, so they stay in every tier. If you would prefer fewer guided sessions, First Impressions of Varanasi may suit you better.",
      },
      {
        q: "Will we be expected to buy silk at the weavers?",
        a: "No. Threads of Banaras is a visit to watch and talk with the makers about their craft. Retail expectations are explained before you go, and buying anything is entirely your choice.",
      },
      {
        q: "Do we see the Ganga aarti?",
        a: "The Day 4 dawn at Assi Ghat includes the morning aarti of Subah-e-Banaras. The grand evening aarti at Dashashwamedh is not built into the programme, but the evening of Day 2 is free and the ghat is a short drive away; an arranged seat or a boat for it can be added.",
      },
      {
        q: "Can we see Sarnath on a Friday?",
        a: "The stupa and the excavated site are open, but the Archaeological Museum, home of the Lion Capital of Ashoka, is closed on Fridays. We place Sarnath on another day once your dates are known.",
      },
    ],
    hero: "varanasi-boats-evening",
    gallery: ["varanasi-silk-weaving", "varanasi-music", "sarnath-monks"],
    seo: {
      title: "The Many Moods of Varanasi: Food, Ghats & Sarnath | Tourmelloh",
      description:
        "Four suggested days in Varanasi: an evening food trail, a Banarasi breakfast walk, Kashi Vishwanath, the silk weavers, a sunrise boat and Sarnath, in three tiers.",
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    id: "P04",
    slug: "varanasi-and-prayagraj-pilgrimage",
    status: "published",
    setup: "Priority launch candidate",
    title: "Varanasi and Prayagraj Pilgrimage",
    route: "Varanasi and Prayagraj",
    destinations: ["varanasi", "prayagraj"],
    types: ["hindu-pilgrimage"],
    nights: 3,
    days: 4,
    durationNote: "Longer assisted version available",
    overnights: [
      { place: "Varanasi", nights: 1 },
      { place: "Prayagraj", nights: 2 },
    ],
    suits:
      "Pilgrims who want Kashi and the Sangam in one short journey and families travelling together. Parents and slower walkers are better served by the longer assisted version.",
    style:
      "Private. One night in Varanasi, two in Prayagraj and one road day of about three hours on the highway. If you leave from Varanasi, the third night can be spent there instead, with a drive back after the Sangam day.",
    summary:
      "A suggested four-day pilgrimage: the evening aarti from a boat and Kashi Vishwanath in Varanasi, then the road to Prayagraj for a holy dip at the Triveni Sangam, Bade Hanuman, Anand Bhawan and Alopi Devi.",
    lead: "Kashi and Prayag are often spoken of together, and about 125 km of highway separates them. This suggested four-day version begins in Varanasi with the evening aarti watched from a boat and an early darshan at Kashi Vishwanath, then takes the road west to Prayagraj. A whole day is given to the Triveni Sangam, where the Ganga meets the Yamuna and tradition holds that the unseen Saraswati joins them, and to Bade Hanuman, Anand Bhawan and Alopi Devi. A longer assisted version spreads the same visits over more days, with more rest.",
    gateways: {
      arrival: `${VARANASI_ARRIVAL} Arriving by early afternoon on Day 1 keeps the evening boat and aarti comfortable.`,
      departure:
        "Prayagraj: Prayagraj Airport at Bamrauli, about 12 km from the city centre, or Prayagraj Junction in the city. Or Varanasi airport and stations, if your third night is in Varanasi or you drive back on Day 4.",
      timingWarning:
        "Prayagraj has fewer flights than Varanasi, so check the schedule before choosing it for departure. If the third night is in Prayagraj and you leave from Varanasi, allow about three hours for the drive back on Day 4. In January and February the Magh Mela changes road access around the Sangam and can add hours to transfers, and winter fog can slow both the highway and flights.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival & Ganga Aarti",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "arrival",
            time: "On arrival",
            title: "Met at the airport or station",
            text: "You are met and driven to your hotel, about an hour from the airport.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "Check in and settle",
            text: "Check in, eat and rest.",
          },
          {
            kind: "experience",
            time: "Early evening",
            title: "An evening boat to the Dashashwamedh aarti",
            text: "A boat along the ghats as the lamps are lit, held off Dashashwamedh so you watch the Ganga aarti from the water. A seat on a shared boat in Standard; a private boat with your host in Premium; the most suitable private boat, such as a covered or seated boat where one operates, in Luxury. If boats are stopped, you watch from the ghat instead.",
          },
          {
            kind: "rest",
            time: "Night",
            title: "Dinner at the hotel",
            text: "An early night before tomorrow's temple morning.",
          },
        ],
      },
      {
        day: 2,
        title: "Kashi Vishwanath & Drive to Prayagraj",
        place: "Varanasi to Prayagraj",
        photo: "varanasi-vishwanath",
        overnight: "Prayagraj",
        blocks: [
          {
            kind: "visit",
            time: "Early morning",
            title: "Shri Kashi Vishwanath",
            text: `Darshan at the temple and a walk through its corridor to the river. In Standard you join the general line with a plan from your coordinator; in Premium your host escorts you, with VIP access where the temple allows; in Luxury your host and dedicated coordination, with fast-track darshan where the temple's arrangements allow. ${KASHI_VISHWANATH_RULES}`,
          },
          {
            kind: "rest",
            time: "Late morning",
            title: "Breakfast, checkout and lunch",
            text: "Back at the hotel to pack, with lunch before the road.",
          },
          {
            kind: "travel",
            time: "After lunch",
            title: "The road to Prayagraj",
            text: "About 125 km, usually three hours with a stop, longer in fog or Mela traffic.",
          },
          {
            kind: "rest",
            time: "Late afternoon and evening",
            title: "Check in and rest",
            text: "Check in at your Prayagraj hotel, with dinner and a quiet evening.",
          },
        ],
      },
      {
        day: 3,
        title: "Triveni Sangam & Sacred Prayagraj",
        place: "Prayagraj",
        photo: "prayagraj-sangam-birds",
        overnight: "Prayagraj, or Varanasi if you leave from there",
        blocks: [
          {
            kind: "experience",
            time: "Early morning",
            title: "A holy dip and boat at the Triveni Sangam",
            text: "From the riverbank below the fort, a boat takes you out to the confluence, where the two rivers' colours can often be seen side by side. There is time for prayers and a holy dip from the moored boat platforms. A seat on a shared boat in Standard; a reserved private boat in Premium; a private premium boat with a ritual priest for the Sangam puja in Luxury. Boats depend on the river and local rules.",
          },
          {
            kind: "visit",
            time: "Morning",
            title: "Bade Hanumanji",
            text: "The temple near the Sangam where Hanuman lies reclining, which the monsoon river can reach and close; busiest on Tuesdays and Saturdays. In Premium and Luxury a local guide joins you for the day.",
          },
          {
            kind: "rest",
            time: "Midday",
            title: "Lunch and rest",
            text: "Back at the hotel through the middle of the day.",
          },
          {
            kind: "visit",
            time: "Afternoon",
            title: "Anand Bhawan and Alopi Devi",
            text: "Anand Bhawan, the Nehru family home and now a museum of the freedom movement, closed on Mondays, then the Alopi Devi temple, a Shakti Peetha where a wooden cradle is worshipped in place of an image. Short, mostly level walks.",
          },
          {
            kind: "free",
            time: "Evening",
            title: "Rest, or back to Varanasi",
            text: "A quiet evening in Prayagraj, or, if you leave from Varanasi, the drive of about three hours back for the night.",
          },
        ],
      },
      {
        day: 4,
        title: "Return & Departure",
        place: "Prayagraj or Varanasi",
        photo: "private-car",
        overnight: "Departure",
        blocks: [
          {
            kind: "rest",
            time: "Morning",
            title: "Breakfast and checkout",
            text: "An unhurried breakfast. A late checkout is requested where the hotel can offer one.",
          },
          {
            kind: "departure",
            time: "As your travel allows",
            title: "Onward from Prayagraj or Varanasi",
            text: "Transfer to Prayagraj Airport or Prayagraj Junction, or to Varanasi airport or station.",
          },
        ],
      },
    ],
    practical: {
      walking:
        "Varanasi means ghat steps and the walk to Kashi Vishwanath, barefoot inside. At the Sangam you step from the bank to the boat over sand or mud, sometimes across planks. The Prayagraj temples and Anand Bhawan are short, mostly level walks.",
      earlyStarts: "Day 2 starts early for Kashi Vishwanath before the drive, and Day 3 starts early for the Sangam.",
      boarding:
        "In Varanasi, the evening boat is boarded from ghat steps. At the Sangam, boarding is from the bank, sometimes across planks or other boats, with the boatman steadying you. Life jackets should be worn. Either river can be closed to boats when the water is high, usually July to September.",
      mobility:
        "One road day of about three hours, with stops, after a morning temple visit. Boarding at the Sangam and the dip are the hardest moments for anyone unsteady on their feet. Parents and slower walkers are better suited to the longer assisted version, with an extra night and assessed support.",
      seasonal:
        "October to March is best, with migratory gulls over the Sangam in winter. The Magh Mela fills the Sangam sands every January and February, with very large crowds on the main bathing days and changed access; it is possible with more planning and more time. April to June is very hot.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotels in Varanasi and Prayagraj",
          "AC sedan with driver",
          "Shared boat ride at the Sangam",
          "Shared evening boat for the Varanasi aarti",
        ],
        hotels:
          "Selected 3-star hotels: one night in Varanasi and two in Prayagraj, or the third night in Varanasi if you leave from there. Subject to availability; named in your quotation.",
        vehicle:
          "Private air-conditioned sedan or suitable equivalent with driver for transfers, local drives and the road journey to Prayagraj, and back to Varanasi if your plan needs it. The driver is not a sightseeing guide.",
        meals: "Breakfast on all three hotel nights. Lunches and dinners are not included.",
        boat: "Two included shared rides: a seat on a shared evening boat for the Varanasi aarti on Day 1 and a seat on a shared boat to the Sangam on Day 3.",
        darshan:
          "Standard darshan at Kashi Vishwanath on Day 2 and planned visits to Bade Hanuman and Alopi Devi on Day 3, with timings, rules and routes explained by your coordinator. No accompaniment inside, and no paid darshan ticket unless you ask and it is confirmed.",
        assistance: STANDARD_ASSISTANCE,
        guide: "No sightseeing guide. A local guide for Prayagraj can be added.",
        admissions: "Entry tickets for Anand Bhawan, which is closed on Mondays. Puja, priest fees, offerings and donations are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Prayagraj or Varanasi airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private sedan or suitable equivalent with driver for the ghat drop, the temple drive, the Varanasi to Prayagraj road journey, the Prayagraj visits and, if your plan needs it, the drive back to Varanasi. Not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E13",
            day: 1,
            session: "Evening",
            scope: "A seat on a shared evening boat of about an hour, held off Dashashwamedh for the aarti; boarding point confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S06",
            day: 3,
            session: "Early morning",
            scope: "A seat on a shared boat from the riverbank to the Sangam and back, with time at the confluence for prayers and a dip.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-sangam",
          },
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners",
          "A host or guide in either city",
          "Private boats and aarti seating",
          "Priests, puja, offerings and donations",
          "Magh Mela camp stays",
          "Travel insurance, tips and personal expenses",
        ],
      },
      premium: {
        highlights: [
          "4-star hotels in Varanasi and Prayagraj",
          "AC Innova Crysta with driver",
          "Private reserved boat at the Sangam",
          "VIP temple access where the temples allow",
        ],
        hotels:
          "Selected 4-star hotels: one night in Varanasi and two in Prayagraj, or the third night in Varanasi if you leave from there. Subject to availability; named in your quotation.",
        vehicle: PREMIUM_VEHICLE("every transfer and drive, including the road to Prayagraj"),
        meals: "Breakfast on all three hotel nights. Lunches and dinners are not included.",
        boat: "Both boats are private: the Varanasi evening boat for the aarti on Day 1 and a reserved private boat to the Sangam on Day 3. Categories and capacity are confirmed in your quotation.",
        darshan: `Escorted visits to Kashi Vishwanath on Day 2 and Bade Hanuman and Alopi Devi on Day 3: timing, devices, footwear and company as far as each temple allows. ${PREMIUM_PRIORITY}`,
        assistance:
          "Your named coordinator, a welcome on arrival, and a travel host for the Day 1 boat and aarti, Kashi Vishwanath on Day 2 and the whole Sangam day.",
        guide: "A local guide in Prayagraj on Day 3 for Bade Hanuman, Anand Bhawan and Alopi Devi.",
        admissions:
          "Entry tickets for Anand Bhawan, which is closed on Mondays, and the temple trust's own priority darshan ticket at Kashi Vishwanath where one is booked for you. Offerings, donations and dakshina remain your own.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Prayagraj or Varanasi airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive, including the Varanasi to Prayagraj road journey and, if your plan needs it, the drive back. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          premiumVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at Varanasi airport arrivals or the station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S10",
            session: "Days 1 to 3",
            scope: "A travel host with you for the evening boat, Kashi Vishwanath and the Sangam day. A companion and organiser, not a guide or carer.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 1,
            session: "Evening",
            scope: "A private boat for your party for the aarti, in place of the shared boat; category and capacity confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S08",
            session: "Day 2 and Day 3 mornings",
            quantity: 2,
            scope: "Escorted visits to Kashi Vishwanath and the Prayagraj temples: timing, cloakroom and company as far as permitted, with VIP access only where each temple's official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 3,
            session: "Early morning",
            scope: "A reserved private boat for your party to the Sangam and back, in place of the shared boat, with unhurried time for prayers and a dip.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-sangam",
          },
          {
            item: "S12",
            day: 3,
            session: "Morning and afternoon",
            scope: "A local guide for Bade Hanuman, Anand Bhawan and Alopi Devi.",
            state: "included",
            mandatory: false,
          },
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners",
          "A priest at the Sangam, puja, dakshina, offerings and donations",
          "Porters and professional photography",
          "Magh Mela camp stays",
          "Travel insurance, tips and personal expenses",
        ],
      },
      luxury: {
        highlights: [
          "5-star in Varanasi, premium hotel in Prayagraj",
          "Luxury SUV with driver",
          "Private premium boat at the Sangam with a pujari",
          "VIP temple access where the temples allow",
          "Personal host for every visit",
        ],
        hotels:
          "A selected 5-star or heritage hotel in Varanasi, such as Taj Ganges or BrijRama Palace, and in Prayagraj the finest premium hotel available, which may be a 4-star. Subject to availability; properties and rooms are named in your quotation.",
        vehicle: LUXURY_VEHICLE("the highway"),
        meals: "Breakfast on all three hotel nights. No other meals are included unless listed in your quotation.",
        boat: "Two private river sessions: the Day 1 aarti from the most suitable private boat in Varanasi, and a private premium boat to the Sangam on Day 3 with a ritual priest on board for the Sangam puja.",
        darshan: `Your personal host and dedicated coordination at Kashi Vishwanath, Bade Hanuman and Alopi Devi within each temple's rules. ${LUXURY_FAST_TRACK}`,
        assistance: LUXURY_ASSISTANCE,
        guide: "A local guide in Prayagraj on Day 3, with your host throughout.",
        admissions:
          "Entry tickets for Anand Bhawan, which is closed on Mondays, and the temple trust's own fast-track darshan ticket where one is booked for you. Offerings, donations and dakshina remain your own.",
        photography:
          "A professional photography session of about one hour on the Day 3 Sangam boat, with your consent and never during bathing; the number of edited images and the delivery time are stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Prayagraj or Varanasi airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive, including the Varanasi to Prayagraj road journey and, if your plan needs it, the drive back. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          luxuryVehicleLine,
          {
            item: "S04",
            session: "Day 1 arrival and Day 4 departure",
            quantity: 2,
            scope: "A welcome on arrival in Varanasi and assistance on departure. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          porters("at arrival, departure and the hotel change"),
          concierge("Varanasi and Prayagraj"),
          {
            item: "S10",
            session: "Every sightseeing session",
            scope: "A personal host with you for every visit, boat and ritual in both cities.",
            state: "included",
            mandatory: false,
          },
          welcomeLine,
          {
            item: "E13",
            day: 1,
            session: "Evening",
            scope: "Evening on the Ganges as a private session on the most suitable boat available, such as a covered, seated boat where one operates, held off Dashashwamedh for the aarti.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S08",
            session: "Day 2 and Day 3 mornings",
            quantity: 2,
            scope: "Dedicated coordination and accompaniment at Kashi Vishwanath and the Prayagraj temples within each temple's rules, with fast-track darshan only where the official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 3,
            session: "Early morning",
            scope: "A private premium boat to the Sangam and back, the best available on the day, with unhurried time for prayers and a dip.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-sangam",
          },
          {
            item: "S19",
            day: 3,
            session: "Early morning",
            scope: "A ritual priest on board for the Sangam puja, arranged in advance with the ritual, language and materials agreed. Dakshina and offerings are your own. Optional.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S12",
            day: 3,
            session: "Morning and afternoon",
            scope: "A local guide for Bade Hanuman, Anand Bhawan and Alopi Devi.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S24",
            day: 3,
            session: "Early morning",
            scope: "A professional photographer for about one hour on the Sangam boat, never during bathing; edited-image count and delivery time stated in your quotation.",
            state: "included",
            mandatory: false,
          },
          securityLine,
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners unless listed in your quotation",
          "Dakshina, offerings and donations",
          "Magh Mela camp stays",
          "Additional days, sessions or support hours beyond the agreed programme",
          "Travel insurance, tips and personal expenses",
        ],
      },
    },
    related: ["E04", "E27", "E25", "S16", "S17", "S29"],
    faqs: [
      {
        q: "What does the longer assisted version change?",
        a: "It adds at least one night, so neither city has a long day and the road journey is never followed by sightseeing. It can include a senior travel companion, wheelchair or assistant support and more rest. Tell us who is travelling and we suggest the length.",
      },
      {
        q: "Can we bathe at the Sangam?",
        a: "Yes. The holy dip is part of the Sangam morning, taken from the moored boat platforms at the confluence, where the boatman chooses the spot. Wear the life jacket, bring a change of clothes and expect very cold water in winter. When the rivers are high, boats and bathing can be restricted.",
      },
      {
        q: "Can we spend the third night in Varanasi?",
        a: "Yes. After the Sangam day you can drive back to Varanasi, about three hours, and sleep there, which suits a Day 4 departure from Varanasi. Guests who prefer one hotel throughout can also stay in Varanasi and visit Prayagraj as a long day trip, though the Sangam and its temples then have to fit into a single day.",
      },
      {
        q: "Is it wise to travel during the Magh Mela?",
        a: "It is possible and, for many pilgrims, the point. Expect very large crowds on the main bathing days, vehicle restrictions near the Sangam and more walking. Tell us your dates early: the programme and its timings change on Mela days.",
      },
    ],
    hero: "prayagraj-sangam-boats",
    gallery: ["varanasi-aerial-ghats", "varanasi-puja", "flower-market"],
    seo: {
      title: "Varanasi and Prayagraj Pilgrimage in Four Days | Tourmelloh",
      description:
        "A suggested four-day pilgrimage from Kashi to the Sangam: the Ganga aarti from a boat, Kashi Vishwanath, a holy dip at the Triveni Sangam and Prayagraj temples.",
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    id: "P05",
    slug: "varanasi-and-ayodhya-pilgrimage",
    status: "published",
    setup: "Priority launch candidate",
    title: "Varanasi and Ayodhya Pilgrimage",
    route: "Varanasi, Sarnath and Ayodhya",
    destinations: ["varanasi", "sarnath", "ayodhya"],
    types: ["hindu-pilgrimage"],
    nights: 4,
    days: 5,
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Ayodhya", nights: 2 },
    ],
    suits:
      "Families and devotees who want Kashi Vishwanath and the Shri Ram Janmabhoomi Mandir in one journey, including travelling parents: this is the parent journey for SHRAVAN Varanasi and Ayodhya.",
    style:
      "Private. Two nights in each town, one road day of about four hours between them with rest after it, and temple visits kept to the early part of the day.",
    summary:
      "A suggested five-day pilgrimage: the aarti from a boat, Kashi Vishwanath and Sarnath in Varanasi, then the Sarayu aarti, the Shri Ram Janmabhoomi Mandir, Hanuman Garhi, Kanak Bhawan and Ram Ki Paidi in Ayodhya.",
    lead: "Two of the great temple towns of Uttar Pradesh lie about 200 km apart by road. This suggested five-day version gives each two nights so that neither is rushed. In Varanasi, the evening aarti watched from a boat, an early darshan at Kashi Vishwanath and an afternoon at Sarnath. In Ayodhya, the Sarayu aarti at Naya Ghat on the evening you arrive, a morning at the Shri Ram Janmabhoomi Mandir, Hanuman Garhi, Kanak Bhawan and Dashrath Mahal, and a last quiet hour at Ram Ki Paidi before you leave.",
    gateways: {
      arrival: `${VARANASI_ARRIVAL} Arriving by early afternoon on Day 1 keeps the evening boat and aarti comfortable.`,
      departure: AYODHYA_DEPARTURE,
      timingWarning:
        "Ayodhya has fewer flights than Varanasi or Lucknow, so check the schedule before you fix Day 5; from Lucknow, allow for the three-hour drive. Fog can delay flights and slow the highway on December and January mornings. The route can also run in reverse, arriving in Ayodhya and leaving from Varanasi, if the flights suit better.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival & Evening Aarti",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "arrival",
            time: "On arrival",
            title: "Met at the airport or station",
            text: "You are met and driven to your hotel, about an hour from the airport.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "Check in and settle",
            text: "Check in, eat and rest.",
          },
          {
            kind: "experience",
            time: "Early evening",
            title: "An evening boat and the Ganga aarti",
            text: "A boat along the ghats as the lamps are lit, held off Dashashwamedh so you watch the aarti from the water. A seat on a shared boat in Standard; a private boat with your host in Premium; the most suitable private boat, such as a covered or seated boat where one operates, in Luxury. If boats are stopped, you watch from the ghat instead.",
          },
        ],
      },
      {
        day: 2,
        title: "Kashi Vishwanath & Sarnath",
        place: "Varanasi and Sarnath",
        photo: "varanasi-vishwanath",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "visit",
            time: "Early morning",
            title: "Shri Kashi Vishwanath",
            text: `Darshan at the temple and a walk through its corridor to the river. In Standard you join the general darshan line; in Premium your host escorts you, with priority access where the temple allows; in Luxury, VIP protocol darshan where the temple trust's official arrangements allow, with your host throughout. ${KASHI_VISHWANATH_RULES}`,
          },
          {
            kind: "rest",
            time: "Late morning",
            title: "Breakfast and rest",
            text: "Back at the hotel until early afternoon.",
          },
          {
            kind: "travel",
            time: "Early afternoon",
            title: "To Sarnath",
            text: "About 30 to 45 minutes by road, 10 km north-east of the city.",
          },
          {
            kind: "visit",
            time: "Afternoon",
            title: "Sarnath",
            text: "The Dhamek Stupa, the excavated monasteries and the Archaeological Museum with the Lion Capital of Ashoka: with a specialist guide in Premium and Luxury, with your driver in Standard. The museum is closed on Fridays, so if Day 2 falls on one, the stupa and site remain open and the museum is left out or moved.",
          },
          {
            kind: "free",
            time: "Evening",
            title: "Your own evening",
            text: "Rest before tomorrow's road day.",
          },
        ],
      },
      {
        day: 3,
        title: "Drive to Ayodhya & Evening Sarayu Aarti",
        place: "Varanasi to Ayodhya",
        photo: "ayodhya-sarayu-evening",
        overnight: "Ayodhya",
        blocks: [
          {
            kind: "rest",
            time: "Early morning",
            title: "Breakfast and checkout",
            text: "An unhurried start.",
          },
          {
            kind: "travel",
            time: "Morning to early afternoon",
            title: "Varanasi to Ayodhya",
            text: "About 200 km by road, usually around four hours with a stop, longer in winter fog.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "Check in and rest",
            text: "Nothing is planned until the evening.",
          },
          {
            kind: "experience",
            time: "Dusk",
            title: "The Sarayu aarti at Naya Ghat",
            text: "The evening aarti on the Sarayu at Naya Ghat, near Ram Ki Paidi. In Premium your host comes with you; in Luxury, a private boat on the Sarayu before the aarti, where boats are operating.",
          },
        ],
      },
      {
        day: 4,
        title: "Shri Ram Janmabhoomi & Ayodhya Temples",
        place: "Ayodhya",
        photo: "ayodhya-ram-mandir",
        overnight: "Ayodhya",
        blocks: [
          {
            kind: "visit",
            time: "Early morning",
            title: "Shri Ram Janmabhoomi Mandir",
            text: `An early darshan, before the day grows busy, with a security check, a queue and a fair distance on foot inside the complex. In Standard you join the general line; in Premium your host escorts you, with priority access where the trust allows; in Luxury, VIP protocol darshan where the temple trust issues passes. ${RAM_MANDIR_RULES}`,
          },
          {
            kind: "visit",
            time: "Morning",
            title: "Hanuman Garhi, Kanak Bhawan and Dashrath Mahal",
            text: "Hanuman Garhi, reached by a steep flight of about 76 steps, then Kanak Bhawan, the temple that tradition says Kaikeyi gave to Sita, and Dashrath Mahal, held to stand where King Dashrath's palace stood. Anyone who prefers not to climb can wait below Hanuman Garhi. A local guide joins you in Premium and Luxury.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "Lunch and a long rest",
            text: "Back at the hotel for the afternoon.",
          },
          {
            kind: "free",
            time: "Evening",
            title: "Your own evening",
            text: "Free, or a second evening by the Sarayu.",
          },
        ],
      },
      {
        day: 5,
        title: "Departure from Ayodhya or Lucknow",
        place: "Ayodhya",
        photo: "private-car",
        overnight: "Departure",
        blocks: [
          {
            kind: "visit",
            time: "Early morning",
            title: "Ram Ki Paidi",
            text: "A quiet hour at Ram Ki Paidi, the chain of ghats on the Sarayu, and the old Nageshwarnath temple beside it. In Luxury, a priest can lead prayers by the river if you wish.",
          },
          {
            kind: "rest",
            time: "Morning",
            title: "Breakfast and checkout",
            text: "A late checkout is requested where the hotel can offer one.",
          },
          {
            kind: "departure",
            time: "Late morning onwards",
            title: "Onward from Ayodhya or Lucknow",
            text: "Transfer to Ayodhya airport or Ayodhya Dham Junction, or the drive of about three hours to Lucknow airport or station.",
          },
        ],
      },
    ],
    practical: {
      walking:
        "Varanasi means ghat steps and the walk to Kashi Vishwanath, barefoot inside; Sarnath is level. At the Ram Janmabhoomi Mandir expect a security line, a queue and a fair distance on foot within the complex. Hanuman Garhi is a steep climb of about 76 steps.",
      earlyStarts:
        "Day 2 starts early for Kashi Vishwanath, Day 4 early for the Ram Janmabhoomi Mandir, and Day 5 with an early hour at Ram Ki Paidi.",
      boarding:
        "The Varanasi evening boat boards from ghat steps that can be wet and uneven; in Luxury, a Sarayu boat boards from the ghats at Ayodhya. Life jackets should be worn. Boats on both rivers can be stopped when the water is high, usually July to September.",
      mobility:
        "One road day of about four hours, with the rest of that day kept light until the evening aarti. Hanuman Garhi's steps and the ghats are the hardest parts, and both can be skipped. For parents, SHRAVAN Varanasi and Ayodhya adds a senior travel companion and an assessment of pace and assistance before we quote.",
      seasonal:
        "October to March is the most comfortable time. Ram Navami in spring and Deepotsav around Diwali bring very large crowds to Ayodhya, with road closures and changed timings; Shravan and Mahashivratri do the same at Kashi Vishwanath. April to June is very hot.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotels in Varanasi and Ayodhya",
          "AC sedan with driver",
          "Shared evening boat for the Ganga aarti",
          "Standard darshan lines",
        ],
        hotels:
          "Selected 3-star hotels: two nights in Varanasi and two in Ayodhya. Subject to availability; named in your quotation.",
        vehicle:
          "Private air-conditioned sedan or suitable equivalent with driver for transfers, local drives, Sarnath, the road journey to Ayodhya and, if you leave from there, the drive to Lucknow. The driver is not a sightseeing guide.",
        meals: "Breakfast on all four hotel nights. Lunches and dinners are not included.",
        boat: "One included boat: a seat on a shared evening boat for the Varanasi aarti on Day 1.",
        darshan:
          "Standard darshan lines at Kashi Vishwanath, the Ram Janmabhoomi Mandir, Hanuman Garhi and Kanak Bhawan, with timings, security rules and routes explained by your coordinator. No accompaniment inside; passes are applied for only where the temple trust issues them and you ask us to.",
        assistance: STANDARD_ASSISTANCE,
        guide: "No sightseeing guide. A specialist guide for Sarnath and a local guide in Ayodhya can be added.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum. Puja, priest fees, offerings and donations are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 5 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Ayodhya airport or Ayodhya Dham Junction, or to Lucknow airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private sedan or suitable equivalent with driver for the ghat drop, the temple drives in both towns, Sarnath and the Varanasi to Ayodhya road journey. Not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E13",
            day: 1,
            session: "Evening",
            scope: "A seat on a shared evening boat of about an hour, held off Dashashwamedh for the aarti; boarding point confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners",
          "A host or guide in either town",
          "Private boats and aarti seating",
          "Priests, puja, offerings and donations",
          "Travel insurance, tips and personal expenses",
        ],
      },
      premium: {
        highlights: [
          "4-star hotels in Varanasi and Ayodhya",
          "AC Innova Crysta with driver",
          "Escorted darshan at Ram Mandir and Kashi Vishwanath",
          "Priority access where the temples allow it",
          "Evening boat for the Ganga aarti",
        ],
        hotels:
          "Selected 4-star hotels: two nights in Varanasi and two in Ayodhya. Subject to availability; named in your quotation.",
        vehicle: PREMIUM_VEHICLE("every transfer and drive, including the road to Ayodhya and any drive to Lucknow"),
        meals: "Breakfast on all four hotel nights. Lunches and dinners are not included.",
        boat: "The Day 1 evening boat for the aarti becomes a private boat for your party; its category and capacity are confirmed in your quotation.",
        darshan:
          "Escorted darshan at Kashi Vishwanath on Day 2 and the Ram Janmabhoomi Mandir on Day 4: timing, security, devices and footwear, and company as far as each temple allows. Priority access is used only where each temple's official arrangements allow it on your date; otherwise you join the general queue with your host.",
        assistance:
          "Your named coordinator, a welcome on arrival, and a travel host for the Day 1 boat, Kashi Vishwanath and Sarnath, the Sarayu aarti and the Ayodhya temple morning.",
        guide: "A specialist guide at Sarnath on Day 2 and a local guide in Ayodhya on Day 4.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum. Offerings, donations and dakshina remain your own.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 5 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Ayodhya airport or Ayodhya Dham Junction, or to Lucknow airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive, including Sarnath and the Varanasi to Ayodhya road journey. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          premiumVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at Varanasi airport arrivals or the station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S10",
            session: "Days 1 to 4",
            scope: "A travel host with you for the evening boat, Kashi Vishwanath, Sarnath, the Sarayu aarti and the Ayodhya temple morning. A companion and organiser, not a guide or carer.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 1,
            session: "Evening",
            scope: "A private boat for your party for the aarti, in place of the shared boat; category and capacity confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S08",
            session: "Day 2 and Day 4 mornings",
            quantity: 2,
            scope: "Escorted darshan at Kashi Vishwanath and the Ram Janmabhoomi Mandir: timing plan, security and cloakroom, and company in the queue as far as permitted, with priority access only where each temple's official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E24",
            day: 2,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S12",
            day: 4,
            session: "Morning",
            scope: "A local guide in Ayodhya for Hanuman Garhi, Kanak Bhawan and Dashrath Mahal; allow about two hours.",
            state: "included",
            mandatory: false,
          },
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners",
          "A Sarayu boat or any additional boat session",
          "Priests, puja, dakshina, offerings and donations",
          "Porters and professional photography",
          "Travel insurance, tips and personal expenses",
        ],
      },
      luxury: {
        highlights: [
          "5-star hotels and premier Ayodhya stays",
          "Luxury SUV with driver",
          "VIP protocol darshan where the temple trusts allow it",
          "Personal host at every temple and visit",
          "Evening boat for the Ganga aarti",
        ],
        hotels:
          "A selected 5-star or heritage hotel in Varanasi, such as Taj Ganges or BrijRama Palace, and a premier stay in Ayodhya, the finest available, which may be a 4-star. Subject to availability; properties and rooms are named in your quotation.",
        vehicle: LUXURY_VEHICLE("the highway"),
        meals: "Breakfast on all four hotel nights. No other meals are included unless listed in your quotation.",
        boat: "Two private river sessions: the Day 1 aarti from the most suitable private boat in Varanasi, and a private boat on the Sarayu before the Day 3 aarti, where boats are operating.",
        darshan:
          "VIP protocol darshan at Kashi Vishwanath and the Shri Ram Janmabhoomi Mandir where each temple trust's official arrangements allow it, applied for only through the trust's own system; otherwise your host stays with you in the general queue. Dedicated coordination at every temple within its rules.",
        assistance: LUXURY_ASSISTANCE,
        guide: "A specialist guide at Sarnath and a local guide in Ayodhya, with your host throughout.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum. Offerings, donations and dakshina remain your own.",
        photography:
          "A professional photography session of about one hour on the Day 1 evening boat and the ghats, with your consent; the number of edited images and the delivery time are stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 5 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Ayodhya airport, Ayodhya Dham Junction, or Lucknow airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive, including Sarnath and the Varanasi to Ayodhya road journey. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          luxuryVehicleLine,
          {
            item: "S04",
            session: "Day 1 arrival and Day 5 departure",
            quantity: 2,
            scope: "A welcome on arrival in Varanasi and assistance on departure. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          porters("at arrival, departure and the hotel change"),
          concierge("Varanasi and Ayodhya"),
          {
            item: "S10",
            session: "Every sightseeing session",
            scope: "A personal host with you for every visit, boat and ritual in both towns.",
            state: "included",
            mandatory: false,
          },
          welcomeLine,
          {
            item: "E13",
            day: 1,
            session: "Evening",
            scope: "Evening on the Ganges as a private session on the most suitable boat available, such as a covered, seated boat where one operates, held off Dashashwamedh for the aarti.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S24",
            day: 1,
            session: "Evening",
            scope: "A professional photographer for about one hour on the evening boat and the ghats; edited-image count and delivery time stated in your quotation.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S08",
            session: "Day 2 and Day 4 mornings",
            quantity: 2,
            scope: "Dedicated coordination at Kashi Vishwanath and the Ram Janmabhoomi Mandir, with VIP protocol darshan only where each temple trust's official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E24",
            day: 2,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 3,
            session: "Dusk",
            scope: "A private boat on the Sarayu before the evening aarti, about forty-five minutes, where boats are operating and if energy allows after the drive.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-sarayu",
          },
          {
            item: "S12",
            day: 4,
            session: "Morning",
            scope: "A local guide in Ayodhya for Hanuman Garhi, Kanak Bhawan and Dashrath Mahal; allow about two hours.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S19",
            day: 5,
            session: "Early morning",
            scope: "A priest for prayers by the Sarayu at Ram Ki Paidi, with the ritual, language and materials agreed in advance. Dakshina and offerings are your own. Optional.",
            state: "included",
            mandatory: false,
          },
          securityLine,
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners unless listed in your quotation",
          "Dakshina, offerings and donations",
          "Additional days, sessions or support hours beyond the agreed programme",
          "Travel insurance, tips and personal expenses",
        ],
      },
    },
    related: ["S16", "S17", "E04", "S13", "S27", "S29"],
    faqs: [
      {
        q: "Can we do this journey the other way round?",
        a: "Yes. Arriving in Ayodhya and leaving from Varanasi works equally well, and the choice usually follows the flights. The visits stay the same; only the order changes.",
      },
      {
        q: "Is there VIP darshan at the Ram Janmabhoomi Mandir?",
        a: "We do not sell priority access. Where the temple trust issues passes for darshan or aarti, we apply on your behalf, subject to its rules and availability: that is what Premium's priority access and Luxury's VIP protocol darshan mean. Otherwise an early visit with a host is usually the calmest approach.",
      },
      {
        q: "How long is the drive between Varanasi and Ayodhya?",
        a: "About 200 km, usually around four hours with a stop, and longer in winter fog. Nothing demanding follows it: you rest at the hotel until the Sarayu aarti that evening.",
      },
      {
        q: "Can our parents manage this journey?",
        a: "Many do, at this pace. The hardest parts are the ghat steps, the walk to Kashi Vishwanath and the climb to Hanuman Garhi, and each can be adapted or skipped. For fuller support, SHRAVAN Varanasi and Ayodhya adds a senior travel companion and an assessment before we quote.",
      },
    ],
    hero: "ayodhya-ram-ki-paidi",
    gallery: ["varanasi-aerial-ghats", "varanasi-diya-floating", "flower-market"],
    seo: {
      title: "Varanasi and Ayodhya Pilgrimage in Five Days | Tourmelloh",
      description:
        "A suggested five-day pilgrimage: the Ganga aarti, Kashi Vishwanath and Sarnath in Varanasi, then the Sarayu aarti and the Ram Janmabhoomi Mandir in Ayodhya.",
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    id: "P06",
    slug: "the-sacred-confluence",
    status: "published",
    setup: "Priority launch candidate",
    title: "The Sacred Confluence – Varanasi, Prayagraj & Ayodhya",
    route: "Varanasi with Sarnath, Prayagraj and Ayodhya",
    destinations: ["varanasi", "sarnath", "prayagraj", "ayodhya"],
    types: ["hindu-pilgrimage"],
    nights: 5,
    days: 6,
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Prayagraj", nights: 1 },
      { place: "Ayodhya", nights: 2 },
    ],
    suits:
      "Families across generations, devotees and first-time pilgrims who want Kashi, the Sangam and Ayodhya in one journey. It is also the parent itinerary for the women's, SHRAVAN and Together versions of The Sacred Confluence.",
    style:
      "Private. Three bases and two road days of about three and four hours. Temple visits are kept to the early hours wherever the day allows, with rest in the middle of the day.",
    summary:
      "A suggested six-day pilgrimage through three sacred towns: Kashi Vishwanath, Annapurna, the Ganga and Sarnath at Varanasi, a holy dip at the Sangam in Prayagraj, and the Sarayu and the Shri Ram Janmabhoomi Mandir at Ayodhya.",
    lead: "The Sacred Confluence is the name of a journey, not a place: the three towns do not share one confluence, but between them they hold three of the rivers most revered in Hindu tradition. The Ganga at Kashi, the meeting of the Ganga and the Yamuna at Prayag, and the Sarayu at Ayodhya. This suggested six-day version gives each its own time: the aarti from a boat, Kashi Vishwanath, Annapurna and Sarnath in Varanasi; a holy dip at the Sangam with Bade Hanuman and Alopi Devi; and the Sarayu aarti and a full day among Ayodhya's temples, ending at Guptar Ghat.",
    gateways: {
      arrival: `${VARANASI_ARRIVAL} Arriving by early afternoon on Day 1 keeps the evening boat and aarti comfortable.`,
      departure: `${AYODHYA_DEPARTURE} Varanasi, about four hours by road, is also possible for a later flight or train.`,
      timingWarning:
        "Ayodhya has fewer flights than Varanasi or Lucknow, so check schedules before fixing Day 6; the order can reverse to suit your gateways. In January and February the Magh Mela at Prayagraj and winter fog can each add hours to the road days and delay flights.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Varanasi",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "arrival",
            time: "On arrival",
            title: "Airport pick-up",
            text: "You are met and driven to your hotel, about an hour from the airport.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "Check in and settle",
            text: "Check in, eat and rest.",
          },
          {
            kind: "experience",
            time: "Early evening",
            title: "The Ganga aarti by boat",
            text: "A boat along the ghats as the lamps are lit, held off Dashashwamedh so you watch the aarti from the water. A seat on a shared boat in Standard; a private boat with your host in Premium; the most suitable private boat, such as a covered or seated boat where one operates, in Luxury. If boats are stopped, you watch from the ghat instead.",
          },
        ],
      },
      {
        day: 2,
        title: "Varanasi Temples & Sarnath",
        place: "Varanasi and Sarnath",
        photo: "varanasi-vishwanath",
        overnight: "Varanasi",
        blocks: [
          {
            kind: "visit",
            time: "Early morning",
            title: "Kashi Vishwanath and Annapurna",
            text: `Darshan at Shri Kashi Vishwanath, then at the Annapurna temple beside it, where the goddess of nourishment is worshipped. In Standard you join the general lines; in Premium your host escorts you, with VIP passes where the temple allows; in Luxury your tour manager, with VIP access where the temple trust's arrangements allow. ${KASHI_VISHWANATH_RULES}`,
          },
          {
            kind: "rest",
            time: "Late morning",
            title: "Breakfast and rest",
            text: "Back at the hotel until early afternoon.",
          },
          {
            kind: "visit",
            time: "Afternoon",
            title: "Sarnath",
            text: "About 30 to 45 minutes by road: the Dhamek Stupa, the excavated monasteries and the Archaeological Museum with the Lion Capital of Ashoka, with a specialist guide in Premium and Luxury and with your driver in Standard. The museum is closed on Fridays.",
          },
          {
            kind: "experience",
            time: "Evening",
            title: "A private Ganga puja, or a free evening",
            text: "Luxury includes a private Ganga puja at a ghat with a priest, which you may join or decline. In other tiers the evening is free, and the puja can be added.",
          },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Prayagraj Transfer",
        place: "Varanasi to Prayagraj",
        photo: "prayagraj-sangam-boats",
        overnight: "Prayagraj",
        blocks: [
          {
            kind: "travel",
            time: "Early morning",
            title: "The road to Prayagraj",
            text: "After an early breakfast, about 125 km by road, usually three hours with a stop, longer in fog or Mela traffic.",
          },
          {
            kind: "experience",
            time: "Late morning",
            title: "Snan and a boat at the Triveni Sangam",
            text: "From the riverbank below the fort, a boat takes you out to the confluence of the Ganga and the Yamuna, where tradition places the unseen Saraswati too, for a holy dip from the moored boat platforms and time for prayers. A seat on a shared boat in Standard; a private boat in Premium; the most suitable private boat with a priest for a private ritual in Luxury. Boats depend on the river and local rules.",
          },
          {
            kind: "rest",
            time: "Early afternoon",
            title: "Check in, lunch and rest",
            text: "A pause at your Prayagraj hotel.",
          },
          {
            kind: "visit",
            time: "Late afternoon",
            title: "Bade Hanuman and Alopi Devi",
            text: "The temple near the Sangam where Hanuman lies reclining, which the monsoon river can reach and close, and the Alopi Devi temple, a Shakti Peetha where a wooden cradle is worshipped in place of an image. A local guide joins you in Premium and Luxury.",
          },
        ],
      },
      {
        day: 4,
        title: "Prayagraj to Ayodhya Transfer",
        place: "Prayagraj to Ayodhya",
        photo: "ayodhya-sarayu-evening",
        overnight: "Ayodhya",
        blocks: [
          {
            kind: "travel",
            time: "Morning to early afternoon",
            title: "Prayagraj to Ayodhya",
            text: "After breakfast and checkout, about 165 km by road, usually around four hours with a lunch stop.",
          },
          {
            kind: "rest",
            time: "Afternoon",
            title: "Check in and rest",
            text: "Nothing is planned until the evening.",
          },
          {
            kind: "experience",
            time: "Dusk",
            title: "The Sarayu aarti",
            text: "The evening aarti on the Sarayu near Ram Ki Paidi, a short drive from the hotel, with your host in Premium and your tour manager in Luxury.",
          },
        ],
      },
      {
        day: 5,
        title: "Ayodhya Full Day Temple Tour",
        place: "Ayodhya",
        photo: "ayodhya-ram-mandir",
        overnight: "Ayodhya",
        blocks: [
          {
            kind: "visit",
            time: "Early morning",
            title: "Shri Ram Janmabhoomi Mandir",
            text: `An early darshan, with a security check, a queue and a fair distance on foot inside the complex. In Standard you join the general line; in Premium your host escorts you, with VIP passes where the trust issues them; in Luxury, VIP access where the trust's official arrangements allow. ${RAM_MANDIR_RULES}`,
          },
          {
            kind: "visit",
            time: "Morning",
            title: "Hanuman Garhi and Kanak Bhawan",
            text: "Hanuman Garhi, reached by a steep flight of about 76 steps, then Kanak Bhawan, the temple that tradition says Kaikeyi gave to Sita. Anyone who prefers not to climb can wait below. A local guide joins you in Premium and Luxury.",
          },
          {
            kind: "rest",
            time: "Midday",
            title: "Lunch and a long rest",
            text: "Back at the hotel until late afternoon.",
          },
          {
            kind: "visit",
            time: "Late afternoon",
            title: "Guptar Ghat",
            text: "A quieter hour on the Sarayu at Guptar Ghat, a short drive west of the town, where tradition says Rama entered the river at the end of his reign. In Luxury, a private boat on the river here at dusk, where boats are operating.",
          },
        ],
      },
      {
        day: 6,
        title: "Departure",
        place: "Ayodhya",
        photo: "private-car",
        overnight: "Departure",
        blocks: [
          {
            kind: "rest",
            time: "Morning",
            title: "Breakfast and checkout",
            text: "A late checkout is requested where the hotel can offer one.",
          },
          {
            kind: "departure",
            time: "As your travel allows",
            title: "Onward from Ayodhya, Lucknow or Varanasi",
            text: "Transfer to Ayodhya airport or Ayodhya Dham Junction, or the drive of about three hours to Lucknow, or about four hours to Varanasi, for your onward flight or train.",
          },
        ],
      },
    ],
    practical: {
      walking:
        "Varanasi means ghat steps and the walk to Kashi Vishwanath and Annapurna, barefoot inside; Sarnath is level. At the Sangam you step from the bank to the boat over sand or mud. At the Ram Janmabhoomi Mandir expect a security line and a fair distance on foot; Hanuman Garhi is a steep climb of about 76 steps.",
      earlyStarts:
        "Days 2, 3 and 5 start early: Kashi Vishwanath, the road to Prayagraj ahead of the Sangam, and the Ram Janmabhoomi Mandir.",
      boarding:
        "Varanasi boats board from ghat steps; at the Sangam, boarding is from the bank, sometimes across planks or other boats; Sarayu boats in Luxury board from the ghats. Life jackets should be worn. All three rivers can be closed to boats when the water is high, usually July to September.",
      mobility:
        "Two road days, of about three and four hours. Day 3 is the fullest, with the Sangam and two temples after the drive, and the Ayodhya road day ends with rest until the evening aarti. Boarding at the Sangam and the steps at Hanuman Garhi are the hardest moments. SHRAVAN Sacred Confluence adds a senior travel companion and an assessment of pace and assistance; a longer version can also be planned.",
      seasonal:
        "October to March is most comfortable, with gulls over the Sangam in winter. The Magh Mela fills Prayagraj in January and February; Ram Navami and Deepotsav fill Ayodhya; Shravan and Mahashivratri fill Kashi Vishwanath. All are possible with more planning. April to June is very hot.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotels in all three cities",
          "AC sedan with driver",
          "Shared boats at Varanasi and the Sangam",
          "Standard darshan lines",
        ],
        hotels:
          "Selected 3-star hotels: two nights in Varanasi, one in Prayagraj and two in Ayodhya. Subject to availability; named in your quotation.",
        vehicle:
          "Private air-conditioned sedan or suitable equivalent with driver for transfers, local drives, Sarnath and both road journeys. The driver is not a sightseeing guide.",
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "Two included shared rides: a seat on a shared evening boat for the Varanasi aarti on Day 1 and a seat on a shared boat to the Sangam on Day 3.",
        darshan:
          "Standard darshan lines at Kashi Vishwanath, Annapurna, Bade Hanuman, Alopi Devi, the Ram Janmabhoomi Mandir, Hanuman Garhi and Kanak Bhawan, with timings, security rules and routes explained by your coordinator. No accompaniment inside; passes are applied for only where a temple trust issues them and you ask us to.",
        assistance: STANDARD_ASSISTANCE,
        guide: "No sightseeing guide. A specialist guide for Sarnath and local guides in Prayagraj and Ayodhya can be added.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum. Puja, priest fees, offerings and donations are not included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 6 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Ayodhya airport or Ayodhya Dham Junction, or to Lucknow or Varanasi airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private sedan or suitable equivalent with driver for local drives in all three towns, Sarnath and the road journeys to Prayagraj and Ayodhya. Not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E13",
            day: 1,
            session: "Evening",
            scope: "A seat on a shared evening boat of about an hour, held off Dashashwamedh for the aarti; boarding point confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S06",
            day: 3,
            session: "Late morning",
            scope: "A seat on a shared boat from the riverbank to the Sangam and back, with time at the confluence for prayers and a dip.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-sangam",
          },
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners",
          "A host or guide in any town",
          "Private boats and aarti seating",
          "Priests, puja, offerings and donations",
          "Magh Mela camp stays",
          "Travel insurance, tips and personal expenses",
        ],
      },
      premium: {
        highlights: [
          "4-star hotels in all three cities",
          "AC Innova Crysta with driver",
          "Private boats at Varanasi and the Sangam",
          "Escorted darshan, VIP passes where allowed",
        ],
        hotels:
          "Selected 4-star hotels: two nights in Varanasi, one in Prayagraj and two in Ayodhya. Subject to availability; named in your quotation.",
        vehicle: PREMIUM_VEHICLE("every transfer and drive, including both road journeys"),
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "Both boats are private: the Day 1 evening boat for the aarti and the boat to the Sangam on Day 3. Categories and capacity are confirmed in your quotation.",
        darshan:
          "Escorted darshan with your host at Kashi Vishwanath and Annapurna on Day 2 and the Ram Janmabhoomi Mandir on Day 5: timing, security, devices and footwear, and company as far as each temple allows. VIP passes are used only where each temple trust's official arrangements allow them on your date; otherwise you join the general queue with your host.",
        assistance:
          "Your named coordinator, a welcome on arrival, and a travel host for the Day 1 boat, the Day 2 temples and Sarnath, the Sangam day, the Sarayu aarti and the Ayodhya temple day.",
        guide: "A specialist guide at Sarnath on Day 2 and local guides in Prayagraj on Day 3 and in Ayodhya on Day 5.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum, and any VIP darshan pass or ticket a temple trust issues for you. Offerings, donations and dakshina remain your own.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 6 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Ayodhya airport or Ayodhya Dham Junction, or to Lucknow or Varanasi airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive, including Sarnath and both road journeys. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          premiumVehicleLine,
          {
            item: "S04",
            day: 1,
            session: "Arrival",
            scope: "A welcome at Varanasi airport arrivals or the station platform and help to the car. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S10",
            session: "Days 1 to 5",
            scope: "A travel host with you for the evening boat, the Varanasi temples and Sarnath, the Sangam day, the Sarayu aarti and the Ayodhya temple day. A companion and organiser, not a guide or carer.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 1,
            session: "Evening",
            scope: "A private boat for your party for the aarti, in place of the shared boat; category and capacity confirmed in your quotation.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S08",
            session: "Day 2 and Day 5 mornings",
            quantity: 2,
            scope: "Escorted darshan at Kashi Vishwanath and Annapurna, and at the Ram Janmabhoomi Mandir: timing plan, security and cloakroom, and company in the queue as far as permitted, with VIP passes only where the temple trusts' official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E24",
            day: 2,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 3,
            session: "Late morning",
            scope: "A private boat for your party to the Sangam and back, in place of the shared boat, with unhurried time for prayers and a dip.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-sangam",
          },
          {
            item: "S12",
            session: "Day 3 afternoon and Day 5 morning",
            quantity: 2,
            scope: "Local guides for Bade Hanuman and Alopi Devi in Prayagraj and for Hanuman Garhi and Kanak Bhawan in Ayodhya, about two hours each.",
            state: "included",
            mandatory: false,
          },
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners",
          "Priests and private rituals, dakshina, offerings and donations",
          "A Sarayu boat or any additional boat session",
          "Porters and professional photography",
          "Magh Mela camp stays",
          "Travel insurance, tips and personal expenses",
        ],
      },
      luxury: {
        highlights: [
          "5-star and top heritage stays, where available",
          "Luxury chauffeured car such as a Fortuner or Mercedes",
          "Dedicated tour manager for the whole journey",
          "VIP access where allowed, and private rituals",
          "Private boats at Varanasi and the Sangam",
        ],
        hotels:
          "Selected 5-star and top heritage properties: in Varanasi such as Taj Ganges or BrijRama Palace, and in Prayagraj and Ayodhya the finest available, which may be a 4-star. Subject to availability; properties and rooms are named in your quotation.",
        vehicle: LUXURY_VEHICLE("the highways"),
        meals: "Breakfast on all five hotel nights. No other meals are included unless listed in your quotation.",
        boat: "Three private river sessions: the Day 1 aarti from the most suitable private boat, the most suitable private boat to the Sangam on Day 3, and a private boat on the Sarayu at Guptar Ghat on Day 5, where boats are operating.",
        darshan:
          "Your tour manager and dedicated coordination at every temple within its rules. VIP access at Kashi Vishwanath and the Ram Janmabhoomi Mandir is requested only through each temple trust's own system, where its official arrangements allow it on your date; otherwise your tour manager stays with you in the general queue.",
        assistance:
          "A dedicated tour manager who travels with you through all three towns, with support hours agreed in your quotation, coordinating every arrangement and with you at every sightseeing session.",
        guide: "A specialist guide at Sarnath and local guides in Prayagraj and Ayodhya, with your tour manager throughout.",
        admissions:
          "Entry tickets for the Sarnath archaeological site and museum, and any VIP darshan pass or ticket a temple trust issues for you. Offerings, donations and dakshina remain your own.",
        photography:
          "A professional photography session of about one hour on the Day 1 evening boat and the ghats, with your consent; the number of edited images and the delivery time are stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          {
            item: "S01",
            session: "Day 1 arrival and Day 6 departure",
            quantity: 2,
            scope: "Arrival transfer from Varanasi airport or station, and departure transfer to Ayodhya airport, Ayodhya Dham Junction, or Lucknow or Varanasi airport or station.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S02",
            session: "Whole journey",
            scope: "Private chauffeured transport for every drive, including Sarnath and both road journeys. The driver is not a sightseeing guide.",
            state: "included",
            mandatory: false,
          },
          luxuryVehicleLine,
          {
            item: "S04",
            session: "Day 1 arrival and Day 6 departure",
            quantity: 2,
            scope: "A welcome on arrival in Varanasi and assistance on departure. No access to restricted airport areas is implied.",
            state: "included",
            mandatory: false,
          },
          porters("at arrival, departure and both hotel changes"),
          {
            item: "S09",
            session: "Whole journey",
            scope: "A dedicated tour manager who travels with you through Varanasi, Prayagraj and Ayodhya, at support hours agreed in your quotation, coordinating every arrangement. Not a round-the-clock service unless your quotation says so.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S10",
            session: "Every sightseeing session",
            scope: "Your tour manager, or a personal host, with you for every visit, boat and ritual in all three towns.",
            state: "included",
            mandatory: false,
          },
          welcomeLine,
          {
            item: "E13",
            day: 1,
            session: "Evening",
            scope: "Evening on the Ganges as a private session on the most suitable boat available, such as a covered, seated boat where one operates, held off Dashashwamedh for the aarti.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day1-evening",
          },
          {
            item: "S24",
            day: 1,
            session: "Evening",
            scope: "A professional photographer for about one hour on the evening boat and the ghats; edited-image count and delivery time stated in your quotation.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S08",
            session: "Day 2, Day 3 and Day 5",
            quantity: 3,
            scope: "Dedicated coordination at Kashi Vishwanath and Annapurna, Bade Hanuman and Alopi Devi, and the Ayodhya temples within each temple's rules, with VIP access only where the official arrangements allow.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E24",
            day: 2,
            session: "Afternoon",
            scope: "Sarnath with a specialist guide: the Dhamek Stupa, the excavated monasteries and the museum, which is closed on Fridays.",
            state: "included",
            mandatory: false,
          },
          {
            item: "E29",
            day: 2,
            session: "Evening",
            scope: "A private Ganga Puja Experience at a Varanasi ghat with a priest, materials and a lamp floated on the river, about an hour. Optional: you may decline it.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 3,
            session: "Late morning",
            scope: "The most suitable private boat to the Sangam and back, with unhurried time for prayers and a dip.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day3-sangam",
          },
          {
            item: "S19",
            day: 3,
            session: "Late morning",
            scope: "A priest for a private ritual on the water at the Sangam, arranged in advance with the ritual, language and materials agreed. Dakshina and offerings are your own. Optional.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S12",
            session: "Day 3 afternoon and Day 5 morning",
            quantity: 2,
            scope: "Local guides for Bade Hanuman and Alopi Devi in Prayagraj and for Hanuman Garhi and Kanak Bhawan in Ayodhya, about two hours each.",
            state: "included",
            mandatory: false,
          },
          {
            item: "S06",
            day: 5,
            session: "Dusk",
            scope: "A private boat on the Sarayu at Guptar Ghat, about forty-five minutes, where boats are operating.",
            state: "included",
            mandatory: false,
            replacementGroup: "boat-day5-sarayu",
          },
          securityLine,
        ],
        excluded: [
          "Flights and trains to and from the journey",
          "Lunches and dinners unless listed in your quotation",
          "Dakshina, offerings and donations",
          "Magh Mela camp stays",
          "Additional days, sessions or support hours beyond the agreed programme",
          "Travel insurance, tips and personal expenses",
        ],
      },
    },
    related: ["S11", "S16", "S17", "E04", "E25", "S29"],
    faqs: [
      {
        q: "Why is it called The Sacred Confluence when the towns are far apart?",
        a: "The name is thematic. Only Prayagraj stands at a confluence, the Triveni Sangam. The journey joins three sacred rivers and the towns on their banks: the Ganga at Varanasi, the Sangam at Prayagraj and the Sarayu at Ayodhya.",
      },
      {
        q: "Can the journey start in Ayodhya instead?",
        a: "Yes. The order follows your arrival and departure gateways, and Ayodhya to Varanasi by way of Prayagraj works the same way. We confirm the order once your flights or trains are known.",
      },
      {
        q: "Is there a women-only or family version?",
        a: "Yes. Her Own Way: The Sacred Confluence is a hosted women-only group departure with a female accompanying host, run on fixed dates once they are approved and announced. Together and SHRAVAN versions adapt this itinerary for families and for parents. Each is quoted on its own terms.",
      },
      {
        q: "How tiring are the road days?",
        a: "Varanasi to Prayagraj is about three hours and Prayagraj to Ayodhya about four, both with stops. Day 3 is the fuller of the two, with the Sangam and two temples after the drive and a rest at the hotel between them; Day 4 ends with rest until the evening Sarayu aarti.",
      },
    ],
    hero: "prayagraj-sangam-birds",
    gallery: ["varanasi-aerial-ghats", "varanasi-diya-floating", "ayodhya-ram-ki-paidi"],
    seo: {
      title: "Varanasi, Prayagraj and Ayodhya in Six Days | Tourmelloh",
      description:
        "A six-day pilgrimage on three sacred rivers: the Ganga and Sarnath at Varanasi, a holy dip at the Sangam in Prayagraj, and the Sarayu and Ram Mandir at Ayodhya.",
    },
  },
];
