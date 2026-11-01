"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Tier } from "@/content/catalog/types";
import { useWishlist } from "@/components/wishlist/provider";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { setJourney } from "@/lib/wishlist";
import { whatsappUrl } from "@/lib/whatsapp";
import { absolute } from "@/lib/url";

export type PackageCardData = {
  id: string;
  slug: string;
  title: string;
  /** The descriptive half of the title ("Varanasi & Sarnath"), highlighted with the duration. */
  where: string;
  route: string;
  nights: number;
  days: number;
  summary: string;
  kind: string;
  photo: { src: string; alt: string; blur: string };
};

/**
 * A package as the client asked for it (call, 2026-10-31): the name on the photograph, nights, days
 * and places in bold beneath, then two plain actions: the full itinerary, or a quote on WhatsApp that
 * names the package. The heart keeps it in My Journey.
 */
export function PackageCard({ pkg, tier, priority = false }: { pkg: PackageCardData; tier?: Tier; priority?: boolean }) {
  const { wishlist, update, ready } = useWishlist();
  const href = `/journeys/${pkg.slug}${tier ? `?tier=${tier}` : ""}`;
  const saved = ready && wishlist.journey?.id === pkg.id;
  const quote = whatsappUrl({ kind: "journey", id: pkg.id, title: pkg.title, route: pkg.route, url: absolute(`/journeys/${pkg.slug}`) });

  return (
    <article className="pk">
      <div className="pk-photo">
        <Link href={href} className="pk-photo-link" tabIndex={-1} aria-hidden="true">
          <Image src={pkg.photo.src} alt="" fill priority={priority} sizes="(max-width: 760px) 92vw, (max-width: 1150px) 45vw, 30vw" placeholder="blur" blurDataURL={pkg.photo.blur} />
        </Link>
        <span className="pk-kind">{pkg.kind}</span>
        <button
          type="button"
          className={`pk-save ${saved ? "is-saved" : ""}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${pkg.title} from My Journey` : `Save ${pkg.title} to My Journey`}
          onClick={() => update((w) => setJourney(w, saved ? undefined : { id: pkg.id as `P${string}`, slug: pkg.slug, title: pkg.title, tier: tier ?? w.journey?.tier ?? "standard" }))}
        >
          <Heart size={19} aria-hidden="true" fill={saved ? "currentColor" : "none"} />
        </button>
        <h3 className="pk-title"><Link href={href}>{pkg.title}</Link></h3>
      </div>
      <p className="pk-meta">
        <strong>{pkg.nights} {pkg.nights === 1 ? "Night" : "Nights"} · {pkg.days} Days</strong>
        <span>{pkg.where}</span>
      </p>
      <p className="pk-text">{pkg.summary}</p>
      <div className="pk-actions">
        <Link href={href} className="pk-primary" style={{ color: "var(--paper)" }}>
          Get your itinerary <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <a href={quote} className="pk-quote" target="_blank" rel="noopener noreferrer" aria-label={`Get a quote for ${pkg.title} on WhatsApp (opens WhatsApp)`}>
          <WhatsAppIcon size={17} /> Get a quote
        </a>
      </div>
    </article>
  );
}
