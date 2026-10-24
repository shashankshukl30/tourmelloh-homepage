import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TourDetail } from "@/components/tour-detail";
import { journeyDetails } from "@/content/journey-details";
import { journeys } from "@/content/travel";

type Props = { params: Promise<{ slug: string }> };

const pageTitles: Record<string, string> = {
  kashi: "Kashi & Sarnath | A Four-Day Journey with Tourmelloh",
  sacred: "Along the Sacred Rivers | Six Days with Tourmelloh",
  buddhist: "The Road to Bodh Gaya | Buddhist Trails by Tourmelloh",
  heritage: "Awadh, Agra & Braj | Seven Days Across India with Tourmelloh",
};

export function generateStaticParams() {
  return journeyDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = journeyDetails.find((journey) => journey.slug === slug);
  const journey = journeys.find((item) => item.id === detail?.id);
  if (!detail || !journey) return {};
  return {
    title: pageTitles[journey.id],
    description: detail.lead,
  };
}

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const detail = journeyDetails.find((journey) => journey.slug === slug);
  if (!detail) notFound();
  return (
    <>
      <Navigation tone="paper" />
      <TourDetail detail={detail} />
      <Footer />
    </>
  );
}
