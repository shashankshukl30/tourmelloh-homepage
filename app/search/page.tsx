import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TravelSearch } from "@/components/travel-search";
import { buildSearchIndex } from "@/lib/search-index";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta({
    title: "Search Journeys, Services & Experiences | Tourmelloh",
    description: "Search every Tourmelloh journey, service, experience, destination guide and journal article across Varanasi, Prayagraj, Ayodhya, Gaya and Bodh Gaya.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <><Navigation tone="paper" /><TravelSearch entries={buildSearchIndex()} /><Footer /></>;
}
