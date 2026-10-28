import type { City, CollectionId, Journey } from "./types";
import { journeys as sacredA } from "./journeys/sacred-a";
import { journeys as sacredB } from "./journeys/sacred-b";
import { journeys as rajasthan } from "./journeys/rajasthan";
import { journeys as heritage } from "./journeys/heritage";
import { journeys as coastHimalaya } from "./journeys/coast-himalaya";
import { cities as citiesA } from "./cities-a";
import { cities as citiesB } from "./cities-b";

export { collections } from "./collections";
export { destinations } from "./destinations";
import { experiences as general } from "./experiences";
import { experiences as varanasi } from "./experiences-varanasi";
export { articles } from "./journal";
export { pages } from "./pages";

export const journeys: Journey[] = [
  ...sacredA,
  ...sacredB,
  ...rajasthan,
  ...heritage,
  ...coastHimalaya,
];

export const experiences = [...general, ...varanasi];

export const cities: City[] = [...citiesA, ...citiesB];

export const journeysIn = (collection: CollectionId) =>
  journeys.filter((journey) => journey.collection === collection);

export const journeysThrough = (city: string) =>
  journeys.filter((journey) => journey.cities.includes(city));

export const journeysAcross = (destination: string) =>
  journeys.filter((journey) => journey.destinations.includes(destination));
