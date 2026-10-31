# Tourmelloh content brief

Tourmelloh is a **luxury, private travel company based in Varanasi** that designs journeys across India. Every page must read like a premium travel house: assured, specific, sensory and calm. The buyer is affluent (Indian families, NRIs, international travellers) and expects private cars, private guides, the finest hotels and access arranged properly. Nothing budget, nothing "cheap deal", no "packages starting at".

Types live in `content/catalog/types.ts`. Photos are referenced ONLY by keys from `content/catalog/media-plan.ts` (the descriptions say what each photo shows; choose the key whose description matches what the text describes).

## Voice

- British/Indian English spelling (colour, travellers, centre).
- Confident and concrete. Name the actual place, the hour, the texture: "the first boats leave Assi Ghat before six", not "experience the magic".
- Luxury is shown through *how* it is arranged (private boat, a scholar who knows the inscriptions, a table set on the dunes, a late checkout), not adjectives.
- Short paragraphs. Vary sentence length.
- **Banned words and moves:** em dashes (use commas, colons or full stops), "nestled", "tapestry", "embark", "unforgettable", "hidden gem", "breathtaking", "delve", "testament", "bucket list", "magical", "once-in-a-lifetime", "seamless", "curated" (more than once per page), "elevate", "immerse yourself", "a symphony of", "where X meets Y", rhetorical questions as openers, exclamation marks.

## Truth rules (non-negotiable)

- **No prices, discounts or "from ₹"**. Pricing is "on request" and the site says so itself.
- **No invented claims** about Tourmelloh: no years in business, traveller counts, awards, ratings, reviews, testimonials, "No. 1", partnerships, certifications, or guarantees.
- **No guaranteed access.** Temple darshan, helicopter seats, safari zones, boat rides and permits are "arranged where available / subject to the operator, weather and authorities". Official paid services (e.g. Sugam Darshan at Kashi Vishwanath, Char Dham helicopter seats, Ranthambore zone permits) can be named as what Tourmelloh books on the traveller's behalf, subject to availability.
- **Facts must be correct as of 2026.** Check closures (Taj Mahal closed Fridays; Sarnath Museum closed Fridays), seasons (Char Dham portals roughly May to October/November; Ladakh roads and Nubra/Pangong best May to September; Andaman best October to May; tiger reserves in Central India close core zones roughly July to September; Ranthambore core zones close in monsoon), permits (Ladakh inner areas need permits, foreign nationals need Protected Area Permits in places; Andaman: Indian nationals need no permit for the main islands). If unsure of a detail, write around it rather than inventing.
- **Suggested stays** must be real, currently operating luxury hotels, always worded "or similar". Prefer Taj, Oberoi, Leela, ITC, Aman, Six Senses, Suján, independent heritage palaces (BrijRama Palace, Taj Nadesar Palace, Umaid Bhawan, Rambagh Palace, Taj Lake Palace, The Oberoi Amarvilas, Suryagarh, Brunton Boatyard, Glenburn Tea Estate, Ananda in the Himalayas, Taj Exotica Havelock, The Khyber Gulmarg, Chamba Camp Thiksey, etc.). Where the best is mid-range (e.g. Bodh Gaya, Ayodhya, Ujjain), name the best real option and do not call it a palace.
- Do not reuse prose from other travel sites.

## Inclusions (journeys)

Default "included" (adapt per journey; only list what the itinerary actually uses):
- Handpicked luxury stays as listed, with daily breakfast
- Private chauffeur-driven car for all transfers and touring
- Private English-speaking guides at each destination (other languages on request)
- Meet-and-assist at arrival and departure airports or stations
- Monument entrances for the sites named in the itinerary
- The signature experiences named in the journey
- A dedicated Tourmelloh trip contact throughout the journey

Default "excluded": international flights and visas; domestic flights/trains unless listed; travel insurance; meals not mentioned; personal expenses, camera fees and gratuities; anything not in the written proposal.

## Lengths and shape

Follow the comments in `types.ts`. Every journey day has its own photo; **no photo key repeats within one journey** (hero, gallery and days all distinct). Day 1 is arrival; the last day is departure. `days = nights + 1`. SEO title 50–60 characters, description 140–160 characters (count them).

Each journey has 3–4 `signature` moments: private, premium, specific (e.g. "Aarti from your own boat", "Breakfast at Mehtab Bagh facing the Taj", "Sundowners on the Sam dunes"). 2–3 FAQs per journey, 3–4 per destination and city.

## The catalogue (slugs are fixed; use them exactly)

### Collections (`content/catalog/collections.ts`)
`sacred` → `sacred-journeys`; `golden-triangle` → `golden-triangle-and-rajasthan`; `heritage` → `heritage-and-culture`; `coast` → `coast-and-islands`; `himalaya` → `the-himalaya`; `wildlife` → `wildlife-and-wilderness`.

