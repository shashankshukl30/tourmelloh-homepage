import { Phone } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/catalog/blocks";
import { Photo } from "@/components/catalog/photo";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { WhatsAppIcon, whatsappHref } from "@/components/whatsapp-link";
import { brand, pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Help Me Plan a Varanasi Journey | Tourmelloh",
  description: "Not sure of the route or how many days? Tell us the places, people and pace on your mind. We recommend a journey and send a complete quotation.",
  path: "/help-me-plan",
  image: "varanasi-boats-evening",
});

export default function Page() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <div className="tour-width"><Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Help me plan", path: "/help-me-plan" }]} /></div>
        <section className="tour-width plan-layout" aria-labelledby="plan-title">
          <div className="plan-intro">
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>HELP ME PLAN</span>
            <h1 id="plan-title">Tell us the idea. <em>We shape the route.</em></h1>
            <p className="tour-lead">You do not need to know travel times or how many days each place needs. Share where you would like to go, who is travelling and the pace that suits you. We recommend a route and duration, then send a complete quotation before any payment.</p>
            <div className="plan-photo"><Photo k="varanasi-boats-evening" sizes="(max-width: 900px) 92vw, 36vw" /></div>
            <div className="plan-direct">
              <p>Prefer to talk?</p>
              <a href={brand.phoneHref}><Phone size={17} aria-hidden="true" /> {brand.phone}</a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> Chat with Tourmelloh</a>
            </div>
          </div>
          <div className="plan-panel"><EnquiryForm type="custom" context="Help me plan" /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
