import { articles, cities, collections, destinations, experiences, journeys, pages } from "@/content/catalog";
import { media } from "@/content/catalog/media";
import type { MediaKey } from "@/content/catalog/media-plan";
import { duration } from "@/components/catalog/cards";
import type { SearchEntry } from "@/lib/search";

/** Names a traveller might use that the copy itself may not. */
const ALIASES: Record<string, string> = {
  varanasi: "kashi banaras benares ganga ganges ghats aarti",
  prayagraj: "allahabad sangam triveni kumbh",
  "bodh-gaya": "bodhgaya buddha enlightenment mahabodhi",
  vrindavan: "mathura braj brij krishna",
  kochi: "cochin fort kochi",
  alleppey: "alappuzha backwaters houseboat",
  havelock: "swaraj dweep radhanagar",
  "port-blair": "sri vijaya puram andaman",
  leh: "ladakh",
  srinagar: "kashmir dal lake",
  delhi: "new delhi old delhi capital",
  "andaman-islands": "andamans havelock neil beach scuba islands",
  "golden-triangle-and-rajasthan": "golden triangle delhi agra jaipur palaces",
  "sacred-journeys": "pilgrimage yatra spiritual temple dham",
  "wildlife-and-wilderness": "tiger safari jungle national park",
  "coast-and-islands": "beach islands sea",
  "the-himalaya": "mountains snow hills himalayas",
};

/** Journey-specific words people search for. */
const JOURNEY_TAGS: Record<string, string> = {
  "andaman-for-two": "honeymoon honeymoon couples romantic anniversary",
  "udaipur-lakes-and-palaces": "honeymoon couples romantic anniversary",
  "kerala-backwaters-and-hills": "honeymoon couples families",
  "kashmir-gardens-and-meadows": "honeymoon couples snow",
  "goa-beyond-the-beaches": "honeymoon couples beach",
  "kerala-ayurveda-retreat": "wellness spa detox",
  "char-dham-by-helicopter": "yatra pilgrimage helicopter chardham",
  "kedarnath-and-badrinath-by-helicopter": "do dham yatra helicopter",
  "tigers-of-central-india": "tiger safari wildlife kanha bandhavgarh",
  "ranthambore-tiger-weekend": "tiger safari wildlife weekend",
};

const thumb = (key: MediaKey) => ({ src: media[key].src, blur: media[key].blur });
const short = (text: string, words = 26) => {
  const list = text.split(/\s+/);
  return list.length > words ? `${list.slice(0, words).join(" ")}…` : text;
};

export function buildSearchIndex(): SearchEntry[] {
  return [
    ...journeys.map((j) => ({
      id: j.slug, kind: "Journey" as const, title: j.title, href: `/journeys/${j.slug}`,
      detail: `${duration(j)} · ${j.route.join(", ")}`, description: j.summary, thumb: thumb(j.hero),
      fields: [
        `${j.title} ${j.display.join(" ")} ${JOURNEY_TAGS[j.slug] ?? ""}`,
        `${j.route.join(" ")} ${j.cities.map((c) => `${c} ${ALIASES[c] ?? ""}`).join(" ")} ${j.destinations.join(" ")} ${collections.find((c) => c.id === j.collection)?.name ?? ""} ${ALIASES[collections.find((c) => c.id === j.collection)?.slug ?? ""] ?? ""}`,
        `${j.highlights.join(" ")} ${j.signature.map((s) => s.title).join(" ")} ${j.itinerary.map((d) => d.title).join(" ")} ${j.bestFor} ${j.stays.map((s) => s.stay).join(" ")}`,
        `${j.kicker} ${j.summary} ${j.lead}`,
      ] as SearchEntry["fields"],
    })),
    ...destinations.map((d) => ({
      id: d.slug, kind: "Region" as const, title: d.name, href: `/destinations/${d.slug}`,
      detail: d.label, description: short(d.intro), thumb: thumb(d.hero),
      fields: [d.name, `${d.label} ${d.cities.join(" ")} ${ALIASES[d.slug] ?? ""}`, d.highlights.map((h) => h.title).join(" "), `${d.intro} ${d.bestTime}`] as SearchEntry["fields"],
    })),
    ...cities.map((c) => ({
      id: c.slug, kind: "City" as const, title: c.name, href: `/cities/${c.slug}`,
      detail: `${c.label} · ${c.state}`, description: short(c.intro), thumb: thumb(c.hero),
      fields: [c.name, `${c.state} ${c.label} ${ALIASES[c.slug] ?? ""}`, `${c.essentials.map((e) => e.title).join(" ")} ${c.stays.map((s) => s.name).join(" ")}`, c.intro] as SearchEntry["fields"],
    })),
    ...experiences.map((e) => ({
      id: e.slug, kind: "Experience" as const, title: e.title, href: `/experiences/${e.slug}`,
      detail: `${e.category} · ${cities.find((c) => c.slug === e.city)?.name ?? ""}`, description: e.summary, thumb: thumb(e.hero),
      fields: [e.title, `${e.city} ${ALIASES[e.city] ?? ""} ${e.category}`, e.expect.join(" "), e.summary] as SearchEntry["fields"],
    })),
    ...articles.map((a) => ({
      id: a.slug, kind: "Article" as const, title: a.title, href: `/journal/${a.slug}`,
      detail: `Journal · ${a.category}`, description: a.excerpt, thumb: thumb(a.hero),
      fields: [a.title, `${a.places.join(" ")} ${a.places.map((p) => ALIASES[p] ?? "").join(" ")}`, a.sections.map((s) => s.heading).join(" "), `${a.excerpt} ${a.takeaways.join(" ")}`] as SearchEntry["fields"],
    })),
    ...collections.map((c) => ({
      id: c.slug, kind: "Page" as const, title: `${c.name} collection`, href: `/collections/${c.slug}`,
      detail: "Journeys by style", description: short(c.intro), thumb: thumb(c.hero),
      fields: [c.name, ALIASES[c.slug] ?? "", "", c.intro] as SearchEntry["fields"],
    })),
    ...pages.map((p) => ({
      id: p.slug, kind: "Page" as const, title: p.title, href: `/${p.slug}`,
      detail: "Tourmelloh", description: short(p.lead),
      fields: [p.title, "", p.sections.map((s) => s.heading).join(" "), p.lead] as SearchEntry["fields"],
    })),
  ];
}
