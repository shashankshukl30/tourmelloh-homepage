import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { JourneyCatalogue, type CatalogueJourney } from "@/components/journey/catalogue";
import { collections, journeys, tierLabel } from "@/content/catalog";
import { media } from "@/content/catalog/media";
import type { Tier } from "@/content/catalog/types";
import { Photo } from "@/components/catalog/photo";

const TIER_NOTE: Record<Tier, string> = {
  standard: "Selected 3-star hotels, a private air-conditioned car, breakfast, the specified boat ride and a named planning coordinator. Guides are added where listed.",
  premium: "Selected 4-star hotels, an upgraded MPV or SUV, a private boat on applicable routes, accompanied darshan assistance and hosted support with selected guided visits.",
  luxury: "The finest suitable stays, a confirmed premium vehicle, a dedicated travel concierge and every Luxury experience mapped to the journey, set out in full before you pay.",
};

/** The canonical journey catalogue, optionally opened with a comfort tier selected. */
export function JourneyCataloguePage({ tier }: { tier?: Tier }) {
  const list: CatalogueJourney[] = journeys.map((j) => {
    const [title, subtitle] = j.title.split(" – ");
    return {
      slug: j.slug, title, subtitle, route: j.route, nights: j.nights, days: j.days, summary: j.summary,
      types: j.types, destinations: j.destinations,
      photo: { src: media[j.hero].src, alt: media[j.hero].alt, blur: media[j.hero].blur },
    };
  });
  const tiers: Tier[] = ["standard", "premium", "luxury"];
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "Journeys", path: "/journeys" }, ...(tier ? [{ name: tierLabel[tier], path: `/journeys/${tier}` }] : [])]}
          label={tier ? `${tierLabel[tier].toUpperCase()} SELECTED` : "JOURNEYS"}
          display={tier ? [`${tierLabel[tier]}`, "journeys."] : ["Varanasi,", "and the journeys beyond."]}
          text={tier ? TIER_NOTE[tier] : "Proposed journeys from our Varanasi base to Prayagraj, Ayodhya, Bodh Gaya and the Buddhist sites of the region. Choose one, pick Standard, Premium or Luxury, and shape it with us. Every price is quoted for your dates."}
          filters={[{ name: "All tiers", href: "/journeys" }, ...tiers.map((t) => ({ name: tierLabel[t], href: `/journeys/${t}` }))]}
          current={tier ? `/journeys/${tier}` : "/journeys"}
        />
        <section className="cat-section tour-width" aria-label="Journeys" style={{ paddingTop: 0 }}>
          <JourneyCatalogue journeys={list} tier={tier} />
        </section>
        <section className="cat-section tour-width" aria-labelledby="collections-title">
          <div className="cat-head">
            <SectionIntro id="collections-title" label="SPECIALIST COLLECTIONS" display={["Journeys shaped", "for who is travelling."]} />
            <p>Each collection uses the same proposed journeys, with the support that defines it built in.</p>
          </div>
          <div className="coll-strip">
            {collections.map((c) => (
              <Link key={c.id} href={`/journeys/${c.slug}`} className="coll-tile">
                <span className="coll-tile-photo"><Photo k={c.hero} sizes="(max-width: 760px) 80vw, 20vw" /></span>
                <strong>{c.name}</strong>
                <span>{c.subtitle}</span>
                <ArrowUpRight size={18} className="coll-tile-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
        <EnquiryBand title={["Not sure which", "journey fits?"]} text="Tell us your dates, who is travelling and what matters most. We recommend a route and a duration, and send a complete quotation." planHref="/help-me-plan" />
      </main>
      <Footer />
    </>
  );
}
