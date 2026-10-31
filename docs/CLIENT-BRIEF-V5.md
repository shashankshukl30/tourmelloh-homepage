# Tourmelloh developer brief v5 (client, 31 Oct 2026)

Text extracted from Tourmelloh_Developer_Brief.docx. The .docx is the source of truth.

# Tourmelloh website developer brief
Version 5 — Final brief with homepage reviews and testimonials

Prepared for the Tourmelloh founder and website developer.


## 1 What to build
Build an enquiry-led travel website with four primary commercial sections: Journeys, Services, Experiences, and Destination Weddings. Guests choose a suggested journey, select Standard, Premium or Luxury, personalise it, and submit their selections for a complete quotation. There is no automatic journey price, estimated trip total, token payment or checkout at the enquiry stage.

Journey durations below are proposed planning targets, not validated operating schedules. Do not publish unconfirmed routes, supplier availability, prices, departure dates or claims. Create those records in the CMS as drafts and publish when Tourmelloh approves the actual operating details. Functional decisions below are the recommended launch specification; operational approval items are listed in section 17.


## 2 Navigation and page structure
Exactly four primary commercial navigation items. Use Journeys consistently in public copy, CMS labels and data definitions. Use /journeys for the catalogue and all its child routes, as specified below. Keep one canonical catalogue and one detail page per itinerary:


| Navigation item | URL | Contents |
|---|---|---|
| Journeys | /journeys | Journey catalogue with Standard, Premium and Luxury selectors and collection filters |
| Services | /services | Practical support, transport, assistance and arrangements |
| Experiences | /experiences | Walks, river activities, food, crafts, culture and sacred experiences |
| Destination Weddings | /wedding-in-varanasi | Separate wedding presentation and enquiry flow |

Home is accessible through the logo. About, Contact, policies and travel-partner enquiries are utility/footer links; they are not additional primary commercial categories. Keep a visible WhatsApp/contact action and a My Journey wishlist control. Use the supplied approved logo asset; do not recreate the logo or copy an old descriptor from an image. Any company descriptor must be owner-approved separately.

Supporting routes:


| Route | Purpose |
|---|---|
| /journeys/standard | Filtered catalogue, Standard selected |
| /journeys/premium | Filtered catalogue, Premium selected |
| /journeys/luxury | Filtered catalogue, Luxury selected |
| /journeys/[slug] | One canonical detail page per core itinerary; tier changes inside this page |
| /journeys/womens-journeys | Hosted women-only group departures and enquiry |
| /journeys/shravan | Parents and senior traveller collection |
| /journeys/family-journeys | Family and three-generation collection |
| /journeys/wellness-in-varanasi | Stillness by the Ganges — specialist wellness collection |
| /experiences/varanasi-beyond-the-familiar | Dedicated lesser-visited temples experience page |
| /experiences/walks | Walks index within Experiences |
| /experiences/[slug] | Individual experience |
| /services/[slug] | Individual service |
| /your-journey | Editable selection summary and quotation request |
| /help-me-plan | Assisted enquiry for guests who do not know their route or duration |

Standard, Premium and Luxury are comfort/service tiers. Hindu pilgrimage, Buddhist pilgrimage, heritage, SHRAVAN and family are journey types or collections, not extra comfort tiers. A collection links to existing itinerary records; it must not create duplicate product and inventory records.


## 3 Complete core journey catalogue
Journey titles below are approved display names. Keep the descriptive route visible alongside the name and duration. The Sacred Confluence is a thematic name, not a claim that all three destinations share a geographical confluence. The P14 display name does not prescribe travel order; its operating route remains subject to gateway and itinerary approval.

All journeys use the shared tier selector and journey-wishlist system. Grouping below is a website filter, not another top-level menu. All durations are suggested starting versions and must remain editable. Do not calculate travel days from a simple count of selected cities.


| ID | Journey title | Route or purpose | Proposed duration | Initial setup |
|---|---|---|---|---|
| P01 | First Impressions of Varanasi — Varanasi & Sarnath | Varanasi with Sarnath | 2N/3D | Priority launch candidate |
| P02 | Varanasi at Your Pace — An Unhurried Pilgrimage | Varanasi temple visits with rest periods | 3N/4D | Priority launch candidate |
| P03 | The Many Moods of Varanasi — Heritage, Food & the Ganges | Varanasi culture, food, river and Sarnath | 3N/4D | Priority launch candidate |
| P04 | Varanasi and Prayagraj Pilgrimage | Varanasi and Prayagraj; overnight pattern confirmed to suit guest | 3N/4D; longer assisted version available | Priority launch candidate |
| P05 | Varanasi and Ayodhya Pilgrimage | Varanasi and Ayodhya | 4N/5D | Priority launch candidate |
| P06 | The Sacred Confluence — Varanasi, Prayagraj & Ayodhya | Varanasi, Prayagraj and Ayodhya | 5N/6D | Priority launch candidate |
| P07 | Varanasi Prayagraj and Chitrakoot | Varanasi, Prayagraj and Chitrakoot | 5N/6D | Route validation before publication |
| P08 | Varanasi Prayagraj Chitrakoot and Ayodhya | Extended four-destination pilgrimage | 7N/8D | Route validation before publication |
| P09 | A Journey of Remembrance — Varanasi & Gaya | Varanasi and Gaya; individually scoped ancestral rites | 4N/5D | Specialist confirmation before publication |
| P10 | Varanasi Prayagraj and Gaya Pilgrimage | Varanasi, Prayagraj and Gaya; order determined by travel connections | 5N/6D target | Covers earlier Varanasi–Gaya–Prayagraj note; do not duplicate it as another product |
| P11 | Sarnath and Kushinagar Buddhist Journey | UP-only Buddhist journey | 3N/4D | Route and gateway validation |
| P12 | Sarnath Kushinagar and Shravasti Pilgrimage | UP-only Buddhist journey | 5N/6D | Priority launch candidate after supplier validation |
| P13 | Extended Uttar Pradesh Buddhist Pilgrimage | Sarnath, Kushinagar, Shravasti, Sankisa and any additional specifically approved sites | 7N/8D to 8N/9D | Publish only after exact route and sites are approved |
| P14 | Awakening & the First Teaching — Bodh Gaya & Sarnath | Varanasi/Sarnath and Bodh Gaya | 4N/5D | Priority launch candidate |
| P15 | Sarnath Bodh Gaya Rajgir and Nalanda | UP–Bihar Buddhist and cultural circuit | 6N/7D | Validate route and supplier network |
| P16 | Buddhist Pilgrimage across Uttar Pradesh and Bihar | Sarnath, Bodh Gaya, Rajgir, Nalanda, Kushinagar and Shravasti | 9N/10D to 10N/11D | Extended journey; route approval required |
| P17 | Naimisharanya Pilgrimage | Standalone destination journey or tailored regional extension | Duration to be approved | New item from meeting notes; draft only |
| P18 | Ayodhya Pilgrimage | Standalone Ayodhya stay with suitable arrival/departure | Duration to be approved | Separate from two-city P05; draft until itinerary supplied |
| P19 | Chitrakoot Pilgrimage | Standalone Chitrakoot visit with suitable gateway | Duration to be approved | Separate from P07/P08; draft until itinerary supplied |
| P20 | Varanasi Prayagraj Chitrakoot and Gaya | Extended pilgrimage from the founder's notes | 7N/8D target, subject to route review | Draft; do not promise the original duration before validation |

