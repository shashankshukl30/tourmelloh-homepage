import type { MediaKey } from "./media-plan";

/** Navigation data kept small on purpose: the header ships to every page. Checked by the validator. */
export const navCollections: { name: string; slug: string; photo: MediaKey; line: string }[] = [
  { name: "Sacred journeys", slug: "sacred-journeys", photo: "varanasi-vishwanath", line: "Kashi, the Char Dham, the Buddha's path" },
  { name: "Golden Triangle & Rajasthan", slug: "golden-triangle-and-rajasthan", photo: "jaipur-amber-fort", line: "Delhi, the Taj, palaces and the Thar" },
  { name: "Heritage & culture", slug: "heritage-and-culture", photo: "khajuraho-temples", line: "Awadh, Khajuraho, Hampi, old Delhi" },
  { name: "Coast & islands", slug: "coast-and-islands", photo: "andaman-radhanagar", line: "The Andamans, Kerala and Goa" },
  { name: "The Himalaya", slug: "the-himalaya", photo: "ladakh-pangong", line: "Ladakh, Kashmir, Sikkim, Himachal" },
  { name: "Wildlife & wilderness", slug: "wildlife-and-wilderness", photo: "ranthambore-tiger", line: "Tigers of Ranthambore and Central India" },
];

export const navDestinations: { name: string; slug: string }[] = [
  { name: "Uttar Pradesh", slug: "uttar-pradesh" },
  { name: "Rajasthan", slug: "rajasthan" },
  { name: "Kerala", slug: "kerala" },
  { name: "Andaman Islands", slug: "andaman-islands" },
  { name: "Ladakh", slug: "ladakh" },
  { name: "Kashmir", slug: "kashmir" },
  { name: "Uttarakhand", slug: "uttarakhand" },
  { name: "Himachal Pradesh", slug: "himachal-pradesh" },
  { name: "Sikkim & Darjeeling", slug: "sikkim-and-darjeeling" },
  { name: "Madhya Pradesh", slug: "madhya-pradesh" },
  { name: "Tamil Nadu", slug: "tamil-nadu" },
  { name: "Goa", slug: "goa" },
  { name: "Bihar", slug: "bihar" },
];

export const navCities: { name: string; slug: string }[] = [
  { name: "Varanasi", slug: "varanasi" },
  { name: "Agra", slug: "agra" },
  { name: "Jaipur", slug: "jaipur" },
  { name: "Udaipur", slug: "udaipur" },
  { name: "Delhi", slug: "delhi" },
  { name: "Leh", slug: "leh" },
  { name: "Havelock", slug: "havelock" },
  { name: "Kochi", slug: "kochi" },
];
