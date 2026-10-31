"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavGroup } from "@/content/catalog/nav";

export type MenuId = "journeys" | "services" | "experiences";

/** A dropdown under the header. Always in the HTML (hidden when closed) so its links are crawlable. */
export function MegaPanel({
  id,
  open,
  groups,
  feature,
  onNavigate,
}: {
  id: MenuId;
  open: boolean;
  groups: NavGroup[];
  feature: { href: string; label: string; image: string };
  onNavigate: () => void;
}) {
  return (
    <div id={`mega-${id}`} className="mega" data-open={open} hidden={!open}>
      <div className={`mega-inner mega-cols-${groups.length}`}>
        {groups.map((group) => (
          <div className="mega-group" key={group.title}>
            <p className="mega-label">{group.title}</p>
            {group.links.map((link) => (
              <Link key={link.href} href={link.href} onClick={onNavigate} className="mega-link">
                <strong>{link.name}</strong>
                {link.note && <span>{link.note}</span>}
              </Link>
            ))}
          </div>
        ))}
        <Link href={feature.href} className="mega-feature" onClick={onNavigate} tabIndex={-1} aria-hidden="true">
          <Image src={feature.image} alt="" fill sizes="360px" />
          <span>{feature.label}<ArrowUpRight size={18} /></span>
        </Link>
      </div>
    </div>
  );
}
