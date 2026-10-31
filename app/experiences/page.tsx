import { ItemIndex } from "@/components/catalog/item-index";
import { experiences } from "@/content/catalog";
import type { ExperienceCategory } from "@/content/catalog/types";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Varanasi Experiences: Walks, Boats, Food & Rituals | Tourmelloh",
  description: "Guided walks, sunrise boats, food trails, weavers, live music, rituals and excursions around Varanasi, each arranged privately and added to your journey.",
  path: "/experiences",
  image: "varanasi-boat-sunrise",
});

const ORDER: ExperienceCategory[] = ["Walks", "On the river", "Food & tastings", "Crafts & culture", "Music", "Sacred & ritual", "Excursions"];

export default function Page() {
  return (
    <ItemIndex
      trail={[{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }]}
      label={`${experiences.length} EXPERIENCES`}
      display={["Varanasi,", "from the inside."]}
      text="Walks through the lanes, the river at dawn and dusk, the food, the looms, the music and the rituals. Each is guide-designed, confirmed for your dates and added to your journey."
      filters={[{ name: "All experiences", href: "/experiences" }, { name: "Walks", href: "/experiences/walks" }, { name: "Lesser-visited temples", href: "/experiences/varanasi-beyond-the-familiar" }]}
      current="/experiences"
      feature={{ href: "/experiences/varanasi-beyond-the-familiar", title: "Varanasi Beyond the Familiar", text: "A guide-designed trail through older, quieter temples of the city." }}
      groups={ORDER.map((name) => ({ name, items: experiences.filter((e) => e.category === name) }))}
    />
  );
}
