"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Car, Check, Flame, Music, Plus, Sailboat, Sparkles, Ticket, UserRound, type LucideIcon } from "lucide-react";
import type { Tier } from "@/content/catalog/types";
import { useWishlist } from "@/components/wishlist/provider";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { setJourney } from "@/lib/wishlist";
import { whatsappUrl } from "@/lib/whatsapp";
import { absolute } from "@/lib/url";
import { KIND_LABEL, KIND_ORDER, byKind, kindOf, type Kind } from "@/lib/tier-kinds";

const TIERS: Tier[] = ["standard", "premium", "luxury"];
const NAME: Record<Tier, string> = { standard: "Standard", premium: "Premium", luxury: "Luxury" };
const PROMISE: Record<Tier, string> = {
  standard: "Comfortable and well located, with the essentials arranged well.",
  premium: "Better stays and more help: private boats, escorted darshan, a stronger car.",
  luxury: "The finest stays, a luxury car and every special session handled for you.",
};

const ICON: Record<Kind, LucideIcon> = { stay: BedDouble, car: Car, boat: Sailboat, experience: Music, tickets: Ticket, ritual: Flame, people: UserRound, other: Sparkles };

/**
 * Standard, Premium and Luxury for one package, built for a phone (client call, 2026-10-31):
 * one card per tier to swipe through, every upgrade marked against the tier before it so nothing
 * has to be remembered, an at-a-glance grid on demand, and two actions per tier.
 */
export type IncludedLine = { item: string; title: string; href?: string };

