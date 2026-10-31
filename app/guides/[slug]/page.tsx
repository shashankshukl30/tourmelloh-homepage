import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/catalog/photo";
import { JourneyCard } from "@/components/catalog/cards";
import { EnquiryBand, FactList, FaqBlock, PageOpening, SectionIntro } from "@/components/catalog/blocks";
import { PageWhatsApp } from "@/components/wishlist/provider";
import { guides, journeys } from "@/content/catalog";
import { absolute, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => guides.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  return g ? pageMeta({ ...g.seo, path: `/guides/${slug}`, image: g.hero }) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();
  const path = `/guides/${slug}`;
  const related = journeys.filter((j) => j.destinations.includes(g.slug)).slice(0, 6);

  return (
    <>
      <Navigation tone="paper" />
      <PageWhatsApp context={{ kind: "guide", place: g.name }} />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: g.name, path }]}
          label={`${g.state.toUpperCase()} · DESTINATION GUIDE`}
          display={g.display}
          lead={g.intro}
          photo={g.hero}
        />

        <section className="cat-section tour-width cat-split" aria-labelledby="g-title">
          <div>
            <SectionIntro id="g-title" label="THE PLACE" display={[`${g.name},`, "in practice."]} />
            <div style={{ marginTop: 28 }}>
              <FactList facts={[
                { label: "Getting there", value: g.gateways },
                { label: "Suggested pacing", value: g.pacing },
                { label: "Walking and steps", value: g.physical },
                { label: "When to go", value: g.season },
                { label: "Etiquette", value: g.etiquette },
              ]} />
            </div>
          </div>
          <div className="cat-prose">{g.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="e-title">
          <SectionIntro id="e-title" label="NOT TO MISS" display={["The places that", "make it."]} />
          <div className="cat-moments">
            {g.essentials.map((e) => (
              <article className={`cat-moment ${e.photo ? "" : "cat-moment-plain"}`} key={e.title}>
                {e.photo && <div className="cat-moment-photo"><Photo k={e.photo} sizes="(max-width: 640px) 92vw, 30vw" /></div>}
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tour-width" aria-label="Gallery">
          <div className="cat-gallery">{g.gallery.map((k) => <div key={k}><Photo k={k} sizes="(max-width: 900px) 92vw, 50vw" /></div>)}</div>
        </section>

        {related.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="j-title">
            <SectionIntro id="j-title" label="JOURNEYS THAT INCLUDE IT" display={["Travel it", "with us."]} />
            <div className="cat-grid" style={{ marginTop: 40 }}>{related.map((j) => <JourneyCard key={j.id} journey={j} />)}</div>
          </section>
        )}

        <FaqBlock faqs={g.faqs} />
        <EnquiryBand />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: g.name,
          description: g.intro,
          url: absolute(path),
          image: absolute(`/og/${g.hero}.jpg`),
          containedInPlace: { "@type": "State", name: g.state },
        }} />
      </main>
      <Footer />
    </>
  );
}
