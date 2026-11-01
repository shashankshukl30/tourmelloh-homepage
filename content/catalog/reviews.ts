import type { Review } from "./types";

/**
 * Genuine guest reviews, each with recorded publication consent, go here with status "published".
 * The homepage section ("In their words") shows them on tourmelloh.com as soon as one exists.
 *
 * The SAMPLE entries below exist only so the client can see the section on preview builds. They are
 * status "draft" + sample: true, never render on production, and the validator refuses to publish them.
 * Replace them with real reviews (name as the guest agrees, place, package, month, rating, consent date).
 */
const consentPending = { recordedOn: "", scope: "" };

export const reviews: Review[] = [
  { id: "SAMPLE-1", sample: true, status: "draft", kind: "written", order: 1, rating: 5, month: "Sample", consent: consentPending,
    name: "Sample guest", place: "Mumbai", journey: "First Impressions of Varanasi",
    text: "Everything was arranged before we landed: the car at the airport, the boat for the evening aarti and an early darshan at Kashi Vishwanath. We never had to chase anyone." },
  { id: "SAMPLE-2", sample: true, status: "draft", kind: "written", order: 2, rating: 5, month: "Sample", consent: consentPending,
    name: "Sample guest", place: "Bengaluru", journey: "Varanasi at Your Pace",
    text: "We travelled with my parents, and the pace was exactly right: rest every afternoon, a wheelchair waiting at the temple and someone with us on the steps." },
  { id: "SAMPLE-3", sample: true, status: "draft", kind: "written", order: 3, rating: 5, month: "Sample", consent: consentPending,
    name: "Sample guest", place: "London", journey: "Awakening & the First Teaching",
    text: "Bodh Gaya and Sarnath with a guide who knew the history deeply. The quotation listed every hotel and every inclusion, and the trip matched it." },
  { id: "SAMPLE-4", sample: true, status: "draft", kind: "written", order: 4, rating: 5, month: "Sample", consent: consentPending,
    name: "Sample guest", place: "Delhi", journey: "Varanasi and Ayodhya Pilgrimage",
    text: "The Sarayu aarti, the Ram Mandir darshan and Kashi in one trip, without a single rushed day. Our coordinator answered on WhatsApp within minutes." },
  { id: "SAMPLE-5", sample: true, status: "draft", kind: "written", order: 5, rating: 5, month: "Sample", consent: consentPending,
    name: "Sample guest", place: "Hyderabad", journey: "A Journey of Remembrance",
    text: "The pind daan in Varanasi and Gaya was handled with care: the priest, the materials and the timings were all arranged, so we could simply be present." },
  { id: "SAMPLE-6", sample: true, status: "draft", kind: "written", order: 6, rating: 5, month: "Sample", consent: consentPending,
    name: "Sample guest", place: "Pune", journey: "Her Own Way",
    text: "Travelling with a female host made the whole group comfortable from the first evening. Safe, well paced and genuinely warm." },
];
