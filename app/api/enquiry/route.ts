import { NextResponse } from "next/server";
import { enquiryText, readEnquiry } from "@/lib/enquiry";
import { brand } from "@/lib/site";

/**
 * Delivers an enquiry to Tourmelloh by email through Resend.
 * Needs RESEND_API_KEY, and ENQUIRY_FROM on a domain verified in Resend (e.g. "Tourmelloh <enquiries@tourmelloh.com>").
 * ENQUIRY_TO overrides the inbox (defaults to the business email). Without a key it answers 503 and the form
 * offers WhatsApp and email instead: it never reports success for a message that went nowhere.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We could not read that request." }, { status: 400 });
  }

  // Spam traps: a hidden field people never fill, and a form completed faster than a person could.
  const started = Number(body.started);
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });
  if (!Number.isFinite(started) || Date.now() - started < 2500) {
    return NextResponse.json({ ok: false, error: "Please take a moment and send it again." }, { status: 400 });
  }

  const { enquiry, error } = readEnquiry(body);
  if (!enquiry) return NextResponse.json({ ok: false, error }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !from) {
    return NextResponse.json({ ok: false, unavailable: true, error: "Our enquiry inbox is not connected yet." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.ENQUIRY_TO || brand.email],
      reply_to: enquiry.email,
      subject: `New journey enquiry: ${enquiry.name}${enquiry.interest ? ` · ${enquiry.interest}` : ""}`,
      text: `${enquiryText(enquiry)}\n\nSent from tourmelloh.com/plan`,
    }),
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json({ ok: false, unavailable: true, error: "Your enquiry did not reach us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
