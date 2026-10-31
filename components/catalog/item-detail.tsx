import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/catalog/photo";
import { ExperienceCard, ServiceCard } from "@/components/catalog/cards";
import { EnquiryBand, FactList, PageOpening, SectionIntro } from "@/components/catalog/blocks";
import { AddToJourney } from "@/components/wishlist/add-button";
import { PageWhatsApp } from "@/components/wishlist/provider";
import { experiences, itemById, services } from "@/content/catalog";
import type { Experience, Service } from "@/content/catalog/types";
import { anchor } from "@/content/catalog/nav";
import { absolute } from "@/lib/site";

/** One template for a service (S01–S34) or an experience (E01–E34). */
export function ItemDetail({ item }: { item: Service | Experience }) {
  const isService = item.id.startsWith("S");
  const section = isService ? { name: "Services", path: "/services" } : { name: "Experiences", path: "/experiences" };
  const path = `${section.path}/${item.slug}`;
  const experience = !isService ? (item as Experience) : undefined;
  const service = isService ? (item as Service) : undefined;
  const linked = [...(item.relations.overlapsWith ?? []), ...(item.relations.deliveredBy ?? [])]
    .map((id) => itemById(id)).filter((i) => i !== undefined);
  const relatedServices = services.filter((s) => linked.some((l) => l.id === s.id));
  const relatedExperiences = experiences.filter((e) => linked.some((l) => l.id === e.id));
  const sameCategory = (isService ? services.filter((s) => s.category === item.category && s.id !== item.id) : experiences.filter((e) => e.category === item.category && e.id !== item.id)).slice(0, 3);

  return (
    <>
      <Navigation tone="paper" />
      <PageWhatsApp context={isService ? { kind: "service", title: item.title, place: item.locations.split(/[,;.]/)[0] } : { kind: "experience", title: item.title, place: item.locations.split(/[,;.]/)[0] }} />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, section, { name: item.category, path: `${section.path}#${anchor(item.category)}` }, { name: item.title, path }]}
          label={`${item.category.toUpperCase()} · ${item.id}`}
          display={[item.title, experience?.subtitle ?? ""]}
          meta={[item.locations, item.unit]}
          lead={item.summary}
          photo={item.hero}
        >
          <AddToJourney id={item.id} />
        </PageOpening>

        <section className="cat-section tour-width cat-split" aria-labelledby="about-title">
          <div>
            <SectionIntro id="about-title" label={isService ? "THE SERVICE" : "THE EXPERIENCE"} display={["How it", "works."]} />
            <div style={{ marginTop: 28 }}>
              <FactList facts={[
                { label: "Where", value: item.locations },
                { label: "Booked per", value: item.unit },
                { label: "Price", value: "Quoted for your journey. You see the complete price before any payment." },
              ]} />
            </div>
          </div>
          <div className="cat-prose">{item.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>
        </section>

        {experience && (
          <section className="tour-width" aria-label="Gallery">
            <div className="cat-gallery">
              {[experience.hero, ...experience.gallery].map((k) => <div key={k}><Photo k={k} sizes="(max-width: 900px) 92vw, 50vw" /></div>)}
            </div>
          </section>
        )}

        <section className="cat-section tour-width" aria-labelledby="detail-title">
          <div className="cat-terms" style={{ marginTop: 0 }}>
            <div>
              <SectionIntro id="detail-title" label={experience ? "WHAT TO EXPECT" : "WHAT WE NEED TO KNOW"} display={experience ? ["Step", "by step."] : ["To arrange", "it well."]} />
              <ol className="cat-list cat-list-numbered" style={{ marginTop: 28 }}>
                {(experience ? experience.expect : service!.weAsk).map((x) => <li key={x}>{x}</li>)}
              </ol>
            </div>
            <div>
              <SectionIntro id="scope-title" label={experience ? "GOOD TO KNOW" : "SCOPE AND LIMITS"} display={experience ? ["Before", "you go."] : ["What it is,", "and is not."]} />
              <ul className="cat-list" style={{ marginTop: 28 }}>
                {(experience ? experience.practical : service!.scope).map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </div>
          <div className="item-cta">
            <AddToJourney id={item.id} />
            <p>Added items are requests. If something is already part of your journey and tier it shows as included and is never charged twice.</p>
          </div>
        </section>

        {(relatedServices.length + relatedExperiences.length > 0 || sameCategory.length > 0) && (
          <section className="cat-section tour-width" aria-labelledby="more-title">
            <SectionIntro id="more-title" label={linked.length ? "LINKED ARRANGEMENTS" : "ALSO IN THIS SECTION"} display={["Worth looking at", "alongside."]} />
            <div className="cat-grid" style={{ marginTop: 40 }}>
              {(linked.length ? [...relatedExperiences, ...relatedServices] : sameCategory).map((x) =>
                x.id.startsWith("S") ? <ServiceCard key={x.id} service={x as Service} /> : <ExperienceCard key={x.id} experience={x as Experience} />,
              )}
            </div>
          </section>
        )}

        <EnquiryBand title={["Arranged around", "your journey."]} text="Add it to My Journey and ask for a quotation, or tell us what you need on WhatsApp." planHref="/your-journey" />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": isService ? "Service" : "TouristTrip",
          name: item.title,
          description: item.summary,
          url: absolute(path),
          image: absolute(`/og/${item.hero}.jpg`),
          provider: { "@id": absolute("/#agency") },
          areaServed: item.locations,
        }} />
      </main>
      <Footer />
    </>
  );
}
