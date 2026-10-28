"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Mail } from "lucide-react";
import { emptyEnquiry, enquiryText, lengths, stayStyles, travelMonths, type Enquiry } from "@/lib/enquiry";
import { WhatsAppIcon } from "@/components/whatsapp-link";

type Option = { value: string; label: string };
type State = "idle" | "sending" | "sent" | "unavailable" | "error";

const WHATSAPP = "917706997271";
const EMAIL = "tourmelloh@gmail.com";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="enquiry-field">
      <span>{label}{hint && <small>{hint}</small>}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options, name }: { value: string; onChange: (v: string) => void; options: string[]; name: string }) {
  return (
    <span className="select-wrap">
      <select name={name} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={17} aria-hidden="true" />
    </span>
  );
}

/** The journey enquiry. Prefills from ?journey=, ?destination=, ?city= or ?experience= on the URL. */
export function EnquiryForm({ interests }: { interests: Option[] }) {
  const [form, setForm] = useState<Enquiry>(emptyEnquiry);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [months, setMonths] = useState<string[]>(["Flexible"]);
  const started = useRef(0);
  const status = useRef<HTMLDivElement>(null);
  const set = (key: keyof Enquiry) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    started.current = Date.now();
    setMonths(travelMonths());
    const query = new URLSearchParams(window.location.search);
    for (const param of ["journey", "destination", "city", "experience"]) {
      const match = interests.find((o) => o.value === `${param}:${query.get(param)}`);
      if (match) { setForm((f) => ({ ...f, interest: match.label })); break; }
    }
  }, [interests]);

  useEffect(() => {
    if (state !== "idle" && state !== "sending") status.current?.focus();
  }, [state]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const website = (event.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, started: started.current }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) return setState("sent");
      if (data.unavailable) return setState("unavailable");
      setError(data.error || "Something went wrong. Please try again.");
      setState("error");
    } catch {
      setState("unavailable");
    }
  }

  const text = `Hello Tourmelloh, I'd like to plan a journey.\n\n${enquiryText(form)}`;
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(`Journey enquiry: ${form.name}`)}&body=${encodeURIComponent(text)}`;

  if (state === "sent") {
    return (
      <div className="enquiry-done" ref={status} tabIndex={-1} role="status">
        <span className="enquiry-tick"><Check size={26} aria-hidden="true" /></span>
        <h2>Thank you, {form.name.split(" ")[0]}.</h2>
        <p>Your enquiry has reached us. We will reply to {form.email} with first thoughts and questions, usually within a working day. If anything is urgent, WhatsApp is the quickest way to reach us.</p>
        <div className="cat-band-actions">
          <a className="cat-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={19} /> Continue on WhatsApp</a>
          <Link className="tour-text-link" href="/journeys">Keep exploring <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate={false}>
      <div className="enquiry-row">
        <Field label="Your name"><input name="name" autoComplete="name" required value={form.name} onChange={(e) => set("name")(e.target.value)} /></Field>
        <Field label="Email"><input name="email" type="email" autoComplete="email" required value={form.email} onChange={(e) => set("email")(e.target.value)} /></Field>
      </div>
      <div className="enquiry-row">
        <Field label="Phone or WhatsApp" hint="With country code"><input name="phone" type="tel" autoComplete="tel" required placeholder="+91" value={form.phone} onChange={(e) => set("phone")(e.target.value)} /></Field>
        <Field label="Travelling from" hint="Optional"><input name="country" autoComplete="country-name" value={form.country} onChange={(e) => set("country")(e.target.value)} /></Field>
      </div>
      <Field label="What would you like to see?">
        <span className="select-wrap">
          <select name="interest" value={form.interest} onChange={(e) => set("interest")(e.target.value)}>
            <option value="">Design my own journey</option>
            {interests.map((o) => <option key={o.value} value={o.label}>{o.label}</option>)}
          </select>
          <ChevronDown size={17} aria-hidden="true" />
        </span>
      </Field>
      <div className="enquiry-row enquiry-row-3">
        <Field label="When"><Select name="when" value={form.when} onChange={set("when")} options={months} /></Field>
        <Field label="For how long"><Select name="length" value={form.length || lengths[1]} onChange={set("length")} options={lengths} /></Field>
        <Field label="Stays"><Select name="stay" value={form.stay} onChange={set("stay")} options={stayStyles} /></Field>
      </div>
      <div className="enquiry-row">
        <Field label="Adults"><input name="adults" type="number" min={1} max={40} value={form.adults} onChange={(e) => set("adults")(e.target.value)} /></Field>
        <Field label="Children" hint="Under 12"><input name="children" type="number" min={0} max={20} value={form.children} onChange={(e) => set("children")(e.target.value)} /></Field>
      </div>
      <Field label="Anything we should know?" hint="Optional">
        <textarea name="message" rows={5} value={form.message} onChange={(e) => set("message")(e.target.value)}
          placeholder="A milestone you are celebrating, a pace that suits your parents, a temple you must visit, a room with a view." />
      </Field>
      <input className="enquiry-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {(state === "unavailable" || state === "error") && (
        <div className="enquiry-alert" ref={status} tabIndex={-1} role="alert">
          {state === "unavailable" ? (
            <>
              <strong>Your enquiry has not been sent.</strong>
              <p>Our online inbox could not take it just now. Your details are ready to send another way, in one tap:</p>
              <div className="cat-band-actions">
                <a className="cat-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={19} /> Send on WhatsApp</a>
                <a className="cat-whatsapp" href={mail}><Mail size={18} aria-hidden="true" /> Send by email</a>
              </div>
            </>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
      <div className="enquiry-submit">
        <button className="tour-primary" type="submit" disabled={state === "sending"} style={{ color: "var(--paper)" }}>
          {state === "sending" ? "Sending your enquiry" : "Send my enquiry"} <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <p>We use these details only to plan your journey. <Link href="/privacy">Privacy</Link></p>
      </div>
    </form>
  );
}