export function TierLadder({ journey, highlights, tier, onTier, openCompare = false, included }: {
  /** Omit for the general comparison (the Tiers page): actions then lead to that tier's packages. */
  journey?: { id: string; slug: string; title: string; route: string };
  highlights: Record<Tier, string[]>;
  tier: Tier;
  onTier: (t: Tier) => void;
  openCompare?: boolean;
  /** Every service and experience the tier includes on this package (client: show them all, not just the headline lines). */
  included?: Record<Tier, IncludedLine[]>;
}) {
  const { wishlist, update, ready } = useWishlist();
  const deck = useRef<HTMLDivElement>(null);
  const [compare, setCompare] = useState(openCompare);
  const [added, setAdded] = useState<Tier | null>(null);
  const inMine = journey && ready && wishlist.journey?.id === journey.id ? wishlist.journey.tier : null;
  const kinds = TIERS.map((t) => byKind(highlights[t]));

  // Swiping the deck moves the selector; tapping the selector moves the deck.
  useEffect(() => {
    const el = deck.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0.6).map((e) => e.target.getAttribute("data-tier") as Tier);
      if (seen.length && el.scrollWidth > el.clientWidth + 4) onTier(seen[0]);
    }, { root: el, threshold: [0.6] });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [onTier]);

  function select(t: Tier) {
    onTier(t);
    const el = deck.current;
    const card = el?.querySelector<HTMLElement>(`[data-tier="${t}"]`);
    if (el && card && el.scrollWidth > el.clientWidth + 4) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 2, behavior: "smooth" });
  }

  function addToJourney(t: Tier) {
    if (!journey) return;
    if (wishlist.journey && wishlist.journey.id !== journey.id &&
      !window.confirm(`My Journey is built around ${wishlist.journey.title}. Replace it with ${journey.title}? Added services and experiences stay as requests.`)) return;
    update((w) => setJourney(w, { id: journey.id as `P${string}`, slug: journey.slug, title: journey.title, tier: t }));
    onTier(t);
    setAdded(t);
  }

  return (
    <div className="tl">
      <div className="tl-switch" role="tablist" aria-label="Comfort level">
        {TIERS.map((t, i) => (
          <button key={t} type="button" role="tab" aria-selected={tier === t} onClick={() => select(t)}>
            <span className="tl-dots" aria-hidden="true">{[0, 1, 2].map((d) => <i key={d} data-on={d <= i} />)}</span>
            {NAME[t]}
          </button>
        ))}
      </div>

      <div className="tl-deck" ref={deck}>
        {TIERS.map((t, ti) => {
          const prev = ti > 0 ? kinds[ti - 1] : null;
          const mine = inMine === t;
          return (
            <article key={t} data-tier={t} className={`tl-card ${tier === t ? "is-active" : ""}`} aria-label={`${NAME[t]} tier`} onClick={() => onTier(t)}>
              <header className="tl-head">
                <span className="tl-level">Level {ti + 1} of 3</span>
                <h3>{NAME[t]}</h3>
                <p>{PROMISE[t]}</p>
              </header>
              <ul className="tl-lines">
                {highlights[t].map((line) => {
                  const k = kindOf(line);
                  const before = prev?.get(k);
                  const mark = !prev ? null : !before ? "added" : before !== kinds[ti].get(k) ? "upgrade" : null;
                  const Icon = ICON[k];
                  return (
                    <li key={line} data-mark={mark ?? undefined}>
                      <span className="tl-icon" aria-hidden="true"><Icon size={18} /></span>
                      <span className="tl-text">
                        {line}
                        {mark === "upgrade" && <em className="tl-mark">↑ Upgrade<span className="sr-only"> from {NAME[TIERS[ti - 1]]}</span></em>}
                        {mark === "added" && <em className="tl-mark">+ New<span className="sr-only">, not in {NAME[TIERS[ti - 1]]}</span></em>}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {included && included[t].length > 0 && (
                <details className="tl-more" onClick={(e) => e.stopPropagation()}>
                  <summary>Everything included in {NAME[t]} · {included[t].length}</summary>
                  <ul>
                    {included[t].map((l) => <li key={l.item}>{l.href ? <Link href={l.href}>{l.title}</Link> : l.title}</li>)}
                  </ul>
                </details>
              )}
              <div className="tl-actions">
                {journey ? (
                  <>
                    <button type="button" className="tl-add" onClick={(e) => { e.stopPropagation(); addToJourney(t); }} aria-pressed={mine}>
                      {mine ? <><Check size={17} aria-hidden="true" /> In My Journey</> : <><Plus size={17} aria-hidden="true" /> Add to My Journey</>}
                    </button>
                    <a className="tl-quote" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" aria-label={`Get a ${NAME[t]} quote on WhatsApp`}
                      href={whatsappUrl({ kind: "journey", id: journey.id, title: journey.title, route: journey.route, tier: NAME[t], url: absolute(`/journeys/${journey.slug}?tier=${t}`) })}>
                      <WhatsAppIcon size={17} /> Get a quote
                    </a>
                  </>
                ) : (
                  <>
                    <Link className="tl-add" href={`/journeys/${t}`} onClick={(e) => e.stopPropagation()} style={{ color: "var(--paper)" }} aria-label={`See ${NAME[t]} packages`}>
                      See packages <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                    <a className="tl-quote" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${NAME[t]} on WhatsApp`}
                      href={whatsappUrl({ kind: "tier", tier: NAME[t], url: absolute("/tiers") })}>
                      <WhatsAppIcon size={17} /> Ask us
                    </a>
                  </>
                )}
              </div>
              {added === t && (
                <p className="tl-added" role="status"><Check size={15} aria-hidden="true" /> Added. <Link href="/your-journey">Review My Journey <ArrowUpRight size={14} aria-hidden="true" /></Link></p>
              )}
            </article>
          );
        })}
      </div>
      <p className="tl-every"><Check size={16} aria-hidden="true" /> Every level: a named coordinator on phone and WhatsApp, and one complete quotation before any payment.</p>
      <p className="tl-hint" aria-hidden="true">Swipe to compare · {TIERS.indexOf(tier) + 1} of 3</p>

      <button type="button" className="tl-compare-toggle" aria-expanded={compare} aria-controls="tl-grid" onClick={() => setCompare((c) => !c)}>
        {compare ? "Hide the side-by-side view" : "Compare all three side by side"}
      </button>
      {compare && (
        <div className="tl-grid" id="tl-grid">
          <table>
            <thead>
              <tr><th scope="col"><span className="sr-only">Included</span></th>{TIERS.map((t) => <th scope="col" key={t} data-active={tier === t}>{NAME[t]}</th>)}</tr>
            </thead>
            <tbody>
              {KIND_ORDER.filter((kind) => kinds.some((m) => m.has(kind))).map((kind) => {
                const meta = { label: KIND_LABEL[kind] };
                const Icon = ICON[kind];
                return (
                  <tr key={kind}>
                    <th scope="row"><Icon size={16} aria-hidden="true" /> {meta.label}</th>
                    {TIERS.map((t, ti) => <td key={t} data-active={tier === t} data-label={NAME[t]}>{kinds[ti].get(kind) ?? <span className="tl-none">Not included</span>}</td>)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
