import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TravelSearch } from "@/components/travel-search";

export const metadata: Metadata = {
  title: "Find Your India Journey | Tourmelloh Travel Collection",
  description: "Search Tourmelloh journeys, destinations and landmarks, from Varanasi and Ayodhya to the Taj Mahal and Bodh Gaya.",
};

export default async function SearchPage({ searchParams }: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.slice(0,120) : "";
  return <><Navigation tone="paper" /><TravelSearch initialQuery={query} /><Footer /></>;
}
