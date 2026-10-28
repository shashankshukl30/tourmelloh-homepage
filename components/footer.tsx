import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/site";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { navCollections, navDestinations } from "@/content/catalog/nav";

const company = [
  { name: "About Tourmelloh", href: "/about" },
  { name: "How we travel", href: "/how-we-travel" },
  { name: "Private experiences", href: "/experiences" },
  { name: "City guides", href: "/cities" },
  { name: "The journal", href: "/journal" },
  { name: "Questions", href: "/faq" },
  { name: "Contact", href: "/contact" },
];
const legal = [
  { name: "Booking terms", href: "/booking-terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms of use", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="page-width">
        <div className="footer-grid">
          <div className="footer-intro">
            <Link href="/" className="footer-brand" aria-label="Tourmelloh home">
              <Image src="/brand/tourmelloh-logo.svg" alt="Tourmelloh" width={265} height={64} unoptimized />
            </Link>
            <p>Private journeys across India, designed in {brand.city}.</p>
            <div className="footer-contact">
              <a href={brand.phoneHref}>{brand.phone}</a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <WhatsAppLink placement="footer" />
            </div>
          </div>
          <nav aria-label="Journeys">
            <p className="footer-head">Journeys</p>
            <Link href="/journeys">All journeys</Link>
            {navCollections.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.name}</Link>)}
          </nav>
          <nav aria-label="Destinations">
            <p className="footer-head">Destinations</p>
            {navDestinations.slice(0, 9).map((d) => <Link key={d.slug} href={`/destinations/${d.slug}`}>{d.name}</Link>)}
            <Link href="/destinations">All regions</Link>
          </nav>
          <nav aria-label="Tourmelloh">
            <p className="footer-head">Tourmelloh</p>
            {company.map((item) => <Link key={item.href} href={item.href}>{item.name}</Link>)}
            <p className="footer-head footer-head-gap">Good to know</p>
            {legal.map((item) => <Link key={item.href} href={item.href}>{item.name}</Link>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tourmelloh · {brand.city}, {brand.region}, India</span>
          <span className="footer-credit">
            Made with <span className="credit-heart" role="img" aria-label="love">♥</span> by{" "}
            <a href="https://digiocular.com" target="_blank" rel="noopener noreferrer">Digiocular</a>
          </span>
          <a href="#main">Back to the top ↑</a>
        </div>
      </div>
    </footer>
  );
}