### Journeys

| file | slug | collection | days/nights | route |
|---|---|---|---|---|
| journeys/sacred-a.ts | kashi-before-the-world-wakes | sacred | 4/3 | Varanasi, Sarnath |
| journeys/sacred-a.ts | along-the-sacred-rivers | sacred | 6/5 | Varanasi, Prayagraj, Ayodhya |
| journeys/sacred-a.ts | footsteps-of-the-buddha | sacred | 7/6 | Varanasi, Sarnath, Bodh Gaya, Rajgir, Nalanda, Patna |
| journeys/sacred-a.ts | ayodhya-at-your-own-pace | sacred | 3/2 | Lucknow or Ayodhya airport, Ayodhya |
| journeys/sacred-a.ts | braj-the-land-of-krishna | sacred | 5/4 | Delhi, Mathura, Vrindavan, Barsana, Govardhan |
| journeys/sacred-a.ts | haridwar-and-rishikesh | sacred | 4/3 | Dehradun, Haridwar, Rishikesh |
| journeys/sacred-b.ts | char-dham-by-helicopter | sacred | 6/5 | Dehradun, Yamunotri, Gangotri, Kedarnath, Badrinath |
| journeys/sacred-b.ts | kedarnath-and-badrinath-by-helicopter | sacred | 3/2 | Dehradun, Kedarnath, Badrinath |
| journeys/sacred-b.ts | the-golden-temple-amritsar | sacred | 3/2 | Amritsar |
| journeys/sacred-b.ts | temples-of-tamil-nadu | sacred | 8/7 | Chennai, Mahabalipuram, Thanjavur, Madurai, Rameswaram |
| journeys/sacred-b.ts | mahakal-and-omkareshwar | sacred | 4/3 | Indore, Ujjain, Omkareshwar |
| journeys/sacred-b.ts | tigers-of-central-india | wildlife | 7/6 | Jabalpur, Kanha, Bandhavgarh |
| journeys/sacred-b.ts | ranthambore-tiger-weekend | wildlife | 3/2 | Jaipur or Sawai Madhopur, Ranthambore |
| journeys/rajasthan.ts | the-golden-triangle | golden-triangle | 6/5 | Delhi, Agra, Jaipur |
| journeys/rajasthan.ts | golden-triangle-and-varanasi | golden-triangle | 8/7 | Delhi, Agra, Jaipur, Varanasi |
| journeys/rajasthan.ts | golden-triangle-and-ranthambore | golden-triangle | 8/7 | Delhi, Agra, Ranthambore, Jaipur |
| journeys/rajasthan.ts | royal-rajasthan | golden-triangle | 11/10 | Delhi, Jaipur, Jodhpur, Jaisalmer, Udaipur |
| journeys/rajasthan.ts | udaipur-lakes-and-palaces | golden-triangle | 4/3 | Udaipur |
| journeys/rajasthan.ts | jodhpur-and-the-thar | golden-triangle | 5/4 | Jodhpur, Jaisalmer |
| journeys/heritage.ts | awadh-agra-and-braj | heritage | 7/6 | Lucknow, Agra, Vrindavan |
| journeys/heritage.ts | a-weekend-in-lucknow | heritage | 3/2 | Lucknow |
| journeys/heritage.ts | taj-mahal-and-the-lanes-of-braj | heritage | 4/3 | Delhi, Agra, Mathura, Vrindavan |
| journeys/heritage.ts | khajuraho-and-orchha | heritage | 5/4 | Varanasi, Khajuraho, Orchha, Gwalior |
| journeys/heritage.ts | hampi-and-the-deccan | heritage | 5/4 | Hubballi or Bengaluru, Hampi, Badami |
| journeys/heritage.ts | delhi-old-and-new | heritage | 3/2 | Delhi |
| journeys/coast-himalaya.ts | andaman-island-escape | coast | 6/5 | Port Blair, Havelock (Swaraj Dweep), Neil (Shaheed Dweep) |
| journeys/coast-himalaya.ts | andaman-for-two | coast | 7/6 | Port Blair, Havelock, Neil (honeymoon) |
| journeys/coast-himalaya.ts | kerala-backwaters-and-hills | coast | 8/7 | Kochi, Munnar, Thekkady, Kumarakom, Marari |
| journeys/coast-himalaya.ts | kerala-ayurveda-retreat | coast | 7/6 | Kochi, a Kerala Ayurveda resort |
| journeys/coast-himalaya.ts | goa-beyond-the-beaches | coast | 5/4 | Goa |
| journeys/coast-himalaya.ts | kashmir-gardens-and-meadows | himalaya | 6/5 | Srinagar, Gulmarg, Pahalgam |
| journeys/coast-himalaya.ts | ladakh-the-high-passes | himalaya | 8/7 | Leh, Nubra, Pangong |
| journeys/coast-himalaya.ts | darjeeling-and-sikkim | himalaya | 7/6 | Bagdogra, Darjeeling, Gangtok |
| journeys/coast-himalaya.ts | shimla-and-manali | himalaya | 7/6 | Chandigarh, Shimla, Manali |

