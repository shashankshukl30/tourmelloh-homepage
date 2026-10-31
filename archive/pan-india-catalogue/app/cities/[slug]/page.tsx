import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/catalog/photo";
import { ExperienceCard, JourneyCard } from "@/components/catalog/cards";
import {
  EnquiryBand,
  FactList,
  FaqBlock,
  PageOpening,
  PrimaryLink,
  SectionIntro,
  WhatsAppButton,
} from "@/components/catalog/blocks";
import { cities, destinations, experiences, journeysThrough } from "@/content/catalog";
import { absolute, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => cities.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) return {};
  return pageMeta({ ...city.seo, path: `/cities/${slug}`, image: city.hero });
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) notFound();
  const path = `/cities/${slug}`;
  const region = destinations.find((item) => item.slug === city.destination);
  const list = journeysThrough(slug);
  const things = experiences.filter((item) => item.city === slug);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[
            { name: "Home", path: "/" },
            ...(region
              ? [{ name: "Destinations", path: "/destinations" }, { name: region.name, path: `/destinations/${region.slug}` }]
              : [{ name: "City guides", path: "/cities" }]),
            { name: city.name, path },
          ]}
          label={`${city.label.toUpperCase()} · ${city.state.toUpperCase()}`}
          display={city.display}
          lead={city.intro}
          photo={city.hero}
        >
          <PrimaryLink href={`/plan?city=${slug}`}>Plan time in {city.name}</PrimaryLink>
          <WhatsAppButton />
        </PageOpening>

        <section className="cat-section tour-width cat-split" aria-labelledby="city-title">
          <div>
            <SectionIntro id="city-title" label="THE CITY" display={[city.name + ",", "slowly."]} />
            <div style={{ marginTop: 32 }}>
              <FactList
                facts={[
                  { label: "When to go", value: city.bestTime },
                  { label: "How long", value: city.howLong },
                  { label: "Getting there", value: city.gettingThere },
                ]}
              />
            </div>
          </div>
          <div className="cat-prose">{city.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="essentials-title">
          <SectionIntro id="essentials-title" label="NOT TO MISS" display={["The places that", "make the city."]} />
          <div className="cat-moments">
            {city.essentials.map((item) => (
              <article className={`cat-moment ${item.photo ? "" : "cat-moment-plain"}`} key={item.title}>
                {item.photo && (
                  <div className="cat-moment-photo"><Photo k={item.photo} sizes="(max-width: 640px) 92vw, (max-width: 1150px) 45vw, 30vw" /></div>
                )}
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tour-width" aria-label="Gallery">
          <div className="cat-gallery">
            {city.gallery.map((key) => <div key={key}><Photo k={key} sizes="(max-width: 900px) 92vw, 50vw" /></div>)}
          </div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="stays-title">
          <SectionIntro id="stays-title" label="WHERE TO STAY" display={["Hotels we", "like here."]} text="Independent suggestions. We match the room, the view and the location to your journey." />
          <div className="cat-stays">
            {city.stays.map((stay) => (
              <div className="cat-stay" key={stay.name}>
                <strong>{stay.name}</strong>
                <p>{stay.note}</p>
              </div>
            ))}
          </div>
        </section>

        {things.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="experiences-title">
            <SectionIntro id="experiences-title" label="PRIVATE EXPERIENCES" display={["Things we arrange", `in ${city.name}.`]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {things.map((item) => <ExperienceCard key={item.slug} experience={item} cityName={city.name} />)}
            </div>
          </section>
        )}

        {list.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="journeys-title">
            <SectionIntro id="journeys-title" label="JOURNEYS THAT INCLUDE IT" display={["See it as part of", "something larger."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {list.slice(0, 6).map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}
            </div>
          </section>
        )}

        <FaqBlock faqs={city.faqs} />
        <EnquiryBand title={[city.name + ",", "on your terms."]} planHref={`/plan?city=${slug}`} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: city.name,
            description: city.intro,
            url: absolute(path),
            image: absolute(`/og/${city.hero}.jpg`),
            containedInPlace: { "@type": "State", name: city.state },
            includesAttraction: city.essentials.map((item) => ({ "@type": "TouristAttraction", name: item.title, description: item.text })),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
