"use client";

import { absolute } from "@/lib/url";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import type { ItemId, Tier, TierManifest } from "@/content/catalog/types";
import { useWishlist, PageWhatsApp } from "@/components/wishlist/provider";
import { AddToJourney } from "@/components/wishlist/add-button";
import { TierLadder } from "@/components/journey/tier-ladder";
import { addItem, changeTier, setJourney, toggleDeclined } from "@/lib/wishlist";

export type PanelLine = { item: ItemId; title: string; href?: string; day?: number; session?: string; scope: string; state: "included" | "conditional"; mandatory: boolean };
type Panel = Omit<TierManifest, "lines"> & { lines: PanelLine[] };

const TIER_NAME: Record<Tier, string> = { standard: "Standard", premium: "Premium", luxury: "Luxury" };
const ROWS: [keyof Omit<TierManifest, "lines" | "excluded">, string][] = [
  ["hotels", "Hotels"], ["vehicle", "Vehicle"], ["meals", "Meals"], ["boat", "Boat"], ["darshan", "Darshan"],
  ["assistance", "Assistance"], ["guide", "Guiding"], ["admissions", "Admissions"], ["photography", "Photography"], ["security", "Security"],
];

export function TierPanel({ journey, tiers }: { journey: { id: string; slug: string; title: string; route: string }; tiers: Record<Tier, Panel> }) {
  const router = useRouter();
  const { index, wishlist, update, ready } = useWishlist();
  const [tier, setTier] = useState<Tier>("premium");
  const [notice, setNotice] = useState<{ absorbed: string[]; dropped: ItemId[] } | null>(null);
  const isMine = ready && wishlist.journey?.id === journey.id;
  const detailRef = useRef<HTMLDetailsElement>(null);
  const linesRef = useRef<HTMLDetailsElement>(null);
  // Desktop has the width for everything; phones start with the ladder and open detail on demand.
  useEffect(() => {
    if (window.matchMedia("(min-width: 1001px)").matches) linesRef.current?.setAttribute("open", "");
  }, []);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tier") as Tier | null;
    if (fromUrl && fromUrl in TIER_NAME) setTier(fromUrl);
    else if (isMine && wishlist.journey) setTier(wishlist.journey.tier);
  }, [isMine, wishlist.journey]);

  function choose(next: Tier) {
    setTier(next);
    if (!isMine) return;
    const { next: w, absorbed, dropped } = changeTier(index, wishlist, next);
    update(w);
    const title = (id: ItemId) => index.items.find((i) => i.id === id)?.title ?? id;
    if (absorbed.length || dropped.length) setNotice({ absorbed: absorbed.map(title), dropped });
  }

  function keepDropped(ids: ItemId[]) {
    update((w) => ids.reduce((acc, id) => addItem(index, acc, id), w));
    setNotice(null);
  }

  function personalise() {
    if (wishlist.journey && wishlist.journey.id !== journey.id && (wishlist.items.length || wishlist.journey)) {
      const ok = window.confirm(`My Journey is currently built around ${wishlist.journey.title}. Replace it with ${journey.title}? Your added services and experiences stay as requests for review.`);
      if (!ok) return;
    }
    update((w) => setJourney(w, { id: journey.id, slug: journey.slug, title: journey.title, tier }));
    router.push("/your-journey");
  }

  const panel = tiers[tier];
  const order: Tier[] = ["standard", "premium", "luxury"];
  const highlights = order.every((t) => tiers[t].highlights?.length) ? (Object.fromEntries(order.map((t) => [t, tiers[t].highlights!])) as Record<Tier, string[]>) : null;
  const includedByTier = Object.fromEntries(order.map((t) => [t, tiers[t].lines
    .filter((l, i, all) => all.findIndex((x) => x.item === l.item) === i)
    .map((l) => ({ item: l.item, title: l.title, href: l.href }))])) as Record<Tier, { item: string; title: string; href?: string }[]>;
  // Single upgrades from the tiers above (client call: a Standard guest may want just a wheelchair or a photographer).
  const here = new Set(panel.lines.map((l) => l.item));
  const upgrades = order.slice(order.indexOf(tier) + 1).flatMap((t) => tiers[t].lines.map((l) => ({ ...l, from: t })))
    .filter((l, i, all) => !here.has(l.item) && all.findIndex((x) => x.item === l.item) === i);
  return (
    <section className="tier-panel" aria-labelledby="tiers-title" id="tiers">
      <PageWhatsApp context={{ kind: "journey", id: journey.id, title: journey.title, route: journey.route, tier: TIER_NAME[tier], url: absolute(`/journeys/${journey.slug}`) }} />
      <div className="tier-head">
        <div>
          <span className="tour-kicker">CHOOSE YOUR COMFORT</span>
          <h2 id="tiers-title">Standard, Premium <em>or Luxury.</em></h2>
          <p>The same journey at three levels of comfort and support. The quotation names the actual hotels, vehicle and inclusions before you pay anything.</p>
        </div>
        {!highlights && <div className="tier-tabs" role="tablist" aria-label="Comfort tier">
          {(Object.keys(TIER_NAME) as Tier[]).map((t) => (
            <button key={t} role="tab" type="button" aria-selected={tier === t} aria-controls="tier-detail" onClick={() => choose(t)}>
              {TIER_NAME[t]}
            </button>
          ))}
        </div>}
      </div>

      {highlights && <TierLadder journey={journey} highlights={highlights} tier={tier} onTier={setTier} included={includedByTier} />}

      {notice && (
        <div className="tier-notice" role="status">
          {notice.absorbed.length > 0 && <p><Check size={15} aria-hidden="true" /> Now included at {TIER_NAME[tier]}: {notice.absorbed.join(", ")}. No duplicate request.</p>}
          {notice.dropped.length > 0 && (
            <>
              <p>These stop being included at {TIER_NAME[tier]}: {notice.dropped.map((id) => index.items.find((i) => i.id === id)?.title ?? id).join(", ")}.</p>
              <div className="tier-notice-actions">
                <button type="button" onClick={() => keepDropped(notice.dropped)}>Keep them as requests</button>
                <button type="button" onClick={() => setNotice(null)}>Leave them out</button>
              </div>
            </>
          )}
        </div>
      )}

      <details className="tier-more" ref={detailRef}>
        <summary>Compare every detail, row by row</summary>
      <div className="tier-compare" role="table" aria-label="Tier comparison">
        <div role="row" className="tier-row tier-row-head">
          <span role="columnheader" />
          {(Object.keys(TIER_NAME) as Tier[]).map((t) => <span role="columnheader" key={t} data-active={t === tier}>{TIER_NAME[t]}</span>)}
        </div>
        {ROWS.map(([key, label]) => (
          <div role="row" className="tier-row" key={key}>
            <span role="rowheader">{label}</span>
            {(Object.keys(TIER_NAME) as Tier[]).map((t) => <span role="cell" key={t} data-active={t === tier}>{tiers[t][key]}</span>)}
          </div>
        ))}
      </div>
      </details>

      <div className="tier-detail" id="tier-detail" role="tabpanel">
        <div>
          <details className="tier-more tier-more-lines" ref={linesRef}>
          <summary>Everything {TIER_NAME[tier]} includes, day by day</summary>
          <ul className="tier-lines">
            {panel.lines.map((line, i) => {
              const declined = isMine && wishlist.journey?.tier === tier && wishlist.declined.includes(line.item);
              return (
                <li key={`${line.item}-${i}`} className={declined ? "is-declined" : ""}>
                  <div>
                    <strong>{line.href ? <Link href={line.href}>{line.title}</Link> : line.title}</strong>
                    <span className="tier-when">{[line.day ? `Day ${line.day}` : "", line.session].filter(Boolean).join(" · ")}</span>
                    <p>{line.scope}</p>
                  </div>
                  <div className="tier-line-state">
                    <span className={`wl-state ${line.state === "conditional" ? "wl-conditional" : "wl-included"}`}>
                      {line.state === "conditional" ? "If requested and confirmed" : line.mandatory ? "Included, part of the journey" : "Included"}
                    </span>
                    {!line.mandatory && isMine && wishlist.journey?.tier === tier && (
                      <button type="button" className="tier-decline" onClick={() => update((w) => toggleDeclined(w, line.item))}>
                        {declined ? "Keep it" : "Decline"}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          </details>
          {(() => {
            const taken = new Set<string>([...panel.lines.map((l) => l.item), ...upgrades.map((u) => u.item)]);
            const others = index.items.filter((i) => i.id.startsWith("S") && !taken.has(i.id));
            return others.length > 0 ? (
              <details className="tier-more tier-others">
                <summary>More services you can add to {TIER_NAME[tier]} · {others.length}</summary>
                <ul className="tier-others-list">
                  {others.map((o) => (
                    <li key={o.id}>
                      <div><strong><Link href={o.href}>{o.title}</Link></strong><span>{o.category}</span></div>
                      <AddToJourney id={o.id as ItemId} compact short />
                    </li>
                  ))}
                </ul>
              </details>
            ) : null;
          })()}
          {upgrades.length > 0 && (
            <div className="tier-upgrades">
              <h3>Want just one thing from a higher tier?</h3>
              <p>Keep {TIER_NAME[tier]} and add any of these on their own. They are quoted with your journey.</p>
              <ul>
                {upgrades.map((u) => (
                  <li key={u.item}>
                    <div><strong>{u.href ? <Link href={u.href}>{u.title}</Link> : u.title}</strong><span>Included in {TIER_NAME[u.from]}</span></div>
                    <AddToJourney id={u.item} compact short />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <aside className="tier-side">
          <h3>Not included</h3>
          <ul className="cat-list">{panel.excluded.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="tier-price"><strong>Price:</strong> quoted for your dates, party and tier. You receive the complete price before any payment.</p>
          <div className="tier-actions">
            <button type="button" className="tour-primary" onClick={personalise} style={{ color: "var(--paper)" }}>
              Personalise This Journey <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <Link href={`/help-me-plan?journey=${journey.slug}`} className="cat-whatsapp">Help Me Choose</Link>
          </div>
          {isMine && <p className="tier-mine"><Check size={15} aria-hidden="true" /> This journey is in My Journey ({TIER_NAME[wishlist.journey!.tier]}).</p>}
        </aside>
      </div>
    </section>
  );
}
