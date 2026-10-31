import type { InclusionLine, Journey } from "../types";

/*
 * P07-P13 from the client brief v5 (31 Oct 2026), section 3.
 * P12 is published. P07-P11 and P13 are drafts: complete proposed records for the team to validate
 * (route, gateways, suppliers) before publication. Drafts never render, link or index.
 * Gateway facts checked October 2026: Kushinagar airport has had no regular scheduled flights since
 * November 2023; Shravasti airport has had little or no scheduled service; Chitrakoot airport's passenger
 * flights have been suspended since December 2024. Re-check before publishing any of these records.
 */

/* Tier wording shared across these journeys, from the brief's tier table (section 5). */
const VEHICLE = {
  standard:
    "Private air-conditioned sedan or suitable equivalent with a driver, sized to your party and luggage. The driver is not a sightseeing guide.",
  premium: "Upgraded MPV/SUV, such as an Innova Crysta or equivalent, with a driver.",
  luxury:
    "A specifically confirmed premium vehicle, such as a Fortuner, Mercedes or suitable alternative, selected to suit your party and this route. The actual vehicle is confirmed in your quotation.",
};
const ASSIST_STANDARD =
  "A named remote coordinator, by phone and WhatsApp, before and during the journey. No accompanying host.";
const ASSIST_LUXURY =
  "A dedicated travel concierge for the whole journey, a personal host for the listed days and support hours agreed in your quotation. This is not unlimited round-the-clock cover.";
const PHOTO_OPTIONAL = "Optional. A professional photography session can be added.";
const SECURITY_ON_REQUEST = "On request, quoted separately.";
const SECURITY_LUXURY =
  "Included when requested, applicable and expressly accepted in your final quotation. It never means queue-clearing or special access.";

/* Inclusion lines that recur with the same scope. */
const transfers = (from: string, to: string): InclusionLine => ({
  item: "S01",
  session: "Day 1 arrival and final-day departure",
  quantity: 2,
  scope: `Arrival transfer from ${from}, and drop at ${to} on the last day`,
  state: "included",
  mandatory: false,
});
const arrivalWelcome = (place: string): InclusionLine => ({
  item: "S04",
  day: 1,
  session: "Arrival",
  scope: `A member of the team welcomes you at ${place} and sees you to the hotel. No restricted-area or baggage-hall access is implied`,
  state: "included",
  mandatory: false,
});
const welcomeAmenities: InclusionLine = {
  item: "S31",
  day: 1,
  session: "Arrival",
  scope: "Refreshments and a small welcome hamper in your room on arrival, with contents and allergies agreed beforehand",
  state: "included",
  mandatory: false,
};
const porter: InclusionLine = {
  item: "S05",
  session: "Arrival and departure",
  quantity: 2,
  scope: "Porter help with luggage at the arrival and departure airport or station, where porters are available",
  state: "included",
  mandatory: false,
};
const security: InclusionLine = {
  item: "S23",
  scope:
    "Security assistance from a confirmed professional provider, only if you request it and it is accepted in your final quotation. No queue-clearing or access privileges",
  state: "conditional",
  mandatory: false,
};
const concierge = (days: string): InclusionLine => ({
  item: "S09",
  session: days,
  scope: "Dedicated travel concierge coordinating hotels, timings, visits and changes, with support hours agreed in your quotation",
  state: "included",
  mandatory: true,
});

/* Practical notes that recur on the Varanasi river. */
const VARANASI_BOATS =
  "Varanasi boats board from the ghat steps, which can be steep, uneven and wet. River operation depends on water levels, weather and local orders, and is often suspended at the monsoon peak; if a boat cannot run, we suggest a riverside walk or another session.";