The earlier 4N/5D note for P10 is a shorter variant to review, not the default or a second website journey. Buddhist Circuit 5N/6D maps to P12 once the founder approves that exact route; Full Buddhist Circuit 9N/10D maps to P16 with its final route explicitly named. Do not publish generic Buddhist Circuit names without destinations.

Gaya and Bodh Gaya must be distinct destination records. A Hindu rites journey does not automatically include a Buddhist programme, and vice versa. Any combined visit is expressly added. Lumbini is a separate Nepal extension enquiry, not part of an UP-only journey.

Supporting destination content may be linked from journey pages. Do not add a fifth top-level Destinations section for launch.


## 4 Specialist collections and departures

### Her Own Way by Tourmelloh
Public subtitle: Women-only journeys with a female accompanying host.

The women's page is a live informational and enquiry page, not an inactive placeholder and not a checkout page. Explain the female-founder perspective, female accompanying host, pacing, accommodation and support arrangements. Do not promise an entirely female supplier team unless each role is confirmed.


| ID | Departure template | Parent itinerary |
|---|---|---|
| W01 | Her Own Way — Varanasi Escape | P01, with the approved hosted programme |
| W02 | Her Own Way — The Sacred Confluence | P06 |
| W03 | Her Own Way — Bodh Gaya & Sarnath | P14 initially; another route only through a separately approved departure |

Display fixed, founder-approved start and end dates prominently on every published women’s group departure card and detail page. These are scheduled group departures, not a flexible date picker. Store approval status, approver and approval timestamp. A date may be approved while the departure is still subject to minimum group size; show both facts separately. No actual approved date values were supplied for W01–W03: keep their date records unpublished until supplied, and retain future-date interest capture separately. Never invent dates or label provisional dates approved.

Each dated departure has: title, exact date range, duration, route, offered tier(s), room-sharing/single-room policy, maximum capacity, minimum confirmed travellers, interest count internally, confirmation deadline, status, inclusion list and female-host scope. If tiers require different arrangements, define how the group programme remains shared. Do not assume a confirmed group in one tier fulfils a separate group's minimum.

Public states: Dates coming soon; Open for enquiries; Minimum group pending; Departure confirmed; Full; Closed; Cancelled. An enquiry is not a confirmed participant and must not count toward quorum. Do not display unsupported live seat counters. Capacity and minimum are founder-entered fields, not developer-invented numbers.

CTA: Enquire About This Departure. Suggested condition: Departure is subject to the stated minimum group size. Registration of interest does not confirm a booking. Tourmelloh will confirm the departure and complete price before requesting booking payment.

No date approved: show Register Interest in Future Dates. Approved date: show the date and departure-specific enquiry form. Record date flexibility, travellers, preferred tier, room preference and willingness to travel on alternatives. Do not silently substitute a private tour when quorum is not met; offer it separately with a new quotation if the guest wishes.


### SHRAVAN by Tourmelloh
Public subtitle: Thoughtfully accompanied journeys for parents and senior travellers.

Collection positioning: thoughtfully managed journeys for parents, including bookings arranged by overseas or busy adult children. Named accompaniment, suitable pacing and assessed assistance are essential at every tier.


| ID | Named offer | Parent itinerary |
|---|---|---|
| SH01 | SHRAVAN Varanasi | P02 |
| SH02 | SHRAVAN Varanasi and Ayodhya | P05 |
| SH03 | SHRAVAN Sacred Confluence | P06 |
| SH04 | SHRAVAN Varanasi and Gaya | P09 |

A SHRAVAN selection adds the required accompanying-support bundle and triggers a staff review of pacing, mobility, meal routines and assistance scope. Longer duration may be needed. Do not sell an ordinary driver-only itinerary as SHRAVAN Standard. Distinguish the booking contact from the travelling parent. Obtain the traveller's permission for family updates and image/location sharing. No automatic medical or nursing promises.


### Together by Tourmelloh
Public subtitle: Journeys for families and generations.


| ID | Named offer | Parent itinerary |
|---|---|---|
| F01 | Together — Varanasi | P01 adapted for the party |
| F02 | Together — The Sacred Confluence | P06 adapted for the party |

Capture children's ages, rooms, meal preferences, nap/rest needs and assistance preferences. Roots and Homecoming Journeys and Accessible and Assisted Travel remain custom enquiry interests for launch, not additional promised fixed programmes.


### In the Footsteps of the Buddha
Use In the Footsteps of the Buddha as the Buddhist collection name, with the specific destinations and duration immediately visible on each journey card and page. Link to P11–P16; preserve the UP-only versus UP–Bihar distinction. This is a collection of existing itineraries, not a new journey or comfort tier. Collection URL: /journeys/buddhist-journeys.


### Stillness by the Ganges — Wellness in Varanasi
Create a separate specialist collection page at /journeys/wellness-in-varanasi, linked from the Journeys specialist-collections menu. Public subtitle: Rest, mindful movement and personal wellbeing by the Ganges.

Present two accommodation preferences: a wellness retreat stay, or a Ganga-side ashram stay. These are alternatives, not a promise that every property offers both. Offer arranged visits or consultations with an Ayurvedacharya and guided sessions with a Yogacharya, subject to named practitioner and property confirmation. Show an indicative programme of arrival and rest, an agreed practitioner session, suitable yoga/breathwork, time by the river and optional gentle cultural visits. Duration and daily intensity are personalised; no fixed duration is approved yet.

Use one wellness programme record WL01 with Standard/Premium/Luxury preferences and explicit property-specific inclusions. Do not assign hotel star ratings to an ashram or imply every accommodation type supports every tier. State meals, room facilities, privacy, river access, walking/steps, yoga format, consultation duration/language and any separately charged treatment or medicines. No cure, detoxification or treatment-outcome claims. Clinical care requires a separately agreed qualified-provider scope; the general website enquiry is not a medical assessment.

CTA: Plan My Wellness Journey. Capture dates, available days, retreat/ashram preference, travellers, gentle activity preferences and accessibility needs. Avoid medical histories in the public form. Publish only after properties, practitioners, credentials, availability and the actual programme are approved.


## 5 Tier definitions

