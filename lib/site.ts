import type { Metadata } from "next";
import { media } from "@/content/catalog/media";
import type { MediaKey } from "@/content/catalog/media-plan";

import { SITE_URL, absolute } from "@/lib/url";
export { SITE_URL, absolute };

import { brand } from "@/lib/brand";
export { brand };

/**
 * Mailboxes by role (brief v5, section 12). Until the client creates the @tourmelloh.com addresses
 * (enquiries@, partnerships@, varanasi@, director@, accounts@), every role uses the Gmail inbox.
 * Switching later is a change here only.
 */
const MAIN_INBOX = "tourmelloh@gmail.com";
export const mailboxes = {
  enquiries: MAIN_INBOX,
  partnerships: MAIN_INBOX,
  varanasi: MAIN_INBOX,
  director: MAIN_INBOX,
  accounts: MAIN_INBOX,
};

/** Search engines index only the production domain; preview hosts stay out of results. */
export const isProduction = process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_INDEX === "1";


/** One metadata shape for every page: canonical on tourmelloh.com, share card from the page's photograph. */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: MediaKey;
  type?: "website" | "article";
}): Metadata {
  const og = image ? { url: `/og/${image}.jpg`, width: 1200, height: 630, alt: media[image].alt } : { url: "/og-tourmelloh-v2.jpg", width: 1200, height: 630, alt: brand.line };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: absolute(path) },
    openGraph: { title, description, url: absolute(path), siteName: brand.name, type, locale: "en_IN", images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og.url] },
  };
}

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((step, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: step.name,
    item: absolute(step.path),
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

export const agencyLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#agency`,
  name: brand.name,
  url: SITE_URL,
  logo: absolute("/brand/tourmelloh-logo-google.png"),
  image: absolute("/og-tourmelloh-v2.jpg"),
  description: `${brand.descriptor}. ${brand.line}.`,
  slogan: brand.descriptor,
  telephone: brand.phoneE164,
  email: brand.email,
  areaServed: ["Varanasi", "Sarnath", "Prayagraj", "Ayodhya", "Gaya", "Bodh Gaya", "Uttar Pradesh", "Bihar"].map((name) => ({ "@type": "Place", name })),
  founder: [{ "@type": "Person", name: "Aparajita" }, { "@type": "Person", name: "Gaurav" }],
  address: {
    "@type": "PostalAddress",
    addressLocality: brand.city,
    addressRegion: brand.region,
    addressCountry: "IN",
  },
};
