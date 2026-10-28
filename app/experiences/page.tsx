import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
  const home = experiences.filter((item) => item.city === "varanasi");
  const elsewhere = experiences.filter((item) => item.city !== "varanasi");
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
        <section className="cat-section tour-width" aria-labelledby="x-varanasi" style={{ paddingTop: 0 }}>
          <div className="cat-head">
            <SectionIntro id="x-varanasi" label={`${home.length} IN VARANASI`} display={["Our home city,", "from the inside."]} />
            <p>We are based in Varanasi, so this is where our experiences run deepest: the river at every hour, the temples, the lanes, the looms, the kitchens and the music.</p>
          </div>
          <div className="cat-grid">
            {home.map((item) => <ExperienceCard key={item.slug} experience={item} cityName="Varanasi" />)}
            {home.length % 3 !== 0 && (
              <Link href="/plan?city=varanasi" className="cat-invite">
                <span className="tour-kicker">IN VARANASI</span>
                <strong>Something else in mind?</strong>
                <p>A sunrise concert, a scholar of the Puranas, a family ritual or a wedding by the river. Tell us, and we will arrange it.</p>
                <span className="cat-card-action">Plan time in Varanasi <ArrowUpRight size={16} aria-hidden="true" /></span>
              </Link>
            )}
          </div>
        </section>
        {order.map((category) => {
          const list = elsewhere.filter((item) => item.category === category);
          if (!list.length) return null;
          return (
            <section key={category} className="cat-section tour-width" aria-labelledby={`x-${category.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
              <SectionIntro id={`x-${category.toLowerCase().replace(/[^a-z]+/g, "-")}`} label={`ACROSS INDIA · ${list.length} ${list.length === 1 ? "EXPERIENCE" : "EXPERIENCES"}`} display={[category, ""]} />
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
