import type { Metadata } from "next";
import localFont from "next/font/local";
import { brand } from "@/content/travel";
import "./globals.css";

const newsreader = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-standard-normal.woff2",
      style: "normal",
      weight: "200 800",
    },
    {
      path: "../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-standard-italic.woff2",
      style: "italic",
      weight: "200 800",
    },
  ],
  variable: "--font-editorial",
  display: "swap",
});
const instrument = localFont({
  src: "../node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-standard-normal.woff2",
  variable: "--font-interface",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3108"),
  ),
  title: "Tourmelloh | Varanasi & Thoughtful Journeys Across India",
  description:
    "Discover India with Tourmelloh, based in Varanasi. Explore journeys through Ayodhya, Prayagraj, Lucknow, Gaya, Bodhgaya, Vrindavan and Agra.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Some journeys stay with you.",
    description: "Varanasi at heart. India within reach.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/brand/tourmelloh-favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: brand.name,
    telephone: "+917706997271",
    email: brand.email,
    areaServed: "India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  };
  return (
    <html lang="en" className={`${newsreader.variable} ${instrument.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
