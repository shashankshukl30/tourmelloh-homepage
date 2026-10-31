"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Trash2 } from "lucide-react";
import type { Tier } from "@/content/catalog/types";
import { tierLabel } from "@/content/catalog/nav-tiers";
import { useWishlist, PageWhatsApp } from "@/components/wishlist/provider";
import { changeTier, itemState, removeItem, reviewNotes, setJourney, type Wishlist } from "@/lib/wishlist";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Choice, Field, Text, months } from "@/components/forms/fields";

const TIERS: Tier[] = ["standard", "premium", "luxury"];

/** My Journey review and the quotation request (brief v5, section 9). */
export function YourJourney() {
  const { index, wishlist, update, ready, clear } = useWishlist();
  if (!ready) return <p className="yj-loading">Loading your selections…</p>;
  const journey = wishlist.journey ? index.journeys.find((j) => j.id === wishlist.journey!.id) : undefined;
  const notes = reviewNotes(index, wishlist);
  const patch = (p: Partial<Wishlist>) => update((w) => ({ ...w, ...p, updatedAt: Date.now() }));
  const empty = !journey && wishlist.items.length === 0;

  return (
    <div className="yj">
      <PageWhatsApp context={{ kind: "general", page: "My Journey" }} />
      {empty ? (
        <div className="yj-empty">
          <h2>Nothing chosen yet.</h2>
          <p>Choose a journey and a comfort tier, or add services and experiences first. Everything stays in this browser until you send it.</p>
          <div className="cat-band-actions">
            <Link className="tour-primary" href="/journeys" style={{ color: "var(--paper)" }}>Browse journeys <ArrowUpRight size={17} /></Link>
            <Link className="cat-whatsapp" href="/experiences">Experiences</Link>
            <Link className="cat-whatsapp" href="/help-me-plan">Help me plan</Link>
          </div>
        </div>
      ) : (
        <>
          <section className="yj-card" aria-labelledby="yj-journey">
            <h2 id="yj-journey">Your journey</h2>
            {journey ? (
              <div className="yj-journey">
                <span className="yj-thumb"><Image src={journey.thumb} alt="" fill sizes="140px" /></span>
                <div>
                  <p className="yj-meta">{journey.id} · {journey.nights}N / {journey.days}D · {journey.route}</p>
                  <h3><Link href={`/journeys/${journey.slug}`}>{journey.title}</Link></h3>
                  <div className="tier-tabs" role="group" aria-label="Comfort tier">
                    {TIERS.map((t) => (
                      <button key={t} type="button" aria-pressed={wishlist.journey?.tier === t} onClick={() => {
                        const { next, dropped } = changeTier(index, wishlist, t);
                        if (dropped.length && window.confirm(`Moving to ${tierLabel[t]} stops including ${dropped.map((id) => index.items.find((i) => i.id === id)?.title ?? id).join(", ")}. Keep them as requests?`)) {
                          update(dropped.reduce((acc, id) => ({ ...acc, items: [...acc.items, { id, qty: 1, mode: "add" as const }] }), next));
                        } else update(next);
                      }}>{tierLabel[t]}</button>
                    ))}
                  </div>
                </div>
                <button type="button" className="yj-remove" onClick={() => patch({ journey: undefined, declined: [] })} aria-label="Remove the journey"><Trash2 size={17} /></button>
              </div>
            ) : (
              <div className="yj-nojourney">
                <p>No journey chosen. Attach these selections to a journey, or send them as a request for arrangements on their own.</p>
                <Link href="/journeys" className="cat-whatsapp">Choose a journey</Link>
              </div>
            )}
          </section>

          <section className="yj-card" aria-labelledby="yj-when">
            <h2 id="yj-when">When and who</h2>
            <div className="enquiry-row enquiry-row-3">
              <Field label="Dates">
                <Choice name="dmode" value={{ exact: "Exact dates", month: "A month", undecided: "Undecided" }[wishlist.dates.mode]} onChange={(val) => patch({ dates: { ...wishlist.dates, mode: val === "Exact dates" ? "exact" : val === "A month" ? "month" : "undecided" } })} options={["A month", "Exact dates", "Undecided"]} />
              </Field>
              {wishlist.dates.mode === "month" && <Field label="Month"><Choice name="month" value={wishlist.dates.month ?? months()[1]} onChange={(m) => patch({ dates: { ...wishlist.dates, month: m } })} options={months()} /></Field>}
              {wishlist.dates.mode === "exact" && (
                <>
                  <Field label="From"><Text name="from" type="date" value={wishlist.dates.from ?? ""} onChange={(d) => patch({ dates: { ...wishlist.dates, from: d } })} /></Field>
                  <Field label="To"><Text name="to" type="date" value={wishlist.dates.to ?? ""} onChange={(d) => patch({ dates: { ...wishlist.dates, to: d } })} /></Field>
                </>
              )}
              <Field label="Flexible?"><Choice name="flex" value={wishlist.dates.flexible ? "Yes" : "No"} onChange={(f) => patch({ dates: { ...wishlist.dates, flexible: f === "Yes" } })} options={["Yes", "No"]} /></Field>
            </div>
            <div className="enquiry-row enquiry-row-3">
              <Field label="Duration"><Choice name="dur" value={{ "as-proposed": "As proposed", recommend: "Recommend a duration", custom: "I have a set number of days" }[wishlist.durationRequest]} onChange={(d) => patch({ durationRequest: d === "As proposed" ? "as-proposed" : d === "Recommend a duration" ? "recommend" : "custom" })} options={["As proposed", "Recommend a duration", "I have a set number of days"]} /></Field>
              {wishlist.durationRequest === "custom" && <Field label="Days available"><Text name="days" value={wishlist.customDays ?? ""} onChange={(d) => patch({ customDays: d })} /></Field>}
            </div>
            <div className="enquiry-row enquiry-row-3">
              <Field label="Adults"><Text name="adults" type="number" value={String(wishlist.party.adults)} onChange={(a) => patch({ party: { ...wishlist.party, adults: Math.max(1, Number(a) || 1) } })} /></Field>
              <Field label="Children's ages" hint="If any"><Text name="kids" value={wishlist.party.childrenAges} onChange={(c) => patch({ party: { ...wishlist.party, childrenAges: c } })} placeholder="e.g. 6, 11" /></Field>
              <Field label="Rooms" hint="Optional"><Text name="rooms" value={wishlist.party.rooms} onChange={(r) => patch({ party: { ...wishlist.party, rooms: r } })} /></Field>
            </div>
          </section>

          <section className="yj-card" aria-labelledby="yj-items">
            <h2 id="yj-items">Services and experiences</h2>
            {wishlist.items.length === 0 ? (
              <p className="yj-muted">Nothing added beyond {journey ? "the journey's inclusions" : "your request"}. <Link href="/experiences">Experiences</Link> · <Link href="/services">Services</Link></p>
            ) : (
              <ul className="yj-items">
                {wishlist.items.map((entry) => {
                  const item = index.items.find((i) => i.id === entry.id);
                  if (!item) return null;
                  const state = itemState(index, wishlist, entry.id);
                  return (
                    <li key={entry.id}>
                      <span className="yj-thumb yj-thumb-sm"><Image src={item.thumb} alt="" fill sizes="80px" /></span>
                      <div>
                        <strong><Link href={item.href}>{item.title}</Link></strong>
                        <span className="yj-meta">{item.id} · {item.category} · {item.unit}</span>
                        <span className={`wl-state ${state === "Needs review" ? "wl-review" : "wl-included"}`}>{entry.mode === "replace" ? "Replaces the included session" : state}</span>
                      </div>
                      <span className="yj-price">Quoted for your journey</span>
                      <button type="button" className="yj-remove" onClick={() => update((w) => removeItem(w, entry.id))} aria-label={`Remove ${item.title}`}><Trash2 size={17} /></button>
                    </li>
                  );
                })}
              </ul>
            )}
            {wishlist.declined.length > 0 && <p className="yj-muted">Declined inclusions: {wishlist.declined.map((id) => index.items.find((i) => i.id === id)?.title ?? id).join(", ")}.</p>}
            <p className="yj-total"><strong>Base journey and every item: awaiting quotation.</strong> No total is shown until we confirm scope and availability.</p>
          </section>

          {notes.length > 0 && (
            <section className="yj-card yj-review" aria-labelledby="yj-review">
              <h2 id="yj-review"><AlertTriangle size={18} aria-hidden="true" /> We will review</h2>
              <ul className="cat-list">{notes.map((n) => <li key={n.text}>{n.text}</li>)}</ul>
            </section>
          )}

          <section className="yj-card" aria-labelledby="yj-send">
            <h2 id="yj-send">Request My Personalised Quote</h2>
            <p className="yj-muted">This is a request for a personalised quotation, not a confirmed booking. No payment is required to submit your preferences.</p>
            <EnquiryForm type="journey" withWishlist context={journey ? journey.title : "Arrangements without a journey"} />
            <button type="button" className="yj-clear" onClick={() => { if (window.confirm("Clear My Journey from this browser?")) clear(); }}>Clear My Journey</button>
          </section>
        </>
      )}
    </div>
  );
}

export { setJourney };
