import { JourneyCataloguePage } from "@/components/journey/catalogue-page";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Luxury Varanasi Journeys and Pilgrimages | Tourmelloh",
  description: "Our proposed Varanasi and pilgrimage journeys with the Luxury tier selected: what it includes, how it differs, and a complete quotation before any payment.",
  path: "/journeys/luxury",
  image: "varanasi-ghats-dawn",
});

export default function Page() {
  return <JourneyCataloguePage tier="luxury" />;
}
