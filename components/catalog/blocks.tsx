import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Plus } from "lucide-react";
import type { Display, Faq, MediaKey } from "@/content/catalog/types";
import { Photo, caption } from "@/components/catalog/photo";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon, whatsappHref } from "@/components/whatsapp-link";
import { JsonLd } from "@/components/json-ld";
import { brand, breadcrumbLd, faqLd } from "@/lib/site";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <>
      <nav className="tour-breadcrumb" aria-label="Breadcrumb">
        {trail.map((step, index) =>
          index === trail.length - 1 ? (
            <span key={step.path} aria-current="page">{step.name}</span>
          ) : (
            <span key={step.path} className="cat-crumb">
              <Link href={step.path}>{step.name}</Link>
              <span aria-hidden="true">/</span>
            </span>
          ),
        )}
      </nav>
      <JsonLd data={breadcrumbLd(trail)} />
    </>
  );
}

/** The opening of every catalogue page: words on the left, one large photograph on the right. */
export function PageOpening({
  trail,
  label,
  display,
  meta = [],
  lead,
  photo,
  children,
}: {
  trail: Crumb[];
  label: string;
  display: Display;
  meta?: string[];
  lead: string;
  photo: MediaKey;
  children?: React.ReactNode;
}) {
  return (
    <div className="tour-width">
      <Breadcrumbs trail={trail} />
      <section className="tour-opening" aria-labelledby="page-title">
        <Reveal className="tour-opening-copy">
          <span className="tour-kicker">{label}</span>
          <h1 id="page-title">
            {display[0]} <em>{display[1]}</em>
          </h1>
          {meta.length > 0 && (
            <div className="tour-opening-meta">
              {meta.map((item) => <span key={item}>{item}</span>)}
            </div>
          )}
          <p className="tour-lead">{lead}</p>
          {children && <div className="tour-opening-actions">{children}</div>}
        </Reveal>
        <Reveal className="tour-opening-visual" delay={0.12}>
          <figure>
            <div className="tour-hero-photo">
              <Photo k={photo} priority quality={88} sizes="(max-width: 700px) 92vw, 52vw" />
            </div>
            <figcaption>
              <MapPin size={13} aria-hidden="true" />
              <span>{caption(photo)}</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>
    </div>
  );
}

export function SectionIntro({
  label,
  display,
  text,
  id,
}: {
  label: string;
  display: Display;
  text?: string;
  id: string;
}) {
  return (
    <Reveal className="cat-intro">
      <span className="tour-kicker">{label}</span>
      <h2 id={id}>
        {display[0]} <em>{display[1]}</em>
      </h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="tour-primary" style={{ color: "var(--paper)" }}>
      {children} <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}

export function WhatsAppButton({ label = "Ask on WhatsApp" }: { label?: string }) {
  return (
    <a className="cat-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon size={19} /> {label}
    </a>
  );
}

export function FaqBlock({ faqs, id = "faq", title = ["Questions,", "answered."] }: { faqs: Faq[]; id?: string; title?: Display }) {
  if (!faqs.length) return null;
  return (
    <section className="cat-faq tour-width" aria-labelledby={id}>
      <SectionIntro id={id} label="GOOD TO KNOW" display={title} />
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.q}>
            <summary>
              {faq.q}
              <Plus size={19} aria-hidden="true" />
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(faqs)} />
    </section>
  );
}

/** The closing invitation on every catalogue page. */
export function EnquiryBand({
  title = ["Your India,", "privately arranged."],
  text = "Tell us the places on your mind, your dates and who is travelling. We reply with a written proposal shaped around you.",
  planHref = "/plan",
}: {
  title?: Display;
  text?: string;
  planHref?: string;
}) {
  return (
    <section className="cat-band" aria-labelledby="enquiry-band-title">
      <div className="tour-width cat-band-inner">
        <Reveal>
          <span className="tour-kicker">PLAN WITH TOURMELLOH</span>
          <h2 id="enquiry-band-title">
            {title[0]} <em>{title[1]}</em>
          </h2>
        </Reveal>
        <Reveal className="cat-band-copy" delay={0.08}>
          <p>{text}</p>
          <div className="cat-band-actions">
            <Link href={planHref} className="tour-primary" style={{ color: "var(--paper)" }}>
              Plan your journey <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a className="cat-band-link" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={19} /> WhatsApp
            </a>
            <a className="cat-band-link" href={brand.phoneHref}>
              <Phone size={17} aria-hidden="true" /> {brand.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FactList({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="cat-facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