| Component | Standard | Premium | Luxury |
|---|---|---|---|
| Hotels | Selected 3-star hotels | Selected 4-star hotels | Selected 4/5-star, heritage or boutique properties; actual category and room disclosed |
| Vehicle | Private air-conditioned sedan or suitable equivalent; never describe publicly as basic | Upgraded MPV/SUV, such as Innova Crysta or equivalent | Specifically confirmed premium vehicle; Fortuner, Mercedes or suitable alternative selected to suit party and route |
| Breakfast | Included for hotel nights unless explicitly stated otherwise | Included | Included; other meals expressly listed |
| Boat | Specified included ride on routes offering a boat experience; shared/private clearly stated | Specified private upgrade on applicable routes | Highest suitable journey-mapped option, not every boat type |
| Darshan | Planned visits and clearly stated arrangements on applicable Hindu itineraries | Specified accompanied assistance | Dedicated coordination and accompaniment within stated scope |
| Assistance | Named remote coordinator; sightseeing guide excluded unless listed | Defined hosted assistance and selected guided visits | Dedicated travel concierge, personal host/escort scope and agreed support hours |
| Experiences | Base itinerary inclusions; extra selections available | Base plus specified Premium inclusions; extra selections available | All journey-mapped applicable Luxury experiences automatically selected |
| Photography | Optional unless stated | Optional unless stated | Defined professional session on applicable journey; session length and deliverables stated |
| Security | On request | On request | Included when requested, applicable and expressly accepted in the final Luxury quotation |

Do not promise 5-star hotels, Mercedes availability or a particular room category across every destination. All three tiers can be selected as enquiry preferences; unsupported combinations are flagged for staff confirmation and described accurately in the quotation. Do not silently downgrade.

Specialist collections override ordinary tier defaults where necessary: female host for the hosted women's programme; accompanying support for SHRAVAN; core cultural interpretation for cultural journeys. These are not removable extras where they define the product.


## 6 Service catalogue
Arrival Welcome & Assistance covers airport or railway station meet and greet. Your Travel Host means an accompanying person for the specified visits or journey days; it is distinct from remote coordination. Senior Travel Companion retains the defined non-medical assistance scope.

These are CMS service records, not claims of currently secured providers. Every record has an owner-approved scope, locations, unit, availability status and inclusion/exclusion rules. Booking preferences never imply supplier confirmation.


| ID | Service | Configuration required |
|---|---|---|
| S01 | Airport and railway station transfers | Pickup/drop point, time, flight/train details if known, passenger/luggage count |
| S02 | Private chauffeured transport | Local/intercity route, hours, days, vehicle capacity, luggage and included distance; female driver preference recorded if requested, subject to confirmation |
| S03 | Premium and luxury vehicle upgrade | Replacement vehicle group; model request including Mercedes/Fortuner; actual vehicle confirmed in quote |
| S04 | Arrival Welcome & Assistance | Meeting location and assistance scope; do not imply restricted-area/conveyor-belt access without confirmed service |
| S05 | Luggage and porter assistance | Where, when, volume and provider availability |
| S06 | Upgrade Your Boat Ride / Boat Booking | Clearly selectable boat categories; replace the included ride for the same session, with any price difference quoted; see boat replacement rule |
| S07 | Aarti viewing and seating arrangements | Location, date, seating/viewing type, accompaniment and confirmation status |
| S08 | Darshan and temple visit assistance | Temple, timing request, accompanying role and any legitimate booking separately specified |
| S09 | Dedicated Travel Concierge | Days, locations, accompanying vs remote role, hours and support coverage |
| S10 | Your Travel Host | Exact sessions/days, language and role; distinct from guide/security |
| S11 | Female accompanying host | Exact coverage and language; mandatory in women's hosted departure manifest |
| S12 | Private sightseeing or specialist guide | Destination, subject, language and session length |
| S13 | Language Assistance & Interpreters | Requested language, session/day and locations; supplier confirmation required |
| S14 | Nanny or childcare arrangements | Child age, number of children, hours, location, supervision arrangement and confirmed provider |
| S15 | Baby and family comfort arrangements | Requested equipment and arrangements; cot/child-seat availability must be confirmed |
| S16 | Senior Travel Companion | Mobility/pacing assessment and defined non-medical scope; mandatory SHRAVAN mapping |
| S17 | Wheelchair and mobility assistance | Equipment vs assistant separately identified; route access assessment; no blanket accessibility claim |
| S18 | Specialist care support on request | Separately assessed qualified provider where needed; ordinary host is not nursing/personal care |
| S19 | Priest and ritual coordination | Specific ritual, location, priest, materials, charges and guest requirements |
| S20 | Rudrabhishek arrangements | Venue, approved timing, participants, priest/materials and documented permission where needed |
| S21 | Ganga puja arrangements | Location, duration, participants, priest/materials and approved scope |
| S22 | Pind Daan and ancestral rites arrangements | Gaya/Kashi or specifically requested site, ritual scope, priest charges/materials and timing |
| S23 | Security assistance | Requested purpose, locations, hours, personnel and confirmed professional provider; no queue-clearing/access privilege promise |
| S24 | Professional photography | Session length, location, edited-image count, delivery time and usage consent |
| S25 | Videography | Hours, locations, deliverables, editing and delivery timeline |
| S26 | Birthday anniversary and occasion arrangements | Occasion, venue, agreed budget and exact deliverables |
| S27 | Dining reservations and dietary coordination | Reservation vs included food clearly separated; dietary requirements relayed to provider |
| S28 | Hotel stay extension or room upgrade | Number of nights, city, room allocation/category and meals; always reviewed and quoted |
| S29 | Flight and train booking assistance | Requested journey and passenger information collected securely only when needed; separate fare/terms; never promise tickets before confirmation |
| S30 | Travel insurance enquiry assistance | Optional request only; publish only once an appropriate partner and actual service scope are confirmed |
| S31 | Welcome amenities and celebration gifts | Journey-mapped hamper/refreshments/gift preferences, allergies and defined contents |
| S32 | Astrologer Consultation | Named BHU alumnus and gold-medallist astrologer proposed by founder; verify institution, qualification, medal and biography before publishing those claims. Session duration, language, online/in-person format, location and fee scope; no guaranteed outcomes or university endorsement implied |
| S33 | Helicopter Transfers | Chopper and helicopter refer to the same service, not separate records. Enquiry-only route/date/passenger request, baggage and assistance needs; subject to operator, aircraft, landing permissions, weather and availability confirmation; no instant booking or guaranteed transfer |
| S34 | Your Journey in Film — Cinematic Reel | Dedicated short-form cinematic reel service: filming duration, locations, number/length of reels, vertical/horizontal format, edits, music rights, revisions, delivery timeline and consent. Drone footage excluded unless separately approved and permitted |

Photography & Films is a service browsing category linking to S24 Photography, S25 Videography and S34 Cinematic Reel. S25 covers broader video coverage; S34 is a defined short-form deliverable. Reconcile shared filming hours and any reel already included in S25 before quoting. Keep these as separately selectable records with their individual scopes and pricing modes; do not create a duplicate chargeable bundle.

Private taxi, premium cars and VIP cars are display/search synonyms for S02/S03, not duplicate chargeable records. Old-age friendly and elderly-friendly both map to SHRAVAN/S16 rather than two identical services. Concierge and host may be one confirmed professional with multiple functions; do not double charge for the same coverage.


## 7 Experience catalogue
The following display names and subtitles are approved for Tourmelloh. For entries with an explanatory subtitle after the dash, store the name and subtitle separately in the CMS and display both on cards and detail pages. They require guide-designed routes and operating confirmation. Names must match the delivered programme: Threads of Banaras requires an actual hosted maker interaction; music experiences require confirmed live performers. They are not permission to reproduce another operator's text or programme. Suggested pricing units are field defaults, not published prices.


