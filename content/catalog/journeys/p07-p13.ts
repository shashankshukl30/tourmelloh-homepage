import type { InclusionLine, Journey } from "../types";

/*
 * P07-P13 from the client brief v5 (31 Oct 2026), section 3, aligned with the client's
 * 3-tier package document of 31 October 2026 (tier lines, day plans and overnights).
 * All seven are published at the client's request. Hotels and vehicles stay "subject to availability
 * and named in your quotation"; small pilgrim towns get "best available premium property" wording.
 * Gateway facts checked October 2026: Kushinagar airport has had no regular scheduled flights since
 * November 2023; Shravasti airport has had little or no scheduled service; Chitrakoot airport's passenger
 * flights have been suspended since December 2024. Re-check these before each season.
 */

/* Tier wording shared across these journeys, from the client's tier framework (31 Oct 2026). */
const VEHICLE = {
  standard:
    "Private air-conditioned sedan, such as a Dzire or Etios, with a driver, sized to your party and luggage. The driver is not a sightseeing guide. The vehicle is subject to availability and named in your quotation.",
  standardGroup:
    "Private air-conditioned sedan, or an air-conditioned Tempo Traveller for larger groups, with a driver. The driver is not a sightseeing guide. The vehicle is subject to availability and named in your quotation.",
  premium:
    "Air-conditioned Innova Crysta or similar SUV with an experienced chauffeur, subject to availability and named in your quotation.",
  luxury:
    "A luxury SUV, such as a Fortuner, Mercedes or suitable alternative, with a chauffeur throughout, selected to suit your party and this route. The vehicle is subject to availability and named in your quotation.",
};
const ASSIST_STANDARD =
  "A named remote coordinator, by phone and WhatsApp, before and during the journey. No accompanying host.";
const ASSIST_LUXURY =
  "A dedicated travel concierge for the whole journey, a personal host for the listed days and support hours agreed in your quotation. This is not unlimited round-the-clock cover.";
const PHOTO_OPTIONAL = "Optional. A professional photography session can be added.";
const SECURITY_ON_REQUEST = "On request, quoted separately.";
const SECURITY_LUXURY =
  "Included when requested, applicable and expressly accepted in your final quotation. It never means queue-clearing or special access.";
