import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { CityCard } from "@/components/catalog/cards";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { cities, destinations } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "India City Guides: Varanasi, Jaipur, Udaipur & More | Tourmelloh",
  description:
    "Considered guides to India's great cities: what to see, when to go, how long to stay and the hotels worth booking, from Varanasi and Agra to Leh and Kochi.",
  path: "/cities",
  image: "jaipur-hawa-mahal",
});

export default function CitiesPage() {
  const groups = [
    ...destinations
      .map((destination) => ({
        name: destination.name,
        label: destination.label,
        list: cities.filter((city) => city.destination === destination.slug),
      }))
      .filter((group) => group.list.length > 0),
    { name: "Beyond the regions", label: "Cities with a pull of their own", list: cities.filter((city) => city.destination === null) },
  ].filter((group) => group.list.length > 0);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "City guides", path: "/cities" }]}
          label={`${cities.length} CITY GUIDES`}
          display={["Cities worth", "the journey."]}
          text="What to see, when to go, how long to stay and where to sleep. Written for travellers who would rather see a city well than see it all."
          filters={[{ name: "Regions", href: "/destinations" }, { name: "City guides", href: "/cities" }]}
          current="/cities"
        />
        {groups.map((group) => (
          <section key={group.name} className="cat-section tour-width" aria-labelledby={`g-${group.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
            <SectionIntro id={`g-${group.name.toLowerCase().replace(/[^a-z]+/g, "-")}`} label={group.label.toUpperCase()} display={[group.name, ""]} />
            <div className="cat-grid" style={{ marginTop: 40 }}>
              {group.list.map((city) => <CityCard key={city.slug} city={city} />)}
            </div>
          </section>
        ))}
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