| ID | Experience | Scope to design | Unit |
|---|---|---|---|
| E01 | Before the City Stirs — A morning walk through Varanasi | Early neighbourhood walk with selected breakfast tastings | Person, with private-group minimum if applicable |
| E02 | Along the Ghats | Guided riverfront life and architecture walk | Private group/session |
| E03 | Lanes Markets and Makers | Guided old-city trade, markets and craft neighbourhoods | Private group/session |
| E04 | Sacred Kashi Walk | Selected lanes, shrines and religious context; darshan boundaries explained | Private group/session |
| E05 | Kabir in the Lanes — A guided exploration of Kabir’s words and legacy | Approved Kabir-linked programme and weaving context; locations substantiated | Private group/session |
| E06 | Between the Lines of Banaras — A literary walk through the city | Verified literary associations, storytelling and relevant visits | Private group/session |
| E07 | Faiths of Kashi | Respectful multi-tradition interpretation with approved access and guide | Private group/session |
| E08 | A Banarasi Morning — Breakfast favourites, local stories and neighbourhood lanes | Food-led breakfast programme; distinct from E01; mutually exclusive if overlapping | Person |
| E09 | Banaras After Sunset — An evening food trail | Guided evening street-food programme with defined tastings | Person |
| E10 | Banarasi Sweets Tasting | Defined selection, host, portions and dietary information | Person |
| E11 | Paan & Conversation — Discover the preparation and traditions of Banarasi paan | Tobacco-free tasting/interpretation with ingredients disclosed | Person |
| E12 | The River Wakes — A guided sunrise boat experience | Boat, guide, timing, capacity and boarding point expressly stated | Boat/session or person for shared variant |
| E13 | Evening on the Ganges | Defined river programme and optional Aarti viewing arrangement | Boat/session or person for shared variant |
| E14 | Sur on the Ganges — A private boat experience with live music | Private musical boat programme with performer and duration confirmed | Private session |
| E15 | Breakfast on the River | Boat plus food service with actual operating and food arrangements confirmed | Private session with participant count |
| E16 | Private River Cruise | Specifically identified vessel/category, duration and inclusions | Vessel/session |
| E17 | Varanasi Through Your Lens — A guided photography experience | Photographer-led route on foot or by boat; equipment/boat inclusions stated | Private session |
| E18 | Your Occasion, on the Ganges — A personalised celebration on the river | Agreed birthday/anniversary river programme | Private event/session |
| E19 | Threads of Banaras — Meet the makers behind Banarasi weaving | Prearranged artisan/loom visit with host and retail expectations disclosed | Private group/session |
| E20 | Hands on Artisan Session | Confirmed craft activity with materials and host | Person or private group |
| E21 | Banarasi Textiles and Draping | Demonstration; purchases/rentals separate unless specified | Private session |
| E22 | An Evening in Raag — An intimate live music experience | Hosted music session with confirmed performer and venue | Private session |
| E23 | Village Life around Varanasi | Hosted community visit with agreed access and responsible programme | Private group/day |
| E24 | Sarnath with a Specialist Guide | Guided visit; transport and entry inclusions separately identified | Private group/session |
| E25 | Vindhyachal Sacred Excursion | Approved regional excursion and temple programme | Private group/day |
| E26 | Sitamarhi Sacred Excursion | Exact destination and route approved before publication | Private group/day |
| E27 | Kashi Temple Circuit | Approved temple list and realistic duration | Private group/session or day |
| E28 | Rudrabhishek Experience | Defined ritual programme; references S20 for delivery | Group/ritual |
| E29 | Ganga Puja Experience | Defined hosted ritual programme; references S21 | Group/ritual |
| E30 | Chunar Heritage Excursion | Approved heritage route and entry/access arrangements | Private group/day |
| E31 | Seasonal Waterfall and Countryside Excursion | Exact location, access, season and physical demands confirmed | Private group/day |
| E32 | Varanasi Discovery Day | Bundled introduction combining specifically mapped experiences | Private group/day |
| E33 | Sacred Moments — Private Rudrabhishek & Aarti | Requested venue: Dakshineshwar Vishvanath Temple. Confirm exact official temple name, address, authorised arrangements and private scope before publication; define priest, materials, timing, participants and whether aarti is performed for the party or attended | Private group/ritual |
| E34 | Varanasi Beyond the Familiar — Lesser-Visited Temples | Dedicated experience page with an approved temple trail, guide, transport options, duration, access conditions and walking demands. Less-visited does not guarantee empty or exclusive access | Private group/session or day |

E01–E07 are Walks, shown under Experiences, not in a fifth primary category. E17 is a photography-led experience; S24 is a photographer added to another activity. E12 is a boat-plus-programme product; S06 handles boat selection/upgrade. E28/E29 and S20/S21 are linked representations of the same underlying ritual booking; do not charge both. E18 and S26 may overlap and must be reconciled. E33 links S20 and any relevant S07 delivery; reconcile it with E28 so the same ritual is never charged twice. E34 is the separate temple-trail page, with original descriptions, approved stops, map/start-end information, suitability, seasonal/access notes and Add to My Journey; it is distinct from E27’s general temple circuit.

The earlier Commerce Culture and Conquerors and Flames and Freedom text must not be reused by changing only the title. Markets/crafts can be redeveloped through E03. An independence-history walk remains a draft concept until a guide supplies a verified original route. The earlier 12 Jyotirlingas wording is not publishable as-is: if a local shrine circuit is intended, approve the exact sites and unambiguous wording first; this is not an India-wide twelve-Jyotirlinga journey.

No activity is mandatory merely because a guest selected Luxury: optional preferences such as food, photography, music and rituals can be declined. Collection-defining support remains mandatory unless the guest changes the collection.


## 8 Journey pages and content requirements
Each canonical journey page must show:

1. Name, destinations, proposed duration, overnight locations, who it suits and travel style.

2. Suggested arrival/departure gateways and a warning where flight/train timings affect the programme.

3. Day-by-day itinerary, including travel/rest blocks, not an unstructured attraction list.

4. Standard/Premium/Luxury comparison and selected tier's actual inclusion list.

5. Included/excluded meals, admission, guide, boats, darshan assistance and transport scope.

6. Walking/steps, early starts, boarding conditions, mobility and seasonal considerations.

7. Personalise This Journey and Help Me Choose buttons.

8. Related applicable experiences and services, with include/add/replace states.

9. Cancellation and availability explanation and the quotation-only price statement.

Do not publish guaranteed darshan, unrestricted VIP access, guaranteed river operation, all-inclusive care, guaranteed flight/train availability or fully accessible claims without an accurately defined and confirmed scope. A driver is not automatically a sightseeing guide.

All journeys use on-request quotations. No dummy rupee prices, ₹0 journeys, unsupported from prices, automatic estimated journey totals or compulsory token payments.


## 9 Personalisation and journey wishlist

