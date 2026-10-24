export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  destinations: string[];
  relatedJourney: string;
  sections: { heading: string; paragraphs: string[] }[];
  takeaways: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "first-time-in-varanasi",
    title: "A first visit to Varanasi, at a human pace",
    excerpt: "River mornings, temple visits and time in Sarnath: six decisions that make a first stay in Kashi feel more considered.",
    category: "The Varanasi journal",
    image: "/images/varanasi-dawn.webp",
    imageAlt: "Boats resting beside the historic ghats of Varanasi in the morning light",
    destinations: ["Varanasi"],
    relatedJourney: "kashi-before-the-world-wakes",
    sections: [
      {
        heading: "Give your arrival a little space",
        paragraphs: [
          "An overnight train, a hotel check-in and an ambitious first day can be an awkward combination. Begin with the arrival you have actually booked: its station or airport, landing time and the journey to your accommodation. Leave the first outing short enough to change if you arrive tired. A meal and a gentle introduction to the riverfront can be plenty. Save the experience you most want to remember for a morning when you can give it your attention, especially if children or older relatives are travelling.",
        ],
      },
      {
        heading: "Choose your base by the final approach",
        paragraphs: [
          "A room described as close to the ghats may still involve steps, narrow lanes or a walk from the vehicle drop-off. Ask for that final approach in plain terms before choosing where to stay. Riverfront atmosphere and convenient vehicle access are different priorities; the right balance depends on your group. Check how luggage reaches the property, whether the room involves stairs, and how you will return after an evening outing. A location that works comfortably twice a day is more useful than an impressive distance on a map.",
        ],
      },
      {
        heading: "Meet the river before filling the day",
        paragraphs: [
          "The ghats are the stepped edges through which much of Varanasi meets the Ganga. An early walk or a boat outing offers a way to understand their relationship with the city. Keep boating conditional on river conditions, local permission and a suitable boarding point. Discuss the practicalities before setting out, including support getting aboard. There is no need to hurry through every ghat. Choose a manageable stretch, watch the light, and give people using the river for worship or daily life the space and privacy they deserve.",
        ],
      },
      {
        heading: "Separate darshan from the evening aarti",
        paragraphs: [
          "If Shri Kashi Vishwanath is central to your visit, give it its own part of the day. Check the temple's current entry instructions and arrangements for belongings before leaving your accommodation. Plan an evening Ganga aarti visit separately, with time for the approach and the return through busy streets. Choose a place where your group can remain comfortable rather than pursuing the closest possible view. Photography should follow the rules of each setting; worship, mourning and family ceremonies call for particular discretion, even where a camera is permitted.",
        ],
      },
      {
        heading: "Make Sarnath a proper visit",
        paragraphs: [
          "Sarnath, near Varanasi, is associated with the Buddha's first teaching after enlightenment. The Dhamekh Stupa and archaeological remains introduce that history; the museum gives the surviving sculpture a different kind of attention. Pairing the two can make the visit more rewarding than a brief stop for a photograph. Check the museum's opening day separately from the archaeological site before fixing the outing. Keep a meal or rest break around it, and let your interest in the collections determine how much of the day you reserve.",
        ],
      },
      {
        heading: "Build the stay around a few anchors",
        paragraphs: [
          "Three nights is a useful starting suggestion for a first visit: arrival and orientation, a river-and-city day, a Sarnath day, then departure. Adjust that shape around your actual connections. If textiles interest you, make time for a considered look at Banarasi weaving and ask questions about the material and workmanship before buying. Leave at least one interval without a booking. That space can absorb a longer temple visit, a tired afternoon or the wish to return to a place you enjoyed. A successful Kashi stay does not need a completed checklist.",
        ],
      },
    ],
    takeaways: [
      "Confirm the final walking and stair access to your accommodation.",
      "Keep boating and temple visits subject to current local arrangements.",
      "Reserve a separate Sarnath outing and a flexible interval in Varanasi.",
    ],
  },
  {
    slug: "varanasi-prayagraj-ayodhya-route",
    title: "Varanasi, Prayagraj and Ayodhya: give each city its own time",
    excerpt: "How to connect the ghats, the Sangam and the Sarayu without turning a meaningful pilgrimage into a sequence of rushed transfers.",
    category: "Routes & planning",
    image: "/images/prayagraj-river.webp",
    imageAlt: "The Yamuna river and a bridge at Prayagraj",
    destinations: ["Varanasi", "Prayagraj", "Ayodhya"],
    relatedJourney: "along-the-sacred-rivers",
    sections: [
      {
        heading: "Start with the reason for the journey",
        paragraphs: [
          "For one family, this route begins with Kashi Vishwanath. For another, Ram Mandir determines the dates, while someone else wants time at the Sangam. Write down the visit that matters most before arranging the route. Varanasi, Prayagraj and Ayodhya each carry distinct religious associations and practical demands. Giving one priority the clearest stretch of the itinerary helps the rest fall into place. Discuss any requested ritual separately, including its location, duration and arrangements, so the plan reflects your purpose rather than a generic list of temple names.",
        ],
      },
      {
        heading: "Use nights to protect visiting time",
        paragraphs: [
          "A starting shape is three nights in Varanasi, one in Prayagraj and one in Ayodhya. That is a planning suggestion, with arrival and departure occupying parts of the six-day trip. It works best when connections leave useful time in the final city. Add an Ayodhya night if darshan is your main purpose or the onward journey starts early. Before accepting any itinerary, mark each transfer, check-in and checkout. The unallocated time between them is the time you actually have for the places you came to see.",
        ],
      },
      {
        heading: "Let Varanasi establish the pace",
        paragraphs: [
          "Use the Varanasi stay for a river morning, your chosen temple visit and an evening aarti, with breaks between them. Sarnath can occupy a separate outing if Buddhist heritage interests you. Avoid attaching the fullest city programme to arrival day, particularly after an overnight journey. The old-city approach and ghat steps deserve attention when choosing both accommodation and meeting points. A slightly shorter walk that everyone can enjoy usually contributes more to the trip than a long circuit that leaves the group exhausted before the next transfer.",
        ],
      },
      {
        heading: "Give Prayagraj more than a passing stop",
        paragraphs: [
          "At the Triveni Sangam, the Ganga and Yamuna meet; the Saraswati belongs to the sacred tradition of the confluence. Decide whether your visit centres on prayer, observing the rivers or a requested ritual. A boat outing depends on conditions and current local arrangements, so keep a workable shore-based alternative. An overnight stay offers flexibility after the journey from Varanasi. If the Sangam visit is shorter than expected, use the spare time for rest or an individually chosen addition, rather than automatically extending the day with extra driving.",
        ],
      },
      {
        heading: "Keep an open window in Ayodhya",
        paragraphs: [
          "Plan Ram Mandir around the current entry arrangements and allow for the approach, security and queues. Hanuman Garhi, Kanak Bhawan and Ram Ki Paidi can then fit around the central visit, according to energy and available time. Hanuman Garhi's stepped approach matters when travelling with someone who finds stairs difficult. A riverside pause may be a more comfortable final outing than another temple. Keep your departure connection visible throughout the planning; a tightly timed last morning is an uncomfortable place to put the visit that matters most.",
        ],
      },
      {
        heading: "Check the route as a whole",
        paragraphs: [
          "Send the exact arrival and departure tickets when discussing transfers. A city name alone does not identify the station, airport or hotel approach. Share walking limits, dietary preferences and the number of people who may need a slower pace. Check festival dates before choosing hotels: crowds and local movement can change the character of the same route considerably. Finally, ask for the agreed transport, stays and requested visits to be written clearly in the proposal. That makes it easier to see whether the journey contains the time and support your group needs.",
        ],
      },
    ],
    takeaways: [
      "Choose the principal pilgrimage visit before fixing the order.",
      "Treat the five-night outline as a starting point, then test your connections.",
      "Allow separate time for transfers, temple access and requested rituals.",
    ],
  },
  {
    slug: "planning-an-ayodhya-visit",
    title: "Ayodhya, planned around the visit that matters to you",
    excerpt: "A thoughtful approach to Ram Mandir, Hanuman Garhi, Kanak Bhawan and the Sarayu, with room for the people travelling.",
    category: "Sacred places",
    image: "/images/ayodhya-riverfront.webp",
    imageAlt: "Stepped ghats and riverfront buildings at Ram Ki Paidi in Ayodhya",
    destinations: ["Ayodhya"],
    relatedJourney: "ayodhya-at-your-own-pace",
    sections: [
      {
        heading: "Protect a useful day in the city",
        paragraphs: [
          "Arriving late and leaving early can turn an overnight stay into very little time in Ayodhya. Compare your connections before deciding the number of nights. If Ram Mandir is the purpose of the journey, protect a substantial visiting window and build meals, rest and smaller outings around it. Two nights may suit a group arriving from a long distance, while a carefully timed shorter stay can work for others. The useful measure is the time available in the city after travel, rather than the number of dates printed on an itinerary.",
        ],
      },
      {
        heading: "Give Ram Mandir your full attention",
        paragraphs: [
          "Shri Ram Janmabhoomi Mandir follows the Nagara architectural tradition, with Ram Lalla at the centre of worship. For a pilgrimage visit, leave room for the experience itself as well as the entrance process. Confirm current visitor instructions, permitted belongings and any required arrangements close to your dates. Keep those details together so everyone in the group knows what to carry and where to meet afterwards. An advertised itinerary should never be read as a promise of a particular queue length or a guaranteed short route through darshan.",
        ],
      },
      {
        heading: "Talk about Hanuman Garhi's stairs",
        paragraphs: [
          "Hanuman Garhi is an important Ayodhya shrine to Hanuman, approached by a staircase. That practical detail should be discussed before it appears as an automatic stop for the whole group. Ask travellers what they can comfortably manage, and allow time to pause on the approach. The main image depicts the young Hanuman with his mother Anjani, giving the visit its own devotional focus. If someone prefers to sit out the climb, agree a comfortable meeting arrangement in advance rather than making a hurried decision in the middle of the outing.",
        ],
      },
      {
        heading: "Spend time in Kanak Bhawan's courtyard",
        paragraphs: [
          "Kanak Bhawan is associated with Ram and Sita and brings a courtyard setting into the day's temple visits. Approach it as a place with its own rhythm: take in the building, follow the current arrangements for darshan and make room for worshippers moving through. It can accompany another temple visit when the group still has energy, but proximity on a map should not dictate the pace. Leave enough time to return for a meal or rest. A shorter, attentive visit can be more satisfying than arriving already tired from a long sequence.",
        ],
      },
      {
        heading: "Leave an evening for Ram Ki Paidi",
        paragraphs: [
          "Ram Ki Paidi is a series of ghats along the Sarayu riverfront, where stepped edges and buildings shape the view. It offers a change of setting after time in the temples. Choose a manageable walk and take care around the water and steps, especially as the light falls. If you hope to attend a particular aarti or lighting event, check the current programme instead of assuming it follows a fixed visitor schedule. The riverfront remains worthwhile as a place to pause, with the length of the outing guided by the group.",
        ],
      },
      {
        heading: "Choose dates with the atmosphere in mind",
        paragraphs: [
          "Ram Navami and Deepotsav give Ayodhya a particular significance for many visitors. They also call for a separate conversation about accommodation, access and moving around the city. Decide whether a major gathering is part of the experience you want, then check the arrangements for those exact dates. At other times, shape outdoor walking around the forecast and keep a generous break in hotter weather. Share mobility needs before booking the stay. Comfortable access, a useful visiting window and a realistic return plan make a stronger foundation than an overly full daily schedule.",
        ],
      },
    ],
    takeaways: [
      "Reserve a useful darshan window before adding secondary visits.",
      "Discuss Hanuman Garhi's stairs and riverfront walking with the whole group.",
      "Check date-specific temple and festival arrangements close to travel.",
    ],
  },
  {
    slug: "sarnath-to-bodh-gaya",
    title: "Sarnath to Bodh Gaya: two places, different chapters",
    excerpt: "Plan a Buddhist heritage journey with time for archaeological detail, living religious communities and quiet attention.",
    category: "Buddhist trails",
    image: "/images/bodhgaya-spire.webp",
    imageAlt: "Carved stonework and the rising tower of Mahabodhi Temple in Bodh Gaya",
    destinations: ["Varanasi", "Bodhgaya", "Gaya"],
    relatedJourney: "the-road-to-bodh-gaya",
    sections: [
      {
        heading: "Understand the connection before choosing the route",
        paragraphs: [
          "Bodh Gaya is associated with the Buddha's enlightenment; Sarnath with the first teaching that followed. Visiting them together connects two distinct chapters, though a practical journey may begin at Sarnath because you are arriving in Varanasi. There is no need to follow historical chronology if it creates awkward travel. Choose the direction around your confirmed connections and the time you want at each place. A route with two nights in the Varanasi area and two in Bodh Gaya is one starting suggestion, with additional time for a deeper personal interest.",
        ],
      },
      {
        heading: "Read Sarnath through its surviving details",
        paragraphs: [
          "At Sarnath, the Dhamekh Stupa and the archaeological remains offer a setting for understanding the site's significance. Look closely at the carving and the surviving outlines of religious buildings instead of moving immediately to the next stop. The museum provides another perspective through its sculpture, including the Lion Capital of Ashoka. Check the museum's opening day separately when organising the visit. Someone especially interested in Buddhist art may want more time indoors, while another traveller may prefer a measured walk through the site and a smaller selection of objects.",
        ],
      },
      {
        heading: "Let the transfer remain a travel day",
        paragraphs: [
          "The move from the Varanasi area to Bodh Gaya belongs clearly on the itinerary, with time for departure, breaks and settling into the next base. Avoid making a promised temple programme depend on an optimistic arrival. Agree the journey using your actual starting address and transport choice, then keep the first Bodh Gaya outing optional. A meal and a rest may be the right beginning. Having a full day available afterwards makes it easier to arrive without feeling that every delay is taking away the experience you travelled for.",
        ],
      },
      {
        heading: "Give Mahabodhi more than a first view",
        paragraphs: [
          "The UNESCO-listed Mahabodhi Temple complex includes the principal temple, the sacred Bodhi Tree and smaller monuments associated with the place of enlightenment. Allow time to move through the permitted areas and then remain still for a while. It is an active place of worship, with visitors arriving for different religious purposes. Follow posted directions, keep voices low and give prayer its space. Check the current rules for belongings and photography before leaving your accommodation, so organising a phone or camera does not become the main concern at the entrance.",
        ],
      },
      {
        heading: "Choose a small number of monasteries",
        paragraphs: [
          "Bodh Gaya's monasteries reflect Buddhist communities from different countries and traditions. Selecting a few gives you time to notice the architecture and understand the setting of each. The Thai Monastery is one possible addition; the Great Buddha statue offers another distinct stop. Confirm visitor access rather than treating every religious building as continuously open for sightseeing. If attending a teaching or ceremony matters, make it a separate planning request tied to a verified programme. A monastery visit and participation in a religious event involve different expectations and arrangements.",
        ],
      },
      {
        heading: "Keep Gaya's pilgrimage purpose distinct",
        paragraphs: [
          "Nearby Gaya is associated with Vishnupad Temple, the Phalgu River and Hindu ancestral rites. It is a separate choice within this journey, with its own religious context. Include it when it matters to the travellers and give any requested rite the time and arrangements it requires. Avoid treating it as a compulsory addition simply because the name resembles Bodh Gaya. Before finalising the route, discuss walking, steps, dietary needs and the balance between study, worship and rest. Those preferences will shape a more meaningful visit than the number of religious sites listed.",
        ],
      },
    ],
    takeaways: [
      "Connect the two sites through their history, then choose a practical travel direction.",
      "Check museum access and monastery programmes separately.",
      "Include Gaya's Hindu pilgrimage sites only as a deliberate additional choice.",
    ],
  },
  {
    slug: "agra-and-vrindavan",
    title: "Agra and Vrindavan, with time for both",
    excerpt: "Pair the Taj Mahal and Agra Fort with the temple lanes of Braj, using a route that respects their different rhythms.",
    category: "Culture & heritage",
    image: "/images/agra-doorway.webp",
    imageAlt: "The Taj Mahal framed by an arched doorway in Agra",
    destinations: ["Agra", "Vrindavan"],
    relatedJourney: "taj-mahal-and-the-lanes-of-braj",
    sections: [
      {
        heading: "Put the Taj's visiting day on the calendar first",
        paragraphs: [
          "The Taj Mahal is closed to general sightseeing on Fridays. Mark that before choosing your arrival, hotel nights or onward connection. A two-night Agra stay can provide one useful monument day, but it still needs to fall on an open date. If Friday is your only full day, work out whether arrival or departure leaves a genuine visiting window; otherwise change the stay. An early visit is appealing for the light and the shape it gives the day, while weather and visibility remain part of the experience.",
        ],
      },
      {
        heading: "See Agra Fort as a separate experience",
        paragraphs: [
          "The Taj and Agra Fort reward different kinds of attention. At the Taj, take time with the garden approach, marble surfaces and the river setting. At the fort, the courtyards, halls and changing materials help explain the scale of Mughal court life. Put a meal or rest between the two, especially when the weather is hot. Check current admission and belongings rules before setting out. A full day with two substantial visits can be complete in itself, without adding another distant excursion to make the itinerary appear busier.",
        ],
      },
      {
        heading: "Choose an extra Agra visit by your interest",
        paragraphs: [
          "If you have more time, Itimad-ud-Daulah's tomb is a rewarding choice for marble work and carved screens. Mehtab Bagh offers a garden view towards the Taj from across the Yamuna. Select the addition that interests you and include the journey across the river when planning it. A photograph in a particular light should remain a possibility rather than the sole purpose of the outing. For a short stay, leaving one place for a future visit can keep the main monument day comfortable and give the architecture room to register.",
        ],
      },
      {
        heading: "Change pace when you reach Vrindavan",
        paragraphs: [
          "After the Agra stay, give the move into Vrindavan space for travel, check-in and a meal before visiting a temple. Banke Bihari is devoted to Krishna, while Prem Mandir presents another setting within the town's devotional landscape. Choose a first outing around the current visiting arrangements and your energy after the transfer. Ask where the vehicle can stop and how the final approach works. The practical difference between reaching a town and reaching a temple entrance is especially important when carrying bags or travelling with someone who walks slowly.",
        ],
      },
      {
        heading: "Protect the morning that matters for darshan",
        paragraphs: [
          "If Banke Bihari is the main purpose of your Vrindavan visit, give it a clear window before arranging a tight departure. Confirm current access and allow for queues and movement through the lanes. Agree where your group will meet afterwards. Keep the rest of that morning modest, with time to eat and collect luggage. Travellers with a particular interest in Mathura or other places in Braj should discuss an additional stay, rather than assuming several temple visits can be fitted into the hours before a train.",
        ],
      },
      {
        heading: "Name the endpoint before booking transport",
        paragraphs: [
          "A four-day outline might use two nights in Agra and one in Vrindavan, ending in the Braj area. That outline does not automatically contain a long onward transfer to Delhi. Give the planner the exact station or airport from your ticket and check the allowance from the final accommodation. Festival dates may also change access around the temples and should be considered before fixing the route. With the endpoints settled, it becomes easier to decide whether you have time for a last visit or whether a relaxed departure is the better finish.",
        ],
      },
    ],
    takeaways: [
      "Keep the Taj Mahal on an open day and include a break before Agra Fort.",
      "Plan Vrindavan's final approach as well as the intercity transfer.",
      "Confirm the exact departure point before adding another Braj visit.",
    ],
  },
  {
    slug: "a-slower-visit-to-lucknow",
    title: "A slower visit to Lucknow: architecture, craft and a proper meal",
    excerpt: "Build a short Lucknow stay around the Imambaras, the work of local craftspeople and the food traditions of Awadh.",
    category: "Culture & heritage",
    image: "/images/lucknow-imambara.webp",
    imageAlt: "The architecture of the Bara Imambara complex in Lucknow",
    destinations: ["Lucknow"],
    relatedJourney: "a-weekend-in-lucknow",
    sections: [
      {
        heading: "Begin with one part of the old city",
        paragraphs: [
          "Bara Imambara, Rumi Darwaza and Chota Imambara give a first Lucknow visit a useful architectural thread. Plan them as a considered outing with time to notice how the buildings relate to the city around them. Discuss the route and current visitor access before setting out, then leave space for a break. Trying to cover distant parts of Lucknow in the same morning can turn the day into repeated journeys through traffic. An overnight stay gives you more flexibility than treating these monuments as stops between an arrival and a departure.",
        ],
      },
      {
        heading: "Look closely at Bara Imambara",
        paragraphs: [
          "Bara Imambara, also known as the Asafi Imambara, is one of Lucknow's principal historic complexes. Its scale becomes easier to appreciate when you pause in the spaces rather than moving through only for photographs. The Bhul Bhulaiya is part of its appeal, but ask about the current route, guidance and stair demands before deciding whether it suits everyone. A group can enjoy different parts of a complex without following an identical programme. Keep the religious significance of the setting in mind and follow the instructions for each visitor area.",
        ],
      },
      {
        heading: "Let the gateway lead to another perspective",
        paragraphs: [
          "Rumi Darwaza stands between Bara Imambara and Chota Imambara, giving the route a natural connection. Notice the proportions of the arch and its decorative details, then continue only when the group is ready. Chota Imambara introduces a different interior and setting within Lucknow's religious architecture. Confirm which areas are open during your visit, especially when a religious programme is taking place. A guide can help connect the places through the history of Awadh; agree that interest in advance so the visit offers more than a sequence of names and dates.",
        ],
      },
      {
        heading: "Give an Awadhi meal its own place in the day",
        paragraphs: [
          "Lucknow's food traditions deserve a proper pause. Kebabs and biryani are familiar starting points, while the city's vegetarian repertoire includes kachori and other substantial breakfasts. Choose a small number of dishes that suit the people travelling and tell your host or restaurant about dietary restrictions before ordering. The aim is an enjoyable meal at a comfortable point in the day. If exploring food is a main interest, discuss the neighbourhood, walking and meal style beforehand, rather than squeezing several tastings between monument entrances and a departure transfer.",
        ],
      },
      {
        heading: "Make time to understand chikankari",
        paragraphs: [
          "Chikankari is closely associated with Lucknow, and textile browsing can be as interesting as choosing something to take home. Ask how a piece was made, what fabric it uses and how it should be cared for. Look at the reverse as well as the finished surface, compare the workmanship and request clear information about any claim of hand embroidery. Leave enough time to decide without pressure. A market or shop visit is most useful when it follows your interest and budget; there is no need to buy simply because it appears on the route.",
        ],
      },
      {
        heading: "Keep the second day deliberately lighter",
        paragraphs: [
          "For a two-night stay, use one full day for the principal architecture and keep the arrival or departure day for a meal, craft browsing or a shorter outing. Check the actual station or airport and the travel allowance before using the final morning. If Lucknow begins a longer journey towards Agra or Ayodhya, give that move its own place in the schedule. A little unallocated time lets you return to a shop, spend longer over lunch or rest when needed. Those choices often make a short city stay feel personal.",
        ],
      },
    ],
    takeaways: [
      "Group the Imambaras and Rumi Darwaza into a thoughtful architectural outing.",
      "Discuss stair access, dietary preferences and craft interests before the visit.",
      "Leave a meal and a flexible interval outside the monument programme.",
    ],
  },
];
