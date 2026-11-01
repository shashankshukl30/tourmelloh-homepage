import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ChevronDown } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/catalog/photo";
import { ExperienceCard, ServiceCard, durationLong } from "@/components/catalog/cards";
import { EnquiryBand, FactList, FaqBlock, PageOpening, SectionIntro } from "@/components/catalog/blocks";
import { TierPanel, type PanelLine } from "@/components/journey/tier-panel";
import { DayToggle } from "@/components/journey/day-toggle";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { whatsappUrl } from "@/lib/whatsapp";
import { experiences, itemById, itemHref, journeys, services } from "@/content/catalog";
import { TIERS, type Tier } from "@/content/catalog/types";
import { absolute, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => journeys.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journey = journeys.find((j) => j.slug === slug);
  return journey ? pageMeta({ ...journey.seo, path: `/journeys/${slug}`, image: journey.hero }) : {};
}

const BLOCK_LABEL: Record<string, string> = { travel: "On the road", visit: "Visit", rest: "Rest", experience: "Experience", arrival: "Arrival", departure: "Departure", free: "Free time" };

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = journeys.find((j) => j.slug === slug);
  if (!journey) notFound();
  const [name, subtitle] = journey.title.split(" – ");
  const path = `/journeys/${slug}`;

  const tiers = Object.fromEntries(
    TIERS.map((t) => [t, {
      ...journey.tiers[t],
      lines: journey.tiers[t].lines.map((l): PanelLine => ({
        item: l.item, title: itemById(l.item)?.title ?? l.item, href: itemHref(l.item),
        day: l.day, session: l.session, scope: l.scope, state: l.state, mandatory: l.mandatory,
      })),
    }]),
  ) as Record<Tier, Omit<(typeof journey.tiers)[Tier], "lines"> & { lines: PanelLine[] }>;

  const related = journey.related.map((id) => itemById(id)).filter((i) => i !== undefined);
  const relatedServices = services.filter((s) => related.some((r) => r.id === s.id));
  const relatedExperiences = experiences.filter((e) => related.some((r) => r.id === e.id));

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, { name: "Packages", path: "/journeys" }, { name, path }]}
          label="PROPOSED ITINERARY"
          display={[name, subtitle ?? `${journey.nights} nights, ${journey.days} days.`]}
          meta={subtitle ? [durationLong(journey), journey.route] : [journey.route]}
          lead={journey.lead}
          photo={journey.hero}
        >
          <a href="#tiers" className="tour-primary" style={{ color: "var(--paper)" }}>Compare Standard, Premium &amp; Luxury</a>
          <a href={whatsappUrl({ kind: "journey", id: journey.id, title: journey.title, route: journey.route, url: absolute(path) })} className="cat-whatsapp" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> Get a quote</a>
        </PageOpening>

        <div className="tour-width">
          <section className="tour-route" aria-label="Overnights">
            <span className="tour-kicker">WHERE YOU STAY</span>
            <ol>
              {journey.overnights.map((o, i) => (
                <li key={`${o.place}-${i}`}>
                  <span className="tour-stop-number">{o.nights}N</span>
                  <span>{o.place}</span>
                  {i < journey.overnights.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="cat-section tour-width cat-split" aria-labelledby="glance-title">
          <SectionIntro id="glance-title" label="AT A GLANCE" display={["Who it suits,", "and how it moves."]} text={journey.suits} />
          <div>
            <FactList facts={[
              { label: "Proposed duration", value: `${durationLong(journey)}${journey.durationNote ? `. ${journey.durationNote}` : ""}` },
              { label: "Travel style", value: journey.style },
              { label: "Arrive", value: journey.gateways.arrival },
              { label: "Depart", value: journey.gateways.departure },
            ]} />
            <p className="cat-warning"><AlertTriangle size={17} aria-hidden="true" /> {journey.gateways.timingWarning}</p>
          </div>
        </section>

        <section className="cat-section tour-width" id="itinerary" aria-labelledby="days-title">
          <SectionIntro id="days-title" label="DAY BY DAY" display={["The days,", "with time to breathe."]} text="A proposed programme with its travel and rest built in. We adjust the order to your arrival, the season and your pace." />
          <div className="dd-head"><DayToggle scope="#itinerary" /></div>
          <div className="dd-list">
            {journey.itinerary.map((day) => (
              <details className="dd" key={day.day} open={day.day === 1}>
                <summary className="dd-sum">
                  <span className="dd-num">Day {day.day}</span>
                  <span className="dd-title">{day.title}</span>
                  <span className="dd-stay">{/departure/i.test(day.overnight) ? "Departure day" : `Overnight in ${day.overnight}`}</span>
                  <ChevronDown className="dd-chev" size={22} aria-hidden="true" />
                </summary>
                <div className="dd-body">
                  <div className="dd-photo"><Photo k={day.photo} sizes="(max-width: 900px) 92vw, 40vw" /></div>
                  <div>
                    <ol className="day-blocks">
                      {day.blocks.map((b, i) => (
                        <li key={i} data-kind={b.kind}>
                          <span className="day-block-time">{b.time}<em>{BLOCK_LABEL[b.kind]}</em></span>
                          <div><strong>{b.title}</strong><p>{b.text}</p></div>
                        </li>
                      ))}
                    </ol>
                    <p className="cat-day-stay"><span>Overnight · </span>{day.overnight}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="practical-title">
          <SectionIntro id="practical-title" label="BEFORE YOU DECIDE" display={["Walking, early starts", "and the season."]} />
          <div className="cat-moments cat-notes">
            {[
              ["Walking and steps", journey.practical.walking],
              ["Early starts", journey.practical.earlyStarts],
              ["Boats and boarding", journey.practical.boarding],
              ["Mobility", journey.practical.mobility],
              ["Season", journey.practical.seasonal],
            ].map(([title, text]) => (
              <article className="cat-moment cat-moment-plain" key={title}><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <div className="tour-width">
          <TierPanel journey={{ id: journey.id, slug, title: journey.title, route: journey.route }} tiers={tiers} />
        </div>

        {(relatedExperiences.length > 0 || relatedServices.length > 0) && (
          <section className="cat-section tour-width" aria-labelledby="related-title">
            <SectionIntro id="related-title" label="ADD TO THIS JOURNEY" display={["Experiences and services", "worth adding."]} text="Add them to My Journey. If something is already part of your tier it shows as included, and nothing is charged twice." />
            <div className="cat-grid" style={{ marginTop: 40 }}>
              {relatedExperiences.map((e) => <ExperienceCard key={e.id} experience={e} />)}
              {relatedServices.map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>
          </section>
        )}

        <FaqBlock faqs={journey.faqs} />

        <section className="tour-width cat-terms-note" aria-label="Availability and cancellation">
          <p><strong>Availability and cancellation.</strong> Hotels, vehicles, boats, guides and temple arrangements are confirmed when we prepare your quotation, and they depend on dates, weather, river levels and the rules of each site. Cancellation terms follow the suppliers in your journey and are set out in the quotation. <Link href="/booking-terms">Booking terms</Link></p>
          <p><strong>This is a request for a personalised quotation, not a booking.</strong> No payment is required to send your preferences.</p>
        </section>

        <EnquiryBand title={["Make this journey", "your own."]} planHref="#tiers" />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: journey.title,
          description: journey.lead,
          url: absolute(path),
          image: absolute(`/og/${journey.hero}.jpg`),
          touristType: journey.suits,
          provider: { "@id": absolute("/#agency") },
          itinerary: {
            "@type": "ItemList",
            numberOfItems: journey.itinerary.length,
            itemListElement: journey.itinerary.map((d) => ({ "@type": "ListItem", position: d.day, item: { "@type": "TouristAttraction", name: `Day ${d.day}: ${d.title}`, description: d.blocks.map((b) => b.title).join(", ") } })),
          },
        }} />
      </main>
      <Footer />
    </>
  );
}