### Main path
Choose journey → select tier → enter travel dates and party → review programme → add services/experiences or choose replacements → review My Journey → submit Request My Personalised Quote → staff confirms scope and availability → guest receives complete quotation → guest accepts → booking advance requested under quoted terms.

Capture an approximate date/month if exact dates are unknown. The quote remains subject to dates being finalised. Guest login is not required.


### Alternative entry points
- Services/Experiences first: guest can save items before choosing a journey. My Journey then asks whether to attach them to a journey or request arrangements without a journey. Staff quotes the latter; no standalone checkout is required at launch.
- Help Me Plan: collect destinations/interests, available days or Recommend duration, party, pace, comfort, gateways and contact. Staff designs the route. No automatic multi-city itinerary engine is required.
- Collection entry: apply the collection's essential support and link to its parent itinerary.
- Wedding: separate form; no travel-wishlist product or automatic journey-tier checkout.

### Wishlist contents
The public basket label is My Journey. Use Add to My Journey on service and experience cards and Request My Personalised Quote for final submission. Retain /your-journey as the internal route specified above; it does not change the public label. Keep Plan Your Journey as the separate planning action.

Store one proposed journey per active wishlist: parent journey or custom enquiry, tier, collection, dates/flexibility, party and rooms, arrival/departure preferences, selected services/experiences, quantities, requested upgrades, opt-outs, special notes and confirmation flags. Replacing the parent journey requires confirmation and an eligibility review. One trip can span multiple destinations; it is not several unrelated journey checkouts.

Cards show descriptive status: Included; Add to My Journey; Selected; Upgrade Requested; Available on Request; Needs Review; Unavailable. Show day/session duration and location. A basket may contain requested items requiring review but must never label them confirmed.


### Fixed extra prices without a journey total
Each service/experience can have one of two enquiry-stage price modes:

- Fixed published price: exact currency, tax treatment, unit, minimum, quantity basis, validity and scope entered and approved. Only display when these are known. If they vary by date, party or location, use quotation mode instead.
- Quote required: display Quoted for your journey. Never display zero as a substitute.
Selected fixed extras may show their own amounts and a clearly labelled Known extras subtotal. Base journey, replacement differences and any unpriced items must be shown as Awaiting quotation. Never present that subtotal as the trip total or use it to take payment. Included Luxury items do not accumulate paid-extra prices.

The review screen must say: This is a request for a personalised quotation, not a confirmed booking. No payment is required to submit your preferences.


### Boat replacement rule
Display current inclusion first, then compatible alternatives with boat type, duration, capacity and conditions. Alternatives are mutually exclusive where they replace the same session. Choosing private boat removes/replaces the shared ride for that session; staff calculates any difference in the final quote. Do not display an invented upgrade delta. A separate additional boat experience can be requested and labelled Additional session.

Show an explicit Upgrade Your Boat Ride action in Services, journey personalisation and My Journey. CMS category candidates: shared scheduled ride, private traditional rowing boat, private motorboat, and premium covered/seated boat or licensed cruise option where actually available. Publish only confirmed inventory with photographs, seating/capacity, boarding suitability, operator and session details. Do not treat cruise tickets as private charters. Musical programmes and guiding are separate linked experience inclusions, not boat categories. Show Current inclusion, Selected replacement and Price difference to be confirmed; if no boat is included, label the choice Add a Boat Ride.

Vehicle, room and meal-plan replacements follow the same rule. Booking capacity is assessed across adults, children, luggage and assistance needs; do not assume one sedan fits every party.


## 10 Luxury auto inclusion and changes of tier
Luxury means the full relevant offering defined for the chosen Luxury journey. It does not mean every service in the global catalogue, every boat type or unlimited staff hours.

Required CMS mechanism: for each journey and tier, store an inclusion manifest with item IDs, destination, session/day, quantity, duration, delivery scope, mandatory/optional status and replacement group. The founder/operations team approves these manifests. No published journey can have a blank tier manifest.

On choosing Luxury:

1. Automatically populate all mapped applicable inclusions and show Included.

2. Display a full visible inclusion list, including photography scope, concierge coverage and boat choice.

3. Ask preferences where appropriate: vehicle option, dietary choices, photography consent and optional ritual participation.

4. Conditional services such as security stay Included if requested and confirmed in your quotation, not automatically deployed.

5. Guests may decline optional items; do not imply a fixed refund or credit for removing them before a quote exists.

6. Additions that exceed the approved programme remain requests for itinerary/duration review; do not silently squeeze them in or promise a two-day itinerary contains every activity.

When upgrading tier, preserve explicitly requested preferences, absorb matching paid extras into included items and remove duplicate charges. When downgrading, show what will cease to be included and ask whether to retain it as a quote request. Do not silently remove selected experiences. When changing parent route, retain compatible requests, flag incompatible ones and obtain guest acknowledgement before dropping them.

Luxury has no automatically priced upsell screen for already mapped inclusions. Unusual additional days, locations or coverage are bespoke requests and must be explicitly defined and priced in the final complete proposal, rather than assumed unlimited.


## 11 Catalogue compatibility and duplicate handling
Use stable IDs from this brief or equivalent permanent IDs. Every underlying deliverable has one canonical record even if shown under two browsing sections.

Required relations: journey/tier inclusion; destination eligibility; collection requirement; replacement group; conflicts with; bundles/includes; dependency; capacity; available dates; manual review required.

Examples:

- E24 is already in a journey: show Included, not Add again.
- E01 and E08 have the same planned breakfast session: offer alternatives or flag overlap.
- E14 replaces the mapped boat session: remove the replaced session and review any additional performer cost; do not bill two boats automatically.
- E28 selected: S20 is its delivery component, not a second ritual.
- A guest adds S24 to E17: ask whether extended coverage is intended; do not duplicate the existing photographer.
- P09 includes S22: the same ritual is not charged again via an experience card.
- Extra destination, day excursion or hotel night: staff reviews duration, transport, accommodation and departure implications.
- Two simultaneous experiences: show Timing to be reviewed. Do not output a supposedly confirmed schedule.
No hardcoded global rule should add every Varanasi experience to every Luxury itinerary. Publish only owner-approved manifests with realistic time allocations. Any chosen extra outside that manifest is visible as a requested customisation.


## 12 Enquiry forms and communication

### Journey or custom journey form
Required: name, contact email or phone with country code, preferred reply channel, travel date/range/month or undecided, adults, children's ages if applicable, tier or Help me choose, available days or Recommend duration, selected journey/custom interests. If the guest chooses WhatsApp/email, require the corresponding usable contact field.

Additional useful fields: rooms, arrival/departure city and timing if known, pace, preferred language, dietary preferences, accessibility/assistance requests, must-do experiences and optional budget range. Budget is not a price estimate and must not be compulsory.

Do not request passport scans, medical records or ticketing identity details in the general form. Collect sensitive booking information only through an appropriate later process. Provide a separate optional marketing consent; submitting an enquiry does not subscribe the guest automatically.


