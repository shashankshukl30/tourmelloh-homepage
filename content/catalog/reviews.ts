import type { Review } from "./types";

/**
 * Guest testimonials and reviews, as supplied by Tourmelloh for publication on 2026-11-01.
 * Wording is the client's; only an obvious typo was corrected. Add new ones with status
 * "published" and the date the client (or guest) approved publication in consent.recordedOn.
 *
 * format "testimonial": a longer story with a headline, featured at the top of /reviews.
 * format "review": a short star-rated review, counted in the rating summary.
 */
const supplied = { status: "published", kind: "written", consent: { recordedOn: "2026-11-01", scope: "Supplied by Tourmelloh for tourmelloh.com" } } as const;

export const reviews: Review[] = [
  // Testimonials
  { ...supplied, id: "T01", format: "testimonial", order: 1, title: "A peaceful Varanasi getaway",
    name: "Ramesh K.", journey: "Short stays: 2 to 3 nights, Standard package", href: "/journeys/first-impressions-of-varanasi",
    text: "Booking our short 3-night stay in Varanasi & Sarnath through Tourmelloh was the best decision we made. From the seamless private car arrangements to the handpicked stays, everything was meticulously planned. We didn't have to worry about a single detail, allowing us to just immerse ourselves in the spiritual essence of the Ganges." },
  { ...supplied, id: "T02", format: "testimonial", order: 2, title: "Pilgrimage made easy for my parents",
    name: "Sunita S.", journey: "SHRAVAN package, Prayagraj & Ayodhya", href: "/journeys/shravan",
    text: "I booked the SHRAVAN package for my aging parents to visit Prayagraj and Ayodhya, and I couldn’t be more grateful. The team ensured they had an incredibly comfortable AC Innova, a thoughtful guide, and accessible 4-star stays. They felt respected, safe, and deeply cared for throughout the entire spiritual journey." },
  { ...supplied, id: "T03", format: "testimonial", order: 3, title: "Comfort and safety for a solo woman",
    name: "Priya M.", journey: "Her Own Way, Varanasi & Sarnath", href: "/journeys/womens-journeys",
    text: "As a solo female traveler, safety is my top priority. My 'Her Own Way' trip to Varanasi & Sarnath was an empowering and secure experience. Having a female host made a world of difference, and the itinerary offered the perfect blend of local insights and personal space. A beautiful, hassle-free journey." },
  { ...supplied, id: "T04", format: "testimonial", order: 4, title: "The Footsteps of the Buddha",
    name: "David L.", journey: "In the Footsteps of the Buddha, 6 nights or more", href: "/journeys/buddhist-journeys",
    text: "Our 6-night journey through Bodh Gaya, Rajgir & Nalanda was flawless. Tracing the Buddhist heritage with knowledgeable guides who truly understood the history made this more than just a tour—it was a deeply moving experience. Every accommodation and transfer was handled with absolute precision." },
  { ...supplied, id: "T05", format: "testimonial", order: 5, title: "Spiritual family journey",
    name: "The Sharma Family", journey: "Together package, Gaya & Pind Daan, Luxury tier", href: "/journeys/family-journeys",
    text: "Organizing a multi-generational trip for our family to Gaya for Pind Daan seemed daunting, but the 'Together' package made it effortless. Our luxury SUV was spacious, the 5-star stays were top-notch, and the priests and guides they arranged in Gaya made our rituals seamless. Exceptional service from start to finish." },

  // Reviews
  { ...supplied, id: "R01", format: "review", order: 11, rating: 5, title: "Spiritual peace in Varanasi",
    name: "Arpita G.", journey: "Stillness by the Ganges", href: "/journeys/wellness-in-varanasi",
    text: "A truly rejuvenating experience with the 'Stillness by the Ganges' wellness package. The morning boat ride and private rituals in Varanasi & Sarnath were unforgettable." },
  { ...supplied, id: "R02", format: "review", order: 12, rating: 5, title: "Shravan package for parents is a blessing!",
    name: "Vijay R.", journey: "SHRAVAN, Prayagraj & Ayodhya", href: "/journeys/shravan",
    text: "Sent my parents on the Prayagraj & Ayodhya pilgrimage. Exceptional planning, respectful drivers, and very comfortable stays. High recommendation for seniors." },
  { ...supplied, id: "R03", format: "review", order: 13, rating: 5, title: "Flawless Gaya & Pind Daan tour",
    name: "Amit T.", journey: "Gaya & Pind Daan", href: "/journeys/journey-of-remembrance",
    text: "They handled our visa assistance, local coordination, and rituals for the Pind Daan in Gaya perfectly. Very respectful and highly organized team." },
  { ...supplied, id: "R04", format: "review", order: 14, rating: 4, title: "Enlightening journey",
    name: "Sarah J.", journey: "Bodh Gaya & Nalanda", href: "/journeys/buddhist-journeys",
    text: "The historical and spiritual tour of Bodh Gaya & Nalanda was beautifully paced. Deducting one star only because of a small delay with our hotel check-in in Rajgir, but the 24/7 support team resolved it immediately." },
  { ...supplied, id: "R05", format: "review", order: 15, rating: 5, title: "The perfect short stay",
    name: "Rajesh M.", journey: "Varanasi & Sarnath, Standard package", href: "/journeys/first-impressions-of-varanasi",
    text: "We did a quick 3-day trip to Varanasi & Sarnath. The standard package with the private car made exploring the crowded ghats and historic sites incredibly easy." },
  { ...supplied, id: "R06", format: "review", order: 16, rating: 5, title: "Highly recommend Her Own Way!",
    name: "Neha P.", journey: "Her Own Way, Kushinagar & Shravasti", href: "/journeys/womens-journeys",
    text: "I booked the Kushinagar & Shravasti tour under the women-only package. Incredible female host, safe transport, and deep spiritual insights. I will definitely book through them again." },
  { ...supplied, id: "R07", format: "review", order: 17, rating: 4, title: "Well-organized Spiritual Tour",
    name: "Srikant B.", journey: "Chitrakoot & Naimisharanya",
    text: "Our Chitrakoot & Naimisharanya trip was excellent. The itinerary was packed but we never felt rushed. Tourmelloh took the stress out of planning these off-the-beaten-path locations." },
  { ...supplied, id: "R08", format: "review", order: 18, rating: 5, title: "Memory of a lifetime",
    name: "The Kapoors", journey: "Together, Ayodhya & Prayagraj", href: "/journeys/family-journeys",
    text: "Our family 'Together' trip to Ayodhya & Prayagraj was perfect. The premium AC Innova and comfortable accommodations made traveling with kids and elders completely stress-free." },
];

/** True once a real, consented review is live: the menu, footer and homepage show reviews from then on. */
export const hasPublishedReviews = reviews.some((r) => !r.sample && r.status === "published" && r.consent.recordedOn);