const PRIORITY_NOTE =
  "Priority or VIP darshan is booked only where the temple's official arrangements allow, and no darshan time is promised.";

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
    status: "published",
    setup: "Route validation before publication",
    title: "Varanasi, Prayagraj and Chitrakoot",
    route: "Varanasi, Prayagraj and Chitrakoot by road, returning to Prayagraj or Varanasi for departure",
    destinations: ["varanasi", "sarnath", "prayagraj", "chitrakoot"],
    types: ["hindu-pilgrimage"],
    nights: 5,
    days: 6,
    durationNote: "5N/6D. The last night is in Prayagraj or Varanasi, whichever suits your departure",
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Prayagraj", nights: 1 },
      { place: "Chitrakoot", nights: 1 },
      { place: "Prayagraj or Varanasi", nights: 1 },
    ],
    suits:
      "Hindu pilgrims and families who want Kashi and the Sangam together with Chitrakoot, the forested hills where Ram, Sita and Lakshman are believed to have spent much of their exile. Comfortable for most ages, with the Kamadgiri parikrama walked in full, in part or not at all.",
    style:
      "A private, driven pilgrimage at a steady pace: darshan and the river in Kashi, the Sangam at Prayagraj, and two full days at Chitrakoot's ghats, hills and ashrams.",
    summary:
      "Five nights on three sacred rivers: the Ganga at Kashi, the Sangam at Prayagraj and the Mandakini at Chitrakoot, with darshan, Sarnath, the Kamadgiri parikrama and the Ramghat aarti.",
    lead:
      "This six-day pilgrimage begins with two nights in Varanasi: the evening aarti at Dashashwamedh on arrival, then darshan at Kashi Vishwanath, a boat along the ghats and an afternoon at Sarnath. On Day 3 you drive to Prayagraj for a boat to the Triveni Sangam and a visit to Anand Bhawan. Chitrakoot follows, with Ramghat, the Kamadgiri parikrama and the Mandakini aarti, and a morning at Sphatik Shila, Sati Anusuya Ashram and Gupta Godavari before the drive back to Prayagraj or Varanasi.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Prayagraj airport or Prayagraj Junction, about three hours by road from Chitrakoot, or Varanasi airport and stations, about six hours from Chitrakoot, depending on where you spend the last night.",
      timingWarning:
        "Day 4 combines a drive of about three hours with Ramghat, the parikrama and the evening aarti, and Day 5 ends with the drive back, about three hours to Prayagraj or about six to Varanasi. Chitrakoot airport's passenger flights have been suspended since December 2024, so we do not plan around it unless a current schedule is confirmed. Arrive on Day 1 by mid-afternoon to see the evening aarti; winter fog can delay flights, trains and roads in December and January.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver and check in", text: "Your driver meets you at the airport or station and takes you to the hotel for check-in. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Time to settle in. Your coordinator calls to go through the week, temple dress and the timings for tomorrow morning." },
          { kind: "experience", time: "Around sunset", title: "Evening aarti at Dashashwamedh", text: "The Ganga aarti on the main ghat. At Standard you watch from the ghat steps, Premium arranges seating where it is available, and Luxury watches from a private boat. Crowds are heavy on festival nights." },
        ],
      },
      {
        day: 2,
        title: "Varanasi Spiritual Tour",
        place: "Varanasi and Sarnath",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          { kind: "experience", time: "Sunrise, about an hour", title: "Boat ride along the ghats", text: "A boat along the ghats as the city wakes: a shared scheduled ride at Standard, a private boat with a guide at Premium and Luxury, subject to river conditions." },
          { kind: "visit", time: "Morning", title: "Darshan at Kashi Vishwanath", text: "A planned visit through the temple corridor. Phones and bags are not allowed inside, and queues can take minutes or several hours; no darshan time is promised." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "visit", time: "Afternoon", title: "Excursion to Sarnath", text: "About half an hour north of the city, the deer park where the Buddha gave his first teaching: the Dhamek Stupa, the monastery ruins and the Archaeological Museum, which is closed on Fridays. Luxury guests visit with a specialist guide." },
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
          { kind: "experience", time: "Late morning", title: "Boat to the Triveni Sangam", text: "A boat from the ghats near the fort out to the meeting point of the Ganga and the Yamuna, where pilgrims bathe and offer flowers and lamps. Shared at Standard, private at Premium and Luxury, and subject to river conditions." },
          { kind: "rest", time: "Midday", title: "Check in and lunch", text: "A pause at the hotel." },
          { kind: "visit", time: "Afternoon", title: "Anand Bhawan", text: "The Nehru family home, now a museum of the freedom movement, with its rooms kept much as they were. It is closed on Mondays; if your Day 3 falls on one, we suggest a temple visit instead." },
        ],
      },
      {
        day: 4,
        title: "Prayagraj to Chitrakoot Excursion",
        place: "Chitrakoot",
        photo: "chitrakoot-ramghat",
        overnight: "Chitrakoot",
        blocks: [
          { kind: "travel", time: "Early, after breakfast", title: "Drive to Chitrakoot", text: "About 125 to 130 km south-west, usually three hours, into the low forested hills on the Uttar Pradesh and Madhya Pradesh border." },
          { kind: "visit", time: "Late morning", title: "Ramghat", text: "The stepped ghats on the Mandakini where, by tradition, Ram bathed during his exile. A short walk along the river before check-in and lunch." },
          { kind: "visit", time: "Afternoon", title: "Kamadgiri parikrama", text: "The forested hill at the centre of Chitrakoot's pilgrimage. The parikrama path is about 5 km and paved, and many pilgrims walk it barefoot; walk all of it, part of it, or offer darshan at the main entrance. Premium and Luxury guests walk it with a local guide." },
          { kind: "experience", time: "Around sunset", title: "Mandakini aarti at Ramghat", text: "The evening aarti on the steps of the Mandakini. Luxury guests watch from a small private boat where boats are operating." },
        ],
      },
      {
        day: 5,
        title: "Chitrakoot Sightseeing & Return",
        place: "Chitrakoot",
        photo: "private-car",
        overnight: "Prayagraj or Varanasi",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Sphatik Shila", text: "The riverside rock linked with Ram and Sita, an easy visit in the cool of the morning." },
          { kind: "visit", time: "Morning", title: "Sati Anusuya Ashram and Gupta Godavari", text: "A drive south to the ashram of Sati Anusuya beside the Mandakini, and on to the cave shrine of Gupta Godavari, where water runs underfoot inside the caves." },
          { kind: "rest", time: "Midday", title: "Lunch", text: "A break before the road." },
          { kind: "travel", time: "Afternoon", title: "Drive back to Prayagraj or Varanasi", text: "About three hours to Prayagraj, or about six hours to Varanasi if your departure is from there. We fix the choice with your onward connection." },
        ],
      },
      {
        day: 6,
        title: "Departure",
        place: "Prayagraj or Varanasi",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "departure", time: "At your departure time", title: "Final departure transfer", text: "Your driver drops you at the airport or station for your onward flight or train." },
        ],
      },
    ],
    practical: {
      walking:
        "Varanasi's lanes, ghat steps and temple queues mean a fair amount of walking and standing, and Sarnath involves a kilometre or two on paths and lawns. At Chitrakoot the Kamadgiri parikrama is about 5 km on a paved path, and Gupta Godavari has narrow cave passages with shallow water underfoot. Both are optional.",
      earlyStarts:
        "The Varanasi boat leaves around sunrise, between about 5.30 and 6.30 am depending on the season, and Day 4 starts soon after breakfast to fit the drive, Ramghat and the parikrama before the evening aarti.",
      boarding:
        "Boats in Varanasi, at the Sangam and at Ramghat board from ghat steps or riverbanks that can be steep, uneven and wet. Operation depends on water levels, weather and local orders, and is often suspended at the monsoon peak.",
      mobility:
        "Temple queues can mean long periods of standing, and some shrines have steps without rails. Tell us about mobility needs early so we can plan shorter visits, wheelchair assistance where it is practical and a host to stay close. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the most comfortable season, with cold and sometimes foggy mornings in December and January. April to June is very hot. July to September brings monsoon rain, high rivers and frequent boat suspensions. Festivals such as Diwali, Dev Deepawali, Ram Navami and the Magh Mela at Prayagraj bring large crowds and scarce rooms.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotels, a guesthouse in Chitrakoot",
          "Private AC sedan with driver",
          "Shared boats on the Ganga and at the Sangam",
        ],
        hotels: "Selected 3-star hotels in Varanasi and Prayagraj, and a clean guesthouse or simple hotel in Chitrakoot, which has a short list of places to stay. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "A shared scheduled sunrise boat ride in Varanasi on Day 2 and a shared boat to the Sangam on Day 3. Either can be upgraded to a private boat.",
        darshan: "Planned visits to Kashi Vishwanath and Kamadgiri, with timings, dress and queue advice from your coordinator. No accompaniment inside the temples.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver takes you to each place but is not a guide.",
        admissions: "General darshan at these temples is free. Entry tickets at Sarnath and Anand Bhawan, any paid darshan tickets and camera fees are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Prayagraj or Varanasi airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route, including the Sarnath excursion", state: "included", mandatory: true },
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Aarti viewing at Dashashwamedh Ghat from the ghat steps, with advice on when to arrive; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 sunrise", scope: "Shared scheduled boat ride along the ghats, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S06", day: 3, session: "Day 3 late morning", scope: "Shared boat from the ghat to the Triveni Sangam and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Prayagraj or Varanasi",
          "Lunches and dinners",
          "Sightseeing guides",
          "Entry tickets, paid darshan tickets and camera fees",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        highlights: [
          "4-star hotels, best available resort in Chitrakoot",
          "AC Innova Crysta or similar SUV with chauffeur",
          "Guided Kamadgiri parikrama with a local guide",
          "Private boats on the Ganga and at the Sangam",
        ],
        hotels: "Selected 4-star hotels in Varanasi and Prayagraj, and the best available resort in Chitrakoot, which has few hotels of this category. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private rowing boat with a guide for the Day 2 sunrise and a private boat to the Sangam on Day 3, replacing the shared rides.",
        darshan: `Accompanied darshan assistance at Kashi Vishwanath and Kamadgiri, within each temple's rules. ${PRIORITY_NOTE}`,
        assistance: "A named coordinator throughout, a welcome on arrival, accompanied darshan and a local guide for the two Chitrakoot days.",
        guide: "A local guide for the Kamadgiri parikrama and Ramghat (Day 4) and for Sphatik Shila, Sati Anusuya Ashram and Gupta Godavari (Day 5). Varanasi and Prayagraj visits are accompanied for darshan but not guided.",
        admissions: "General darshan is free. Entry tickets at Sarnath and Anand Bhawan are paid locally; paid darshan tickets are booked separately where available.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Prayagraj or Varanasi airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Vehicle group upgraded to an Innova Crysta or similar SUV, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Seating for the evening aarti where an arranged viewing place is available; otherwise standing room on the ghat steps", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Private rowing boat with a guide along the ghats at first light, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "S06", day: 3, session: "Day 3 late morning", scope: "Private boat from the ghat to the Triveni Sangam and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S08", session: "Day 2 and Day 4", quantity: 2, scope: "Accompanied darshan assistance at Kashi Vishwanath and Kamadgiri: queues, lockers, footwear and timings. Official paid darshan tickets are booked separately where available", state: "included", mandatory: false },
          { item: "S12", session: "Day 4 and Day 5", quantity: 2, scope: "Local guide for Ramghat and the Kamadgiri parikrama (Day 4), and for Sphatik Shila, Sati Anusuya Ashram and Gupta Godavari (Day 5)", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Prayagraj or Varanasi",
          "Lunches and dinners",
          "Guides in Varanasi, Sarnath and Prayagraj",
          "Entry tickets and paid darshan tickets",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        highlights: [
          "5-star in Varanasi, premium stays in Prayagraj",
          "Best available premium resort in Chitrakoot",
          "Luxury SUV with a chauffeur throughout",
          "Private priest for darshan and prayers throughout",
          "Private boats and guided Sarnath and Chitrakoot",
        ],
        hotels: "A 5-star hotel in Varanasi, a premium hotel in Prayagraj and the best available premium property or resort in Chitrakoot, which has no 5-star hotels. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on the two Chitrakoot days (Day 4 and Day 5). Other meals are not included; dietary needs are passed to each hotel.",
        boat: "A private boat for the Day 1 evening aarti, the highest suitable boat for the Day 2 sunrise, a private boat to the Sangam and a small private boat at Ramghat, each where boats are operating.",
        darshan: `A private priest with you at Kashi Vishwanath, the Sangam and Kamadgiri, and dedicated coordination at each temple within its rules. ${PRIORITY_NOTE}`,
        assistance: ASSIST_LUXURY,
        guide: "A specialist guide at Sarnath (Day 2), a guide for the Sangam and Anand Bhawan (Day 3) and a local guide for both Chitrakoot days (Day 4 and Day 5).",
        admissions: "Entry and ticketed sites on all listed visits, including Sarnath and Anand Bhawan, are included; paid darshan tickets are booked where the temple offers them.",
        photography: "A defined professional photography session of about two hours on the Day 2 sunrise boat and the ghats, with edited image count and delivery time stated in your quotation. No photographs inside temples.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Prayagraj or Varanasi airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the luxury vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Luxury SUV: Fortuner, Mercedes or suitable alternative chosen for the party and route, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 6"),
          { item: "S10", session: "Day 1 to Day 6", scope: "Personal host with you on visit days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "S19", session: "Day 2 to Day 5", scope: "A private priest who guides darshan and prayers at Kashi Vishwanath, the Triveni Sangam, Kamadgiri and the Mandakini, on the days agreed in your quotation. Puja materials and offerings are itemised in your quotation", state: "included", mandatory: false },
          { item: "E13", day: 1, session: "Day 1 evening", scope: "Evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "E12", day: 2, session: "Day 2 sunrise", scope: "Sunrise on the highest suitable boat with a guide: a private motorboat or covered boat where one is actually available and suitable, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day2-dawn" },
          { item: "E24", day: 2, session: "Day 2 afternoon", scope: "Sarnath with a specialist guide, about two and a half hours, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S06", day: 3, session: "Day 3 late morning", scope: "Private boat to the Triveni Sangam and back, motorboat or rowing boat as conditions suit", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S06", day: 4, session: "Day 4 evening", scope: "Small private rowing boat at Ramghat for the Mandakini aarti, where boats are operating", state: "included", mandatory: false, replacementGroup: "boat-day4-ramghat" },
          { item: "S08", session: "Day 2 and Day 4", quantity: 2, scope: "Dedicated darshan coordination and accompaniment at Kashi Vishwanath and Kamadgiri, within each temple's rules", state: "included", mandatory: false },
          { item: "S12", session: "Day 3 to Day 5", quantity: 3, scope: "Guides for the Sangam and Anand Bhawan (Day 3) and for both Chitrakoot days, including the Kamadgiri parikrama (Day 4 and Day 5)", state: "included", mandatory: false },
          { item: "S24", day: 2, session: "Day 2 sunrise", scope: "Professional photography session of about two hours on the boat and ghats; edited image count and delivery time stated in your quotation; consent asked first", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 6", scope: "Dietary requirements, including sattvic or Jain meals, relayed to every hotel; restaurant reservations made where you wish", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Prayagraj or Varanasi",
          "Dinners, and lunches other than on Day 4 and Day 5",
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
        a: "As demanding as you choose. The Kamadgiri parikrama is about 5 km on a paved path, and Gupta Godavari has narrow passages with shallow water underfoot. Each is optional, and darshan at Kamadgiri's main entrance takes only a short walk. Hanuman Dhara, a hillside spring up a long flight of steep steps, can be added for those who want the climb.",
      },
      {
        q: "Do we end in Prayagraj or Varanasi?",
        a: "Whichever suits your onward connection. Prayagraj is about three hours from Chitrakoot and Varanasi about six, so we fix the last night once your flight or train is known. Chitrakoot airport's passenger flights have been suspended since December 2024, so we do not plan around it.",
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
        "Six days from Kashi and Sarnath to the Sangam at Prayagraj and the sacred hills of Chitrakoot, with river mornings, darshan and the Kamadgiri parikrama.",
    },
  },

  /* ------------------------------------------------------------------ P08 */
  {
    id: "P08",
    slug: "varanasi-prayagraj-chitrakoot-ayodhya",
    status: "published",
    setup: "Route validation before publication",
    title: "Varanasi, Prayagraj, Chitrakoot and Ayodhya",
    route: "Extended four-destination pilgrimage: Varanasi, Prayagraj, Chitrakoot and Ayodhya by road",
    destinations: ["varanasi", "sarnath", "prayagraj", "chitrakoot", "ayodhya"],
    types: ["hindu-pilgrimage"],
    nights: 7,
    days: 8,
    durationNote: "7N/8D, with three nights in Ayodhya to rest after the long drive from Chitrakoot",
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Prayagraj", nights: 1 },
      { place: "Chitrakoot", nights: 1 },
      { place: "Ayodhya", nights: 3 },
    ],
    suits:
      "Pilgrims who want the places of the Ramayana and Kashi in one journey, from the Sangam and Chitrakoot's forest of exile to Ram's city of Ayodhya. Best for travellers comfortable with one long road day; families with parents can ask for a slower version.",
    style:
      "A private, driven pilgrimage: darshan in the mornings, river aartis in the evenings, one long drive from Chitrakoot to Ayodhya, and three unhurried nights to finish on the Sarayu.",
    summary:
      "Seven nights across four pilgrim places: Kashi and Sarnath, a snan at the Sangam, the ghats and hills of Chitrakoot, and three nights in Ayodhya on the Sarayu.",
    lead:
      "This eight-day pilgrimage links Kashi with the places of the Ramayana. Two nights in Varanasi cover the evening Ganga aarti, Kashi Vishwanath, the ghats and Sarnath. A night in Prayagraj gives time for a snan at the Triveni Sangam and its temples, and a night at Chitrakoot brings the Ramghat aarti and Kamadgiri. After Gupta Godavari and Sati Anusuya Ashram, the longest drive of the journey carries you to Ayodhya for three nights: the Shri Ram Janmabhoomi Mandir, Hanuman Garhi, Kanak Bhawan, Guptar Ghat and Ram ki Paidi.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Ayodhya airport or Ayodhya Dham Junction. Lucknow airport, about three hours by road, has more flights and can be used instead.",
      timingWarning:
        "Day 5 combines a morning at Gupta Godavari and Sati Anusuya Ashram with a drive of six to seven hours to Ayodhya, arriving in the evening. Arrive on Day 1 by mid-afternoon for the evening aarti; a late arrival moves it to Day 2. Flights from Ayodhya are fewer than from Lucknow, and fog in December and January can delay flights, trains and roads.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Transfer to your hotel", text: "Your driver meets you at the airport or station and takes you to the hotel. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Time to settle in, and a call from your coordinator about the week ahead." },
          { kind: "experience", time: "Around sunset", title: "Evening Ganga aarti", text: "The aarti at Dashashwamedh, watched from the ghat steps at Standard, from arranged seating where available at Premium, and from a private boat at Luxury." },
        ],
      },
      {
        day: 2,
        title: "Varanasi Local",
        place: "Varanasi and Sarnath",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Kashi Vishwanath Temple", text: "Darshan through the temple corridor while queues are usually shorter. Phones and bags are not allowed inside; queues vary and no darshan time is promised." },
          { kind: "experience", time: "Morning", title: "Ghat walk", text: "A walk along the ghats from Dashashwamedh, past bathers, priests and boatmen. Premium and Luxury guests also have a private boat for an hour on the river." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "visit", time: "Afternoon", title: "Sarnath", text: "About half an hour north of the city, the deer park where the Buddha gave his first teaching: the Dhamek Stupa, the monastery ruins and the Archaeological Museum, which is closed on Fridays." },
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
          { kind: "experience", time: "Late morning", title: "Snan at the Triveni Sangam", text: "A boat out to the meeting point of the Ganga and the Yamuna for a holy dip, with a changing platform on the boats. Shared at Standard, private at Premium and Luxury, and subject to river conditions." },
          { kind: "rest", time: "Midday", title: "Check in and lunch", text: "A pause at the hotel." },
          { kind: "visit", time: "Afternoon", title: "Temples of the Sangam", text: "The shrine of the reclining Hanuman beside the Sangam, and the Alopi Devi temple, one of the Shakti Peeths." },
        ],
      },
      {
        day: 4,
        title: "Prayagraj to Chitrakoot",
        place: "Chitrakoot",
        photo: "chitrakoot-ramghat",
        overnight: "Chitrakoot",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Chitrakoot", text: "About 125 to 130 km, usually a three-hour drive." },
          { kind: "visit", time: "Afternoon", title: "Kamadgiri", text: "Darshan at the sacred hill, and the parikrama path of about 5 km for those who want to walk it." },
          { kind: "experience", time: "Around sunset", title: "Ram Ghat aarti", text: "The evening aarti on the Mandakini at Ram Ghat. Luxury guests watch from a small private boat where boats are operating." },
        ],
      },
      {
        day: 5,
        title: "Chitrakoot Sightseeing to Ayodhya",
        place: "Chitrakoot to Ayodhya",
        photo: "private-car",
        overnight: "Ayodhya",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Gupta Godavari", text: "The cave shrine south of the town, where water runs underfoot inside the caves." },
          { kind: "visit", time: "Morning", title: "Sati Anusuya Ashram", text: "The riverside ashram of Sati Anusuya beside the Mandakini, on the way back from the caves." },
          { kind: "travel", time: "From late morning", title: "Proceed towards Ayodhya", text: "About 280 to 300 km, usually six to seven hours with stops for tea and lunch. This is the longest day of the journey, and the evening is kept free." },
        ],
      },
      {
        day: 6,
        title: "Ayodhya Pilgrimage",
        place: "Ayodhya",
        photo: "ayodhya-ram-mandir",
        overnight: "Ayodhya",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Shri Ram Janmabhoomi Darshan", text: "Darshan at the temple. Phones, bags and electronic items are not allowed inside, security checks are thorough and queues vary; the early hours are usually calmer." },
          { kind: "visit", time: "Late morning", title: "Hanuman Garhi and Kanak Bhawan", text: "Hanuman Garhi, reached by a flight of about 76 steps, and the shrine of Kanak Bhawan nearby." },
          { kind: "rest", time: "Afternoon", title: "Lunch and rest", text: "Back to the hotel for the rest of the day." },
        ],
      },
      {
        day: 7,
        title: "Ayodhya Exploration & Saryu",
        place: "Ayodhya",
        photo: "ayodhya-ram-ki-paidi",
        overnight: "Ayodhya",
        blocks: [
          { kind: "visit", time: "Morning", title: "Guptar Ghat", text: "The quiet ghat on the Sarayu (Saryu) where, by tradition, Ram took jal samadhi, with its small temples." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "A slow middle of the day." },
          { kind: "visit", time: "Late afternoon", title: "Ram ki Paidi", text: "The stepped ghats beside the river, and the evening aarti on the Sarayu, watched from the steps, or from a private boat at Luxury where boats are operating." },
          { kind: "experience", time: "Evening", title: "A local cultural evening", text: "Bhajans or a Ram katha session in town where one is being held that evening; your coordinator confirms what is on." },
        ],
      },
      {
        day: 8,
        title: "Departure",
        place: "Ayodhya",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "departure", time: "At your departure time", title: "Departure transfer via Lucknow or Ayodhya", text: "Drop at Ayodhya airport or Ayodhya Dham Junction, or about three hours by road to Lucknow airport or station." },
        ],
      },
    ],
    practical: {
      walking:
        "Expect temple queues, ghat steps and old-city lanes in Varanasi, a climb of about 76 steps at Hanuman Garhi, and optional longer walks at Kamadgiri. The Ram Mandir involves a long walk from the security check to the shrine.",
      earlyStarts:
        "Kashi Vishwanath, Kamadgiri and the Ram Mandir are best visited early, and Day 5 starts soon after breakfast to fit Chitrakoot's sights before the drive.",
      boarding:
        "Boats in Varanasi, at the Sangam, at Ram Ghat and on the Sarayu board from steps or banks that can be steep and wet. All river outings, including the Sangam snan, depend on water levels, weather and local orders on the day.",
      mobility:
        "Long standing in queues, steps without rails and one long road day make this demanding for some guests. Tell us about mobility needs so we can assess each visit and suggest an extra night. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the most comfortable season, with fog likely in December and January. April to June is very hot. July to September is monsoon, with frequent boat suspensions. Ram Navami, Diwali and Dev Deepawali bring very large crowds to Ayodhya and Varanasi.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star accommodation throughout",
          "AC sedan, or AC Tempo Traveller for groups",
          "Standard darshan with queue and timing advice",
        ],
        hotels: "Selected 3-star hotels in Varanasi, Prayagraj, Chitrakoot and Ayodhya, subject to availability and named in your quotation.",
        vehicle: VEHICLE.standardGroup,
        meals: "Breakfast on all seven hotel nights. Lunches and dinners are not included.",
        boat: "A shared boat for the Sangam snan on Day 3. It can be upgraded to a private boat.",
        darshan: "Standard darshan at Kashi Vishwanath, Kamadgiri, the Ram Mandir and Hanuman Garhi, with timings and queue advice from your coordinator. No accompaniment inside the temples.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver is not a guide.",
        admissions: "General darshan at these temples is free. Entry tickets at Sarnath, paid darshan tickets and camera fees are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Ayodhya or Lucknow airport, or Ayodhya Dham Junction"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private air-conditioned sedan, or a Tempo Traveller for larger groups, with driver for the whole route", state: "included", mandatory: true },
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Aarti viewing at Dashashwamedh Ghat from the ghat steps; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 3, session: "Day 3 late morning", scope: "Shared boat to the Triveni Sangam for the snan, and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S07", day: 7, session: "Day 7 evening", scope: "Sarayu aarti viewing from the ghat steps; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day7-evening" },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Ayodhya or Lucknow",
          "Lunches and dinners",
          "Sightseeing guides",
          "Entry tickets, paid darshan tickets and camera fees",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        highlights: [
          "4-star accommodation, best available in Chitrakoot",
          "AC Innova Crysta or similar SUV with chauffeur",
          "Priority darshan where official arrangements allow",
          "Private boats on the Ganga and at the Sangam",
        ],
        hotels: "Selected 4-star hotels in Varanasi, Prayagraj and Ayodhya, and the best available property in Chitrakoot, which has few hotels of this category. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private boat on the Ganga on Day 2, a private boat for the Sangam snan on Day 3 and a team member for the Sarayu aarti on Day 7.",
        darshan: `Accompanied priority darshan at Kashi Vishwanath, Kamadgiri and the Ram Mandir, within each temple's rules. ${PRIORITY_NOTE}`,
        assistance: "A named coordinator throughout, a welcome on arrival, accompanied darshan and guided days at Chitrakoot and Ayodhya.",
        guide: "Local guides for the Chitrakoot sights (Day 4 and Day 5) and the Ayodhya pilgrimage day (Day 6).",
        admissions: "General darshan is free; entry tickets on the guided days are included, and paid or priority darshan tickets are booked through official channels where available.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Ayodhya or Lucknow airport, or Ayodhya Dham Junction"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 8", scope: "Vehicle group upgraded to an Innova Crysta or similar SUV, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Seating for the evening aarti where an arranged viewing place is available", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 morning", scope: "Private rowing boat along the ghats for about an hour, after the ghat walk", state: "included", mandatory: false, replacementGroup: "boat-day2-morning" },
          { item: "S06", day: 3, session: "Day 3 late morning", scope: "Private boat to the Triveni Sangam for the snan, and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S07", day: 7, session: "Day 7 evening", scope: "Sarayu aarti viewing with a team member, from arranged seating where available", state: "included", mandatory: false, replacementGroup: "aarti-day7-evening" },
          { item: "S08", session: "Day 2, Day 4 and Day 6", quantity: 3, scope: "Accompanied darshan at Kashi Vishwanath, Kamadgiri and the Ram Mandir, using priority or sugam darshan passes where the temple's official arrangements allow: queues, lockers, footwear and timings", state: "included", mandatory: false },
          { item: "S12", session: "Day 4 to Day 6", quantity: 2, scope: "Local guides for the Chitrakoot sights (Day 4 afternoon and Day 5 morning) and for the Ayodhya pilgrimage day (Day 6), about five hours each", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Ayodhya or Lucknow",
          "Lunches and dinners",
          "Guides in Varanasi, Sarnath and Prayagraj",
          "Fees for paid or priority darshan passes, where charged",
          "Priest dakshina, puja materials and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        highlights: [
          "5-star and premier properties, best available in Chitrakoot",
          "Luxury SUV with a chauffeur throughout",
          "Butler-style host, itinerary customised to your pace",
          "VIP darshan passes where official arrangements allow",
          "Private boats on the Ganga and at the Sangam",
        ],
        hotels: "5-star and premier properties in Varanasi, Prayagraj and Ayodhya, and the best available premium property in Chitrakoot, which has no 5-star hotels. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on Day 4 and on the long road day (Day 5). Other meals are not included.",
        boat: "Private boats for the Varanasi evening aarti, an hour on the Ganga on Day 2, the Sangam snan, the Ram Ghat aarti and the Sarayu aarti, each where boats are operating.",
        darshan: `Dedicated coordination and accompaniment at every temple visit within each temple's rules, with VIP or sugam darshan passes booked through official channels. ${PRIORITY_NOTE}`,
        assistance: `${ASSIST_LUXURY} Your host offers butler-style support on visit and road days, and the programme is customised with you before travel.`,
        guide: "Guides for Sarnath, the Sangam and its temples, the Chitrakoot sights and both Ayodhya days.",
        admissions: "Entry and ticketed sites on all listed visits are included, and paid or VIP darshan passes are booked where the temple offers them.",
        photography: "A defined professional photography session of about two hours on the Day 2 boat and the ghats, with edited image count and delivery time stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Ayodhya or Lucknow airport, or Ayodhya Dham Junction"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private chauffeured transport for the whole route in the luxury vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 8", scope: "Luxury SUV: Fortuner, Mercedes or suitable alternative; an SUV is usually the better choice for the long Day 5 drive. Subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 8"),
          { item: "S10", session: "Day 1 to Day 8", scope: "Personal host offering butler-style support on visit days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "E13", day: 1, session: "Day 1 evening", scope: "Evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 morning", scope: "Private boat along the ghats for about an hour, motorboat or rowing boat as conditions suit", state: "included", mandatory: false, replacementGroup: "boat-day2-morning" },
          { item: "E24", day: 2, session: "Day 2 afternoon", scope: "Sarnath with a specialist guide, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S06", day: 3, session: "Day 3 late morning", scope: "Private boat to the Triveni Sangam for the snan, and back", state: "included", mandatory: false, replacementGroup: "boat-day3-sangam" },
          { item: "S06", day: 4, session: "Day 4 evening", scope: "Small private rowing boat at Ram Ghat for the evening aarti, where boats are operating", state: "included", mandatory: false, replacementGroup: "boat-day4-ramghat" },
          { item: "S06", day: 7, session: "Day 7 evening", scope: "Private boat on the Sarayu for the evening aarti, where boats are operating", state: "included", mandatory: false, replacementGroup: "aarti-day7-evening" },
          { item: "S08", session: "Day 2, Day 3, Day 4 and Day 6", quantity: 4, scope: "Dedicated darshan coordination at Kashi Vishwanath, the Sangam temples, Kamadgiri, the Ram Mandir and Hanuman Garhi, with VIP or sugam passes where the temple's official arrangements allow", state: "included", mandatory: false },
          { item: "S12", session: "Day 3 to Day 7", quantity: 4, scope: "Guides for the Sangam temples, the Chitrakoot sights, the Ayodhya pilgrimage day, and Guptar Ghat and Ram ki Paidi", state: "included", mandatory: false },
          { item: "S24", day: 2, session: "Day 2 morning", scope: "Professional photography session of about two hours on the boat and ghats; edited image count and delivery time stated in your quotation", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 8", scope: "Dietary requirements relayed to every hotel, and the Day 5 lunch stop reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Ayodhya or Lucknow",
          "Dinners, and lunches other than on Day 4 and Day 5",
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
        q: "Why is Day 5 so long?",
        a: "Chitrakoot and Ayodhya are about 280 to 300 km apart, usually six to seven hours with stops, after a morning at Gupta Godavari and Sati Anusuya Ashram. Three nights in Ayodhya follow, so there is time to rest. If it is too much, ask for a version with a night in Prayagraj on the way.",
      },
      {
        q: "What does priority or VIP darshan mean?",
        a: "Where a temple runs official priority or sugam darshan passes, as Kashi Vishwanath and the Ram Mandir do at times, we book them for Premium and Luxury guests. We never promise access the temple's own arrangements do not allow, and no darshan time is promised at any tier.",
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
        "An eight-day pilgrimage linking Kashi, the Sangam, Chitrakoot and three nights in Ayodhya, with darshan, river aartis and rest after one long road day.",
    },
  },

  /* ------------------------------------------------------------------ P09 */
  {
    id: "P09",
    slug: "journey-of-remembrance",
    status: "published",
    setup: "Specialist confirmation before publication",
    title: "A Journey of Remembrance – Varanasi & Gaya",
    route: "Varanasi and Gaya, with ancestral rites at the Ganga ghats and in Gaya, and a short visit to Bodh Gaya",
    destinations: ["varanasi", "gaya", "bodh-gaya"],
    types: ["ancestral-rites", "hindu-pilgrimage"],
    nights: 4,
    days: 5,
    durationNote: "4N/5D for one morning of rites in each place; longer where the family's tradition calls for more days in Gaya",
    overnights: [
      { place: "Varanasi", nights: 2 },
      { place: "Gaya or Bodh Gaya", nights: 2 },
    ],
    suits:
      "Families travelling to offer Pind Daan and shraddha for parents and ancestors in Kashi and at Gaya, including those arranging the journey for an elder. Parents travelling with family support can choose SHRAVAN Varanasi and Gaya, which adds a companion and a slower pace.",
    style:
      "A quiet, private journey with the rites at its centre: a morning of rites on the Ganga, the drive to Gaya, a morning of rites at the Vishnupad temple and the Falgu, and room to rest afterwards.",
    summary:
      "Pind Daan at the Ganga ghats in Kashi and at the Vishnupad temple, the Falgu and Akshayavat in Gaya, with priests and scope agreed with your family, and a last visit to the Mahabodhi Temple.",
    lead:
      "This journey is planned around one purpose: offering Pind Daan and shraddha for those your family wishes to remember. It begins in Varanasi with the evening Ganga aarti, then a morning of rites at the Ganga ghats with a verified priest and darshan at Kashi Vishwanath. On Day 3 you travel to Gaya by road or train. Day 4 is given to the rites at the Vishnupad temple and the Falgu, with Akshayavat, and on the last morning there is time for the Mahabodhi Temple at Bodh Gaya before your departure from Gaya.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Gaya airport or Gaya Junction, a major station on the main Delhi to Kolkata line. Bodh Gaya is about 15 minutes from the airport and about half an hour from the station.",
      timingWarning:
        "The rites take most of the Day 2 and Day 4 mornings and the priests fix the start times, so no travel is planned on those days. The Mahabodhi visit on Day 5 suits a flight or train after about midday. Flights from Gaya are limited and seasonal schedules change, so we confirm your departure before fixing the programme. During Pitru Paksha, roads into Gaya are congested and rooms scarce; allow extra time.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Pick up and check in", text: "Your driver meets you at the airport or station and takes you to the hotel. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest, and a call about the rites", text: "Your coordinator confirms the details the priests will need, such as the names of those being remembered and the family's gotra if known, and goes through the plan for Kashi and Gaya." },
          { kind: "experience", time: "Around sunset", title: "Evening Ganga aarti", text: "The aarti at Dashashwamedh, watched from the ghat steps, from arranged seating where available at Premium, or from a private boat at Luxury." },
        ],
      },
      {
        day: 2,
        title: "Varanasi Pind Daan & Temples",
        place: "Varanasi",
        photo: "varanasi-river-mist",
        overnight: "Varanasi",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Pind Daan and shraddha at the Ganga ghats", text: "The family member making the offerings sits with a verified priest on the ghat for the sankalp, the offering of pinda and tarpan with water from the Ganga. The ghat, sequence and timing are agreed with your family before you travel; Luxury guests have a quieter private space where the ghat allows." },
          { kind: "rest", time: "Late morning", title: "Rest", text: "Back to the hotel to bathe and rest. Many families keep simple vegetarian meals on the day of the rites." },
          { kind: "visit", time: "Afternoon", title: "Kashi Vishwanath Darshan", text: "Darshan through the temple corridor. Phones and bags are not allowed inside; queues vary and no darshan time is promised." },
        ],
      },
      {
        day: 3,
        title: "Varanasi to Gaya / Bodh Gaya Transfer",
        place: "Gaya",
        photo: "private-car",
        overnight: "Gaya or Bodh Gaya",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive or train to Gaya", text: "About 250 km by road along the Grand Trunk Road, usually five to six hours with stops. Trains from Varanasi or Pt. Deen Dayal Upadhyaya Junction to Gaya Junction take about three to four hours and can replace the drive." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "A quiet afternoon at the hotel in Gaya or Bodh Gaya, about half an hour apart." },
          { kind: "visit", time: "Evening", title: "Confirm the morning with the priest", text: "The Gaya priest or a representative confirms the sequence, the start time, and what to bring and wear, in person where possible or by phone." },
        ],
      },
      {
        day: 4,
        title: "Gaya Rituals & Vishnupad Temple",
        place: "Gaya",
        photo: "gaya-falgu",
        overnight: "Gaya or Bodh Gaya",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Rites at the Phalgu and the Vishnupad temple", text: "The rites begin on the bank of the Phalgu (Falgu) and at the Vishnupad temple, with its footprint of Vishnu set in stone. The family member making the offerings follows the priest through the sankalp and the offering of pinda for those being remembered." },
          { kind: "visit", time: "Morning", title: "Falgu Ghat and Akshayavat", text: "The sequence continues at Falgu Ghat and concludes at Akshayavat, the banyan where the rites traditionally end. Your priest decides the exact order and sites." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "A quiet afternoon, with nothing scheduled." },
        ],
      },
      {
        day: 5,
        title: "Bodh Gaya Quick Visit & Departure",
        place: "Bodh Gaya",
        photo: "bodhgaya-mahabodhi",
        overnight: "Departure day",
        blocks: [
          { kind: "visit", time: "Morning", title: "Mahabodhi Temple complex", text: "A short visit to the temple and the Bodhi tree where the Buddha attained enlightenment. Mobile phones are usually deposited at the entrance and your coordinator confirms the current rules; shoes come off inside." },
          { kind: "departure", time: "Late morning or afternoon", title: "Departure", text: "Drop at Gaya airport or Gaya Junction for your onward flight or train." },
        ],
      },
    ],
    practical: {
      walking:
        "In Varanasi the rites are on the ghat steps, which are steep and can be wet. At Gaya they move between the Phalgu riverbank, the Vishnupad temple and Akshayavat, on foot and by short drives. Temple lanes are crowded, and the riverbank is sandy or uneven with steps down to the water. Outside the monsoon the Falgu is often a dry sandy bed; a rubber dam near the temple, opened in 2022, was built to hold water for the rites, but levels still vary.",
      earlyStarts:
        "Rites usually begin in the morning at a time the priest sets; expect to leave the hotel between about 6.30 and 7.30 am on Day 2 and Day 4.",
      boarding: VARANASI_BOATS,
      mobility:
        "The rites involve sitting on the ground for long periods, standing in crowded lanes and walking on uneven ground. Tell us about knee, back or mobility needs: priests can often adapt seating, and a host can stay close. We do not describe these sites as accessible.",
      seasonal:
        "Pitru Paksha, the fortnight for ancestral rites in September or October, is Gaya's busiest time, with very large crowds, scarce rooms and high demand for priests; families who wish to come then should enquire early. Rites are offered through the year. April to June is very hot; winter mornings are cold and often foggy.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotels in Varanasi and Gaya or Bodh Gaya",
          "Private AC sedan with driver",
          "Local priest arranged for the ancestral rites",
        ],
        hotels: "Selected 3-star hotels in Varanasi and in Gaya or Bodh Gaya. Rooms are scarce during Pitru Paksha; hotels are subject to availability and named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all four hotel nights. Lunches and dinners are not included.",
        boat: "Not included. A boat for the aarti or at sunrise can be added.",
        darshan: "Planned visits to Kashi Vishwanath, the Vishnupad temple and the Mahabodhi Temple, with timings and queue advice from your coordinator. No accompaniment inside the temples.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide. The priests guide the rites; your driver is not a guide.",
        admissions: "General darshan at these temples is free. Paid darshan tickets, camera tickets, donations and offerings are your own.",
        photography: "Not included. Rites are not photographed unless the family and the priest agree.",
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 5", scope: "Private air-conditioned sedan or suitable equivalent with driver, including the Varanasi to Gaya drive and the Bodh Gaya visit", state: "included", mandatory: true },
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Aarti viewing from the ghat steps at Dashashwamedh; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S22", session: "Day 2 and Day 4 mornings", quantity: 2, scope: "A local priest arranged for Pind Daan and shraddha at the Ganga ghats (Day 2) and at Gaya (Day 4): ritual scope agreed with the family before travel, start times, materials list and the sequence of sites. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: true },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Lunches and dinners",
          "Priest dakshina and ritual materials, agreed and itemised separately in your quotation",
          "Sightseeing guides",
          "Donations, offerings and tips",
          "Travel insurance",
        ],
      },
      premium: {
        highlights: [
          "4-star hotels in Varanasi and Gaya or Bodh Gaya",
          "AC Innova Crysta or similar SUV with chauffeur",
          "Verified Vedic Brahmin priest for the rites",
          "Private puja materials and ghat setup arranged",
        ],
        hotels: "Selected 4-star hotels in Varanasi and in Gaya or Bodh Gaya, where Bodh Gaya has the wider choice. Fewer rooms are available during Pitru Paksha; hotels are subject to availability and named in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "Not included. A private boat for the aarti or at sunrise can be added.",
        darshan: `Accompanied darshan assistance at Kashi Vishwanath and the Vishnupad temple, within each temple's rules. ${PRIORITY_NOTE}`,
        assistance: "A named coordinator throughout, a welcome on arrival, and a host with the family for both mornings of rites.",
        guide: "The priests guide the rites. No sightseeing guide is included.",
        admissions: "General darshan is free. Paid darshan tickets are booked separately where available.",
        photography: "Not included. Rites are not photographed unless the family and the priest agree.",
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 5", scope: "Private chauffeured transport in the upgraded vehicle group below, including the Varanasi to Gaya drive and the Bodh Gaya visit", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 5", scope: "Vehicle group upgraded to an Innova Crysta or similar SUV, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Aarti viewing from arranged seating where available", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S08", session: "Day 2 and Day 4", quantity: 2, scope: "Accompanied darshan assistance at Kashi Vishwanath and the Vishnupad temple", state: "included", mandatory: false },
          { item: "S22", session: "Day 2 and Day 4 mornings", quantity: 2, scope: "A verified Vedic Brahmin priest for Pind Daan and shraddha at the Ganga ghats (Day 2) and at Gaya (Day 4), with private puja materials and the ghat setup arranged: scope agreed with the family before travel, start times and sequence of sites. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: true },
          { item: "S10", session: "Day 2 and Day 4 mornings", quantity: 2, scope: "A host who stays with the family through both mornings of rites: belongings, footwear, water, timings and liaison with the priest", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Lunches and dinners",
          "Priest dakshina, agreed and itemised separately in your quotation",
          "Sightseeing guides",
          "Donations, offerings and tips",
          "Travel insurance",
        ],
      },
      luxury: {
        highlights: [
          "5-star in Varanasi, best available in Bodh Gaya",
          "Luxury SUV with a chauffeur throughout",
          "Senior Vedic scholar priest for the rites",
          "A quiet private ritual space where the site allows",
          "Full assistance from a personal host and concierge",
        ],
        hotels: "A 5-star luxury hotel in Varanasi, and the best available premium property in Bodh Gaya or Gaya. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus a simple vegetarian lunch on both days of the rites (Day 2 and Day 4), sattvic if the family wishes. Other meals are not included.",
        boat: "A private boat for the Day 1 evening aarti, where boats are operating.",
        darshan: `Dedicated coordination and accompaniment at Kashi Vishwanath, the Vishnupad temple and the Mahabodhi Temple within each temple's rules. ${PRIORITY_NOTE}`,
        assistance: `${ASSIST_LUXURY} Your host stays with the family through both mornings of rites.`,
        guide: "The senior priest guides the rites. A guide can join the Mahabodhi visit if you wish.",
        admissions: "General darshan is free; paid darshan and camera tickets are booked where the temple offers them.",
        photography: "Not included by default on a remembrance journey. A discreet session can be added if the family wishes; rites are never photographed without the family's and the priest's agreement.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 5", scope: "Private chauffeured transport in the luxury vehicle group below, including the Varanasi to Gaya drive and the Bodh Gaya visit", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 5", scope: "Luxury SUV: Fortuner, Mercedes or suitable alternative chosen for the party and route, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S31", day: 1, session: "Arrival", scope: "Simple refreshments in your room on arrival, agreed beforehand", state: "included", mandatory: false },
          concierge("Day 1 to Day 5"),
          { item: "S10", session: "Day 1 to Day 5", scope: "Personal host with the family in Varanasi, on the road to Gaya and through both mornings of rites, within agreed hours", state: "included", mandatory: false },
          { item: "E13", day: 1, session: "Day 1 evening", scope: "Evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S08", session: "Day 2, Day 4 and Day 5", quantity: 3, scope: "Dedicated darshan coordination and accompaniment at Kashi Vishwanath, the Vishnupad temple and the Mahabodhi Temple", state: "included", mandatory: false },
          { item: "S22", session: "Day 2 and Day 4 mornings", quantity: 2, scope: "A senior Vedic scholar priest for Pind Daan and shraddha at the Ganga ghats (Day 2) and at Gaya (Day 4), in a quiet private space where the ghat or site allows, with materials and setup arranged. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: true },
          { item: "S27", session: "Day 1 to Day 5", scope: "Dietary coordination, including sattvic meals without onion and garlic on the days of the rites if the family keeps them", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Dinners, and lunches other than on Day 2 and Day 4",
          "Priest dakshina, agreed and itemised separately in your quotation",
          "Photography and videography",
          "Donations, offerings and tips",
          "Travel insurance",
        ],
      },
    },
    related: ["S19", "S16", "S17", "S29", "E29"],
    faqs: [
      {
        q: "Who performs the rites?",
        a: "A priest in Kashi and a priest at Gaya conduct the rites, and the family member making the offerings follows their guidance. Standard arranges a local priest, Premium a verified Vedic Brahmin priest and Luxury a senior Vedic scholar. If your family has a long-standing priest at Gaya, tell us and we will coordinate with them.",
      },
      {
        q: "How long do the rites take?",
        a: "Each set of rites usually takes one morning: at the Ganga ghats in Kashi, and at the Phalgu, the Vishnupad temple and Akshayavat in Gaya. Some family traditions call for a longer sequence over several days at more sites; if so, tell us and we will plan more nights in Gaya.",
      },
      {
        q: "Does this journey include Bodh Gaya?",
        a: "Yes, a short visit to the Mahabodhi Temple on the last morning, and you may stay in Bodh Gaya, which has the wider choice of hotels. Gaya and Bodh Gaya are different places, about half an hour apart; the rites themselves take place in Gaya.",
      },
      {
        q: "Where in Kashi are the rites offered?",
        a: "Usually at one of the Ganga ghats, with a verified priest. Some families prefer Pishach Mochan Kund or another site their tradition names; tell us and we agree the place, priest and timing with you before you travel.",
      },
    ],
    hero: "gaya-vishnupad",
    gallery: ["varanasi-aarti-lamp", "varanasi-puja", "varanasi-ghats-dawn"],
    seo: {
      title: "Pind Daan in Gaya with Varanasi: A Journey of Remembrance",
      description:
        "A five-day journey for families offering Pind Daan at the Ganga ghats in Kashi and at Gaya, with priests and scope agreed before travel and a visit to Bodh Gaya.",
    },
  },

  /* ------------------------------------------------------------------ P10 */
  {
    id: "P10",
    slug: "varanasi-prayagraj-gaya",
    status: "published",
    setup: "Covers earlier Varanasi–Gaya–Prayagraj note; do not duplicate it as another product",
    title: "Varanasi, Prayagraj and Gaya Pilgrimage",
    route: "Varanasi, with a day at the Sangam in Prayagraj, then Gaya and Bodh Gaya",
    destinations: ["varanasi", "prayagraj", "gaya", "bodh-gaya"],
    types: ["hindu-pilgrimage", "ancestral-rites"],
    nights: 5,
    days: 6,
    durationNote: "5N/6D target, based in Varanasi for three nights with Prayagraj as a day excursion",
    overnights: [
      { place: "Varanasi", nights: 3 },
      { place: "Gaya", nights: 1 },
      { place: "Bodh Gaya", nights: 1 },
    ],
    suits:
      "Hindu pilgrims who want the three great tirthas of the plains in one journey, the Sangam, Kashi and Gaya, with rites for their ancestors at each. Families who prefer fewer hotel changes like the three nights in Varanasi.",
    style:
      "A private, driven pilgrimage from one base in Kashi: a long day out to the Sangam, a morning of temples and rites on the Ganga, then on to Gaya for Pind Daan and a last evening at Bodh Gaya.",
    summary:
      "Five nights from Kashi to Gaya: rituals at the Triveni Sangam on a day from Varanasi, Kashi Vishwanath and Manikarnika, and Pind Daan at the Vishnupad temple and the Phalgu, with the Mahabodhi Temple.",
    lead:
      "This six-day pilgrimage keeps you in Varanasi for three nights. After the evening Ganga aarti on arrival, a full day takes you to Prayagraj for rituals at the Triveni Sangam and darshan at the Hanuman temple, returning to Kashi for the night. Day 3 is for Kashi Vishwanath, Manikarnika Ghat and a homage to your ancestors on the Ganga. You then travel to Gaya for an evening at the Vishnupad temple, offer Pind Daan there and at the Phalgu the next morning, and visit the Mahabodhi Temple before a night in Bodh Gaya.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Gaya airport, about 15 minutes from Bodh Gaya, or Gaya Junction, about half an hour away and on the main Delhi to Kolkata line.",
      timingWarning:
        "Day 2 is a long day, with about three hours on the road each way between Varanasi and Prayagraj. Arrive on Day 1 by mid-afternoon for the evening aarti. Flights from Gaya are limited and some are seasonal; Gaya Junction has many more trains. Winter fog can delay flights and trains in December and January, and Pitru Paksha brings very large crowds to Gaya.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival",
        place: "Varanasi",
        photo: "varanasi-ganga-aarti",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Transfer to your hotel", text: "Your driver meets you at the airport or station. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "Time to settle in. Your coordinator confirms the details the priests will need for the rites, such as the names of those being remembered and the family's gotra if known." },
          { kind: "experience", time: "Around sunset", title: "Evening Ganga aarti", text: "The aarti at Dashashwamedh, watched from the ghat steps at Standard, from arranged seating where available at Premium, and from a private boat at Luxury." },
        ],
      },
      {
        day: 2,
        title: "Varanasi to Prayagraj Day Excursion",
        place: "Prayagraj",
        photo: "prayagraj-sangam-birds",
        overnight: "Varanasi",
        blocks: [
          { kind: "travel", time: "Early, after breakfast", title: "Drive to Prayagraj", text: "About 120 km west, usually three hours by road." },
          { kind: "experience", time: "Late morning", title: "Triveni Sangam rituals", text: "A boat out to the meeting point of the Ganga and the Yamuna for a holy dip and a short puja with a priest. Shared at Standard, private at Premium and Luxury, and subject to river conditions." },
          { kind: "visit", time: "Early afternoon", title: "Hanuman Temple", text: "Darshan at the shrine of the reclining Hanuman beside the Sangam, which the river reaches in some monsoon seasons, then lunch nearby." },
          { kind: "travel", time: "Afternoon", title: "Return to Varanasi", text: "About three hours back to your hotel in Varanasi for the evening." },
        ],
      },
      {
        day: 3,
        title: "Varanasi Temples & Rites",
        place: "Varanasi",
        photo: "varanasi-boat-sunrise",
        overnight: "Varanasi",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Kashi Vishwanath Temple", text: "Darshan through the temple corridor while queues are usually shorter. Phones and bags are not allowed inside; queues vary and no darshan time is promised." },
          { kind: "experience", time: "Morning", title: "Manikarnika Ghat", text: "A boat along the ghats to Manikarnika, where cremation fires burn day and night, seen respectfully from the river. Shared at Standard, private with a guide at Premium and Luxury." },
          { kind: "visit", time: "Late morning", title: "Ancestral homage", text: "Tarpan and a short shraddha for your ancestors on a ghat with a priest, as your family's tradition asks. Luxury guests may continue with the Sacred Kashi Walk in the afternoon." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "A quiet afternoon before the journey to Gaya." },
        ],
      },
      {
        day: 4,
        title: "Varanasi to Gaya Transfer",
        place: "Gaya",
        photo: "gaya-vishnupad",
        overnight: "Gaya",
        blocks: [
          { kind: "travel", time: "Morning", title: "Travel to Gaya", text: "About 250 km by road, usually five to six hours with stops, or about three to four hours by train to Gaya Junction." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "A quiet afternoon at the hotel." },
          { kind: "visit", time: "Evening", title: "Vishnupad Temple area", text: "A first visit to the temple built around a footprint of Vishnu set in stone, on the bank of the Phalgu, and a meeting with the priest to confirm the next morning." },
        ],
      },
      {
        day: 5,
        title: "Gaya Ancestral Rites & Bodh Gaya",
        place: "Gaya and Bodh Gaya",
        photo: "bodhgaya-mahabodhi",
        overnight: "Bodh Gaya",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Pind Daan at the Vishnupad temple and the Phalgu", text: "The rites with the priest on the bank of the Phalgu and at the Vishnupad temple, often concluding at Akshayavat. The scope and sequence are agreed with your family before you travel, and take most of the morning." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "A short drive to Bodh Gaya, about half an hour, and time to rest." },
          { kind: "visit", time: "Late afternoon", title: "Mahabodhi Temple", text: "The temple and the Bodhi tree where the Buddha attained enlightenment, in the calmer evening hours. Mobile phones are usually deposited at the entrance; shoes come off inside." },
        ],
      },
      {
        day: 6,
        title: "Departure",
        place: "Bodh Gaya",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "departure", time: "At your departure time", title: "Departure from Gaya", text: "Drop at Gaya airport or Gaya Junction for your onward flight or train." },
        ],
      },
    ],
    practical: {
      walking:
        "Expect ghat steps and temple queues in Varanasi, a walk down to the boats at the Sangam, crowded lanes and an uneven riverbank around the Vishnupad temple, and a walk of about a kilometre around the Mahabodhi complex.",
      earlyStarts:
        "Day 2 starts soon after breakfast for the Prayagraj drive, Kashi Vishwanath is best visited early on Day 3, and the rites at Gaya usually begin between about 6.30 and 7.30 am on Day 5.",
      boarding:
        "Boats at the Sangam and in Varanasi board from steps or banks that can be steep, muddy and wet. River outings depend on water levels, weather and local orders, and are often suspended at the monsoon peak.",
      mobility:
        "Temple queues mean long standing, the rites involve sitting on the ground, and some shrines have steps without rails. Tell us about mobility needs early so we can assess each visit. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the most comfortable season, with fog in December and January. April to June is very hot; July to September is monsoon. The Magh Mela at Prayagraj and Pitru Paksha at Gaya bring very large crowds and scarce rooms.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotels throughout",
          "Private AC sedan with driver",
          "Standard ritual and temple support",
        ],
        hotels: "Selected 3-star hotels in Varanasi, Gaya and Bodh Gaya, subject to availability and named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "A shared boat for the Sangam rituals on Day 2 and a shared boat to Manikarnika on Day 3. Either can be upgraded to a private boat.",
        darshan: "Standard support at the Hanuman temple, Kashi Vishwanath, the Vishnupad temple and the Mahabodhi Temple, with timings and queue advice from your coordinator.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. The priests guide the rites; your driver is not a guide.",
        admissions: "General darshan at these temples is free. Any paid darshan or camera tickets are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route, including the Prayagraj day", state: "included", mandatory: true },
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Aarti viewing at Dashashwamedh Ghat from the ghat steps; no reserved seating", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 late morning", scope: "Shared boat to the Triveni Sangam and back", state: "included", mandatory: false, replacementGroup: "boat-day2-sangam" },
          { item: "S19", day: 2, session: "Day 2 late morning", scope: "A local priest for the Sangam snan and puja; dakshina and materials itemised in your quotation", state: "included", mandatory: false },
          { item: "S06", day: 3, session: "Day 3 morning", scope: "Shared boat along the ghats to Manikarnika, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day3-manikarnika" },
          { item: "S22", session: "Day 3 and Day 5 mornings", quantity: 2, scope: "A local priest for the ancestral homage on the Ganga (Day 3) and Pind Daan at the Vishnupad temple and the Phalgu (Day 5): scope, start times and materials agreed with the family before travel. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Lunches and dinners",
          "Sightseeing guides",
          "Priest dakshina and ritual materials, itemised separately in your quotation",
          "Paid darshan tickets, donations and offerings",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        highlights: [
          "4-star hotels in Varanasi, Gaya and Bodh Gaya",
          "AC Innova Crysta or similar SUV with chauffeur",
          "Escorted rituals at the Sangam, Varanasi and Gaya",
          "VIP lines at Varanasi and Gaya where officially offered",
        ],
        hotels: "Selected 4-star hotels in Varanasi and Bodh Gaya, and the best available property in Gaya, which has few hotels of this category. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "A private boat for the Sangam rituals on Day 2 and a private rowing boat with a guide to Manikarnika on Day 3.",
        darshan: `Escorted darshan at the Hanuman temple, Kashi Vishwanath and the Vishnupad temple, using VIP or sugam darshan lines at Varanasi and Gaya where available. ${PRIORITY_NOTE}`,
        assistance: "A named coordinator throughout, a welcome on arrival, and a host who escorts the family through the rituals at the Sangam, in Varanasi and at Gaya.",
        guide: "A guide on the Day 3 boat. The priests guide the rites.",
        admissions: "General darshan is free; paid or VIP darshan tickets are booked through official channels where available.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Vehicle group upgraded to an Innova Crysta or similar SUV, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "S07", day: 1, session: "Day 1 evening", scope: "Seating for the evening aarti where an arranged viewing place is available", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 late morning", scope: "Private boat to the Triveni Sangam and back", state: "included", mandatory: false, replacementGroup: "boat-day2-sangam" },
          { item: "S19", day: 2, session: "Day 2 late morning", scope: "A priest for the Sangam snan and puja; dakshina and materials itemised in your quotation", state: "included", mandatory: false },
          { item: "E12", day: 3, session: "Day 3 morning", scope: "Private rowing boat with a guide along the ghats to Manikarnika, about an hour", state: "included", mandatory: false, replacementGroup: "boat-day3-manikarnika" },
          { item: "S08", session: "Day 2 to Day 5", quantity: 3, scope: "Escorted darshan at the Hanuman temple, Kashi Vishwanath and the Vishnupad temple, with VIP or sugam lines where the temple's official arrangements allow", state: "included", mandatory: false },
          { item: "S22", session: "Day 3 and Day 5 mornings", quantity: 2, scope: "A priest for the ancestral homage on the Ganga (Day 3) and Pind Daan at the Vishnupad temple and the Phalgu (Day 5): scope, start times and materials agreed with the family before travel. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: false },
          { item: "S10", session: "Day 2, Day 3 and Day 5", quantity: 3, scope: "A host who escorts the family through the rituals at the Sangam, in Varanasi and at Gaya: belongings, footwear, timings and liaison with the priests", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Lunches and dinners",
          "Sightseeing guides on land",
          "Priest dakshina and ritual materials, itemised separately in your quotation",
          "Fees for paid or VIP darshan lines, where charged",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        highlights: [
          "5-star or best available luxury hotels",
          "Luxury SUV with a chauffeur throughout",
          "Complete private ritual assistance",
          "VIP protocol where official arrangements allow",
          "Personal host and dedicated concierge",
        ],
        hotels: "5-star hotels in Varanasi, and the best available luxury property in Gaya and Bodh Gaya. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on the Prayagraj day (Day 2) and the Varanasi to Gaya travel day (Day 4). Other meals are not included.",
        boat: "A private boat for the Varanasi evening aarti, a private boat for the Sangam rituals and the highest suitable boat to Manikarnika on Day 3, each where boats are operating.",
        darshan: `Dedicated coordination and accompaniment at every temple visit within each temple's rules, with VIP or sugam darshan passes booked through official channels. ${PRIORITY_NOTE}`,
        assistance: `${ASSIST_LUXURY} Your host manages every ritual with the priests, from materials to seating.`,
        guide: "A guide on the Day 3 boat and for the Sacred Kashi Walk (Day 3), and a guide at the Mahabodhi Temple (Day 5). The priests guide the rites.",
        admissions: "Entry and ticketed sites on all listed visits are included; paid or VIP darshan passes are booked where the temple offers them.",
        photography: "A defined professional photography session of about two hours on the Day 3 boat and the ghats, with edited image count and delivery time stated in your quotation. Rites are never photographed without the family's agreement.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Gaya airport or Gaya Junction"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the luxury vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Luxury SUV: Fortuner, Mercedes or suitable alternative chosen for the party and route, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 6"),
          { item: "S10", session: "Day 1 to Day 6", scope: "Personal host with you on visit days, ritual mornings and road days, within agreed hours", state: "included", mandatory: false },
          { item: "E13", day: 1, session: "Day 1 evening", scope: "Evening on the Ganges in a private boat, watching the aarti from the river", state: "included", mandatory: false, replacementGroup: "aarti-day1-evening" },
          { item: "S06", day: 2, session: "Day 2 late morning", scope: "Private boat to the Triveni Sangam and back, motorboat or rowing boat as conditions suit", state: "included", mandatory: false, replacementGroup: "boat-day2-sangam" },
          { item: "S19", day: 2, session: "Day 2 late morning", scope: "A private priest for the Sangam snan and puja, with materials and seating arranged; dakshina itemised in your quotation", state: "included", mandatory: false },
          { item: "E12", day: 3, session: "Day 3 morning", scope: "The highest suitable boat with a guide to Manikarnika: a private motorboat or covered boat where actually available, otherwise a private rowing boat", state: "included", mandatory: false, replacementGroup: "boat-day3-manikarnika" },
          { item: "E04", day: 3, session: "Day 3 afternoon", scope: "Sacred Kashi Walk with a guide, darshan boundaries explained", state: "included", mandatory: false },
          { item: "S08", session: "Day 2 to Day 5", quantity: 4, scope: "Dedicated darshan coordination at the Hanuman temple, Kashi Vishwanath, the Vishnupad temple and the Mahabodhi Temple, with VIP or sugam passes where the temple's official arrangements allow", state: "included", mandatory: false },
          { item: "S22", session: "Day 3 and Day 5 mornings", quantity: 2, scope: "Complete private ritual assistance for the ancestral homage on the Ganga (Day 3) and Pind Daan at the Vishnupad temple and the Phalgu (Day 5), with a senior priest, materials and setup arranged. Priest dakshina and materials are itemised in your quotation", state: "included", mandatory: false },
          { item: "S12", day: 5, session: "Day 5 late afternoon", scope: "Guide for the Mahabodhi Temple and the Bodhi tree, about two hours", state: "included", mandatory: false },
          { item: "S24", day: 3, session: "Day 3 morning", scope: "Professional photography session of about two hours on the boat and ghats; edited image count and delivery time stated in your quotation", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 6", scope: "Dietary requirements relayed to every hotel, sattvic meals on ritual days if the family keeps them, and lunch stops on Day 2 and Day 4 reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gaya",
          "Dinners, and lunches other than on Day 2 and Day 4",
          "Priest dakshina, donations and offerings",
          "Videography and photography beyond the defined session",
          "Tips, laundry and personal expenses",
          "Travel insurance",
        ],
      },
    },
    related: ["S19", "E27", "E29", "S16", "S29"],
    faqs: [
      {
        q: "Why is Prayagraj a day excursion?",
        a: "It keeps you in one hotel in Varanasi for three nights. The drive is about three hours each way, so Day 2 is long; if you would rather stay a night at the Sangam, we can plan it that way instead.",
      },
      {
        q: "Are the rites included?",
        a: "Yes. A priest is arranged for the Sangam puja, the ancestral homage in Kashi and Pind Daan at Gaya, with the scope agreed with your family before you travel. Priest dakshina and materials are itemised in your quotation. If the rites are the main purpose of your visit, A Journey of Remembrance is planned around them.",
      },
      {
        q: "Is Bodh Gaya included?",
        a: "Yes. After the rites at Gaya you visit the Mahabodhi Temple and spend the last night in Bodh Gaya, about half an hour away. Gaya and Bodh Gaya are different places, and the rites take place in Gaya.",
      },
    ],
    hero: "gaya-falgu",
    gallery: ["prayagraj-sangam-boats", "varanasi-aerial-ghats", "varanasi-diya-floating"],
    seo: {
      title: "Varanasi, Prayagraj and Gaya Pilgrimage, 6 Days",
      description:
        "Six days from Kashi to the Sangam at Prayagraj and on to Gaya: Kashi Vishwanath, rites on the Ganga, Pind Daan at the Vishnupad temple and the Mahabodhi Temple.",
    },
  },

  /* ------------------------------------------------------------------ P11 */
  {
    id: "P11",
    slug: "sarnath-kushinagar",
    status: "published",
    setup: "Route and gateway validation",
    title: "Sarnath and Kushinagar Buddhist Journey",
    route: "An Uttar Pradesh Buddhist journey: Sarnath and Kushinagar, from Varanasi to Gorakhpur",
    destinations: ["varanasi", "sarnath", "kushinagar"],
    types: ["buddhist"],
    nights: 3,
    days: 4,
    durationNote: "3N/4D, with two nights in Kushinagar; a night in Varanasi can be added before Sarnath",
    overnights: [
      { place: "Varanasi (for Sarnath)", nights: 1 },
      { place: "Kushinagar", nights: 2 },
    ],
    suits:
      "Buddhist pilgrims and travellers with limited days who want the place of the first teaching and the place of the parinirvana in one short journey, and can manage one long road day.",
    style:
      "A compact private journey: Sarnath on the afternoon you arrive, one road day north, and a full, unhurried day among the stupas and shrines of Kushinagar.",
    summary:
      "Three nights linking Sarnath, where the Buddha gave his first teaching, with Kushinagar, the place of his parinirvana, ending at Gorakhpur for onward flights and trains.",
    lead:
      "This four-day Buddhist journey within Uttar Pradesh begins as soon as you arrive in Varanasi, with an afternoon at Sarnath, where the Buddha first taught: the Dhamek Stupa, the Archaeological Museum and the Mulagandha Kuti Vihara. The next day a drive of about six hours carries you north to Kushinagar. A full day there takes in the Mahaparinirvana Temple with its reclining Buddha, the Ramabhar Stupa at the place of cremation and the Matha Kuar shrine, before the short drive to Gorakhpur on Day 4.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure: "Gorakhpur airport or Gorakhpur Junction, about 55 km and an hour and a half by road from Kushinagar.",
      timingWarning:
        "Sarnath is visited on the afternoon of Day 1, so arrive in Varanasi by about 1 pm; the Sarnath museum is closed on Fridays. A later arrival moves Sarnath to the morning of Day 2, before the drive. Kushinagar's own airport has had no regular scheduled flights since November 2023; we plan around Gorakhpur unless a current schedule is confirmed. Fog in December and January can delay flights and trains.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival & Sarnath",
        place: "Varanasi and Sarnath",
        photo: "sarnath-monks",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station and takes you to the hotel. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Midday", title: "Check in and lunch", text: "A short rest before Sarnath." },
          { kind: "visit", time: "Afternoon", title: "Sarnath", text: "About half an hour north of the city, the deer park where the Buddha gave his first teaching: the Dhamek Stupa and the ruins of the old monasteries, the Archaeological Museum with the Ashokan lion capital, and the Mulagandha Kuti Vihara with its murals. The museum is closed on Fridays." },
          { kind: "free", time: "Evening", title: "A quiet evening", text: "Dinner at the hotel or nearby. An evening on the Ganges can be added if you wish." },
        ],
      },
      {
        day: 2,
        title: "Varanasi to Kushinagar",
        place: "On the road to Kushinagar",
        photo: "private-car",
        overnight: "Kushinagar",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Scenic drive to Kushinagar", text: "About 240 to 260 km through the farmland of eastern Uttar Pradesh, usually around six hours with stops for tea and lunch." },
          { kind: "rest", time: "Afternoon", title: "Hotel check-in", text: "Time to settle in after the drive." },
          { kind: "free", time: "Evening", title: "At leisure", text: "A quiet evening. The Mahaparinirvana Temple is a short walk or drive from most hotels if you want a first look." },
        ],
      },
      {
        day: 3,
        title: "Kushinagar Buddhist Exploration",
        place: "Kushinagar",
        photo: "kushinagar-mahaparinirvana",
        overnight: "Kushinagar",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Mahaparinirvana Temple", text: "The temple of the reclining Buddha, a 5th-century image about six metres long that marks the Buddha's parinirvana, and the stupa behind it, at the quiet hour before the day's groups arrive." },
          { kind: "visit", time: "Morning", title: "Ramabhar Stupa and Matha Kuar Shrine", text: "The great brick stupa at Ramabhar, which by tradition marks the place of the Buddha's cremation, and the Matha Kuar shrine with its seated Buddha image, a short drive apart." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "free", time: "Afternoon", title: "The monasteries of Kushinagar", text: "Temples built by Buddhist communities from Thailand, Japan, Myanmar and elsewhere stand within a short distance of each other. Visit them at your own pace, or keep the afternoon for meditation." },
        ],
      },
      {
        day: 4,
        title: "Departure via Gorakhpur",
        place: "Kushinagar to Gorakhpur",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Transfer to Gorakhpur", text: "About an hour and a half to Gorakhpur airport or Gorakhpur Junction, timed to your flight or train." },
          { kind: "departure", time: "At your departure time", title: "Departure", text: "Your driver drops you for your onward journey." },
        ],
      },
    ],
    practical: {
      walking:
        "Sarnath and Kushinagar are largely flat, but each visit involves one to two kilometres on brick paths, lawns and uneven ruins. Shoes come off inside temples and shrines.",
      earlyStarts: "The early visit to the Mahaparinirvana Temple on Day 3 is by choice. The road day starts after breakfast, around 8 am.",
      boarding:
        "There are no boat outings on this journey. At Sarnath and Kushinagar the car parks are a short walk from each site.",
      mobility:
        "Day 2 is a long road day, about six hours with stops. Ruins have uneven ground and few ramps; tell us early about mobility needs so we can assess each site. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the main season, with fog in December and January that can slow roads and delay flights. April to June is very hot, so visits keep to early morning and late afternoon. July to September is monsoon. Kushinagar is busiest with pilgrim groups in winter and around Buddha Purnima.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotel or monastery guest house",
          "Private AC sedan with driver",
          "Local guide at Sarnath and Kushinagar",
        ],
        hotels: "Selected 3-star hotels in Varanasi and Kushinagar, or a monastery guest house in Kushinagar where one has rooms. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all three hotel nights. Lunches and dinners are not included.",
        boat: "Not included. An evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Visits to the stupas, temples and monasteries are planned around opening hours and the heat.",
        assistance: ASSIST_STANDARD,
        guide: "A local guide for the Sarnath visit (Day 1) and the Kushinagar sites (Day 3).",
        admissions: "Entry tickets at the protected site and museum in Sarnath are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gorakhpur airport or Gorakhpur Junction"),
          { item: "S02", session: "Day 1 to Day 4", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route, including Sarnath", state: "included", mandatory: true },
          { item: "S12", session: "Day 1 and Day 3", quantity: 2, scope: "Local guide at Sarnath, about two hours, and for the Mahaparinirvana Temple, Ramabhar Stupa and Matha Kuar, about three hours", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gorakhpur",
          "Lunches and dinners",
          "Entry tickets and camera fees",
          "Offerings, donations and tips",
          "Travel insurance",
        ],
      },
      premium: {
        highlights: [
          "4-star hotels, such as Lotus Nikko, Kushinagar",
          "AC Innova Crysta or similar SUV with chauffeur",
          "Expert Buddhist heritage scholar as your guide",
          "Named coordinator and a welcome on arrival",
        ],
        hotels: "Selected 4-star hotels in Varanasi and Kushinagar, such as the Lotus Nikko in Kushinagar. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "Not included. A private evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Your scholar guide accompanies each site visit and explains its place in the Buddha's life.",
        assistance: "A named coordinator throughout, a welcome on arrival, and scholar-guided visits at Sarnath and Kushinagar.",
        guide: "An expert Buddhist heritage scholar at Sarnath (Day 1) and at the Kushinagar sites (Day 3).",
        admissions: "Entry tickets for the guided visit at Sarnath, including the museum, are included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Gorakhpur airport or Gorakhpur Junction"),
          { item: "S02", session: "Day 1 to Day 4", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 4", scope: "Vehicle group upgraded to an Innova Crysta or similar SUV, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "E24", day: 1, session: "Day 1 afternoon", scope: "Sarnath with an expert Buddhist heritage scholar, about two and a half hours, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", day: 3, session: "Day 3 morning", scope: "Expert Buddhist heritage scholar for the Mahaparinirvana Temple, Ramabhar Stupa and Matha Kuar, about three hours", state: "included", mandatory: false },
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
        highlights: [
          "Luxury 5-star or top boutique hotel in Varanasi",
          "Best available premium property in Kushinagar",
          "Luxury SUV with a chauffeur throughout",
          "Private Buddhist scholar at Sarnath and Kushinagar",
        ],
        hotels: "A luxury 5-star or top boutique hotel in Varanasi, and the best available premium property in Kushinagar, which has no 5-star hotels. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.luxury,
        meals: "Breakfast daily, plus lunch on the road day (Day 2). Other meals are not included.",
        boat: "Not included. A private evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Your concierge plans each visit around opening hours, crowds and any meditation time you wish to keep; no special access is promised.",
        assistance: ASSIST_LUXURY,
        guide: "A private Buddhist scholar with you at Sarnath (Day 1) and through the Kushinagar day (Day 3).",
        admissions: "Entry tickets for all listed site visits, including the Sarnath museum, are included.",
        photography: "A defined professional photography session of about two hours at Sarnath or Kushinagar, with edited image count and delivery time stated in your quotation. Photography inside shrines follows each site's rules.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Gorakhpur airport or Gorakhpur Junction"),
          { item: "S02", session: "Day 1 to Day 4", scope: "Private chauffeured transport for the whole route in the luxury vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 4", scope: "Luxury SUV: Fortuner, Mercedes or suitable alternative chosen for the party and route, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 4"),
          { item: "S10", session: "Day 1 to Day 4", scope: "Personal host with you at Sarnath, on the road and at Kushinagar, within agreed hours", state: "included", mandatory: false },
          { item: "S12", session: "Day 1 and Day 3", quantity: 2, scope: "A private Buddhist scholar at Sarnath and for the full Kushinagar day, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S24", day: 3, session: "Day 3", scope: "Professional photography session of about two hours at Kushinagar, or at Sarnath if preferred; edited image count and delivery time stated in your quotation; consent asked first", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 4", scope: "Dietary requirements relayed to each hotel, and the Day 2 lunch stop reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Gorakhpur",
          "Dinners, and lunches other than on Day 2",
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
        q: "Why does the journey end at Gorakhpur?",
        a: "Kushinagar has an airport, but it has had no regular scheduled flights since November 2023. Gorakhpur, about an hour and a half away, has an airport with daily flights and a major railway junction.",
      },
      {
        q: "Can Shravasti be added?",
        a: "Yes. The Sarnath, Kushinagar and Shravasti Pilgrimage adds Shravasti over two more nights and ends in Lucknow.",
      },
      {
        q: "What if we arrive in Varanasi late?",
        a: "Sarnath is planned for the afternoon of Day 1. If your flight or train arrives after about 1 pm, or Day 1 is a Friday when the museum is closed, we move Sarnath to the morning of Day 2 and start the drive to Kushinagar a little later, or suggest an extra night in Varanasi.",
      },
    ],
    hero: "sarnath-dhamek-stupa",
    gallery: ["varanasi-boat-sunrise", "varanasi-river-mist", "village-life"],
    seo: {
      title: "Sarnath and Kushinagar Buddhist Journey, 4 Days",
      description:
        "A compact four-day Buddhist journey in Uttar Pradesh: Sarnath, where the Buddha first taught, and two nights at Kushinagar, the place of his parinirvana.",
    },
  },

  /* ------------------------------------------------------------------ P12 */
  {
    id: "P12",
    slug: "sarnath-kushinagar-shravasti",
    status: "published",
    setup: "Priority launch candidate after supplier validation",
    title: "Sarnath, Kushinagar and Shravasti Pilgrimage",
    route: "An Uttar Pradesh Buddhist journey: Sarnath, Kushinagar and Shravasti, from Varanasi to Lucknow",
    destinations: ["varanasi", "sarnath", "kushinagar", "shravasti"],
    types: ["buddhist"],
    nights: 5,
    days: 6,
    durationNote: "5N/6D. The fifth night is in Lucknow or Ayodhya; an extra night in Kushinagar can be requested",
    overnights: [
      { place: "Varanasi (for Sarnath)", nights: 1 },
      { place: "Kushinagar", nights: 1 },
      { place: "Shravasti", nights: 2 },
      { place: "Lucknow or Ayodhya", nights: 1 },
    ],
    suits:
      "Buddhist pilgrims, monastic and lay groups, and travellers drawn to the life of the Buddha who are comfortable with two long road days. Parents and older travellers can manage it with the Premium or Luxury assistance, or with an extra night added.",
    style:
      "A private, driven journey across Uttar Pradesh: site visits in the cool of the morning, time for sitting or chanting where each place allows, and two nights at Shravasti to slow the pace.",
    summary:
      "Five nights from Varanasi to Lucknow: the deer park at Sarnath where the Buddha first taught, Kushinagar, the place of his parinirvana, and two nights at the Jetavana grove in Shravasti.",
    lead:
      "This six-day Uttar Pradesh Buddhist journey begins with an afternoon at Sarnath on the day you arrive, where the Buddha gave his first teaching. The next day carries you north to Kushinagar, the place of his parinirvana, for an evening of rest. After a morning at the Mahaparinirvana Temple and the Ramabhar Stupa, you drive west to Shravasti for two nights, with a full day at the Jetavana monastery, the Anathapindika and Angulimala stupas and the Anandabodhi tree. The journey ends with a drive to Lucknow or Ayodhya, with sightseeing along the way.",
    gateways: {
      arrival:
        "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), about 45 minutes to an hour from most hotels, or Varanasi Junction and Banaras railway stations.",
      departure:
        "Lucknow: Chaudhary Charan Singh International Airport or the city's main railway stations. From Ayodhya, Lucknow is about three hours by road, and Ayodhya airport can suit some flight schedules.",
      timingWarning:
        "Sarnath is visited on the afternoon of Day 1, so arrive in Varanasi by about 1 pm; the Sarnath museum is closed on Fridays. Day 3 combines the Kushinagar visits with a drive of five to six hours to Shravasti. If the fifth night is in Ayodhya, Day 6 starts with about three hours to Lucknow. As of October 2026, Kushinagar airport has no regular scheduled flights and Shravasti airport's service has been limited, so we do not plan around either unless a current schedule is confirmed. Winter fog can delay roads, flights and trains in December and January.",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Varanasi & Sarnath",
        place: "Varanasi and Sarnath",
        photo: "sarnath-dhamek-stupa",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Pick-up and check-in", text: "Your driver meets you at the airport or station and takes you to the hotel. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Midday", title: "Lunch and a pause", text: "A short rest before the drive of about half an hour to Sarnath, north of the city." },
          { kind: "visit", time: "Afternoon", title: "Sarnath exploration", text: "The deer park where the Buddha gave his first teaching to five companions. Walk the grounds around the Dhamek Stupa and the ruins of the old monasteries, visit the modern Mulagandha Kuti Vihara, and see the Ashokan lion capital in the Archaeological Museum, which is closed on Fridays." },
          { kind: "free", time: "Evening", title: "A quiet first evening", text: "Dinner at the hotel or nearby. An evening on the Ganges can be added if you wish; it is not part of this journey's base programme." },
        ],
      },
      {
        day: 2,
        title: "Varanasi to Kushinagar",
        place: "On the road to Kushinagar",
        photo: "private-car",
        overnight: "Kushinagar",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive north to Kushinagar", text: "About 240 to 260 km, usually five to six hours with stops for tea and lunch. The roads are mostly highway, slower through towns." },
          { kind: "rest", time: "Afternoon", title: "Check in", text: "Time to settle in after the drive." },
          { kind: "rest", time: "Evening", title: "Evening rest", text: "A quiet evening at the hotel ahead of an early start at the temple." },
        ],
      },
      {
        day: 3,
        title: "Kushinagar to Shravasti",
        place: "Kushinagar",
        photo: "kushinagar-mahaparinirvana",
        overnight: "Shravasti",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Mahaparinirvana Temple", text: "The temple of the reclining Buddha at the quiet hour, for sitting or offerings before the day's groups arrive. The image, about six metres long, dates from the 5th century and marks the Buddha's parinirvana." },
          { kind: "visit", time: "Morning", title: "Ramabhar Stupa", text: "The great brick stupa that by tradition marks the place of the Buddha's cremation, a short drive from the temple." },
          { kind: "travel", time: "Afternoon", title: "Drive west to Shravasti", text: "About 240 to 255 km through the farmland of eastern Uttar Pradesh, usually five to six hours with a lunch stop, arriving in the evening. Parts of the route are on smaller roads." },
        ],
      },
      {
        day: 4,
        title: "Shravasti Sightseeing",
        place: "Shravasti",
        photo: "sarnath-monks",
        overnight: "Shravasti",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Jetavana Monastery and the Anandabodhi Tree", text: "The monastery garden given to the Buddha by the merchant Anathapindika, where he spent many rainy seasons. Walk the brick foundations of the Gandhakuti, his dwelling, and sit beneath the Anandabodhi tree." },
          { kind: "visit", time: "Late morning", title: "Anathapindika Stupa and Angulimala Stupa", text: "The two great mounds in the ruins of ancient Shravasti at Maheth, linked with the merchant who gave Jetavana and with Angulimala, the bandit the Buddha turned to the path." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "free", time: "Afternoon", title: "Time to sit or rest", text: "Return to Jetavana for quiet sitting in the evening light, or visit the temples built by Buddhist communities from across Asia." },
        ],
      },
      {
        day: 5,
        title: "Shravasti to Lucknow / Ayodhya",
        place: "Lucknow or Ayodhya",
        photo: "lucknow-rumi-darwaza",
        overnight: "Lucknow or Ayodhya",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Lucknow or Ayodhya", text: "About 170 km and four hours to Lucknow, or a little less to Ayodhya, depending on where you spend the last night." },
          { kind: "visit", time: "Afternoon", title: "Sightseeing along the way", text: "In Lucknow, the Bara Imambara and the Rumi Darwaza; in Ayodhya, the Shri Ram Janmabhoomi Mandir or Hanuman Garhi, and the evening aarti at Ram ki Paidi. We plan the stops with you." },
          { kind: "rest", time: "Evening", title: "Rest", text: "A last evening at the hotel." },
        ],
      },
      {
        day: 6,
        title: "Departure",
        place: "Lucknow",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "departure", time: "At your departure time", title: "Transfer to Lucknow airport or station", text: "Your driver drops you for your onward flight or train. From Ayodhya, allow about three hours by road, or use Ayodhya airport if a flight suits you." },
        ],
      },
    ],
    practical: {
      walking:
        "Sarnath, Kushinagar and Shravasti are largely flat, but each visit involves one to two kilometres on brick paths, lawns and uneven ruins. Shoes come off inside temples and shrines, so socks help on hot or cold stone.",
      earlyStarts:
        "The early visits at Kushinagar and Jetavana are by choice, but Day 3 starts early to fit the Kushinagar sites before the drive. Other road days start after breakfast, around 8 am.",
      boarding:
        "There are no boat outings in the base programme. At each site the car park is a short walk from the entrance.",
      mobility:
        "The road days are long, about five to six hours each on Day 2 and Day 3, so a comfortable vehicle and regular stops matter more than speed. Ruins have uneven ground and few ramps; wheelchair users and guests with limited mobility should tell us early so we can assess each site. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the main season, with pleasant days and cold mornings; December and January bring fog that can slow roads and delay flights and trains. April to June is very hot, so visits keep to early morning and late afternoon. July to September is monsoon. Kushinagar and Shravasti are busiest with pilgrim groups in winter and around Buddha Purnima.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star accommodation throughout",
          "Private AC sedan with driver",
          "Standard guide service at each Buddhist site",
        ],
        hotels: "Selected 3-star hotels in Varanasi, Kushinagar, Shravasti and Lucknow or Ayodhya. Hotel choice in Kushinagar and Shravasti is limited; hotels are subject to availability and named in your quotation.",
        vehicle: VEHICLE.standard,
        meals: "Breakfast on all five hotel nights. Lunches and dinners are not included.",
        boat: "Not included. An evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Visits to the stupas, temples and monasteries are planned into each day, with timings set around opening hours and the heat.",
        assistance: ASSIST_STANDARD,
        guide: "A standard local guide at Sarnath (Day 1), Kushinagar (Day 3) and Shravasti (Day 4).",
        admissions: "Entry tickets at the protected sites in Sarnath and Shravasti, and at the Sarnath museum, are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private air-conditioned sedan or suitable equivalent with driver for the whole route, including both road days and the drive to Lucknow or Ayodhya", state: "included", mandatory: true },
          { item: "S12", session: "Day 1, Day 3 and Day 4", quantity: 3, scope: "Standard local guide at Sarnath, at the Mahaparinirvana Temple and Ramabhar Stupa, and at Jetavana and Maheth, about two to three hours each", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Lunches and dinners",
          "Entry tickets and camera fees at protected sites and the Sarnath museum",
          "Offerings, donations and tips",
          "Porterage, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      premium: {
        highlights: [
          "4-star accommodation, best available in Shravasti",
          "AC Innova Crysta or similar SUV with chauffeur",
          "Specialised Buddhist circuit guide at every site",
          "Named coordinator and a welcome on arrival",
        ],
        hotels: "Selected 4-star hotels in Varanasi, Kushinagar and Lucknow or Ayodhya, and the best available property in Shravasti, which has few hotels of this category. Subject to availability and named in your quotation.",
        vehicle: `${VEHICLE.premium} More room and comfort for the two long road days.`,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "Not included. A private evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Your specialised guide accompanies each site visit and explains each place.",
        assistance: "A named coordinator throughout, a team member to welcome you on arrival, and the guided visits listed below.",
        guide: "A specialised Buddhist circuit guide at Sarnath (Day 1), Kushinagar (Day 3) and Shravasti (Day 4).",
        admissions: "Entry tickets for the guided visit at Sarnath, including the museum, are included. Shravasti entry tickets are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Vehicle group upgraded to an Innova Crysta or similar SUV, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "E24", day: 1, session: "Day 1 afternoon", scope: "Sarnath with a specialised Buddhist guide, about two and a half hours, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", session: "Day 3 and Day 4", quantity: 2, scope: "Specialised Buddhist circuit guide for the Mahaparinirvana Temple and Ramabhar Stupa, and for Jetavana and Maheth, about three hours each", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Lunches and dinners",
          "Entry tickets at Shravasti, and camera fees",
          "Offerings, donations and tips",
          "Porterage, laundry and personal expenses",
          "Travel insurance",
        ],
      },
      luxury: {
        highlights: [
          "Premium boutique or top 4 to 5-star properties",
          "Best available premium stays in Kushinagar and Shravasti",
          "Luxury SUV with a chauffeur throughout",
          "Private historian at Sarnath, Kushinagar and Shravasti",
          "Full concierge and a personal host",
        ],
        hotels: "Premium boutique or top 4 to 5-star properties in Varanasi and Lucknow or Ayodhya, and the best available premium property in Kushinagar and Shravasti, which have no 5-star hotels. Subject to availability and named in your quotation.",
        vehicle: `${VEHICLE.luxury} On the rural stretch to Shravasti an SUV is often the better choice.`,
        meals: "Breakfast daily, plus lunch on the two long road days (Day 2 and Day 3) at a suitable stop or packed by the hotel. Other meals are not included; dietary needs are passed to each hotel.",
        boat: "Not included. A private evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Your concierge plans each site visit around opening hours, crowds and any chanting or meditation time you wish to keep; no special access is promised.",
        assistance: `${ASSIST_LUXURY} Your host travels with you from Day 1 to Day 6.`,
        guide: "A private historian at Sarnath (Day 1), Kushinagar (Day 3) and Shravasti (Day 4), and on the Day 5 sightseeing if you wish.",
        admissions: "Entry tickets for all listed site visits, including the Sarnath museum, are included.",
        photography: "A defined professional photography session of about two hours at Shravasti, or at Sarnath if you prefer, with the number of edited images and delivery time stated in your quotation. Photography inside shrines follows each site's rules.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 6", scope: "Private chauffeured transport for the whole route in the luxury vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 6", scope: "Luxury SUV: Fortuner, Mercedes or suitable alternative chosen for the party and these roads, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 6"),
          { item: "S10", session: "Day 1 to Day 6", scope: "Personal host travelling with you on site days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "S12", session: "Day 1, Day 3 and Day 4", quantity: 3, scope: "A private historian for Sarnath, the Kushinagar sites, and Jetavana and Maheth at Shravasti, about three hours each, including entry tickets", state: "included", mandatory: false },
          { item: "S24", day: 4, session: "Day 4", scope: "Professional photography session of about two hours at Shravasti, or at Sarnath if preferred; edited image count and delivery time stated in your quotation; consent asked before any photographs of you are taken", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 6", scope: "Dietary requirements relayed to every hotel, and lunch stops on Day 2 and Day 3 reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Dinners, and lunches other than on Day 2 and Day 3",
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
        a: "Kushinagar and Shravasti both have airports, but as of October 2026 neither has a reliable regular scheduled service. Lucknow, about four hours from Shravasti, has good flight and train links. You can spend the last night in Lucknow or in Ayodhya, and if a current schedule at Ayodhya suits you better, we will plan around it.",
      },
      {
        q: "How long are the road days?",
        a: "Day 2 (Varanasi to Kushinagar) and Day 3 (Kushinagar to Shravasti) are each about five to six hours with stops, and Day 5 is about four hours to Lucknow. If that is too much, ask for a slower version with an extra night in Kushinagar.",
      },
      {
        q: "Is a guide included at every site?",
        a: "Yes, at every tier. Standard includes a local guide at Sarnath, Kushinagar and Shravasti, Premium a specialised Buddhist circuit guide, and Luxury a private historian. Language assistance can be requested for groups who prefer another language.",
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
    status: "published",
    setup: "Publish only after exact route and sites are approved",
    title: "Extended Uttar Pradesh Buddhist Pilgrimage",
    route: "Sarnath, Kushinagar, Shravasti and Sankisa, from Varanasi to Lucknow",
    destinations: ["varanasi", "sarnath", "kushinagar", "shravasti", "sankisa"],
    types: ["buddhist"],
    nights: 7,
    days: 8,
    durationNote: "7N/8D as shown. An 8N/9D version with an extra night, for example a third night at Shravasti or a night in Agra, can be requested",
    overnights: [
      { place: "Varanasi (for Sarnath)", nights: 1 },
      { place: "Kushinagar", nights: 2 },
      { place: "Shravasti", nights: 2 },
      { place: "Sankisa or Farrukhabad", nights: 1 },
      { place: "Lucknow", nights: 1 },
    ],
    suits:
      "Buddhist pilgrims and groups who want the principal places of the Buddha's life in Uttar Pradesh, including Sankisa, and have the time for long road days with rest between them.",
    style:
      "A long private journey across Uttar Pradesh from east to west, with two nights each at Kushinagar and Shravasti, time for meditation at each site and a simpler stay near Sankisa.",
    summary:
      "Seven nights to Sarnath, Kushinagar, Shravasti and Sankisa, the Buddha's places in Uttar Pradesh, with two nights at the main sites and rest between long road days.",
    lead:
      "This extended journey follows the Buddha's places across Uttar Pradesh from east to west. It begins with the stupas and museum at Sarnath on the day you arrive in Varanasi, then spends two nights at Kushinagar, the place of his parinirvana, with time for meditation at the Mahaparinirvana Temple and the Ramabhar Stupa. By way of Balrampur you reach Shravasti for two nights among the Jetavana monastery and the ancient ruins, before a long drive to Sankisa, where by tradition he descended to earth, and its Elephant Pillar. The journey ends in Lucknow.",
    gateways: {
      arrival: "Varanasi: Lal Bahadur Shastri International Airport (Babatpur), or Varanasi Junction and Banaras railway stations.",
      departure:
        "Lucknow: Chaudhary Charan Singh International Airport or the city's main railway stations. Agra, about four hours from Sankisa, can replace Lucknow if your onward connection suits it.",
      timingWarning:
        "Sarnath is visited on the afternoon of Day 1, so arrive in Varanasi by about 1 pm; the Sarnath museum is closed on Fridays. Day 6, from Shravasti to Sankisa, is the longest road day, and Day 7 adds about five hours from Sankisa to Lucknow. Kushinagar and Shravasti airports have had little or no regular scheduled service, and accommodation near Sankisa is limited and simple, so we confirm the overnights and your departure before fixing the programme.",
    },
    itinerary: [
      {
        day: 1,
        title: "Varanasi Arrival & Sarnath",
        place: "Varanasi and Sarnath",
        photo: "sarnath-dhamek-stupa",
        overnight: "Varanasi",
        blocks: [
          { kind: "arrival", time: "On arrival", title: "Meet your driver", text: "Your driver meets you at the airport or station. Premium and Luxury guests are also welcomed by a member of the team." },
          { kind: "rest", time: "Midday", title: "Check in and lunch", text: "A short rest before Sarnath." },
          { kind: "visit", time: "Afternoon", title: "Sarnath stupas and museum", text: "The deer park of the first teaching: the Dhamek Stupa, the Dharmarajika Stupa and the monastery ruins, the Mulagandha Kuti Vihara, and the Archaeological Museum with the Ashokan lion capital, which is closed on Fridays." },
        ],
      },
      {
        day: 2,
        title: "Varanasi to Kushinagar",
        place: "On the road to Kushinagar",
        photo: "private-car",
        overnight: "Kushinagar",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive north to Kushinagar", text: "About 240 to 260 km, usually five to six hours with stops." },
          { kind: "rest", time: "Afternoon", title: "Check in and rest", text: "Time to settle in after the drive." },
          { kind: "visit", time: "Evening", title: "Evening orientation", text: "A short walk around the Mahaparinirvana Temple and the monastery quarter in the evening light, to get your bearings for the next day." },
        ],
      },
      {
        day: 3,
        title: "Kushinagar Pilgrimage",
        place: "Kushinagar",
        photo: "sarnath-monks",
        overnight: "Kushinagar",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Mahaparinirvana Temple", text: "The reclining Buddha, a 5th-century image about six metres long, at the quiet hour before the day's groups arrive." },
          { kind: "visit", time: "Morning", title: "Ramabhar Stupa", text: "The great brick stupa that by tradition marks the place of the Buddha's cremation." },
          { kind: "rest", time: "Midday", title: "Lunch and rest", text: "Back to the hotel through the heat of the day." },
          { kind: "experience", time: "Afternoon", title: "Meditation", text: "Time for sitting or chanting at the temple or in the gardens of one of Kushinagar's monasteries, built by Buddhist communities from across Asia." },
        ],
      },
      {
        day: 4,
        title: "Kushinagar to Shravasti",
        place: "On the road to Shravasti",
        photo: "village-life",
        overnight: "Shravasti",
        blocks: [
          { kind: "travel", time: "After breakfast", title: "Drive to Shravasti via Balrampur", text: "About 240 to 255 km through the farmland of eastern Uttar Pradesh, usually five to six hours with stops, partly on smaller roads, passing through Balrampur for the last stretch." },
          { kind: "rest", time: "Evening", title: "Rest", text: "A free evening after the drive." },
        ],
      },
      {
        day: 5,
        title: "Shravasti Exploration",
        place: "Shravasti",
        photo: "shravasti-jetavana",
        overnight: "Shravasti",
        blocks: [
          { kind: "visit", time: "Early morning", title: "Jetavana Monastery", text: "The monastery garden given by Anathapindika, where the Buddha spent many rainy seasons: the Gandhakuti, the Anandabodhi tree and the brick foundations of the old monasteries." },
          { kind: "visit", time: "Late morning", title: "The ancient ruins of Maheth", text: "The old city of Shravasti, with the mounds known as Angulimala's stupa and Anathapindika's stupa, and the Shobhnath temple mound revered by Jains." },
          { kind: "rest", time: "Afternoon", title: "Rest", text: "A second night here keeps this day unhurried, with time to return to Jetavana in the evening." },
        ],
      },
      {
        day: 6,
        title: "Shravasti to Sankisa",
        place: "On the road to Sankisa",
        photo: "car-premium",
        overnight: "Sankisa or Farrukhabad",
        blocks: [
          { kind: "travel", time: "Early, after breakfast", title: "Drive towards Sankisa", text: "A long drive west into Farrukhabad district, usually seven to eight hours with stops for tea and lunch. This is the longest day of the journey." },
          { kind: "rest", time: "Evening", title: "A simple overnight", text: "Accommodation near Sankisa is limited and simple; the stay, at Sankisa or in Farrukhabad, is named in your quotation." },
        ],
      },
      {
        day: 7,
        title: "Sankisa to Agra/Lucknow",
        place: "Sankisa",
        photo: "lucknow-rumi-darwaza",
        overnight: "Lucknow",
        blocks: [
          { kind: "visit", time: "Morning", title: "The Elephant Pillar site at Sankisa", text: "The village site where, by tradition, the Buddha descended after teaching in the Tavatimsa heaven. A Mauryan elephant capital from an Ashokan pillar stands here, beside an old stupa mound now topped by a temple, with monasteries built nearby." },
          { kind: "travel", time: "From late morning", title: "Proceed to Lucknow", text: "About five hours by road to Lucknow for the last night. If you are flying or travelling on from Agra, about four hours away, we route the day there instead." },
        ],
      },
      {
        day: 8,
        title: "Departure",
        place: "Lucknow",
        photo: "train-station",
        overnight: "Departure day",
        blocks: [
          { kind: "departure", time: "At your departure time", title: "Departure transfer", text: "Your driver drops you at Lucknow airport or station for your onward flight or train." },
        ],
      },
    ],
    practical: {
      walking:
        "The sites are largely flat, but each involves one to two kilometres on brick paths, lawns and uneven ruins. Sankisa's mound has an uneven climb to the temple at the top.",
      earlyStarts:
        "The early visits at Kushinagar and Jetavana are by choice, and Day 6 starts soon after breakfast for the long drive to Sankisa.",
      boarding:
        "There are no boat outings in the base programme. At each site the car park is a short walk from the entrance, and at Sankisa the vehicle stops close to the mound.",
      mobility:
        "Four road days, two of them very long, make this a demanding journey. Ruins have uneven ground and few ramps; tell us about mobility needs early. We do not describe this route as fully accessible.",
      seasonal:
        "October to March is the main season, with fog in December and January that can slow roads and delay flights. April to June is very hot; July to September is monsoon. The sites are busiest with pilgrim groups in winter and around Buddha Purnima.",
    },
    tiers: {
      standard: {
        highlights: [
          "3-star hotels or pilgrims' lodges",
          "AC sedan, or AC Tempo Traveller for groups",
          "Standard entrance tickets included",
        ],
        hotels: "Selected 3-star hotels or pilgrims' lodges. Kushinagar, Shravasti and especially the Sankisa area have limited choice; hotels are subject to availability and named in your quotation.",
        vehicle: VEHICLE.standardGroup,
        meals: "Breakfast on all seven hotel nights. Lunches and dinners are not included.",
        boat: "Not included. An evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Site visits are planned around opening hours and the heat.",
        assistance: ASSIST_STANDARD,
        guide: "No sightseeing guide is included. Your driver is not a guide; a guide can be added at any site.",
        admissions: "Standard entrance tickets at the protected sites in Sarnath, Kushinagar and Shravasti, and at the Sarnath museum, are included. Camera fees are paid locally.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private air-conditioned sedan, or a Tempo Traveller for larger groups, with driver for the whole route", state: "included", mandatory: true },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Lunches and dinners",
          "Sightseeing and specialist guides",
          "Camera fees",
          "Offerings, donations and tips",
          "Travel insurance",
        ],
      },
      premium: {
        highlights: [
          "4-star heritage or hotel-chain properties",
          "AC Innova Crysta or similar SUV with chauffeur",
          "Expert scholar guide at every site",
          "Entry tickets booked, priority where sites allow",
        ],
        hotels: "Selected 4-star heritage or hotel-chain properties in Varanasi, Kushinagar and Lucknow, and the best available property in Shravasti and around Sankisa, which have few hotels of this category. Subject to availability and named in your quotation.",
        vehicle: VEHICLE.premium,
        meals: "Breakfast daily. Lunches and dinners are not included.",
        boat: "Not included. A private evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Your scholar arranges entry and timings in advance so that you wait as little as each site's own arrangements allow; no special access is promised.",
        assistance: "A named coordinator throughout, a welcome on arrival, and scholar-guided visits at Sarnath, Kushinagar, Shravasti and Sankisa.",
        guide: "An expert scholar guide at Sarnath (Day 1), Kushinagar (Day 3), Shravasti (Day 5) and Sankisa (Day 7).",
        admissions: "Entry tickets for all guided visits, including the Sarnath museum, are included.",
        photography: PHOTO_OPTIONAL,
        security: SECURITY_ON_REQUEST,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private chauffeured transport for the whole route in the upgraded vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 8", scope: "Vehicle group upgraded to an Innova Crysta or similar SUV, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          { item: "E24", day: 1, session: "Day 1 afternoon", scope: "Sarnath with an expert scholar guide, including site and museum entry tickets", state: "included", mandatory: false },
          { item: "S12", session: "Day 3, Day 5 and Day 7", quantity: 3, scope: "Expert scholar guide for the Kushinagar sites, for Jetavana and Maheth at Shravasti, and for Sankisa, where a guide is available, with entry arranged in advance", state: "included", mandatory: false },
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Lunches and dinners",
          "Camera fees",
          "Offerings, donations and tips",
          "Travel insurance",
        ],
      },
      luxury: {
        highlights: [
          "Top premium hotels, best available in small towns",
          "Luxury chauffeur-driven vehicle throughout",
          "Fully customised journey with a luxury escort",
          "All meals included, day by day",
          "All entry tickets arranged in advance",
        ],
        hotels: "Top premium hotels in Varanasi and Lucknow, and the best available premium property in Kushinagar, Shravasti and around Sankisa, which have no 5-star hotels. Subject to availability and named in your quotation.",
        vehicle: `${VEHICLE.luxury} An SUV is usually the better choice for the rural roads on this route.`,
        meals: "All meals, from dinner on Day 1 to breakfast on Day 8, at hotels or suitable restaurants. On the long road days lunch may be a simple stop or packed by the hotel; dietary needs are passed to each kitchen.",
        boat: "Not included. A private evening on the Ganges in Varanasi can be added.",
        darshan: "Not a darshan itinerary. Your escort and concierge plan each visit around opening hours, crowds and any chanting or meditation time you wish to keep; no special access is promised.",
        assistance: `${ASSIST_LUXURY} Your escort travels with you from Day 1 to Day 8, and the programme is customised with you before travel.`,
        guide: "Specialist guides at Sarnath, Kushinagar, Shravasti and Sankisa.",
        admissions: "Entry tickets for all listed site visits, including the Sarnath museum, are included.",
        photography: "A defined professional photography session of about two hours at Kushinagar or Shravasti, with edited image count and delivery time stated in your quotation.",
        security: SECURITY_LUXURY,
        lines: [
          transfers("Varanasi airport or station", "Lucknow airport or station"),
          { item: "S02", session: "Day 1 to Day 8", scope: "Private chauffeured transport for the whole route in the luxury vehicle group below", state: "included", mandatory: true },
          { item: "S03", session: "Day 1 to Day 8", scope: "Luxury chauffeur-driven SUV: Fortuner, Mercedes or suitable alternative chosen for the party and route, subject to availability and named in your quotation", state: "included", mandatory: false },
          arrivalWelcome("Varanasi airport or station"),
          welcomeAmenities,
          concierge("Day 1 to Day 8"),
          { item: "S10", session: "Day 1 to Day 8", scope: "A personal escort travelling with you on site days and road days, within agreed hours", state: "included", mandatory: false },
          { item: "S12", session: "Day 1, Day 3, Day 5 and Day 7", quantity: 4, scope: "Specialist guides for Sarnath, Kushinagar, Shravasti and Sankisa, including entry tickets", state: "included", mandatory: false },
          { item: "S24", day: 5, session: "Day 5", scope: "Professional photography session of about two hours at Shravasti or Kushinagar; edited image count and delivery time stated in your quotation", state: "included", mandatory: false },
          { item: "S27", session: "Day 1 to Day 8", scope: "All meals arranged with dietary requirements relayed to every hotel, and lunch stops on the road days reserved in advance", state: "included", mandatory: false },
          porter,
          security,
        ],
        excluded: [
          "Flights and trains to Varanasi and from Lucknow",
          "Drinks other than water, tea and coffee with meals",
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
        q: "Why is the drive to Sankisa so long?",
        a: "Sankisa lies far to the west of the other sites, in Farrukhabad district, so Day 6 is a long road day of seven to eight hours with a simple overnight nearby. The next morning you visit the Elephant Pillar site and drive on to Lucknow.",
      },
      {
        q: "Can the journey be longer?",
        a: "Yes. This journey runs from 7N/8D to 8N/9D. An extra night, for example a third night at Shravasti to break the drive or a night in Agra at the end, can be added.",
      },
      {
        q: "Can other sites be added?",
        a: "Additional sites are included only when they fit a realistic route. Tell us which places matter to you and we will advise on time and roads.",
      },
      {
        q: "Is Lumbini part of this journey?",
        a: "No. Lumbini is in Nepal and is never part of an Uttar Pradesh journey. It can be discussed as a separate extension enquiry, quoted on its own.",
      },
    ],
    hero: "kushinagar-mahaparinirvana",
    gallery: ["varanasi-boat-sunrise", "varanasi-river-mist", "travel-host"],
    seo: {
      title: "Extended Uttar Pradesh Buddhist Pilgrimage, 8 Days",
      description:
        "Eight days to Sarnath, Kushinagar, Shravasti and Sankisa, the Buddha's places in Uttar Pradesh, with two nights at the main sites and rest between road days.",
    },
  },
];
