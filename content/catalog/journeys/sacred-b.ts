import type { Journey } from "../types";

export const journeys: Journey[] = [
  {
    slug: "char-dham-by-helicopter",
    collection: "sacred",
    title: "Char Dham by Helicopter",
    display: ["Char Dham", "by helicopter"],
    kicker: "All four Himalayan shrines in six days, by air",
    summary:
      "Yamunotri, Gangotri, Kedarnath and Badrinath in six days, flying between the valleys from Dehradun, with darshan, palkis and simple mountain stays arranged around the weather.",
    lead:
      "By road, the Char Dham circuit asks ten days or more of switchback driving. By helicopter it takes six, and the time saved goes where it belongs: to the shrines themselves. You fly from the Sahastradhara helipad in Dehradun to Kharsali for Yamunotri, to Harsil for Gangotri, on towards Kedarnath and then to Badrinath before flying home. Seats are booked with a licensed charter operator, darshan is arranged where the temple committees allow, and every flight remains subject to mountain weather and the authorities.",
    days: 6,
    nights: 5,
    route: ["Dehradun", "Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
    cities: [],
    destinations: ["uttarakhand"],
    experiences: [],
    hero: "chardham-helicopter",
    gallery: ["uttarakhand-peaks", "diwali-lamps", "elder-portrait"],
    bestFor:
      "Pilgrims who want all four dhams without the long road, including older travellers who can manage short walks at altitude.",
    season:
      "The shrines open in late April or May and close for winter around Diwali, on dates the temple committees announce each year. Helicopter services pause through the heaviest monsoon weeks, so plan for May to June or mid-September to October.",
    pace: "Early starts, short flights, one shrine a day",
    highlights: [
      "Four dhams in six days, by helicopter",
      "Yamunotri by palki or pony from Janki Chatti",
      "Gangotri on the Bhagirathi, with a night in Harsil",
      "Kedarnath darshan and Adi Shankaracharya's samadhi",
      "Tapt Kund and evening aarti at Badrinath",
      "Dawn puja at Badrinath before the flight home",
    ],
    signature: [
      {
        title: "Darshan arranged ahead",
        text: "Where the temple committee offers special darshan or pujas at Kedarnath and Badrinath, we apply on your behalf before you travel and confirm what has been allotted, subject to its quotas on the day.",
      },
      {
        title: "A palki for Yamunotri",
        text: "The last six kilometres to Yamunotri are on foot, pony or palki. Your guide meets you at Kharsali and arranges a registered palki or pony at Janki Chatti, so the climb is handled for you.",
      },
      {
        title: "Mahabhishek at Badrinath",
        text: "On the final morning, the dawn Mahabhishek puja at Badrinath, booked through the temple committee where places are available, before the flight back to Dehradun.",
      },
      {
        title: "One contact for the whole yatra",
        text: "A Tourmelloh trip contact handles registration, weigh-ins, flight slots and every change the weather forces, from the first evening in Dehradun to the last transfer.",
      },
    ],
    stays: [
      { place: "Dehradun", nights: 1, stay: "Hyatt Regency Dehradun Resort and Spa, or similar" },
      { place: "Kharsali (Yamunotri)", nights: 1, stay: "Yamunakriti, Kharsali, or similar" },
      { place: "Harsil (Gangotri)", nights: 1, stay: "Himalayan Nature Resort, Harsil, or similar" },
      { place: "Sersi (Kedarnath)", nights: 1, stay: "Tailwind Resort, Sersi, or similar" },
      { place: "Badrinath", nights: 1, stay: "Sarovar Portico, Badrinath, or similar" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dehradun",
        place: "Dehradun",
        photo: "luxury-suite",
        text: "You are met at Jolly Grant airport and driven to the hotel on Rajpur Road, close to the Sahastradhara helipad. The afternoon is for rest and for the paperwork, done properly: your yatra registration with the Uttarakhand government is confirmed, your trip contact walks you through the flight plan, and the operator's weight and baggage limits are explained so you can pack one soft bag for the mountains. Dinner is early. The first flight is planned for the clear morning air, and the weather sets the hour, not the timetable.",
        moments: [
          "Met at Jolly Grant airport",
          "Yatra registration checked and confirmed",
          "One soft bag packed for the hills",
        ],
        overnight: "Hyatt Regency Dehradun Resort and Spa, Dehradun",
      },
      {
        day: 2,
        title: "Yamunotri, source of the Yamuna",
        place: "Dehradun → Kharsali → Yamunotri",
        photo: "yamunotri",
        text: "The helicopter lifts off from Sahastradhara and follows the hills to Kharsali, the village where the goddess Yamuna spends her winters. From Janki Chatti the path climbs about six kilometres to the temple, and your guide has a registered palki or pony arranged for anyone who would rather not walk. At the shrine, pilgrims tie rice in a cloth and cook it in the Surya Kund hot spring to carry home as prasad. You come down by mid-afternoon, the river loud beside the path, to a quiet night in Kharsali.",
        moments: [
          "Flight into the Yamuna valley",
          "Rice cooked in the Surya Kund spring",
          "The walk down beside the river",
        ],
        overnight: "Yamunakriti, Kharsali",
      },
      {
        day: 3,
        title: "Gangotri and the Bhagirathi",
        place: "Kharsali → Harsil → Gangotri",
        photo: "gangotri",
        text: "A short flight crosses into the Bhagirathi valley and sets down at Harsil, among apple orchards and deodar. The road to Gangotri runs about 25 kilometres along the river, and the white temple stands where the Bhagirathi comes down fast and grey from its glacier at Gaumukh, a long day's walk upstream. There is time for darshan without hurry, a few minutes at Bhagirath Shila, and the ghats where pilgrims fill copper vessels with Ganga water. Back in Harsil the evening is cool and still, and the valley is one of the loveliest in Garhwal.",
        moments: [
          "Landing among Harsil's apple orchards",
          "Darshan on the Bhagirathi's bank",
          "Ganga water carried home in copper",
        ],
        overnight: "Himalayan Nature Resort, Harsil",
      },
      {
        day: 4,
        title: "Kedarnath",
        place: "Harsil → Sersi → Kedarnath",
        photo: "kedarnath-temple",
        text: "The longest flying day crosses to the Mandakini valley. At Sersi you may change to a shuttle helicopter for the final hop to Kedarnath, as the authorities direct the traffic over the shrine. From the helipad it is a walk of roughly half a kilometre, steady and uphill, to the grey stone temple below the Kedarnath peaks. After darshan there is the Bhim Shila, the boulder that came to rest behind the temple in the 2013 flood and turned the water aside, and the samadhi of Adi Shankaracharya. You fly back down to Sersi for the night, at a far kinder altitude.",
        moments: [
          "The shuttle hop from Sersi",
          "Darshan at the temple of Kedarnath",
          "Bhim Shila and Shankaracharya's samadhi",
        ],
        overnight: "Tailwind Resort, Sersi",
      },
      {
        day: 5,
        title: "Badrinath and Mana",
        place: "Sersi → Badrinath",
        photo: "badrinath-temple",
        text: "A morning flight to Badrinath, on the Alaknanda between the Nar and Narayan ranges, with Neelkanth standing white above the town when the sky is clear. Pilgrims bathe at Tapt Kund, the hot spring below the temple, before darshan of Badri Vishal. In the afternoon your car takes you three kilometres up the valley to Mana, the last village before the Tibetan border, for Vyas Gufa and the stone slab of Bhim Pul over the roaring Saraswati. Evening aarti at the painted temple, then an early night: tomorrow begins before dawn.",
        moments: [
          "Tapt Kund before darshan",
          "Vyas Gufa and Bhim Pul at Mana",
          "Evening aarti at Badri Vishal",
        ],
        overnight: "Sarovar Portico, Badrinath",
      },
      {
        day: 6,
        title: "Mahabhishek and the flight home",
        place: "Badrinath → Dehradun",
        photo: "private-car",
        text: "Those who wish rise early for the Mahabhishek puja, the dawn rite at Badrinath, booked through the temple committee where places allow. After breakfast the helicopter returns you to Sahastradhara, usually by late morning if the weather has been kind. Your car is waiting at the helipad for the drive to Jolly Grant airport, or onward to Rishikesh or Delhi. We plan an evening departure rather than a tight connection, because the mountains keep their own schedule and a delayed take-off should never put the flight home at risk.",
        moments: [
          "Dawn Mahabhishek at Badrinath",
          "Return flight to Sahastradhara",
          "Your car waiting at the helipad",
        ],
        overnight: "Departure",
      },
    ],
    included: [
      "Stays as listed, with daily breakfast and vegetarian dinners in the mountains",
      "Helicopter seats on a licensed charter from Sahastradhara for the full circuit, including any shuttle change for Kedarnath, subject to weather and the authorities",
      "Road transfers at Kharsali, Harsil, Badrinath and Mana",
      "A registered palki or pony for the Yamunotri path",
      "Private chauffeur-driven car in Dehradun for airport and helipad transfers",
      "Meet-and-assist at Jolly Grant airport",
      "Local guides at each of the four shrines",
      "Uttarakhand yatra registration completed on your behalf",
      "Special darshan and puja bookings where the temple committees offer them",
      "A dedicated Tourmelloh trip contact throughout the journey",
    ],
    excluded: [
      "International flights and visas",
      "Domestic flights to and from Dehradun",
      "Travel insurance, which should cover helicopter travel at altitude",
      "Meals not mentioned",
      "Offerings and dakshina at the shrines",
      "Personal expenses, excess baggage and gratuities",
      "Anything not in the written proposal",
    ],
    notes: [
      {
        title: "Weather decides",
        text: "Helicopters fly only in safe daylight conditions, and Himalayan weather can hold them for hours or a day. Keep a spare day before any onward flight; if the mountains close, we rearrange stays and, where possible, continue by road.",
      },
      {
        title: "Weight and baggage",
        text: "Operators weigh every passenger and bag before each sector and set strict limits. Pack one soft bag for the mountains; larger luggage can stay in Dehradun until you return.",
      },
      {
        title: "Altitude and health",
        text: "Kedarnath stands at about 3,580 metres and Badrinath above 3,000. Speak to your doctor before travel if you have heart, lung or blood-pressure concerns, and carry warm layers even in May.",
      },
      {
        title: "Registration and ID",
        text: "Every pilgrim must be registered for the yatra with the Uttarakhand government. We complete it with the ID details you send us, and you carry the same ID throughout.",
      },
    ],
    faqs: [
      {
        q: "Is the helicopter Char Dham suitable for elderly parents?",
        a: "Many older pilgrims choose it precisely because it removes the long drives. The demanding parts are the altitude and the Yamunotri path, for which palkis are available. We ask about health and mobility at the start and plan around the answers.",
      },
      {
        q: "What happens if a flight is held for weather?",
        a: "Flights wait for safe conditions, and the operator and the authorities decide when to fly. Your trip contact keeps you informed, we adjust stays where the hotels allow, and a road alternative is planned if a delay runs long.",
      },
      {
        q: "Can special darshan be booked at Kedarnath and Badrinath?",
        a: "The temple committee offers paid special darshan and pujas in limited numbers. We apply for them on your behalf as soon as your dates are fixed and confirm what has been allotted before you travel.",
      },
    ],
    seo: {
      title: "Char Dham by Helicopter from Dehradun, 6 Days | Tourmelloh",
      description:
        "Yamunotri, Gangotri, Kedarnath and Badrinath in six days by helicopter from Dehradun, with darshan, palkis and mountain stays arranged by Tourmelloh.",
    },
  },
  {
    slug: "kedarnath-and-badrinath-by-helicopter",
    collection: "sacred",
    title: "Kedarnath and Badrinath by Helicopter",
    display: ["Kedarnath and Badrinath", "by helicopter"],
    kicker: "Do Dham in three days, with a night at Badrinath",
    summary:
      "Kedarnath and Badrinath in one flying day from Dehradun, a night beneath Neelkanth, dawn darshan, then home: the Do Dham for those with little time.",
    lead:
      "For many families the two great Garhwal shrines matter most, and the road to them takes the better part of a week. By helicopter from Dehradun it is three days with no hurry in them. The second morning takes you to Kedarnath for darshan, then on to Badrinath for the hot spring, the evening aarti and a night beside the Alaknanda. You wake for dawn darshan before flying back. Every seat, puja and landing remains subject to the weather, the operator and the authorities.",
    days: 3,
    nights: 2,
    route: ["Dehradun", "Kedarnath", "Badrinath"],
    cities: [],
    destinations: ["uttarakhand"],
    experiences: [],
    hero: "kedarnath-temple",
    gallery: ["uttarakhand-peaks", "diwali-lamps", "elder-portrait"],
    bestFor:
      "Families short of time, and elders who could not manage the long trek to Kedarnath.",
    season:
      "Both shrines open in late April or May and close for winter in October or November, on dates the temple committees set each year. Plan for May to June or mid-September to October, outside the heaviest monsoon weeks when helicopter services pause.",
    pace: "One full flying day between two gentle ones",
    highlights: [
      "Kedarnath and Badrinath in a single flying day",
      "Darshan at Kedarnath, below the Kedarnath peaks",
      "Tapt Kund and evening aarti at Badrinath",
      "A night on the Alaknanda at Badrinath",
      "Dawn darshan before the flight home",
      "Mana village and Vyas Gufa, time allowing",
    ],
    signature: [
      {
        title: "Darshan booked ahead",
        text: "Special darshan and pujas at both shrines, applied for through the temple committee on your behalf and confirmed before you fly, subject to its quotas.",
      },
      {
        title: "A night at Badrinath",
        text: "Rather than a same-day dash, you stay at Badrinath, so the evening aarti and the dawn darshan are unhurried parts of the journey, not a race against the last flight.",
      },
      {
        title: "Mana in the morning",
        text: "Before the flight home, a short drive up the valley to Mana, the last village before the Tibetan border, for Vyas Gufa and Bhim Pul while the air is still cold.",
      },
    ],
    stays: [
      { place: "Dehradun", nights: 1, stay: "Hyatt Regency Dehradun Resort and Spa, or similar" },
      { place: "Badrinath", nights: 1, stay: "Sarovar Portico, Badrinath, or similar" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dehradun",
        place: "Dehradun",
        photo: "luxury-suite",
        text: "You are met at Jolly Grant airport and driven to the hotel on Rajpur Road, a short drive from the Sahastradhara helipad where tomorrow begins. Your trip contact confirms the yatra registration, the darshan bookings and the flight slot, and explains the operator's weight limits so you can pack one soft bag for the mountains. The rest of the day is yours: the spa, an unhurried lunch, an early dinner. The flight is planned for the clear morning air, and the weather, not the clock, sets the hour.",
        moments: [
          "Met at Jolly Grant airport",
          "Darshan bookings and flight slot confirmed",
          "An early, quiet dinner",
        ],
        overnight: "Hyatt Regency Dehradun Resort and Spa, Dehradun",
      },
      {
        day: 2,
        title: "Kedarnath, then Badrinath",
        place: "Dehradun → Kedarnath → Badrinath",
        photo: "chardham-helicopter",
        text: "The helicopter leaves Sahastradhara for the Mandakini valley. At Sersi you may change to a shuttle for the final hop to Kedarnath, as the authorities direct the traffic over the shrine, and from the helipad a steady uphill walk of about half a kilometre brings you to the temple. After darshan and a few minutes at the Bhim Shila, you fly on across the ranges to Badrinath. Pilgrims bathe at Tapt Kund, the hot spring below the temple, before evening aarti at the painted shrine of Badri Vishal.",
        moments: [
          "Half a kilometre's walk to Kedarnath",
          "Across the ranges to Badrinath",
          "Evening aarti at Badri Vishal",
        ],
        overnight: "Sarovar Portico, Badrinath",
      },
      {
        day: 3,
        title: "Dawn darshan and home",
        place: "Badrinath → Dehradun",
        photo: "badrinath-temple",
        text: "Badrinath opens before sunrise, and an early darshan, or the Mahabhishek puja if the temple committee has allotted places, is the quietest hour of the day. After breakfast, if time and weather allow, your car takes you three kilometres up the valley to Mana for Vyas Gufa and the stone bridge of Bhim Pul. Then the flight back to Sahastradhara and the drive to Jolly Grant airport. Plan an evening departure: the mountains keep their own timetable, and a delayed take-off should never put the flight home at risk.",
        moments: [
          "Dawn darshan at Badrinath",
          "Vyas Gufa and Bhim Pul at Mana",
          "Return flight to Dehradun",
        ],
        overnight: "Departure",
      },
    ],
    included: [
      "Stays as listed, with daily breakfast and dinner at Badrinath",
      "Helicopter seats on a licensed charter from Sahastradhara to Kedarnath, Badrinath and back, including any shuttle change, subject to weather and the authorities",
      "Private chauffeur-driven car in Dehradun, and road transfers at Badrinath and Mana",
      "Meet-and-assist at Jolly Grant airport",
      "Local guides at Kedarnath and Badrinath",
      "Uttarakhand yatra registration completed on your behalf",
      "Special darshan and puja bookings where the temple committee offers them",
      "A dedicated Tourmelloh trip contact throughout the journey",
    ],
    excluded: [
      "International flights and visas",
      "Domestic flights to and from Dehradun",
      "Travel insurance, which should cover helicopter travel at altitude",
      "Meals not mentioned",
      "Offerings and dakshina at the shrines",
      "Personal expenses, excess baggage and gratuities",
      "Anything not in the written proposal",
    ],
    notes: [
      {
        title: "Weather decides",
        text: "Helicopters fly only in safe daylight conditions, and mountain weather can hold them for hours. Keep the evening of day three free of tight connections; if a flight cannot go, we rearrange the stay and plan the next step with you.",
      },
      {
        title: "Weight and baggage",
        text: "Operators weigh every passenger and bag before each sector and set strict limits. Pack one soft bag; larger luggage can stay in Dehradun until you return.",
      },
      {
        title: "Altitude and health",
        text: "Kedarnath stands at about 3,580 metres and Badrinath above 3,000. Speak to your doctor before travel if you have heart, lung or blood-pressure concerns, and carry warm layers in every month.",
      },
    ],
    faqs: [
      {
        q: "Can this be done in a single day?",
        a: "Same-day charters exist, but they leave little time at either shrine and none for the evening aarti. A night at Badrinath makes the flying day calmer and gives you dawn darshan.",
      },
      {
        q: "How much walking is involved?",
        a: "At Kedarnath, roughly half a kilometre uphill from the helipad to the temple, at about 3,580 metres. At Badrinath the car takes you close to the temple. Both are manageable at a slow pace for most travellers.",
      },
      {
        q: "When should we book?",
        a: "As early as possible. Helicopter seats, special darshan and the better rooms at Badrinath are limited, and May, June and October fill first.",
      },
    ],
    seo: {
      title: "Kedarnath and Badrinath by Helicopter, 3 Days | Tourmelloh",
      description:
        "Kedarnath and Badrinath by helicopter from Dehradun in three unhurried days, with a night at Badrinath, dawn darshan and every booking handled for you.",
    },
  },
  {
    slug: "the-golden-temple-amritsar",
    collection: "sacred",
    title: "The Golden Temple, Amritsar",
    display: ["The Golden Temple", "Amritsar"],
    kicker: "Palki Sahib by night, langar at dawn",
    summary:
      "Two nights in Amritsar timed around the Golden Temple's own rhythm: the night Palki Sahib, the pre-dawn return of the Guru Granth Sahib, and the langar kitchens.",
    lead:
      "The Harmandir Sahib keeps a daily rhythm older than any visitor's schedule, and the best of Amritsar comes from following it. Arrive in time for the Sukhasan, when the Guru Granth Sahib is carried in its palanquin to the Akal Takht for the night. Return before dawn to see it brought back across the causeway. Between the two, help in the langar kitchens, walk the old city with a guide who knows its history, and drive out to the border for the evening Retreat at Attari.",
    days: 3,
    nights: 2,
    route: ["Amritsar"],
    cities: ["amritsar"],
    destinations: [],
    experiences: ["palki-sahib-at-the-golden-temple"],
    hero: "amritsar-golden-temple",
    gallery: ["textiles-colour", "thali-feast", "elder-portrait"],
    bestFor:
      "Families, first visits to Amritsar, and anyone drawn to the daily ritual of the Sikh faith.",
    season:
      "October to March is the time to go, with cool nights and clear mornings, though December and January can bring dense fog that delays flights. Summers are hot, but the temple is as moving in May as in November.",
    pace: "Gentle, with one very early morning",
    highlights: [
      "The night Palki Sahib at the Harmandir Sahib",
      "Pre-dawn Prakash as the Guru Granth Sahib returns",
      "An hour of seva in the langar",
      "Jallianwala Bagh and the Partition Museum",
      "The Retreat ceremony at the Attari border",
      "Amritsari kulcha in the old city",
    ],
    signature: [
      {
        title: "The palanquin at night",
        text: "Your guide brings you early to a good place along the parikrama for the Sukhasan, when the Guru Granth Sahib is carried to the Akal Takht, and explains each part of the ceremony as it unfolds.",
      },
      {
        title: "Before dawn at the sarovar",
        text: "A car at your door in the dark for the Prakash, the morning procession back to the sanctum, when the marble is cool underfoot and the kirtan carries across the water.",
      },
      {
        title: "An hour of seva",
        text: "Shoulder to shoulder with volunteers in the langar kitchens, rolling rotis or washing plates, then sitting on the floor to share the meal with everyone else.",
      },
      {
        title: "The Retreat at Attari",
        text: "A private car to the border and an early arrival for the evening ceremony, with the best seating the Border Security Force allows on the day.",
      },
    ],
    stays: [{ place: "Amritsar", nights: 2, stay: "Taj Swarna, Amritsar, or similar" }],
    itinerary: [
      {
        day: 1,
        title: "Arrival and the night Palki",
        place: "Amritsar",
        photo: "amritsar-golden-temple-night",
        text: "You are met at Amritsar airport and driven to your hotel, a short drive from the old city. Rest through the afternoon. In the evening your guide takes you into the temple complex: heads covered, shoes left at the gate, feet rinsed in the shallow channel at the entrance. You walk the marble parikrama as the lights come up on the gold, then wait for the Sukhasan, when the Guru Granth Sahib is carried in its palanquin to the Akal Takht. In winter this is around half past nine; in summer, later.",
        moments: [
          "First parikrama as the gold is lit",
          "The palanquin carried to the Akal Takht",
          "A late supper back at the hotel",
        ],
        overnight: "Taj Swarna, Amritsar",
      },
      {
        day: 2,
        title: "Prakash, seva and the border",
        place: "Amritsar → Attari → Amritsar",
        photo: "amritsar-langar",
        text: "Up before dawn for the Prakash, when the palanquin returns across the causeway and the day's hymns begin. Afterwards, an hour in the langar, where volunteers cook for tens of thousands of visitors every day, then breakfast at the hotel. Late morning, Jallianwala Bagh and the Partition Museum in the old Town Hall. In the afternoon your car takes you to Attari, about thirty kilometres west, for the Retreat ceremony at the border, timed to sunset. Dinner is Amritsari: kulcha, dal and a tall glass of lassi.",
        moments: [
          "The palanquin's return before dawn",
          "Seva in the langar kitchens",
          "The Retreat at the Attari border",
        ],
        overnight: "Taj Swarna, Amritsar",
      },
      {
        day: 3,
        title: "A last morning and departure",
        place: "Amritsar",
        photo: "private-car",
        text: "A slow last morning. If you would like one more visit, the temple in mid-morning sun is a different place from the one you saw at night, with families on the parikrama and the gold bright on the water. Otherwise, a walk through the bazaars around the temple for phulkari embroidery and the city's papad and warian, then lunch before your car takes you to the airport for an afternoon or evening flight. Your trip contact times the transfer around your departure.",
        moments: [
          "The temple in mid-morning sun",
          "Phulkari in the old bazaars",
          "Transfer to Amritsar airport",
        ],
        overnight: "Departure",
      },
    ],
    included: [
      "Stay as listed, with daily breakfast",
      "Private chauffeur-driven car for all transfers and touring, including Attari",
      "A private English-speaking guide for the temple and the old city (other languages on request)",
      "Meet-and-assist at Amritsar airport",
      "Entrance to the Partition Museum",
      "The signature experiences named in the journey",
      "A dedicated Tourmelloh trip contact throughout the journey",
    ],
    excluded: [
      "International flights and visas",
      "Domestic flights to and from Amritsar",
      "Travel insurance",
      "Meals not mentioned",
      "Personal expenses, camera fees and gratuities",
      "Anything not in the written proposal",
    ],
    notes: [
      {
        title: "At the temple",
        text: "Heads stay covered and shoes come off at the gate; scarves are available at the entrance, though many visitors bring their own. Tobacco and alcohol are not permitted anywhere in the complex.",
      },
      {
        title: "Timings move",
        text: "The Palki Sahib timings shift with the seasons, and the Retreat at Attari follows sunset. Your guide confirms the hour each day and plans around it.",
      },
      {
        title: "Mondays",
        text: "The Partition Museum closes on Mondays and some public holidays. If your dates include one, we move the visit to the other day.",
      },
    ],
    faqs: [
      {
        q: "Can visitors of other faiths attend the Palki Sahib?",
        a: "Yes. The Golden Temple welcomes people of every faith. Cover your head, remove your shoes, dress modestly and follow your guide's lead on where to stand.",
      },
      {
        q: "Is the Attari border ceremony held every day?",
        a: "The Retreat is held every evening, with timings revised by the Border Security Force through the year. Access can change at short notice for security reasons, and we confirm it close to your dates.",
      },
      {
        q: "How early is the morning ceremony?",
        a: "Before dawn, earlier in summer than in winter. Your guide gives you the exact time the evening before, and the car is ready accordingly.",
      },
    ],
    seo: {
      title: "The Golden Temple, Amritsar: 3 Private Days | Tourmelloh",
      description:
        "Three days in Amritsar around the Golden Temple's rhythm: the night Palki Sahib, pre-dawn Prakash, langar seva and the Attari Retreat, privately arranged.",
    },
  },
  {
    slug: "temples-of-tamil-nadu",
    collection: "sacred",
    title: "Temples of Tamil Nadu",
    display: ["Temples of", "Tamil Nadu"],
    kicker: "Pallava shore, Chola towers, Madurai's goddess and Rameswaram",
    summary:
      "Eight days from the Pallava shore temples to the Chola towers of Thanjavur, the goddess of Madurai and the corridors of Rameswaram, with specialist guides and slow mornings.",
    lead:
      "Tamil Nadu's great temples are not ruins. They are working shrines, some more than a thousand years old, where drums still sound at dawn and the gods are still carried out at night. This journey follows them south: Pallava stone at Mahabalipuram, the Chola temples of Thanjavur and Gangaikonda Cholapuram, the merchant mansions of Chettinad, the goddess Meenakshi in Madurai and the long corridors of Rameswaram. Specialist guides join you in each temple town, and the days are paced around the hours the shrines keep.",
    days: 8,
    nights: 7,
    route: ["Chennai", "Mahabalipuram", "Thanjavur", "Madurai", "Rameswaram"],
    cities: ["madurai"],
    destinations: ["tamil-nadu"],
    experiences: [],
    hero: "madurai-meenakshi",
    gallery: ["textiles-colour", "thali-feast", "luxury-dining"],
    bestFor:
      "Travellers drawn to living ritual, temple architecture and South Indian food, and families on pilgrimage to Rameswaram.",
    season:
      "November to February is the most comfortable, with warm days and cooler evenings, though the northeast monsoon can bring heavy rain to the coast in October and November. March to June is hot, so temple visits move to early morning and evening.",
    pace: "Early starts, long middays at rest",
    highlights: [
      "Dawn at the Shore Temple, Mahabalipuram",
      "Kanchipuram's Kailasanathar and its silk weavers",
      "The Brihadeeswarar at Thanjavur in late light",
      "Lunch in a Chettinad mansion",
      "The night ceremony at Meenakshi Amman Temple",
      "Ramanathaswamy's corridors and the road to Dhanushkodi",
    ],
    signature: [
      {
        title: "The Shore Temple at opening",
        text: "You reach Mahabalipuram's Shore Temple as the gates open, when the Bay of Bengal is pale and the carved Pallava stone has the site almost to itself.",
      },
      {
        title: "Late light at Thanjavur",
        text: "A second, unhurried visit to the Brihadeeswarar in the late afternoon, when the granite tower turns gold and families settle on the lawns.",
      },
      {
        title: "The night procession in Madurai",
        text: "Where the temple permits, your guide brings you to the evening ceremony in which Sundareswarar is carried to Meenakshi's chamber for the night, with drums, lamps and nagaswaram.",
      },
      {
        title: "Lunch in Chettinad",
        text: "A long lunch of Chettinad cooking in a merchant's mansion, among teak pillars and Athangudi-tiled floors, on the drive between Thanjavur and Madurai.",
      },
    ],
    stays: [
      { place: "Mahabalipuram", nights: 2, stay: "Taj Fisherman's Cove Resort & Spa, Chennai, or similar" },
      { place: "Thanjavur", nights: 2, stay: "Svatma, Thanjavur, or similar" },
      { place: "Madurai", nights: 2, stay: "Heritage Madurai, or similar" },
      { place: "Rameswaram", nights: 1, stay: "Hyatt Place Rameswaram, or similar" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and the coast road",
        place: "Chennai → Mahabalipuram",
        photo: "luxury-pool",
        text: "You are met at Chennai airport and driven south along the East Coast Road, the sea appearing between casuarina groves. The resort sits on Covelong beach, a short drive from Mahabalipuram, and the afternoon is yours: the pool, a walk on the sand, an early dinner of coastal seafood. Your guide calls in the evening to plan the morning around the Shore Temple's opening hour, because the first hour there is the one worth having.",
        moments: [
          "Met at Chennai airport",
          "The East Coast Road at golden hour",
          "Dinner of coastal seafood",
        ],
        overnight: "Taj Fisherman's Cove Resort & Spa, Chennai",
      },
      {
        day: 2,
        title: "Mahabalipuram and Kanchipuram",
        place: "Mahabalipuram → Kanchipuram",
        photo: "mahabalipuram-shore-temple",
        text: "The Shore Temple at opening, the sea at its back, then the Pancha Rathas, five shrines carved from the rock where they stand, and Arjuna's Penance, a whole cliff face crowded with gods, elephants and sages. After breakfast the car heads inland to Kanchipuram for the Kailasanathar, built in sandstone by the Pallavas in the eighth century, and an hour with a family of silk weavers at their looms. Back to the coast for the evening and a quiet dinner by the sea.",
        moments: [
          "The Shore Temple as the gates open",
          "Arjuna's Penance in morning light",
          "Silk weavers at their looms",
        ],
        overnight: "Taj Fisherman's Cove Resort & Spa, Chennai",
      },
      {
        day: 3,
        title: "Chidambaram and the Chola road",
        place: "Mahabalipuram → Thanjavur",
        photo: "madurai-temple-hall",
        text: "A long, rewarding day on the road south. At Chidambaram, the temple of Shiva as Nataraja, the cosmic dancer, with its gold-roofed hall and long pillared mandapams; you arrive before the inner shrines close at midday. Then Gangaikonda Cholapuram, the great temple Rajendra Chola built to mark his campaign to the Ganga, usually quiet and very beautiful in the afternoon light. You reach Thanjavur by evening, to a heritage house hotel and a simple, excellent dinner.",
        moments: [
          "Nataraja's gold-roofed hall at Chidambaram",
          "Gangaikonda Cholapuram in afternoon quiet",
          "Arrival in Thanjavur by evening",
        ],
        overnight: "Svatma, Thanjavur",
      },
      {
        day: 4,
        title: "Thanjavur",
        place: "Thanjavur",
        photo: "thanjavur-brihadeeswarar",
        text: "Morning at the Brihadeeswarar, completed by Rajaraja Chola around 1010 and still in worship, its granite vimana rising over the courtyard and the great Nandi. Your guide explains the Chola inscriptions and the frescoes in the inner passage. Midday rest, then the Airavatesvara temple at Darasuram, small and exquisitely carved, and the bronze casters of Swamimalai, who still work by the lost-wax method. You return to the Brihadeeswarar in the late afternoon, when the stone turns gold.",
        moments: [
          "The Brihadeeswarar vimana and its Nandi",
          "Lost-wax bronze casting at Swamimalai",
          "Late light on the Chola granite",
        ],
        overnight: "Svatma, Thanjavur",
      },
      {
        day: 5,
        title: "Chettinad to Madurai",
        place: "Thanjavur → Chettinad → Madurai",
        photo: "luxury-palace-courtyard",
        text: "South to Chettinad, the country of the Nattukottai Chettiar merchants, whose mansions fill villages such as Kanadukathan and Karaikudi: teak pillars, Athangudi-tiled floors and courtyard after courtyard. You walk through a mansion with your guide, watch Athangudi tiles being made by hand, and sit down to a long Chettinad lunch, fiery and fragrant, in one of the mansion hotels. The afternoon drive brings you to Madurai, the temple towers rising over the city as you arrive.",
        moments: [
          "A walk through a merchant's mansion",
          "Athangudi tiles made by hand",
          "Chettinad lunch, slow and generous",
        ],
        overnight: "Heritage Madurai, Madurai",
      },
      {
        day: 6,
        title: "Madurai and the goddess",
        place: "Madurai",
        photo: "flower-market",
        text: "Begin early at the flower market, where Madurai's jasmine is sold by weight, before the Meenakshi Amman Temple. Phones are left outside, so the day is about looking: the painted gopurams, the Golden Lotus Tank and the Hall of a Thousand Pillars. Afternoon at the Thirumalai Nayak Palace, then rest. At night, where the temple permits, your guide brings you to the ceremony in which Sundareswarar is carried to Meenakshi's chamber, to drums and nagaswaram.",
        moments: [
          "Jasmine sold by weight at dawn",
          "The Hall of a Thousand Pillars",
          "The night procession to Meenakshi",
        ],
        overnight: "Heritage Madurai, Madurai",
      },
      {
        day: 7,
        title: "Across the water to Rameswaram",
        place: "Madurai → Rameswaram",
        photo: "rameswaram-corridor",
        text: "A morning drive of about four hours to the coast, then across the Pamban channel to Rameswaram island, the new vertical-lift railway bridge running beside the road. At the Ramanathaswamy Temple, pilgrims bathe at its twenty-two sacred wells before darshan, and the pillared corridors run on for hundreds of metres in repeating lines of painted stone. Late in the afternoon, the road out to Dhanushkodi, the town lost to the 1964 cyclone, and the point where the land runs out between two seas.",
        moments: [
          "Crossing the Pamban channel",
          "The twenty-two wells of Ramanathaswamy",
          "Sunset where the land runs out",
        ],
        overnight: "Hyatt Place Rameswaram",
      },
      {
        day: 8,
        title: "Dawn darshan and departure",
        place: "Rameswaram → Madurai",
        photo: "private-car",
        text: "For those who wish, the pre-dawn darshan at Ramanathaswamy, when the temple is lit by lamps and the crowds have not yet come. Breakfast at the hotel, then the drive back across the Pamban channel to Madurai airport, about four hours, for an afternoon or evening flight. Your trip contact times the drive around your departure, with a pause on the way if you would like a last filter coffee by the road.",
        moments: [
          "Pre-dawn darshan by lamplight",
          "Back across the Pamban channel",
          "Transfer to Madurai airport",
        ],
        overnight: "Departure",
      },
    ],
    included: [
      "Handpicked stays as listed, with daily breakfast",
      "Private chauffeur-driven car for all transfers and touring",
      "Private English-speaking guides in each temple town (other languages on request)",
      "Meet-and-assist at Chennai and Madurai airports",
      "Monument entrances for the sites named in the itinerary",
      "Chettinad lunch, the silk weavers and the Swamimalai bronze casters",
      "A dedicated Tourmelloh trip contact throughout the journey",
    ],
    excluded: [
      "International flights and visas",
      "Domestic flights to Chennai and from Madurai",
      "Travel insurance",
      "Meals not mentioned",
      "Temple offerings, camera fees, personal expenses and gratuities",
      "Anything not in the written proposal",
    ],
    notes: [
      {
        title: "Inner sanctums",
        text: "Several of these temples admit only Hindus to the inner shrines. Everyone is welcome in the corridors, halls and courtyards, and your guide knows where each line is drawn.",
      },
      {
        title: "Midday closures",
        text: "Most temples close their inner shrines for a few hours after midday, so the days are built around morning and evening visits, with the hottest hours for rest.",
      },
      {
        title: "Dress and footwear",
        text: "Shoulders and knees covered, shoes left at the gate. Stone floors grow hot by noon, so cotton socks are useful where they are allowed.",
      },
    ],
    faqs: [
      {
        q: "Can visitors of other faiths enter these temples?",
        a: "Yes, with one limit: some inner sanctums are open only to Hindus. The architecture, corridors and much of the ceremony in the outer halls are open to all.",
      },
      {
        q: "Is the drive to Thanjavur too long?",
        a: "It is the longest day, about seven hours on the road, but it is broken by Chidambaram and Gangaikonda Cholapuram, two of the finest temples on the route. A night in Puducherry can be added to split it.",
      },
      {
        q: "Can we add Srirangam or Kumbakonam?",
        a: "Yes. Srirangam, near Tiruchirappalli, fits into the Thanjavur days, and Kumbakonam's temples lie close to Darasuram. Tell us and we will rework the plan.",
      },
    ],
    seo: {
      title: "Temples of Tamil Nadu: 8-Day Private Journey | Tourmelloh",
      description:
        "Eight private days from Mahabalipuram to Thanjavur, Chettinad, Madurai and Rameswaram, timed to temple hours, with specialist guides and fine stays.",
    },
  },
  {
    slug: "mahakal-and-omkareshwar",
    collection: "sacred",
    title: "Mahakal and Omkareshwar",
    display: ["Mahakal and", "Omkareshwar"],
    kicker: "Two jyotirlingas, the Bhasma Aarti and the Narmada",
    summary:
      "Two of the twelve jyotirlingas in four days: the pre-dawn Bhasma Aarti at Ujjain's Mahakaleshwar, then Omkareshwar's island on the Narmada, with Indore's food to finish.",
    lead:
      "Ujjain is one of the seven sacred cities of Hindu tradition, and Mahakaleshwar is its heart: the jyotirlinga that faces south, where Shiva is worshipped as lord of time. The Bhasma Aarti in the small hours is the reason many come, and its places are few, so we apply for them as soon as your dates are set. From Ujjain the road runs south to Omkareshwar, the island in the Narmada, before a last evening among the food lanes of Indore.",
    days: 4,
    nights: 3,
    route: ["Indore", "Ujjain", "Omkareshwar"],
    cities: ["ujjain"],
    destinations: ["madhya-pradesh"],
    experiences: [],
    hero: "ujjain-mahakal",
    gallery: ["flower-market", "thali-feast", "luxury-suite"],
    bestFor:
      "Devotees of Shiva, families with elders, and anyone who wants the Bhasma Aarti properly arranged.",
    season:
      "October to March is pleasant, with cool early mornings for the Bhasma Aarti; April to June is very hot. Shravan, in July and August, and Mahashivratri draw enormous crowds, so plan those dates well ahead.",
    pace: "One pre-dawn start, otherwise easy",
    highlights: [
      "The Bhasma Aarti at Mahakaleshwar, before dawn",
      "Mahakal Lok's corridor of sculpture at dusk",
      "Evening aarti at Ram Ghat on the Shipra",
      "Omkareshwar's island temple on the Narmada",
      "Adi Shankaracharya's statue at Ekatmata Dham",
      "An evening of Indore street food",
    ],
    signature: [
      {
        title: "Bhasma Aarti places",
        text: "We apply for your Bhasma Aarti places through the temple's official booking as soon as dates open, then arrange the dress, the early car and a guide to see you through the morning.",
      },
      {
        title: "A boat on the Narmada",
        text: "A private boat around Mandhata island at Omkareshwar, river levels permitting, so you see from the water the island whose shape gives the shrine its name.",
      },
      {
        title: "Lamps at Harsiddhi",
        text: "At dusk the tall lamp pillars outside the Harsiddhi temple are lit on many evenings, tier by tier, and your guide knows when to arrive and where to stand.",
      },
    ],
    stays: [
      { place: "Ujjain", nights: 2, stay: "Anjushree, Ujjain, or similar" },
      { place: "Indore", nights: 1, stay: "Indore Marriott Hotel, or similar" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and the Shipra at dusk",
        place: "Indore → Ujjain",
        photo: "diwali-lamps",
        text: "You are met at Indore airport and driven about an hour and a half to Ujjain. After lunch and a rest, your guide takes you through Mahakal Lok, the long corridor of sculpture and murals that leads to the temple, as the light softens. At dusk the lamp pillars at Harsiddhi are lit on many evenings, and the aarti on Ram Ghat sends small lamps out onto the Shipra. Dinner, then an early night, because the Bhasma Aarti means a start in the small hours.",
        moments: [
          "Mahakal Lok as the light softens",
          "Harsiddhi's lamp pillars at dusk",
          "Lamps set out on the Shipra",
        ],
        overnight: "Anjushree, Ujjain",
      },
      {
        day: 2,
        title: "The Bhasma Aarti",
        place: "Ujjain",
        photo: "ujjain-shipra-ghats",
        text: "The car leaves in the dark, and you enter in the dress the temple requires, a dhoti for men and a sari for women. The Bhasma Aarti, offered to Mahakal with sacred ash at the start of the day, unfolds to drums, conch and chanting, and stays with most people for a long time. Back to sleep, then a gentle afternoon: Kal Bhairav, Sandipani Ashram, where Krishna is said to have studied, and a walk along the ghats of the Shipra as evening comes in.",
        moments: [
          "Bhasma Aarti in the small hours",
          "Kal Bhairav and Sandipani Ashram",
          "Evening along the Shipra ghats",
        ],
        overnight: "Anjushree, Ujjain",
      },
      {
        day: 3,
        title: "Omkareshwar and the Narmada",
        place: "Ujjain → Omkareshwar → Indore",
        photo: "omkareshwar-island",
        text: "South through Malwa farmland to Omkareshwar, about three hours. The jyotirlinga stands on Mandhata island in the Narmada, reached by footbridge or boat, and Mamleshwar, its twin shrine, faces it from the south bank. After darshan, a private boat on the river where conditions allow, and the 108-foot statue of Adi Shankaracharya at Ekatmata Dham on the hill above. The road back to Indore takes about two and a half hours, in time for an evening in the city's famous food lanes.",
        moments: [
          "Darshan on Mandhata island",
          "A private boat on the Narmada",
          "Indore's food lanes after dark",
        ],
        overnight: "Indore Marriott Hotel, Indore",
      },
      {
        day: 4,
        title: "Indore and departure",
        place: "Indore",
        photo: "private-car",
        text: "Indore starts its day with poha and jalebi, and your guide takes you to a stall worth the detour, or the hotel serves its own. Then the old city: the Rajwada, the seven-storey palace gateway of the Holkars, and Kanch Mandir, a Jain temple lined from floor to ceiling with mirrored glass. The bazaars around them are good for Maheshwari saris and Malwa sweets. Your car then takes you to Devi Ahilyabai Holkar Airport in good time for your flight.",
        moments: [
          "Poha and jalebi at breakfast",
          "The Rajwada and Kanch Mandir",
          "Transfer to Indore airport",
        ],
        overnight: "Departure",
      },
    ],
    included: [
      "Stays as listed, with daily breakfast",
      "Private chauffeur-driven car for all transfers and touring",
      "Private guides in Ujjain, Omkareshwar and Indore",
      "Meet-and-assist at Indore airport",
      "Bhasma Aarti and darshan bookings through the temple's official systems, where available",
      "A private boat at Omkareshwar, where river conditions allow",
      "A dedicated Tourmelloh trip contact throughout the journey",
    ],
    excluded: [
      "International flights and visas",
      "Domestic flights to and from Indore",
      "Travel insurance",
      "Meals not mentioned",
      "Offerings, puja dakshina, personal expenses and gratuities",
      "Anything not in the written proposal",
    ],
    notes: [
      {
        title: "Bhasma Aarti places",
        text: "The temple releases places in limited numbers and popular dates fill quickly. We apply the moment your dates open; if none are allotted, darshan later in the morning is arranged instead.",
      },
      {
        title: "Dress code",
        text: "For the Bhasma Aarti, men wear a dhoti and women a sari. If you do not travel with them, we can arrange both in Ujjain before the morning.",
      },
      {
        title: "River levels",
        text: "Boats on the Narmada at Omkareshwar run at the discretion of the local administration and stop when the river is high after rain or dam releases.",
      },
    ],
    faqs: [
      {
        q: "How far ahead should we book the Bhasma Aarti?",
        a: "As soon as your dates are fixed. The temple opens online booking in batches and popular dates fill quickly. We confirm what has been allotted before you travel.",
      },
      {
        q: "Can elderly travellers attend the Bhasma Aarti?",
        a: "Yes, though it means a very early start and a long time seated or standing. Tell us about mobility needs and we will plan the morning, and the rest afterwards, around them.",
      },
      {
        q: "Why stay in Indore rather than Omkareshwar?",
        a: "Omkareshwar's hotels are simple, while Indore offers far better rooms and an easy airport the next morning. The drive back is about two and a half hours.",
      },
    ],
    seo: {
      title: "Mahakal and Omkareshwar with Bhasma Aarti | Tourmelloh",
      description:
        "Four private days in Ujjain, Omkareshwar and Indore: the Bhasma Aarti at Mahakaleshwar, darshan on the Narmada's island and Indore's food lanes.",
    },
  },
  {
    slug: "tigers-of-central-india",
    collection: "wildlife",
    title: "Tigers of Central India",
    display: ["Tigers of", "Central India"],
    kicker: "Kanha's meadows and Bandhavgarh's tigers, from two fine lodges",
    summary:
      "Six nights between Kanha's sal forest and meadows and Bandhavgarh's rocky hills, with private jeeps, naturalists and two exceptional safari lodges in the heart of India.",
    lead:
      "Kanha and Bandhavgarh are the classic pairing of Central India, and they are better together than apart. Kanha is the larger, quieter park: sal forest, wide meadows and the hard-ground barasingha it brought back from the edge. Bandhavgarh is smaller and denser, with sandstone cliffs, an old fort on its hill and one of the highest densities of tigers in India. Three nights in each allows up to ten drives, enough for patience to be rewarded, though no sighting can ever be promised.",
    days: 7,
    nights: 6,
    route: ["Jabalpur", "Kanha", "Bandhavgarh"],
    cities: [],
    destinations: ["madhya-pradesh"],
    experiences: [],
    hero: "bandhavgarh-tiger",
    gallery: ["thali-feast", "elder-portrait", "cooking-class"],
    bestFor:
      "A first safari done properly, photographers, and families with children old enough for early starts.",
    season:
      "Core zones open from 1 October to 30 June and close for the monsoon. February to May gives the strongest sightings as water shrinks, though April and May are very hot; November to January is cool and green, with cold dawn drives.",
    pace: "Two drives a day, long rests between",
    highlights: [
      "Kanha's meadows and the hard-ground barasingha",
      "Morning drives through tall sal forest",
      "Tigers in Bandhavgarh's Tala zone, with luck",
      "Shesh Shaiya beneath Bandhavgarh's fort",
      "A private jeep and naturalist on every drive",
      "Dinners under the trees at both lodges",
    ],
    signature: [
      {
        title: "A jeep of your own",
        text: "Every drive in a private open jeep for your party, with the lodge's naturalist beside the forest department's guide, so the pace and the patience are yours.",
      },
      {
        title: "Permits planned early",
        text: "Core-zone permits are released by the Madhya Pradesh forest department in limited numbers for each zone and drive. We book them on your behalf the day your dates are set.",
      },
      {
        title: "Dinner under the trees",
        text: "Evenings end with dinner laid out under the trees by lantern light, the forest sounds beginning, at lodges built around the jungle rather than in spite of it.",
      },
    ],
    stays: [
      { place: "Kanha", nights: 3, stay: "Banjaar Tola, A Taj Safari, Kanha, or similar" },
      { place: "Bandhavgarh", nights: 3, stay: "Mahua Kothi, A Taj Safari, Bandhavgarh, or similar" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Jabalpur to Kanha",
        place: "Jabalpur → Kanha",
        photo: "luxury-suite",
        text: "You are met at Jabalpur airport and driven south-east through Mandla district, about four hours, the last stretch through villages, farmland and sal. The lodge stands above the river on the edge of the park, its tented suites spaced well apart. Tea on the deck, a briefing with your naturalist about the zones and the drives ahead, and an early dinner. Tomorrow's alarm is set for well before dawn, when the gates open and the forest is at its coldest.",
        moments: [
          "Met at Jabalpur airport",
          "Tea on the deck above the river",
          "Briefing with your naturalist",
        ],
        overnight: "Banjaar Tola, Kanha",
      },
      {
        day: 2,
        title: "Kanha's meadows",
        place: "Kanha",
        photo: "kanha-barasingha",
        text: "The jeeps leave before sunrise, and the first light comes over the Kanha meadows, where barasingha, chital and gaur feed at the forest's edge. Kanha's core is divided into the Kanha, Kisli, Mukki and Sarhi zones, and your naturalist reads tracks and alarm calls to decide where to wait. Back for a late breakfast and the heat of the day at rest. The afternoon drive goes out again in mid-afternoon and returns at dusk as the gates close.",
        moments: [
          "First light over the Kanha meadows",
          "Barasingha at the forest's edge",
          "Alarm calls read by your naturalist",
        ],
        overnight: "Banjaar Tola, Kanha",
      },
      {
        day: 3,
        title: "The sal forest",
        place: "Kanha",
        photo: "kanha-sal-forest",
        text: "A second full day of drives, in a different zone where permits allow. Kanha's sal forest is tall and straight-trunked, and in the early morning the light falls through it in long bars; this is where tigers and leopards cross the tracks, and where patience pays. Between drives, a long lunch, a book on the deck, or a walk on the lodge grounds with your naturalist for the birds, of which Kanha has well over two hundred species. Dinner under the trees.",
        moments: [
          "Long bars of light through the sal",
          "Birding on the lodge grounds",
          "Dinner under the trees",
        ],
        overnight: "Banjaar Tola, Kanha",
      },
      {
        day: 4,
        title: "Kanha to Bandhavgarh",
        place: "Kanha → Bandhavgarh",
        photo: "private-car",
        text: "One last morning drive for those who want it, or a slow breakfast for those who do not. Then the road north to Bandhavgarh, about five to six hours through Mandla and Dindori and the hills beyond, with a picnic lunch packed by the lodge. You arrive at Mahua Kothi in time for a rest before dinner. Its suites, called kutiyas, are built in the style of the local villages, and the park's Tala gate is a short drive away.",
        moments: [
          "A last Kanha drive, if you like",
          "A picnic lunch on the road north",
          "Arrival at the kutiyas of Mahua Kothi",
        ],
        overnight: "Mahua Kothi, Bandhavgarh",
      },
      {
        day: 5,
        title: "Bandhavgarh",
        place: "Bandhavgarh",
        photo: "central-india-safari",
        text: "Bandhavgarh's core zones, Tala, Magadhi and Khitauli, are compact, and the density of tigers here is among the highest in India. The morning is in Tala, where the sandstone hill and its fort rise over bamboo and grassland, and your jeep may pass Shesh Shaiya, the reclining Vishnu carved below the fort beside a spring. The afternoon drive goes to another zone, depending on recent sightings and where permits fall. The hours between are long, quiet and shaded.",
        moments: [
          "Morning drive in the Tala zone",
          "Shesh Shaiya beneath the fort",
          "Afternoon in Magadhi or Khitauli",
        ],
        overnight: "Mahua Kothi, Bandhavgarh",
      },
      {
        day: 6,
        title: "A last full day",
        place: "Bandhavgarh",
        photo: "artisan-pottery",
        text: "Two more drives, or one drive and an afternoon off. If you choose the afternoon, your naturalist walks you through the village beside the lodge, past fields and the homes of families who have lived beside the forest for generations, where you may find a potter at the wheel. The evening is unhurried: drinks by the fire, then dinner under the mahua trees, and your naturalist goes over the week's sightings with you.",
        moments: [
          "Final drives in Bandhavgarh",
          "A village walk with your naturalist",
          "Drinks by the fire",
        ],
        overnight: "Mahua Kothi, Bandhavgarh",
      },
      {
        day: 7,
        title: "Bandhavgarh to Jabalpur",
        place: "Bandhavgarh → Jabalpur",
        photo: "luxury-dining",
        text: "A slow breakfast laid out on the veranda, or one more dawn drive if permits and timings work with your flight. The road to Jabalpur takes about four hours, and your trip contact times the departure so there is no rush. If there is time, a detour to Bhedaghat, where the Narmada runs through a gorge of white marble and the carvers sell small pieces cut from the local stone, before the airport and your onward flight.",
        moments: [
          "Breakfast laid out on the veranda",
          "The marble gorge at Bhedaghat, time allowing",
          "Transfer to Jabalpur airport",
        ],
        overnight: "Departure",
      },
    ],
    included: [
      "Lodge stays as listed, with all meals at the lodges",
      "Private jeep safaris with a naturalist, as set out in the itinerary",
      "Core-zone permits booked on your behalf, subject to availability",
      "Park entry and forest department guide fees for the drives in the itinerary",
      "Private chauffeur-driven car between Jabalpur, Kanha and Bandhavgarh",
      "Meet-and-assist at Jabalpur airport",
      "A dedicated Tourmelloh trip contact throughout the journey",
    ],
    excluded: [
      "International flights and visas",
      "Domestic flights to and from Jabalpur",
      "Travel insurance",
      "Drinks, laundry and spa treatments",
      "Camera fees in the parks, personal expenses and gratuities",
      "Anything not in the written proposal",
    ],
    notes: [
      {
        title: "Permits and zones",
        text: "Core-zone permits are limited and released online by the forest department, and the zone you draw shapes each drive. We book as early as your dates allow; no tiger sighting can be promised on any drive.",
      },
      {
        title: "Closures",
        text: "Core zones close for the monsoon from 1 July to 30 September, and they also keep a weekly half-day closure. We plan the drives around both.",
      },
      {
        title: "Cold mornings",
        text: "From December to February, dawn in an open jeep can be close to freezing. Bring a warm hat, gloves and layers; the lodges usually provide blankets for the jeeps.",
      },
    ],
    faqs: [
      {
        q: "How many safaris does this include?",
        a: "The plan allows up to ten drives across six nights: two a day on the full park days, and one on the transfer and departure mornings if you wish. The final number depends on the permits released for your dates.",
      },
      {
        q: "Is this suitable for children?",
        a: "Yes, for children old enough to sit quietly through drives of three to four hours. The forest department sets its own rules for very young children, which we check for your dates.",
      },
      {
        q: "Kanha or Bandhavgarh, if we can only do one?",
        a: "Bandhavgarh for the strongest chance of a tiger in a short stay; Kanha for the landscape, the barasingha and a quieter forest. Together they give the fullest picture of Central India's wildlife.",
      },
    ],
    seo: {
      title: "Tigers of Central India: Kanha and Bandhavgarh | Tourmelloh",
      description:
        "Seven private days in Kanha and Bandhavgarh, with private jeeps, naturalists, core-zone permits booked for you and two of India's finest safari lodges.",
    },
  },
  {
    slug: "ranthambore-tiger-weekend",
    collection: "wildlife",
    title: "Ranthambore Tiger Weekend",
    display: ["Ranthambore", "tiger weekend"],
    kicker: "Three safaris, a ruined fort and a fine lodge",
    summary:
      "Two nights at Ranthambore, three or four drives in private jeeps among lakes, ruins and dry forest, and a morning at the fort above it all.",
    lead:
      "Ranthambore is the most dramatic tiger country in India: dry forest broken by lakes, banyan groves and ruined pavilions, with a fort of more than a thousand years on the ridge above. It is also among the easiest to reach, a few hours from Jaipur by road or by train to Sawai Madhopur. Two nights give you three good drives and a morning at the fort. Permits are booked through the Rajasthan forest department on your behalf, and the zone, like the tiger, is never certain.",
    days: 3,
    nights: 2,
    route: ["Jaipur or Sawai Madhopur", "Ranthambore"],
    cities: ["ranthambore"],
    destinations: ["rajasthan"],
    experiences: ["tiger-safari-in-ranthambore"],
    hero: "ranthambore-tiger",
    gallery: ["luxury-pool", "luxury-dining", "rajasthan-musicians"],
    bestFor:
      "A first tiger safari, a weekend from Delhi or Jaipur, or an addition to a Rajasthan journey.",
    season:
      "The core zones open from October to June and close for the monsoon, roughly July to September. October to February is cool and green; March to June is hot, but tigers come to the water and sightings are often at their best.",
    pace: "Early drives, long lazy middays",
    highlights: [
      "Private Gypsy drives in Ranthambore's tiger zones",
      "Lakes and ruined pavilions inside the park",
      "Ranthambore Fort and the Trinetra Ganesh temple",
      "A tented suite at The Oberoi Vanyavilas",
      "Folk music by the fire after dinner",
    ],
    signature: [
      {
        title: "A Gypsy for your party",
        text: "Each drive in a six-seat open Gypsy booked for your party alone, where the forest department's allocation allows, with a naturalist who knows the park's tigers by their numbers and their habits.",
      },
      {
        title: "A morning at the fort",
        text: "On the last morning, the climb into Ranthambore Fort, part of a World Heritage Site, to the Trinetra Ganesh temple and the walls above the forest as the light comes up.",
      },
      {
        title: "Fireside evenings",
        text: "Dinner in the lodge gardens, with Rajasthani musicians by the fire on the evenings the lodge arranges them.",
      },
    ],
    stays: [
      {
        place: "Ranthambore",
        nights: 2,
        stay: "The Oberoi Vanyavilas Wildlife Resort, Ranthambhore, or similar",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and a first drive",
        place: "Jaipur → Ranthambore",
        photo: "private-car",
        text: "Your car collects you in Jaipur for the drive of about three and a half hours to Ranthambore, or you take the train to Sawai Madhopur and are met on the platform. Lunch at the lodge, then, if the permits for your dates allow an afternoon drive, the first safari: out through the park gate below the fort walls, into dry forest and along the open edges of the lakes. Back at dusk to drinks and dinner in the gardens.",
        moments: [
          "Met in Jaipur or at Sawai Madhopur",
          "Lunch at the lodge",
          "A first afternoon drive",
        ],
        overnight: "The Oberoi Vanyavilas, Ranthambhore",
      },
      {
        day: 2,
        title: "Two drives",
        place: "Ranthambore",
        photo: "ranthambore-safari",
        text: "The morning drive leaves before sunrise, the Gypsy rattling out to whichever zone the forest department has allotted. Zones one to five hold most of the park's tigers, and your naturalist listens for the alarm calls of sambar and langur to find them. Breakfast back at the lodge, a long rest through the heat, the spa if you like, then the afternoon drive out again until the gates close. The evening is spent around the fire.",
        moments: [
          "Alarm calls before sunrise",
          "A long, slow rest at midday",
          "Afternoon drive until the gates close",
        ],
        overnight: "The Oberoi Vanyavilas, Ranthambhore",
      },
      {
        day: 3,
        title: "The fort and departure",
        place: "Ranthambore → Jaipur",
        photo: "ranthambore-fort",
        text: "A choice for the last morning: a fourth drive in the park, or Ranthambore Fort, part of the Hill Forts of Rajasthan World Heritage Site, reached by the road through the park gate. Pilgrims climb to the Trinetra Ganesh temple inside its walls, and from the ramparts the whole forest lies below, its lakes catching the early light. Brunch at the lodge, then the drive back to Jaipur or the train from Sawai Madhopur, timed around your onward plans.",
        moments: [
          "A fourth drive, or the fort",
          "Trinetra Ganesh within the walls",
          "Back to Jaipur by afternoon",
        ],
        overnight: "Departure",
      },
    ],
    included: [
      "Stay as listed, with daily breakfast",
      "Private chauffeur-driven car to and from Jaipur, or station transfers at Sawai Madhopur",
      "Private Gypsy safaris with a naturalist, as set out in the itinerary",
      "Safari permits booked on your behalf through the Rajasthan forest department, subject to availability",
      "Entrance to Ranthambore Fort",
      "Meet-and-assist on arrival",
      "A dedicated Tourmelloh trip contact throughout the journey",
    ],
    excluded: [
      "International flights and visas",
      "Flights and train tickets unless listed",
      "Travel insurance",
      "Meals not mentioned",
      "Camera fees in the park, personal expenses and gratuities",
      "Anything not in the written proposal",
    ],
    notes: [
      {
        title: "Permits and zones",
        text: "Safari permits are booked through the Rajasthan forest department's official system, which opens well ahead of time. The department allots the zone and can change it; we book the moment your dates are fixed.",
      },
      {
        title: "Closures",
        text: "Core zones close for the monsoon, roughly July to September, and the forest department keeps weekly closure days for some zones. We plan the weekend around both.",
      },
      {
        title: "Weekends fill first",
        text: "Friday to Sunday permits and rooms go early, especially from October to March and over Indian holidays. Two or three months' notice is wise.",
      },
    ],
    faqs: [
      {
        q: "Will we see a tiger?",
        a: "No one can promise it. Ranthambore offers some of the best chances in India, and three or four drives improve them, but the forest decides. Leopards, sloth bears, crocodiles and a great deal of birdlife are often the consolation.",
      },
      {
        q: "Jaipur by road, or the train?",
        a: "The drive from Jaipur takes about three and a half hours door to door. Trains from Jaipur and Delhi reach Sawai Madhopur, a short drive from the lodges, and suit travellers coming from Delhi.",
      },
      {
        q: "Can we add this to a longer Rajasthan journey?",
        a: "Easily. Two nights at Ranthambore fit naturally into a Golden Triangle or Rajasthan itinerary, often placed between Agra and Jaipur.",
      },
    ],
    seo: {
      title: "Ranthambore Tiger Weekend: Private Safaris | Tourmelloh",
      description:
        "Two nights at Ranthambore with private Gypsy safaris, permits booked for you, a morning at the fort and a stay at The Oberoi Vanyavilas or similar.",
    },
  },
];
