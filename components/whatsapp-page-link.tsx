"use client";

import { useWishlist } from "@/components/wishlist/provider";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Every WhatsApp link on a page carries that page's own prefilled message (set by PageWhatsApp),
 * so the team sees which itinerary, service or page the guest came from.
 */
export function WhatsAppPageLink({ className, style, children, label }: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  label?: string;
}) {
  const { whatsapp } = useWishlist();
  return (
    <a className={className} style={style} href={whatsappUrl(whatsapp)} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
}
