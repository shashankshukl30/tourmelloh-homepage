import type { PageCopy } from "./types";

/**
 * Company pages. On the `faq` page each section is a group, and its
 * `paragraphs` come in pairs: the question (ending in "?"), then its answer.
 */
export const pages: PageCopy[] = [
  {
    slug: "about",
    title: "About Tourmelloh",
    display: ["Our", "story"],
    hero: "varanasi-ghats-dawn",
    lead: "Tourmelloh is a private travel house based in Varanasi, on the banks of the Ganga. We design journeys across India for travellers who want the country shown properly: the right hotel, the right guide, the right hour in the right place, and one team accountable for all of it.",
    sections: [
      {
        heading: "Why Varanasi",
        paragraphs: [
          "We work from one of the oldest living cities on earth, and it shapes how we think about travel. Varanasi does not reward hurry. The ghats are best before six, the lanes need someone who knows them, and its most affecting moments, an aarti seen from the water, a conversation at a weaver's loom, a boat holding back from the cremation fires, ask for patience and respect rather than a schedule.",
          "We carry that way of seeing into every journey we design, whether it begins on the Ganga or a long way from it.",
        ],
      },
      {
        heading: "What we do",
        paragraphs: [
          "We design private journeys across India: the sacred cities of the north, the palaces and deserts of Rajasthan, the tiger forests of Central India, the monasteries of Ladakh, the backwaters of Kerala and the islands of the Andaman Sea. Each journey is built for one party, around the people travelling, their dates and the pace that suits them.",
          "The journeys on this site are starting points rather than fixed packages. Change anything you like, or begin with an idea of your own.",
        ],
      },
      {
        heading: "How we think about luxury",
        paragraphs: [
          "Luxury, to us, is mostly invisible. It is a car that is waiting before you reach the top of the steps, a guide who knows when to stop talking, a table by the window you wanted, a late checkout after a dawn start. It is the right room in the right hotel, chosen for what it looks onto.",
          "It is also honesty: telling you when a season is wrong for a place, when a temple queue will be long, or when a day is trying to do too much.",
        ],
      },
      {
        heading: "Plain dealing",
        paragraphs: [
          "We do not publish prices, because no two journeys cost the same. Every journey is quoted in a written proposal that sets out exactly what is included.",
          "We do not promise what India cannot. Temple access, ceremonies, safari sightings, helicopter seats and permits all depend on authorities, operators and the weather. We book official services, such as Sugam Darshan at Kashi Vishwanath or safari permits at Ranthambore, on your behalf and subject to availability, and we tell you early if something cannot be done.",
        ],
      },
      {
        heading: "Talk to us",
        paragraphs: [
          "Every Tourmelloh journey begins with a conversation. Tell us when you would like to travel, who is coming and what you hope to feel, and we will come back with ideas.",
          "You can reach us by phone or WhatsApp on +91 77069 97271, or by email at tourmelloh@gmail.com.",
        ],
      },
    ],
    seo: {
      title: "About Tourmelloh: Private Journeys from Varanasi, India",
      description:
        "Tourmelloh is a private travel house in Varanasi that designs journeys across India, with the right hotels, guides and timing, and honest advice throughout.",
    },
  },
  {
    slug: "how-we-travel",
    title: "How we travel",
    display: ["The Tourmelloh", "way"],
    hero: "luxury-palace-courtyard",
    lead: "Private, unhurried and properly arranged. Those three ideas cover most of what we believe about travel in India. This page explains how we put them into practice, from the first conversation to the morning you fly home.",
    sections: [
      {
        heading: "Private, always",
        paragraphs: [
          "Every journey is for your party alone. Your car and chauffeur are yours for the whole trip, your guides are booked for you rather than shared, and the experiences we arrange, from a boat on the Ganga to a table on the dunes, are private wherever private is possible.",
          "Where a place is shared by nature, such as a temple ceremony, a safari zone or a great monument, we arrange the details that give you space: the right hour, the quieter entrance and someone to look after you.",
        ],
      },
      {
        heading: "Unhurried by design",
        paragraphs: [
          "India rewards those who give it time. We plan fewer places and longer stays, with room between the big moments, because a dawn on the river or a tiger drive means more when you are not already thinking about the next transfer.",
          "Long drives are broken at good places to stop. Early starts are followed by quiet afternoons. We would rather you left a place wanting more of it than ticked it off.",
        ],
      },
      {
        heading: "Properly arranged",
        paragraphs: [
          "Good travel depends on details most travellers never see. We match hotels and rooms to the people staying in them. We book official services, such as temple darshan, safari permits and helicopter seats, in your names as soon as they open, and we tell you plainly what depends on authorities, operators or the weather.",
          "Each guide is briefed on who you are and what you hope for, and throughout the journey you have a dedicated Tourmelloh contact.",
        ],
      },
      {
        heading: "From first conversation to return",
        paragraphs: [
          "However simple or ambitious the journey, it follows the same careful path.",
        ],
        points: [
          "A first conversation about your dates, your party, your interests and the pace that suits you.",
          "A suggested route and hotels, with honest notes on seasons, distances and what to expect.",
          "A written proposal with the full itinerary, what is included and the price for your journey.",
          "Refinements until it is right, then confirmation and the bookings that secure it.",
          "Final travel documents with your day-by-day plan and every contact you need.",
          "Meet-and-assist on arrival, your own chauffeur and guides, and a Tourmelloh contact throughout.",
          "A conversation once you are home, to hear what worked and what we could do better.",
        ],
      },
      {
        heading: "Elders, children and particular needs",
        paragraphs: [
          "Travelling with grandparents, young children or anyone with particular needs changes what a good day looks like. We ask about mobility, diet and health at the start, choose hotels with lifts and level access where they matter, find the easiest boarding points for boats, and build rest into the day.",
          "Nothing is assumed. Tell us what helps, and we arrange around it.",
        ],
      },
      {
        heading: "Respect for places and people",
        paragraphs: [
          "Much of travel in India takes you into living places of worship, and into people's homes and workplaces. We brief you on dress, photography and conduct before each visit, and plan time with weavers, printers and families so that they are hosts rather than exhibits.",
        ],
      },
    ],
    seo: {
      title: "How We Travel: Private, Unhurried Journeys | Tourmelloh",
      description:
        "How Tourmelloh designs private journeys across India: your own car and guides, unhurried days, official services booked properly and a contact throughout.",
    },
  },
  {
    slug: "faq",
    title: "Frequently asked questions",
    display: ["Frequently asked", "questions"],
    hero: "varanasi-chai",
    lead: "Answers to common questions about planning, travelling and booking a private journey with Tourmelloh. If yours is not here, write to us or send a message on WhatsApp.",
    sections: [
      {
        heading: "Planning",
        paragraphs: [
          "How far ahead should we plan?",
          "For most journeys, three to six months gives the best choice of hotels and guides. Peak dates, such as Christmas and New Year, Diwali, Dev Deepawali in Varanasi or the opening weeks of the Char Dham season, are worth planning earlier. Shorter notice is often possible, and we will tell you honestly what is still available.",
          "Can you change the journeys on this site?",
          "Yes. Every journey here is a starting point. We can change the length, the pace, the hotels and the order of places, combine two journeys, or design something new around your dates and interests.",
          "When is the best time to travel in India?",
          "It depends on where you want to go. October to March suits most of the plains, Rajasthan and the south. Ladakh is best from May to September, the Char Dham temples are open roughly from May to October or November, and the Andaman Islands are at their best from October to May. We match the route to your dates, or the dates to the route.",
          "Do you plan journeys for families with elders or young children?",
          "Yes. We plan around mobility, diet, rest and health from the start, with hotels that have lifts and level access where they matter, easier boarding points for boats, and shorter days. Tell us what helps and we arrange around it.",
        ],
      },
      {
        heading: "On the journey",
        paragraphs: [
          "Will we have our own car and guide?",
          "Yes. Every journey includes a private chauffeur-driven car for transfers and touring, and private English-speaking guides at each destination. Guides in other languages can be arranged on request, subject to availability.",
          "Can you arrange temple darshan and special access?",
          "We book official services on your behalf, such as Sugam Darshan at Kashi Vishwanath, Char Dham helicopter seats or safari zone permits, as soon as they open and subject to availability. Access to temples, ceremonies and protected areas is set by the authorities and can change, so we never promise what is not ours to give.",
          "Who do we call if something changes during the trip?",
          "You have a dedicated Tourmelloh contact throughout your journey, as well as your chauffeur and guides. If a flight is delayed, the weather turns or you simply want a slower day, we adjust the plan with you.",
          "Can you cater for dietary needs?",
          "Yes. Vegetarian, Jain, vegan and most other dietary needs are straightforward in India. Tell us at the start and we will brief your hotels and guides, and steer you to the best of the local table.",
        ],
      },
      {
        heading: "Booking & payment",
        paragraphs: [
          "How much does a journey cost?",
          "Every journey is priced individually, because hotels, seasons, room types and experiences all change the cost. Pricing is on request: tell us your dates and preferences, and we will send a written proposal with the full price for your journey.",
          "How do we confirm a booking?",
          "Once you are happy with the written proposal, you accept it in writing and pay the deposit it sets out. We then secure your hotels, guides and services and send written confirmation. The balance is due before travel, on the date given in your proposal.",
          "What happens if we need to cancel?",
          "Cancellation terms follow the hotels, airlines and operators in your journey, so they differ from trip to trip. They are set out in full in your written proposal before you pay anything, and our booking terms explain how this works in general.",
          "Are flights and travel insurance included?",
          "International flights and travel insurance are not included. Domestic flights and trains are included when they are part of your itinerary. We strongly recommend comprehensive travel insurance from the moment you book.",
        ],
      },
      {
        heading: "Practicalities",
        paragraphs: [
          "Do we need a visa for India?",
          "Most foreign nationals need a visa, and many nationalities can apply for an e-Visa through the Government of India's official portal. Requirements vary by passport and change from time to time, so check the official guidance before booking flights. Overseas Citizens of India travel on their passport and OCI card instead of a visa.",
          "Do we need any permits?",
          "Some places require them. Parts of Ladakh need permits, foreign nationals need Protected Area Permits for certain regions, and safari zones and some sites need timed entry passes. We tell you what your route needs and arrange it on your behalf wherever that is allowed.",
          "What should we pack?",
          "Light, breathable layers for most of India, with clothes that cover shoulders and knees for temples and mosques. Add warm layers for winter mornings in the north, and for the mountains at any time of year. Shoes that slip off easily make temple visits simpler.",
          "Is India safe for travellers?",
          "Travelling privately, with your own car, guides and a contact throughout, removes much of the uncertainty. We follow local conditions and official advisories closely, and will always tell you if anything affects your plans.",
        ],
      },
    ],
    seo: {
      title: "Frequently Asked Questions on Private Travel | Tourmelloh",
      description:
        "Answers on planning, travelling and booking a private journey across India with Tourmelloh: seasons, guides, darshan and permits, payments and visas.",
    },
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    display: ["Privacy", "policy"],
    lead: "This policy explains what personal information Tourmelloh collects through this website and while planning your journey, why we collect it, how we look after it, and the rights you have under Indian law.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Tourmelloh is a private travel company based in Varanasi, Uttar Pradesh, India. For the purposes of India's Digital Personal Data Protection Act, 2023 (the DPDP Act) and the rules made under it, we are the data fiduciary for the personal data described in this policy.",
          "You can contact us about anything in this policy at tourmelloh@gmail.com or on +91 77069 97271.",
        ],
      },
      {
        heading: "What we collect",
        paragraphs: [
          "We collect only what we need to answer your enquiry and plan your journey.",
        ],
        points: [
          "Contact details: your name, email address and phone or WhatsApp number.",
          "Travel details: your dates, destinations, the number and ages of travellers, your interests and any preferences you choose to share.",
          "Details you volunteer about health, mobility or diet, so that we can plan safely. Please share only what you are comfortable sharing.",
          "If you book: the passport, identity and other details that hotels, airlines, transport operators and authorities require, for example for hotel registration, safari permits or temple services.",
          "Technical information: like most websites, our hosting provider records basic data such as IP address, browser type and the pages requested, to keep the site secure and working.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use your information to reply to your enquiry, prepare proposals, make and manage the bookings you ask for, and stay in touch with you before, during and after your journey. We also use it to meet our legal obligations, such as keeping tax and accounting records.",
          "We do not sell your personal data, rent it or share it for anyone else's marketing. We will send you news or offers only if you have asked us to, and you can stop them at any time.",
        ],
      },
      {
        heading: "Your consent",
        paragraphs: [
          "When you send us an enquiry, you consent to our using the details you provide for the purposes described in this policy. You can withdraw your consent at any time by writing to tourmelloh@gmail.com. Withdrawing consent does not affect anything done before, but it may mean we can no longer plan or operate your journey.",
          "If you send us details about other travellers, please make sure they have agreed. Where those travellers are children, we rely on you, as their parent or guardian, to give consent on their behalf, and we ask only for what the journey needs.",
        ],
      },
      {
        heading: "Who we share it with",
        paragraphs: [
          "We share your information only with those who need it to deliver your journey: hotels, airlines and transport providers, guides, experience operators, and the authorities that issue permits, darshan passes and safari entries. We also use everyday service providers, such as our email, messaging and website hosting services, some of which, including email and WhatsApp, may store data on servers outside India.",
          "We may disclose information where the law requires it, or to protect the safety of a traveller.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep enquiry details for as long as we need them to answer and plan, and booking records for as long as the law requires. When information is no longer needed, we delete it. If an enquiry does not lead to a journey, you can ask us to delete your details at any time.",
        ],
      },
      {
        heading: "How we protect it",
        paragraphs: [
          "We take reasonable security measures to protect your personal data against loss, misuse and unauthorised access, and we limit access to those who need it. No method of sending information over the internet is completely secure, so please do not send passport scans or payment details by ordinary email unless we have agreed a channel for them with you.",
          "If a personal data breach affects you, we will inform you and the Data Protection Board of India as the law requires.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: ["Under the DPDP Act, you have the right to:"],
        points: [
          "ask what personal data we hold about you and how we use it;",
          "ask us to correct, complete or update it;",
          "ask us to erase it, unless we are required by law to keep it;",
          "withdraw any consent you have given;",
          "have a grievance about our handling of your data addressed by us;",
          "nominate another person to exercise these rights if you die or become unable to do so.",
        ],
      },
      {
        heading: "Making a request or complaint",
        paragraphs: [
          "To use any of these rights, or to ask us to delete your data, write to tourmelloh@gmail.com from the address you used with us, or call us on +91 77069 97271. We may need to confirm your identity before acting, and we will respond within a reasonable time and within any period the law sets.",
          "If you are not satisfied with how we have handled a grievance, you may complain to the Data Protection Board of India.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "This website does not use cookies for advertising or to track you across other sites. If we introduce analytics or other non-essential cookies in future, we will update this policy and, where the law requires, ask for your consent first.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy as our services or the law change. The current version is always on this page.",
          "Last updated: October 2026.",
        ],
      },
    ],
    seo: {
      title: "Privacy Policy: How We Handle Your Data | Tourmelloh",
      description:
        "How Tourmelloh collects, uses and protects the details you share in an enquiry, and your rights under India's Digital Personal Data Protection Act, 2023.",
    },
  },
  {
    slug: "terms",
    title: "Terms of use",
    display: ["Terms", "of use"],
    lead: "These terms govern your use of tourmelloh.com. By using the site, you agree to them. Bookings are covered separately by our booking terms and by the written proposal for your journey.",
    sections: [
      {
        heading: "About this website",
        paragraphs: [
          "This website is operated by Tourmelloh, a travel company based in Varanasi, Uttar Pradesh, India. It describes the journeys and experiences we can arrange and lets you send us an enquiry. You can reach us at tourmelloh@gmail.com or on +91 77069 97271.",
        ],
      },
      {
        heading: "Information on the site",
        paragraphs: [
          "We take care to keep the information on this site accurate, but travel in India changes constantly. Opening days, temple and ceremony timings, seasons, permit rules and hotel facilities are set by others and may change without notice.",
          "The itineraries, suggested hotels (always shown as \"or similar\") and experiences on this site are examples to help you plan, not offers. Nothing on the site is a booking or a confirmed price until it appears in a written proposal that you accept.",
        ],
      },
      {
        heading: "Photographs and descriptions",
        paragraphs: [
          "Photographs illustrate places and experiences and may not show the exact room, vehicle, season or conditions you will find. Wildlife sightings, weather, views and access to ceremonies can never be promised.",
        ],
      },
      {
        heading: "Enquiries",
        paragraphs: [
          "When you send an enquiry, please give accurate details. Sending an enquiry does not create a booking or any obligation on either side. We use the information you provide as described in our privacy policy.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: ["When using this website, you agree not to:"],
        points: [
          "use it for anything unlawful, or in a way that could damage it or affect other users;",
          "try to gain unauthorised access to the site, its servers or any connected systems;",
          "copy, scrape or republish its text, photographs or design for commercial purposes without our written permission;",
          "send enquiries in someone else's name or with false information.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The text, design, logo and other material on this site belong to Tourmelloh or are used under licence from their owners. You may view and print pages for your own personal, non-commercial use, such as planning a trip. Any other use needs our written permission.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "The site may link to other websites, such as official booking portals, maps or messaging services. We do not control them and are not responsible for their content, availability or privacy practices.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "We provide this website as it is. To the extent the law allows, we are not liable for any loss arising from your use of the site or from reliance on its general information. Nothing in these terms limits any liability that cannot be limited under Indian law, including your rights under the Consumer Protection Act, 2019.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India. Any dispute relating to this website is subject to the jurisdiction of the courts at Varanasi, Uttar Pradesh.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The version on this page applies from the date it is published.",
          "Last updated: October 2026.",
        ],
      },
    ],
    seo: {
      title: "Website Terms of Use for tourmelloh.com | Tourmelloh",
      description:
        "The terms that govern your use of tourmelloh.com: the information on the site, enquiries, acceptable use, intellectual property and the governing law.",
    },
  },
  {
    slug: "booking-terms",
    title: "Booking terms",
    display: ["Booking", "terms"],
    lead: "How quotes, confirmations, payments, changes and cancellations work with Tourmelloh. These are the general principles. The specific amounts, dates and conditions for your journey are set out in your written proposal, because they follow the policies of the hotels, airlines and operators involved.",
    sections: [
      {
        heading: "Quotes and proposals",
        paragraphs: [
          "Every journey is priced individually. After our conversations, we send a written proposal setting out the itinerary, hotels and room types, what is included and excluded, the total price, the payment schedule and the cancellation terms.",
          "Prices depend on availability and are held only for the period stated in the proposal. Until a booking is confirmed, hotels and services are not reserved, and prices can change if suppliers change theirs.",
        ],
      },
      {
        heading: "Confirming your booking",
        paragraphs: [
          "Your booking is confirmed when you accept the proposal in writing and we receive the deposit it specifies. We then secure the hotels, guides, vehicles and services named in your itinerary, and send you written confirmation.",
          "Some elements, such as peak-season hotels, helicopter seats, safari permits or temple services, can be secured only once they are paid for, or once the issuing authority opens bookings. We will tell you which these are.",
        ],
      },
      {
        heading: "Payment schedule",
        paragraphs: [
          "Your proposal sets out how much is payable as a deposit and when the balance is due. Hotels, airlines and operators have their own deadlines, and our schedule follows them, so it differs from journey to journey and season to season.",
          "Some items, such as certain flights, permits and festival-period stays, may need full payment at the time of booking. Accepted payment methods and applicable taxes, such as GST, are confirmed in writing.",
        ],
      },
      {
        heading: "Changes by you",
        paragraphs: [
          "If you want to change your journey after confirmation, tell us as early as you can. We will do our best to make it happen, but changes depend on availability and on each supplier's conditions, and may carry costs set by them. We will always tell you what a change costs before we make it.",
        ],
      },
      {
        heading: "Cancellation by you",
        paragraphs: [
          "If you need to cancel, please tell us in writing. Cancellation charges depend on how close to travel you cancel and on the terms of the hotels, airlines and operators already booked, and some services become non-refundable as soon as they are paid for.",
          "The charges that apply to your journey are set out in your written proposal before you pay. We strongly recommend travel insurance that covers cancellation.",
        ],
      },
      {
        heading: "Changes by us or our suppliers",
        paragraphs: [
          "Occasionally a hotel, airline, operator or authority changes or cancels a service, or circumstances make part of a journey unsafe or impossible. Temples, ceremonies, safari zones, helicopter flights, boat rides and mountain roads all depend on the weather, the authorities and the operators.",
          "When that happens, we will tell you promptly, offer the best available alternative, and pass on any refund we receive for services not provided.",
        ],
      },
      {
        heading: "Events beyond anyone's control",
        paragraphs: [
          "Neither we nor our suppliers can be held responsible for delays, changes or cancellations caused by events beyond reasonable control, such as extreme weather, natural disasters, epidemics, civil unrest, strikes or government action. In such cases we will help you rearrange your plans, and refunds will follow what suppliers are able to return.",
        ],
      },
      {
        heading: "Your responsibilities",
        paragraphs: ["To keep your journey running smoothly, we ask that you:"],
        points: [
          "hold a valid passport, visa or identity document, and any permits we tell you are needed;",
          "tell us about health conditions, mobility needs and dietary requirements that may affect your journey;",
          "follow the rules of temples, monuments, parks and other places you visit, and the safety instructions of guides, pilots and operators;",
          "take out travel insurance that suits your journey and your health.",
        ],
      },
      {
        heading: "Our responsibilities",
        paragraphs: [
          "We are responsible for arranging the services in your confirmed itinerary with reasonable care and skill, choosing suppliers carefully and looking after you throughout. Hotels, airlines, transport and experience operators are independent businesses, and their own terms apply to the services they provide. Nothing in these terms affects your rights under the Consumer Protection Act, 2019.",
        ],
      },
      {
        heading: "Concerns and complaints",
        paragraphs: [
          "If something is not right during your journey, tell your guide or your Tourmelloh contact straight away, so that we can try to put it right on the spot. If you are still unhappy, write to tourmelloh@gmail.com and we will respond.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These booking terms and your written proposal are governed by the laws of India, and disputes are subject to the jurisdiction of the courts at Varanasi, Uttar Pradesh. Where your proposal and these general terms differ, your proposal applies.",
        ],
      },
    ],
    seo: {
      title: "Booking Terms: Quotes, Payments, Cancellations | Tourmelloh",
      description:
        "How quotes, confirmation, payment schedules, changes and cancellations work with Tourmelloh. Exact amounts and dates are set in each written proposal.",
    },
  },
];
