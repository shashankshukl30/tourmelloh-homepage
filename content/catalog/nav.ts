/**
 * The four primary sections and their menus (brief v5, section 2 and 19).
 * Kept small on purpose: the header ships to every page.
 */
export type NavLink = { name: string; href: string; note?: string };
export type NavGroup = { title: string; links: NavLink[] };

export const journeysMenu: NavGroup[] = [
  {
    title: "By length",
    links: [
      { name: "Short stays: 2 to 3 nights", href: "/journeys?length=short" },
      { name: "4 to 5 nights", href: "/journeys?length=medium" },
      { name: "6 nights or more", href: "/journeys?length=long" },
      { name: "All packages", href: "/journeys" },
    ],
  },
  {
    title: "By destination",
    links: [
      { name: "Varanasi & Sarnath", href: "/journeys?destination=varanasi" },
      { name: "Prayagraj", href: "/journeys?destination=prayagraj" },
      { name: "Ayodhya", href: "/journeys?destination=ayodhya" },
      { name: "Chitrakoot", href: "/journeys?destination=chitrakoot" },
      { name: "Gaya & Pind Daan", href: "/journeys?destination=gaya" },
      { name: "Bodh Gaya, Rajgir & Nalanda", href: "/journeys?destination=bodh-gaya" },
      { name: "Kushinagar & Shravasti", href: "/journeys?destination=kushinagar" },
      { name: "Naimisharanya", href: "/journeys?destination=naimisharanya" },
    ],
  },
  {
    title: "Choose your comfort",
    links: [
      { name: "Standard", href: "/journeys/standard", note: "Selected 3-star stays, private car" },
      { name: "Premium", href: "/journeys/premium", note: "4-star stays, AC Innova" },
      { name: "Luxury", href: "/journeys/luxury", note: "5-star stays, luxury SUV" },
      { name: "How the tiers compare", href: "/tiers" },
    ],
  },
  {
    title: "Specialist collections",
    links: [
      { name: "Her Own Way", href: "/journeys/womens-journeys", note: "Women-only, female host" },
      { name: "SHRAVAN", href: "/journeys/shravan", note: "For parents and seniors" },
      { name: "Together", href: "/journeys/family-journeys", note: "Families and generations" },
      { name: "In the Footsteps of the Buddha", href: "/journeys/buddhist-journeys" },
      { name: "Stillness by the Ganges", href: "/journeys/wellness-in-varanasi", note: "Wellness in Varanasi" },
    ],
  },
];

export const servicesMenu: NavGroup[] = [
  {
    title: "Arrive and move",
    links: [
      { name: "Arrival & transport", href: "/services#arrival-transport" },
      { name: "Upgrade your boat ride", href: "/services/upgrade-your-boat-ride-boat-booking" },
      { name: "Stays, tickets & insurance", href: "/services#stays-tickets-insurance" },
    ],
  },
  {
    title: "People who look after you",
    links: [
      { name: "Hosts, guides & companions", href: "/services#hosts-guides-companions" },
      { name: "Family, senior & accessible travel", href: "/services#family-senior-accessible-travel" },
    ],
  },
  {
    title: "Rituals and occasions",
    links: [
      { name: "Temple, ritual & puja", href: "/services#temple-ritual-puja" },
      { name: "Occasions, dining & gifts", href: "/services#occasions-dining-gifts" },
      { name: "Photography & films", href: "/services#photography-films" },
      { name: "Specialist services", href: "/services#specialist-services" },
    ],
  },
];

export const experiencesMenu: NavGroup[] = [
  {
    title: "In Varanasi",
    links: [
      { name: "Walks", href: "/experiences/walks" },
      { name: "On the river", href: "/experiences#on-the-river" },
      { name: "Food & tastings", href: "/experiences#food-tastings" },
      { name: "Crafts & culture", href: "/experiences#crafts-culture" },
      { name: "Music", href: "/experiences#music" },
    ],
  },
  {
    title: "Sacred and beyond",
    links: [
      { name: "Sacred & ritual", href: "/experiences#sacred-ritual" },
      { name: "Varanasi Beyond the Familiar", href: "/experiences/varanasi-beyond-the-familiar", note: "Lesser-visited temples" },
      { name: "Excursions", href: "/experiences#excursions" },
      { name: "All experiences", href: "/experiences" },
    ],
  },
];

export const anchor = (category: string) => category.toLowerCase().replace(/&/g, "").replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
