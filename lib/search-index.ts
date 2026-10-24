import { destinations, journeys } from "@/content/travel";
import { blogPosts } from "@/content/blog";
import type { SearchEntry } from "@/lib/search";

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
  ...blogPosts.map(post => ({
    id: post.slug,
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    kind: "Article" as const,
    detail: post.category,
    keywords: `${post.destinations.map(place => aliases[place] ?? place).join(" ")} ${post.sections.map(section => section.heading).join(" ")}`,
  })),
];
