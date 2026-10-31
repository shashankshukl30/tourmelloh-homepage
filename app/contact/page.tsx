import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageOpening, PrimaryLink } from "@/components/catalog/blocks";
import { WhatsAppIcon, whatsappHref } from "@/components/whatsapp-link";
import { brand, pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Tourmelloh | Travel and Destination Partners, Varanasi",
  description: "Call, WhatsApp or email Tourmelloh in Varanasi about journeys, services, experiences or a wedding in Kashi. We reply with questions and a proposal.",
  path: "/contact",
  image: "varanasi-boats-evening",
});

const ways = [
  { icon: <WhatsAppIcon size={22} />, label: "WhatsApp", value: brand.phone, href: whatsappHref, note: "The quickest way to reach us, wherever you are.", external: true },
  { icon: <Phone size={22} aria-hidden="true" />, label: "Call", value: brand.phone, href: brand.phoneHref, note: "Speak with us about dates, routes, rituals and arrangements." },
  { icon: <Mail size={22} aria-hidden="true" />, label: "Email", value: brand.email, href: `mailto:${brand.email}`, note: "Send a longer brief, or questions for later." },
];

export default function ContactPage() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
          label="SPEAK WITH US"
          display={["Every journey begins", "with a conversation."]}
          lead={`We are based in ${brand.city}, ${brand.region}, and plan journeys through Varanasi, Prayagraj, Ayodhya, Gaya and Bodh Gaya. Tell us your dates and who is travelling, and we will come back with questions and a proposed plan.`}
          photo="varanasi-boats-evening"
        >
          <PrimaryLink href="/help-me-plan">Plan Your Journey</PrimaryLink>
        </PageOpening>
        <section className="cat-section tour-width" aria-label="Ways to reach us">
          <div className="contact-ways">
            {ways.map((way) => (
              <a key={way.label} className="contact-way" href={way.href} {...(way.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="contact-icon">{way.icon}</span>
                <span className="contact-label">{way.label}</span>
                <strong>{way.value}</strong>
                <p>{way.note}</p>
                <ArrowUpRight className="contact-arrow" size={20} aria-hidden="true" />
              </a>
            ))}
            <div className="contact-way contact-place">
              <span className="contact-icon"><MapPin size={22} aria-hidden="true" /></span>
              <span className="contact-label">Based in</span>
              <strong>{brand.city}, {brand.region}</strong>
              <p>Meetings by appointment. <Link href="/help-me-plan">Send an enquiry</Link> and we will arrange a time.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
