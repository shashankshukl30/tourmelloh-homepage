import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { CityCard, DestinationCard } from "@/components/catalog/cards";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { cities, destinations } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "India Destinations: Regions to Travel in Luxury | Tourmelloh",
  description:
    "From the ghats of Varanasi to the Andaman Islands, Rajasthan's palaces, Kerala's backwaters and the high passes of Ladakh. Explore India's regions privately.",
  path: "/destinations",
  image: "andaman-aerial",
});

export default function DestinationsPage() {
  const standalone = cities.filter((city) => city.destination === null);
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }]}
          label={`${destinations.length} REGIONS`}
          display={["One country,", "many worlds."]}
          text="India changes every few hundred kilometres: language, food, faith, light. Start with a region, and we will show you how its places fit together."
          filters={[{ name: "Regions", href: "/destinations" }, { name: "City guides", href: "/cities" }]}
          current="/destinations"
        />
        <section className="cat-section tour-width" aria-label="Regions" style={{ paddingTop: 0 }}>
          <div className="cat-grid">
            {destinations.map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}
          </div>
        </section>
        {standalone.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="more-title">
            <SectionIntro id="more-title" label="ALSO WORTH THE JOURNEY" display={["Cities with", "a pull of their own."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {standalone.map((city) => <CityCard key={city.slug} city={city} />)}
            </div>
          </section>
        )}
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
