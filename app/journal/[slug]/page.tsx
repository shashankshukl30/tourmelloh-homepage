import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo, caption } from "@/components/catalog/photo";
import { ArticleCard, ExperienceCard, JourneyCard, ServiceCard } from "@/components/catalog/cards";
import { Breadcrumbs, EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { articles, experiences, journeys, services } from "@/content/catalog";
import { absolute, brand, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => articles.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a ? pageMeta({ ...a.seo, path: `/journal/${slug}`, image: a.hero, type: "article" }) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const path = `/journal/${slug}`;
  const linkedJourneys = journeys.filter((j) => a.journeys.includes(j.id)).slice(0, 3);
  const linkedExperiences = experiences.filter((e) => a.items.includes(e.id));
  const linkedServices = services.filter((s) => a.items.includes(s.id));
  const linkedCount = linkedJourneys.length + linkedExperiences.length + linkedServices.length;
  const more = articles.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <article>
          <header className="tour-width cat-article-head">
            <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }, { name: a.title, path }]} />
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>{a.category.toUpperCase()}</span>
            <h1>{a.title}</h1>
            <p className="tour-lead">{a.excerpt}</p>
          </header>
          <figure className="tour-width cat-article-photo">
            <div><Photo k={a.hero} priority quality={88} sizes="(max-width: 1460px) 94vw, 1460px" /></div>
            <figcaption>{caption(a.hero)}</figcaption>
          </figure>
          <div className="tour-width cat-article-body">
            <aside className="cat-takeaways" aria-labelledby="t-title">
              <h2 id="t-title">In short</h2>
              <ul className="cat-list">{a.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
            </aside>
            <div className="cat-article-text">
              {a.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                </section>
              ))}
            </div>
          </div>
        </article>

        {linkedCount > 0 && (
          <section className="cat-section tour-width" aria-labelledby="l-title">
            <SectionIntro id="l-title" label="PLAN IT WITH US" display={["Journeys and arrangements", "from this article."]} />
            <div className="cat-grid" style={{ marginTop: 40 }}>
              {linkedJourneys.map((j) => <JourneyCard key={j.id} journey={j} />)}
              {linkedExperiences.slice(0, 3).map((e) => <ExperienceCard key={e.id} experience={e} />)}
              {linkedServices.slice(0, 3).map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>
          </section>
        )}

        <section className="cat-section tour-width" aria-labelledby="m-title">
          <SectionIntro id="m-title" label="FROM THE JOURNAL" display={["Keep", "reading."]} />
          <div className="cat-grid" style={{ marginTop: 40 }}>{more.map((x) => <ArticleCard key={x.slug} article={x} />)}</div>
        </section>

        <EnquiryBand />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          image: absolute(`/og/${a.hero}.jpg`),
          mainEntityOfPage: absolute(path),
          author: { "@type": "Organization", name: brand.name },
          publisher: { "@id": absolute("/#agency") },
          inLanguage: "en-IN",
        }} />
      </main>
      <Footer />
    </>
  );
}