### Successful submission
Persist the enquiry first; assign a reference; show the full summary and acknowledgement; notify the configured Tourmelloh staff inbox; send an acknowledgement through a configured transactional channel where available. A failed email notification must not lose the enquiry. Prevent duplicate creation from repeated taps. Offer printable summary and optional WhatsApp sharing after submission.

The enquiry summary must include all item IDs, names, selections, quantities, units, replacements, declined inclusions, dates and party information. Do not reduce it to a free-text contact form and lose the wishlist. WhatsApp messages should use a short reference/link and a readable summary, not expose sensitive details in URL parameters.

Contact number: +91 63910 85555. Required mailboxes/aliases are director@<approved-domain>, enquiries@<approved-domain>, partnerships@<approved-domain>, accounts@<approved-domain> and varanasi@<approved-domain>. The founder supplied Tourmelloh as the domain name without its extension; confirm the full owned domain before provisioning or publishing addresses. Route general journey/wedding/wellness enquiries to enquiries, B2B to partnerships and local operations to varanasi; director is escalation and accounts is billing. Final routing is configurable. Define mailbox owners/access, authenticated sending and test delivery; no credentials in source code. Never publish placeholder email links or use obsolete phone numbers. Website enquiry notification is to staff; it does not imply sending emails/messages during development without approved configuration.


### Page-specific WhatsApp messages
Every WhatsApp action must open a guest-editable prefilled message for the current page, not the same generic greeting everywhere. Configure templates in the CMS with page title, canonical page URL, journey/experience/service ID, chosen tier and approved departure date where relevant. Include an existing enquiry reference only if one exists. Do not put health details, birth details for astrology, other personal data or private wishlist access tokens into WhatsApp URLs.

Examples:

- Journey: I am interested in [journey title / destinations], [tier]. Could you help me with suitable dates, duration and inclusions?
- Women's departure: I am interested in [departure title], [approved start–end dates]. Is the departure confirmed, and what are the room-sharing options?
- Wellness: I am interested in Stillness by the Ganges. Could you explain retreat/ashram stays and available Ayurveda and yoga sessions?
- Service: I would like [service title] in [place]. What options and availability can you arrange?
- Experience/temple trail: I am interested in [experience title] in [place]. What timings, duration and walking requirements should I plan for?
- Weddings: I am planning a wedding in Varanasi. Could you help with venues, guest stays and arrangements?
- Destination guide: I am exploring [destination]. Which journeys and duration would you recommend?
- Home/general page: I would like help planning a journey with Tourmelloh.
Only interpolate known values; omit empty fields. The guest sends the message themselves. Test distinct messages on desktop/mobile, including punctuation, encoded links and page changes; clicking WhatsApp alone does not create a submitted enquiry.


## 13 Separate wedding page
Use Destination Weddings as the fourth navigation label. The page title is Wedding in Varanasi and its supporting line is Begin your forever in Mahadev's abode. Use /wedding-in-varanasi as the canonical URL. Present venue sourcing, accommodation, guest transfers and hospitality, ceremonies and priest coordination, decor, catering, photography/videography, entertainment, family experiences and pre/post-wedding travel.

Show only real approved venues, images and scope. If a venue belongs to or is associated with the founder's family, describe it accurately and do not imply exclusive access to unrelated properties. No invented testimonials, wedding galleries or journey prices.

Wedding form: couple/organiser name, email/phone and preferred reply channel, dates/flexibility, guest count, events/days, rooms, venue preference, indicative budget optional, planning scope and notes. CTA Discuss Your Wedding. Separate lead type and staff workflow. Travel items suggested for wedding guests remain part of a later quoted wedding/travel proposal.

Celebrations, music, puja and family occasions remain services/experiences; do not create the earlier proposed Celebrations and Wellness top-level category. The wellness collection is specified in section 4 and remains within Journeys.


## 14 Website admin requirements

### Launch website admin
- Create/edit/archive journeys, tier manifests, collection pages, services, experiences and dated departures without developer code changes.
- Manage titles, descriptions, original images and rights, slugs, SEO metadata, destinations, tags, draft/published state, availability notes, units and approved fixed-extra prices.
- Edit the route, overnight allocation, day programme, physical demands and practical conditions.
- Manage women-only departure minima/capacity/status; manually confirm only against actual accepted bookings.
- View/filter enquiries by type, date, journey, tier, collection, departure and status; assign owner and retain internal notes.
- Export all enquiry fields and line items, not just guest contact details. Document the enquiry export format; no CRM integration is included in this scope.
- Manage homepage reviews/testimonials: add, edit, approve, reorder, publish and unpublish records; record guest publication consent. See section 19 for placement and display rules.
- Staff login with access control. Public visitors must not access private enquiries, quotes or assistance details.
Quotation preparation, quotation approval/payment workflows and CRM development are outside this website brief. Website scope ends at reliable enquiry capture, acknowledgement, staff notification and complete enquiry export. No quotation editor, Quote record or payment gateway is required.


## 15 Data definitions for implementation

| Record | Minimum fields |
|---|---|
| Journey | ID, title, slug, route/destination IDs, duration versions, gateways, nights by place, day programme, collection tags, publication status |
| Tier variant | Journey ID, tier, actual inclusion manifest, scope/limits, hotel and vehicle description, exclusions, availability notes |
| Service or experience | ID, title, type, locations, duration, unit, capacity, price mode, optional fixed price/tax/validity, eligibility, dependencies, replacement/conflict/bundle links, draft/published |
| Inclusion line | Deliverable ID, journey and tier, location/day/session, quantity, scope, included/conditional, mandatory/declinable, replacement group |
| Collection | ID, parent journey links, mandatory support, form rules, additional programme adjustments |
| Departure | ID, collection/template, dates, route, tier options, minimum/capacity, status, confirmed booking count, room policy, confirmation deadline |
| Wishlist | Anonymous ID, version, parent journey/custom flag, collection/departure, tier, party, dates, requests, inclusions, upgrades, opt-outs, review flags |
| Enquiry | Reference, immutable submitted wishlist snapshot, contact preferences, consent, lead type, assignee, status, timestamps |
| Review or testimonial | ID, written/video type, approved guest name, optional city/country, journey/experience description, review text, optional guest photo/video, source URL if applicable, consent record, approval/publication status, display order |

Store submitted snapshots so later catalogue edits do not change what the guest requested. Draft wishlists may use browser storage with clear retention; contact and sensitive details must not be placed in publicly shareable links.


## 16 Acceptance checklist
The developer should demonstrate these scenarios before handover:

1. Four primary navigation items only; walks are under Experiences and Buddhist journeys under Journeys.

2. All 20 core journey records, WL01 wellness programme and all named collections exist with the correct parent links; incomplete programmes remain drafts.

3. All 34 service and 34 experience records exist, with draft status permitted until approved. Linked delivery components cannot be double charged.

4. The same journey changes between Standard/Premium/Luxury on one canonical page; inclusion lists update correctly.

5. Luxury populates its approved inclusions; conditional services remain requests; no false paid-extra totals appear.

6. Standard private-boat selection replaces the included boat for the same session; no automatic invented price difference.

