import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { VaranasiEdit } from "@/components/editorial";
import { Destinations, type AtlasPlace } from "@/components/destinations";
import { HomeCollections, HowWeTravel } from "@/components/home-sections";
import { ArticleCard, ExperienceCard, JourneyCard } from "@/components/catalog/cards";
import { EnquiryBand, FaqBlock, SectionIntro } from "@/components/catalog/blocks";
import { articles, cities, destinations, experiences, journeys, pages } from "@/content/catalog";
import { media } from "@/content/catalog/media";
import { navDestinations } from "@/content/catalog/nav";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Tourmelloh | Luxury Private Journeys Across India",
  description:
    "A Varanasi travel house designing private, luxury journeys across India: sacred cities, the Golden Triangle, Rajasthan's palaces, Kerala, the Andamans and the Himalaya.",
  path: "/",
});

const signature = [
  "royal-rajasthan",
  "kashi-before-the-world-wakes",
  "andaman-island-escape",
  "char-dham-by-helicopter",
  "kerala-backwaters-and-hills",
  "ladakh-the-high-passes",
];
const featuredExperiences = [
  "private-sunrise-boat-on-the-ganga",
  "balloon-over-the-aravallis",
  "a-private-houseboat-on-the-backwaters",
  "tiger-safari-in-ranthambore",
];

export default function HomePage() {
  const places: AtlasPlace[] = navDestinations
    .map((nav) => destinations.find((d) => d.slug === nav.slug))
    .filter((d) => d !== undefined)
    .map((d) => ({
      slug: d.slug,
      name: d.name,
      label: d.label,
      text: d.intro,
      photo: { src: media[d.hero].src, alt: media[d.hero].alt, blur: media[d.hero].blur },
    }));
  const featured = signature.map((slug) => journeys.find((j) => j.slug === slug)).filter((j) => j !== undefined);
  const moments = featuredExperiences.map((slug) => experiences.find((e) => e.slug === slug)).filter((e) => e !== undefined);
  const faq = pages.find((p) => p.slug === "faq");
  const faqs = (faq?.sections[0]?.paragraphs ?? []).flatMap((text, i, all) => (i % 2 === 0 ? [{ q: text, a: all[i + 1] ?? "" }] : [])).slice(0, 5);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main">
        <Hero />
        <HomeCollections />

        <section className="page-width section-space home-signature" aria-labelledby="signature-heading">
          <div className="cat-head">
            <SectionIntro id="signature-heading" label="MOST ASKED FOR" display={["Journeys our travellers", "begin with."]} />
            <div>
              <p>Each one is a starting point, priced on request for your dates, your hotels and your party.</p>
              <Link className="tour-text-link" href="/journeys">All {journeys.length} journeys <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="cat-grid">
            {featured.map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}
          </div>
        </section>

        <Destinations places={places} />
        <VaranasiEdit />

        <section className="page-width section-space" aria-labelledby="experiences-heading">
          <div className="cat-head">
            <SectionIntro id="experiences-heading" label="PRIVATE EXPERIENCES" display={["The hours", "you will talk about."]} />
            <div>
              <p>A boat on the Ganga before the city wakes. A balloon over the Aravallis. Dinner moored on a backwater. We fit them into your days at the right hour.</p>
              <Link className="tour-text-link" href="/experiences">All experiences <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="cat-grid cat-grid-4">
            {moments.map((item) => (
              <ExperienceCard key={item.slug} experience={item} cityName={cities.find((c) => c.slug === item.city)?.name} />
            ))}
          </div>
        </section>

        <HowWeTravel />

        <section className="page-width section-space" aria-labelledby="journal-heading">
          <div className="cat-head">
            <SectionIntro id="journal-heading" label="THE JOURNAL" display={["Notes", "from the road."]} />
            <div>
              <p>When to go, what to pair, and the details that change a day.</p>
              <Link className="tour-text-link" href="/journal">Read the journal <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="cat-grid">
            {articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
        </section>

        <FaqBlock faqs={faqs} title={["Before", "you set off."]} />
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
