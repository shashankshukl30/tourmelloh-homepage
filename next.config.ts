import type { NextConfig } from "next";
import legacy from "./content/legacy-slugs.json";

/** The pan-India catalogue (archived 2026-10-31) keeps its search equity: every old URL lands on its nearest v5 page. */
const GUIDES = new Set(["varanasi", "sarnath", "prayagraj", "ayodhya", "gaya", "bodh-gaya"]);
const legacyRedirects = [
  ...legacy.journeys.map((slug) => ({ source: `/journeys/${slug}`, destination: "/journeys", permanent: true })),
  ...legacy.experiences.map((slug) => ({ source: `/experiences/${slug}`, destination: "/experiences", permanent: true })),
  ...legacy.journal.map((slug) => ({ source: `/journal/${slug}`, destination: "/journal", permanent: true })),
  ...[...legacy.cities, ...legacy.destinations].flatMap((slug) => [
    { source: `/cities/${slug}`, destination: GUIDES.has(slug) ? `/guides/${slug}` : "/guides", permanent: true },
    { source: `/destinations/${slug}`, destination: GUIDES.has(slug) ? `/guides/${slug}` : "/guides", permanent: true },
  ]),
  ...legacy.collections.map((slug) => ({ source: `/collections/${slug}`, destination: "/journeys", permanent: true })),
];

const production = process.env.VERCEL_ENV === "production";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me mailto:",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const config: NextConfig = {
  poweredByHeader: false,
  // Inlined into client code too: the menu shows the reviews link on tourmelloh.com only once real reviews exist.
  env: { TM_INDEXED: String(production || process.env.NEXT_PUBLIC_INDEX === "1") },
  devIndicators: false,
  images: { qualities: [75, 82, 86, 88, 90], formats: ["image/avif", "image/webp"] },
  turbopack: { root: process.cwd() },
  // File creation during preview work exposed a persistent negative import cache.
  // Keep development rebuilds fresh; production caching is unchanged.
  experimental: { turbopackFileSystemCacheForDev: false },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // Preview and vercel.app hosts stay out of search results; tourmelloh.com is indexed.
          ...(production ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
      {
        source: "/images/library/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "www.tourmelloh.com" }], destination: "https://tourmelloh.com/:path*", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug", destination: "/journal", permanent: true },
      ...legacyRedirects,
      { source: "/cities", destination: "/guides", permanent: true },
      { source: "/destinations", destination: "/guides", permanent: true },
      { source: "/collections", destination: "/journeys", permanent: true },
      { source: "/how-we-travel", destination: "/how-it-works", permanent: true },
      { source: "/plan", destination: "/help-me-plan", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/packages", destination: "/journeys", permanent: true },
      { source: "/tours", destination: "/journeys", permanent: true },
      { source: "/weddings", destination: "/wedding-in-varanasi", permanent: true },
    ];
  },
};
export default config;
