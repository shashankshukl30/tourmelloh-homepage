import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JourneyCard, durationLong } from "@/components/catalog/cards";
import { FaqBlock, PageOpening, SectionIntro } from "@/components/catalog/blocks";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageWhatsApp } from "@/components/wishlist/provider";
import { collections, departures, journeyById, journeys, tierLabel } from "@/content/catalog";
import type { CollectionId } from "@/content/catalog/types";
import { pageMeta } from "@/lib/site";

export function collectionMeta(id: CollectionId) {
  const c = collections.find((x) => x.id === id);
  return c ? pageMeta({ ...c.seo, path: `/journeys/${c.slug}`, image: c.hero }) : {};
}

/** A specialist collection: links to existing itineraries, never a duplicate product (brief v5, section 4). */
export function CollectionPage({ id }: { id: CollectionId }) {
  const c = collections.find((x) => x.id === id);
  if (!c) notFound();
  const path = `/journeys/${c.slug}`;
  const linked = c.journeys.map((jid) => journeys.find((j) => j.id === jid)).filter((j) => j !== undefined);
  const deps = id === "womens-journeys" ? departures : [];
  const formType = id === "wellness-in-varanasi" ? "wellness" : "custom";

  return (
    <>
      <Navigation tone="paper" />
      <PageWhatsApp context={id === "wellness-in-varanasi" ? { kind: "wellness" } : { kind: "collection", title: c.name }} />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, { name: "Journeys", path: "/journeys" }, { name: c.name, path }]}
          label="SPECIALIST COLLECTION"
          display={c.display}
          meta={[c.subtitle]}
          lead={c.lead}
          photo={c.hero}
        >
          <a href="#collection-form" className="tour-primary" style={{ color: "var(--paper)" }}>{c.cta}</a>
        </PageOpening>

        <section className="cat-section tour-width cat-split" aria-labelledby="about-title">
          <SectionIntro id="about-title" label="HOW IT WORKS" display={[c.name, ""]} />
          <div className="cat-prose">{c.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="essentials-title">
          <SectionIntro id="essentials-title" label="BUILT IN, EVERY TIME" display={["What this collection", "always includes."]} />
          <div className="cat-moments cat-notes">
            {c.essentials.map((e) => (
              <article className="cat-moment cat-moment-plain" key={e.title}>
                <h3><Check size={18} aria-hidden="true" className="coll-check" /> {e.title}</h3>
                <p>{e.text}</p>
              </article>
            ))}
          </div>
        </section>

        {deps.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="departures-title">
            <SectionIntro id="departures-title" label="HOSTED DEPARTURES" display={["Group departures,", "with a female host."]} text="Fixed dates appear here once approved. A departure runs when its minimum group is confirmed; registering interest does not confirm a booking." />
            <div className="dep-list">
              {deps.map((d) => {
                const parent = journeyById(d.parent);
                return (
                  <article className="dep" key={d.id}>
                    <div className="dep-head">
                      <span className="dep-status" data-status={d.status}>{d.status}</span>
                      <span className="dep-id">{d.id}</span>
                    </div>
                    <h3>{d.title}</h3>
                    <p className="dep-route">{d.route}{parent ? ` · ${durationLong(parent)}` : ""}</p>
                    {d.dates
                      ? <p className="dep-dates">{d.dates.start} to {d.dates.end}</p>
                      : <p className="dep-dates dep-dates-soon">Dates coming soon</p>}
                    {d.minimum && <p className="dep-note">Runs with a minimum of {d.minimum} travellers{d.capacity ? `, up to ${d.capacity}` : ""}.</p>}
                    <p className="dep-note">Tiers: {d.tiers.map((t) => tierLabel[t]).join(", ")}</p>
                    <p>{d.hostScope}</p>
                    {parent && <Link className="tour-text-link" href={`/journeys/${parent.slug}`}>The itinerary it follows <ArrowUpRight size={15} aria-hidden="true" /></Link>}
                    <details className="dep-form">
                      <summary>{d.dates ? "Enquire About This Departure" : "Register Interest in Future Dates"}</summary>
                      <EnquiryForm type="departure" departure={{ id: d.id, title: d.title, dated: !!d.dates }} context={d.title} cta={d.dates ? "Enquire About This Departure" : "Register Interest"} />
                      <p className="enquiry-small">Departure is subject to the stated minimum group size. Registration of interest does not confirm a booking. Tourmelloh confirms the departure and complete price before requesting any payment.</p>
                    </details>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {c.offers.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="offers-title">
            <SectionIntro id="offers-title" label="NAMED JOURNEYS" display={["Ready to adapt,", "for your party."]} />
            <div className="offer-list">
              {c.offers.map((o) => {
                const parent = journeyById(o.parent);
                return (
                  <article className="offer" key={o.id}>
                    <span className="dep-id">{o.id}</span>
                    <h3>{o.title}</h3>
                    <p>{o.note}</p>
                    {parent
                      ? <Link className="tour-text-link" href={`/journeys/${parent.slug}`}>Based on {parent.title.split(" – ")[0]} ({durationLong(parent)}) <ArrowUpRight size={15} aria-hidden="true" /></Link>
                      : <p className="dep-note">Available on request: ask us for this route.</p>}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {linked.length > 0 && id !== "shravan" && id !== "family-journeys" && (
          <section className="cat-section tour-width" aria-labelledby="linked-title">
            <SectionIntro id="linked-title" label="JOURNEYS IN THIS COLLECTION" display={["Proposed routes,", "destinations shown."]} />
            <div className="cat-grid" style={{ marginTop: 40 }}>{linked.map((j) => <JourneyCard key={j.id} journey={j} />)}</div>
          </section>
        )}

        <FaqBlock faqs={c.faqs} />

        {id !== "womens-journeys" && (
          <section className="tour-width plan-layout cat-section" id="collection-form" aria-labelledby="cf-title">
            <div className="plan-intro">
              <span className="tour-kicker" style={{ color: "var(--clay)" }}>{c.cta.toUpperCase()}</span>
              <h2 id="cf-title" className="wed-form-h">Tell us who <em>is travelling.</em></h2>
              <p className="tour-lead">We shape the journey around them, then send a complete quotation before any payment.</p>
            </div>
            <div className="plan-panel"><EnquiryForm type={formType} collection={id} context={c.name} cta={c.cta} /></div>
          </section>
        )}
        {id === "womens-journeys" && <div id="collection-form" />}
      </main>
      <Footer />
    </>
  );
}
