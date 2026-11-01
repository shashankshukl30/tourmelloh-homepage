import type { PageCopy } from "./types";

/**
 * Company, policy and wedding page copy (brief v5, sections 4, 5, 9, 12, 13 and 19).
 * The privacy, terms and booking-terms wording is a working draft for the founder's approval: final operating,
 * payment, cancellation and consent wording must be approved before launch (brief section 17).
 */
export const pages: PageCopy[] = [
  {
    slug: "about",
    title: "About Tourmelloh",
    display: ["Our story,", "from Varanasi."],
    hero: "varanasi-old-city-lanes",
    lead:
      "Tourmelloh: Travel and Destination Partners, based in Varanasi. We bring together stays, transport, local experiences, rituals and personal assistance for journeys in Kashi and the pilgrimage region around it, and we plan weddings in the city.",
    sections: [
      {
        heading: "Our story",
        paragraphs: [
          "Our story began in Varanasi's hospitality industry, where we saw how much the details shape a guest's experience. A city as layered and lively as Kashi can be deeply rewarding, yet unfamiliar lanes, changing plans and the coordination of stays, transport and visits can feel overwhelming.",
          "The difficulties guests face here are rarely dramatic: a car that cannot reach the lane where the hotel stands, a dawn boat when the river has risen overnight, a parent who wants to see the Vishwanath temple but cannot face another long queue after a morning on the ghat steps, a late train and a hotel nobody has told. Each one is small and solvable, but only if someone has thought about it in advance.",
          "We created Tourmelloh to bring these arrangements together, so our guests can experience the city authentically with support from the planning stage through their journey. The ghats, the lanes, the aarti and the river stay exactly as they are. Our work is everything around them: the right hotel for the people staying in it, a vehicle that suits the party, timings that respect the temple's rules and the traveller's energy, and someone accountable when plans change.",
        ],
      },
      {
        heading: "Our Founders",
        paragraphs: [
          "Tourmelloh was founded by Aparajita and Gaurav, who lead the company as its founders. Like the rest of our founding team, they come from Varanasi's hospitality industry, and they bring that experience of looking after guests in this city to every journey we plan.",
        ],
      },
      {
        heading: "How we look after our guests",
        paragraphs: [
          "Good care starts with asking rather than assuming. Before we suggest a route, we ask who is travelling, how they like to move through a day, what they eat, where they need rest and what would make them uneasy. The plan follows what you tell us.",
          "We are also clear about what we can and cannot control. Temples set their own rules and queues, the river follows its own level and local orders, and trains and flights run to their own timetables. We cannot promise a journey without disruption. We can promise that you will hear from us early, with realistic options, and that the person you speak to knows your plans.",
        ],
        points: [
          "A named planning contact from the first conversation",
          "A coordinated, day-by-day itinerary with travel and rest built in",
          "Arrangements confirmed with each supplier and confirmed to you in writing",
          "Transparent inclusions: a complete written quotation before any booking payment",
          "Practical local guidance on timings, dress, steps and etiquette",
          "Assistance matched to the journey and tier you choose",
        ],
      },
      {
        heading: "A woman's perspective, built into the service",
        paragraphs: [
          "Tourmelloh has a female founder, and we would rather show what that means through the service than describe it. Her Own Way departures are women-only groups with a female accompanying host, scheduled dates and room-sharing terms stated before anyone books. On private journeys, a female accompanying host can be requested for specified days, and a preference for a female driver is recorded and confirmed only where a supplier can provide one.",
          "The same thinking runs through SHRAVAN, our collection for parents and senior travellers: named accompaniment at every tier, the booking contact kept distinct from the traveller, and family updates shared only with the traveller's permission.",
        ],
      },
      {
        heading: "Where we work",
        paragraphs: [
          "We are based in Varanasi and most journeys begin here, often with Sarnath close by. Our regional journeys reach places such as Prayagraj, Ayodhya, Gaya and Bodh Gaya, and our Buddhist routes continue towards Kushinagar, Shravasti, Rajgir and Nalanda. Each journey names its destinations, overnight places and suggested duration.",
          "You can begin with one of our journeys, with the SHRAVAN or Her Own Way collections, with a single service or experience, or with a simple question.",
        ],
      },
      {
        heading: "Talk to us",
        paragraphs: [
          "Call or send a WhatsApp message to +91 63910 85555, or write to tourmelloh@gmail.com. Tell us when you would like to travel, who is coming and what matters to you, and we will take it from there.",
        ],
      },
    ],
    seo: {
      title: "About Tourmelloh: Travel and Destination Partners, Varanasi",
      description:
        "Tourmelloh was founded in Varanasi by people from the city's hospitality industry to bring stays, transport, experiences and assistance together for guests.",
    },
  },
  {
    slug: "how-it-works",
    title: "How it works",
    display: ["From the first conversation", "to your journey home."],
    hero: "travel-host",
    lead:
      "Every Tourmelloh journey is enquiry-led. You choose a journey, a tier and the extras you would like, and we send a complete written quotation before any payment. Here is what happens at each step, and who does what along the way.",
    sections: [
      {
        heading: "Step by step",
        paragraphs: [
          "Most guests follow the same path, though you can start wherever suits you: with a journey, with a service or experience you have saved, or with Help Me Plan if you do not yet know your route or duration.",
        ],
        points: [
          "Choose a journey, or ask us to recommend one",
          "Select Standard, Premium or Luxury",
          "Add your travel dates, or an approximate month, and who is travelling",
          "Review the day-by-day programme",
          "Add services and experiences, choose replacements such as a private boat, or decline optional items",
          "Review My Journey and send Request My Personalised Quote",
          "We confirm the scope and check availability with our suppliers",
          "You receive a complete written quotation",
          "You accept, and we request a booking advance under the quoted terms",
          "We confirm each arrangement in writing and send your final details",
        ],
      },
      {
        heading: "A named planning contact",
        paragraphs: [
          "From your first message, one named person at Tourmelloh looks after your plans. They know your dates, your party and your preferences, so you never have to explain yourself twice. That same contact sees your journey through to confirmation.",
        ],
      },
      {
        heading: "A coordinated itinerary",
        paragraphs: [
          "Your plan is set out day by day, with travel and rest blocks as well as visits. Timings account for the drive from the airport, the walk down to the ghats, temple hours and the time a parent or child needs between activities. If two things you have asked for clash, we flag it for review rather than produce a schedule that cannot work.",
        ],
      },
      {
        heading: "Confirmed arrangements",
        paragraphs: [
          "A request is not a confirmation. Until a hotel, vehicle, boat operator, priest or guide has confirmed with us, we describe it as requested rather than confirmed. After you accept and pay the booking advance, we confirm each arrangement and tell you in writing. If something cannot be confirmed, we explain the alternatives and never downgrade you silently.",
        ],
      },
      {
        heading: "Transparent inclusions",
        paragraphs: [
          "Your quotation lists what is included and what is not: hotels and room categories, vehicle, meals, boats, darshan arrangements, guides, admissions and any extras. There are no prices on this website because no two journeys are the same. Where an extra has an approved fixed price, My Journey shows it, but a known extras subtotal is never your trip total.",
        ],
      },
      {
        heading: "Local guidance",
        paragraphs: [
          "Before you travel we tell you the practical things that make a difference in Kashi: what to wear at temples, which mornings start before dawn, where the steps are steepest, how to behave near the cremation ghats, what to carry on a boat, and what the season is likely to bring.",
        ],
      },
      {
        heading: "Who does what",
        paragraphs: [
          "Different journeys and tiers include different kinds of support. One confirmed person may hold more than one role, and you are never charged twice for the same coverage.",
        ],
        points: [
          "Remote coordinator, every tier: plans and confirms your arrangements and stays reachable by phone and WhatsApp during the journey",
          "Travel host: accompanies you for specified visits or days and looks after the practical side",
          "Sightseeing or specialist guide: explains a site, neighbourhood or subject for a defined session",
          "Dedicated travel concierge, Luxury: looks after your journey within agreed support hours, in person or remotely as stated",
          "Driver: drives you between places; a driver is not a sightseeing guide",
          "Senior travel companion, SHRAVAN: defined, non-medical assistance with pace, steps and routines",
          "Female accompanying host, Her Own Way: travels with women's group departures for the hosted programme",
        ],
      },
      {
        heading: "On the way home",
        paragraphs: [
          "The last day is planned as carefully as the first: a realistic time to leave the hotel, a transfer timed to your flight or train, and a coordinator who knows when you are due to depart.",
        ],
      },
    ],
    seo: {
      title: "How It Works: From Enquiry to Journey Home | Tourmelloh",
      description:
        "How a Tourmelloh journey comes together: a named planning contact, a day-by-day itinerary, confirmed arrangements and a complete quotation before payment.",
    },
  },
  {
    slug: "tiers",
    title: "Standard, Premium and Luxury",
    display: ["Standard, Premium", "and Luxury."],
    hero: "luxury-suite",
    lead:
      "Every journey can be planned at one of three comfort and service levels. The tier changes the hotels, the vehicle and the level of accompaniment; it does not change the care that goes into planning. Here is what each one includes, and what Luxury does not mean.",
    sections: [
      {
        heading: "What every tier shares",
        paragraphs: [
          "Every tier includes planning and coordination, a named remote coordinator and a complete written quotation before any booking payment. Where a collection defines its own support, such as the companion on SHRAVAN journeys or the female host on Her Own Way departures, that support is included at every tier and cannot be removed.",
          "Hindu pilgrimage, Buddhist journeys, SHRAVAN and family journeys are types of journey, not extra tiers of comfort. You choose the journey first, then the tier.",
        ],
      },
      {
        heading: "Standard",
        paragraphs: ["Comfortable, well-planned and coordinated, with support available remotely throughout."],
        points: [
          "Hotels: selected 3-star hotels",
          "Vehicle: private air-conditioned sedan or suitable equivalent",
          "Meals: breakfast on hotel nights, unless stated otherwise",
          "Boat: the specified included ride on routes with a boat experience, with shared or private stated",
          "Darshan: planned visits and clearly stated arrangements on applicable Hindu itineraries",
          "Assistance: a named remote coordinator; a sightseeing guide is not included unless listed",
          "Experiences: the base itinerary inclusions, with extras available to add",
          "Photography: optional unless stated",
          "Security: on request",
        ],
      },
      {
        heading: "Premium",
        paragraphs: ["More space on the road, a private boat where the route has one, and someone with you for defined parts of the journey."],
        points: [
          "Hotels: selected 4-star hotels",
          "Vehicle: an upgraded MPV or SUV, such as an Innova Crysta or equivalent",
          "Meals: breakfast included",
          "Boat: a specified private upgrade on applicable routes",
          "Darshan: specified accompanied assistance",
          "Assistance: defined hosted assistance and selected guided visits",
          "Experiences: the base inclusions plus specified Premium inclusions, with extras available to add",
          "Photography: optional unless stated",
          "Security: on request",
        ],
      },
      {
        heading: "Luxury",
        paragraphs: ["The full offering defined for your chosen Luxury journey, with a dedicated concierge and every journey-mapped Luxury experience included."],
        points: [
          "Hotels: selected 4- or 5-star, heritage or boutique properties, with the actual category and room disclosed in your quotation",
          "Vehicle: a specifically confirmed premium vehicle, such as a Fortuner, a Mercedes or a suitable alternative chosen for your party and route",
          "Meals: breakfast included, with any other meals expressly listed",
          "Boat: the highest suitable option mapped to your journey",
          "Darshan: dedicated coordination and accompaniment within the stated scope",
          "Assistance: a dedicated travel concierge, with a personal host or escort scope and agreed support hours",
          "Experiences: all journey-mapped Luxury experiences selected automatically",
          "Photography: a defined professional session on applicable journeys, with session length and deliverables stated",
          "Security: included when requested, applicable and expressly accepted in your quotation",
        ],
      },
      {
        heading: "What Luxury does not mean",
        paragraphs: [
          "Luxury is generous, but it is defined. It covers what is mapped to your chosen Luxury journey, written out in your quotation, rather than everything we can arrange.",
        ],
        points: [
          "It does not include every service in our catalogue, every type of boat or unlimited staff hours",
          "It does not promise 5-star hotels, a Mercedes or a particular room category in every destination",
          "Security is arranged only when requested and confirmed in your quotation, never deployed automatically",
          "Optional items such as food, photography, music and rituals can be declined; removing one before a quotation exists does not imply a fixed refund or credit",
          "Additional days, places or coverage are bespoke requests, defined and priced in your complete proposal",
        ],
      },
      {
        heading: "Combinations we check",
        paragraphs: [
          "You can choose any tier as a preference on any journey. Where a combination is not available, for example where a destination has no property of the requested category, we flag it for our team and describe the actual arrangement accurately in your quotation. Ashram stays are described for what they are, without hotel star ratings. We never downgrade without telling you.",
          "Changing tier keeps what you asked for. Moving up absorbs paid extras that the new tier includes; moving down shows what would no longer be included and asks whether to keep each item as a request.",
        ],
      },
    ],
    seo: {
      title: "Standard, Premium and Luxury Tiers Explained | Tourmelloh",
      description:
        "What each Tourmelloh tier includes: hotels, vehicles, meals, boats, darshan arrangements and assistance, and what Luxury does and does not mean on a journey.",
    },
  },
  {
    slug: "privacy",
    title: "Privacy notice",
    display: ["Privacy", "notice."],
    lead:
      "This notice explains what personal data Tourmelloh collects through this website, why we collect it, how we look after it and the rights you have under India's Digital Personal Data Protection Act, 2023.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Tourmelloh is a travel and destination company based in Varanasi, Uttar Pradesh, India. For the personal data you share through this website, we are the Data Fiduciary under the Digital Personal Data Protection Act, 2023. You can contact us about this notice or your data at tourmelloh@gmail.com.",
        ],
      },
      {
        heading: "What our forms collect",
        paragraphs: [
          "We ask only for what we need to answer your enquiry and plan your journey. Depending on the form you use, that may include:",
        ],
        points: [
          "Your name, email address or phone number with country code, and your preferred reply channel",
          "Travel dates, a date range or month, and how flexible you are",
          "The number of adults and, if children are travelling, their ages",
          "Your chosen journey, tier, collection or departure, and the services and experiences you selected, replaced or declined",
          "Rooms, arrival and departure details if known, preferred pace and language, dietary preferences and an optional budget range",
          "Accessibility or assistance requests, such as help with steps or a wheelchair",
          "For weddings: the couple's or organiser's name, dates, guest count, events, rooms, venue preference, planning scope and notes",
          "For wellness enquiries: retreat or ashram preference, available days, gentle activity preferences and accessibility needs",
          "For partner enquiries: your company name and business contact details",
        ],
      },
      {
        heading: "Children's information",
        paragraphs: [
          "We ask for children's ages, not their names, so that we can plan rooms, meals, rest and seating. This information should be provided by a parent or guardian, who consents to its use for planning the journey. Please do not send children's identity documents through the website.",
        ],
      },
      {
        heading: "What we do not ask for on the website",
        paragraphs: [
          "Our website forms do not ask for passport or identity scans, visa documents, ticketing identity details, medical records or medical histories, and we ask you not to send them through the site or in a WhatsApp message. If a later booking genuinely needs identity details, for example for train tickets or hotel registration, we collect only what is needed through a separate, appropriate process at that stage.",
          "It helps to describe assistance requests in general terms, such as difficulty with steps or a need for rest between visits. Our forms are not a medical assessment.",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: [
          "We use your information to reply to you, understand your plans, prepare your quotation and, if you go ahead, arrange your journey. When you proceed, we share the details a supplier needs, such as names, dates, room needs, dietary requirements or assistance requests, with the hotels, transport providers, boat operators, guides, priests or practitioners involved. We also use service providers for email and website hosting, who process data on our behalf. We do not sell your personal data.",
        ],
      },
      {
        heading: "Marketing consent",
        paragraphs: [
          "Submitting an enquiry does not subscribe you to marketing. If you would like to hear from us about journeys and departures, you can tick a separate, optional consent box. You can withdraw that consent at any time by writing to tourmelloh@gmail.com or using the unsubscribe option in any message.",
        ],
      },
      {
        heading: "My Journey and WhatsApp",
        paragraphs: [
          "Items you save to My Journey before submitting are stored in your own browser so that your selections survive as you move around the site. You can clear them at any time by clearing your browser storage. Your contact details are never placed in shareable links.",
          "Our WhatsApp buttons open a message for you to edit and send yourself. The message includes the page you were viewing and, if you have one, your enquiry reference, but not health details or other personal data. Messages sent through WhatsApp are also subject to WhatsApp's own terms and privacy policy.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep enquiry and booking information for as long as we need it to respond to you, deliver your journey and meet our legal, tax and accounting obligations. After that we delete it or remove anything that identifies you.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under the Digital Personal Data Protection Act, 2023 you may ask us for a summary of the personal data we hold about you and how it is used, ask us to correct, complete, update or erase it, withdraw consent you have given, and nominate another person to exercise your rights in the event of your death or incapacity. You can also raise a grievance with us, and if it is not resolved, approach the Data Protection Board of India.",
          "To exercise any of these rights, write to tourmelloh@gmail.com. We may need to confirm your identity before acting on a request.",
        ],
      },
      {
        heading: "Changes to this notice",
        paragraphs: [
          "We will update this notice when our practices change, for example if we add new forms or tools to the website. The version published on this page is the current one.",
        ],
      },
    ],
    seo: {
      title: "Privacy Notice: How Tourmelloh Uses Your Data | Tourmelloh",
      description:
        "What Tourmelloh's enquiry forms collect, why, what we never ask for online, marketing consent, and your rights under India's DPDP Act, 2023.",
    },
  },
  {
    slug: "terms",
    title: "Website terms of use",
    display: ["Website", "terms of use."],
    lead:
      "These terms apply to your use of the Tourmelloh website. The terms that apply to a journey you book are set out in your quotation and in our booking terms.",
    sections: [
      {
        heading: "About these terms",
        paragraphs: [
          "This website is operated by Tourmelloh, a travel and destination company based in Varanasi, Uttar Pradesh, India. By using the website, you agree to these terms. If you do not agree, please do not use it.",
        ],
      },
      {
        heading: "Information on this website",
        paragraphs: [
          "We describe our journeys, services and experiences as accurately as we can. Journey durations are suggested planning versions, routes and inclusions remain subject to confirmation, and the services and experiences shown are arranged on request rather than held in stock. Temple access, river conditions, festivals, weather and transport timetables can change, and some details on this site may change with them.",
          "Photographs show the places and kinds of experiences we arrange. Unless a caption says otherwise, they are illustrative and do not show a particular hotel, vehicle, boat or venue that will form part of your journey.",
        ],
      },
      {
        heading: "Enquiries are not bookings",
        paragraphs: [
          "Nothing on this website is an offer to sell at a fixed price. Journeys are quoted individually. Sending an enquiry, saving items to My Journey or messaging us on WhatsApp is a request for a personalised quotation, not a confirmed booking, and does not require payment. A booking is made only on the terms set out in a complete written quotation that you accept.",
        ],
      },
      {
        heading: "Using the website",
        paragraphs: [
          "Please use the website lawfully and give accurate information in your enquiries. Do not attempt to disrupt the site, access areas that are not public, or submit enquiries in someone else's name without their permission.",
        ],
      },
      {
        heading: "Content and copyright",
        paragraphs: [
          "The text, design and original material on this website belong to Tourmelloh. Some photographs are used under licence from the people who own them. You may share links to our pages, but please do not copy our text or images for commercial use without permission.",
        ],
      },
      {
        heading: "Links and third-party services",
        paragraphs: [
          "The website links to services run by others, such as WhatsApp. We are not responsible for their content or practices, and your use of them is subject to their own terms.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "We work to keep the website accurate and available, but we cannot promise that it will always be free of errors or interruptions. To the extent permitted by law, we are not liable for loss arising from reliance on general information on the website. Nothing in these terms limits any right you have under Indian consumer law.",
        ],
      },
      {
        heading: "Governing law and contact",
        paragraphs: [
          "These terms are governed by the laws of India. We may update them from time to time, and the version on this page applies when you use the website. For any question about these terms, write to tourmelloh@gmail.com.",
        ],
      },
    ],
    seo: {
      title: "Website Terms of Use for tourmelloh.com | Tourmelloh",
      description:
        "The terms for using the Tourmelloh website: how we describe journeys, why enquiries are not bookings, photographs, copyright, links and governing law.",
    },
  },
  {
    slug: "booking-terms",
    title: "Booking terms",
    display: ["Booking", "terms."],
    lead:
      "How a Tourmelloh booking comes together, from your enquiry to a confirmed journey. The specific price, payment schedule and cancellation terms for your journey are always set out in your written quotation.",
    sections: [
      {
        heading: "How a booking is made",
        paragraphs: ["Every journey follows the same order, and no step is skipped."],
        points: [
          "You send an enquiry with your chosen journey, tier, dates and selections",
          "We review the scope and check availability with our suppliers",
          "We send a complete written quotation with the full price, inclusions, exclusions and terms",
          "You accept the quotation",
          "We request a booking advance under the terms stated in that quotation",
          "We confirm each arrangement with our suppliers and confirm it to you in writing",
        ],
      },
      {
        heading: "No payment before the quotation",
        paragraphs: [
          "We never ask for a token, deposit or any other payment before you have received and accepted a complete written quotation. Submitting an enquiry, saving My Journey or registering interest in a departure is free.",
        ],
      },
      {
        heading: "What your quotation contains",
        paragraphs: ["Your quotation is the document that governs your booking. It sets out:"],
        points: [
          "The day-by-day itinerary and overnight places",
          "The hotels and room categories proposed, and which are confirmed",
          "The vehicle, meals, boats, darshan arrangements, guides and admissions included at your tier",
          "Any services and experiences you added, with what each includes",
          "What is not included",
          "The total price, applicable taxes, how long the quotation is valid, the payment schedule and the cancellation terms",
        ],
      },
      {
        heading: "Supplier confirmation",
        paragraphs: [
          "Hotels, vehicles, boats, priests, guides, practitioners and other arrangements are arranged with the suppliers who provide them. Paying the booking advance begins the confirmation process but does not by itself confirm every supplier. We confirm each arrangement and tell you in writing. If something cannot be confirmed, we explain why, offer alternatives and agree any change with you. We do not substitute a lower category without your agreement.",
        ],
      },
      {
        heading: "Changes you ask for",
        paragraphs: [
          "If you would like to change your dates, route, tier or selections after accepting, tell us as early as you can. We will check what is possible and confirm any change in price or terms in writing before making it.",
        ],
      },
      {
        heading: "Changes outside our control",
        paragraphs: [
          "Boats depend on river level, weather and orders from the local authorities. Temples set their own rules, timings and queues. Festivals, closures, road restrictions and delayed trains or flights can all affect a day. When this happens we tell you promptly, offer realistic alternatives and reorder the programme where we can. How an included element that could not take place is treated is set out in your quotation's terms.",
        ],
      },
      {
        heading: "Cancellations",
        paragraphs: [
          "Cancellation terms depend on the suppliers, season and arrangements in each journey, so they are stated in each quotation rather than fixed here. Please read them before accepting, and ask us if anything is unclear. Any cancellation should be sent to us in writing.",
        ],
      },
      {
        heading: "Women's group departures",
        paragraphs: [
          "Her Own Way departures run on approved dates and are subject to the minimum group size stated for each departure. Registering interest does not confirm a booking and does not count towards the minimum. We confirm the departure and the complete price before requesting booking payment. If a departure does not reach its minimum, we offer another date or, if you wish, a private journey on a new quotation; we never make that switch without asking.",
        ],
      },
      {
        heading: "Assistance, wellness and care",
        paragraphs: [
          "Travel hosts, senior travel companions and wellness practitioners work within the scope stated in your quotation. None of them provides medical or nursing care unless a qualified provider has been separately agreed. Wellness programmes make no claims to cure or treat any condition.",
        ],
      },
      {
        heading: "Your part",
        paragraphs: [
          "Please give us accurate information about your party, dates and any assistance needs, carry the identity documents your journey requires, and follow the dress and conduct rules of the temples and sites you visit. We recommend travel insurance suited to your journey.",
        ],
      },
      {
        heading: "Payments and questions",
        paragraphs: [
          "For questions about a quotation or payment, write to tourmelloh@gmail.com. For anything else about your booking, contact your planning contact or tourmelloh@gmail.com.",
        ],
      },
    ],
    seo: {
      title: "Booking Terms: Quotes, Payments, Cancellations | Tourmelloh",
      description:
        "How a Tourmelloh booking works: a complete written quotation first, no payment before it, supplier confirmation in writing and cancellation terms per quote.",
    },
  },
  {
    slug: "partners",
    title: "Travel partners",
    display: ["Travel partners", "and business enquiries."],
    hero: "varanasi-aerial-ghats",
    lead:
      "Tourmelloh works with travel businesses that send guests to Varanasi and the surrounding pilgrimage region. If you plan journeys, groups or events here, we would be glad to hear from you.",
    sections: [
      {
        heading: "Who we work with",
        paragraphs: [
          "We welcome enquiries from travel agents, tour operators, destination management companies, event and wedding planners, and organisations arranging travel for their teams or communities.",
        ],
      },
      {
        heading: "What we can arrange on the ground",
        paragraphs: [
          "Everything we arrange for our own guests is available to partners, subject to the same supplier confirmation.",
        ],
        points: [
          "Hotel stays across Standard, Premium and Luxury tiers",
          "Airport and station transfers and private chauffeured transport",
          "Boat outings, aarti viewing and river experiences",
          "Walks, food, craft and cultural experiences in Varanasi",
          "Priest and ritual coordination, including Ganga puja and ancestral rites",
          "Travel hosts, specialist guides and senior travel companions",
          "Regional journeys to Sarnath, Prayagraj, Ayodhya, Gaya, Bodh Gaya and beyond",
          "Wedding logistics and guest hospitality in Varanasi",
        ],
      },
      {
        heading: "How partner enquiries work",
        paragraphs: [
          "Write to tourmelloh@gmail.com with your company name, where you are based, the kind of travellers you work with, the dates or volumes you have in mind and the services you need. We will reply to discuss how we can work together. Terms for each arrangement are agreed in writing.",
        ],
      },
      {
        heading: "What we ask of partners",
        paragraphs: [
          "We describe our arrangements carefully, and we ask partners to do the same. Please do not promise darshan without queues, VIP access, boats in every river condition or medical care on our behalf. Our durations are suggested planning versions, and every arrangement is confirmed with the supplier before it is final.",
        ],
      },
    ],
    seo: {
      title: "Travel Partners and B2B Enquiries in Varanasi | Tourmelloh",
      description:
        "Tourmelloh works with travel agents, tour operators, DMCs and planners sending guests to Varanasi and the region. Write to tourmelloh@gmail.com.",
    },
  },
  {
    slug: "wedding-in-varanasi",
    title: "Wedding in Varanasi",
    display: ["Wedding in Varanasi", "Begin your forever in Mahadev's abode"],
    hero: "wedding-mandap",
    lead:
      "Tourmelloh plans weddings in Varanasi for couples and families who want to marry in Kashi. We bring the arrangements around the ceremony together in one plan: the venue, guest stays and transfers, the rituals and priests, decor, food, photography, entertainment, and the days before and after.",
    sections: [
      {
        heading: "What we arrange",
        paragraphs: [
          "Every wedding is planned around the couple, the families and the ceremonies that matter to them. We can take on the whole celebration or only the parts you need.",
        ],
        points: [
          "Venue sourcing",
          "Accommodation for the families and guests",
          "Guest transfers and hospitality",
          "Ceremonies and priest coordination",
          "Decor",
          "Catering",
          "Photography and videography",
          "Entertainment",
          "Experiences in Kashi for families and guests",
          "Pre- and post-wedding travel",
        ],
      },
      {
        heading: "Venue sourcing",
        paragraphs: [
          "Varanasi offers heritage hotels on the ghats, palace and garden hotels, city hotels with lawns and ballrooms, and dedicated banquet halls and marriage lawns. We help you shortlist venues that suit your guest count, ceremonies, season and style, then approach them on your behalf and compare what each can offer. Each venue's availability, terms and charges are its own and are confirmed in writing; we do not imply exclusive access to any venue.",
        ],
      },
      {
        heading: "Guest stays, transfers and hospitality",
        paragraphs: [
          "We arrange rooms for the families and guests across one or more hotels, meet arriving guests at the airport or railway station, and plan transfers between hotels, venues and ceremonies. In the old city, where lanes are too narrow for cars, we plan walking routes and drop-off points with older guests in mind.",
        ],
      },
      {
        heading: "Ceremonies and priests",
        paragraphs: [
          "We coordinate the priests, materials and timings for the ceremonies you choose, from haldi and mehendi to the wedding itself, and any puja or Ganga ritual the families would like. Riverside ceremonies depend on the venue, the river level and any permissions required, and we confirm what is possible before planning around it.",
        ],
      },
      {
        heading: "Decor, catering, photography and entertainment",
        paragraphs: [
          "We work with decorators, caterers, photographers, videographers and performers to deliver the look, food and music you have in mind, within the agreed budget. Each supplier's scope and deliverables are set out in your proposal, and dietary requirements, including Jain and sattvic menus, are passed to the caterer in detail.",
        ],
      },
      {
        heading: "Kashi for your families and guests",
        paragraphs: [
          "Many wedding guests are visiting Varanasi for the first time. We can arrange dawn boat rides, aarti viewing, guided walks, temple visits and food trails for them around the wedding days, and add a journey to Sarnath, Prayagraj, Ayodhya or Bodh Gaya before or after.",
        ],
      },
      {
        heading: "Planning a wedding in Kashi",
        paragraphs: [
          "Auspicious dates in the wedding season draw many weddings at once, so hotels and venues are in demand. Boats and riverside events are affected by the monsoon and by local orders, and sound and timing rules apply at many venues. We raise these early so that your plans rest on what is actually possible.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Wedding planning has its own enquiry, separate from our journeys. Tell us your dates or flexibility, guest count, the events and days you are planning, rooms, any venue preference, the scope you would like us to take on and, if you wish, an indicative budget. We come back with questions, then a written proposal. Travel arrangements for wedding guests form part of that proposal. There are no prices on this page because every wedding is quoted individually.",
        ],
      },
    ],
    seo: {
      title: "Wedding in Varanasi: Venues, Guests, Ceremonies | Tourmelloh",
      description:
        "Plan a wedding in Varanasi with Tourmelloh: venue sourcing, guest stays and transfers, priests and ceremonies, decor, catering, photography and family travel.",
    },
  },
];
