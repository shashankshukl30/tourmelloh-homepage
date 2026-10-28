import type { NextConfig } from "next";

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
      { source: "/blog/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/destinations/varanasi", destination: "/cities/varanasi", permanent: true },
      { source: "/destinations/ayodhya", destination: "/cities/ayodhya", permanent: true },
      { source: "/destinations/agra", destination: "/cities/agra", permanent: true },
      { source: "/destinations/bodh-gaya", destination: "/cities/bodh-gaya", permanent: true },
      { source: "/journeys/the-road-to-bodh-gaya", destination: "/journeys/footsteps-of-the-buddha", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/packages", destination: "/journeys", permanent: true },
      { source: "/tours", destination: "/journeys", permanent: true },
    ];
  },
};
export default config;
