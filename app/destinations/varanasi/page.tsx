import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DestinationPreview } from "@/components/destination-preview";

export const metadata: Metadata = {
  title: "The Varanasi Edit | Discover Kashi Slowly with Tourmelloh",
  description:
    "Find your way into Varanasi: river mornings, old-city lanes, Ganga aarti and Sarnath. Discover a more thoughtful starting point for your journey to Kashi.",
};

export default function VaranasiPage() {
  return (
    <>
      <Navigation tone="paper" />
      <DestinationPreview />
      <Footer />
    </>
  );
}
