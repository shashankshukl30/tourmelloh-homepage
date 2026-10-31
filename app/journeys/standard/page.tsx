import { JourneyCataloguePage } from "@/components/journey/catalogue-page";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Standard Varanasi Journeys and Pilgrimages | Tourmelloh",
  description: "Our proposed Varanasi and pilgrimage journeys with the Standard tier selected: what it includes, how it differs, and a complete quotation before any payment.",
  path: "/journeys/standard",
  image: "varanasi-ghats-dawn",
});

export default function Page() {
  return <JourneyCataloguePage tier="standard" />;
}
