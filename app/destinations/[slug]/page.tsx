import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinationGuides } from "@/content/destination-guides";
import { DestinationGuide } from "@/components/destination-guide";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return destinationGuides.map((guide) => ({ slug: guide.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = destinationGuides.find((item) => item.slug === slug);
  if (!guide) return {};
  return { title: `${guide.name} Travel Guide & Personal Journeys | Tourmelloh`, description: guide.intro };
}
export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = destinationGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <><Navigation tone="paper" /><DestinationGuide guide={guide} /><Footer /></>;
}
