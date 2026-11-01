import type { Review } from "./types";

/**
 * Genuine guest reviews, each with recorded publication consent, go here with status "published"
 * and no `sample` flag. The homepage slider, the /reviews page and the menu link appear on
 * tourmelloh.com as soon as one exists.
 *
 * The SAMPLE entries below show the client the finished design on preview builds only. They are
 * status "draft" + sample: true: production never renders them and the validator refuses to publish
 * them. Delete them when the real reviews are in.
 */
const consentPending = { recordedOn: "", scope: "" };
const sample = { sample: true, status: "draft", kind: "written", consent: consentPending } as const;

export const reviews: Review[] = [
  { ...sample, id: "SAMPLE-01", order: 1, rating: 5, month: "October 2026", journeyId: "P05", journey: "Varanasi and Ayodhya Pilgrimage",
    name: "Ritika S.", place: "Mumbai",
    text: "We took my in-laws to Ayodhya and Kashi for their fortieth anniversary. The darshan timings were planned around their knees, not around a checklist, and the car was always waiting close to the gate. My mother-in-law still talks about the Sarayu aarti." },
  { ...sample, id: "SAMPLE-02", order: 2, rating: 5, month: "February 2026", journeyId: "P01", journey: "First Impressions of Varanasi",
    name: "James & Helen W.", place: "Manchester, UK",
    text: "Our first time in India, and we were nervous about Varanasi. We needn't have been. We were met at the airport, the dawn boat was ours alone, and every evening someone checked whether the next day's plan still suited us." },
  { ...sample, id: "SAMPLE-03", order: 3, rating: 5, month: "March 2026", journeyId: "P09", journey: "A Journey of Remembrance",
    name: "Suresh I.", place: "Hyderabad",
    text: "We came for my father's pind daan in Varanasi and Gaya. The priest, the samagri and the timings were arranged in both cities, and each step was explained to us the evening before. At a hard time, we only had to be present." },
  { ...sample, id: "SAMPLE-04", order: 4, rating: 5, month: "January 2026", journeyId: "P14", journey: "Awakening & the First Teaching",
    name: "Mei L.", place: "Singapore",
    text: "Bodh Gaya before sunrise, ahead of the crowds, was the reason we came. Our guide knew the sites deeply and never hurried our meditation. The written quotation matched the trip down to the last transfer." },
  { ...sample, id: "SAMPLE-05", order: 5, rating: 5, month: "September 2026", journeyId: "P02", journey: "Varanasi at Your Pace",
    name: "Rajeev & Anjali T.", place: "New Delhi",
    text: "My father uses a walker, and that shaped every part of the plan: ramps checked in advance, a wheelchair at the temple, rest every afternoon. It was the first trip in years where he wasn't exhausted by noon." },
  { ...sample, id: "SAMPLE-06", order: 6, rating: 4, month: "December 2025", journeyId: "P03", journey: "The Many Moods of Varanasi",
    name: "Aarav & Nisha K.", place: "Bengaluru",
    text: "Loved the breakfast walk and the old-city lanes. The one miss was traffic on the way to Sarnath, which cost us an hour, but our coordinator moved lunch so we still had time in the museum. Would book again." },
  { ...sample, id: "SAMPLE-07", order: 7, rating: 5, month: "November 2025", journeyId: "P04", journey: "Varanasi and Prayagraj Pilgrimage",
    name: "Kavita M.", place: "Pune",
    text: "The Sangam boat at sunrise and a calm, unhurried darshan at Kashi Vishwanath. The hotels were exactly the ones named in our quote, and small things, like a car seat for our daughter, were there without asking twice." },
  { ...sample, id: "SAMPLE-08", order: 8, rating: 5, month: "October 2025", journeyId: "P11", journey: "Sarnath and Kushinagar Buddhist Journey",
    name: "Daniel R.", place: "Melbourne, Australia",
    text: "Sarnath to Kushinagar is a long drive, and they made it easy: a comfortable car, a careful driver and a lunch stop that turned out to be a highlight. Kushinagar at dusk was deeply moving." },
  { ...sample, id: "SAMPLE-09", order: 9, rating: 5, month: "January 2026", journeyId: "P03", journey: "The Many Moods of Varanasi",
    name: "Ananya R.", place: "Kolkata",
    text: "I travelled alone and felt looked after without feeling watched. A woman host joined me for the evening aarti and the lanes, and the hotel they chose was quiet, safe and a short walk from the ghats." },
  { ...sample, id: "SAMPLE-10", order: 10, rating: 5, month: "July 2026", journeyId: "P18", journey: "Ayodhya Pilgrimage",
    name: "Pooja V.", place: "Ahmedabad",
    text: "Ram Mandir darshan with my parents went smoothly from start to finish. We were told exactly what to carry and where to leave our phones, which saved a lot of stress at security." },
  { ...sample, id: "SAMPLE-11", order: 11, rating: 4, month: "April 2026", journeyId: "P06", journey: "The Sacred Confluence",
    name: "Neha & Karan B.", place: "Gurugram",
    text: "Three cities in six days sounded rushed, but the pacing worked. The April afternoons were hot, so we would travel earlier in the year next time. That is on us, not them. Everything they promised, they delivered." },
  { ...sample, id: "SAMPLE-12", order: 12, rating: 5, month: "March 2026", journeyId: "P15", journey: "Sarnath, Bodh Gaya, Rajgir and Nalanda",
    name: "Sarah & Tom H.", place: "Toronto, Canada",
    text: "Nalanda and Rajgir were the surprise of the trip. Our guide brought the ruins to life, and every transfer between Uttar Pradesh and Bihar ran without a hitch." },
];

/** True once a real, consented review is live. The menu link on tourmelloh.com waits for this. */
export const hasPublishedReviews = reviews.some((r) => !r.sample && r.status === "published" && r.consent.recordedOn);
