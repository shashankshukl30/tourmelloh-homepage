import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { Photo } from "@/components/catalog/photo";
import { JourneyCard, duration } from "@/components/catalog/cards";
import {
  EnquiryBand,
  FactList,
  FaqBlock,
  PageOpening,
  PrimaryLink,
  SectionIntro,
  WhatsAppButton,
} from "@/components/catalog/blocks";
import { collections, journeys } from "@/content/catalog";
import { absolute, pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => journeys.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journey = journeys.find((item) => item.slug === slug);
  if (!journey) return {};
  return pageMeta({ ...journey.seo, path: `/journeys/${journey.slug}`, image: journey.hero });
}

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = journeys.find((item) => item.slug === slug);
  if (!journey) notFound();
  const collection = collections.find((item) => item.id === journey.collection);
  const planHref = `/plan?journey=${journey.slug}`;
  const related = [
    ...journeys.filter((item) => item.slug !== journey.slug && item.collection === journey.collection),
    ...journeys.filter((item) => item.slug !== journey.slug && item.collection !== journey.collection && item.destinations.some((d) => journey.destinations.includes(d))),
  ].slice(0, 3);

  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: journey.title,
    description: journey.lead,
    url: absolute(`/journeys/${journey.slug}`),
    image: absolute(`/og/${journey.hero}.jpg`),
    touristType: journey.bestFor,
    provider: { "@id": absolute("/#agency") },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: journey.itinerary.length,
      itemListElement: journey.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        item: { "@type": "TouristAttraction", name: `Day ${day.day}: ${day.title}`, description: day.text },
      })),
    },
  };

  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[
            { name: "Home", path: "/" },
            { name: "Journeys", path: "/journeys" },
            ...(collection ? [{ name: collection.name, path: `/collections/${collection.slug}` }] : []),
            { name: journey.title, path: `/journeys/${journey.slug}` },
          ]}
          label={journey.kicker.toUpperCase()}
          display={journey.display}
          meta={[duration(journey), collection?.name ?? ""].filter(Boolean)}
          lead={journey.lead}
          photo={journey.hero}
        >
          <PrimaryLink href={planHref}>Plan this journey</PrimaryLink>
          <WhatsAppButton />
        </PageOpening>

        <div className="tour-width">
          <section className="tour-route" aria-label="The route">
            <span className="tour-kicker">THE ROUTE</span>
            <ol>
              {journey.route.map((stop, index) => (
                <li key={stop}>
                  <span className="tour-stop-number">{String(index + 1).padStart(2, "0")}</span>
                  <span>{stop}</span>
                  {index < journey.route.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="cat-section tour-width cat-split" aria-labelledby="glance-title">
          <div>
            <SectionIntro id="glance-title" label="AT A GLANCE" display={["A journey", "worth the time."]} text={journey.bestFor} />
            <div style={{ marginTop: 28 }}>
              <PrimaryLink href={planHref}>Ask for a proposal</PrimaryLink>
            </div>
          </div>
          <div>
            <FactList
              facts={[
                { label: "Duration", value: duration(journey) },
                { label: "The pace", value: journey.pace },
                { label: "When to go", value: journey.season },
                { label: "Price", value: "Tailored to your dates, stays and party. On request." },
              ]}
            />
            <h3 className="cat-sub">Highlights</h3>
            <ul className="cat-list">
              {journey.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <div className="tour-width">
          <section className="cat-signature cat-section" aria-labelledby="signature-title" style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}>
            <SectionIntro id="signature-title" label="THE TOURMELLOH TOUCH" display={["Moments arranged", "only for you."]} />
            <div className="cat-signature-list">
              {journey.signature.map((moment) => (
                <article key={moment.title}>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="cat-section tour-width" id="itinerary" aria-labelledby="days-title">
          <SectionIntro id="days-title" label="DAY BY DAY" display={["The days,", "unfolding."]} text="A considered sequence, not a fixed timetable. We shape the order around your arrival, the seasons and the pace that suits you." />
          <div className="cat-days">
            {journey.itinerary.map((day) => (
              <Reveal className="cat-day" key={day.day}>
                <div className="cat-day-photo">
                  <Photo k={day.photo} sizes="(max-width: 900px) 92vw, 44vw" />
                </div>
                <div className="cat-day-copy">
                  <span className="cat-day-label"><strong>{String(day.day).padStart(2, "0")}</strong>{day.place}</span>
                  <h3>{day.title}</h3>
                  <p>{day.text}</p>
                  {day.moments.length > 0 && <ul>{day.moments.map((m) => <li key={m}>{m}</li>)}</ul>}
                  <p className="cat-day-stay"><span>Overnight · </span>{day.overnight}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="tour-width" aria-label="Gallery">
          <div className="cat-gallery">
            {journey.gallery.map((key) => (
              <div key={key}><Photo k={key} sizes="(max-width: 900px) 92vw, 50vw" /></div>
            ))}
          </div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="stays-title">
          <SectionIntro id="stays-title" label="WHERE YOU STAY" display={["Rooms with", "a sense of place."]} text="Suggested stays, chosen for character, comfort and location. We confirm the final hotels and room categories in your proposal." />
          <div className="cat-stays">
            {journey.stays.map((stay) => (
              <div className="cat-stay" key={`${stay.place}-${stay.stay}`}>
                <span>{stay.place} · {stay.nights} {stay.nights === 1 ? "night" : "nights"}</span>
                <strong>{stay.stay}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="cat-section tour-width" aria-labelledby="terms-title">
          <SectionIntro id="terms-title" label="THE DETAILS" display={["What is", "taken care of."]} />
          <div className="cat-terms">
            <div>
              <h3>Included</h3>
              <ul className="cat-list">{journey.included.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Not included</h3>
              <ul className="cat-list">{journey.excluded.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <div className="cat-moments">
            {journey.notes.map((note) => (
              <article className="cat-moment cat-moment-plain" key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </section>

        <FaqBlock faqs={journey.faqs} />

        {related.length > 0 && (
          <section className="cat-section tour-width" aria-labelledby="related-title">
            <SectionIntro id="related-title" label="KEEP EXPLORING" display={["Other ways", "to go."]} />
            <div className="cat-grid" style={{ marginTop: 44 }}>
              {related.map((item) => <JourneyCard key={item.slug} journey={item} />)}
            </div>
          </section>
        )}

        <EnquiryBand title={["Make this journey", "your own."]} planHref={planHref} />
        <JsonLd data={trip} />
      </main>
      <Footer />
    </>
  );
}