7. Upgrade to Luxury absorbs already selected included extras; downgrade offers to keep them as requests.

8. SHRAVAN always includes its essential assistance; women's departures always include their defined female host.

9. An unconfirmed women's departure collects interest without booking payment; interest does not fulfil minimum group size.

10. Fixed extra prices use the correct unit and minimum; unpriced items never display ₹0; known extras never become a trip total.

11. Guest can start from a service or experience, add a journey later, or submit a custom enquiry without one.

12. Guest can request recommended duration. Extra destinations, scheduling conflicts and assistance needs are flagged for staff review.

13. Wishlist survives navigation and the intended draft-storage period; removing an item or changing a route does not silently erase unrelated requests.

14. Mobile guest can complete the flow without an account. Buttons, selected/included states, form labels and validation are usable with keyboard and screen readers.

15. Submission saves the entire snapshot and shows an enquiry reference even if staff email delivery fails. Repeated taps do not create duplicate leads.

16. Wedding enquiry is separate and captures event/guest/room requirements.

17. Submitted selections remain unchanged when an admin later edits the catalogue.

18. No token or payment request appears before the complete quotation. Payment does not falsely imply supplier confirmation.

19. Admin can edit every catalogue item, price mode, departure and tier manifest; exports retain all selections.

20. Copied walk content is removed; appropriate redirects work; no unapproved stock claims/testimonials or supplier promises appear.

21. Fixed approved departure dates and quorum status display separately; unpublished/provisional dates cannot appear approved.

22. Wellness and lesser-visited temple pages exist; their supplier details remain drafts until approved.

23. S32–S34 and E33–E34 have independent scopes and overlap prevention; boat upgrades replace the selected session.

24. WhatsApp messages differ by page and preserve known context without sensitive details.

25. All five email roles have confirmed full addresses and tested routing before publication; no quotation editor or payment workflow is included in website acceptance.

26. Reviews and testimonials appear only near the bottom of Home, immediately before the final Plan Your Journey section and footer. Admin can manage approved records; an empty section is hidden. Written reviews, optional photos/videos and source links work on mobile and desktop; no separate reviews page or testimonial blocks appear on other pages.


## 17 Owner supplied information before publication
Developer may implement the structure now. The following are content/operations inputs, not values to guess:

- Exact day-by-day route, overnight allocation and arrival/departure assumptions for each journey, especially P13 and P17–P20.
- Approved Standard/Premium/Luxury inclusion manifests for every published journey. Define how the Luxury activities fit, and any alternative duration.
- Named properties/room categories and suitable vehicles by destination; confirmed capacities and substitution rules.
- Original walk programmes, guide availability, site/access permissions where needed and image rights.
- Available services/experiences, actual durations, deliverables, conditions and any genuinely fixed prices with units/taxes/validity.
- Female-host coverage and each women's departure date, minimum, capacity, room policy and confirmation deadline.
- SHRAVAN assistance boundaries, appropriate support providers and consent process for family communication.
- Confirmed local-shrine wording before any twelve-Jyotirlinga reference is published.
- Wellness properties and practitioner credentials; astrologer BHU qualification and medal evidence; helicopter operator/routes/permissions; cinematic reel deliverables; exact Dakshineshwar Vishvanath Temple identity and permitted ritual scope; E34 temple stops.
- Actual approved fixed date ranges for W01–W03, with approval metadata; no dates have been supplied in these notes.
- Full email domain, mailbox owners/routing, transactional notifications and response expectations.
- Final booking, cancellation, payment, privacy and consent wording approved for actual operations.
- Real wedding offering, approved venue imagery and the exact services Tourmelloh undertakes.
- Genuine guest reviews/testimonials, approved display names and media, applicable source links and recorded publication consent. If unavailable at launch, hide the homepage section.
Until a field is approved: keep it editable and unpublished or show a truthful enquiry-only label where appropriate. Do not replace missing operating information with invented copy, prices or confirmations.


## 18 Launch scope boundary
Build now: four-section website, catalogue and tier system, specialist collections and women's date enquiries, structured services/experiences, quotation wishlist, boat/vehicle replacement requests, admin, lead capture/export, wedding enquiry and original-content migration.

Not required for launch: live hotel/vehicle inventory, automatic journey estimates, AI-generated schedules, supplier APIs, automatic ticketing, token checkout, automated security/care booking, or a full custom CRM costing engine. These can be separately scoped later. The user-facing promise remains personal planning and a complete price before booking payment.


## 19 Brand presentation and customer communication
This section incorporates the founder's thirteen website updation points. It supplements the catalogue and functional requirements above; it does not add new top-level categories or change the quotation-only enquiry model.


### Brand identity and design handover
The official logo and brand identity are pending agency delivery. The existing fonts, colours, banners and imagery treatment are provisional. Build shared design tokens for typography, colour, spacing and buttons, plus replaceable logo and banner assets, so the approved identity can be applied consistently without rebuilding pages. Keep content and functional work moving while assets are pending.

Before final visual approval, obtain the approved logo variants, favicon, font files/licences, colour palette, image direction and mobile treatments. Apply the final identity to the header, footer, forms, navigation, cards, wedding page and enquiry acknowledgements. Check contrast, text legibility and mobile layouts after changing fonts. Do not publish a provisional logo as the official identity or commit to an unconfirmed agency delivery date.


### Positioning at first glance
Use the company descriptor Travel and Destination Partners. The first visible homepage section must explain where Tourmelloh operates, what it arranges and how it supports guests from planning through the journey. Lead with the Varanasi base and the approved regional journeys. Present broader destinations only where Tourmelloh has approved an actual offering.

Suggested homepage headline for founder approval: Your travel and destination partners in Varanasi and beyond.

Suggested supporting copy: From the first conversation to your journey home, we bring stays, transport, local experiences and personal assistance together around your needs. Discover Kashi and our regional journeys with thoughtful planning and a team that helps you and your loved ones travel with confidence.

Make the differentiation concrete: a named planning contact, a coordinated itinerary, confirmed arrangements, transparent inclusions, practical local guidance and assistance matched to the chosen journey and tier. Avoid disparaging other travel businesses or relying on unsupported superlatives. Standard still receives planning and coordination; continuous in-person concierge coverage must not be implied for every tier.

Remove site-wide claims that conflict with the catalogue, including blanket promises of palace stays, private guides on every journey or no group departures. Explain private journeys and hosted women-only departures accurately. Use Featured Journeys rather than popularity claims without evidence. The wedding page may use the founder's line Begin your forever in Mahadev's abode, supported by clear descriptions of the actual planning and hospitality offering.


### Founder story and About page
Create a substantial Our Story block explaining the founders' experience in Varanasi hospitality, the difficulties they saw guests face, why they established Tourmelloh and how they preserve authentic experiences while coordinating practical details. Use real founder names, approved portraits and specific, verified experience. Do not invent years of experience, former employers, awards, affiliations or testimonials.

