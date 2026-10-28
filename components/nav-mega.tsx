"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navCities, navCollections, navDestinations } from "@/content/catalog/nav";

export type MenuId = "journeys" | "destinations";

const preview = (key: string) => `/images/library/${key}.webp`;

/** The dropdown under the header. Always in the HTML (hidden when closed) so its links are crawlable. */
export function MegaPanel({ id, open, onNavigate }: { id: MenuId; open: boolean; onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const collection = navCollections[active];
  return (
    <div id={`mega-${id}`} className="mega" data-open={open} hidden={!open}>
      <div className="mega-inner">
        {id === "journeys" ? (
          <>
            <div className="mega-list">
              <p className="mega-label">Journeys by style</p>
              {navCollections.map((item, index) => (
                <Link key={item.slug} href={`/collections/${item.slug}`} onClick={onNavigate}
                  onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)}
                  data-active={index === active}>
                  <strong>{item.name}</strong>
                  <span>{item.line}</span>
                </Link>
              ))}
            </div>
            <Link href={`/collections/${collection.slug}`} className="mega-feature" onClick={onNavigate} tabIndex={-1} aria-hidden="true">
              <Image key={collection.photo} src={preview(collection.photo)} alt="" fill sizes="420px" />
              <span>{collection.name}<ArrowUpRight size={18} /></span>
            </Link>
            <div className="mega-aside">
              <p className="mega-label">Begin here</p>
              <Link href="/journeys" onClick={onNavigate}>All journeys</Link>
              <Link href="/experiences" onClick={onNavigate}>Private experiences</Link>
              <Link href="/plan" onClick={onNavigate}>Design your own</Link>
            </div>
          </>
        ) : (
          <>
            <div className="mega-grid">
              <p className="mega-label">Regions</p>
              <div>
                {navDestinations.map((item) => (
                  <Link key={item.slug} href={`/destinations/${item.slug}`} onClick={onNavigate}>{item.name}</Link>
                ))}
              </div>
            </div>
            <div className="mega-aside">
              <p className="mega-label">City guides</p>
              {navCities.map((item) => (
                <Link key={item.slug} href={`/cities/${item.slug}`} onClick={onNavigate}>{item.name}</Link>
              ))}
              <Link href="/cities" onClick={onNavigate} className="mega-more">All city guides <ArrowUpRight size={15} /></Link>
            </div>
            <Link href="/destinations" className="mega-feature" onClick={onNavigate}>
              <Image src={preview("andaman-aerial")} alt="" fill sizes="420px" />
              <span>All destinations<ArrowUpRight size={18} /></span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
