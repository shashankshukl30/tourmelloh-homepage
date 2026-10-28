import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/site";
import { WhatsAppIcon, whatsappHref } from "@/components/whatsapp-link";
import { navCollections, navDestinations } from "@/content/catalog/nav";

const columns = [
  {
    title: "Journeys",
    links: [{ name: "All journeys", href: "/journeys" }, ...navCollections.map((c) => ({ name: c.name, href: `/collections/${c.slug}` }))],
  },
  {
    title: "Destinations",
    links: [...navDestinations.slice(0, 7).map((d) => ({ name: d.name, href: `/destinations/${d.slug}` })), { name: "All regions", href: "/destinations" }],
  },
  {
    title: "Explore",
    links: [
      { name: "Private experiences", href: "/experiences" },
      { name: "City guides", href: "/cities" },
      { name: "Varanasi, our home", href: "/cities/varanasi" },
      { name: "The journal", href: "/journal" },
      { name: "Search the site", href: "/search" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Tourmelloh", href: "/about" },
      { name: "How we travel", href: "/how-we-travel" },
      { name: "Questions", href: "/faq" },
      { name: "Contact", href: "/contact" },
      { name: "Plan your journey", href: "/plan" },
    ],
  },
];

const popular = [
  { name: "Golden Triangle", href: "/journeys/the-golden-triangle" },
  { name: "Royal Rajasthan", href: "/journeys/royal-rajasthan" },
  { name: "Varanasi & Sarnath", href: "/journeys/kashi-before-the-world-wakes" },
  { name: "Char Dham by helicopter", href: "/journeys/char-dham-by-helicopter" },
  { name: "Andaman islands", href: "/journeys/andaman-island-escape" },
  { name: "Kerala backwaters", href: "/journeys/kerala-backwaters-and-hills" },
  { name: "Ladakh", href: "/journeys/ladakh-the-high-passes" },
  { name: "Tiger safaris", href: "/collections/wildlife-and-wilderness" },
];

const legal = [
  { name: "Booking terms", href: "/booking-terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms of use", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="site-footer company-footer" id="contact">
      <div className="page-width">
        <div className="cf-top">
          <div className="cf-brand">
            <Link href="/" className="footer-brand" aria-label="Tourmelloh home">
              <Image src="/brand/tourmelloh-logo.svg" alt="Tourmelloh" width={240} height={58} unoptimized />
            </Link>
            <p className="cf-line">Private journeys across India, designed in {brand.city}.</p>
            <ul className="cf-contact">
              <li><Phone size={17} aria-hidden="true" /><a href={brand.phoneHref}>{brand.phone}</a></li>
              <li><WhatsAppIcon size={17} /><a href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
              <li><Mail size={17} aria-hidden="true" /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li><MapPin size={17} aria-hidden="true" /><span>{brand.city}, {brand.region}, India</span></li>
            </ul>
            <Link href="/plan" className="cf-cta" style={{ color: "var(--paper)" }}>
              Plan your journey <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="cf-columns">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="cf-head">{column.title}</p>
                <ul>
                  {column.links.map((link) => <li key={link.href}><Link href={link.href}>{link.name}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <nav className="cf-popular" aria-label="Popular journeys">
          <p className="cf-head">Popular journeys</p>
          <ul>
            {popular.map((link) => <li key={link.href}><Link href={link.href}>{link.name}</Link></li>)}
          </ul>
        </nav>

        <div className="cf-bottom">
          <p>© {new Date().getFullYear()} Tourmelloh. All rights reserved.</p>
          <ul className="cf-legal">
            {legal.map((link) => <li key={link.href}><Link href={link.href}>{link.name}</Link></li>)}
          </ul>
          <p className="footer-credit">
            Made with <span className="credit-heart" role="img" aria-label="love">♥</span> by{" "}
            <a href="https://digiocular.com" target="_blank" rel="noopener noreferrer">Digiocular</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
