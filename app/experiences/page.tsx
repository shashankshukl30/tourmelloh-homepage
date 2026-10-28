import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { ExperienceCard } from "@/components/catalog/cards";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { cities, experiences } from "@/content/catalog";
import type { ExperienceCategory } from "@/content/catalog/types";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Private Experiences in India: Walks, Boats & Safaris | Tourmelloh",
  description:
    "A private sunrise boat on the Ganga, a balloon over Amber, a night on the Thar, a houseboat in Kerala: experiences we arrange privately across India.",
  path: "/experiences",
  image: "varanasi-boat-sunrise",
});

const order: ExperienceCategory[] = [
  "On the water",
  "Walks & heritage",
  "Craft & culture",
  "Food & table",
  "Wildlife & nature",
  "Wellness & spirit",
  "Adventure",
];

export default function ExperiencesPage() {
  const cityName = (slug: string) => cities.find((city) => city.slug === slug)?.name;
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }]}
          label={`${experiences.length} PRIVATE EXPERIENCES`}
          display={["The moments", "that stay."]}
          text="Walks, boats, workshops, tables and safaris, each arranged privately and fitted into your journey at the right hour of the day."
        />
        {order.map((category) => {
          const list = experiences.filter((item) => item.category === category);
          if (!list.length) return null;
          return (
            <section key={category} className="cat-section tour-width" aria-labelledby={`x-${category}`}>
              <SectionIntro id={`x-${category}`} label={`${list.length} ${list.length === 1 ? "EXPERIENCE" : "EXPERIENCES"}`} display={[category, ""]} />
              <div className="cat-grid" style={{ marginTop: 40 }}>
                {list.map((item) => <ExperienceCard key={item.slug} experience={item} cityName={cityName(item.city)} />)}
              </div>
            </section>
          );
        })}
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
