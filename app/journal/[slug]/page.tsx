import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo, caption } from "@/components/catalog/photo";
import { ArticleCard, ExperienceCard, JourneyCard, ServiceCard } from "@/components/catalog/cards";
import { Breadcrumbs, EnquiryBand, FaqBlock, SectionIntro } from "@/components/catalog/blocks";
import { Rich, plain } from "@/components/catalog/rich-text";
import { PageWhatsApp } from "@/components/wishlist/provider";
import { WhatsAppPageLink } from "@/components/whatsapp-page-link";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { articles, experiences, journeys, services } from "@/content/catalog";
import { media } from "@/content/catalog/media";
import type { Article, MediaKey } from "@/content/catalog/types";
import { absolute, brand, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => articles.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a ? pageMeta({ ...a.seo, path: `/journal/${slug}`, image: a.hero, type: "article" }) : {};
}

/** Words in the body, for the "N min read" line (about 220 words a minute). */
function readMinutes(a: Article) {
  const text = a.sections.flatMap((s) => [...s.paragraphs, ...(s.points ?? []), ...(s.steps ?? []), ...(s.after ?? [])]).join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 220));
}

const longDate = (iso: string) => new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

/** An in-article photograph at its own proportions (portraits are kept narrow). */
function Figure({ k }: { k: MediaKey }) {
  const { width, height } = media[k];
  const tall = height > width;
  return (
    <figure className={`cat-article-figure ${tall ? "is-tall" : ""}`}>
      <div style={{ aspectRatio: `${width} / ${height}` }}>
        <Photo k={k} sizes={tall ? "(max-width: 760px) 92vw, 420px" : "(max-width: 760px) 92vw, 760px"} />
      </div>
      <figcaption>{caption(k)}</figcaption>
    </figure>
  );
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
      <PageWhatsApp context={{ kind: "article", title: a.title, url: absolute(path) }} />
      <main id="main" className="cat-page">
        <article>
          <header className="tour-width cat-article-head">
            <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }, { name: a.title, path }]} />
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>{a.category.toUpperCase()}</span>
            <h1>{a.title}</h1>
            <p className="tour-lead">{a.excerpt}</p>
            <p className="cat-article-meta">
              {a.published && <time dateTime={a.published}>{longDate(a.published)}</time>}
              <span>{readMinutes(a)} min read</span>
              <span>By {brand.name}</span>
            </p>
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
                  {s.image && <Figure k={s.image} />}
                  {s.paragraphs.map((p) => <p key={p.slice(0, 40)}><Rich text={p} /></p>)}
                  {s.points && <ul className="cat-article-list">{s.points.map((p) => <li key={p.slice(0, 40)}><Rich text={p} /></li>)}</ul>}
                  {s.steps && <ol className="cat-article-list is-numbered">{s.steps.map((p) => <li key={p.slice(0, 40)}><Rich text={p} /></li>)}</ol>}
                  {s.after?.map((p) => <p key={p.slice(0, 40)}><Rich text={p} /></p>)}
                </section>
              ))}
              {a.actions && a.actions.length > 0 && (
                <div className="cat-article-actions">
                  {a.actions.map((act, i) => act.whatsapp ? (
                    <WhatsAppPageLink key={act.label} className="tour-primary" style={{ color: "var(--paper)" }}>
                      <WhatsAppIcon size={18} /> {act.label}
                    </WhatsAppPageLink>
                  ) : (
                    <Link key={act.label} href={act.href ?? "/"} className={i === 0 ? "tour-primary" : "cat-whatsapp"} style={i === 0 ? { color: "var(--paper)" } : undefined}>
                      {act.label} <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        {a.faqs && a.faqs.length > 0 && <FaqBlock faqs={a.faqs} id="article-faq" />}

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
          description: plain(a.excerpt),
          image: [absolute(`/og/${a.hero}.jpg`), ...a.sections.flatMap((s) => (s.image ? [absolute(media[s.image].src)] : []))],
          mainEntityOfPage: absolute(path),
          ...(a.published ? { datePublished: a.published, dateModified: a.published } : {}),
          author: { "@type": "Organization", name: brand.name, url: absolute("/") },
          publisher: { "@id": absolute("/#agency") },
          inLanguage: "en-IN",
        }} />
      </main>
      <Footer />
    </>
  );
}
