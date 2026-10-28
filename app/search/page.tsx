import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TravelSearch } from "@/components/travel-search";
import { buildSearchIndex } from "@/lib/search-index";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta({
    title: "Search Journeys, Places & Experiences | Tourmelloh",
    description: "Search every Tourmelloh journey, region, city guide, private experience and journal article, from Varanasi and the Taj to Havelock and Ladakh.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <><Navigation tone="paper" /><TravelSearch entries={buildSearchIndex()} /><Footer /></>;
}
