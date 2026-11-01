import type { Faq } from "./types";

/**
 * General FAQs, grouped. Journey pages show only their own FAQs.
 * Covers every required topic in brief v5, section 19 ("FAQs that answer actual booking doubts").
 */
export const faqGroups: { heading: string; faqs: Faq[] }[] = [
  {
    heading: "Planning and support",
    faqs: [
      {
        q: "What happens after I enquire?",
        a: "Our team reviews your selections, checks that the plan is feasible and that hotels, vehicles and other arrangements are available for your dates, and then sends you a complete written quotation. You see the full price and exactly what is included before any booking payment is requested. Submitting your preferences does not commit you to anything.",
      },
      {
        q: "How does planning work before I travel?",
        a: "A named Tourmelloh planning contact works with you from the first conversation. They ask about your dates, your party, your pace and anything that helps you travel comfortably, suggest a route and duration, and turn your choices into a day-by-day plan with travel and rest blocks. When you are happy, the same person confirms the arrangements and sends your final details.",
      },
      {
        q: "What support do I have during the journey?",
        a: "Every tier includes a named remote coordinator you can reach by phone or WhatsApp. If a train runs late, the river rises or a temple changes its timings, the coordinator rearranges what can be rearranged and tells you the options. Premium adds defined hosted assistance and selected guided visits. Luxury adds a dedicated travel concierge, with a personal host or escort scope and support hours agreed in your quotation.",
      },
      {
        q: "Do I need to know my route before I ask?",
        a: "No. Choose Help Me Plan and tell us the places or interests you have in mind, how many days you have, or ask us to recommend a duration. We design the route and explain the travel times, so you do not need to work out distances yourself.",
      },
      {
        q: "How long should my journey be?",
        a: "Our journey durations are suggested planning versions, not fixed packages. Two nights is enough for a first look at Varanasi and Sarnath; adding Prayagraj, Ayodhya or Gaya brings road days that need their own time. Travelling parents, young children or a wish for slower days usually mean an extra night. Tell us your available days, or choose Recommend duration, and we will suggest what fits.",
      },
    ],
  },
  {
    heading: "Tiers and who does what",
    faqs: [
      {
        q: "What is the difference between Standard, Premium and Luxury?",
        a: "Standard uses selected 3-star hotels, a private air-conditioned sedan or suitable equivalent, breakfast on hotel nights and a named remote coordinator. Premium moves to selected 4-star hotels, an upgraded MPV or SUV such as an Innova Crysta or equivalent, specified private boat upgrades and defined hosted assistance with selected guided visits. Luxury uses selected 4- or 5-star, heritage or boutique properties, a specifically confirmed premium vehicle, and a dedicated travel concierge, with every journey-mapped Luxury experience included. Our tiers page sets out each one in full.",
      },
      {
        q: "Does Luxury include everything on the website?",
        a: "No. Luxury includes the full offering defined for your chosen Luxury journey. It does not mean every service in our catalogue, every type of boat or unlimited staff hours, and we do not promise 5-star hotels, a Mercedes or a particular room category in every destination. Additional days, places or coverage are bespoke requests, defined and priced in your quotation.",
      },
      {
        q: "What is the difference between a remote coordinator, a travel host, a sightseeing guide and a concierge?",
        a: "The remote coordinator plans and confirms your arrangements and is reachable throughout, but does not walk with you. A travel host accompanies you for specified visits or days and looks after the practical side. A sightseeing guide explains a site or a neighbourhood for a defined session. A dedicated travel concierge, part of Luxury, looks after your whole journey within agreed hours, in person or remotely as stated. One confirmed person may hold more than one of these roles, and you are never charged twice for the same coverage.",
      },
      {
        q: "Is my driver also my guide?",
        a: "No. Drivers are there to drive you safely and on time; they are not sightseeing guides. If you would like a site explained, add a guide for that visit, or choose a tier or journey that lists guided visits.",
      },
      {
        q: "Do I need a concierge or host to enjoy the journey?",
        a: "Not necessarily. Many guests travel comfortably at Standard with a remote coordinator. Accompaniment helps most in particular situations: a parent who needs a steady arm on the ghat steps, a first visit where the lanes feel disorienting, a day with a ritual, a boat and a temple to fit together. We will suggest support where it helps and leave it out where it does not.",
      },
    ],
  },
  {
    heading: "Arrivals, pace and access",
    faqs: [
      {
        q: "How should I time my arrival and departure?",
        a: "Varanasi's airport is at Babatpur, outside the city, and the drive into the old city can be slow, so a late-morning or afternoon arrival leaves a gentle first evening. Where a programme starts at dawn or ends with an evening aarti, flight and train timings matter; each journey page notes where they affect the plan. Tell us your arrival and departure details, even approximately, and we will plan the first and last days around them.",
      },
      {
        q: "How much walking and how many steps should I expect?",
        a: "Varanasi's ghats are long flights of stone steps down to the river, and the old city is a maze of narrow lanes where cars cannot go. Temple approaches can be crowded and uneven, and boats are boarded from the ghat edge. Each journey page describes walking, steps, early starts and boarding conditions so you know before you book.",
      },
      {
        q: "Can you arrange a wheelchair or mobility assistance?",
        a: "Yes, on request. We record whether you need equipment, an assistant, or both, and assess the route before we confirm. Some ghats, lanes and temples cannot be made step-free, so we tell you plainly where a visit may be difficult rather than describe any route as fully accessible.",
      },
    ],
  },
  {
    heading: "Parents, families and women's departures",
    faqs: [
      {
        q: "I am arranging a journey for my parents. How do family updates work?",
        a: "You can be the booking contact while your parents travel. With their permission, our coordinator shares updates with you at agreed points on your preferred channel, and photographs or location only if they agree. Our SHRAVAN collection adds named accompaniment and a senior travel companion with a defined, non-medical scope at every tier.",
      },
      {
        q: "What does the female host do on a Her Own Way departure?",
        a: "She travels with the group for the hosted programme days, keeps the pace and timings, accompanies planned visits and helps with practical needs. Her exact coverage and language are stated for each departure. She is not a sightseeing guide unless guided visits are listed, and we do not promise that drivers, guides or hotel staff are all women.",
      },
      {
        q: "What are the minimum group conditions for women's departures?",
        a: "Each departure needs a minimum number of confirmed travellers, shown on the departure once its dates are approved. Registering interest or enquiring does not count towards the minimum and does not confirm a booking. We confirm the departure and the complete price before requesting booking payment. If the minimum is not reached, you can choose another date or ask for a private journey, quoted separately.",
      },
      {
        q: "Can you plan around young children?",
        a: "Yes. We ask for children's ages, room arrangements, meal preferences, nap and rest needs at the start. Cots, child seats and childcare are arranged on request and confirmed with the hotel or provider before they are included.",
      },
    ],
  },
  {
    heading: "River, temples and changes on the day",
    faqs: [
      {
        q: "What happens if the boat cannot run?",
        a: "Boats on the Ganga depend on river level, weather, fog and orders from the local authorities. In the monsoon months the river can rise high enough to stop boats altogether. If a boat cannot run, your coordinator offers what is realistic: another session, a different boarding point, or a walk along the ghats instead. How an included element that could not run is treated is set out in your quotation's terms.",
      },
      {
        q: "Can you arrange darshan without queues?",
        a: "No one can promise that. Each temple sets its own rules, timings and queue systems, and crowds change with festivals and seasons. We plan visits at sensible hours, arrange any official facility the temple itself offers where one is available, and at Premium and Luxury provide accompanied assistance within a stated scope. We never offer VIP or unrestricted access.",
      },
      {
        q: "What if weather, a festival or a closure changes the plan?",
        a: "We tell you as soon as we know, explain the options, and reorder the days where we can. Some things, such as a temple closure or a road restriction during a festival, cannot be worked around, and we would rather say so than promise otherwise.",
      },
    ],
  },
  {
    heading: "Hotels, vehicles and extras",
    faqs: [
      {
        q: "When are my hotels and vehicle confirmed?",
        a: "Your quotation names the hotels, room categories and vehicle we propose, as far as they can be confirmed at that stage. After you accept and the booking advance is received, we confirm each arrangement with the supplier and tell you in writing. If something cannot be confirmed, we explain the alternatives and never downgrade you without asking.",
      },
      {
        q: "Will I see prices for extras before my quotation?",
        a: "Only where an extra has an approved fixed price, shown with its currency, tax, unit, minimum and validity. Everything else says Quoted for your journey. If you select priced extras, My Journey may show a Known extras subtotal, but that is never your trip total: the journey itself and any unpriced items appear only in your complete quotation.",
      },
      {
        q: "What if I add something that is already included?",
        a: "My Journey shows it as Included, so you are not charged twice. Linked records, such as a ritual shown both as an experience and as a service, are one booking. Choosing a private boat replaces the included ride for the same session rather than adding a second boat, and any difference appears in your quotation.",
      },
      {
        q: "What happens to my selections if I change tier?",
        a: "Moving up to Luxury absorbs any paid extras that Luxury already includes and removes the duplicate charge. Moving down shows what would no longer be included and asks whether to keep each item as a request. Nothing you selected is removed without telling you.",
      },
    ],
  },
  {
    heading: "Payments, cancellations and confirmation",
    faqs: [
      {
        q: "When do I pay?",
        a: "Not before your quotation. Submitting your preferences is free and needs no payment. Once you have the complete written quotation and accept it, we request a booking advance under the terms set out in that quotation.",
      },
      {
        q: "Does paying the advance confirm everything?",
        a: "Payment begins the confirmation process; it does not by itself confirm every supplier. We confirm hotels, vehicles, boats, priests, guides and other arrangements with each supplier and tell you in writing as they are confirmed. Anything that cannot be confirmed is explained, with alternatives.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellation terms depend on the suppliers, season and arrangements in your journey, so they are set out in each quotation. Please read them before you accept. If you have a question about them, ask us before paying anything.",
      },
      {
        q: "Is my enquiry a booking?",
        a: "No. An enquiry, a saved My Journey or a WhatsApp message is a request for a personalised quotation, not a confirmed booking. Nothing is booked until you accept a quotation and we confirm the arrangements.",
      },
    ],
  },
];
