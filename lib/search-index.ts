import { articles, collections, experiences, guides, journeys, pages, services } from "@/content/catalog";
import { media } from "@/content/catalog/media";
import type { MediaKey } from "@/content/catalog/media-plan";
import { durationLong } from "@/components/catalog/cards";
import type { SearchEntry } from "@/lib/search";

/** Names a traveller might use that the copy itself may not. */
const ALIASES: Record<string, string> = {
  varanasi: "kashi banaras benares ganga ganges ghats aarti",
  sarnath: "buddha deer park dhamek first sermon",
  prayagraj: "allahabad sangam triveni kumbh magh mela",
  ayodhya: "ram janmabhoomi ram mandir saryu",
  gaya: "pind daan vishnupad falgu ancestors shraddh",
  "bodh-gaya": "bodhgaya buddha enlightenment mahabodhi",
  vindhyachal: "mirzapur vindhyavasini chunar",
  chitrakoot: "chitrakut ramghat mandakini kamadgiri",
  naimisharanya: "naimisharanya chakra tirth",
  kushinagar: "parinirvana buddhist circuit",
  shravasti: "jetavana buddhist circuit",
};

const PAGE_HREF: Record<string, string> = { "wedding-in-varanasi": "/wedding-in-varanasi" };
const thumb = (key: MediaKey) => ({ src: media[key].src, blur: media[key].blur });
const short = (text: string, words = 26) => {
  const list = text.split(/\s+/);
  return list.length > words ? `${list.slice(0, words).join(" ")}…` : text;
};
const places = (ids: string[]) => ids.map((id) => `${id.replace(/-/g, " ")} ${ALIASES[id] ?? ""}`).join(" ");

export function buildSearchIndex(): SearchEntry[] {
  return [
    ...journeys.map((j) => ({
      id: j.id, kind: "Journey" as const, title: j.title, href: `/journeys/${j.slug}`,
      detail: `${durationLong(j)} · ${j.route}`, description: j.summary, thumb: thumb(j.hero),
      fields: [
        `${j.title} ${j.id}`,
        `${j.route} ${places(j.destinations)} ${j.types.join(" ")}`,
        `${j.itinerary.map((d) => d.title).join(" ")} ${j.suits} ${j.style}`,
        `${j.summary} ${j.lead}`,
      ] as SearchEntry["fields"],
    })),
    ...services.map((s) => ({
      id: s.id, kind: "Service" as const, title: s.title, href: `/services/${s.slug}`,
      detail: `${s.category} · ${s.unit}`, description: s.summary, thumb: thumb(s.hero),
      fields: [
        `${s.title} ${s.id} ${(s.relations.synonyms ?? []).join(" ")}`,
        `${s.locations} ${s.category}`,
        s.weAsk.join(" "),
        `${s.summary} ${s.body.join(" ")}`,
      ] as SearchEntry["fields"],
    })),
    ...experiences.map((e) => ({
      id: e.id, kind: "Experience" as const, title: e.title, href: `/experiences/${e.slug}`,
      detail: `${e.category} · ${e.locations.split(/[,;.]/)[0]}`, description: e.summary, thumb: thumb(e.hero),
      fields: [
        `${e.title} ${e.subtitle ?? ""} ${e.id} ${(e.relations.synonyms ?? []).join(" ")}`,
        `${e.locations} ${e.category}`,
        e.expect.join(" "),
        `${e.summary} ${e.body.join(" ")}`,
      ] as SearchEntry["fields"],
    })),
    ...guides.map((g) => ({
      id: g.slug, kind: "Guide" as const, title: `${g.name} guide`, href: `/guides/${g.slug}`,
      detail: `Destination guide · ${g.state}`, description: short(g.intro), thumb: thumb(g.hero),
      fields: [g.name, `${g.state} ${ALIASES[g.slug] ?? ""}`, g.essentials.map((e) => e.title).join(" "), `${g.intro} ${g.season}`] as SearchEntry["fields"],
    })),
    ...collections.map((c) => ({
      id: c.slug, kind: "Journey" as const, title: c.name, href: `/journeys/${c.slug}`,
      detail: `Specialist collection · ${c.subtitle}`, description: short(c.lead), thumb: thumb(c.hero),
      fields: [c.name, c.subtitle, c.essentials.map((e) => e.title).join(" "), `${c.lead} ${c.body.join(" ")}`] as SearchEntry["fields"],
    })),
    ...articles.map((a) => ({
      id: a.slug, kind: "Article" as const, title: a.title, href: `/journal/${a.slug}`,
      detail: `Journal · ${a.category}`, description: a.excerpt, thumb: thumb(a.hero),
      fields: [a.title, a.category, a.sections.map((s) => s.heading).join(" "), `${a.excerpt} ${a.takeaways.join(" ")}`] as SearchEntry["fields"],
    })),
    ...pages.map((p) => ({
      id: p.slug, kind: "Page" as const, title: p.title, href: PAGE_HREF[p.slug] ?? `/${p.slug}`,
      detail: "Tourmelloh", description: short(p.lead),
      fields: [p.title, "", p.sections.map((s) => s.heading).join(" "), p.lead] as SearchEntry["fields"],
    })),
    { id: "faq", kind: "Page" as const, title: "Frequently asked questions", href: "/faq", detail: "Tourmelloh", description: "Quotations, tiers, payments, darshan, boats, accessibility and what happens after you enquire.", fields: ["FAQ questions answers", "", "quotation payment cancellation darshan boat wheelchair", "What happens after I enquire"] },
    { id: "help-me-plan", kind: "Page" as const, title: "Help me plan", href: "/help-me-plan", detail: "Tourmelloh", description: "Tell us your dates, party and interests and we propose a journey.", fields: ["Help me plan custom journey enquiry quote", "", "plan your journey quotation", "contact enquire"] },
  ];
}
