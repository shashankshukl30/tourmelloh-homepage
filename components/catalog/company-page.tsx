import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, EnquiryBand, PageOpening } from "@/components/catalog/blocks";
import { Reveal } from "@/components/reveal";
import { pages } from "@/content/catalog";
import { faqLd, pageMeta } from "@/lib/site";

const LEGAL = new Set(["privacy", "terms", "booking-terms"]);

export function companyMeta(slug: string) {
  const page = pages.find((item) => item.slug === slug);
  return page ? pageMeta({ ...page.seo, path: `/${slug}`, image: page.hero }) : {};
}

/** About, how we travel, FAQ and the three policies share one layout. */
export function CompanyPage({ slug }: { slug: string }) {
  const page = pages.find((item) => item.slug === slug);
  if (!page) notFound();
  const trail = [{ name: "Home", path: "/" }, { name: page.title, path: `/${slug}` }];
  const isFaq = slug === "faq";
  const faqs = isFaq
    ? page.sections.flatMap((section) =>
        section.paragraphs.flatMap((text, i, all) => (i % 2 === 0 ? [{ q: text, a: all[i + 1] ?? "" }] : [])),
      )
    : [];

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        {page.hero && !LEGAL.has(slug) ? (
          <PageOpening trail={trail} label="TOURMELLOH" display={page.display} lead={page.lead} photo={page.hero} />
        ) : (
          <div className="tour-width cat-legal-opening">
            <Breadcrumbs trail={trail} />
            <h1>{page.display[0]} <em>{page.display[1]}</em></h1>
            <p className="tour-lead">{page.lead}</p>
          </div>
        )}

        {isFaq ? (
          <div className="tour-width cat-section">
            {page.sections.map((section) => (
              <section key={section.heading} className="cat-faq" style={{ paddingBlock: 40 }} aria-label={section.heading}>
                <h2 className="cat-legal-heading">{section.heading}</h2>
                <div className="faq-list">
                  {section.paragraphs.map((text, i, all) =>
                    i % 2 === 0 ? (
                      <details key={text}>
                        <summary>{text}<Plus size={19} aria-hidden="true" /></summary>
                        <p>{all[i + 1]}</p>
                      </details>
                    ) : null,
                  )}
                </div>
              </section>
            ))}
            <JsonLd data={faqLd(faqs)} />
          </div>
        ) : (
          <div className={`tour-width cat-section ${LEGAL.has(slug) ? "cat-legal" : ""}`}>
            {page.sections.map((section) => (
              <Reveal key={section.heading} className="cat-company-block">
                <h2 className="cat-legal-heading">{section.heading}</h2>
                <div className="cat-prose cat-prose-plain">
                  {section.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                  {section.points && (
                    <ul className="cat-list">{section.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
