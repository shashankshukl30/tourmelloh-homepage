import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { JourneyCard } from "@/components/catalog/cards";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { collections, journeysIn } from "@/content/catalog";
import { pageMeta } from "@/lib/site";
import { collectionFilters } from "@/components/catalog/filters";

export const metadata = pageMeta({
  title: "Luxury India Tour Packages & Private Journeys | Tourmelloh",
  description:
    "Private, luxury journeys across India: pilgrimages, the Golden Triangle and Rajasthan, heritage, the Andamans, Kerala, the Himalaya and tiger country.",
  path: "/journeys",
  image: "agra-taj-sunrise",
});

export default function JourneysPage() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "Journeys", path: "/journeys" }]}
          label="SIGNATURE JOURNEYS"
          display={["Private journeys,", "across India."]}
          text="Every journey here is a starting point. Each runs privately, with your own car, your own guides and hotels chosen for character. Change the pace, the order or the places, and we rebuild it around you."
          filters={collectionFilters}
          current="/journeys"
        />
        {collections.map((collection) => {
          const list = journeysIn(collection.id);
          if (!list.length) return null;
          return (
            <section key={collection.id} className="cat-section tour-width" aria-labelledby={`c-${collection.id}`}>
              <div className="cat-head">
                <SectionIntro id={`c-${collection.id}`} label={`${list.length} JOURNEYS`} display={collection.display} />
                <div>
                  <p>{collection.intro}</p>
                  <Link className="tour-text-link" href={`/collections/${collection.slug}`}>
                    The {collection.name.toLowerCase()} collection <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="cat-grid">
                {list.map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}
              </div>
            </section>
          );
        })}
        <EnquiryBand title={["Something", "not listed here?"]} text="Most of our journeys begin as a conversation, not a page. Tell us where you would like to go and how you like to travel, and we will design it from the beginning." />
      </main>
      <Footer />
    </>
  );
}
