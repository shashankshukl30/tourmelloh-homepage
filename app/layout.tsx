import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL, agencyLd, brand, isProduction } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { InterfaceInteractions } from "@/components/interface-interactions";
import { PhotoInteractions } from "@/components/photo-interactions";
import { WhatsAppLink } from "@/components/whatsapp-link";
import "./globals.css";

const newsreader = localFont({
  src: [
    {
      path: "../public/fonts/newsreader-400-opsz-normal.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/newsreader-400-opsz-italic.woff2",
      style: "italic",
      weight: "400",
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
  metadataBase: new URL(SITE_URL),
  title: "Tourmelloh | Luxury Private Journeys Across India",
  description: brand.line,
  applicationName: brand.name,
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: "/brand/tourmelloh-favicon.svg", apple: "/brand/tourmelloh-favicon.png" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#f6f1e7" };

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: brand.name,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#agency` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${instrument.variable}`}>
      <head>
        <JsonLd data={[agencyLd, websiteLd]} />
      </head>
      <body>{children}<WhatsAppLink /><InterfaceInteractions /><PhotoInteractions /></body>
    </html>
  );
}
