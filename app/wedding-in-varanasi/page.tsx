import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/catalog/blocks";
import { Photo } from "@/components/catalog/photo";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageWhatsApp } from "@/components/wishlist/provider";
import { pages, weddingVenues } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

const copy = pages.find((p) => p.slug === "wedding-in-varanasi")!;
export const metadata = pageMeta({ ...copy.seo, path: "/wedding-in-varanasi", image: "wedding-mandap" });

/** Destination Weddings (brief v5, section 13): its own page, form and lead type. */
export default function WeddingPage() {
  return (
    <>
      <Navigation tone="paper" />
      <PageWhatsApp context={{ kind: "wedding" }} />
      <main id="main" className="cat-page">
        <div className="tour-width"><Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Destination Weddings", path: "/wedding-in-varanasi" }]} /></div>
        <section className="wed-hero tour-width" aria-labelledby="wed-title">
          <div className="wed-hero-photo"><Photo k="wedding-mandap" priority quality={88} sizes="(max-width: 900px) 94vw, 1460px" /></div>
          <div className="wed-hero-copy">
            <span className="tour-kicker">DESTINATION WEDDINGS</span>
            <h1 id="wed-title">{copy.display[0]}<em>{copy.display[1]}</em></h1>
            <p>{copy.lead}</p>
            <a href="#wedding-form" className="tour-primary" style={{ color: "var(--paper)" }}>Discuss Your Wedding</a>
          </div>
        </section>

        <section className="cat-section tour-width" aria-label="What we arrange">
          <div className="wed-grid">
            {copy.sections.map((s, i) => (
              <Reveal key={s.heading} className="wed-block">
                <span className="wed-num">{String(i + 1).padStart(2, "0")}</span>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
                {s.points && <ul className="cat-list">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="tour-width wed-strip" aria-label="Moments">
          {(["wedding-haldi", "wedding-ceremony", "wedding-decor"] as const).map((k) => (
            <div key={k}><Photo k={k} sizes="(max-width: 760px) 92vw, 32vw" /></div>
          ))}
        </section>

        {weddingVenues.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="venues-title">
            <div className="cat-head">
              <div className="cat-intro">
                <span className="tour-kicker" style={{ color: "var(--muted)" }}>VENUES</span>
                <h2 id="venues-title">Places we can help you <em>consider and approach.</em></h2>
              </div>
              <p>Well-known Varanasi venues that host weddings. Availability, capacity and terms are confirmed directly with each venue; listing here does not imply a partnership. Photographs show the mood, not the venue.</p>
            </div>
            <div className="venue-list">
              {weddingVenues.map((venue) => (
                <article key={venue.name} className="venue">
                  <div className="venue-photo"><Photo k={venue.photo} sizes="(max-width: 760px) 92vw, 24vw" /></div>
                  <span className="venue-kind">{venue.kind}</span>
                  <h3>{venue.name}</h3>
                  <p>{venue.note}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="tour-width plan-layout cat-section" id="wedding-form" aria-labelledby="wed-form-title">
          <div className="plan-intro">
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>DISCUSS YOUR WEDDING</span>
            <h2 id="wed-form-title" className="wed-form-h">Tell us about <em>the day.</em></h2>
            <p className="tour-lead">Dates, guests, events and the help you need. We reply with questions and a proposal; wedding guests&apos; travel is added to the same plan later.</p>
          </div>
          <div className="plan-panel"><EnquiryForm type="wedding" context="Wedding in Varanasi" /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
