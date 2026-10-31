import type { Wishlist } from "@/lib/wishlist";

/** Lead types (brief v5, section 12): each is a separate staff workflow. */
export type LeadType = "journey" | "custom" | "wedding" | "departure" | "wellness" | "partner";

export type Contact = {
  name: string;
  email: string;
  phone: string;
  replyChannel: "WhatsApp" | "Email" | "Phone";
  country?: string;
  language?: string;
};

/** What the browser sends. `fields` holds the form-specific answers as label → value. */
export type EnquiryPayload = {
  type: LeadType;
  idempotencyKey: string;
  started: number;
  website?: string;
  contact: Contact;
  marketingConsent: boolean;
  fields: Record<string, string>;
  /** Snapshot of My Journey with titles resolved, so later catalogue edits never change what was asked. */
  wishlist?: Wishlist & { resolved: { id: string; title: string; status: string; mode?: string }[]; journeyTitle?: string; tierName?: string; reviewNotes: string[] };
  context?: string;
};

export const LEAD_LABEL: Record<LeadType, string> = {
  journey: "Journey quotation request",
  custom: "Help me plan",
  wedding: "Wedding in Varanasi",
  departure: "Her Own Way departure interest",
  wellness: "Stillness by the Ganges",
  partner: "Travel partner enquiry",
};

/** Mailbox role per lead type; addresses live in lib/site.ts (all the main inbox for now). */
export const LEAD_ROUTE: Record<LeadType, "enquiries" | "partnerships" | "varanasi"> = {
  journey: "enquiries", custom: "enquiries", wedding: "enquiries", departure: "enquiries", wellness: "enquiries", partner: "partnerships",
};

const clip = (v: unknown, max = 400) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Validates the parts every lead needs; returns the first problem in plain words. */
export function checkPayload(p: EnquiryPayload): string | null {
  if (!p || !p.contact) return "We could not read that request.";
  if (!(p.type in LEAD_LABEL)) return "Unknown enquiry type.";
  const c = p.contact;
  if (clip(c.name, 120).length < 2) return "Please tell us your name.";
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clip(c.email, 160));
  const hasPhone = clip(c.phone, 40).replace(/\D/g, "").length >= 8;
  if (!hasEmail && !hasPhone) return "Please add an email address or a phone number with its country code.";
  if (c.replyChannel === "Email" && !hasEmail) return "You chose email replies: please add your email address.";
  if ((c.replyChannel === "WhatsApp" || c.replyChannel === "Phone") && !hasPhone) return `You chose ${c.replyChannel} replies: please add your number with its country code.`;
  return null;
}

/** Short, readable reference such as TM-261031-K7Q4. */
export function makeReference(date = new Date()) {
  const d = date.toISOString().slice(2, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `TM-${d}-${code}`;
}

/** The full plain-text summary staff receive and the guest can print: every selection, nothing lost. */
export function summaryText(p: EnquiryPayload, reference: string) {
  const out: string[] = [];
  const c = p.contact;
  out.push(`${LEAD_LABEL[p.type]} · Reference ${reference}`, "");
  out.push("CONTACT");
  out.push(`Name: ${clip(c.name, 120)}`);
  if (c.email) out.push(`Email: ${clip(c.email, 160)}`);
  if (c.phone) out.push(`Phone / WhatsApp: ${clip(c.phone, 40)}`);
  out.push(`Preferred reply: ${c.replyChannel}`);
  if (c.country) out.push(`Travelling from: ${clip(c.country, 80)}`);
  if (c.language) out.push(`Preferred language: ${clip(c.language, 60)}`);
  out.push(`Marketing consent: ${p.marketingConsent ? "yes" : "no"}`);
  if (p.context) out.push(`From page: ${clip(p.context, 200)}`);

  const w = p.wishlist;
  if (w) {
    out.push("", "MY JOURNEY");
    out.push(`Journey: ${w.journey ? `${w.journey.id} ${w.journeyTitle ?? w.journey.title}` : "No journey chosen: custom request"}`);
    if (w.tierName) out.push(`Tier: ${w.tierName}`);
    out.push(`Dates: ${w.dates.mode === "exact" ? `${w.dates.from ?? "?"} to ${w.dates.to ?? "?"}` : w.dates.mode === "month" ? w.dates.month ?? "month to confirm" : "Undecided"}${w.dates.flexible ? " (flexible)" : ""}`);
    out.push(`Duration: ${w.durationRequest === "recommend" ? "Please recommend" : w.durationRequest === "custom" ? `${w.customDays} days available` : "As proposed"}`);
    out.push(`Party: ${w.party.adults} adult(s)${w.party.childrenAges ? `; children aged ${w.party.childrenAges}` : ""}${w.party.rooms ? `; rooms: ${w.party.rooms}` : ""}`);
    if (w.arrival) out.push(`Arrival: ${w.arrival}`);
    if (w.departureCity) out.push(`Departure: ${w.departureCity}`);
    if (w.resolved.length) {
      out.push("Selected items:");
      w.resolved.forEach((r) => out.push(`  - ${r.id} ${r.title} · ${r.status}${r.mode === "replace" ? " (replaces the included session)" : ""}`));
    }
    if (w.declined.length) out.push(`Declined inclusions: ${w.declined.join(", ")}`);
    if (w.reviewNotes.length) { out.push("Needs staff review:"); w.reviewNotes.forEach((n) => out.push(`  - ${n}`)); }
    if (w.notes) out.push(`Notes: ${clip(w.notes, 2000)}`);
  }

  const entries = Object.entries(p.fields ?? {}).filter(([, v]) => clip(v, 2000));
  if (entries.length) {
    out.push("", "DETAILS");
    entries.forEach(([k, v]) => out.push(`${clip(k, 80)}: ${clip(v, 2000)}`));
  }
  out.push("", "This is a request for a personalised quotation, not a confirmed booking.");
  return out.join("\n");
}
