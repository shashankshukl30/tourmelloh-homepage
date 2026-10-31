import type { Metadata } from "next";
import { media } from "@/content/catalog/media";
import type { MediaKey } from "@/content/catalog/media-plan";

export const SITE_URL = "https://tourmelloh.com";

export const brand = {
  name: "Tourmelloh",
  descriptor: "Travel and Destination Partners",
  line: "Your travel and destination partners in Varanasi and beyond",
  phone: "+91 63910 85555",
  phoneHref: "tel:+916391085555",
  phoneE164: "+916391085555",
  whatsapp: "916391085555",
  email: "enquiries@tourmelloh.com",
  city: "Varanasi",
  region: "Uttar Pradesh",
  founder: "Aparajita Upadhyaya",
};

/** Mailboxes by role (brief v5, section 12). Routing for each lead type lives in the enquiry route. */
export const mailboxes = {
  enquiries: "enquiries@tourmelloh.com",
  partnerships: "partnerships@tourmelloh.com",
  varanasi: "varanasi@tourmelloh.com",
  director: "director@tourmelloh.com",
  accounts: "accounts@tourmelloh.com",
};

/** Search engines index only the production domain; preview hosts stay out of results. */
export const isProduction = process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_INDEX === "1";

export const absolute = (path: string) => new URL(path, SITE_URL).toString();

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
  const og = image ? { url: `/og/${image}.jpg`, width: 1200, height: 630, alt: media[image].alt } : { url: "/og.jpg", width: 1200, height: 630, alt: brand.line };
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
  logo: absolute("/brand/tourmelloh-logo.png"),
  image: absolute("/og.jpg"),
  description: `${brand.descriptor}. ${brand.line}.`,
  slogan: brand.descriptor,
  telephone: brand.phoneE164,
  email: brand.email,
  areaServed: ["Varanasi", "Sarnath", "Prayagraj", "Ayodhya", "Gaya", "Bodh Gaya", "Uttar Pradesh", "Bihar"].map((name) => ({ "@type": "Place", name })),
  founder: { "@type": "Person", name: brand.founder },
  address: {
    "@type": "PostalAddress",
    addressLocality: brand.city,
    addressRegion: brand.region,
    addressCountry: "IN",
  },
};
