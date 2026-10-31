import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Breadcrumbs, EnquiryBand, PageOpening } from "@/components/catalog/blocks";
import { Reveal } from "@/components/reveal";
import { pages } from "@/content/catalog";
import { brand, pageMeta } from "@/lib/site";

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
          {slug === "about" && (
            <div className="founder">
              <div className="founder-photo" aria-hidden="true"><span>{brand.founder.split(" ").map((w) => w[0]).join("")}</span></div>
              <div>
                <span className="tour-kicker">FOUNDER</span>
                <h2>{brand.founder}</h2>
                <p>Founder of Tourmelloh, from Varanasi&apos;s hospitality industry. Her perspective shapes how journeys are designed: the accompanying hosts, the pacing for parents and the hosted women&apos;s departures.</p>
                <div className="founder-links">
                  <Link href="/journeys">Journeys</Link>
                  <Link href="/journeys/shravan">SHRAVAN for parents</Link>
                  <Link href="/journeys/womens-journeys">Her Own Way</Link>
                </div>
              </div>
            </div>
          )}
          {slug === "terms" && (
            <p className="cat-legal-note">Some photographs on this site are used under licences that ask for a credit; they are listed on our <a href="/photo-credits">photo credits</a> page.</p>
          )}
        </div>
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
