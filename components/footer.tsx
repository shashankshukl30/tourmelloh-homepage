import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/site";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { WhatsAppPageLink } from "@/components/whatsapp-page-link";
import { journeys } from "@/content/catalog";
import { journeysMenu } from "@/content/catalog/nav";

const columns = [
  { title: "Packages", links: [{ name: "All packages", href: "/journeys" }, ...journeysMenu[3].links.map(({ name, href }) => ({ name, href }))] },
  {
    title: "Plan",
    links: [
      { name: "Services", href: "/services" },
      { name: "Experiences", href: "/experiences" },
      { name: "Destination Weddings", href: "/wedding-in-varanasi" },
      { name: "Standard, Premium, Luxury", href: "/tiers" },
      { name: "Help me plan", href: "/help-me-plan" },
      { name: "My Journey", href: "/your-journey" },
    ],
  },
  {
    title: "Read",
    links: [
      { name: "Destination guides", href: "/guides" },
      { name: "The journal", href: "/journal" },
      { name: "Questions answered", href: "/faq" },
      { name: "How it works", href: "/how-it-works" },
    ],
  },
  {
    title: "Tourmelloh",
    links: [
      { name: "Our story", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Travel partners", href: "/partners" },
    ],
  },
];

const legal = [
  { name: "Booking terms", href: "/booking-terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms of use", href: "/terms" },
];

export function Footer() {
  const featured = journeys.slice(0, 8);
  return (
    <footer className="site-footer company-footer" id="contact">
      <div className="page-width">
        <div className="cf-top">
          <div className="cf-brand">
            <Link href="/" className="footer-brand" aria-label="Tourmelloh home">
              <Image src="/brand/tourmelloh-logo.svg" alt="Tourmelloh" width={240} height={58} unoptimized />
            </Link>
            <p className="cf-descriptor">{brand.descriptor}</p>
            <p className="cf-line">Stays, transport, experiences and personal assistance in Varanasi and beyond.</p>
            <ul className="cf-contact">
              <li><Phone size={17} aria-hidden="true" /><a href={brand.phoneHref}>{brand.phone}</a></li>
              <li><WhatsAppIcon size={17} /><WhatsAppPageLink>Chat with Tourmelloh</WhatsAppPageLink></li>
              <li><Mail size={17} aria-hidden="true" /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li><MapPin size={17} aria-hidden="true" /><span>{brand.city}, {brand.region}, India</span></li>
            </ul>
            <Link href="/help-me-plan" className="cf-cta" style={{ color: "var(--paper)" }}>
              Plan Your Journey <ArrowUpRight size={17} aria-hidden="true" />
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

        {featured.length > 0 && (
          <nav className="cf-popular" aria-label="Featured journeys">
            <p className="cf-head">Featured journeys</p>
            <ul>
              {featured.map((j) => <li key={j.slug}><Link href={`/journeys/${j.slug}`}>{j.title.split(" – ")[0]}</Link></li>)}
            </ul>
          </nav>
        )}

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
