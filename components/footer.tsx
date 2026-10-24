import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/content/travel";
import photoSources from "@/research/photo-sources.json";

export function Footer() {
  return (
    <footer className="site-footer">
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
            <a href="#destinations">
              The destinations <ArrowUpRight size={15} />
            </a>
            <a href="#journeys">
              Suggested journeys <ArrowUpRight size={15} />
            </a>
            <a href="#varanasi">
              The Varanasi edit <ArrowUpRight size={15} />
            </a>
            <a href="#plan">
              Start your travel brief <ArrowUpRight size={15} />
            </a>
          </nav>
          <div className="footer-contact">
            <span className="eyebrow">LET’S TALK ABOUT YOUR INDIA</span>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span>Based in Varanasi. Looking beyond.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Tourmelloh · Homepage design preview
          </span>
          <span>
            Made with <span className="credit-heart">♥</span> by{" "}
            <a
              href="https://digiocular.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digiocular
            </a>
          </span>
          <a href="#main">Back to the beginning ↑</a>
        </div>
        <details className="photo-credits">
          <summary>Photography &amp; preview information</summary>
          <div>
            <p>
              Suggested journeys illustrate the proposed travel experience.
              Services, inclusions and pricing need confirmation with
              Tourmelloh. This homepage preview does not send enquiries or take
              bookings.
            </p>
            <p>
              Photography uses genuine locations. Images are resized and
              converted to WebP.
            </p>
            <ul>
              {photoSources.sources.map((source) => (
                <li key={source.file}>
                  <a
                    href={source.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.subject}
                  </a>{" "}
                  — {source.author}.{" "}
                  {source.file === "ayodhya-ram-mandir.webp" &&
                    "Via the Press Information Bureau, Government of India. "}
                  <a
                    href={source.license}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.license.includes("creativecommons")
                      ? "CC BY-SA 4.0; WebP derivative under the same licence"
                      : source.license.includes("data.gov")
                        ? "Government Open Data License – India"
                        : "Image licence"}
                  </a>
                  .
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </footer>
  );
}
