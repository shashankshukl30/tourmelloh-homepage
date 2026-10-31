"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { useWishlist } from "@/components/wishlist/provider";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * One contact surface (brief v5, section 19): a labelled WhatsApp button on larger screens,
 * and on phones a fixed bar with Plan Your Journey and WhatsApp. The message follows the current page.
 */
export function ContactDock() {
  const { whatsapp, count } = useWishlist();
  const href = whatsappUrl(whatsapp);
  return (
    <>
      <a className="dock-chat" href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--paper)" }}>
        <WhatsAppIcon size={20} />
        <span>Chat with Tourmelloh</span>
      </a>
      <nav className="dock-bar" aria-label="Quick contact">
        <Link href={count ? "/your-journey" : "/help-me-plan"} className="dock-plan" style={{ color: "var(--paper)" }}>
          Plan Your Journey <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <a href={href} target="_blank" rel="noopener noreferrer" className="dock-wa" style={{ color: "var(--paper)" }}>
          <WhatsAppIcon size={19} /> <span>WhatsApp</span>
        </a>
      </nav>
    </>
  );
}
