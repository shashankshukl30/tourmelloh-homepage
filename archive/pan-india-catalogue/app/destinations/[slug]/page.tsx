import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/catalog/photo";
import { CityCard, JourneyCard } from "@/components/catalog/cards";
import {
  EnquiryBand,
  FactList,
  FaqBlock,
  PageOpening,
  PrimaryLink,
  SectionIntro,
  WhatsAppButton,
} from "@/components/catalog/blocks";
import { cities, destinations, journeysAcross } from "@/content/catalog";
import { absolute, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => destinations.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return {};
  return pageMeta({ ...destination.seo, path: `/destinations/${slug}`, image: destination.hero });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();
  const path = `/destinations/${slug}`;
  const regionCities = destination.cities
    .map((citySlug) => cities.find((city) => city.slug === citySlug))
    .filter((city) => city !== undefined);
  const list = journeysAcross(slug);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }, { name: destination.name, path }]}
          label={destination.label.toUpperCase()}
          display={destination.display}
          lead={destination.intro}
          photo={destination.hero}
        >
          <PrimaryLink href={`/plan?destination=${slug}`}>Plan a journey here</PrimaryLink>
          <WhatsAppButton />
        </PageOpening>

        <section className="cat-section tour-width cat-split" aria-labelledby="region-title">
          <div>
            <SectionIntro id="region-title" label="THE REGION" display={[destination.name + ",", "in brief."]} />
            <div style={{ marginTop: 32 }}>
              <FactList facts={[{ label: "When to go", value: destination.bestTime }, { label: "Getting there", value: destination.gettingThere }]} />
            </div>
          </div>
          <div className="cat-prose">{destination.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="highlights-title">
          <SectionIntro id="highlights-title" label="WHY GO" display={["The reasons", "people return."]} />
          <div className="cat-moments">
            {destination.highlights.map((item) => (
              <article className="cat-moment" key={item.title}>
                <div className="cat-moment-photo"><Photo k={item.photo} sizes="(max-width: 640px) 92vw, (max-width: 1150px) 45vw, 30vw" /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tour-width" aria-label="Gallery">
          <div className="cat-gallery">
            {destination.gallery.map((key) => <div key={key}><Photo k={key} sizes="(max-width: 900px) 92vw, 50vw" /></div>)}
          </div>
        </section>

        {regionCities.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="cities-title">
            <SectionIntro id="cities-title" label="CITY GUIDES" display={["Where to", "spend your days."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {regionCities.map((city) => <CityCard key={city.slug} city={city} />)}
            </div>
          </section>
        )}

        {list.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="journeys-title">
            <SectionIntro id="journeys-title" label="JOURNEYS THROUGH THE REGION" display={["Ways to see", destination.name + "."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {list.map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}
            </div>
          </section>
        )}

        <FaqBlock faqs={destination.faqs} />
        <EnquiryBand title={[destination.name + ",", "arranged for you."]} planHref={`/plan?destination=${slug}`} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: destination.name,
            description: destination.intro,
            url: absolute(path),
            image: absolute(`/og/${destination.hero}.jpg`),
            touristType: "Luxury and private travellers",
            includesAttraction: destination.highlights.map((item) => ({ "@type": "TouristAttraction", name: item.title, description: item.text })),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
