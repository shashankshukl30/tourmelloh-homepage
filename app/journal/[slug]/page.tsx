import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo, caption } from "@/components/catalog/photo";
import { ArticleCard, JourneyCard } from "@/components/catalog/cards";
import { Breadcrumbs, EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { articles, journeys } from "@/content/catalog";
import { absolute, brand, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => articles.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return pageMeta({ ...article.seo, path: `/journal/${slug}`, image: article.hero, type: "article" });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const path = `/journal/${slug}`;
  const linked = article.journeys
    .map((item) => journeys.find((journey) => journey.slug === item))
    .filter((journey) => journey !== undefined)
    .slice(0, 3);
  const more = articles.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <article>
          <header className="tour-width cat-article-head">
            <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }, { name: article.title, path }]} />
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>{article.category.toUpperCase()}</span>
            <h1>{article.title}</h1>
            <p className="tour-lead">{article.excerpt}</p>
          </header>
          <figure className="tour-width cat-article-photo">
            <div><Photo k={article.hero} priority quality={88} sizes="(max-width: 1460px) 94vw, 1460px" /></div>
            <figcaption>{caption(article.hero)}</figcaption>
          </figure>
          <div className="tour-width cat-article-body">
            <aside className="cat-takeaways" aria-labelledby="takeaways-title">
              <h2 id="takeaways-title">In short</h2>
              <ul className="cat-list">{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
            </aside>
            <div className="cat-article-text">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                </section>
              ))}
            </div>
          </div>
        </article>

        {linked.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="linked-title">
            <SectionIntro id="linked-title" label="TRAVEL IT WITH US" display={["Journeys that", "bring this to life."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {linked.map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}
            </div>
          </section>
        )}
        <section className="cat-section tour-width" aria-labelledby="more-title">
          <SectionIntro id="more-title" label="FROM THE JOURNAL" display={["Keep", "reading."]} />
          <div className="cat-grid" style={{ marginTop: 44 }}>
            {more.map((item) => <ArticleCard key={item.slug} article={item} />)}
          </div>
        </section>
        <EnquiryBand />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: absolute(`/og/${article.hero}.jpg`),
            mainEntityOfPage: absolute(path),
            author: { "@type": "Organization", name: brand.name, url: absolute("/") },
            publisher: { "@id": absolute("/#agency") },
            inLanguage: "en-IN",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