Suggested story opening for founder approval: Our story began in Varanasi's hospitality industry, where we saw how much the details shape a guest's experience. A city as layered and lively as Kashi can be deeply rewarding, yet unfamiliar lanes, changing plans and the coordination of stays, transport and visits can feel overwhelming. We created Tourmelloh to bring these arrangements together, so our guests can experience the city authentically with support from the planning stage through their journey.

Follow this with approved founder biographies, the team's approach to guest care and links to Journeys, SHRAVAN and hosted women's journeys. Explain the female founder's perspective through actual service design and accompaniment arrangements. The story must convey understanding and accountability without promising zero disruption or unrestricted access. Put a short founder introduction on Home linking to the fuller About story.


### Contact buttons and mobile access
Keep Plan Your Journey visually distinct in the header and homepage hero. It opens the assisted enquiry flow and preserves any selected journey, tier and wishlist. On detail pages, Personalise This Journey remains the contextual action. Do not make a guest start again after they have chosen a journey.

Use a persistent WhatsApp button labelled Chat with Tourmelloh, rather than an unexplained icon alone. On mobile provide an unobtrusive fixed contact area offering Plan Your Journey and WhatsApp, with click-to-call available in Contact. Ensure controls do not obscure form fields, consent notices or the final submit button. Avoid repeated pop-ups and multiple competing floating widgets.

A subtle one-time animation may draw attention to the main action. Respect reduced-motion preferences, avoid continual bouncing or flashing, and provide visible keyboard focus. WhatsApp remains a guest-initiated action. Include the current journey or enquiry reference in a readable prefilled message; do not claim a WhatsApp conversation is a submitted enquiry unless it has actually been saved.

Use +91 63910 85555 throughout, as supplied earlier; the blank phone-number line in the latest notes does not replace it. Configure tel:+916391085555 and https://wa.me/916391085555 centrally. Replace old numbers in visible copy, links, footer, metadata and templates. Publish business hours and response expectations only after the team approves them. Do not imply a staffed 24-hour chat unless that service exists.


### Homepage banner video
Use an approved, licensed or owned film led by Varanasi, with footage of the other destinations actually offered. Do not show destinations as included in every journey. Overlay readable headline text and the primary action; the video must not be the only way to understand the company.

Implement muted, inline autoplay where the browser permits it, with a visible pause/play control and no automatic audio. Provide an attractive poster image when autoplay is blocked, the video fails, or reduced-motion/data preferences favour a still image. Use compressed responsive media and avoid delaying access to the page while the film downloads. Crop and contrast must be checked on mobile. Any meaningful spoken information must also have an accessible text equivalent.


### Homepage reviews and testimonials
Include one combined Reviews and Testimonials section on the homepage only. Public heading: Journeys, in Their Words. Place it near the bottom of Home, immediately before the final Plan Your Journey section and footer. Do not create a separate reviews page or repeat testimonial sections on journey, service, experience, collection or wedding pages.

Support genuine written reviews with optional guest photographs and video testimonials. Each entry shows the guest's approved name, optional city/country, journey or experience, and the review or video. Link externally published reviews to their original source where available. Preserve the meaning of guest feedback; do not invent reviews, ratings, guest identities or endorsements. Promotional films featuring actors must not be presented as guest testimonials.

Use responsive cards with readable text and accessible controls. Videos play only when the visitor chooses, with no automatic audio; provide captions or a transcript. Administrators can add, edit, reorder, approve, publish and unpublish entries, with consent recorded for names, words, photos and videos. Publish only genuine approved feedback with the required permission. Hide the complete section and its heading until at least one approved entry is available.


### Enquiries and guided next steps
Use the forms and saved-selection payload in section 12. Visitors who know their journey can personalise it; undecided visitors can select Help Me Choose or Recommend duration. Do not require them to understand local travel times before asking for help.

When a journey is selected, prefill its correct duration and allow changes; do not retain an unrelated default night range. Keep destination and journey-type filters together when navigating to results. Preserve selections across contact actions. Display the successful submission reference, expected next step and approved response window. Keep wedding and dated women's departure enquiries distinct.


### FAQs that answer actual booking doubts
Write both general and journey-specific FAQs. Reuse approved answers through the CMS, with each journey showing only the relevant questions. Explain the value of coordination through practical examples, without suggesting every guest needs a dedicated concierge or that all tiers include one.

Required topics: how planning and on-trip support work; Standard versus Premium versus Luxury; remote coordinator versus host, sightseeing guide and concierge; suitable duration; arrival/departure timing; mobility and steps; travelling parents and family updates; female-host scope and minimum group conditions; boat/weather changes; darshan and queue limitations; hotel and vehicle confirmation; fixed extras versus the complete quotation; duplicate inclusions and upgrades; payments, cancellations and supplier confirmation.

Answer What happens after I enquire? clearly: the team reviews the selections, checks feasibility and availability, and sends a complete quotation before booking payment. Link relevant FAQs to the tier comparison, services, experiences or appropriate enquiry flow. Do not use fabricated scarcity or fear to sell assistance.


### Journal and destination guides
Retain Journal and destination guides as supporting content, accessible through footer/utility links and contextual links. They do not become fifth or sixth main commercial sections. Prioritise content that helps guests choose and understand the journeys, services and experiences Tourmelloh actually provides.

Initial editorial topics: planning a first Kashi visit; how journey coordination works; choosing a boat experience; arranging a comfortable trip for parents; what a female-hosted departure includes; planning Sarnath and Bodh Gaya; understanding Gaya versus Bodh Gaya; combining Kashi, Prayagraj and Ayodhya at a suitable pace; and planning guest hospitality for a Kashi wedding.

Destination guides should cover the approved destinations, relevant gateways, suggested pacing, physical demands, seasonality, local etiquette and links to suitable journeys and experiences. Verify changing operational details before publication and record the review date in the CMS. Rewrite generic or copied guides. Keep useful existing content where accurate; do not imply local delivery capacity solely because a city article exists. Each article has an original title, approved imagery, useful related products and a relevant enquiry action.


### Navigation presentation and acceptance checks
Retain the useful dropdown design but organise it visibly around Journeys, Services, Experiences and Destination Weddings. Under Journeys expose duration/destination discovery, the three tiers and specialist collections without duplicating itinerary records. Walks remain inside Experiences. Make the same hierarchy usable by keyboard and touch; no hover-only access.

Before handover, demonstrate that the approved identity is applied consistently; the first screen explains the business; founder details are real and approved; all contact links use the correct number; contact buttons remain usable on small screens; reduced-motion settings and blocked video autoplay have graceful fallbacks; selected journeys prefill the right duration; filters preserve destination and interest; and FAQs, articles and guides link to relevant live offerings. Also check that homepage-only reviews appear in the specified position and disappear cleanly when no approved entries exist. These checks are additional to section 16.

The four-section structure, tiers, add-on prices where verified, duplicate-charge prevention, enquiry form and wedding page were already specified. This revision makes the positioning, brand handover, contact presentation, video, editorial direction and founder story explicit. No additional itinerary, service or experience records are introduced by these thirteen points. The approved naming pass preserves existing IDs. This revision additionally introduces WL01, S32–S34 and E33–E34, and removes the former section 16 and quotation workflow specification.
