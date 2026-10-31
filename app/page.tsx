import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Destinations, type AtlasPlace } from "@/components/destinations";
import { HomeBeforeYouGo, HomeCollections, HomeFounder, HomeIntro, HomeMoments, HomeTiers } from "@/components/home-sections";
import { JourneyCard } from "@/components/catalog/cards";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { articles, collections, experiences, faqGroups, guides, journeys } from "@/content/catalog";
import { media } from "@/content/catalog/media";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Tourmelloh | Travel and Destination Partners in Varanasi",
  description:
    "Varanasi travel company planning journeys, services and experiences across Kashi, Prayagraj, Ayodhya, Gaya and Bodh Gaya, in Standard, Premium and Luxury.",
  path: "/",
});

const FEATURED = ["P01", "P03", "P04", "P05", "P06", "P14"];
const MOMENTS = ["E13", "E19", "E08", "E22"];
const READING = ["planning-a-first-kashi-visit", "how-journey-coordination-works", "arranging-a-comfortable-trip-for-parents"];

export default function HomePage() {
  const featured = FEATURED.map((id) => journeys.find((j) => j.id === id)).filter((j) => j !== undefined);
  const moments = MOMENTS.map((id) => experiences.find((e) => e.id === id)).filter((e) => e !== undefined);
  // A guide shows the first of its photographs not already on this page, so nothing repeats.
  const onPage = new Set<string>([...collections.map((c) => c.hero), ...featured.map((j) => j.hero), ...moments.map((e) => e.hero), "varanasi-river-mist", "wedding-mandap"]);
  const places: AtlasPlace[] = guides.map((g) => {
    const key = [g.hero, ...g.gallery].find((k) => !onPage.has(k)) ?? g.hero;
    onPage.add(key);
    return { slug: g.slug, name: g.name, label: g.state, text: g.intro, photo: { src: media[key].src, alt: media[key].alt, blur: media[key].blur } };
  });
  const faqs = faqGroups.flatMap((g) => g.faqs).slice(0, 5);
  const reading = READING.map((slug) => articles.find((a) => a.slug === slug)).filter((a) => a !== undefined);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main">
        <Hero />
        <HomeIntro />

        <section className="page-width section-space home-signature" aria-labelledby="signature-heading">
          <div className="cat-head">
            <SectionIntro id="signature-heading" label="SUGGESTED JOURNEYS" display={["Start with a route,", "then make it yours."]} />
            <div>
              <p>Each journey comes in Standard, Premium and Luxury. Choose one, personalise it, and we quote it for your dates and party.</p>
              <Link className="tour-text-link" href="/journeys">All {journeys.length} journeys <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="cat-grid">
            {featured.map((journey) => <JourneyCard key={journey.id} journey={journey} />)}
          </div>
        </section>

        <HomeCollections />
        <HomeTiers />
        <HomeMoments items={moments} />
        <Destinations places={places} />
        <HomeFounder />
        <HomeBeforeYouGo faqs={faqs} reading={reading} />
        <EnquiryBand title={["Plan your journey", "with Tourmelloh."]} text="Tell us your dates, who is travelling and what matters to you. We reply with questions, a proposed plan and one complete quotation before any payment." />
      </main>
      <Footer />
    </>
  );
}