Each journey file exports `export const journeys: Journey[] = [...]` (name it as the file says, see stubs).

### Destinations (`content/catalog/destinations.ts`) and their city slugs
- `uttar-pradesh`: varanasi, ayodhya, prayagraj, lucknow, agra, vrindavan
- `bihar`: bodh-gaya
- `rajasthan`: jaipur, udaipur, jodhpur, jaisalmer, ranthambore
- `madhya-pradesh`: khajuraho, ujjain
- `uttarakhand`: haridwar, rishikesh
- `himachal-pradesh`: shimla, manali
- `kashmir`: srinagar
- `ladakh`: leh
- `sikkim-and-darjeeling`: darjeeling, gangtok
- `kerala`: kochi, munnar, alleppey
- `goa`: (no city pages)
- `tamil-nadu`: madurai
- `andaman-islands`: port-blair, havelock

### Cities (`content/catalog/cities-a.ts`, `cities-b.ts`)
- cities-a: varanasi, ayodhya, prayagraj, lucknow, agra, vrindavan (Mathura & Vrindavan), bodh-gaya, delhi (destination null), jaipur, udaipur, jodhpur, jaisalmer, ranthambore, khajuraho, ujjain, amritsar (destination null)
- cities-b: haridwar, rishikesh, shimla, manali, srinagar, leh, darjeeling, gangtok, kochi, munnar, alleppey, madurai, port-blair, havelock (Swaraj Dweep), hampi (destination null)

### Experiences (`content/catalog/experiences.ts`) slug → city
private-sunrise-boat-on-the-ganga → varanasi; ganga-aarti-from-your-own-boat → varanasi; old-kashi-heritage-walk → varanasi; banarasi-silk-with-the-weavers → varanasi; sarnath-with-a-scholar → varanasi; the-taj-mahal-at-sunrise → agra; an-awadhi-food-trail → lucknow; old-delhi-by-food → delhi; balloon-over-the-aravallis → jaipur; block-printing-in-jaipur → jaipur; sunset-on-lake-pichola → udaipur; a-night-on-the-thar → jaisalmer; tiger-safari-in-ranthambore → ranthambore; palki-sahib-at-the-golden-temple → amritsar; yoga-by-the-ganga → rishikesh; a-dawn-shikara-on-dal-lake → srinagar; morning-prayers-at-thiksey → leh; a-private-houseboat-on-the-backwaters → alleppey; ayurveda-in-kerala → kochi; diving-at-havelock → havelock

### Journal (`content/catalog/journal.ts`), 12 articles
Six re-voiced from the old `content/blog.ts` (keep their slugs and facts, lift the voice): first-time-in-varanasi plus the other five slugs in that file. Six new: `when-to-travel-in-india-month-by-month`, `the-golden-triangle-done-properly`, `char-dham-by-helicopter-what-to-know`, `andaman-havelock-or-neil`, `a-first-safari-in-india`, `india-for-families-with-elders`.

### Company pages (`content/catalog/pages.ts`), `PageCopy[]`
`about` (Our story: a Varanasi-based house that designs private journeys across India; no founding year, no founder name, no invented history), `how-we-travel` (the Tourmelloh way: private, unhurried, properly arranged; how a journey is designed from first conversation to return), `faq` (sections = groups: Planning, On the journey, Booking & payment, Practicalities; points not used), `privacy` (what the enquiry form collects: name, email, phone, travel details; used only to answer and plan; not sold; contact for deletion: tourmelloh@gmail.com), `terms` (website terms of use), `booking-terms` (how quotes, confirmation, payment schedules and cancellations work in general terms: specific amounts and deadlines are set in each written proposal because they follow hotel, airline and operator policies).

## Business facts you may use

- Name: Tourmelloh. Based in Varanasi, Uttar Pradesh, India.
- Phone / WhatsApp: +91 77069 97271. Email: tourmelloh@gmail.com. Website: tourmelloh.com.
- Nothing else about the company is established. Do not invent it.

## Definition of done

`npx tsc --noEmit` passes with your file filled in; no `TODO`; no placeholder text; every slug reference exists in the lists above; no photo key repeats inside a journey; word counts respected.
