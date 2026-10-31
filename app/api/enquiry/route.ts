import { NextResponse } from "next/server";
import { checkPayload, LEAD_LABEL, LEAD_ROUTE, makeReference, summaryText, type EnquiryPayload } from "@/lib/enquiry";
import { brand, mailboxes } from "@/lib/site";

/**
 * Delivers an enquiry by email through Resend (RESEND_API_KEY, ENQUIRY_FROM).
 * Every enquiry gets a reference first. Repeated taps with the same key return the same reference.
 * If email delivery is not configured or fails, the guest is told plainly and offered WhatsApp/email
 * with the full summary: a request is never reported as received when it was not.
 */
const recent = new Map<string, { reference: string; delivered: boolean; at: number }>();

export async function POST(request: Request) {
  let p: EnquiryPayload;
  try {
    p = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We could not read that request." }, { status: 400 });
  }
  if (p.website) return NextResponse.json({ ok: true, reference: makeReference(), delivered: true });
  if (!Number.isFinite(p.started) || Date.now() - p.started < 2500) {
    return NextResponse.json({ ok: false, error: "Please take a moment and send it again." }, { status: 400 });
  }
  const problem = checkPayload(p);
  if (problem) return NextResponse.json({ ok: false, error: problem }, { status: 422 });

  const key = String(p.idempotencyKey ?? "").slice(0, 80);
  const seen = key ? recent.get(key) : undefined;
  if (seen) return NextResponse.json({ ok: true, reference: seen.reference, delivered: seen.delivered, duplicate: true });

  const reference = makeReference();
  const text = summaryText(p, reference);
  const delivered = await deliver(p, reference, text);
  if (key) {
    recent.set(key, { reference, delivered, at: Date.now() });
    for (const [k, v] of recent) if (Date.now() - v.at > 86_400_000) recent.delete(k);
  }
  return NextResponse.json({ ok: true, reference, delivered, summary: text });
}

async function deliver(p: EnquiryPayload, reference: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !from) return false;
  const send = (body: object) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `${reference}-${"to" in body ? String((body as { to: string[] }).to[0]) : ""}` },
      body: JSON.stringify(body),
    }).then((r) => r.ok).catch(() => false);

  const staff = await send({
    from,
    to: [process.env.ENQUIRY_TO || mailboxes[LEAD_ROUTE[p.type]]],
    reply_to: p.contact.email || undefined,
    subject: `${reference} · ${LEAD_LABEL[p.type]} · ${p.contact.name}`,
    text,
  });
  // Acknowledgement to the guest, only once a verified sending domain is configured.
  if (staff && p.contact.email && process.env.ENQUIRY_ACK === "1") {
    await send({
      from,
      to: [p.contact.email],
      reply_to: brand.email,
      subject: `We have your request · ${reference}`,
      text: `Thank you, ${p.contact.name.split(" ")[0]}.\n\nTourmelloh has received your request (reference ${reference}). We review your selections, check feasibility and availability, and send a complete quotation before any payment.\n\n${text}\n\nTourmelloh · ${brand.phone} · ${brand.email}`,
    });
  }
  return staff;
}
