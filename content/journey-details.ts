import type { JourneyDetail } from "./journey-types";
import { kashiJourney } from "./journeys/kashi";
import { sacredJourney } from "./journeys/sacred";
import { buddhistJourney } from "./journeys/buddhist";
import { heritageJourney } from "./journeys/heritage";
import { ayodhyaJourney } from "./journeys/ayodhya";
import { lucknowJourney } from "./journeys/lucknow";
import { brajJourney } from "./journeys/braj";

export type { DayPlan, JourneyDetail } from "./journey-types";

export const journeyDetails: JourneyDetail[] = [
  kashiJourney,
  sacredJourney,
  buddhistJourney,
  heritageJourney,
  ayodhyaJourney,
  lucknowJourney,
  brajJourney,
];
