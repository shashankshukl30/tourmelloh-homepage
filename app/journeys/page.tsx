import { JourneyCataloguePage } from "@/components/journey/catalogue-page";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Varanasi Tour Packages & Pilgrimage Journeys | Tourmelloh",
  description: "Proposed journeys from Varanasi to Sarnath, Prayagraj, Ayodhya, Bodh Gaya and the Buddhist sites, each in Standard, Premium or Luxury and quoted for your dates.",
  path: "/journeys",
  image: "varanasi-ghats-dawn",
});

export default function Page() {
  return <JourneyCataloguePage />;
}
