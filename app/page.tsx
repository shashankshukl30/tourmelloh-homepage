import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Destinations, type AtlasPlace } from "@/components/destinations";
import { HomeBeforeYouGo, HomeCollections, HomeIntro, HomeMoments, HomeTeam, HomeTiers } from "@/components/home-sections";
import { HomePackages, type PackageGroup } from "@/components/journey/home-packages";
import { toPackage } from "@/components/catalog/cards";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { articles, collections, experiences, faqGroups, guides, journeys } from "@/content/catalog";
import type { Journey } from "@/content/catalog/types";
import { media } from "@/content/catalog/media";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Tourmelloh | Travel and Destination Partners in Varanasi",
  description:
    "Varanasi travel company planning packages, services and experiences across Kashi, Prayagraj, Ayodhya, Gaya and Bodh Gaya, in Standard, Premium and Luxury.",
  path: "/",
});

const MOMENTS = ["E13", "E19", "E08", "E22"];
const READING = ["planning-a-first-kashi-visit", "how-journey-coordination-works", "arranging-a-comfortable-trip-for-parents"];

/** Packages grouped the way guests ask for them: Kashi and the pilgrim roads, the Buddhist circuit, ancestral rites. */
function groupPackages(list: Journey[]): PackageGroup[] {
  const buddhist = list.filter((j) => j.types.includes("buddhist"));
  const rites = list.filter((j) => !j.types.includes("buddhist") && j.types.includes("ancestral-rites"));
  const kashi = list.filter((j) => !buddhist.includes(j) && !rites.includes(j));
  return [
    { key: "kashi", label: "Kashi & pilgrim routes", href: "/journeys?type=hindu-pilgrimage", items: kashi.map(toPackage) },
    { key: "buddhist", label: "Buddhist circuit", href: "/journeys?type=buddhist", items: buddhist.map(toPackage) },
    { key: "rites", label: "Pind daan & ancestral rites", href: "/journeys?type=ancestral-rites", items: rites.map(toPackage) },
  ].filter((g) => g.items.length > 0);
}

export default function HomePage() {
  const groups = groupPackages(journeys);
  const moments = MOMENTS.map((id) => experiences.find((e) => e.id === id)).filter((e) => e !== undefined);
  // A guide shows the first of its photographs not already near it on this page, so nothing repeats.
  const onPage = new Set<string>([...collections.map((c) => c.hero), ...moments.map((e) => e.hero), ...(groups[0]?.items.slice(0, 6).map((p) => p.photo.src) ?? []), "varanasi-river-mist", "wedding-mandap"]);
  const places: AtlasPlace[] = guides.map((g) => {
    const key = [g.hero, ...g.gallery].find((k) => !onPage.has(k) && !onPage.has(media[k].src)) ?? g.hero;
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

        {/* Packages first, straight after the finder (client call, 2026-10-31). */}
        <section className="page-width section-space home-signature" id="packages" aria-labelledby="signature-heading">
          <div className="cat-head">
            <SectionIntro id="signature-heading" label="SUGGESTED PACKAGES" display={["Start with a route,", "then make it yours."]} />
            <p>Every package comes in Standard, Premium and Luxury. Open the itinerary to see the day-by-day plan and what each comfort level includes, then ask for a quote for your dates.</p>
          </div>
          <HomePackages groups={groups} />
        </section>

        <HomeCollections />
        <HomeMoments items={moments} />
        <Destinations places={places} />
        <HomeTeam />
        <HomeBeforeYouGo faqs={faqs} reading={reading} />
        {/* Who we are and the comfort levels, at the end as the client asked. */}
        <HomeIntro />
        <HomeTiers />
        <EnquiryBand title={["Plan your journey", "with Tourmelloh."]} text="Tell us your dates, who is travelling and what matters to you. We reply with questions, a proposed plan and one complete quotation before any payment." />
      </main>
      <Footer />
    </>
  );
}
