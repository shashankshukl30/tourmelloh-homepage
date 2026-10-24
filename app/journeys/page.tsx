import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JourneyCollection } from "@/components/journey-collection";

export const metadata: Metadata = {
  title: "Journeys Through India | The Tourmelloh Travel Collection",
  description:
    "Find your route through Varanasi, Ayodhya, Prayagraj, Bodh Gaya, Lucknow, Agra and Vrindavan. Four thoughtful starting points for your own India journey.",
};

export default function JourneysPage() {
  return (
    <>
      <Navigation tone="paper" />
      <JourneyCollection />
      <Footer />
    </>
  );
}
