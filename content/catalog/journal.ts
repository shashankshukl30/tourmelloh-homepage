import type { Article } from "./types";

/**
 * The Journal: supporting editorial that helps guests choose and understand what Tourmelloh actually provides.
 * The nine opening topics come from section 19 of the client brief. Articles link only to published
 * journeys and to service and experience records; changing facts were checked on 31 Oct 2026.
 */
export const articles: Article[] = [
  {
    slug: "planning-a-first-kashi-visit",
    status: "published",
    title: "Planning a first visit to Kashi, one river morning at a time",
    excerpt:
      "How to shape a first stay in Varanasi: the right number of nights, a dawn on the river, darshan with room around it, and Sarnath given a proper half day.",
    category: "Places",
    hero: "varanasi-aerial-ghats",
    journeys: ["P01", "P02", "P03"],
    items: ["E12", "E13", "E04", "E08", "E24", "S08"],
    sections: [
      {
        heading: "Decide what the visit is for",
        paragraphs: [
          "Kashi means something different to each traveller. For some it is darshan at Shri Kashi Vishwanath, for others the river, the music, the food or the story of the Buddha's first teaching at Sarnath. Name the one or two things that matter most before choosing dates, because they decide everything else: where the hotel should be, which mornings stay free and how many nights you need. A family travelling for darshan with elderly parents plans very differently from a couple who want the ghats at dawn and the lanes after dark. Both are good first visits; they are simply not the same visit.",
        ],
      },
      {
        heading: "Choose the number of nights honestly",
        paragraphs: [
          "Three nights suit most first visits. That allows an arrival evening, a full day for the river and the old city, a half day at Sarnath and a final morning that is not rushed. First Impressions of Varanasi covers the essentials in two nights for those with less time. Varanasi at Your Pace stretches a temple-centred programme over three nights with rest periods for pilgrims who tire easily, and The Many Moods of Varanasi gives three nights to heritage, food, the river and Sarnath. These durations are suggested starting versions, so any of them can be lengthened once your party and pace are known.",
        ],
      },
      {
        heading: "Meet the river before sunrise",
        paragraphs: [
          "The ghats are the city's front steps, more than eighty of them along the western bank, and they read most clearly from the water. The River Wakes is a guided sunrise boat experience, timed so you are on the river as the light comes up behind the far bank and the steps fill with bathers, wrestlers and priests. Whether the boat is shared or private, rowing or motor, is stated in your quotation. Every outing depends on the river level, the weather and local orders; in the monsoon the administration often suspends boats for days, and the plan then moves to a ghat walk or another slot.",
          "Some of what you see from the water is private. At Manikarnika and Harishchandra, the cremation ghats, families are performing last rites, and cameras stay down. A good boatman keeps a respectful distance without being asked, and a good guide explains what is happening without turning grief or worship into a spectacle. The same courtesy applies to bathers at prayer on every ghat you pass. That restraint is part of seeing Varanasi properly, and it is what the people on the steps are owed by every visitor who comes out on the river to watch the city wake.",
        ],
      },
      {
        heading: "Give darshan and aarti their own hours",
        paragraphs: [
          "Shri Kashi Vishwanath, one of the twelve jyotirlingas of Shiva, deserves a part of the day with nothing pressing behind it. Phones, cameras and bags are not permitted in the temple zone, so they stay with your driver or at the hotel, and you will walk barefoot on stone. Queues lengthen on Mondays, through Shravan and at Mahashivratri. Darshan and temple visit assistance can include an accompanying person and, where the temple trust offers a legitimate paid option, a separately specified booking. Nobody can promise a time at the sanctum, and any arrangement is described exactly as it has been confirmed.",
          "The evening Ganga aarti at Dashashwamedh is a different kind of occasion: a row of priests, brass lamps lifted in slow arcs, conch shells and a crowd that builds from late afternoon. Evening on the Ganges is a defined river programme with an optional aarti viewing arrangement from the water, which spares you the crush on the steps. Plan the return as carefully as the approach, because the lanes fill quickly once the ceremony ends. Those who prefer fewer people around them can attend the dawn programme at Assi Ghat, known as Subah-e-Banaras, on another morning instead.",
        ],
      },
      {
        heading: "Leave room for the lanes and Sarnath",
        paragraphs: [
          "Behind the river, the old city is easiest to understand on foot with someone who knows it. Sacred Kashi Walk explains the lanes, shrines and religious context, including where darshan boundaries lie, and A Banarasi Morning is built around breakfast favourites and neighbourhood stories. Sarnath, about ten kilometres away, is where the Buddha gave his first teaching, and since July 2026 it has been a UNESCO World Heritage Site. Sarnath with a Specialist Guide gives it a proper half day. The site museum is closed on Fridays, so that day is fixed first and the rest of the week is arranged around it.",
        ],
      },
      {
        heading: "Keep the first evening light",
        paragraphs: [
          "The first evening should ask very little of you. The airport at Babatpur is about 25 km from the city, the drive takes longer than the map suggests, and cars stop well short of the river. Winter fog often delays morning flights and overnight trains from December to January, so nothing important should hang on an arrival time. An early dinner, a short walk to a quiet ghat and a proper night's sleep set up the dawn boat far better than an ambitious first afternoon. Kashi rewards the traveller who arrives rested and leaves at least one session of the stay unplanned.",
        ],
      },
    ],
    takeaways: [
      "Decide what the visit is for before choosing dates and a hotel.",
      "Three nights suit most first visits; two cover the essentials.",
      "Boats depend on the river and local orders, so keep a walking alternative ready.",
      "Give Kashi Vishwanath and the evening aarti separate parts of the day.",
      "Fix the Sarnath half day around the museum's Friday closure.",
    ],
    seo: {
      title: "First Kashi Visit: Nights, River and Darshan | Tourmelloh",
      description:
        "Plan a first visit to Varanasi: how many nights, the sunrise boat, darshan at Kashi Vishwanath, the evening aarti and a half day at Sarnath, explained.",
    },
  },
  {
    slug: "how-journey-coordination-works",
    status: "published",
    title: "How journey coordination works, from first enquiry to the journey home",
    excerpt:
      "What a named coordinator, a travel host, a sightseeing guide and a concierge each do, how support differs by tier, and what happens after you send an enquiry.",
    category: "Planning",
    hero: "travel-host",
    journeys: ["P01", "P02", "P06"],
    items: ["S09", "S10", "S12", "S01", "S02", "S04"],
    sections: [
      {
        heading: "Why coordination matters in Kashi",
        paragraphs: [
          "Varanasi is rewarding and complicated in equal measure. A single morning can involve a car that must stop short of the lanes, a boat whose departure depends on the river, a temple with its own rules on phones and queues, and a breakfast stall that closes once the food runs out. None of these is difficult on its own. Together, and multiplied across several days and destinations, they decide whether a journey feels calm or chaotic. Coordination means one plan that knows how these pieces fit, and a named person who keeps them fitting when something changes on the day.",
        ],
      },
      {
        heading: "What happens after you enquire",
        paragraphs: [
          "You choose a journey, a tier and any services or experiences, add them to My Journey and send Request My Personalised Quote. No payment is required to submit your preferences. The team then reviews the selections, checks feasibility and availability, and sends a complete quotation that sets out what is included, what is excluded and how every requested item was resolved. Only when you accept that quotation is a booking advance requested, under the terms it states. If you do not yet know your route or duration, Help Me Plan collects your interests, dates and pace instead, and the route is designed from there.",
        ],
      },
      {
        heading: "Coordinator, host, guide and concierge",
        paragraphs: [
          "These four roles are often confused, and the difference is important. A remote coordinator is your named planning contact through the journey, who confirms arrangements, relays changes and solves problems without travelling with you. Your travel host is an accompanying person for specified visits or days. A private sightseeing or specialist guide explains places: a ghat, a museum, a temple's history. A Dedicated travel concierge provides broader support over agreed days and hours, accompanying or remote as defined. One confirmed professional can sometimes cover more than one role, and when that happens the same coverage is never charged twice.",
          "A driver, however experienced, is not a guide. Drivers know the roads, the drop-off points and how long a transfer really takes, but interpreting a site is a different job, and it is not assumed unless a guide is listed. Equally, a host is not security, and a coordinator is not a nurse or a carer. Each role in your quotation states its sessions, days, language and scope, so you know who will be with you at the temple door, who to call when a train is late and who explains what you are looking at.",
        ],
      },
      {
        heading: "How the tiers change the support",
        paragraphs: [
          "Every tier includes planning and coordination. At Standard, you have a named remote coordinator, and a sightseeing guide is included only where it is listed. Premium adds defined hosted assistance and selected guided visits. Luxury brings a dedicated travel concierge with a personal host or escort scope and agreed support hours, along with the journey's mapped Luxury experiences. Continuous in-person cover is not implied at every tier, and Luxury does not mean unlimited staff time. The comparison on each journey page shows exactly which visits are hosted or guided, so you can choose the support your party actually needs.",
        ],
      },
      {
        heading: "A morning where it pays off",
        paragraphs: [
          "Picture the second morning of First Impressions of Varanasi. The boat is set for dawn, but overnight the river rose and the administration paused sailings. Your coordinator has already heard, looks for a slot the following morning and suggests a walk along the ghats instead. The driver is told to collect you later, breakfast moves with the plan, and the Sarnath visit stays where it was, because the museum's Friday closure fixes it. Nothing about the day is extraordinary. It simply runs, because one person knew how each change affected everything else and told everyone in time.",
        ],
      },
      {
        heading: "Arrivals, transfers and the first hour",
        paragraphs: [
          "Coordination starts before you land. Airport and railway station transfers are set from your flight or train details, and arrival welcome and assistance means someone meets you at the agreed point and helps you to the car, though restricted-area access is never implied without a confirmed service. Private chauffeured transport is matched to your party, luggage and route, because one sedan does not suit every group. Share your timings, luggage and any assistance needs when you enquire. The smoother the first hour, the more likely the rest of the journey is to feel unhurried and well held from start to finish.",
        ],
      },
    ],
    takeaways: [
      "Every tier includes planning and a named coordinator; in-person cover varies by tier.",
      "A driver is not a guide, and a host is not security or care.",
      "No payment is needed to submit your selections for a quotation.",
      "The complete quotation always comes before any booking advance.",
      "Share arrival details and assistance needs early, with your enquiry.",
    ],
    seo: {
      title: "How Journey Coordination Works, Step by Step | Tourmelloh",
      description:
        "What a remote coordinator, travel host, guide and concierge each do, how support differs by tier, and what happens after you request a personalised quote.",
    },
  },
  {
    slug: "choosing-a-boat-experience-in-varanasi",
    status: "published",
    title: "Choosing a boat on the Ganga: dawn, dusk, music or a quiet hour",
    excerpt:
      "Shared or private, rowing or motor, sunrise or aarti: how the river experiences differ, how an upgrade replaces the included ride, and what the river itself decides.",
    category: "Planning",
    hero: "varanasi-boat-sunrise",
    journeys: ["P01", "P03", "P04"],
    items: ["S06", "E12", "E13", "E14", "E15", "E16", "E17", "S07"],
    sections: [
      {
        heading: "Start with the hour, not the boat",
        paragraphs: [
          "Most travellers choose a boat by its type, but the hour shapes the experience far more. At dawn the light is soft, the ghats are busy with bathers and priests, and the river is usually calm. At dusk the focus is the aarti at Dashashwamedh, with lamps, bells and a large crowd on the steps. Midday on the water is hot and flat, and rarely what anyone recalls afterwards. Decide whether you want the city waking or the ceremony at nightfall, or both on separate days, and the right boat follows naturally from that choice.",
        ],
      },
      {
        heading: "The river experiences, explained",
        paragraphs: [
          "The River Wakes is a guided sunrise boat experience, with the boat, guide, timing, capacity and boarding point stated in advance. Evening on the Ganges is a defined river programme with an optional aarti viewing arrangement from the water. Sur on the Ganges is a private boat with live music, offered only when a performer and duration are confirmed. Breakfast on the River adds food service to a private boat session, again only where the operating and food arrangements are confirmed. Private River Cruise refers to a specifically identified vessel or category, with its duration and inclusions spelled out.",
          "Guiding and music are separate inclusions, not boat categories. A rowing boat with a guide and a motorboat with a guide are both guided experiences; a musician aboard turns either into a different programme with its own performer and timing. Keeping these apart helps you compare like with like, and it prevents the same session being charged twice when a journey already includes a boat. If photography matters, Varanasi Through Your Lens is a photographer-led route that can run on foot or by boat, with any boat inclusion stated clearly in the quotation.",
        ],
      },
      {
        heading: "Shared, private, rowing or motor",
        paragraphs: [
          "The candidate categories are a shared scheduled ride, a private traditional rowing boat, a private motorboat, and a premium covered or seated boat or licensed cruise where one is actually available. Only confirmed inventory is published, with photographs, seating, capacity, boarding suitability, operator and session details. A rowing boat is slow and quiet, which suits the ghats at dawn; a motorboat covers more of the crescent in the same time. A cruise ticket is a seat on a scheduled vessel, not a private charter. Ask which of these your journey includes, because the answer is always written into the quotation.",
        ],
      },
      {
        heading: "How an upgrade works",
        paragraphs: [
          "Many journeys already include a boat ride, shared or private as stated. Upgrade Your Boat Ride replaces that included ride for the same session; it does not add a second boat. Your quotation shows the current inclusion, the selected replacement and the price difference, which is confirmed by staff rather than calculated by the website. Alternatives for the same session are mutually exclusive, so choosing a private boat removes the shared one. If you want an extra outing on another day, that is labelled an additional session. Where no boat is included at all, the option appears as Add a Boat Ride instead.",
        ],
      },
      {
        heading: "What the river decides",
        paragraphs: [
          "The Ganga sets the timetable. From July to September it rises over the lower ghats, and the district administration suspends all boats until the level falls; in 2026 that happened several times between August and early September. Winter fog can delay a dawn sailing, and strong wind occasionally stops boats at short notice. When a session cannot run, your coordinator explains the alternatives, such as a walk along the ghats or another slot where one is available, and how any difference is handled. No river experience can be promised against the weather or the authorities, whoever is selling it.",
        ],
      },
      {
        heading: "Boarding, comfort and courtesy",
        paragraphs: [
          "Boarding usually means stepping from a stone ghat onto a wooden hull, with no jetty and sometimes a gap or a wobble. Tell us early about anyone who finds steps or balance difficult, so the boarding point and boat type can be chosen with care. Life jackets should be worn on the water, and remember that winter mornings on the water are colder than they feel on land, so bring a shawl. Keep cameras down near Manikarnika and Harishchandra, where families are performing cremations. If you would rather watch the aarti from land, aarti viewing and seating arrangements are a separate request, confirmed only when available.",
        ],
      },
    ],
    takeaways: [
      "Choose the hour first: dawn for the ghats, dusk for the aarti.",
      "Music and guiding are separate inclusions, not boat types.",
      "An upgrade replaces the included ride for that session; staff confirm any difference.",
      "River levels and local orders decide whether boats run on the day.",
      "Share balance or mobility concerns before the boarding point is set.",
    ],
    seo: {
      title: "Choosing a Boat Experience on the Ganga, Varanasi | Tourmelloh",
      description:
        "Sunrise, aarti, music or breakfast on the river: how Varanasi boat experiences differ, how an upgrade replaces the included ride, and when boats stop.",
    },
  },
  {
    slug: "arranging-a-comfortable-trip-for-parents",
    status: "published",
    title: "Arranging a comfortable pilgrimage for your parents",
    excerpt:
      "For adult children planning from afar: pacing, steps, darshan, family updates and the accompanied support of the SHRAVAN collection, explained plainly.",
    category: "Journeys",
    hero: "senior-travellers",
    journeys: ["P02", "P05", "P06"],
    items: ["S16", "S17", "S04", "S05", "S08", "S01"],
    sections: [
      {
        heading: "Plan around the person who tires first",
        paragraphs: [
          "On any journey with older parents, the traveller who tires first sets the pace for everyone. In practice that means one substantial outing a day, usually in the cool of the morning, followed by lunch and real rest. It means fewer hotel changes, more nights in each place and no day that combines a long drive with a demanding temple visit. Varanasi at Your Pace is built on exactly this rhythm, with rest periods written into the programme rather than left to chance. A slower plan is not a lesser one; it is the plan your parents finish with energy and goodwill to spare.",
        ],
      },
      {
        heading: "What SHRAVAN adds",
        paragraphs: [
          "SHRAVAN by Tourmelloh is the collection of thoughtfully accompanied journeys for parents and senior travellers, including trips arranged by overseas or busy adult children. Named accompaniment, suitable pacing and assessed assistance are part of every SHRAVAN journey at every tier, and they stay in place while the journey belongs to the collection. SHRAVAN Varanasi follows Varanasi at Your Pace, while SHRAVAN Varanasi and Ayodhya and SHRAVAN Sacred Confluence follow their parent itineraries with pacing adjusted. A SHRAVAN selection triggers a staff review of mobility, meal routines and assistance scope, and that review may recommend a longer duration.",
          "The senior travel companion at the heart of SHRAVAN has a defined, non-medical scope: walking alongside, managing pacing, helping with queues and steps, and keeping the day moving at the right speed. It is not nursing or personal care. Where a parent needs specialist care, that is a separate request, assessed and delivered only by a qualified provider, and the general enquiry form is not a medical assessment. Being clear about this boundary from the start protects your parents and sets honest expectations for everyone involved, including the people who will be walking beside them each day.",
        ],
      },
      {
        heading: "Separate the booker from the traveller",
        paragraphs: [
          "Many SHRAVAN journeys are booked by a son or daughter in another city or country. The booking contact and the travelling parent are recorded separately, because they need different things: you may want updates and the quotation, while your parents need a clear daily plan and someone to call on the ground. Family updates, photographs and location sharing happen only with the traveller's permission, agreed before departure. Talk to your parents about what they are comfortable sharing. Some welcome a daily message home; others would rather enjoy the journey and tell the stories once they are back.",
        ],
      },
      {
        heading: "Steps, queues and darshan",
        paragraphs: [
          "Temples are often the reason for the journey, and they need the most thought. At Kashi Vishwanath, phones stay outside and the approach is barefoot on stone; in Ayodhya, the Ram Mandir involves security checks and a long walk, and Hanuman Garhi has a steep stair. Darshan and temple visit assistance can provide an accompanying person and any legitimate booking the temple itself offers, but no one can promise a time at the sanctum or a way around the queue. Discuss stairs openly over breakfast: those who climb go at their own pace, and those who wait do so in the shade.",
        ],
      },
      {
        heading: "Wheelchairs, porters and the last fifty metres",
        paragraphs: [
          "The distance that matters most is between the car and the bed. Ask where the car stops, how many steps lie before reception, whether there is a lift and how far the room is from it. Wheelchair and mobility assistance distinguishes between equipment and a person to push or support, and every route is assessed rather than described as fully accessible. Luggage and porter assistance can cover stations and riverside hotels that cars cannot reach. Arrival welcome and assistance means someone meets your parents at the agreed point and helps them to the car, within a scope stated in advance.",
        ],
      },
      {
        heading: "Meals, rest and the right season",
        paragraphs: [
          "Food is where older travellers feel a journey most, and it is the easiest thing to get right. Share dietary routines in advance, whether pure vegetarian, Jain, without onion and garlic, or simply mild, along with meal times that suit any medication. Build afternoon rest into every day. Season matters too: October to March is the comfortable window in Varanasi, Prayagraj and Ayodhya, though dense fog in December and January can delay trains and flights, and April to June brings punishing heat. Carry medicines in hand luggage with their prescriptions and a written note of conditions and allergies.",
        ],
      },
    ],
    takeaways: [
      "Plan one main outing a day, around the traveller who tires first.",
      "SHRAVAN includes named accompaniment and assessed, non-medical assistance at every tier.",
      "Family updates and location sharing happen only with your parents' permission.",
      "Darshan assistance cannot promise a sanctum time or a way around the queue.",
      "Choose hotels by the car-to-room approach, and travel between October and March.",
    ],
    seo: {
      title: "Arranging a Comfortable Pilgrimage for Parents | Tourmelloh",
      description:
        "Planning a pilgrimage for your parents: pacing, steps and darshan, family updates with consent, and the non-medical accompanied support SHRAVAN provides.",
    },
  },
  {
    slug: "what-a-female-hosted-departure-includes",
    status: "published",
    title: "Her Own Way: what a female-hosted departure includes",
    excerpt:
      "Women-only group departures with a female accompanying host: what the host does, how dates and minimum group size work, room sharing, and what registering interest means.",
    category: "Journeys",
    hero: "women-travellers",
    journeys: ["P01", "P06", "P14"],
    items: ["S11", "S10", "S02", "S04", "S13"],
    sections: [
      {
        heading: "Why a women-only departure",
        paragraphs: [
          "Some women prefer to travel with other women, whether alone, with a friend or with a mother or sister. Her Own Way by Tourmelloh offers women-only journeys with a female accompanying host, shaped by a female founder's understanding of what helps women feel at ease in a busy pilgrimage city: who meets you at the airport, where the hotel is, how evenings are spent and who is there if something feels wrong. The departures follow existing itineraries rather than inventing new ones, so the route, pacing and inclusions can be compared directly with the private versions of the same journeys.",
        ],
      },
      {
        heading: "The three departure templates",
        paragraphs: [
          "Three departure templates are planned. Varanasi Escape follows First Impressions of Varanasi with the approved hosted programme. The Sacred Confluence departure follows the Varanasi, Prayagraj and Ayodhya journey of the same name. The Bodh Gaya & Sarnath departure follows Awakening & the First Teaching. Each is a scheduled group departure with fixed start and end dates, not a flexible date picker, and dates appear only once the founder has approved them. Until then, each departure shows Dates coming soon, and you can register interest in future dates without any commitment and without making a payment of any kind.",
        ],
      },
      {
        heading: "What the female host does",
        paragraphs: [
          "The female accompanying host is part of the product, not an optional extra, and is included on every departure. Each departure states the host's exact coverage and language: which days and sessions she accompanies, what she helps with, and who to contact outside her sessions. Her role is companionship, pacing, logistics on the ground and a familiar face throughout, distinct from a sightseeing guide or security. Tourmelloh does not promise that every driver, guide or hotel employee will be a woman unless each role is confirmed. A female driver can be requested on private transport, and the preference is recorded and confirmed only where available.",
        ],
      },
      {
        heading: "Dates, minimums and what confirmed means",
        paragraphs: [
          "Each dated departure carries several separate facts: the exact date range, the minimum number of confirmed travellers, the maximum capacity, a confirmation deadline and a public status. The statuses are Dates coming soon, Open for enquiries, Minimum group pending, Departure confirmed, Full, Closed and Cancelled. A date can be approved while the departure is still waiting for its minimum group, and both facts are shown separately. Capacity and minimum numbers are set by the founder, never invented, and live seat counters are never shown. If tiers need different arrangements, the departure explains how the shared programme works.",
          "Registering interest or sending an enquiry does not confirm a booking, and it does not count towards the minimum group size; only accepted bookings do. Tourmelloh confirms the departure and the complete price before asking for any booking payment. If a departure does not reach its minimum, it is not quietly turned into a private tour. A private journey can be offered separately, with a new quotation, if you would like one. That way you always know whether you are holding a place on a group departure or considering something different, and nothing changes without your agreement.",
        ],
      },
      {
        heading: "Rooms, tiers and pacing",
        paragraphs: [
          "Every departure states its room-sharing and single-room policy, so you know before enquiring whether you would share a twin room with another traveller or have a room to yourself. Offered tiers are listed per departure, and a confirmed group in one tier does not fill the minimum of a separate group in another. Pacing follows the parent itinerary with the hosted programme adjusted for a group: early mornings on the river, rest in the afternoons and evenings planned around the host's coverage. Dietary needs, language preferences and assistance requests are collected with your enquiry, so they shape the plan from the start.",
        ],
      },
      {
        heading: "How to enquire",
        paragraphs: [
          "On a departure with approved dates, use Enquire About This Departure and tell us your date flexibility, the number travelling, your preferred tier, your room preference and whether you would consider an alternative date. Where no date is yet approved, choose Register Interest in Future Dates instead. A WhatsApp message from the departure page is prefilled with its title and any approved dates, and you can edit it before sending; a message alone is not a submitted enquiry. Either way, nothing is booked and nothing is paid until you have read and accepted a complete quotation for your place.",
        ],
      },
    ],
    takeaways: [
      "A female accompanying host is included on every Her Own Way departure, with stated coverage.",
      "Dates appear only once approved; until then you can register interest.",
      "Enquiries do not count towards the minimum group size.",
      "An unmet minimum is never silently swapped for a private tour.",
      "Room-sharing policy and offered tiers are stated for each departure.",
    ],
    seo: {
      title: "What a Female-Hosted Departure Includes | Tourmelloh",
      description:
        "Her Own Way women-only departures: what the female accompanying host covers, how approved dates and minimum group size work, room sharing and enquiries.",
    },
  },
  {
    slug: "planning-sarnath-and-bodh-gaya",
    status: "published",
    title: "Sarnath and Bodh Gaya: planning the first teaching and the awakening",
    excerpt:
      "How to join Sarnath near Varanasi with Bodh Gaya in Bihar: nights, the long road between them, temple rules, winter gatherings and where Lumbini fits.",
    category: "Places",
    hero: "bodhgaya-mahabodhi",
    journeys: ["P14", "P01", "P12"],
    items: ["E24", "S12", "S13", "S02", "S29"],
    sections: [
      {
        heading: "Two chapters of one life",
        paragraphs: [
          "Bodh Gaya is where the Buddha attained enlightenment beneath the Bodhi Tree; Sarnath, near Varanasi, is where he gave his first teaching soon afterwards. Journeys can run either way. Our Awakening & the First Teaching begins at Bodh Gaya and ends at Sarnath, in the order of the Buddha's own life; others start in Varanasi, the easier place to arrive. Either way works. Beginning at Sarnath lets you learn the vocabulary of the sites, the stupas, monastery plans and carved symbols, before you reach the living temple at Bodh Gaya. Awakening & the First Teaching joins the two over a suggested four nights, with the travel order set by your arrival and departure gateways rather than by the story.",
        ],
      },
      {
        heading: "Reading Sarnath well",
        paragraphs: [
          "Sarnath's archaeological park holds the Dhamek Stupa, the base of the Dharmarajika Stupa and the brick foundations of monasteries that once housed large communities of monks. In July 2026 it was inscribed on the UNESCO World Heritage List together with the Chaukhandi Stupa nearby. The site museum, home to the Lion Capital of Ashoka, is closed on Fridays while the park stays open, so the Sarnath day is fixed first. Sarnath with a Specialist Guide pairs the park and museum with someone trained to read ruins and inscriptions, and transport and entry are listed separately in your quotation.",
        ],
      },
      {
        heading: "The road between them",
        paragraphs: [
          "Sarnath and Bodh Gaya are about 250 km apart, crossing from Uttar Pradesh into Bihar, and the drive usually takes five to seven hours depending on traffic and stops. Treat it as a travel day in its own right: leave after breakfast, stop for a proper lunch and arrive with the late afternoon free. Trains are an alternative, with faster services from Pt. Deen Dayal Upadhyaya Junction reaching Gaya in around three hours, followed by a short drive. Flight and train booking assistance can help with tickets, though no seat is promised before it is confirmed.",
        ],
      },
      {
        heading: "A morning at the Mahabodhi",
        paragraphs: [
          "The Mahabodhi Temple complex, a World Heritage Site since 2002, includes the great temple, the Bodhi Tree revered as a descendant of the original, the Vajrasana and the shrines associated with the weeks after the enlightenment. Come early, when monks and pilgrims from Tibet, Thailand, Sri Lanka, Myanmar, Japan and beyond are circling the tower in the half-light. Move through the complex with your guide, then let the guide step back. The most valuable thing a visitor can do here is find a quiet place, sit down and stay a while without looking at the time.",
          "It is an active place of worship first, so voices stay low and prayer has right of way. Phones are not allowed inside and are left at a counter at the entrance, cameras may need a separate ticket, and the rules are set by the temple management committee, so they are confirmed before you leave the hotel. Shoes come off at the entrance; in winter, socks make the stone far kinder underfoot. Those who want to meditate can return in the evening, when the light softens, the lamps are lit and the chanting carries across the complex.",
        ],
      },
      {
        heading: "Monasteries, Rajgir and Nalanda",
        paragraphs: [
          "Choose two or three of Bodh Gaya's national monasteries rather than all of them: the Thai temple with its gilded roof, the painted Bhutanese monastery and the Great Buddha Statue among its gardens make a calm afternoon. Confirm visiting times rather than assuming every monastery is open for sightseeing. Those continuing further can add Rajgir, where the Buddha taught on Vulture's Peak, and the ruins of Nalanda, the ancient monastic university and also a World Heritage Site. Language assistance and interpreters can help pilgrims more comfortable in another language, subject to confirmation of the language and sessions.",
        ],
      },
      {
        heading: "Gaya, Lumbini and the wider circuit",
        paragraphs: [
          "Gaya, about fifteen kilometres north of Bodh Gaya, is a separate Hindu pilgrimage city known for the Vishnupad Temple and ancestral rites. A Buddhist journey does not include it unless you expressly add it. Lumbini, the Buddha's birthplace, is in Nepal and is handled as a separate extension enquiry. Within Uttar Pradesh, the story continues at Kushinagar, where the Buddha passed away, and Shravasti, where he spent many rainy seasons; Sarnath Kushinagar and Shravasti Pilgrimage covers those sites. The In the Footsteps of the Buddha collection shows each journey's destinations and duration at a glance.",
        ],
      },
    ],
    takeaways: [
      "Begin at Sarnath for practical reasons; the story still reads clearly.",
      "Fix the Sarnath day around the museum's Friday closure.",
      "Treat the 250 km road to Bodh Gaya as a travel day.",
      "Give the Mahabodhi an early morning, and check phone and camera rules.",
      "Gaya and Lumbini are separate additions, never included by default.",
    ],
    seo: {
      title: "Planning Sarnath and Bodh Gaya Together | Tourmelloh",
      description:
        "How to plan Sarnath and Bodh Gaya: nights in each, the 250 km road between them, Mahabodhi temple rules, Rajgir and Nalanda, and where Gaya and Lumbini fit.",
    },
  },
  {
    slug: "gaya-and-bodh-gaya-explained",
    status: "published",
    title: "Gaya and Bodh Gaya: two pilgrim towns, two different journeys",
    excerpt:
      "Fifteen kilometres apart and constantly confused: why Gaya and Bodh Gaya serve different traditions, and how to plan rites, a Buddhist visit, or both.",
    category: "Places",
    hero: "gaya-vishnupad",
    journeys: ["P14"],
    items: ["S22", "S19", "S12", "S02"],
    sections: [
      {
        heading: "Two towns, one airport",
        paragraphs: [
          "Gaya and Bodh Gaya are about fifteen kilometres apart in Bihar, share an airport and a railway junction, and are often spoken of as one place. They are not. Gaya, renamed Gaya Ji by the state government in May 2025, is a Hindu pilgrimage city where families perform ancestral rites. Bodh Gaya is the small Buddhist town around the Mahabodhi Temple, where the Buddha attained enlightenment. Each draws pilgrims from across the world, for completely different reasons, and a journey planned for one does not automatically include the other, however close they look on a map.",
        ],
      },
      {
        heading: "Gaya: the city of ancestral rites",
        paragraphs: [
          "At the heart of Gaya is the Vishnupad Temple, built over a footprint in rock that tradition identifies as Vishnu's, beside the Falgu river. Families come to perform pind daan, the offering of rice balls for departed ancestors, at the temple and at a network of altars along the riverbank and the surrounding hills. Rites are usually led by Gayawal priests, many of whose families keep records of the pilgrims they have served over generations. Entry to the Vishnupad sanctum is restricted to Hindus. The busiest season is Pitru Paksha, the fortnight of ancestors in September or October.",
        ],
      },
      {
        heading: "Bodh Gaya: the seat of awakening",
        paragraphs: [
          "Bodh Gaya's centre is the Mahabodhi Temple, a World Heritage Site, with the Bodhi Tree and the Vajrasana, the diamond throne where the Buddha sat. Around it stand monasteries built by Buddhist communities from many countries, each in its own architectural style. Visitors of every faith are welcome, provided they dress modestly, walk clockwise and keep voices low. The town's busiest months are December and January, when monastic traditions hold large prayer gatherings. Bodh Gaya pairs naturally with Sarnath near Varanasi, and Awakening & the First Teaching is the journey that joins the two places.",
        ],
      },
      {
        heading: "Why the distinction matters in planning",
        paragraphs: [
          "Because the towns are so close, it is easy to assume a visit to one includes the other. On Tourmelloh journeys it never does by default. A Hindu rites journey does not include a Buddhist programme, and a Buddhist pilgrimage does not include rites in Gaya, unless either is expressly added. This protects both experiences. Rites in Gaya can take a morning, a full day or several days depending on family custom, and squeezing the Mahabodhi into the afternoon afterwards serves neither well. The same applies in reverse: a meditative day at Bodh Gaya should not end with a rushed ritual.",
        ],
      },
      {
        heading: "Arranging rites properly",
        paragraphs: [
          "If ancestral rites are the purpose of your journey, they are scoped individually before anything else is fixed. Pind Daan and ancestral rites arrangements begin with the questions that matter: which rite, which family tradition, at Gaya or another requested site such as Kashi, how many altars, how many participants and on which dates. Priest and ritual coordination then covers the priest, materials, timing and charges, all confirmed in writing. The length of the journey follows the rite, rather than the rite being fitted around a fixed itinerary, which is why rites-led journeys are planned on request.",
          "Agree the priest's role and dakshina before the ritual begins, so that no one is negotiating during a moment of grief. Bring simple, modest clothes, often white or light colours, and a change for after bathing at the river. Photography of the rite is a family decision, and other families' rituals are never photographed. If older relatives are taking part, discuss seating, since many rites involve sitting on the ground for long periods. Some altars, such as Pretshila, are reached by long flights of steps and can be left out or visited by the younger members of the family.",
        ],
      },
      {
        heading: "Visiting both, deliberately",
        paragraphs: [
          "Many families do want both: a rite for a parent in Gaya and a visit to the Mahabodhi out of respect or curiosity. That is entirely possible when it is planned. Give each its own time, usually the rites in the morning and Bodh Gaya on a separate day or as a later, unhurried visit. Mention both when you enquire, and both are written into your quotation as separate parts of the journey. A private sightseeing guide can explain Bodh Gaya's temple and monasteries, while the rites in Gaya remain in the priest's hands, where they belong.",
        ],
      },
    ],
    takeaways: [
      "Gaya, now Gaya Ji, is a Hindu city of ancestral rites; Bodh Gaya is Buddhist.",
      "Neither visit includes the other unless it is expressly added.",
      "Rites are scoped first, and the length of the journey follows the rite.",
      "Agree the priest's role and dakshina before the ritual begins.",
      "If you want both, give each its own time.",
    ],
    seo: {
      title: "Gaya and Bodh Gaya: Understanding the Difference | Tourmelloh",
      description:
        "Gaya and Bodh Gaya are fifteen kilometres apart but serve different faiths: ancestral rites at Vishnupad, the Mahabodhi Temple, and how to plan one or both.",
    },
  },
  {
    slug: "kashi-prayagraj-ayodhya-at-a-suitable-pace",
    status: "published",
    title: "Kashi, Prayagraj and Ayodhya, joined at a pace that suits you",
    excerpt:
      "Three sacred cities, three rivers and a lot of road: how many nights each city needs, which order works, and how festivals change the plan.",
    category: "Journeys",
    hero: "prayagraj-sangam-birds",
    journeys: ["P04", "P05", "P06"],
    items: ["S02", "S05", "S08", "S19", "S21", "E12"],
    sections: [
      {
        heading: "Name the visit at the heart of it",
        paragraphs: [
          "Every family that travels this route has one visit at its centre: darshan at Kashi Vishwanath, a first sight of Ram Lalla in Ayodhya, or a prayer at the Sangam for a parent's sake. Name it before anything else is decided, because it fixes the order of the cities, the dates and which night should sit closest to that visit. If a ritual is part of the journey, a Ganga puja at the confluence or a rite on the riverbank, mention it early, so that the priest, the place and the timing can be confirmed rather than improvised on the day.",
        ],
      },
      {
        heading: "Three journeys, three paces",
        paragraphs: [
          "There are three ways to travel this route. Varanasi and Prayagraj Pilgrimage takes a suggested four days, with the overnight pattern confirmed to suit the guests and a longer assisted version available. Varanasi and Ayodhya Pilgrimage gives five days to those two cities. The Sacred Confluence joins all three over a suggested six days; its name is thematic, not a claim that the three cities share a geographical confluence, and it does not prescribe the travel order. All durations are starting versions. Travel days are never calculated by simply counting cities, because the roads between them decide far more.",
        ],
      },
      {
        heading: "What the road really takes",
        paragraphs: [
          "Varanasi to Prayagraj is about 120 km, usually around three hours by car. Prayagraj to Ayodhya is about 170 km, roughly four hours, and Ayodhya back to Varanasi a little over 200 km, four to five hours on the road. Those are driving times, not door-to-door times: add loading, a proper lunch, traffic through towns and the walk from a riverside hotel to the car. Private chauffeured transport is matched to your party, luggage and route, and luggage and porter assistance helps where cars cannot reach. A day with a long drive should carry nothing more demanding than an evening by the river.",
        ],
      },
      {
        heading: "Giving each city its due",
        paragraphs: [
          "Varanasi usually has the longest stay, because it has the most to absorb and is the easiest place to arrive. Give the river a dawn, the temple a morning and the aarti an evening, with rest between. The River Wakes takes care of the first, and darshan and temple visit assistance can support the second within the temple's own rules. Prayagraj needs one night for most pilgrims, placed so the Sangam is seen in early light rather than the glare of midday. Boats to the confluence depend on river conditions and local orders, so a shore-side alternative is always kept ready.",
          "Ayodhya deserves a clear morning for the Ram Mandir, with no departure pressing behind it. Expect security checks, phones and bags deposited, and a long approach on foot; Hanuman Garhi's steep stair needs discussing in advance if anyone finds steps hard. Kanak Bhawan is gentler, and Ram Ki Paidi on the Sarayu is the place to let the day settle in the evening. If darshan in Ayodhya is the purpose of the trip, add a second night there, so the visit never sits against a train or a flight home on the same day.",
        ],
      },
      {
        heading: "Gateways at either end",
        paragraphs: [
          "Look at the whole route on one page before anything is confirmed. Varanasi has a well-connected international airport; Ayodhya's Maharishi Valmiki International Airport has direct domestic flights; Prayagraj has its own airport and a major railway junction; and Lucknow's airport, about 135 km from Ayodhya, is often the easier connection home. Arriving in one city and leaving from another usually saves a long backtrack. Winter fog in December and January can delay early flights and overnight trains, so the plan should never hang a temple visit on an optimistic arrival time at the start of the journey.",
        ],
      },
      {
        heading: "Check the calendar before the dates",
        paragraphs: [
          "Festivals transform these cities and the roads between them. The Magh Mela fills Prayagraj's floodplain each January and February, with vast crowds and traffic diversions on the main bathing days. Ram Navami in spring and Deepotsav on the eve of Diwali bring Ayodhya its busiest days. Dev Deepawali lights the Varanasi ghats on Kartik Purnima, which falls on 24 November in 2026, and Shravan Mondays lengthen the queues at Kashi Vishwanath. Each is extraordinary to witness, and each needs rooms, cars and movement planned months ahead. Otherwise, choose quieter weeks for an easier pilgrimage.",
        ],
      },
    ],
    takeaways: [
      "Name the visit at the heart of the journey before fixing the order.",
      "Allow three to five hours between cities, plus real door-to-door time.",
      "Stay overnight in Prayagraj so the Sangam is seen in early light.",
      "Keep Ayodhya's darshan clear of arrival and departure days.",
      "Check the Magh Mela, Ram Navami, Deepotsav and Dev Deepawali dates first.",
    ],
    seo: {
      title: "Kashi, Prayagraj and Ayodhya at a Suitable Pace | Tourmelloh",
      description:
        "How to combine Varanasi, Prayagraj and Ayodhya: nights in each city, real road times, gateways at either end and the festivals that change the plan.",
    },
  },
  {
    slug: "planning-guest-hospitality-for-a-kashi-wedding",
    status: "published",
    title: "Planning guest hospitality for a wedding in Kashi",
    excerpt:
      "Arrivals, rooms, transfers, meals and time on the river: how to look after wedding guests in Varanasi so the celebration feels generous from the first hour.",
    category: "Weddings",
    hero: "arrival-welcome",
    journeys: ["P01", "P03"],
    items: ["S01", "S04", "S02", "S28", "S27", "S31", "S13", "E13"],
    sections: [
      {
        heading: "Begin with the guest list, not the venue",
        paragraphs: [
          "A wedding in Varanasi is as much a hosting task as a ceremony. Before venues and decor, map your guests: how many are coming, from which cities and countries, who is elderly or travelling with small children, and who will stay for the whole celebration rather than a single evening. That list decides how many rooms you need and where, how many vehicles and of what size, which languages matter and how much support each day requires. Wedding in Varanasi, with its line Begin your forever in Mahadev's abode, starts from this picture, which is why its enquiry form asks about guests and rooms.",
        ],
      },
      {
        heading: "Arrivals that set the tone",
        paragraphs: [
          "Guests remember their first hour. Airport and railway station transfers are scheduled from flight and train details, with passenger and luggage counts noted, and arrival welcome and assistance means someone meets them at the agreed point and helps them to their car within a stated scope. For a wedding, arrivals cluster over a day or two, so the plan matches vehicles to waves of guests rather than individuals. Winter fog can delay flights and overnight trains in December and January, which is also a busy wedding season, so the transfer plan needs room to absorb late arrivals calmly.",
        ],
      },
      {
        heading: "Rooms and the walk to the river",
        paragraphs: [
          "Varanasi's hotels range from riverside heritage buildings reached through the lanes to garden properties where cars stop at the door, and wedding guests often need both. Group older relatives where the approach is easy, and place guests who want the river where the steps are part of the charm. Room allocation, categories and meal plans are always reviewed and quoted, including extension nights for guests who arrive early or stay on. Book early: wedding dates in the cooler months coincide with Dev Deepawali, the year-end holidays and the busiest weeks of the travel season in the city.",
        ],
      },
      {
        heading: "Moving guests between events",
        paragraphs: [
          "A wedding spread over several days means many short journeys: hotel to haldi, mehendi venue to sangeet, ceremony to reception. Private chauffeured transport can be planned as a timed shuttle between venues, with vehicle capacity matched to each group and luggage kept separate on arrival and departure days. Share the event schedule early, because the lanes near the ghats are slow and some venues cannot be reached by car at all. Language assistance and interpreters can help overseas guests, or relatives more comfortable in another language, subject to confirmation of the language and the sessions needed.",
        ],
      },
      {
        heading: "Meals, welcome gifts and dietary care",
        paragraphs: [
          "Food is where hospitality shows. Dining reservations and dietary coordination keep reservations and included meals clearly separate, and relay every requirement, from Jain and no onion or garlic to allergies, to the people cooking. Welcome amenities and celebration gifts can greet guests in their rooms with a hamper, refreshments or a small keepsake, with contents and allergies defined in advance. A short welcome note with the schedule, key contacts and a simple map of the lanes near each venue saves a great many phone calls once the celebration is under way.",
        ],
      },
      {
        heading: "Giving guests a taste of Kashi",
        paragraphs: [
          "Many guests are visiting Varanasi for the first time, and the hours between events are a chance to share the city. Evening on the Ganges, with an optional aarti viewing arrangement from the water, suits a group arriving the day before the ceremony. A morning walk along the ghats or a food trail after sunset gives younger guests something to do while elders rest. Guests who want more can extend their stay with First Impressions of Varanasi or The Many Moods of Varanasi. Travel items for guests form part of a later quoted wedding and travel proposal.",
          "Keep these experiences optional and clearly timed, so nobody misses a ceremony for a boat ride. River outings depend on water levels and local orders, which matters most for weddings in the monsoon months, when boats are often suspended. The wedding page describes only real, approved venues and the services actually undertaken, from venue sourcing and accommodation to ceremonies, catering and photography. When you are ready, Discuss Your Wedding opens the separate wedding enquiry, and every arrangement is set out in a complete proposal before any payment is requested.",
        ],
      },
    ],
    takeaways: [
      "Map the guest list first: origins, ages, languages and length of stay.",
      "Match transfers to arrival waves and allow for winter fog delays.",
      "Place older relatives where the hotel approach is easy.",
      "Relay every dietary requirement and keep meals and reservations distinct.",
      "Keep guest experiences optional and timed around the ceremonies.",
    ],
    seo: {
      title: "Guest Hospitality for a Wedding in Varanasi | Tourmelloh",
      description:
        "Looking after wedding guests in Varanasi: arrivals and transfers, room allocation, moving between events, dietary care and optional time on the Ganga.",
    },
  },
];
