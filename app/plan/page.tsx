import { Phone } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/catalog/blocks";
import { Photo } from "@/components/catalog/photo";
import { EnquiryForm } from "@/components/enquiry-form";
import { WhatsAppIcon, whatsappHref } from "@/components/whatsapp-link";
import { cities, destinations, experiences, journeys } from "@/content/catalog";
import { brand, pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Plan Your Private India Journey | Tourmelloh",
  description:
    "Tell us where you would like to go, when and who is travelling. We reply with first thoughts and questions, then a written proposal shaped around you.",
  path: "/plan",
  image: "luxury-palace-courtyard",
});

export default function PlanPage() {
  const interests = [
    ...journeys.map((j) => ({ value: `journey:${j.slug}`, label: j.title })),
    ...destinations.map((d) => ({ value: `destination:${d.slug}`, label: `${d.name} (the region)` })),
    ...cities.map((c) => ({ value: `city:${c.slug}`, label: `Time in ${c.name}` })),
    ...experiences.map((e) => ({ value: `experience:${e.slug}`, label: e.title })),
  ];
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <div className="tour-width">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Plan your journey", path: "/plan" }]} />
        </div>
        <section className="tour-width plan-layout" aria-labelledby="plan-title">
          <div className="plan-intro">
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>PLAN WITH TOURMELLOH</span>
            <h1 id="plan-title">Your India begins with <em>a conversation.</em></h1>
            <p className="tour-lead">
              Tell us the places on your mind, the people travelling with you and the things you do not want to miss.
              We reply with first thoughts and a few questions, then a written proposal with hotels, timings and a price.
            </p>
            <div className="plan-photo"><Photo k="udaipur-lake-palace" sizes="(max-width: 900px) 92vw, 36vw" /></div>
            <div className="plan-direct">
              <p>Prefer to talk?</p>
              <a href={brand.phoneHref}><Phone size={17} aria-hidden="true" /> {brand.phone}</a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> WhatsApp</a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
          </div>
          <div className="plan-panel">
            <EnquiryForm interests={interests} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
