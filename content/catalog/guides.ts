import type { Guide } from "./types";

/**
 * Destination guides: supporting content, reached from the footer and from contextual links.
 * A guide never implies local delivery capacity. Changing details (airports, temple rules,
 * festival dates) were checked on the review date below and must be checked again before it moves.
 */
export const guides: Guide[] = [
  {
    slug: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    status: "published",
    reviewedOn: "2026-10-31",
    display: ["Kashi,", "where the day starts on the river"],
    hero: "varanasi-ghats-dawn",
    gallery: ["varanasi-ganga-aarti", "varanasi-old-city-lanes", "varanasi-river-mist"],
    intro:
      "Varanasi, also called Kashi and Banaras, faces east across the Ganga along a crescent of more than eighty ghats, from Assi in the south to Raj Ghat in the north. Pilgrims bathe at first light, cremation fires burn at Manikarnika, and the old city behind the steps is a maze of lanes, shrines and silk workshops. Tourmelloh is based in the city.",
    body: [
      "The river explains the city. Before sunrise the ghats fill with bathers, priests laying out brass plates, wrestlers at the akharas and boatmen calling to anyone who wants a ride. Seen from a boat, the riverfront reads like a timeline: palaces built by royal families from across India, small shrines at the water's edge, and the two cremation ghats, Manikarnika and Harishchandra, where families perform last rites in public view. Between July and September the Ganga often rises over the lower steps, and the district administration suspends boat operations until the level falls, as it did several times in the 2026 monsoon.",
      "Behind the ghats, Shri Kashi Vishwanath stands at the heart of the old city, one of the twelve jyotirlingas of Shiva. The Kashi Vishwanath Dham corridor, inaugurated in December 2021, now opens the temple to the river at Lalita Ghat. Phones and electronic devices are not permitted in the temple zone, and queues lengthen sharply on Mondays, through the month of Shravan and at Mahashivratri. Where the temple trust's own paid darshan or aarti bookings are open, a request goes through its official channel, subject to availability, and appears in your quotation as a separate line.",
      "The city's other lives are close at hand. Banarasi brocade is still woven on handlooms in neighbourhoods such as Madanpura and Sarai Mohana, music runs from temple courtyards to festival stages in a city UNESCO lists as a Creative City of Music, and breakfast in the lanes means kachori, jalebi and chai in clay cups. Ramnagar Fort faces the city from the far bank, and Sarnath, where the Buddha gave his first teaching, lies about ten kilometres to the north-east. Since July 2026 Sarnath has been a World Heritage Site in its own right.",
    ],
    essentials: [
      {
        title: "A boat before sunrise",
        text: "The ghats are clearest from the water between first light and about eight. A rowing boat moves slowly enough for a guide to name each ghat; a motorboat covers more of the crescent. Shared or private is stated in your quotation, and every outing depends on the river level and local orders on the day.",
        photo: "varanasi-boat-sunrise",
      },
      {
        title: "The evening Ganga aarti",
        text: "At Dashashwamedh and Assi, priests perform the aarti at dusk with tiered brass lamps, conch and bells. Watching from a boat moored off the ghat avoids the crush on the steps; a viewing or seating arrangement on land is a separate request, confirmed only when available.",
        photo: "varanasi-aarti-lamp",
      },
      {
        title: "Darshan at Kashi Vishwanath",
        text: "Give the temple a morning with nothing pressing afterwards. Leave phones and bags behind, expect security checks and a barefoot walk across stone, and avoid Mondays and festival days if a long wait would be hard for your party.",
        photo: "varanasi-vishwanath",
      },
      {
        title: "Breakfast in the lanes",
        text: "Kachori with spiced potato, hot jalebi and chai in a kulhad, at stalls that open long before the shops do. From December to February, look for malaiyyo, a saffron-flecked milk foam sold only on cold mornings.",
        photo: "varanasi-chai",
      },
      {
        title: "The weavers of Banaras",
        text: "Brocade is still woven on handlooms in the city's weaving neighbourhoods, with zari worked in by eye. A visit should be a conversation with the makers first; buying anything is your choice and never the point of the visit.",
        photo: "varanasi-silk-weaving",
      },
      {
        title: "Dev Deepawali, if your dates allow",
        text: "On Kartik Purnima, fifteen days after Diwali, the ghats are lit end to end with clay lamps. In 2026 it falls on 24 November. Rooms, boats and roads are booked out well ahead, and the riverfront is extremely crowded that evening.",
        photo: "varanasi-dev-deepawali",
      },
    ],
    gateways:
      "Lal Bahadur Shastri International Airport at Babatpur is about 25 km north-west of the city, usually 45 to 75 minutes by car depending on traffic and where you stay. Varanasi Junction, Banaras and Pt. Deen Dayal Upadhyaya Junction handle most long-distance trains. Cars stop well short of the riverfront, so the last stretch to a ghat-side hotel is on foot through the lanes or by boat. Winter fog often delays early flights and overnight trains, so an arrival evening should never carry an important booking.",
    pacing:
      "Three nights suit a first visit: an arrival evening, a full day for the river and the old city, a half day at Sarnath and a final morning without hurry. Two nights cover the essentials at a brisker pace, as First Impressions of Varanasi does. Four allow a music evening, time with the weavers or a crossing to Ramnagar, and suit older travellers who need rest each afternoon. Varanasi at Your Pace spreads temple visits over three nights with rest periods built in. Keep one session a day unplanned; the city repays a second visit to a ghat you liked.",
    physical:
      "Varanasi is a walking city with steps everywhere. The ghats are steep, uneven and often without rails, and the stone near the water is slippery. Boarding a boat usually means stepping from the ghat onto a wooden hull with no jetty. The old-city lanes are narrow and busy with scooters, cattle and processions, and darshan involves queuing barefoot. Travellers with limited mobility can still see a great deal by boat, provided the hotel, drop-off points and rest stops are chosen around them.",
    season:
      "October to March is the comfortable season, with clear autumn mornings and river mist from December to January, when fog can also delay flights and trains. April to June is very hot; plan early starts and long indoor afternoons. From July to September the Ganga rises over the lower ghats and boats are often suspended until the level falls. Shravan Mondays, Mahashivratri, Dev Deepawali and the Diwali weeks bring very large crowds, so fix hotels and transport early if your dates touch any of them.",
    etiquette:
      "Do not photograph cremations at Manikarnika or Harishchandra, and step aside for funeral processions in the lanes. Ask before photographing anyone at prayer; some sadhus pose for photographs and expect a payment, so agree first or not at all. Dress modestly at temples, remove shoes where asked and follow each temple's rules on phones and leather. Accept prasad with the right hand. On the ghats, avoid stepping over offerings or handling ritual items that belong to someone else.",
    faqs: [
      {
        q: "How many days do I need in Varanasi?",
        a: "Three nights is a good first visit: a dawn boat and the old city on one day, Sarnath on another, and time to sit by the river with nothing planned. Two nights work if your schedule is tight; four suit a slower pace or travellers who need more rest.",
      },
      {
        q: "Will the sunrise boat run whatever the weather?",
        a: "No. Boats depend on local orders, the weather and the river level. In the monsoon the administration often suspends all boats for days at a time, and dense winter fog can delay a sailing. When a session cannot run, the plan moves to a walk along the ghats or another slot where one is available.",
      },
      {
        q: "Can phones be taken into Kashi Vishwanath?",
        a: "No. Phones, cameras and other electronic devices are not permitted in the temple zone. It is simplest to leave them in your vehicle or at the hotel. The rules can change, so they are checked again in the week you travel.",
      },
      {
        q: "Is Varanasi manageable for older travellers?",
        a: "With planning, yes. The ghats have steep steps and the lanes are reached on foot, so share mobility needs early. The plan can then rely on a hotel with an easy approach, drop-off points as close as the lanes allow, the river seen by boat, and rest built into every day.",
      },
    ],
    seo: {
      title: "Varanasi Guide: Ghats, Darshan, Seasons, Pacing | Tourmelloh",
      description:
        "Plan Varanasi with care: the ghats by boat, darshan at Kashi Vishwanath, the evening aarti, Sarnath, seasons, steps and local etiquette, reviewed for 2026.",
    },
  },
  {
    slug: "sarnath",
    name: "Sarnath",
    state: "Uttar Pradesh",
    status: "published",
    reviewedOn: "2026-10-31",
    display: ["Sarnath,", "where the first teaching was given"],
    hero: "sarnath-dhamek-stupa",
    gallery: ["sarnath-monks", "varanasi-yoga-ghat", "varanasi-river-mist"],
    intro:
      "Sarnath, about ten kilometres north-east of Varanasi, is where the Buddha gave his first teaching to five companions after his enlightenment at Bodh Gaya. The deer park holds the Dhamek Stupa, the brick foundations of monasteries and the broken Ashokan pillar, and the site museum keeps the Lion Capital adopted as India's national emblem. In July 2026 the site was inscribed on the UNESCO World Heritage List.",
    body: [
      "The archaeological park is the heart of a visit. The Dhamek Stupa, its lower drum faced with carved bands of floral and geometric pattern, rises over the foundations of monasteries that once housed large communities of monks. Nearby are the base of the Dharmarajika Stupa and the stump of the Ashokan pillar. The World Heritage listing of 25 July 2026, India's 45th, covers these remains together with the Chaukhandi Stupa on the road in from Varanasi. A guide who reads ruins well turns the brick outlines back into halls, cells and courtyards.",
      "The Archaeological Museum, run by the Archaeological Survey of India, is closed on Fridays while the park stays open, so the Sarnath day is fixed around that before anything else. Its centrepiece is the Lion Capital of Ashoka, four lions seated back to back in polished sandstone, and its Buddha images from the Gupta period repay slow looking. Beside the park, the Mulagandha Kuti Vihara, a temple built by the Maha Bodhi Society in 1931, has wall paintings of the Buddha's life by the Japanese artist Kosetsu Nosu.",
      "Sarnath is gentle in a way Varanasi is not: flat paths, open lawns and far fewer crowds outside the main Buddhist festivals. Most travellers visit as a half day from Varanasi, often after a dawn on the river, but it suits a slower pace too, with time to sit near the stupa or in a monastery garden. For Buddhist pilgrims it is one chapter of a longer story that continues at Bodh Gaya in Bihar and, within Uttar Pradesh, at Kushinagar and Shravasti.",
    ],
    essentials: [
      {
        title: "The Dhamek Stupa and the deer park",
        text: "Walk the excavated monasteries slowly, then sit for a while near the stupa, where pilgrims circle clockwise and chant. Early morning and late afternoon are cooler and quieter.",
      },
      {
        title: "The Lion Capital in the museum",
        text: "The original Ashokan capital, India's national emblem, is the reason many visitors come. The museum is closed on Fridays, and its rules on photography and bags are checked before the visit.",
      },
      {
        title: "Mulagandha Kuti Vihara",
        text: "A working temple with murals of the Buddha's life painted in the 1930s. Visit quietly with shoes off, and avoid the chanting sessions unless you wish to sit with the community.",
      },
      {
        title: "Chaukhandi Stupa",
        text: "A brick stupa on a mound where tradition says the Buddha met his first five disciples, crowned by an octagonal tower added in 1588 to mark a visit by the Mughal emperor Humayun.",
      },
      {
        title: "A specialist guide",
        text: "A guide trained in Buddhist history reads the inscriptions with you and explains how a monastery worked. Sarnath with a Specialist Guide is one of the experiences you can request, with transport and entry listed separately.",
      },
    ],
    gateways:
      "Sarnath is reached from Varanasi, usually 30 to 45 minutes by car from the ghats depending on traffic. Lal Bahadur Shastri International Airport is about an hour away. Sarnath has a small railway station, but most travellers stay in Varanasi and visit by road. Pilgrims who want early mornings at the stupa sometimes stay in Sarnath itself.",
    pacing:
      "A half day covers the park, the museum and the Mulagandha Kuti Vihara at a comfortable pace. A full day leaves time for the Chaukhandi Stupa, one or two of the national monasteries and a long lunch. Sarnath fits into First Impressions of Varanasi and The Many Moods of Varanasi, and it is one half of Awakening & the First Teaching, the journey that joins it with Bodh Gaya.",
    physical:
      "The site is flat, with gravel and paved paths, but the park and museum together involve two to three kilometres of walking with little shade. Shoes come off at temples and around the stupas, and stone paving can be very hot by midday from April to June. Chaukhandi involves a short climb up the mound. Benches near the main monuments make rests easy to build in.",
    season:
      "October to March is comfortable and brings pilgrim groups from across Asia. April to June is very hot, so visit early in the morning. Monsoon afternoons bring heavy showers but green lawns. Buddha Purnima, the full moon of Vaisakha in April or May, brings ceremonies and larger crowds.",
    etiquette:
      "Walk clockwise around stupas and shrines, keep voices low and do not climb on ruins or sit on stupa foundations. Remove shoes at temples, and avoid pointing your feet towards a Buddha image when seated. Ask before photographing monks. Some monastic communities prefer that women do not hand objects directly to monks, so place an offering down instead.",
    faqs: [
      {
        q: "Is the Sarnath museum open every day?",
        a: "No. The Archaeological Museum is closed on Fridays, while the archaeological park stays open. Visiting hours can change, so they are checked before your day is fixed.",
      },
      {
        q: "How long should we spend in Sarnath?",
        a: "A half day covers the main sites well. Give it a full day if Buddhist history interests you, if you want time to meditate, or if older travellers need a slower pace with a proper lunch break.",
      },
      {
        q: "Can Sarnath be combined with Bodh Gaya?",
        a: "Yes. Awakening & the First Teaching joins Varanasi and Sarnath with Bodh Gaya over a suggested five days. The two places are about 250 km apart by road, so the journey treats the drive as a travel day of its own.",
      },
    ],
    seo: {
      title: "Sarnath Guide: Dhamek Stupa, Museum and Pacing | Tourmelloh",
      description:
        "Plan Sarnath near Varanasi: the Dhamek Stupa, the Lion Capital museum (closed Fridays), the 2026 World Heritage listing, pacing, seasons and etiquette.",
    },
  },
  {
    slug: "prayagraj",
    name: "Prayagraj",
    state: "Uttar Pradesh",
    status: "published",
    reviewedOn: "2026-10-31",
    display: ["Prayagraj,", "where the rivers meet"],
    hero: "prayagraj-sangam-birds",
    gallery: ["prayagraj-sangam-boats", "flower-market", "diwali-lamps"],
    intro:
      "Prayagraj stands at the Triveni Sangam, where the Ganga and the Yamuna meet and where tradition holds that the unseen Saraswati joins them. Every winter the floodplain fills with the camps of the Magh Mela, and every twelve years with the Kumbh Mela, held most recently in early 2025. Away from the river, the city keeps Akbar's fort, Anand Bhawan and the wide avenues of old Allahabad.",
    body: [
      "The heart of a visit is the boat out to the Sangam. From the ghats near the fort, boats head to a point mid-river where the two waters can be seen meeting, the Ganga paler and silty, the Yamuna darker and greener. Pilgrims step onto moored platforms to bathe, and priests perform rites on the boats themselves. From November to February migratory gulls follow the boats and early mornings are often misty. Going out soon after first light means softer light and fewer boats, and every crossing depends on river conditions and the orders of the local administration.",
      "Akbar built the fort above the confluence in 1583, and most of it is still held by the army. The Akshayavat, the undying banyan of pilgrim tradition, and the underground Patalpuri temple are reached through a corridor opened to devotees, with access set by the authorities. Close by, the Bade Hanuman temple is unusual: the image lies reclining, partly below ground level, and in the monsoon the river is said to rise to touch it. Together they make a short morning after the boat.",
      "Inland, the city changes register. Anand Bhawan, the Nehru family home, is a museum of the freedom movement; Khusro Bagh holds Mughal tombs in a walled garden; and All Saints Cathedral is a notable Gothic Revival church designed by William Emerson. Prayagraj sits between Varanasi and Ayodhya on the pilgrim map, which is why it appears in Varanasi and Prayagraj Pilgrimage and in The Sacred Confluence. One night is usually enough to see it without hurrying.",
    ],
    essentials: [
      {
        title: "A boat to the Sangam at first light",
        text: "A boat from the ghats near the fort to the meeting of the waters before the river fills. In winter the gulls wheel over the bow and the mist lifts slowly off the water. Shared or private is stated in your quotation.",
      },
      {
        title: "A prayer or bath at the confluence",
        text: "Many pilgrims bathe from the platforms or perform a short puja with a priest. If a ritual matters to you, mention it when you enquire; its scope, priest and timing are confirmed in writing, and towels and a change of clothes are planned in advance.",
      },
      {
        title: "Akshayavat and Patalpuri",
        text: "Inside the fort, the banyan of pilgrim tradition and the underground temple beside it. Access is controlled by the authorities who hold the fort, so the visit is timed to the current opening arrangements.",
      },
      {
        title: "The reclining Hanuman",
        text: "Bade Hanuman, near the Sangam, where the image lies on its back below ground level. A short, crowded and joyful stop, easily made straight after the boat.",
      },
      {
        title: "Anand Bhawan and Khusro Bagh",
        text: "The Nehru family home, kept as a museum of the freedom movement, and the Mughal tombs of Khusro Bagh in their walled garden. An afternoon for those interested in history beyond the river.",
      },
      {
        title: "The Magh Mela, in season",
        text: "Each winter a tented city rises on the sandbanks, with ascetics, pilgrims and evening discourses. The main bathing days bring enormous crowds and traffic diversions; on other days a guide who knows the camps makes the mela easier to read.",
      },
    ],
    gateways:
      "Prayagraj airport at Bamrauli has domestic flights, and Prayagraj Junction is a major station on the Delhi to Kolkata line. By road, Varanasi is about 120 km away, usually around three hours, and Ayodhya around 170 km, roughly four hours by car. During the Magh Mela and on major bathing days, vehicles are diverted and long stretches are walked, so arrival times need generous margins.",
    pacing:
      "One night is usually enough, placed between Varanasi and Ayodhya so a long drive becomes two shorter days with the Sangam at dawn in between. Two nights suit a slower morning on the river or time for the museums. Varanasi and Prayagraj Pilgrimage confirms the overnight pattern to suit the guests, with a longer assisted version for travellers who need more rest.",
    physical:
      "Reaching a Sangam boat means walking across sand or down a ghat, then stepping into the boat; bathing platforms are moored boats with planks, not fixed jetties. Bathing in the river needs steady footing and care with the current, and the water is cold in winter. On mela days, vehicles stop far from the river and the walk can run to several kilometres. The fort corridor and Bade Hanuman involve standing in queues.",
    season:
      "October to March is the comfortable season, with misty mornings and wintering gulls from December to February. The Magh Mela runs through January and February, sometimes into early March, and in a Kumbh year the whole city is transformed, with hotels and roads planned months ahead. April to June is very hot. In the monsoon the rivers rise, the lower ghats flood and boats may be stopped altogether.",
    etiquette:
      "Bathers at the Sangam are at prayer, so do not photograph them without consent, especially women bathing. Agree the scope of any ritual and the offering with the priest before it begins, not after. Dress modestly, carry clothes to change into after a bath, and leave no plastic or packaging in the river. Ascetics at the mela camps often welcome conversation, but photographs are a matter of permission.",
    faqs: [
      {
        q: "Can we bathe at the Sangam?",
        a: "Yes. Boats take bathers to platforms at the confluence. Bathing is your choice and depends on conditions on the day; in winter the water is cold, and in the monsoon boats may not run at all.",
      },
      {
        q: "Is the Magh Mela worth planning around?",
        a: "If you want to see the great pilgrim camps, yes, but choose your dates carefully. The main bathing days draw vast crowds and road restrictions. For a calmer visit, travel in the mela season but avoid those particular days.",
      },
      {
        q: "Is one night in Prayagraj enough?",
        a: "For most pilgrims, yes. A night breaks the drive between Varanasi and Ayodhya and gives you the Sangam in early light. Add a second if you want the museums or a slower start.",
      },
    ],
    seo: {
      title: "Prayagraj Guide: Sangam, Fort and the Magh Mela | Tourmelloh",
      description:
        "Plan Prayagraj well: a boat to the Triveni Sangam at first light, Akshayavat and the reclining Hanuman, the Magh Mela, gateways, seasons and etiquette.",
    },
  },
  {
    slug: "ayodhya",
    name: "Ayodhya",
    state: "Uttar Pradesh",
    status: "published",
    reviewedOn: "2026-10-31",
    display: ["Ayodhya,", "beside the Sarayu"],
    hero: "ayodhya-ram-mandir",
    gallery: ["ayodhya-ram-ki-paidi", "ayodhya-sarayu-evening", "diwali-lamps"],
    intro:
      "Ayodhya, on the south bank of the Sarayu, is revered as the birthplace of Ram. Since the consecration of Ram Lalla on 22 January 2024, its life has turned around the Shri Ram Janmabhoomi Mandir, whose construction was marked complete when the temple flag was raised on 25 November 2025. The older temple town is still here: Hanuman Garhi on its mound, Kanak Bhawan's courtyard and the ghats of Ram Ki Paidi.",
    body: [
      "The Ram Mandir is built in the Nagara style from pink sandstone, its pillars carved with deities, and the image of Ram Lalla in the sanctum shows Ram as a child. Security is strict. Phones, bags and electronic items are deposited before entry, and the approach involves a long walk and a queue. Darshan follows the temple trust's timings, which change around festivals, and any passes the trust issues are applied for only through its official channels. No one, Tourmelloh included, can promise a particular time at the sanctum.",
      "Hanuman Garhi, a fortress-like temple on a mound, is reached by a steep flight of steps, and many pilgrims visit Hanuman before Ram. Kanak Bhawan, a short walk away, is associated with Ram and Sita and has a calm inner courtyard. Nageshwarnath, near Ram Ki Paidi, is a Shiva temple that local tradition links to Ram's son Kush. Older travellers can manage all three with a car to the nearest permitted point and pauses built in, though the stairs at Hanuman Garhi need an honest conversation first.",
      "Evenings belong to the river. Ram Ki Paidi is a run of ghats along a channel of the Sarayu, and families come down at dusk with leaf boats of flowers and lamps for the Sarayu aarti. On the eve of Diwali, Deepotsav lines the riverfront with clay lamps; in 2025 more than 26 lakh were lit across 56 ghats, a Guinness World Record. Ram Navami in spring brings very large crowds too. Both are extraordinary to see, and both need rooms, cars and movement planned months ahead.",
    ],
    essentials: [
      {
        title: "Darshan at Ram Mandir",
        text: "Give the temple a clear morning with no onward drive pressing. Expect security checks, a long walk along the approach and a brief, intense moment before the image. Travel light and agree a meeting point for afterwards.",
      },
      {
        title: "The climb to Hanuman Garhi",
        text: "A steep stair to the shrine many pilgrims visit before Ram Mandir, where the image shows the young Hanuman with his mother Anjani. Take it slowly, and decide beforehand who climbs and who waits in the shade.",
      },
      {
        title: "Kanak Bhawan's courtyard",
        text: "A temple to Ram and Sita that tradition connects with Sita's arrival in Ayodhya. Sit in the courtyard for a few minutes before darshan; it is one of the calmest spaces in the town.",
      },
      {
        title: "Ram Ki Paidi on foot",
        text: "Stepped ghats and temple facades along a channel of the Sarayu, easiest to enjoy in the late afternoon when the light softens and families come down to the water.",
      },
      {
        title: "The Sarayu aarti",
        text: "Lamps raised over the river at dusk, leaf boats of marigolds set on the current and bells across the water. Check the timing for your particular evening, and ask about boats only where local rules allow them.",
      },
      {
        title: "Deepotsav, if your dates allow",
        text: "On the eve of Diwali the riverfront is lined with lakhs of clay lamps. It is one of the busiest nights of the town's year, with closures and traffic controls, so plan it months ahead or choose another week.",
      },
    ],
    gateways:
      "Maharishi Valmiki International Airport, opened in December 2023, is a short drive from the temple and has direct domestic flights; routes change by season, so they are checked when planning. Ayodhya Dham Junction and Ayodhya Cantt have trains from Delhi, Lucknow and Varanasi. Lucknow's airport, about 135 km away, is often a useful alternative. By road, Varanasi is a little over 200 km, usually four to five hours, and Prayagraj around 170 km.",
    pacing:
      "One night covers darshan and an evening on the Sarayu. Two let you see the older temples without hurrying and keep the Ram Mandir visit clear of arrival and departure days, which is how Varanasi and Ayodhya Pilgrimage is shaped. With elderly parents, a slower second day with rest after lunch is worth more than an extra temple.",
    physical:
      "The Ram Mandir approach involves a long walk on paved ground, security queues and periods of standing; elderly or less mobile visitors should ask about the trust's current assistance arrangements before the day. Hanuman Garhi has a steep flight of steps. The ghats at Ram Ki Paidi become slippery near the water, and summer heat on stone is intense. Drop-off points near the temples are controlled, so some walking cannot be avoided.",
    season:
      "October to March is comfortable, though winter mornings can be foggy and cold. April to June is very hot, so plan darshan early in any month. Ram Navami in spring and Deepotsav on the eve of Diwali bring the largest crowds of the year, with traffic controls and few free rooms. The month of Shravan and Vivah Panchami, the festival of Ram and Sita's wedding in November or December, also draw many pilgrims.",
    etiquette:
      "Follow the security instructions patiently; they apply to everyone. Dress modestly, keep leather items out of the temples, and accept prasad with the right hand. Do not attempt photography where it is prohibited. At Hanuman Garhi and on the ghats, keep food out of sight of the monkeys, and give way to elderly pilgrims on the steps.",
    faqs: [
      {
        q: "Can special darshan be arranged at Ram Mandir?",
        a: "Special entry cannot be promised. Access is controlled by the temple trust; where it issues passes, they are applied for through its official channel, and the day is planned around what is actually confirmed.",
      },
      {
        q: "Can phones be taken into Ram Mandir?",
        a: "Expect to deposit phones, bags and electronics before the security line. The rules are set by the trust and can change, so they are checked again in the week you travel.",
      },
      {
        q: "Is Ayodhya manageable for elderly parents?",
        a: "Yes, with care. The approach to Ram Mandir involves a long walk and Hanuman Garhi has a steep stair. Drop-off points, rests and a slower order of visits are planned around the people travelling.",
      },
      {
        q: "Can Ayodhya be combined with Varanasi and Prayagraj?",
        a: "Yes. The Sacred Confluence joins all three over a suggested six days. The order depends on gateways and train or flight timings, and nights are allocated so that no darshan sits against a long drive.",
      },
    ],
    seo: {
      title: "Ayodhya Guide: Ram Mandir, Ghats and Pacing | Tourmelloh",
      description:
        "Plan Ayodhya with care: darshan at Ram Mandir, Hanuman Garhi's steps, Kanak Bhawan, evenings on the Sarayu, Deepotsav, gateways and etiquette for 2026.",
    },
  },
  {
    slug: "gaya",
    name: "Gaya",
    state: "Bihar",
    status: "published",
    reviewedOn: "2026-10-31",
    display: ["Gaya,", "where families remember"],
    hero: "gaya-vishnupad",
    gallery: ["gaya-falgu", "flower-market", "diwali-lamps"],
    intro:
      "Gaya, renamed Gaya Ji by the Bihar government in May 2025, is a Hindu pilgrimage city on the banks of the Falgu. Families come here to perform pind daan and other rites for departed ancestors, centred on the Vishnupad Temple. It is a different place, with a different purpose, from Bodh Gaya, the Buddhist town around the Mahabodhi Temple about fifteen kilometres to the south.",
    body: [
      "The Vishnupad Temple stands over a footprint in rock that tradition identifies as Vishnu's, beside the Falgu river. The present shrine dates from the late eighteenth century and is credited to Ahilyabai Holkar of Indore. Around it, altars known as vedis run along the riverbank and the surrounding hills, including the Akshayavat and Pretshila, and families perform rites at one or several of them depending on custom and the time available. Entry to the Vishnupad sanctum is restricted to Hindus, a rule displayed at the gate.",
      "Rites in Gaya are usually led by Gayawal priests, many of whose families keep genealogical records of the pilgrims they have served across generations. The busiest time is Pitru Paksha, the fortnight of ancestors in September or October, when the state holds the Pitru Paksha Mela and the city fills with pilgrims. Outside the monsoon the Falgu is often a broad sandy bed; the Gayaji rubber dam, opened in 2022 near the Vishnupad ghats, was built to hold water for bathing and rites, though levels still vary.",
      "Because Gaya and Bodh Gaya are so close, they are often confused, and some journeys combine them. A Hindu rites journey does not automatically include a Buddhist programme, and a Buddhist pilgrimage does not include rites in Gaya, unless either is expressly added. If you plan both, each is given its own time: rites in Gaya often take most of a morning or longer, and the Mahabodhi deserves an unhurried visit of its own.",
    ],
    essentials: [
      {
        title: "Vishnupad Temple",
        text: "The temple of Vishnu's footprint, rebuilt in the eighteenth century, at the centre of Gaya's pilgrimage. Non-Hindus may not enter; the surrounding lanes and ghats still give a strong sense of the city's devotion.",
      },
      {
        title: "Pind daan, scoped in advance",
        text: "The offering of rice balls for departed ancestors varies by family custom, from a single altar to several days. Share the rite, your tradition and the number taking part when you enquire; priest, materials, timing and charges are then confirmed in writing.",
      },
      {
        title: "The Falgu riverbank",
        text: "Many rites begin with a bath or an offering at the Falgu. Outside the monsoon the river is often sand with channels of water, and the ghats near Vishnupad are crowded through the morning.",
      },
      {
        title: "Akshayavat and the vedis",
        text: "The undying banyan of Gaya is one of the altars where final offerings are often made. Other vedis lie across the city and its hills; which ones you visit depends on custom and time.",
      },
      {
        title: "Pretshila, for those who climb",
        text: "A hill north-west of the city, associated with rites for departed souls, with a temple at the top of several hundred steps. Many families treat it as optional, and the climb is demanding in heat.",
      },
      {
        title: "Mangla Gauri",
        text: "A hilltop temple to the goddess, counted among the Shakti Peethas and reached by a flight of steps. A short visit many pilgrims add once their rites are complete.",
      },
    ],
    gateways:
      "Gaya's airport lies between Gaya and Bodh Gaya, with domestic flights and seasonal international flights during the winter pilgrim season. Gaya Junction is on the Grand Chord rail line, with trains from Delhi, Kolkata and Varanasi; from Pt. Deen Dayal Upadhyaya Junction near Varanasi, the faster trains take around three hours to Gaya. By road, Varanasi is about 250 km, usually five to seven hours, and Bodh Gaya about half an hour.",
    pacing:
      "The rites set the pace. A single-altar pind daan can be completed in a morning, while some families follow a fuller sequence over one to three days or longer, so the length of stay is decided only once the rite is scoped. Allow rest afterwards; it is emotionally heavy work. Journeys built around ancestral rites are planned individually, so describe what your family needs through Help Me Plan rather than choosing a fixed itinerary.",
    physical:
      "Rites involve sitting cross-legged on the ground for long periods, bathing or sprinkling water at the riverbank, and walking barefoot through crowded temple lanes. Vehicles stop short of the Vishnupad area. Some vedis lie on hills: Pretshila and Ramshila involve long flights of steps. During Pitru Paksha the crowds are very dense and waits are long, so travellers with limited mobility should discuss seating and support beforehand.",
    season:
      "October to March is the comfortable season for most people. Pitru Paksha, in September or October, is the busiest period and the traditional time for rites; in 2026 it ran from late September to around 10 October. April to June is extremely hot, which makes long rites on open ground difficult. Rites are performed throughout the year, so families who prefer calmer days can choose other dates after consulting their priest.",
    etiquette:
      "Ancestral rites are private and often grief-filled, so photograph only with your family's consent and never another family's ritual. Agree the scope of the rite and the priest's dakshina before beginning, in writing where possible. Wear simple, modest clothes, often white or light colours, carry a change for after bathing, and respect the restriction on non-Hindus entering the Vishnupad sanctum.",
    faqs: [
      {
        q: "Are Gaya and Bodh Gaya the same place?",
        a: "No. Gaya, now officially Gaya Ji, is a Hindu pilgrimage city known for the Vishnupad Temple and ancestral rites. Bodh Gaya, about fifteen kilometres to the south, is the Buddhist town around the Mahabodhi Temple, where the Buddha attained enlightenment.",
      },
      {
        q: "Can we visit Bodh Gaya on the same trip?",
        a: "Yes, if you add it expressly. A rites journey does not include a Buddhist programme by default. If both matter, each gets its own time, usually a morning for the rites and a separate, unhurried visit to the Mahabodhi.",
      },
      {
        q: "How long does pind daan take?",
        a: "It depends on the family's custom. A single offering can take a few hours; some traditions involve several altars over one or more days. The scope is agreed with the priest before the length of the journey is set.",
      },
      {
        q: "Can non-Hindus visit the Vishnupad Temple?",
        a: "Entry to the temple is restricted to Hindus, and the rule is enforced. Non-Hindu travellers can walk the surrounding lanes and the riverbank respectfully.",
      },
    ],
    seo: {
      title: "Gaya Guide: Vishnupad, Pind Daan and Pitru Paksha | Tourmelloh",
      description:
        "Plan a visit to Gaya, now Gaya Ji: the Vishnupad Temple, pind daan and Pitru Paksha, how it differs from Bodh Gaya, gateways, seasons and etiquette.",
    },
  },
  {
    slug: "bodh-gaya",
    name: "Bodh Gaya",
    state: "Bihar",
    status: "published",
    reviewedOn: "2026-10-31",
    display: ["Bodh Gaya,", "where the Buddha awakened"],
    hero: "bodhgaya-mahabodhi",
    gallery: ["bodhgaya-monks", "bodhgaya-prayer-flags", "nalanda-ruins"],
    intro:
      "Bodh Gaya, in Bihar, is where Siddhartha Gautama sat beneath a pipal tree and attained enlightenment. The Mahabodhi Temple, a UNESCO World Heritage Site since 2002, rises over the spot, and a descendant of the original Bodhi Tree spreads behind it. Monasteries built by Buddhist communities from Thailand, Japan, Bhutan, Tibet and elsewhere make the small town a meeting place for the Buddhist world.",
    body: [
      "The temple's brick tower, about 50 metres high, dates in its present form to the fifth or sixth century and has been restored many times. Behind it, the Vajrasana, the diamond throne, marks where the Buddha sat. Around the complex are the places associated with the seven weeks after his enlightenment, including the lotus pond and the jewelled walk. Pilgrims circle, prostrate and chant from before dawn; the quietest hours are early morning and late evening, and the complex remains an active place of worship throughout the day.",
      "Beyond the temple, the town is a gathering of national architectures. The Thai monastery has a gilded, sweeping roof; the Bhutanese monastery is painted inside; the Japanese temples are spare and calm; the Tibetan monasteries ring with chanting. The Great Buddha Statue, about 25 metres high and consecrated by the Dalai Lama in 1989, sits among gardens. Across the Niranjana river, the stupa at Bakraur marks the village of Sujata, who is said to have offered the Buddha rice and milk before his enlightenment.",
      "Bodh Gaya is not Gaya. Gaya, about fifteen kilometres to the north, is a Hindu pilgrimage city known for the Vishnupad Temple and ancestral rites; the two share an airport and a railway junction but little else. A Buddhist journey here does not include rites in Gaya unless you add them, and the reverse is equally true. For Buddhist pilgrims, Bodh Gaya pairs naturally with Sarnath near Varanasi, where the first teaching was given, and with Rajgir and Nalanda for those continuing further.",
    ],
    essentials: [
      {
        title: "The Mahabodhi at dawn",
        text: "The complex as it opens, with monks and pilgrims circling the tower in the half-light. Dress modestly, remove shoes at the entrance and walk clockwise.",
      },
      {
        title: "Time beneath the Bodhi Tree",
        text: "Sit near the Vajrasana among monks from many countries, with a guide who knows when to step back. Meditation in the grounds is welcome, provided it does not block the walking circuits.",
      },
      {
        title: "The national monasteries",
        text: "Thai, Bhutanese, Japanese and Tibetan temples, each in its own style. Choose two or three rather than all of them, and respect each community's visiting times.",
      },
      {
        title: "Sujata and the Dungeshwari caves",
        text: "The stupa across the river at Bakraur, then the hill caves where tradition says the Buddha practised austerities before coming to Bodh Gaya. The caves involve a steep climb.",
      },
      {
        title: "Rajgir and Nalanda",
        text: "The excavated ruins of the ancient monastic university at Nalanda, also a World Heritage Site, and the Vishwa Shanti Stupa on the ridge at Rajgir. A long but rewarding day by car.",
        photo: "rajgir-peace-pagoda",
      },
      {
        title: "Gaya, only if it matters to you",
        text: "The Vishnupad Temple and the ancestral rites of Gaya belong to a different tradition. Add them deliberately, with their own time and a confirmed priest, rather than as a stop on the way to the airport.",
        photo: "gaya-vishnupad",
      },
    ],
    gateways:
      "Gaya's airport is a short drive from Bodh Gaya, with domestic flights and seasonal international flights in winter, including routes to Bangkok and Paro. Gaya Junction, about 16 km away, has trains from across India. By road, Varanasi is around 250 km, usually five to seven hours depending on traffic and stops, and Patna roughly three hours away.",
    pacing:
      "Two nights give one full day for the temple and monasteries and time simply to sit, which is how Awakening & the First Teaching approaches Bodh Gaya alongside Sarnath. Three nights allow a day out to Rajgir and Nalanda, or quieter mornings at the temple. Treat the road from Varanasi as a travel day; a temple visit should never hang on an optimistic arrival time.",
    physical:
      "The town is flat and compact. Inside the Mahabodhi complex you walk barefoot on stone, cold on winter mornings and hot by midday in summer; socks are usually acceptable. Steps lead down from the entrance to the temple level. The Dungeshwari caves involve a steep climb, and Rajgir's ridge is reached by a ropeway or a long walk.",
    season:
      "October to March is the main season, when days are mild and monastic communities gather for winter prayer festivals, usually in December and January; dates change each year. Buddha Purnima, in April or May, brings ceremonies and crowds. April to June is very hot. The monsoon months are humid but green, and many monasteries are quieter.",
    etiquette:
      "Walk clockwise around the temple and stupas, keep voices low and give way to those prostrating or chanting. Phones are not allowed inside the Mahabodhi complex and are left at a counter at the entrance, and cameras may need a separate ticket; the rules are set by the temple management committee, so they are confirmed before your visit. Do not pose with your back to Buddha images, and never sit on or climb shrines.",
    faqs: [
      {
        q: "Can non-Buddhists visit the Mahabodhi Temple?",
        a: "Yes, everyone is welcome. Dress modestly, remove shoes, keep voices low and walk clockwise. Rules on phones and cameras are set by the temple management, so they are confirmed in the week you travel.",
      },
      {
        q: "Are Bodh Gaya and Gaya the same place?",
        a: "No. Bodh Gaya is the Buddhist town around the Mahabodhi Temple. Gaya, about fifteen kilometres to the north and now officially named Gaya Ji, is a Hindu pilgrimage city known for the Vishnupad Temple and ancestral rites.",
      },
      {
        q: "Can Lumbini be added to a Bodh Gaya journey?",
        a: "Lumbini, the Buddha's birthplace, is in Nepal and needs separate border, documentation and transport planning. It is handled as a separate extension enquiry, never as part of an Uttar Pradesh or Bihar journey by default.",
      },
      {
        q: "When are the winter prayer gatherings?",
        a: "Usually in December and January, when several monastic traditions hold large prayer festivals. Dates move each year and rooms fill early, so they are confirmed before your dates are fixed.",
      },
    ],
    seo: {
      title: "Bodh Gaya Guide: Mahabodhi, Monasteries, Pacing | Tourmelloh",
      description:
        "Plan Bodh Gaya: the Mahabodhi Temple and Bodhi Tree, the monasteries, Rajgir and Nalanda, how it differs from Gaya, gateways, seasons and etiquette.",
    },
  },
  {
    slug: "kushinagar",
    name: "Kushinagar",
    state: "Uttar Pradesh",
    status: "draft",
    reviewedOn: "2026-10-31",
    display: ["Kushinagar,", "the place of the final passing"],
    hero: "kushinagar-mahaparinirvana",
    gallery: ["shravasti-jetavana", "sarnath-monks", "sarnath-dhamek-stupa"],
    intro:
      "Kushinagar, in eastern Uttar Pradesh, is where the Buddha passed into mahaparinirvana, his final passing, at the age of eighty. A reclining Buddha in red sandstone lies in the Mahaparinirvana Temple, and the great brick mound of the Ramabhar Stupa marks the place of his cremation. Quiet for most of the year, it is the closing chapter of many Buddhist journeys within the state.",
    body: [
      "The Mahaparinirvana Temple, rebuilt in its present form in 1956, houses a reclining image of the Buddha about 6.1 metres long, carved from a single block of sandstone around the fifth century and unearthed during excavations in the 1870s. Behind it stands the Nirvana Stupa. Pilgrims drape the image in saffron cloth and sit in silence along its length, and the temple is at its most moving early in the morning, before the day's groups arrive.",
      "About 1.5 km to the east, the Ramabhar Stupa, a tall brick mound in a quiet garden, marks the cremation site. The Mathakuar shrine holds a seated Buddha where tradition places his final sermon, and monasteries built by Buddhist communities from Myanmar, Thailand, Japan, Sri Lanka and elsewhere line the roads. Within Uttar Pradesh, Kushinagar pairs with Sarnath and Shravasti, as in Sarnath Kushinagar and Shravasti Pilgrimage. Lumbini, across the border in Nepal, remains a separate extension enquiry.",
    ],
    essentials: [
      {
        title: "The reclining Buddha at dawn",
        text: "The Mahaparinirvana Temple as it opens, with monks offering saffron cloth and the room almost silent. Sit along the length of the image for as long as you wish.",
      },
      {
        title: "Ramabhar Stupa",
        text: "The great brick mound of the cremation site, set in a garden that is calm at any hour. Walk around it clockwise and do not climb the mound.",
      },
      {
        title: "Mathakuar shrine",
        text: "A small shrine with a seated Buddha, traditionally linked with the final sermon. A short, quiet stop between the temple and the stupa.",
      },
      {
        title: "The international monasteries",
        text: "Temples built by Buddhist communities from several countries, each in its own style. Choose one or two and visit within their own visiting times.",
      },
      {
        title: "A day kept quiet",
        text: "Kushinagar is small and slow. Leave time to sit in the temple garden or at the stupa rather than filling the day with sights.",
      },
    ],
    gateways:
      "Gorakhpur is the practical gateway: its airport and railway junction are about 50 km away, usually a little over an hour by road. Kushinagar International Airport opened in 2021, but scheduled flights have been sparse and no regular service was running at the time of review, so it is checked when planning. By road, Varanasi is around 250 to 270 km, a long day's drive.",
    pacing:
      "One night is enough for the temple, the stupa and Mathakuar; two allow a quiet morning and the monasteries. The drive from Varanasi or Sarnath is long, so Kushinagar works as part of a wider route with Shravasti rather than as a short trip of its own.",
    physical:
      "The sites are flat and close together, with paved paths and gardens. Shoes come off inside the temple and at shrines. The main demand is the long road journey, which needs rest stops for older guests.",
    season:
      "October to March is comfortable. Buddha Purnima, in April or May, brings ceremonies and visiting monastic groups. April to June is very hot, and the monsoon brings humidity and heavy rain. Winter fog in December and January can slow the roads early in the day.",
    etiquette:
      "Keep silence near the reclining Buddha, walk clockwise around the stupas and do not climb the Ramabhar mound. Ask before photographing monks or ceremonies, and remove shoes where asked. Place offerings of cloth or flowers respectfully, never throw them.",
    faqs: [
      {
        q: "How far is Kushinagar from Varanasi?",
        a: "Around 250 to 270 km by road, a long day's drive. Most journeys break it with stops or combine Kushinagar with Gorakhpur and Shravasti.",
      },
      {
        q: "Can Lumbini be visited from Kushinagar?",
        a: "Lumbini is in Nepal, across the border from eastern Uttar Pradesh, and needs separate border, documentation and transport planning. It is a separate extension enquiry, not part of an Uttar Pradesh journey.",
      },
      {
        q: "Is one night enough?",
        a: "For most travellers, yes. The main sites are close together and can be seen in a day. A second night suits those who want quiet time or a gentler pace.",
      },
    ],
    seo: {
      title: "Kushinagar Guide: Mahaparinirvana and Stupas | Tourmelloh",
      description:
        "Plan Kushinagar, where the Buddha passed away: the reclining Buddha, Ramabhar Stupa, Mathakuar, Gorakhpur as the gateway, seasons and etiquette.",
    },
  },
  {
    slug: "chitrakoot",
    name: "Chitrakoot",
    state: "Uttar Pradesh and Madhya Pradesh",
    status: "draft",
    reviewedOn: "2026-10-31",
    display: ["Chitrakoot,", "on the banks of the Mandakini"],
    hero: "chitrakoot-ramghat",
    gallery: ["village-life", "diwali-lamps", "flower-market"],
    intro:
      "Chitrakoot, on the border of Uttar Pradesh and Madhya Pradesh, is where tradition says Ram, Sita and Lakshman spent much of their exile in the forest. Its life gathers around Ramghat on the Mandakini river and the forested hill of Kamadgiri, which pilgrims circle on foot. It is a slower, more rural pilgrimage than Varanasi or Ayodhya, set among the low hills of Bundelkhand.",
    body: [
      "Ramghat is the town's riverfront, a run of steps and small temples where pilgrims bathe and the evening aarti is held on the Mandakini. Kamadgiri, the sacred hill, is circled on a parikrama path of about five kilometres lined with shrines, including the Bharat Milap temple, where tradition says Bharat met Ram to ask him to return to Ayodhya. Many pilgrims walk the circuit barefoot. On new-moon days and at Diwali, when lamps are offered on the river, the crowds become enormous.",
      "Further out lie the places of the forest story. Hanuman Dhara is a hilltop shrine where a spring falls over an image of Hanuman, reached by a long flight of steps or by ropeway. Sati Anusuya's ashram stands by the river in the forest to the south, and the Gupt Godavari caves involve walking through water inside the hill. Sphatik Shila, a rock on the riverbank, is linked in tradition with Ram and Sita. Because the town straddles two states, different sites fall under different administrations.",
    ],
    essentials: [
      {
        title: "Ramghat in the evening",
        text: "Steps, small temples and lamps on the Mandakini at dusk. Sit for the aarti, or take a short boat out where boats are running.",
      },
      {
        title: "The Kamadgiri parikrama",
        text: "A circuit of about five kilometres around the sacred hill, past shrines and the Bharat Milap temple. Walk it early, barefoot or not, and keep the hill on your right.",
      },
      {
        title: "Hanuman Dhara",
        text: "A spring falling over an image of Hanuman high on the hillside. Several hundred steps lead up, and a ropeway offers an easier way when it is running.",
      },
      {
        title: "Gupt Godavari caves",
        text: "Caves where you walk through shallow water and stoop under low rock to reach the inner shrines. Memorable, but not for anyone uneasy in tight spaces.",
      },
      {
        title: "Sati Anusuya",
        text: "An ashram by the river in forest to the south, associated with the sage Atri and his wife Anusuya. A calm half-day drive with the countryside around it.",
      },
    ],
    gateways:
      "Prayagraj is the usual gateway, around 110 to 125 km by road, about three hours, with its airport and major railway junction. Chitrakoot Dham (Karwi) railway station has direct trains from several cities. Scheduled flights at Chitrakoot's own airport were suspended in December 2024, and new routes announced in 2026 were not confirmed at the time of review, so they are checked when planning.",
    pacing:
      "Two nights allow Ramghat, the Kamadgiri parikrama and the outlying sites without hurry. A single night suits a shorter visit centred on Ramghat and Kamadgiri. Chitrakoot sits naturally after Prayagraj, and extended routes joining Varanasi, Prayagraj and Chitrakoot are being validated before they are offered.",
    physical:
      "The Kamadgiri parikrama is about five kilometres on a paved path, often walked barefoot, and takes two to four hours with stops. Hanuman Dhara involves a steep climb of several hundred steps unless the ropeway is running. Gupt Godavari involves wading through shallow water and stooping under low rock. Ramghat's steps are uneven and slippery near the river.",
    season:
      "October to March is comfortable for the parikrama and the outlying sites. April to June is very hot, which makes barefoot walking on stone hard. The monsoon raises the Mandakini and can affect the caves and the riverbank. Amavasya, the new moon, draws very large crowds each month, as does Diwali.",
    etiquette:
      "If you walk the parikrama, keep the hill on your right and give way to pilgrims prostrating along the route. Dress modestly for temples and bathing. Keep food out of sight at Hanuman Dhara, where monkeys are bold. Agree any priest's role and offering before a ritual begins.",
    faqs: [
      {
        q: "Is Chitrakoot in Uttar Pradesh or Madhya Pradesh?",
        a: "Both. The pilgrimage area straddles the border, and its sites fall on either side. For travellers this matters little, but it means different authorities manage different places.",
      },
      {
        q: "How hard is the Kamadgiri parikrama?",
        a: "It is about five kilometres on a paved, mostly level path. Most people take two to four hours with stops at the shrines. Walking barefoot is a tradition, not a rule; footwear or socks are entirely acceptable.",
      },
      {
        q: "Can Chitrakoot be combined with Prayagraj?",
        a: "Yes, it is the natural pairing, about three hours apart by road. Routes joining Varanasi, Prayagraj and Chitrakoot are being validated before they are offered.",
      },
    ],
    seo: {
      title: "Chitrakoot Guide: Ramghat, Kamadgiri and Pacing | Tourmelloh",
      description:
        "Plan Chitrakoot: Ramghat on the Mandakini, the Kamadgiri parikrama, Hanuman Dhara, Gupt Godavari, Prayagraj as the gateway, seasons and etiquette.",
    },
  },
];
