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
  PageOpening,
  PrimaryLink,
  SectionIntro,
  WhatsAppButton,
} from "@/components/catalog/blocks";
import { cities, experiences, journeys } from "@/content/catalog";
import { absolute, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => experiences.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) return {};
  return pageMeta({ ...experience.seo, path: `/experiences/${slug}`, image: experience.hero });
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();
  const path = `/experiences/${slug}`;
  const city = cities.find((item) => item.slug === experience.city);
  const featuring = journeys.filter((journey) => journey.experiences.includes(slug)).slice(0, 3);
  const nearby = experiences.filter((item) => item.slug !== slug && item.city === experience.city);
  const more = [...nearby, ...experiences.filter((item) => item.slug !== slug && item.city !== experience.city && item.category === experience.category)].slice(0, 3);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }, { name: experience.title, path }]}
          label={`${experience.category.toUpperCase()}${city ? ` · ${city.name.toUpperCase()}` : ""}`}
          display={experience.display}
          meta={[experience.duration, city?.name ?? ""].filter(Boolean)}
          lead={experience.summary}
          photo={experience.hero}
        >
          <PrimaryLink href={`/plan?experience=${slug}`}>Add this to a journey</PrimaryLink>
          <WhatsAppButton />
        </PageOpening>

        <section className="cat-section tour-width cat-split" aria-labelledby="about-title">
          <div>
            <SectionIntro id="about-title" label="THE EXPERIENCE" display={["How it", "unfolds."]} />
            <div style={{ marginTop: 32 }}>
              <FactList
                facts={[
                  { label: "Duration", value: experience.duration },
                  { label: "Best time", value: experience.bestTime },
                  ...(city ? [{ label: "Where", value: `${city.name}, ${city.state}` }] : []),
                ]}
              />
            </div>
          </div>
          <div className="cat-prose">{experience.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>
        </section>

        <section className="tour-width" aria-label="Gallery">
          <div className="cat-gallery cat-gallery-2">
            {experience.gallery.map((key) => <div key={key}><Photo k={key} sizes="(max-width: 900px) 92vw, 50vw" /></div>)}
          </div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="expect-title">
          <div className="cat-terms" style={{ marginTop: 0 }}>
            <div>
              <SectionIntro id="expect-title" label="WHAT TO EXPECT" display={["Step", "by step."]} />
              <ol className="cat-list cat-list-numbered" style={{ marginTop: 28 }}>
                {experience.expect.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </div>
            <div>
              <SectionIntro id="know-title" label="GOOD TO KNOW" display={["Before", "you go."]} />
              <ul className="cat-list" style={{ marginTop: 28 }}>
                {experience.goodToKnow.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {featuring.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="featuring-title">
            <SectionIntro id="featuring-title" label="PART OF THESE JOURNEYS" display={["Woven into", "a longer journey."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {featuring.map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}
            </div>
          </section>
        )}

        {more.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="more-title">
            <SectionIntro id="more-title" label="MORE TO ARRANGE" display={["Other things", "worth your time."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {more.map((item) => (
                <ExperienceCard key={item.slug} experience={item} cityName={cities.find((c) => c.slug === item.city)?.name} />
              ))}
            </div>
          </section>
        )}

        <EnquiryBand title={["Arranged privately,", "for you."]} planHref={`/plan?experience=${slug}`} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: experience.title,
            description: experience.summary,
            url: absolute(path),
            image: absolute(`/og/${experience.hero}.jpg`),
            provider: { "@id": absolute("/#agency") },
            ...(city ? { itinerary: { "@type": "Place", name: `${city.name}, ${city.state}` } } : {}),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
