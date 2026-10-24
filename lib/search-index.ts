import { destinations, journeys } from "@/content/travel";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: "Journey" | "Destination";
  detail: string;
  keywords: string;
};

const destinationPages: Record<string, string> = {
  Varanasi: "varanasi", Ayodhya: "ayodhya", Agra: "agra", Bodhgaya: "bodh-gaya",
};
const aliases: Record<string, string> = {
  Varanasi: "Kashi Banaras Benares Ganga Ganges Vishwanath Sarnath aarti ghats boat",
  Ayodhya: "Ram Mandir Rama Hanuman Garhi Sarayu Saryu Ram Ki Paidi pilgrimage",
  Agra: "Taj Taj Mahal Mughal Agra Fort architecture",
  Prayagraj: "Allahabad Sangam Triveni Yamuna pilgrimage",
  Lucknow: "Awadh Nawab Rumi Darwaza Bara Imambara food heritage",
  Bodhgaya: "Bodh Gaya Buddha Buddhist Mahabodhi enlightenment monastery",
  Vrindavan: "Braj Brij Mathura Krishna Banke Bihari Prem Mandir",
  Gaya: "Vishnupad Falgu ancestral rites pind daan Bihar",
};

export const searchIndex: SearchEntry[] = [
  ...journeys.map((journey) => ({
    id: journey.slug,
    title: journey.title,
    description: journey.intro,
    href: `/journeys/${journey.slug}`,
    kind: "Journey" as const,
    detail: `${journey.duration} · ${journey.route}`,
    keywords: `${journey.category} ${journey.route} ${journey.places.map((place) => aliases[place] ?? place).join(" ")}`,
  })),
  ...destinations.map((destination) => ({
    id: destination.image,
    title: destination.name,
    description: destination.description,
    href: destinationPages[destination.name]
      ? `/destinations/${destinationPages[destination.name]}`
      : `/?place=${encodeURIComponent(destination.name)}#destinations`,
    kind: "Destination" as const,
    detail: destination.highlights,
    keywords: aliases[destination.name] ?? "",
  })),
];

function normalize(value: string) {
  return value.toLocaleLowerCase("en-IN").normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function searchTravel(query: string, kind: "All" | SearchEntry["kind"] = "All") {
  const terms = normalize(query).split(" ").filter(Boolean);
  return searchIndex
    .filter((entry) => kind === "All" || entry.kind === kind)
    .map((entry) => {
      const title = normalize(entry.title);
      const keywords = normalize(entry.keywords);
      const all = normalize(`${entry.title} ${entry.description} ${entry.detail} ${entry.keywords}`);
      const matches = terms.every((term) => all.includes(term));
      const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 8 : keywords.includes(term) ? 4 : 1), 0);
      return { entry, score, matches };
    })
    .filter((result) => result.matches)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.entry);
}
