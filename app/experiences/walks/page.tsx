import { ItemIndex } from "@/components/catalog/item-index";
import { experiences } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Guided Walks in Varanasi: Ghats, Lanes & Kabir | Tourmelloh",
  description: "Morning walks, the ghats, markets and makers, sacred Kashi, Kabir's city, literary Banaras and the faiths of Kashi, led by guides and arranged privately.",
  path: "/experiences/walks",
  image: "varanasi-old-city-lanes",
});

export default function Page() {
  return (
    <ItemIndex
      trail={[{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }, { name: "Walks", path: "/experiences/walks" }]}
      label="WALKS"
      display={["Varanasi", "on foot."]}
      text="The city is best understood at walking pace. Each walk follows a guide-designed route, with the start and end points, length and steps confirmed for your dates."
      filters={[{ name: "All experiences", href: "/experiences" }, { name: "Walks", href: "/experiences/walks" }]}
      current="/experiences/walks"
      groups={[{ name: "Walks", items: experiences.filter((e) => e.category === "Walks") }]}
    />
  );
}
