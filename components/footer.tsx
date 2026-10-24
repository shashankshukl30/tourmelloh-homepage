import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/content/travel";

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="page-width">
        <div className="footer-main">
          <div>
            <a
              href="#main"
              className="footer-brand"
              aria-label="Tourmelloh — back to the beginning"
            >
              <Image
                src="/brand/tourmelloh-logo.svg"
                alt="Tourmelloh"
                width={265}
                height={64}
                unoptimized
              />
            </a>
            <p>
              Journeys with a sense of place.
              <br />
              {brand.location}, India.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/#destinations">
              The destinations <ArrowUpRight size={15} />
            </Link>
            <Link href="/journeys">
              Suggested journeys <ArrowUpRight size={15} />
            </Link>
            <Link href="/destinations/varanasi">
              The Varanasi edit <ArrowUpRight size={15} />
            </Link>
            <Link href="/#plan">
              Start your travel brief <ArrowUpRight size={15} />
            </Link>
          </nav>
          <div className="footer-contact">
            <span className="eyebrow">LET’S TALK TRAVEL</span>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span>Based in Varanasi. Looking beyond.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tourmelloh · Design preview</span>
          <span className="footer-credit">
            Made with <span className="credit-heart" role="img" aria-label="love">♥</span> by{" "}
            <a href="https://digiocular.com" target="_blank" rel="noopener noreferrer">Digiocular</a>
          </span>
          <a href="#main">Back to the beginning ↑</a>
        </div>

      </div>
    </footer>
  );
}