export const journeys: Journey[] = [
  /* ------------------------------------------------------------------ P07 */
  {
    id: "P07",
    slug: "varanasi-prayagraj-chitrakoot",
    status: "draft",
    setup: "Route validation before publication",
    title: "Varanasi Prayagraj and Chitrakoot",
    route: "Varanasi, Prayagraj and Chitrakoot by road, returning to Prayagraj for departure",
    destinations: ["varanasi", "prayagraj", "chitrakoot"],
    types: ["hindu-pilgrimage"],
    nights: 5,
    days: 6,
    durationNote: "Suggested six-day version, subject to route validation",
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Prayagraj", nights: 1 },
      { place: "Chitrakoot", nights: 2 },
    ],
    suits:
      "Hindu pilgrims and families who want Kashi and the Sangam together with Chitrakoot, the forested hills where Ram, Sita and Lakshman are believed to have spent much of their exile. Comfortable for most ages, with the long walk and steep climbs at Chitrakoot left optional.",
    style:
      "A private, driven pilgrimage at a steady pace: one main visit each morning, rest through the heat of the day, and an evening by the river at each place.",
    summary:
      "Five nights on three sacred rivers: the Ganga at Kashi, the Sangam at Prayagraj and the Mandakini at Chitrakoot, with darshan, river mornings and an unhurried day among Chitrakoot's hills.",
    lead:
      "This is a suggested six-day version, still to be validated on the road. It begins with two nights in Varanasi for the evening aarti, a sunrise boat and darshan at Kashi Vishwanath, moves on to Prayagraj for a boat to the Sangam, and then south to Chitrakoot. There a full day takes in Kamadgiri, the ashram of Sati Anasuya and the cave shrine of Gupt Godavari, before the drive back to Prayagraj for your onward connection.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Prayagraj airport or Prayagraj Junction, about three hours by road from Chitrakoot. Chitrakoot Dham (Karwi) station has direct trains to several cities and suits some connections.",
      timingWarning:
        "Day 6 begins with about three hours on the road to Prayagraj, so a flight or train after about 2 pm is comfortable. Chitrakoot airport's passenger flights have been suspended since December 2024, so we do not plan around it unless a current schedule is confirmed. Arrive on Day 1 by mid-afternoon to see the evening aarti; winter fog can delay flights, trains and roads in December and January.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrive in Varanasi",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station and takes you to the hotel. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Time to settle in. Your coordinator calls to go through the week, temple dress and the timings for tomorrow morning." },
          { kind: "experience", time: "Around sunset", title: "Ganga aarti at Dashashwamedh", text: "The evening aarti on the main ghat. At Standard you watch from the ghat steps, Premium arranges seating where it is available, and Luxury watches from a private boat. Crowds are heavy on festival nights." },
        ],
      },
      {
        day: 2,
        title: "Kashi",
        place: "Varanasi",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "On the Ganga at first light", text: "A boat along the ghats as the city wakes: a shared scheduled ride at Standard, a private boat with a guide at Premium and Luxury." },
          { kind: "visit", time: "Morning", title: "Darshan at Kashi Vishwanath", text: "A planned visit through the temple corridor. Phones and bags are not allowed inside, and queues can take minutes or several hours; no darshan time is promised." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "free", time: "Afternoon", title: "Free, or a walk in the lanes", text: "Time for a rest or shopping. Luxury includes the Sacred Kashi Walk through the old-city lanes and shrines with a guide." },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Prayagraj",
        place: "Prayagraj",
        photo: "prayagraj-sangam-birds",
        overnight: "Prayagraj",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Prayagraj", text: "About 120 km west, usually three hours by road." },
          { kind: "rest", time: "Midday", title: "Check in and lunch", text: "A pause at the hotel before the river." },
          { kind: "experience", time: "Afternoon", title: "Boat to the Sangam", text: "A boat from the ghats near the fort out to the meeting point of the Ganga and the Yamuna, where pilgrims bathe and offer flowers and lamps. Shared at Standard, private at Premium and Luxury, and subject to river conditions." },
          { kind: "visit", time: "Late afternoon", title: "Bade Hanuman temple", text: "The shrine of the reclining Hanuman beside the Sangam, which the river reaches in some monsoon seasons." },
        ],
      },
      {
        day: 4,
        title: "Prayagraj to Chitrakoot",
        place: "Chitrakoot",
        photo: "private-car",
        overnight: "Chitrakoot",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Chitrakoot", text: "About 125 to 130 km south-west, usually three hours, into the low forested hills on the Uttar Pradesh and Madhya Pradesh border." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "Chitrakoot is a small pilgrim town; the afternoon is kept free." },
          { kind: "experience", time: "Around sunset", title: "Aarti at Ramghat", text: "The evening aarti on the steps of the Mandakini at Ramghat. Luxury guests watch from a small private boat where boats are operating." },
        ],
      },
      {
        day: 5,
        title: "Chitrakoot's sacred hills",
        place: "Chitrakoot",
        photo: "chitrakoot-ramghat",
        overnight: "Chitrakoot",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Kamadgiri", text: "The forested hill at the centre of Chitrakoot's pilgrimage. Many pilgrims walk the parikrama path of about 5 km around it, often barefoot; walk all of it, part of it, or offer darshan at the main entrance." },
          { kind: "visit", time: "Late morning", title: "Sati Anasuya and Gupt Godavari", text: "A drive south to the ashram of Sati Anasuya beside the Mandakini, and to the cave shrine of Gupt Godavari, where water runs underfoot inside the caves." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "A break at the hotel." },
          { kind: "visit", time: "Afternoon", title: "Sphatik Shila and Hanuman Dhara (optional)", text: "Sphatik Shila, the riverside rock linked with Ram and Sita, and for those who want the climb, Hanuman Dhara, a hillside spring reached by a long flight of steep steps." },
        ],
      },
      {
        day: 6,
        title: "Back to Prayagraj for departure",
        place: "Prayagraj",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Prayagraj", text: "About three hours to Prayagraj airport or Prayagraj Junction. If your train leaves from Chitrakoot Dham (Karwi), the morning stays free." },
          { kind: "departure", time: "Afternoon", title: "Departure", text: "Your driver drops you for your onward flight or train." },
        ],
      },
    ],
    practical: {
      walking:
        "Varanasi's lanes, ghat steps and temple queues mean a fair amount of walking and standing. At Chitrakoot the Kamadgiri parikrama is about 5 km on a paved path, Hanuman Dhara is a long climb on steep steps, and Gupt Godavari has narrow cave passages with shallow water underfoot. All three are optional.",
      earlyStarts:
        "The Varanasi boat leaves around sunrise, between about 5.30 and 6.30 am depending on the season, and the Kamadgiri parikrama is best begun early, before the heat.",
      boarding:
        "Boats in Varanasi, at the Sangam and at Ramghat board from ghat steps or riverbanks that can be steep, uneven and wet. Operation depends on water levels, weather and local orders, and is often suspended at the monsoon peak.",
      mobility:
        "Temple queues can mean long periods of standing, and some shrines have steps without rails. Tell us about mobility needs early so we can plan shorter visits, wheelchair assistance where it is practical and a host to stay close. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the most comfortable season, with cold and sometimes foggy mornings in December and January. April to June is very hot. July to September brings monsoon rain, high rivers and frequent boat suspensions. Festivals such as Diwali, Dev Deepawali, Ram Navami and the Magh Mela at Prayagraj bring large crowds and scarce rooms.",
    },
    tiers: {
      standard: {
        hotels: "Selected 3-star hotels in Varanasi, Prayagraj and Chitrakoot. Chitrakoot has a short list of hotels; the actual property and room are named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "A shared scheduled sunrise boat ride in Varanasi on Day 2 and a shared boat to the Sangam on Day 3. Either can be upgraded to a private boat.",
        darshan: "Planned visits to Kashi Vishwanath, Bade Hanuman and Kamadgiri, with timings, dress and queue advice from your coordinator. No accompaniment inside the temples.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver takes you to each place but is not a guide.",
        admissions: "General darshan at these temples is free. Any paid darshan tickets, camera fees or ticketed sites are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Prayagraj airport or station, or Chitrakoot Dham station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route", state: "included", mandatory: true },
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Aarti viewing at Dashashwamedh Ghat from the ghat steps, with advice on when to arrive; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S06", day: 3, session: "Day 3 afternoon", scope: "Shared boat from the ghat to the Sangam point and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Prayagraj or Chitrakoot",
          "Lunches and dinners",
          "Sightseeing guides",
          "Paid darshan tickets, camera fees and ropeway tickets",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        hotels: "Selected 4-star hotels in Varanasi and Prayagraj. Chitrakoot has few hotels of this category; where none is available we say so in your quotation and propose the closest suitable option.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private rowing boat with a guide for the Day 2 sunrise and a private boat to the Sangam on Day 3, replacing the shared rides.",
        darshan: "Accompanied darshan assistance at Kashi Vishwanath, Bade Hanuman and Kamadgiri, within each temple's rules. No darshan time is promised.",
        assistance: "A named coordinator throughout, a welcome on arrival, accompanied darshan and a local guide for the Chitrakoot day.",
        guide: "A local guide for the Chitrakoot day (Day 5). Varanasi and Prayagraj visits are accompanied for darshan but not guided.",
        admissions: "General darshan is free. Any ticketed sites on the Chitrakoot day are included; paid darshan tickets are booked separately where available.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Prayagraj airport or station, or Chitrakoot Dham station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Vehicle group upgraded to an MPV/SUV, such as an Innova Crysta or equivalent", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Seating for the evening aarti where an arranged viewing place is available; otherwise standing room on the ghat steps", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Private rowing boat with a guide along the ghats at first light, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S06", day: 3, session: "Day 3 afternoon", scope: "Private boat from the ghat to the Sangam point and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S08", session: "Day 2, Day 3 and Day 5", quantity: 3, scope: "Accompanied darshan assistance at Kashi Vishwanath, Bade Hanuman and Kamadgiri: queues, lockers, footwear and timings. Official paid darshan tickets are booked separately where available", state: "included", mandatory: false },
          { item: "S12", day: 5, session: "Day 5", scope: "Local guide for the Chitrakoot day, about five hours: Kamadgiri, Sati Anasuya, Gupt Godavari and Sphatik Shila", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Prayagraj or Chitrakoot",
          "Lunches and dinners",
          "Guides in Varanasi and Prayagraj",
          "Paid darshan tickets and ropeway tickets",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        hotels: "Selected 4/5-star, heritage or boutique properties in Varanasi and Prayagraj. In Chitrakoot the most suitable property available may be below 4-star; the actual category and room are disclosed in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on the Chitrakoot day (Day 5). Other meals are not included; dietary needs are passed to each hotel.",
        boat: "A private boat for the Day 1 evening aarti, the highest suitable boat for the Day 2 sunrise, a private boat to the Sangam and a small private boat at Ramghat, each where boats are operating.",
        darshan: "Dedicated coordination and accompaniment at Kashi Vishwanath, Bade Hanuman and Kamadgiri within each temple's rules. No special access or darshan time is promised.",
        assistance: ASSIST_LUXURY,
        guide: "Guides for the Sacred Kashi Walk (Day 2), the Sangam visit (Day 3) and the Chitrakoot day (Day 5).",
        admissions: "Entry and ticketed sites on all listed visits are included; paid darshan tickets are booked where the temple offers them.",
        photography: "A defined professional photography session of about two hours on the Day 2 sunrise boat and the ghats, with edited image count and delivery time stated in your quotation. No photographs inside temples.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Prayagraj airport or station, or Chitrakoot Dham station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the premium vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Premium vehicle group: Fortuner, Mercedes or suitable alternative chosen for the party and route", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 6"),
          { item: "S10", session: "Day 1 to Day 6", scope: "Personal host with you on visit days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "E13", day: 1, session: "Day 1 evening", scope: "Evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Sunrise on the highest suitable boat with a guide: a private motorboat or covered boat where one is actually available and suitable, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E04", day: 2, session: "Day 2 afternoon", scope: "Sacred Kashi Walk with a guide through selected lanes and shrines, darshan boundaries explained, about two and a half hours", state: "included", mandatory: false },
          { item: "S06", day: 3, session: "Day 3 afternoon", scope: "Private boat to the Sangam point and back, motorboat or rowing boat as conditions suit", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S06", day: 4, session: "Day 4 evening", scope: "Small private rowing boat at Ramghat for the evening aarti, where boats are operating", state: "included", mandatory: false, replacementGroup: "boat-day4-ramghat" },
          { item: "S08", session: "Day 2, Day 3 and Day 5", quantity: 3, scope: "Dedicated darshan coordination and accompaniment at Kashi Vishwanath, Bade Hanuman and Kamadgiri, within each temple's rules", state: "included", mandatory: false },
          { item: "S12", session: "Day 3 and Day 5", quantity: 2, scope: "Guide for the Sangam and Bade Hanuman (Day 3) and for the Chitrakoot day (Day 5)", state: "included", mandatory: false },
          { item: "S24", day: 2, session: "Day 2 sunrise", scope: "Professional photography session of about two hours on the boat and ghats; edited image count and delivery time stated in your quotation; consent asked first", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 6", scope: "Dietary requirements, including sattvic or Jain meals, relayed to every hotel; restaurant reservations made where you wish", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Prayagraj or Chitrakoot",
          "Dinners, and lunches other than on Day 5",
          "Priest dakshina, puja materials and offerings",
          "Rituals such as Rudrabhishek or Ganga puja, unless added",
          "Videography and photography beyond the defined session",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
    },
    related: ["E28", "E29", "S17", "S16", "S29"],
    faqs: [
      {
        q: "How demanding is Chitrakoot?",
        a: "As demanding as you choose. The Kamadgiri parikrama is about 5 km on a paved path, Hanuman Dhara is a long climb on steep steps, and Gupt Godavari has narrow passages with shallow water underfoot. Each is optional, and darshan at Kamadgiri's main entrance takes only a short walk.",
      },
      {
        q: "Why does the journey return to Prayagraj?",
        a: "Chitrakoot airport's passenger flights have been suspended since December 2024, so Prayagraj, about three hours away, is the most practical airport. Trains also leave from Chitrakoot Dham (Karwi); if one suits you, the last morning stays free.",
      },
      {
        q: "Is Chitrakoot in Uttar Pradesh or Madhya Pradesh?",
        a: "Both. Chitrakoot's sacred sites lie on either side of the state border, and you cross it several times in a day without any formalities.",
      },
    ],
    hero: "varanasi-aerial-ghats",
    gallery: ["varanasi-ghats-dawn", "prayagraj-sangam-boats", "varanasi-puja"],
    seo: {
      title: "Varanasi, Prayagraj and Chitrakoot Pilgrimage, 6 Days",
      description:
        "A suggested six-day pilgrimage from Kashi to the Sangam at Prayagraj and the sacred hills of Chitrakoot, with river mornings, darshan and rest built in.",
    },
  },

  /* ------------------------------------------------------------------ P08 */
  {
    id: "P08",
    slug: "varanasi-prayagraj-chitrakoot-ayodhya",
    status: "draft",
    setup: "Route validation before publication",
    title: "Varanasi Prayagraj Chitrakoot and Ayodhya",
    route: "Extended four-destination pilgrimage: Varanasi, Prayagraj, Chitrakoot and Ayodhya by road",
    destinations: ["varanasi", "prayagraj", "chitrakoot", "ayodhya"],
    types: ["hindu-pilgrimage"],
    nights: 7,
    days: 8,
    durationNote: "Suggested eight-day version, subject to route validation",
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Prayagraj", nights: 1 },
      { place: "Chitrakoot", nights: 2 },
      { place: "Ayodhya", nights: 2 },
    ],
    suits:
      "Pilgrims who want the places of the Ramayana and Kashi in one journey, from the Sangam and Chitrakoot's forest of exile to Ram's city of Ayodhya. Best for travellers comfortable with one long road day; families with parents can ask for a slower version.",
    style:
      "A private, driven pilgrimage with two nights in most places: darshan in the morning, rest at midday, river aartis in the evening, and one long drive from Chitrakoot to Ayodhya.",
    summary:
      "Seven nights across four pilgrim places: Kashi on the Ganga, the Sangam at Prayagraj, the hills of Chitrakoot and Ayodhya on the Sarayu, at a pace with rest between the visits.",
    lead:
      "This suggested eight-day version extends the Chitrakoot journey to Ayodhya. After two nights in Varanasi and one in Prayagraj, you spend two nights at Chitrakoot among the hills and riverside shrines linked with Ram's exile, then make the longest drive of the journey to Ayodhya. There a full day covers the Shri Ram Janmabhoomi Mandir, Hanuman Garhi and the evening aarti on the Sarayu. The route is still being validated, so timings may change.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Ayodhya airport or Ayodhya Dham Junction. Lucknow airport, about three hours by road, has more flights and can be used instead.",
      timingWarning:
        "Day 6 is a long road day of six to seven hours from Chitrakoot to Ayodhya, so nothing else is planned that day. Arrive on Day 1 by mid-afternoon for the evening aarti; a late arrival moves it to Day 2. Flights from Ayodhya are fewer than from Lucknow, and fog in December and January can delay flights, trains and roads.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrive in Varanasi",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Time to settle in, and a call from your coordinator about the week ahead." },
          { kind: "experience", time: "Around sunset", title: "Ganga aarti at Dashashwamedh", text: "Watched from the ghat steps at Standard, from arranged seating where available at Premium, and from a private boat at Luxury." },
        ],
      },
      {
        day: 2,
        title: "Kashi",
        place: "Varanasi",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "On the Ganga at first light", text: "A shared scheduled ride at Standard, a private boat with a guide at Premium and Luxury, subject to river conditions." },
          { kind: "visit", time: "Morning", title: "Darshan at Kashi Vishwanath", text: "Through the temple corridor. Phones and bags are not allowed inside; queues vary and no darshan time is promised." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "free", time: "Afternoon", title: "Free, or a walk in the lanes", text: "Luxury includes the Sacred Kashi Walk with a guide." },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Prayagraj",
        place: "Prayagraj",
        photo: "prayagraj-sangam-birds",
        overnight: "Prayagraj",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Prayagraj", text: "About 120 km, usually a three-hour drive." },
          { kind: "rest", time: "Midday", title: "Check in and lunch", text: "A pause before the river." },
          { kind: "experience", time: "Afternoon", title: "Boat to the Sangam", text: "Out to the meeting point of the Ganga and the Yamuna. Shared at Standard, private at Premium and Luxury." },
          { kind: "visit", time: "Late afternoon", title: "Bade Hanuman temple", text: "The shrine of the reclining Hanuman beside the Sangam." },
        ],
      },
      {
        day: 4,
        title: "Prayagraj to Chitrakoot",
        place: "Chitrakoot",
        photo: "private-car",
        overnight: "Chitrakoot",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Chitrakoot", text: "About 125 to 130 km, usually a three-hour drive." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "A free afternoon in the pilgrim town." },
          { kind: "experience", time: "Around sunset", title: "Aarti at Ramghat", text: "The evening aarti on the Mandakini. Luxury guests watch from a small private boat where boats are operating." },
        ],
      },
      {
        day: 5,
        title: "Chitrakoot's sacred hills",
        place: "Chitrakoot",
        photo: "chitrakoot-ramghat",
        overnight: "Chitrakoot",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Kamadgiri", text: "Darshan at the sacred hill, and the parikrama path of about 5 km for those who want to walk it." },
          { kind: "visit", time: "Late morning", title: "Sati Anasuya and Gupt Godavari", text: "The riverside ashram of Sati Anasuya and the cave shrine of Gupt Godavari, with water underfoot inside." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "A break at the hotel." },
          { kind: "visit", time: "Afternoon", title: "Sphatik Shila (optional)", text: "The riverside rock linked with Ram and Sita, an easy visit before an early night ahead of the long drive." },
        ],
      },
      {
        day: 6,
        title: "Chitrakoot to Ayodhya",
        place: "On the road to Ayodhya",
        photo: "village-life",
        overnight: "Ayodhya",
        blocks: [
          { kind: "travel", time: "After an early breakfast", title: "The long drive to Ayodhya", text: "About 280 to 300 km, usually six to seven hours with stops for tea and lunch. This is the longest day of the journey." },
          { kind: "rest", time: "Evening", title: "Rest in Ayodhya", text: "Nothing is planned for the evening." },
        ],
      },
      {
        day: 7,
        title: "Ayodhya",
        place: "Ayodhya",
        photo: "ayodhya-ram-mandir",
        overnight: "Ayodhya",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Shri Ram Janmabhoomi Mandir", text: "Darshan at the temple. Phones, bags and electronic items are not allowed inside, security checks are thorough and queues vary; the early hours are usually calmer." },
          { kind: "visit", time: "Late morning", title: "Hanuman Garhi and Kanak Bhawan", text: "Hanuman Garhi, reached by a flight of about 76 steps, and the shrine of Kanak Bhawan nearby." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel." },
          { kind: "experience", time: "Around sunset", title: "Sarayu aarti", text: "The evening aarti on the Sarayu ghats, watched from the steps, or from a private boat at Luxury where boats are operating." },
        ],
      },
      {
        day: 8,
        title: "Ram ki Paidi and departure",
        place: "Ayodhya",
        photo: "ayodhya-ram-ki-paidi",
        overnight: "Departure day",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Ram ki Paidi", text: "A last walk along the stepped ghats beside the river." },
          { kind: "departure", time: "Late morning", title: "Departure", text: "Drop at Ayodhya airport or Ayodhya Dham Junction, or about three hours by road to Lucknow." },
        ],
      },
    ],
    practical: {
      walking:
        "Expect temple queues, ghat steps and old-city lanes in Varanasi, a climb of about 76 steps at Hanuman Garhi, and optional longer walks and steep steps at Chitrakoot. The Ram Mandir involves a long walk from the security check to the shrine.",
      earlyStarts:
        "The Varanasi boat leaves around sunrise, Kamadgiri and the Ram Mandir are best visited early, and Day 6 starts soon after breakfast.",
      boarding:
        "Boats in Varanasi, at the Sangam, at Ramghat and on the Sarayu board from steps or banks that can be steep and wet. All river outings depend on water levels, weather and local orders on the day.",
      mobility:
        "Long standing in queues, steps without rails and one long road day make this demanding for some guests. Tell us about mobility needs so we can assess each visit and suggest an extra night. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the most comfortable season, with fog likely in December and January. April to June is very hot. July to September is monsoon, with frequent boat suspensions. Ram Navami, Diwali and Dev Deepawali bring very large crowds to Ayodhya and Varanasi.",
    },
    tiers: {
      standard: {
        hotels: "Selected 3-star hotels in Varanasi, Prayagraj, Chitrakoot and Ayodhya. The actual properties and rooms are named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all seven hotel nights. Lunches and dinners are not included.",
        boat: "A shared scheduled sunrise boat ride in Varanasi on Day 2 and a shared boat to the Sangam on Day 3. Either can be upgraded to a private boat.",
        darshan: "Planned visits to Kashi Vishwanath, Bade Hanuman, Kamadgiri, the Ram Mandir and Hanuman Garhi, with timings and queue advice from your coordinator. No accompaniment inside the temples.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver is not a guide.",
        admissions: "General darshan at these temples is free. Any paid darshan tickets, camera fees or ticketed sites are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Ayodhya or Lucknow airport, or Ayodhya Dham Junction"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route", state: "included", mandatory: true },
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Aarti viewing at Dashashwamedh Ghat from the ghat steps; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S06", day: 3, session: "Day 3 afternoon", scope: "Shared boat to the Sangam point and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S07", day: 7, session: "Day 7 evening", scope: "Sarayu aarti viewing from the ghat steps; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day7-evening" },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Ayodhya or Lucknow",
          "Lunches and dinners",
          "Sightseeing guides",
          "Paid darshan tickets and camera fees",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        hotels: "Selected 4-star hotels in Varanasi, Prayagraj and Ayodhya. Chitrakoot has few hotels of this category; where none is available we say so in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private rowing boat with a guide for the Day 2 sunrise and a private boat to the Sangam on Day 3.",
        darshan: "Accompanied darshan assistance at Kashi Vishwanath, Kamadgiri and the Ram Mandir, within each temple's rules. No darshan time is promised.",
        assistance: "A named coordinator throughout, a welcome on arrival, accompanied darshan and guided days at Chitrakoot and Ayodhya.",
        guide: "Local guides for the Chitrakoot day (Day 5) and the Ayodhya day (Day 7).",
        admissions: "General darshan is free; any ticketed sites on the guided days are included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Ayodhya or Lucknow airport, or Ayodhya Dham Junction"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 8", scope: "Vehicle group upgraded to an MPV/SUV, such as an Innova Crysta or equivalent", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Seating for the evening aarti where an arranged viewing place is available", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Private rowing boat with a guide along the ghats at first light", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S06", day: 3, session: "Day 3 afternoon", scope: "Private boat to the Sangam point and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S07", day: 7, session: "Day 7 evening", scope: "Sarayu aarti viewing with a team member, from arranged seating where available", state: "included", mandatory: false, replacementGroup: "aarti-day7-evening" },
          { item: "S08", session: "Day 2, Day 5 and Day 7", quantity: 3, scope: "Accompanied darshan assistance at Kashi Vishwanath, Kamadgiri and the Ram Mandir: queues, lockers, footwear and timings", state: "included", mandatory: false },
          { item: "S12", session: "Day 5 and Day 7", quantity: 2, scope: "Local guides for the Chitrakoot day and the Ayodhya day, about five hours each", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Ayodhya or Lucknow",
          "Lunches and dinners",
          "Guides in Varanasi and Prayagraj",
          "Paid darshan tickets",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        hotels: "Selected 4/5-star, heritage or boutique properties in Varanasi, Prayagraj and Ayodhya. In Chitrakoot the most suitable property available may be below 4-star; the actual category and room are disclosed in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on the Chitrakoot day (Day 5) and the long road day (Day 6). Other meals are not included.",
        boat: "Private boats for both evening aartis and the Ramghat aarti, the highest suitable boat for the Varanasi sunrise and a private boat to the Sangam, each where boats are operating.",
        darshan: "Dedicated coordination and accompaniment at every temple visit within each temple's rules. No special access or darshan time is promised.",
        assistance: ASSIST_LUXURY,
        guide: "Guides for the Sacred Kashi Walk, the Sangam visit, the Chitrakoot day and the Ayodhya day.",
        admissions: "Entry and ticketed sites on all listed visits are included; paid darshan tickets are booked where the temple offers them.",
        photography: "A defined professional photography session of about two hours on the Day 2 sunrise boat and the ghats, with edited image count and delivery time stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Ayodhya or Lucknow airport, or Ayodhya Dham Junction"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private chauffeured transport for the whole route in the premium vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 8", scope: "Premium vehicle group: Fortuner, Mercedes or suitable alternative; an SUV is usually the better choice for the long Day 6 drive", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 8"),
          { item: "S10", session: "Day 1 to Day 8", scope: "Personal host with you on visit days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "E13", day: 1, session: "Day 1 evening", scope: "Evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Sunrise on the highest suitable boat with a guide, a private motorboat or covered boat where actually available, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E04", day: 2, session: "Day 2 afternoon", scope: "Sacred Kashi Walk with a guide, darshan boundaries explained", state: "included", mandatory: false },
          { item: "S06", day: 3, session: "Day 3 afternoon", scope: "Private boat to the Sangam point and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S06", day: 4, session: "Day 4 evening", scope: "Small private rowing boat at Ramghat for the evening aarti, where boats are operating", state: "included", mandatory: false, replacementGroup: "boat-day4-ramghat" },
          { item: "S06", day: 7, session: "Day 7 evening", scope: "Private boat on the Sarayu for the evening aarti, where boats are operating", state: "included", mandatory: false, replacementGroup: "aarti-day7-evening" },
          { item: "S08", session: "Day 2, Day 3, Day 5 and Day 7", quantity: 4, scope: "Dedicated darshan coordination and accompaniment at Kashi Vishwanath, Bade Hanuman, Kamadgiri, the Ram Mandir and Hanuman Garhi", state: "included", mandatory: false },
          { item: "S12", session: "Day 3, Day 5 and Day 7", quantity: 3, scope: "Guides for the Sangam, the Chitrakoot day and the Ayodhya day", state: "included", mandatory: false },
          { item: "S24", day: 2, session: "Day 2 sunrise", scope: "Professional photography session of about two hours on the boat and ghats; edited image count and delivery time stated in your quotation", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 8", scope: "Dietary requirements relayed to every hotel, and the Day 6 lunch stop reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Ayodhya or Lucknow",
          "Dinners, and lunches other than on Day 5 and Day 6",
          "Priest dakshina, puja materials and offerings",
          "Videography and photography beyond the defined session",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
    },
    related: ["E28", "E29", "S16", "S17", "S28"],
    faqs: [
      {
        q: "Why is Day 6 so long?",
        a: "Chitrakoot and Ayodhya are about 280 to 300 km apart, usually six to seven hours with stops. We keep that day free of visits. If it is too much, ask for a version with a night in Prayagraj on the way.",
      },
      {
        q: "What should we know about darshan at the Ram Mandir?",
        a: "Phones, bags and electronic items are not allowed inside, security checks are thorough and queues vary through the day and the year. Early morning is usually calmer. No darshan time is promised at any tier.",
      },
      {
        q: "Can the journey end in Lucknow?",
        a: "Yes. Lucknow airport is about three hours from Ayodhya and has more flights; your driver can drop you there on Day 8.",
      },
    ],
    hero: "ayodhya-sarayu-evening",
    gallery: ["varanasi-aerial-ghats", "prayagraj-sangam-boats", "varanasi-diya-floating"],
    seo: {
      title: "Varanasi, Prayagraj, Chitrakoot and Ayodhya, 8 Days",
      description:
        "An eight-day pilgrimage linking Kashi, the Sangam, Chitrakoot and Ayodhya at a steady pace, with darshan, river aartis and rest around one long road day.",
    },
  },

  /* ------------------------------------------------------------------ P09 */
  {
    id: "P09",
    slug: "journey-of-remembrance",
    status: "draft",
    setup: "Specialist confirmation before publication",
    title: "A Journey of Remembrance: Varanasi & Gaya",
    route: "Varanasi and Gaya, with individually scoped ancestral rites (Pind Daan) in Gaya",
    destinations: ["varanasi", "gaya"],
    types: ["ancestral-rites", "hindu-pilgrimage"],
    nights: 4,
    days: 5,
    durationNote: "Suggested five-day version for a one-morning rite; longer where the family's tradition calls for more days in Gaya",
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Gaya", nights: 2 },
    ],
    suits:
      "Families travelling to offer Pind Daan for parents and ancestors at Gaya, including those arranging the journey for an elder. Parents travelling with family support can choose SHRAVAN Varanasi and Gaya, which adds a companion and a slower pace.",
    style:
      "A quiet, private journey with the rites at its centre: two calm days in Kashi, the drive to Gaya, one morning given to the rites with a priest, and room to rest afterwards.",
    summary:
      "Two nights in Kashi, then two in Gaya for Pind Daan at the Vishnupad temple, the Falgu and Akshayavat, with the ritual scope, priest and timing agreed with your family before you travel.",
    lead:
      "This journey is planned around one purpose: offering Pind Daan at Gaya for those your family wishes to remember. It begins with two unhurried days in Varanasi, by the river and at Kashi Vishwanath, then moves to Gaya by road or train. The rites themselves are scoped individually with a priest before you travel, from the names and family details the priest needs to the sequence of sites, so that on the day you can give the morning to them without logistics on your mind.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Gaya airport or Gaya Junction, a major station on the main Delhi to Kolkata line. A return to Varanasi by road or train can be quoted instead.",
      timingWarning:
        "The rites take most of the Day 4 morning and the priest fixes the start time, so no travel is planned that day. Flights from Gaya are limited and seasonal schedules change, so we confirm your departure before fixing the programme. During Pitru Paksha, roads into Gaya are congested and rooms scarce; allow extra time.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrive in Varanasi",
        place: "Varanasi",
        photo: "varanasi-diya-floating",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest, and a call about the rites", text: "Your coordinator confirms the details the priest will need, such as the names of those being remembered and the family's gotra if known, and goes through the plan for Gaya." },
          { kind: "experience", time: "Around sunset", title: "Evening aarti (optional)", text: "Watch the Ganga aarti from the ghat steps if you wish, or keep the evening quiet." },
        ],
      },
      {
        day: 2,
        title: "Kashi",
        place: "Varanasi",
        photo: "varanasi-river-mist",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "On the Ganga at first light", text: "A boat along the ghats, past Manikarnika, where cremation fires burn day and night. Shared at Standard, private with a guide at Premium and Luxury." },
          { kind: "visit", time: "Morning", title: "Kashi Vishwanath", text: "Darshan through the temple corridor. Phones and bags are not allowed inside; queues vary and no darshan time is promised." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Some families also offer rites in Kashi, for example at Pishach Mochan Kund; this can be arranged separately if you wish." },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Gaya",
        place: "Gaya",
        photo: "private-car",
        overnight: "Gaya",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive or train to Gaya", text: "About 250 km by road along the Grand Trunk Road, usually five to six hours with stops. Trains from Varanasi or Pt. Deen Dayal Upadhyaya Junction to Gaya Junction take about three to four hours and can replace the drive." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "A quiet afternoon at the hotel in Gaya." },
          { kind: "visit", time: "Evening", title: "Confirm the morning with the priest", text: "The priest or a representative confirms the sequence, the start time, and what to bring and wear, in person where possible or by phone." },
        ],
      },
      {
        day: 4,
        title: "Pind Daan in Gaya",
        place: "Gaya",
        photo: "gaya-falgu",
        overnight: "Gaya",
        blocks: [
          { kind: "visit", time: "Early morning", title: "The rites begin", text: "The family member making the offerings sits with the priest for the sankalp and the offering of pinda, balls of cooked rice or flour with sesame, for those being remembered." },
          { kind: "visit", time: "Morning", title: "The Falgu, Vishnupad and Akshayavat", text: "The sequence usually includes the bank of the Falgu, the Vishnupad temple with its footprint of Vishnu set in stone, and Akshayavat, the banyan where the rites traditionally conclude. Your priest decides the exact order and sites." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "A quiet afternoon. Many families keep simple vegetarian meals on this day." },
          { kind: "free", time: "Evening", title: "Free", text: "Time for the family, with nothing scheduled." },
        ],
      },
      {
        day: 5,
        title: "Departure from Gaya",
        place: "Gaya",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "departure", time: "Morning", title: "Departure", text: "Drop at Gaya airport or Gaya Junction. If your onward connection is from Varanasi, the drive back takes five to six hours and can be quoted instead." },
        ],
      },
    ],
    practical: {
      walking:
        "At Gaya the rites move between the Falgu riverbank, the Vishnupad temple and Akshayavat, on foot and by short drives. Temple lanes are crowded, and the riverbank is sandy or uneven with steps down to the water. Outside the monsoon the Falgu is often a dry sandy bed; a rubber dam near the temple, opened in 2022, was built to hold water for the rites, but levels still vary.",
      earlyStarts:
        "Rites usually begin in the morning at a time the priest sets; expect to leave the hotel between about 6.30 and 7.30 am on Day 4. The Day 2 boat is at sunrise.",
      boarding: VARANASI_BOATS,
      mobility:
        "The rites involve sitting on the ground for long periods, standing in crowded lanes and walking on uneven ground. Tell us about knee, back or mobility needs: priests can often adapt seating, and a host can stay close. We do not describe these sites as accessible.",
      seasonal:
        "Pitru Paksha, the fortnight for ancestral rites in September or October, is Gaya's busiest time, with very large crowds, scarce rooms and high demand for priests; families who wish to come then should enquire early. Rites are offered through the year. April to June is very hot; winter mornings are cold and often foggy.",
    },
    tiers: {
      standard: {
        hotels: "Selected 3-star hotels in Varanasi and Gaya. Rooms in Gaya are scarce during Pitru Paksha; the actual property and room are named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all four hotel nights. Lunches and dinners are not included.",
        boat: "A shared scheduled sunrise boat ride in Varanasi on Day 2. It can be upgraded to a private boat.",
        darshan: "Planned visits to Kashi Vishwanath and the Vishnupad temple, with timings and queue advice from your coordinator. No accompaniment inside the temples.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide. The priest guides the rites; your driver is not a guide.",
        admissions: "General darshan at these temples is free. Paid darshan tickets, donations and offerings are your own.",
        photography: "Not included. Rites are not photographed unless the family and the priest agree.",
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 5", scope: "Private air-conditioned sedan or suitable equivalent with driver, including the Varanasi to Gaya drive", state: "included", mandatory: true },
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Optional aarti viewing from the ghat steps at Dashashwamedh; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S22", day: 4, session: "Day 4 morning", scope: "Coordination of the Pind Daan at Gaya with a priest: ritual scope agreed with the family before travel, start time, materials list and the sequence of sites your rite requires. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: true },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Lunches and dinners",
          "Priest dakshina and ritual materials, agreed and itemised separately in your quotation",
          "Rites in Varanasi, unless added",
          "Any visit to Bodh Gaya, unless expressly added",
          "Donations, offerings and tips",
          "Travel insurance",
        ],
      },
      premium: {
        hotels: "Selected 4-star hotels in Varanasi and Gaya. Gaya has few hotels of this category and fewer still during Pitru Paksha; where none is available we say so in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private rowing boat with a guide for the Day 2 sunrise, replacing the shared ride.",
        darshan: "Accompanied darshan assistance at Kashi Vishwanath and the Vishnupad temple, within each temple's rules. No darshan time is promised.",
        assistance: "A named coordinator throughout, a welcome on arrival, and a host with the family for the morning of the rites.",
        guide: "A guide on the Day 2 sunrise boat. The priest guides the rites.",
        admissions: "General darshan is free. Paid darshan tickets are booked separately where available.",
        photography: "Not included. Rites are not photographed unless the family and the priest agree.",
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 5", scope: "Private chauffeured transport in the upgraded vehicle group below, including the Varanasi to Gaya drive", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 5", scope: "Vehicle group upgraded to an MPV/SUV, such as an Innova Crysta or equivalent", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Optional aarti viewing from arranged seating where available", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Private rowing boat with a guide along the ghats at first light", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S08", session: "Day 2 and Day 4", quantity: 2, scope: "Accompanied darshan assistance at Kashi Vishwanath and the Vishnupad temple", state: "included", mandatory: false },
          { item: "S22", day: 4, session: "Day 4 morning", scope: "Coordination of the Pind Daan at Gaya with a priest: ritual scope agreed with the family before travel, start time, materials and sequence of sites. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: true },
          { item: "S10", day: 4, session: "Day 4 morning", scope: "A host who stays with the family through the rites: belongings, footwear, water, timings and liaison with the priest", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Lunches and dinners",
          "Priest dakshina and ritual materials, agreed and itemised separately in your quotation",
          "Rites in Varanasi, unless added",
          "Any visit to Bodh Gaya, unless expressly added",
          "Donations, offerings and tips",
          "Travel insurance",
        ],
      },
      luxury: {
        hotels: "Selected 4/5-star, heritage or boutique properties in Varanasi. In Gaya the most suitable property available may be below this category; the actual category and room are disclosed in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus a simple vegetarian lunch on the day of the rites (Day 4), sattvic if the family wishes. Other meals are not included.",
        boat: "A private boat for the optional Day 1 evening aarti and the highest suitable boat for the Day 2 sunrise, where boats are operating.",
        darshan: "Dedicated coordination and accompaniment at Kashi Vishwanath and the Vishnupad temple within each temple's rules. No special access or darshan time is promised.",
        assistance: ASSIST_LUXURY,
        guide: "A guide on the Day 2 sunrise boat. The priest guides the rites.",
        admissions: "General darshan is free; paid darshan tickets are booked where the temple offers them.",
        photography: "Not included by default on a remembrance journey. A discreet session can be added if the family wishes; rites are never photographed without the family's and the priest's agreement.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 5", scope: "Private chauffeured transport in the premium vehicle group below, including the Varanasi to Gaya drive", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 5", scope: "Premium vehicle group: Fortuner, Mercedes or suitable alternative chosen for the party and route", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S31", day: 1, session: "Arrival", scope: "Simple refreshments in your room on arrival, agreed beforehand", state: "included", mandatory: false },
          concierge("Day 1 to Day 5"),
          { item: "S10", session: "Day 2 to Day 5", scope: "Personal host with the family in Varanasi, on the road to Gaya and through the rites, within agreed hours", state: "included", mandatory: false },
          { item: "E13", day: 1, session: "Day 1 evening", scope: "Optional evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Sunrise on the highest suitable boat with a guide, a private motorboat or covered boat where actually available, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S08", session: "Day 2 and Day 4", quantity: 2, scope: "Dedicated darshan coordination and accompaniment at Kashi Vishwanath and the Vishnupad temple", state: "included", mandatory: false },
          { item: "S22", day: 4, session: "Day 4 morning", scope: "Coordination of the Pind Daan at Gaya with a priest: ritual scope agreed with the family before travel, start time, materials and sequence of sites. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: true },
          { item: "S27", session: "Day 1 to Day 5", scope: "Dietary coordination, including sattvic meals without onion and garlic on the day of the rites if the family keeps them", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Dinners, and lunches other than on Day 4",
          "Priest dakshina and ritual materials, agreed and itemised separately in your quotation",
          "Rites in Varanasi, unless added",
          "Any visit to Bodh Gaya, unless expressly added",
          "Photography and videography",
          "Donations, offerings and tips",
        ],
      },
    },
    related: ["S19", "S16", "S17", "S29", "E29"],
    faqs: [
      {
        q: "Who performs the rites?",
        a: "A priest at Gaya conducts the Pind Daan, and the family member making the offerings follows the priest's guidance. Some families have a long-standing priest at Gaya; if yours does, tell us and we will coordinate with them. Otherwise we arrange a priest and agree the scope, timing and materials with you before you travel.",
      },
      {
        q: "How long do the rites take?",
        a: "Most families complete the Pind Daan in one morning, at the Falgu, the Vishnupad temple and Akshayavat. Some family traditions call for a longer sequence over several days at more sites; if so, tell us and we will plan more nights in Gaya.",
      },
      {
        q: "Does this journey include Bodh Gaya?",
        a: "No. Gaya and Bodh Gaya are different places, about half an hour apart. This journey is planned around the rites in Gaya; a visit to Bodh Gaya can be added only if you expressly ask for it.",
      },
      {
        q: "Can rites also be offered in Kashi?",
        a: "Yes, if your family wishes. Some families also offer rites in Varanasi, for example at Pishach Mochan Kund or beside the Ganga. We agree the place, priest and timing with you and quote it separately.",
      },
    ],
    hero: "gaya-vishnupad",
    gallery: ["varanasi-aarti-lamp", "varanasi-puja", "varanasi-ghats-dawn"],
    seo: {
      title: "Pind Daan in Gaya with Varanasi: A Journey of Remembrance",
      description:
        "A five-day journey for families offering Pind Daan at Gaya, with two quiet days in Varanasi first and the rites scoped with a priest before you travel.",
    },
  },

  /* ------------------------------------------------------------------ P10 */
  {
    id: "P10",
    slug: "varanasi-prayagraj-gaya",
    status: "draft",
    setup: "Covers earlier Varanasi–Gaya–Prayagraj note; do not duplicate it as another product",
    title: "Varanasi Prayagraj and Gaya Pilgrimage",
    route: "Varanasi, Prayagraj and Gaya, in the order set by your travel connections",
    destinations: ["prayagraj", "varanasi", "gaya"],
    types: ["hindu-pilgrimage"],
    nights: 5,
    days: 6,
    durationNote:
      "5N/6D target. Shown west to east; it runs in reverse if you arrive at Gaya. A shorter 4N/5D variant is under review, not a separate journey.",
    overnights: [
      { place: "Prayagraj", nights: 1 },
      { place: "Varanasi", nights: 2 },
      { place: "Gaya", nights: 2 },
    ],
    suits:
      "Hindu pilgrims who want the three great tirthas of the plains in one journey: the Sangam, Kashi and Gaya. Families who wish to offer Pind Daan at Gaya can add the rites to the Gaya day.",
    style:
      "A private, driven pilgrimage along one line from west to east, with a river outing in each of the first two places and a calm final day at Gaya.",
    summary:
      "Five nights from the Sangam at Prayagraj to Kashi and on to Gaya, with a boat at the Sangam, sunrise on the Ganga, darshan at Kashi Vishwanath and the Vishnupad temple.",
    lead:
      "Prayagraj, Varanasi and Gaya lie roughly on one line across the plains, so this suggested six-day version simply follows it in the direction your flights or trains suit. Shown here from west to east, it begins at the Sangam, spends two nights in Kashi for the evening aarti, a sunrise boat and darshan, and ends with two nights in Gaya for the Vishnupad temple and the Falgu. Pind Daan at Gaya can be added and scoped with a priest.",
    gateways: {
      arrival: "Prayagraj airport or Prayagraj Junction (or Gaya, if the journey runs in reverse).",
      departure:
        "Gaya airport or Gaya Junction (or Prayagraj in reverse). Varanasi's airport and stations sit in the middle and can serve either end.",
      timingWarning:
        "The order depends on your connections, so we fix it only once your arrival and departure are known. Flights from Gaya are limited and some are seasonal; Gaya Junction has many more trains. Winter fog can delay flights and trains in December and January.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrive in Prayagraj",
        place: "Prayagraj",
        photo: "prayagraj-sangam-birds",
        overnight: "Prayagraj",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "At Prayagraj airport or Prayagraj Junction. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Midday", title: "Check in and rest", text: "Time to settle in before the river." },
          { kind: "experience", time: "Afternoon", title: "Boat to the Sangam", text: "Out to the meeting point of the Ganga and the Yamuna. Shared at Standard, private at Premium and Luxury, subject to river conditions." },
          { kind: "visit", time: "Late afternoon", title: "Bade Hanuman temple", text: "The shrine of the reclining Hanuman beside the Sangam." },
        ],
      },
      {
        day: 2,
        title: "Prayagraj to Varanasi",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Varanasi", text: "About 120 km, usually a three-hour drive." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "A quiet afternoon at the hotel." },
          { kind: "experience", time: "Around sunset", title: "Ganga aarti at Dashashwamedh", text: "Watched from the ghat steps at Standard, from arranged seating where available at Premium, and from a private boat at Luxury." },
        ],
      },
      {
        day: 3,
        title: "Kashi",
        place: "Varanasi",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "On the Ganga at first light", text: "A shared scheduled ride at Standard, a private boat with a guide at Premium and Luxury." },
          { kind: "visit", time: "Morning", title: "Darshan at Kashi Vishwanath", text: "Through the temple corridor. Phones and bags are not allowed inside; queues vary and no darshan time is promised." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel." },
          { kind: "free", time: "Afternoon", title: "Free, or a walk in the lanes", text: "Luxury includes the Sacred Kashi Walk with a guide." },
        ],
      },
      {
        day: 4,
        title: "Varanasi to Gaya",
        place: "Gaya",
        photo: "private-car",
        overnight: "Gaya",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive or train to Gaya", text: "About 250 km by road, usually five to six hours with stops, or about three to four hours by train to Gaya Junction." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "A free evening in Gaya." },
        ],
      },
      {
        day: 5,
        title: "Gaya",
        place: "Gaya",
        photo: "gaya-vishnupad",
        overnight: "Gaya",
        blocks: [
          { kind: "visit", time: "Morning", title: "The Vishnupad temple", text: "Darshan at the temple built around a footprint of Vishnu set in stone, on the bank of the Falgu." },
          { kind: "visit", time: "Late morning", title: "The Falgu and Akshayavat", text: "The riverbank where pilgrims offer tarpan, and the banyan of Akshayavat. If your family wishes to offer Pind Daan, it is scoped with a priest in advance and takes most of the morning." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "A quiet afternoon." },
        ],
      },
      {
        day: 6,
        title: "Departure from Gaya",
        place: "Gaya",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "departure", time: "Morning", title: "Departure", text: "Drop at Gaya airport or Gaya Junction." },
        ],
      },
    ],
    practical: {
      walking:
        "Expect ghat steps and temple queues in Varanasi, a walk down to the boats at the Sangam, and crowded lanes and an uneven riverbank around the Vishnupad temple.",
      earlyStarts: "The Varanasi boat leaves around sunrise, between about 5.30 and 6.30 am depending on the season.",
      boarding:
        "Boats at the Sangam and in Varanasi board from steps or banks that can be steep, muddy and wet. River outings depend on water levels, weather and local orders, and are often suspended at the monsoon peak.",
      mobility:
        "Temple queues mean long standing, and some shrines have steps without rails. Tell us about mobility needs early so we can assess each visit. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the most comfortable season, with fog in December and January. April to June is very hot; July to September is monsoon. The Magh Mela at Prayagraj and Pitru Paksha at Gaya bring very large crowds and scarce rooms.",
    },
    tiers: {
      standard: {
        hotels: "Selected 3-star hotels in Prayagraj, Varanasi and Gaya. The actual properties and rooms are named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "A shared boat to the Sangam on Day 1 and a shared scheduled sunrise ride in Varanasi on Day 3. Either can be upgraded to a private boat.",
        darshan: "Planned visits to Bade Hanuman, Kashi Vishwanath and the Vishnupad temple, with timings and queue advice from your coordinator.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver is not a guide.",
        admissions: "General darshan at these temples is free. Any paid darshan tickets are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Prayagraj airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route", state: "included", mandatory: true },
          { item: "S06", day: 1, session: "Day 1 afternoon", scope: "Shared boat to the Sangam point and back", state: "included", mandatory: false, replacementGroup: "boat-day1-sangam" },
          { item: "S07", day: 2, session: "Day 2 evening", scope: "Aarti viewing at Dashashwamedh Ghat from the ghat steps; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day2-evening" },
          { item: "S06", day: 3, session: "Day 3 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day3-dawn" },
        ],
        excluded: [
          "Flights and trains to Prayagraj and from Gaya",
          "Lunches and dinners",
          "Sightseeing guides",
          "Pind Daan and other rites, unless added",
          "Paid darshan tickets, donations and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        hotels: "Selected 4-star hotels in Prayagraj and Varanasi; in Gaya, where a 4-star hotel is not available, we say so in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private boat to the Sangam on Day 1 and a private rowing boat with a guide for the Day 3 sunrise.",
        darshan: "Accompanied darshan assistance at Bade Hanuman, Kashi Vishwanath and the Vishnupad temple, within each temple's rules.",
        assistance: "A named coordinator throughout, a welcome on arrival, accompanied darshan and a guided morning at Gaya.",
        guide: "A local guide for the Gaya morning (Day 5).",
        admissions: "General darshan is free; paid darshan tickets are booked separately where available.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Prayagraj airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Vehicle group upgraded to an MPV/SUV, such as an Innova Crysta or equivalent", state: "included", mandatory: false },
          arrivalWelcome("Prayagraj airport or station"),
          { item: "S06", day: 1, session: "Day 1 afternoon", scope: "Private boat to the Sangam point and back", state: "included", mandatory: false, replacementGroup: "boat-day1-sangam" },
          { item: "S07", day: 2, session: "Day 2 evening", scope: "Seating for the evening aarti where an arranged viewing place is available", state: "included", mandatory: false, replacementGroup: "aarti-day2-evening" },
          { item: "E12", day: 3, session: "Day 3 sunrise", scope: "Private rowing boat with a guide along the ghats at first light", state: "included", mandatory: false, replacementGroup: "boat-day3-dawn" },
          { item: "S08", session: "Day 1, Day 3 and Day 5", quantity: 3, scope: "Accompanied darshan assistance at Bade Hanuman, Kashi Vishwanath and the Vishnupad temple", state: "included", mandatory: false },
          { item: "S12", day: 5, session: "Day 5 morning", scope: "Local guide for the Vishnupad temple, the Falgu and Akshayavat, about three hours", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Prayagraj and from Gaya",
          "Lunches and dinners",
          "Guides in Prayagraj and Varanasi",
          "Pind Daan and other rites, unless added",
          "Paid darshan tickets, donations and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        hotels: "Selected 4/5-star, heritage or boutique properties in Prayagraj and Varanasi. In Gaya the most suitable property available may be below this category; the actual category and room are disclosed in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on the Varanasi to Gaya travel day (Day 4). Other meals are not included.",
        boat: "A private boat to the Sangam, a private boat for the Varanasi evening aarti and the highest suitable boat for the Day 3 sunrise, each where boats are operating.",
        darshan: "Dedicated coordination and accompaniment at every temple visit within each temple's rules. No special access or darshan time is promised.",
        assistance: ASSIST_LUXURY,
        guide: "Guides for the Sangam visit (Day 1), the Sacred Kashi Walk (Day 3) and the Gaya morning (Day 5).",
        admissions: "Entry and ticketed sites on all listed visits are included; paid darshan tickets are booked where the temple offers them.",
        photography: "A defined professional photography session of about two hours on the Day 3 sunrise boat and the ghats, with edited image count and delivery time stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Prayagraj airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the premium vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Premium vehicle group: Fortuner, Mercedes or suitable alternative chosen for the party and route", state: "included", mandatory: false },
          arrivalWelcome("Prayagraj airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 6"),
          { item: "S10", session: "Day 1 to Day 6", scope: "Personal host with you on visit days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "S06", day: 1, session: "Day 1 afternoon", scope: "Private boat to the Sangam point and back, motorboat or rowing boat as conditions suit", state: "included", mandatory: false, replacementGroup: "boat-day1-sangam" },
          { item: "E13", day: 2, session: "Day 2 evening", scope: "Evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day2-evening" },
          { item: "E12", day: 3, session: "Day 3 sunrise", scope: "Sunrise on the highest suitable boat with a guide, a private motorboat or covered boat where actually available, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day3-dawn" },
          { item: "E04", day: 3, session: "Day 3 afternoon", scope: "Sacred Kashi Walk with a guide, darshan boundaries explained", state: "included", mandatory: false },
          { item: "S08", session: "Day 1, Day 3 and Day 5", quantity: 3, scope: "Dedicated darshan coordination and accompaniment at Bade Hanuman, Kashi Vishwanath and the Vishnupad temple", state: "included", mandatory: false },
          { item: "S12", session: "Day 1 and Day 5", quantity: 2, scope: "Guides for the Sangam and Bade Hanuman, and for the Gaya morning", state: "included", mandatory: false },
          { item: "S24", day: 3, session: "Day 3 sunrise", scope: "Professional photography session of about two hours on the boat and ghats; edited image count and delivery time stated in your quotation", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 6", scope: "Dietary requirements relayed to every hotel, and the Day 4 lunch stop reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Prayagraj and from Gaya",
          "Dinners, and lunches other than on Day 4",
          "Pind Daan and other rites, unless added",
          "Priest dakshina, donations and offerings",
          "Videography and photography beyond the defined session",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
    },
    related: ["S22", "S19", "E27", "S16", "S29"],
    faqs: [
      {
        q: "Which way round does the journey run?",
        a: "Whichever suits your connections. Prayagraj, Varanasi and Gaya lie roughly on one line from west to east, so you can arrive at Prayagraj and leave from Gaya, or the reverse. The nights in each place stay the same.",
      },
      {
        q: "Can we offer Pind Daan at Gaya on this journey?",
        a: "Yes. It is added and scoped with a priest before you travel, and usually takes most of a morning. If the rites are the main purpose of your visit, A Journey of Remembrance is planned around them.",
      },
      {
        q: "Is Bodh Gaya included?",
        a: "No. Gaya and Bodh Gaya are different places, about half an hour apart. A visit to Bodh Gaya can be added only if you expressly ask for it.",
      },
    ],
    hero: "gaya-falgu",
    gallery: ["prayagraj-sangam-boats", "varanasi-aerial-ghats", "varanasi-diya-floating"],
    seo: {
      title: "Varanasi, Prayagraj and Gaya Pilgrimage, 6 Days",
      description:
        "Six days across Prayagraj, Kashi and Gaya, in whichever order suits your flights: the Sangam, Kashi Vishwanath and the Vishnupad temple at a steady pace.",
    },
  },

  /* ------------------------------------------------------------------ P11 */
  {
    id: "P11",
    slug: "sarnath-kushinagar",
    status: "draft",
    setup: "Route and gateway validation",
    title: "Sarnath and Kushinagar Buddhist Journey",
    route: "An Uttar Pradesh Buddhist journey: Sarnath and Kushinagar, from Varanasi to Gorakhpur",
    destinations: ["varanasi", "sarnath", "kushinagar"],
    types: ["buddhist"],
    nights: 3,
    days: 4,
    durationNote: "Suggested four-day version, subject to route and gateway validation",
    overnights: [
      { place: "Varanasi (for Sarnath)", nights: 2 },
      { place: "Kushinagar", nights: 1 },
    ],
    suits:
      "Buddhist pilgrims and travellers with limited days who want the place of the first teaching and the place of the parinirvana in one short journey, and can manage one long road day.",
    style:
      "A compact private journey: a quiet morning at Sarnath, one road day north, and an evening and a morning at Kushinagar before the short drive to Gorakhpur.",
    summary:
      "Three nights linking Sarnath, where the Buddha gave his first teaching, with Kushinagar, the place of his parinirvana, ending at Gorakhpur for onward flights and trains.",
    lead:
      "This is a suggested four-day version of a short Buddhist journey within Uttar Pradesh. It begins in Varanasi with an hour on the Ganga at first light and a morning at Sarnath, where the Buddha first taught. A long road day carries you north to Kushinagar, the place of his parinirvana, for an evening visit to the reclining Buddha and a morning at the stupas before the drive to Gorakhpur. The gateway is still being validated.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure: "Gorakhpur airport or Gorakhpur Junction, about 55 km and an hour and a half by road from Kushinagar.",
      timingWarning:
        "Day 4 combines the Kushinagar visits with the drive to Gorakhpur, so a flight or train after about 3 pm keeps the morning unhurried. Kushinagar's own airport has had no regular scheduled flights since November 2023; we plan around Gorakhpur unless a current schedule is confirmed. Fog in December and January can delay flights and trains.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrive in Varanasi",
        place: "Varanasi",
        photo: "arrival-welcome",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon and evening", title: "Rest", text: "Nothing is fixed today, so a late arrival costs you no visit. Your coordinator calls to go through the plan." },
        ],
      },
      {
        day: 2,
        title: "The river at first light and Sarnath",
        place: "Varanasi and Sarnath",
        photo: "sarnath-monks",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "On the Ganga at first light", text: "A quiet hour along the ghats: a shared scheduled ride at Standard, a private boat with a guide at Premium and Luxury. River operation depends on water levels and local orders on the day." },
          { kind: "visit", time: "Late morning", title: "Sarnath", text: "The deer park where the Buddha gave his first teaching: the Dhamek Stupa, the ruins of the old monasteries, the modern Mulagandha Kuti Vihara and the Archaeological Museum with the Ashokan lion capital. The museum is closed on Fridays." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Back to the hotel, or quiet time in the Sarnath gardens." },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Kushinagar",
        place: "Kushinagar",
        photo: "kushinagar-mahaparinirvana",
        overnight: "Kushinagar",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive north to Kushinagar", text: "About 240 to 260 km, usually five to six hours with stops for tea and lunch." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "Time to settle in after the drive." },
          { kind: "visit", time: "Late afternoon", title: "The Mahaparinirvana Temple", text: "An unhurried first visit to the reclining Buddha, a 5th-century image about six metres long, and the stupa behind the temple, in the evening light." },
        ],
      },
      {
        day: 4,
        title: "Kushinagar and on to Gorakhpur",
        place: "Kushinagar",
        photo: "private-car",
        overnight: "Departure day",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Ramabhar Stupa and Mathakuar", text: "The great brick stupa at Ramabhar, which by tradition marks the place of the Buddha's cremation, and the shrine at Mathakuar with its seated Buddha image." },
          { kind: "travel", time: "Late morning", title: "Drive to Gorakhpur", text: "About an hour and a half to Gorakhpur airport or Gorakhpur Junction." },
          { kind: "departure", time: "Afternoon", title: "Departure", text: "Your driver drops you for your onward flight or train." },
        ],
      },
    ],
    practical: {
      walking:
        "Sarnath and Kushinagar are largely flat, but each visit involves one to two kilometres on brick paths, lawns and uneven ruins. Shoes come off inside temples and shrines.",
      earlyStarts: "The Day 2 boat leaves around sunrise, between about 5.30 and 6.30 am depending on the season, and Day 4 starts early to fit Kushinagar before the drive.",
      boarding: VARANASI_BOATS,
      mobility:
        "Day 3 is a long road day, about five to six hours with stops. Ruins have uneven ground and few ramps; tell us early about mobility needs so we can assess each site. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the main season, with fog in December and January that can slow roads and delay flights. April to June is very hot, so visits keep to early morning and late afternoon. July to September is monsoon. Kushinagar is busiest with pilgrim groups in winter and around Buddha Purnima.",
    },
    tiers: {
      standard: {
        hotels: "Selected 3-star hotels in Varanasi and Kushinagar. Hotel choice in Kushinagar is limited; the actual property and room are named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all three hotel nights. Lunches and dinners are not included.",
        boat: "A shared scheduled sunrise boat ride in Varanasi on Day 2. It can be upgraded to a private boat.",
        darshan: "Not a darshan itinerary. Visits to the stupas, temples and monasteries are planned around opening hours and the heat.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver takes you to each site but is not a guide.",
        admissions: "Entry tickets at the protected site and museum in Sarnath are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gorakhpur airport or Gorakhpur Junction"),
          { item: "S02", session: "Day 1 to Day 4", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route", state: "included", mandatory: true },
          { item: "S06", day: 2, session: "Day 2 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gorakhpur",
          "Lunches and dinners",
          "Sightseeing and specialist guides",
          "Entry tickets and camera fees",
          "Offerings, donations and tips",
          "Travel insurance",
        ],
      },
      premium: {
        hotels: "Selected 4-star hotels in Varanasi. Kushinagar has few hotels of this category; where none is available we say so in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private rowing boat with a guide for the Day 2 sunrise, replacing the shared ride.",
        darshan: "Not a darshan itinerary. Your guides at Sarnath and Kushinagar accompany the site visits.",
        assistance: "A named coordinator throughout, a welcome on arrival, and guided visits at Sarnath and Kushinagar.",
        guide: "A specialist guide at Sarnath (Day 2) and a guide for the Kushinagar sites (Day 4).",
        admissions: "Entry tickets for the guided visit at Sarnath, including the museum, are included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gorakhpur airport or Gorakhpur Junction"),
          { item: "S02", session: "Day 1 to Day 4", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 4", scope: "Vehicle group upgraded to an MPV/SUV, such as an Innova Crysta or equivalent", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Private rowing boat with a guide along the ghats at first light", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E24", day: 2, session: "Day 2 late morning", scope: "Sarnath with a specialist guide, about two and a half hours, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", day: 4, session: "Day 4 morning", scope: "Guide for Ramabhar Stupa, Mathakuar and the Mahaparinirvana Temple, about two hours", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gorakhpur",
          "Lunches and dinners",
          "Camera fees",
          "Offerings, donations and tips",
          "Travel insurance",
        ],
      },
      luxury: {
        hotels: "Selected 4/5-star, heritage or boutique properties in Varanasi. In Kushinagar the most suitable property available may be below this category; the actual category and room are disclosed in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on the road day (Day 3). Other meals are not included.",
        boat: "The highest suitable boat for the Day 2 sunrise, with a guide, where boats are operating.",
        darshan: "Not a darshan itinerary. Your concierge plans each visit around opening hours, crowds and any meditation time you wish to keep; no special access is promised.",
        assistance: ASSIST_LUXURY,
        guide: "A specialist guide at Sarnath and a guide at Kushinagar.",
        admissions: "Entry tickets for all listed site visits, including the Sarnath museum, are included.",
        photography: "A defined professional photography session of about two hours at Sarnath, with edited image count and delivery time stated in your quotation. Photography inside shrines follows each site's rules.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Gorakhpur airport or Gorakhpur Junction"),
          { item: "S02", session: "Day 1 to Day 4", scope: "Private chauffeured transport for the whole route in the premium vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 4", scope: "Premium vehicle group: Fortuner, Mercedes or suitable alternative chosen for the party and route", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 4"),
          { item: "S10", session: "Day 2 to Day 4", scope: "Personal host with you at Sarnath, on the road and at Kushinagar, within agreed hours", state: "included", mandatory: false },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Sunrise on the highest suitable boat with a guide, a private motorboat or covered boat where actually available, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E24", day: 2, session: "Day 2 late morning", scope: "Sarnath with a specialist guide, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", day: 4, session: "Day 4 morning", scope: "Guide for Ramabhar Stupa, Mathakuar and the Mahaparinirvana Temple", state: "included", mandatory: false },
          { item: "S24", day: 2, session: "Day 2 late morning", scope: "Professional photography session of about two hours at Sarnath; edited image count and delivery time stated in your quotation; consent asked first", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 4", scope: "Dietary requirements relayed to each hotel, and the Day 3 lunch stop reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gorakhpur",
          "Dinners, and lunches other than on Day 3",
          "Offerings and donations at temples and monasteries",
          "Videography and photography beyond the defined session",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
    },
    related: ["E13", "S13", "S17", "S28", "S29"],
    faqs: [
      {
        q: "Why does the journey end at Gorakhpur?",
        a: "Kushinagar has an airport, but it has had no regular scheduled flights since November 2023. Gorakhpur, about an hour and a half away, has an airport with daily flights and a major railway junction.",
      },
      {
        q: "Can Shravasti be added?",
        a: "Yes. The Sarnath Kushinagar and Shravasti Pilgrimage adds Shravasti over two more nights and ends in Lucknow.",
      },
      {
        q: "Is three nights enough?",
        a: "It is a compact version with one long road day, giving Kushinagar an evening and a morning. A second night in Kushinagar makes the pace gentler and can be requested.",
      },
    ],
    hero: "sarnath-dhamek-stupa",
    gallery: ["varanasi-boat-sunrise", "varanasi-river-mist", "village-life"],
    seo: {
      title: "Sarnath and Kushinagar Buddhist Journey, 4 Days",
      description:
        "A compact four-day Buddhist journey in Uttar Pradesh: Sarnath, where the Buddha first taught, and Kushinagar, the place of his parinirvana, ending at Gorakhpur.",
    },
  },

  /* ------------------------------------------------------------------ P12 (published) */
  {
    id: "P12",
    slug: "sarnath-kushinagar-shravasti",
    status: "published",
    setup: "Priority launch candidate after supplier validation",
    title: "Sarnath Kushinagar and Shravasti Pilgrimage",
    route: "An Uttar Pradesh Buddhist journey: Sarnath, Kushinagar and Shravasti, from Varanasi to Lucknow",
    destinations: ["varanasi", "sarnath", "kushinagar", "shravasti"],
    types: ["buddhist"],
    nights: 5,
    days: 6,
    durationNote: "Suggested six-day version; an extra night in Kushinagar or Shravasti can be requested",
    overnights: [
      { place: "Varanasi (for Sarnath)", nights: 2 },
      { place: "Kushinagar", nights: 2 },
      { place: "Shravasti", nights: 1 },
    ],
    suits:
      "Buddhist pilgrims, monastic and lay groups, and travellers drawn to the life of the Buddha who are comfortable with two long road days. Parents and older travellers can manage it with the Premium or Luxury assistance, or with an extra night added.",
    style:
      "A private, driven journey across Uttar Pradesh: site visits in the cool of the morning, time for sitting or chanting where each place allows, and rest built around the two road days.",
    summary:
      "Five nights from Varanasi to Lucknow: the deer park at Sarnath where the Buddha first taught, Kushinagar, the place of his parinirvana, and the Jetavana grove at Shravasti.",
    lead:
      "This is a suggested six-day version of the Uttar Pradesh Buddhist journey. It begins in Varanasi, with a quiet hour on the Ganga and a morning at Sarnath, where the Buddha gave his first teaching. Two road days then carry you north to Kushinagar, the place of his parinirvana, and west to Shravasti, where he spent many rainy seasons at the Jetavana monastery. Time for sitting, chanting or simply resting is part of each day, and the journey ends with a drive to Lucknow for onward connections.",
    gateways: {
      arrival:
        "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), about 45 minutes to an hour from most hotels, or Varanasi Junction and Banaras railway stations.",
      departure:
        "Lucknow: Chaudhary Charan Singh International Airport or the city's main railway stations, about four hours by road from Shravasti. Gonda Junction and Balrampur stations are closer for some trains, and Ayodhya airport can suit some flight schedules.",
      timingWarning:
        "Day 6 ends with about four hours on the road to Lucknow, so a flight or train after about 7 pm keeps the Shravasti morning intact; an earlier departure means leaving Shravasti soon after breakfast or adding a night in Lucknow. As of October 2026, Kushinagar airport has no regular scheduled flights and Shravasti airport's service has been limited, so we do not plan around either unless a current schedule is confirmed. Winter fog can delay roads, flights and trains in December and January.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrive in Varanasi",
        place: "Varanasi",
        photo: "arrival-welcome",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station and takes you to the hotel. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest after the journey", text: "Nothing is fixed today, so a late or delayed arrival costs you no visit. Your coordinator calls to go through the week, dress for the sites and the timings for tomorrow morning." },
          { kind: "free", time: "Evening", title: "A quiet first evening", text: "Dinner at the hotel or nearby. An evening on the river can be added if you wish; it is not part of this journey's base programme." },
        ],
      },
      {
        day: 2,
        title: "The river at first light and Sarnath",
        place: "Varanasi and Sarnath",
        photo: "sarnath-dhamek-stupa",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "On the Ganga at first light", text: "A quiet hour along the ghats as the city wakes: a shared scheduled ride at Standard, a private boat with a guide at Premium and Luxury. River operation depends on water levels and local orders on the day." },
          { kind: "rest", time: "Mid-morning", title: "Breakfast and a pause", text: "Back to the hotel for breakfast before the drive of about half an hour to Sarnath, north of the city." },
          { kind: "visit", time: "Late morning", title: "Sarnath", text: "The deer park where the Buddha gave his first teaching to five companions. Walk the grounds around the Dhamek Stupa and the ruins of the old monasteries, visit the modern Mulagandha Kuti Vihara, and see the Ashokan lion capital in the Archaeological Museum, which is closed on Fridays." },
          { kind: "rest", time: "Afternoon", title: "Time to sit or rest", text: "Return to the hotel for lunch and rest, or stay on for quiet sitting in the Sarnath gardens. The Chaukhandi Stupa, where by tradition the Buddha met his first companions again, is on the way back." },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Kushinagar",
        place: "On the road to Kushinagar",
        photo: "private-car",
        overnight: "Kushinagar",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive north to Kushinagar", text: "About 240 to 260 km, usually five to six hours with stops for tea and lunch. The roads are mostly highway, slower through towns." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "Time to settle in after the drive." },
          { kind: "visit", time: "Late afternoon", title: "First visit to the Mahaparinirvana Temple", text: "An unhurried first visit to the temple of the reclining Buddha and the stupa behind it, in the softer evening light. Pilgrim groups often chant here; voices stay low and shoes come off inside." },
        ],
      },
      {
        day: 4,
        title: "Kushinagar",
        place: "Kushinagar",
        photo: "kushinagar-mahaparinirvana",
        overnight: "Kushinagar",
        blocks: [
          { kind: "visit", time: "Early morning", title: "The reclining Buddha at the quiet hour", text: "Return to the Mahaparinirvana Temple early for sitting or offerings before the day's groups arrive. The reclining image, about six metres long, dates from the 5th century and marks the Buddha's parinirvana." },
          { kind: "visit", time: "Morning", title: "Ramabhar Stupa and Mathakuar", text: "The great brick stupa at Ramabhar, which by tradition marks the place of the Buddha's cremation, and the shrine at Mathakuar with its seated Buddha image, a short drive apart." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "free", time: "Afternoon", title: "The monasteries of Kushinagar", text: "Temples built by Buddhist communities from Thailand, Japan, Myanmar, Tibet and elsewhere stand within a short distance of each other. Visit them at your own pace, or keep the afternoon for meditation." },
        ],
      },
      {
        day: 5,
        title: "Kushinagar to Shravasti",
        place: "On the road to Shravasti",
        photo: "village-life",
        overnight: "Shravasti",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive west to Shravasti", text: "About 240 to 255 km through the farmland of eastern Uttar Pradesh, usually five to six hours with stops. Parts of the route are on smaller roads." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "Shravasti is a small place with a short list of hotels; the actual property is confirmed in your quotation." },
          { kind: "visit", time: "Late afternoon", title: "Jetavana before sunset (if time allows)", text: "If the drive goes well, a first walk in the Jetavana grove in the evening light. Otherwise it waits for the morning." },
        ],
      },
      {
        day: 6,
        title: "Shravasti and on to Lucknow",
        place: "Shravasti",
        photo: "sarnath-monks",
        overnight: "Departure day",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Jetavana", text: "The monastery garden given to the Buddha by the merchant Anathapindika, where he spent many rainy seasons. Walk the brick foundations of the Gandhakuti, his dwelling, and sit beneath the Anandabodhi tree." },
          { kind: "visit", time: "Morning", title: "Maheth, the old city", text: "The ruins of ancient Shravasti nearby, with the mounds known as Angulimala's stupa and Anathapindika's stupa. The Shobhnath temple mound here is revered by Jains as the birthplace of Sambhavanath." },
          { kind: "travel", time: "After lunch", title: "Drive to Lucknow", text: "About 170 km, usually four hours, for an evening flight or train. Gonda or Balrampur stations, or Ayodhya airport, are closer if your connection suits them." },
          { kind: "departure", time: "Evening", title: "Departure", text: "Your driver drops you at the airport or station. If you prefer not to travel the same day, a night in Lucknow can be added." },
        ],
      },
    ],
    practical: {
      walking:
        "Sarnath, Kushinagar and Shravasti are largely flat, but each visit involves one to two kilometres on brick paths, lawns and uneven ruins. Shoes come off inside temples and shrines, so socks help on hot or cold stone.",
      earlyStarts:
        "The Day 2 boat leaves around sunrise, between about 5.30 and 6.30 am depending on the season, and the early visits at Kushinagar and Jetavana are by choice. Road days start after breakfast, around 8 am.",
      boarding: VARANASI_BOATS,
      mobility:
        "The road days are long, about five to six hours each, so a comfortable vehicle and regular stops matter more than speed. Ruins have uneven ground and few ramps; wheelchair users and guests with limited mobility should tell us early so we can assess each site. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the main season, with pleasant days and cold mornings; December and January bring fog that can slow roads and delay flights and trains. April to June is very hot, so visits keep to early morning and late afternoon. July to September is monsoon. Kushinagar and Shravasti are busiest with pilgrim groups in winter and around Buddha Purnima.",
    },
    tiers: {
      standard: {
        hotels: "Selected 3-star hotels in Varanasi, Kushinagar and Shravasti. Hotel choice in Kushinagar and Shravasti is limited; the actual property and room are named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "A shared scheduled sunrise boat ride in Varanasi on Day 2. It can be upgraded to a private boat.",
        darshan: "Not a darshan itinerary. Visits to the stupas, temples and monasteries are planned into each day, with timings set around opening hours and the heat.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver takes you to each site but is not a guide; a specialist guide at Sarnath, Kushinagar or Shravasti can be added.",
        admissions: "Entry tickets at the protected sites in Sarnath and Shravasti, and at the Sarnath museum, are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route, including both road days and the Lucknow drive", state: "included", mandatory: true },
          { item: "S06", day: 2, session: "Day 2 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Lunches and dinners",
          "Sightseeing and specialist guides",
          "Entry tickets and camera fees at protected sites and the Sarnath museum",
          "Offerings, donations and tips",
          "Porterage, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        hotels: "Selected 4-star hotels in Varanasi, Kushinagar and Shravasti where they exist. Kushinagar and especially Shravasti have few hotels of this category; where none is available we say so in your quotation and propose the closest suitable option.",
        vehicle: `${VEHICLE.premium} More room and comfort for the two long road days.`,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private rowing boat with a guide for the Day 2 sunrise, replacing the shared ride.",
        darshan: "Not a darshan itinerary. Your guides at Sarnath and Kushinagar accompany the site visits and explain each place.",
        assistance: "A named coordinator throughout, a team member to welcome you on arrival, and the guided visits listed below.",
        guide: "A specialist guide for the Sarnath visit (Day 2) and a guide for the Kushinagar sites (Day 4). Shravasti is visited without a guide unless one is added.",
        admissions: "Entry tickets for the guided visit at Sarnath, including the museum, are included. Shravasti entry tickets are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Vehicle group upgraded to an MPV/SUV, such as an Innova Crysta or equivalent; the actual vehicle is confirmed in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Private rowing boat with a guide along the ghats at first light, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E24", day: 2, session: "Day 2 late morning", scope: "Sarnath with a specialist guide, about two and a half hours, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", day: 4, session: "Day 4 morning", scope: "Guide for the Mahaparinirvana Temple, Ramabhar Stupa and Mathakuar, about three hours", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Lunches and dinners",
          "A guide at Shravasti",
          "Entry tickets at Shravasti, and camera fees",
          "Offerings, donations and tips",
          "Porterage, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        hotels: "Selected 4/5-star, heritage or boutique properties where available. Varanasi offers the widest choice; in Kushinagar and Shravasti the most suitable property available may be below 4-star. The actual category and room are disclosed in your quotation.",
        vehicle: `${VEHICLE.luxury} On the rural stretch to Shravasti an SUV is often the better choice.`,
        meals: "Breakfast daily, plus lunch on the two road days (Day 3 and Day 5) at a suitable stop or packed by the hotel. Other meals are not included; dietary needs are passed to each hotel.",
        boat: "The highest suitable boat for the Day 2 sunrise: a private motorboat or covered boat where one is actually available and suitable, otherwise a private rowing boat, with a guide.",
        darshan: "Not a darshan itinerary. Your concierge plans each site visit around opening hours, crowds and any chanting or meditation time you wish to keep; no special access is promised.",
        assistance: `${ASSIST_LUXURY} Your host travels with you from Day 2 to Day 6.`,
        guide: "Specialist guides at Sarnath (Day 2), Kushinagar (Day 4) and Shravasti (Day 6).",
        admissions: "Entry tickets for all listed site visits, including the Sarnath museum, are included.",
        photography: "A defined professional photography session of about two hours at Kushinagar, or at Sarnath if you prefer, with the number of edited images and delivery time stated in your quotation. Photography inside shrines follows each site's rules.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the premium vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Premium vehicle group: Fortuner, Mercedes or suitable alternative chosen for the party and these roads", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 6"),
          { item: "S10", session: "Day 2 to Day 6", scope: "Personal host travelling with you on site days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Sunrise on the highest suitable boat with a guide: a private motorboat or covered boat where one is actually available and suitable, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E24", day: 2, session: "Day 2 late morning", scope: "Sarnath with a specialist guide, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", session: "Day 4 and Day 6 mornings", quantity: 2, scope: "Specialist guides for the Kushinagar sites, and for Jetavana and Maheth at Shravasti, about three hours each, including entry tickets", state: "included", mandatory: false },
          { item: "S24", day: 4, session: "Day 4", scope: "Professional photography session of about two hours at Kushinagar, or at Sarnath if preferred; edited image count and delivery time stated in your quotation; consent asked before any photographs of you are taken", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 6", scope: "Dietary requirements relayed to every hotel, and lunch stops on Day 3 and Day 5 reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Dinners, and lunches other than on Day 3 and Day 5",
          "Offerings and donations at temples and monasteries",
          "Videography and photography beyond the defined session",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
    },
    related: ["E24", "E13", "S13", "S17", "S28", "S29"],
    faqs: [
      {
        q: "Why does the journey end in Lucknow?",
        a: "Kushinagar and Shravasti both have airports, but as of October 2026 neither has a reliable regular scheduled service. Lucknow, about four hours from Shravasti, has good flight and train links. If a current schedule at Kushinagar, Shravasti or Ayodhya suits you better, we will plan around it.",
      },
      {
        q: "How long are the road days?",
        a: "Day 3 (Varanasi to Kushinagar) and Day 5 (Kushinagar to Shravasti) are each about five to six hours with stops, and Day 6 ends with about four hours to Lucknow. If that is too much, ask for a slower version with an extra night, for example a second night in Shravasti.",
      },
      {
        q: "Is a guide included at every site?",
        a: "Not at Standard: your driver takes you to each place but is not a guide. Premium includes a specialist guide at Sarnath and a guide at Kushinagar, and Luxury adds Shravasti. A guide can be added to any visit at any tier, and language assistance can be requested for groups who prefer another language.",
      },
      {
        q: "Can Lumbini be added?",
        a: "Lumbini is in Nepal, so it is not part of this Uttar Pradesh journey. We can discuss it as a separate extension enquiry, with its own border crossing, documents and extra days, quoted separately.",
      },
    ],
    hero: "shravasti-jetavana",
    gallery: ["varanasi-boat-sunrise", "travel-host", "varanasi-river-mist"],
    seo: {
      title: "Sarnath, Kushinagar and Shravasti Buddhist Pilgrimage",
      description:
        "Six days across Uttar Pradesh to Sarnath, Kushinagar and Shravasti, three places in the life of the Buddha, from Varanasi to Lucknow at an unhurried pace.",
    },
  },

  /* ------------------------------------------------------------------ P13 */
  {
    id: "P13",
    slug: "extended-uttar-pradesh-buddhist-pilgrimage",
    status: "draft",
    setup: "Publish only after exact route and sites are approved",
    title: "Extended Uttar Pradesh Buddhist Pilgrimage",
    route: "Sarnath, Kushinagar, Shravasti, Sankisa and any additional specifically approved sites",
    destinations: ["varanasi", "sarnath", "kushinagar", "shravasti", "sankisa"],
    types: ["buddhist"],
    nights: 8,
    days: 9,
    durationNote: "7N/8D to 8N/9D. Shown as 8N/9D; a 7N/8D version keeps one night in Shravasti. Route, sites and gateway subject to approval.",
    overnights: [
      { place: "Varanasi (for Sarnath)", nights: 2 },
      { place: "Kushinagar", nights: 2 },
      { place: "Shravasti", nights: 2 },
      { place: "Lucknow", nights: 1 },
      { place: "Near Sankisa (to be confirmed)", nights: 1 },
    ],
    suits:
      "Buddhist pilgrims and groups who want the principal places of the Buddha's life in Uttar Pradesh, including Sankisa, and have the time for long road days with rest between them.",
    style:
      "A long private journey across Uttar Pradesh from east to west, with two nights at each of the main sites and a simpler stay near Sankisa.",
    summary:
      "Eight nights to Sarnath, Kushinagar, Shravasti and Sankisa, the Buddha's places in Uttar Pradesh, with rest between long road days and a route still to be approved.",
    lead:
      "This proposed extended journey follows the Buddha's places across Uttar Pradesh from east to west. After Sarnath, where he first taught, it spends two nights each at Kushinagar, the place of his parinirvana, and Shravasti, where he spent many rainy seasons, then continues by way of Lucknow to Sankisa, where by tradition he descended to earth after teaching in the Tavatimsa heaven. The exact route, any additional sites, the overnights and the departure gateway are all subject to approval.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "To be fixed with the route. Agra, Lucknow or Kanpur are the likeliest after Sankisa, each several hours by road.",
      timingWarning:
        "Day 9 is largely a road day, so plan an evening flight or train. Kushinagar and Shravasti airports have had little or no regular scheduled service, and accommodation near Sankisa is limited, so the final route, overnights and gateway are confirmed before this journey is offered.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrive in Varanasi",
        place: "Varanasi",
        photo: "arrival-welcome",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon and evening", title: "Rest", text: "Nothing is fixed today. Your coordinator calls to go through the journey." },
        ],
      },
      {
        day: 2,
        title: "The river at first light and Sarnath",
        place: "Varanasi and Sarnath",
        photo: "sarnath-dhamek-stupa",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "On the Ganga at first light", text: "A shared scheduled ride at Standard, a private boat with a guide at Premium and Luxury, subject to river conditions." },
          { kind: "visit", time: "Late morning", title: "Sarnath", text: "The deer park of the first teaching: the Dhamek Stupa, the monastery ruins, the Mulagandha Kuti Vihara and the Archaeological Museum, which is closed on Fridays." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Back to the hotel, or quiet time in the Sarnath gardens." },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Kushinagar",
        place: "On the road to Kushinagar",
        photo: "private-car",
        overnight: "Kushinagar",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive north to Kushinagar", text: "About 240 to 260 km, usually five to six hours with stops." },
          { kind: "visit", time: "Late afternoon", title: "The Mahaparinirvana Temple", text: "A first visit to the reclining Buddha in the evening light." },
        ],
      },
      {
        day: 4,
        title: "Kushinagar",
        place: "Kushinagar",
        photo: "sarnath-monks",
        overnight: "Kushinagar",
        blocks: [
          { kind: "visit", time: "Early morning", title: "The reclining Buddha at the quiet hour", text: "Sitting or offerings at the Mahaparinirvana Temple before the day's groups arrive." },
          { kind: "visit", time: "Morning", title: "Ramabhar Stupa and Mathakuar", text: "The stupa that by tradition marks the cremation, and the shrine of the seated Buddha at Mathakuar." },
          { kind: "rest", time: "Afternoon", title: "Rest or the monasteries", text: "Time for meditation, or the temples built by Buddhist communities from across Asia." },
        ],
      },
      {
        day: 5,
        title: "Kushinagar to Shravasti",
        place: "On the road to Shravasti",
        photo: "village-life",
        overnight: "Shravasti",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive west to Shravasti", text: "About 240 to 255 km, usually five to six hours with stops, partly on smaller roads." },
          { kind: "rest", time: "Evening", title: "Rest", text: "A free evening after the drive." },
        ],
      },
      {
        day: 6,
        title: "Shravasti",
        place: "Shravasti",
        photo: "shravasti-jetavana",
        overnight: "Shravasti",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Jetavana", text: "The monastery garden given by Anathapindika: the Gandhakuti, the Anandabodhi tree and the brick foundations of the old monasteries." },
          { kind: "visit", time: "Late morning", title: "Maheth, the old city", text: "The mounds known as Angulimala's stupa and Anathapindika's stupa, and the Shobhnath temple mound revered by Jains." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "A second night here keeps this day unhurried." },
        ],
      },
      {
        day: 7,
        title: "Shravasti to Lucknow",
        place: "Lucknow",
        photo: "lucknow-rumi-darwaza",
        overnight: "Lucknow",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Lucknow", text: "About 170 km, usually four hours, breaking the long journey west." },
          { kind: "rest", time: "Afternoon and evening", title: "Rest in Lucknow", text: "A free afternoon in the city." },
        ],
      },
      {
        day: 8,
        title: "Lucknow to Sankisa",
        place: "Sankisa",
        photo: "car-premium",
        overnight: "Near Sankisa (to be confirmed)",
        blocks: [
          { kind: "travel", time: "Early, after breakfast", title: "Drive to Sankisa", text: "A long drive west into Farrukhabad district, usually five to six hours; the exact route is part of the approval." },
          { kind: "visit", time: "Afternoon", title: "Sankisa", text: "The village site where, by tradition, the Buddha descended after teaching in the Tavatimsa heaven. A Mauryan elephant capital from an Ashokan pillar stands here, beside an old stupa mound now topped by a temple, with monasteries built nearby." },
          { kind: "rest", time: "Evening", title: "A simple overnight", text: "Accommodation near Sankisa is limited; the stay is confirmed when the route is approved." },
        ],
      },
      {
        day: 9,
        title: "Onward for departure",
        place: "On the road",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to the departure gateway", text: "Several hours by road to Agra, Lucknow or Kanpur, depending on the gateway approved for this journey." },
          { kind: "departure", time: "Evening", title: "Departure", text: "Your driver drops you for your onward flight or train." },
        ],
      },
    ],
    practical: {
      walking:
        "The sites are largely flat, but each involves one to two kilometres on brick paths, lawns and uneven ruins. Sankisa's mound has an uneven climb to the temple at the top.",
      earlyStarts: "The Day 2 boat leaves around sunrise, and several road days start soon after breakfast.",
      boarding: VARANASI_BOATS,
      mobility:
        "Five road days, three of them long, make this a demanding journey. Ruins have uneven ground and few ramps; tell us about mobility needs early. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the main season, with fog in December and January that can slow roads and delay flights. April to June is very hot; July to September is monsoon. The sites are busiest with pilgrim groups in winter and around Buddha Purnima.",
    },
    tiers: {
      standard: {
        hotels: "Selected 3-star hotels where they exist. Kushinagar, Shravasti and especially the Sankisa area have limited choice; the actual properties are named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all eight hotel nights. Lunches and dinners are not included.",
        boat: "A shared scheduled sunrise boat ride in Varanasi on Day 2. It can be upgraded to a private boat.",
        darshan: "Not a darshan itinerary. Site visits are planned around opening hours and the heat.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver is not a guide.",
        admissions: "Entry tickets at protected sites and the Sarnath museum are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "the approved departure airport or station"),
          { item: "S02", session: "Day 1 to Day 9", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route", state: "included", mandatory: true },
          { item: "S06", day: 2, session: "Day 2 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
        ],
        excluded: [
          "Flights and trains to Varanasi and from the departure gateway",
          "Lunches and dinners",
          "Sightseeing and specialist guides",
          "Entry tickets and camera fees",
          "Offerings, donations and tips",
          "Travel insurance",
        ],
      },
      premium: {
        hotels: "Selected 4-star hotels where they exist. Kushinagar, Shravasti and the Sankisa area have few or none of this category; we say so in your quotation and propose the closest suitable option.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private rowing boat with a guide for the Day 2 sunrise, replacing the shared ride.",
        darshan: "Not a darshan itinerary. Your guides accompany the guided site visits.",
        assistance: "A named coordinator throughout, a welcome on arrival, and guided visits at Sarnath, Kushinagar and Sankisa.",
        guide: "A specialist guide at Sarnath (Day 2) and guides at Kushinagar (Day 4) and Sankisa (Day 8).",
        admissions: "Entry tickets for the guided visits are included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "the approved departure airport or station"),
          { item: "S02", session: "Day 1 to Day 9", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 9", scope: "Vehicle group upgraded to an MPV/SUV, such as an Innova Crysta or equivalent", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Private rowing boat with a guide along the ghats at first light", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E24", day: 2, session: "Day 2 late morning", scope: "Sarnath with a specialist guide, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", session: "Day 4 and Day 8", quantity: 2, scope: "Guides for the Kushinagar sites and for Sankisa, where a guide is available", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from the departure gateway",
          "Lunches and dinners",
          "A guide at Shravasti",
          "Offerings, donations and tips",
          "Travel insurance",
        ],
      },
      luxury: {
        hotels: "Selected 4/5-star, heritage or boutique properties where available. Outside Varanasi and Lucknow the most suitable property available may be well below this category; the actual category and room are disclosed in your quotation.",
        vehicle: `${VEHICLE.luxury} An SUV is usually the better choice for the rural roads on this route.`,
        meals: "Breakfast daily, plus lunch on the long road days (Day 3, Day 5 and Day 8). Other meals are not included.",
        boat: "The highest suitable boat for the Day 2 sunrise, with a guide, where boats are operating.",
        darshan: "Not a darshan itinerary. Your concierge plans each visit around opening hours, crowds and any chanting or meditation time you wish to keep; no special access is promised.",
        assistance: ASSIST_LUXURY,
        guide: "Specialist guides at Sarnath, Kushinagar, Shravasti and Sankisa.",
        admissions: "Entry tickets for all listed site visits are included.",
        photography: "A defined professional photography session of about two hours at Kushinagar or Shravasti, with edited image count and delivery time stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "the approved departure airport or station"),
          { item: "S02", session: "Day 1 to Day 9", scope: "Private chauffeured transport for the whole route in the premium vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 9", scope: "Premium vehicle group: Fortuner, Mercedes or suitable alternative chosen for the party and route", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 9"),
          { item: "S10", session: "Day 2 to Day 9", scope: "Personal host travelling with you on site days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Sunrise on the highest suitable boat with a guide, a private motorboat or covered boat where actually available, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E24", day: 2, session: "Day 2 late morning", scope: "Sarnath with a specialist guide, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", session: "Day 4, Day 6 and Day 8", quantity: 3, scope: "Specialist guides for Kushinagar, Shravasti and Sankisa, including entry tickets", state: "included", mandatory: false },
          { item: "S24", day: 6, session: "Day 6", scope: "Professional photography session of about two hours at Shravasti or Kushinagar; edited image count and delivery time stated in your quotation", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 9", scope: "Dietary requirements relayed to every hotel, and lunch stops on the road days reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from the departure gateway",
          "Dinners, and lunches other than on the listed road days",
          "Offerings and donations at temples and monasteries",
          "Videography and photography beyond the defined session",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
    },
    related: ["E13", "S13", "S17", "S28", "S29", "S16"],
    faqs: [
      {
        q: "Why does Sankisa add two days?",
        a: "Sankisa lies far to the west of the other sites, in Farrukhabad district, so reaching it means a night in Lucknow, a long road day and a simple overnight nearby before the onward drive.",
      },
      {
        q: "Can other sites be added?",
        a: "Additional sites are included only when they are specifically approved for this journey and fit a realistic route. Tell us which places matter to you and we will advise on time and roads.",
      },
      {
        q: "Is Lumbini part of this journey?",
        a: "No. Lumbini is in Nepal and is never part of an Uttar Pradesh journey. It can be discussed as a separate extension enquiry, quoted on its own.",
      },
    ],
    hero: "kushinagar-mahaparinirvana",
    gallery: ["varanasi-boat-sunrise", "varanasi-river-mist", "travel-host"],
    seo: {
      title: "Extended Uttar Pradesh Buddhist Pilgrimage, 9 Days",
      description:
        "Nine days to Sarnath, Kushinagar, Shravasti and Sankisa, the Buddha's places in Uttar Pradesh, with rest between long road days. Route subject to approval.",
    },
  },
];
