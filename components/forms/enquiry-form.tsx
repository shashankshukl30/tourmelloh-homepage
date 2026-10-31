"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Mail, Printer } from "lucide-react";
import type { LeadType } from "@/lib/enquiry";
import { tierLabel } from "@/content/catalog/nav-tiers";
import { reviewNotes, itemState, type Wishlist } from "@/lib/wishlist";
import { useWishlist } from "@/components/wishlist/provider";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { whatsappUrl } from "@/lib/whatsapp";
import { Area, Choice, Field, Pills, Text, months } from "@/components/forms/fields";

type Result = { reference: string; delivered: boolean; summary: string };
const CTA: Record<LeadType, string> = {
  journey: "Request My Personalised Quote",
  custom: "Help Me Plan",
  wedding: "Discuss Your Wedding",
  departure: "Enquire About This Departure",
  wellness: "Plan My Wellness Journey",
  partner: "Send Partner Enquiry",
};
const PLACES = ["Varanasi", "Sarnath", "Prayagraj", "Ayodhya", "Bodh Gaya", "Gaya", "Kushinagar & Shravasti", "Chitrakoot", "Not sure yet"];
const INTERESTS = ["Temples & darshan", "Rituals & puja", "Buddhist sites", "The river", "Food", "Crafts & textiles", "Music", "Heritage walks", "Wellness"];

/**
 * Every enquiry on the site (brief v5, section 12). `collection` adds the fields a specialist
 * collection needs (SHRAVAN: the travelling parent and consent for family updates; families: children).
 */
export function EnquiryForm({
  type, context, collection, departure, cta, withWishlist = false,
}: {
  type: LeadType; context?: string; collection?: string; departure?: { id: string; title: string; dated: boolean }; cta?: string; withWishlist?: boolean;
}) {
  const { wishlist, index, clear } = useWishlist();
  const [values, setValues] = useState<Record<string, string>>({
    name: "", email: "", phone: "", replyChannel: "WhatsApp", country: "", language: "",
    dateMode: "A month", month: "", from: "", to: "", flexible: "Yes", adults: "2", children: "", rooms: "",
    comfort: "Help me choose", days: "", recommend: "Please recommend a duration", pace: "Balanced",
  });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const started = useRef(0);
  const keyRef = useRef("");
  const status = useRef<HTMLDivElement>(null);
  const set = (k: string) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const v = (k: string) => values[k] ?? "";

  useEffect(() => {
    started.current = Date.now();
    keyRef.current = crypto.randomUUID();
    const q = new URLSearchParams(window.location.search);
    const j = q.get("journey");
    if (j) setValues((s) => ({ ...s, interestJourney: j }));
  }, []);
  useEffect(() => { if (state === "done" || state === "error") status.current?.focus(); }, [state]);

  function fieldsFor(): Record<string, string> {
    const f: Record<string, string> = {};
    const add = (label: string, key: string) => { if (v(key)) f[label] = v(key); };
    if (type === "custom" || type === "wellness") {
      f["When"] = v("dateMode") === "Exact dates" ? `${v("from")} to ${v("to")}` : v("dateMode") === "A month" ? v("month") || "A month to confirm" : "Undecided";
      f["Flexible dates"] = v("flexible");
      add("Adults", "adults"); add("Children's ages", "children"); add("Rooms", "rooms");
    }
    if (type === "custom") {
      add("Journey of interest", "interestJourney"); add("Destinations", "places"); add("Interests", "interests");
      f["Duration"] = v("recommend") === "Please recommend a duration" ? "Please recommend" : `${v("days")} days available`;
      add("Comfort tier", "comfort"); add("Pace", "pace");
    }
    if (type === "journey" || type === "custom") {
      add("Arrival city and timing", "arrival"); add("Departure city and timing", "departure");
      add("Dietary preferences", "dietary"); add("Assistance or accessibility requests", "assistance"); add("Must-do experiences", "mustdo"); add("Budget range (optional)", "budget");
    }
    if (collection === "shravan") { add("Travelling parent(s) and ages", "parents"); add("Booking contact is", "bookingRole"); add("Family updates and photo sharing", "updates"); add("Pace and mobility", "mobility"); }
    if (collection === "family-journeys") { add("Children's rest and nap needs", "naps"); add("Children's meal preferences", "kidsMeals"); }
    if (type === "wedding") {
      add("Your role", "role"); add("Wedding dates", "weddingDates"); add("Date flexibility", "weddingFlex"); add("Guest count", "guests");
      add("Events", "events"); add("Rooms needed", "weddingRooms"); add("Venue preference", "venue"); add("Planning scope", "scope"); add("Indicative budget (optional)", "budget");
    }
    if (type === "departure") {
      if (departure) f["Departure"] = `${departure.id} ${departure.title}`;
      add("Date flexibility", "depFlex"); add("Travellers", "adults"); add("Preferred tier", "comfort"); add("Room preference", "roomPref"); add("Would travel on another date", "alternative");
    }
    if (type === "wellness") { add("Days available", "days"); add("Stay preference", "stay"); add("Gentle activity preferences", "activities"); add("Accessibility needs", "assistance"); }
    if (type === "partner") { add("Company", "company"); add("Website", "site"); add("Role", "role"); add("Business type", "business"); }
    add("Notes", "notes");
    return f;
  }

  function snapshot(w: Wishlist) {
    const title = (id: string) => index.items.find((i) => i.id === id)?.title ?? id;
    const journeyTitle = w.journey ? index.journeys.find((j) => j.id === w.journey!.id)?.title : undefined;
    return {
      ...w, journeyTitle, tierName: w.journey ? tierLabel[w.journey.tier] : undefined,
      resolved: w.items.map((i) => ({ id: i.id, title: title(i.id), status: itemState(index, w, i.id), mode: i.mode })),
      reviewNotes: reviewNotes(index, w).map((n) => n.text),
    };
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const website = (event.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type, idempotencyKey: keyRef.current, started: started.current, website,
          contact: { name: v("name"), email: v("email"), phone: v("phone"), replyChannel: v("replyChannel"), country: v("country"), language: v("language") },
          marketingConsent: consent, fields: fieldsFor(), context,
          wishlist: withWishlist ? snapshot(wishlist) : undefined,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) { setError(data.error || "Something went wrong. Please try again."); setState("error"); return; }
      setResult({ reference: data.reference, delivered: data.delivered, summary: data.summary ?? "" });
      setState("done");
      if (withWishlist && data.delivered) clear();
    } catch {
      setError("We could not reach our server. Please try again, or use WhatsApp.");
      setState("error");
    }
  }

  if (state === "done" && result) {
    const share = whatsappUrl({ kind: "enquiry", reference: result.reference, summary: context ? `About: ${context}` : undefined });
    const mail = `mailto:tourmelloh@gmail.com?subject=${encodeURIComponent(`Enquiry ${result.reference}`)}&body=${encodeURIComponent(result.summary)}`;
    return (
      <div className="enquiry-done" ref={status} tabIndex={-1} role="status">
        <span className="enquiry-tick"><Check size={26} aria-hidden="true" /></span>
        <p className="enquiry-ref">Reference <strong>{result.reference}</strong></p>
        {result.delivered ? (
          <>
            <h2>Thank you, {v("name").split(" ")[0]}.</h2>
            <p>Your request has reached our team. We review your selections, check feasibility and availability, and reply by {v("replyChannel").toLowerCase()} with questions or a complete quotation before any payment.</p>
          </>
        ) : (
          <>
            <h2>One more step.</h2>
            <p>Your request is ready, but our online inbox did not confirm delivery. Please send it with one tap below so nothing is lost. The reference and full summary are included.</p>
          </>
        )}
        <div className="cat-band-actions">
          <a className="cat-whatsapp" href={share} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={19} /> {result.delivered ? "Continue on WhatsApp" : "Send on WhatsApp"}</a>
          {!result.delivered && <a className="cat-whatsapp" href={mail}><Mail size={18} aria-hidden="true" /> Send by email</a>}
          <button type="button" className="cat-whatsapp" onClick={() => window.print()}><Printer size={18} aria-hidden="true" /> Print summary</button>
        </div>
        <pre className="enquiry-summary">{result.summary}</pre>
        <p className="enquiry-small">This is a request for a personalised quotation, not a confirmed booking. <Link href="/journeys">Keep exploring</Link></p>
      </div>
    );
  }

  const dates = (
    <>
      <Field label="When">
        <Choice name="dateMode" value={v("dateMode")} onChange={set("dateMode")} options={["A month", "Exact dates", "Undecided"]} />
      </Field>
      {v("dateMode") === "A month" && <Field label="Month"><Choice name="month" value={v("month") || months()[1]} onChange={set("month")} options={months()} /></Field>}
      {v("dateMode") === "Exact dates" && (
        <div className="enquiry-row">
          <Field label="From"><Text name="from" type="date" value={v("from")} onChange={set("from")} /></Field>
          <Field label="To"><Text name="to" type="date" value={v("to")} onChange={set("to")} /></Field>
        </div>
      )}
      <Field label="Are your dates flexible?"><Choice name="flexible" value={v("flexible")} onChange={set("flexible")} options={["Yes", "A little", "No"]} /></Field>
    </>
  );
  const party = (
    <div className="enquiry-row enquiry-row-3">
      <Field label="Adults"><Text name="adults" type="number" value={v("adults")} onChange={set("adults")} /></Field>
      <Field label="Children's ages" hint="If any"><Text name="children" value={v("children")} onChange={set("children")} placeholder="e.g. 6, 11" /></Field>
      <Field label="Rooms" hint="Optional"><Text name="rooms" value={v("rooms")} onChange={set("rooms")} placeholder="e.g. 2 doubles" /></Field>
    </div>
  );

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <fieldset className="enquiry-block">
        <legend>Your details</legend>
        <div className="enquiry-row">
          <Field label={type === "wedding" ? "Couple or organiser name" : "Your name"}><Text name="name" autoComplete="name" value={v("name")} onChange={set("name")} required /></Field>
          <Field label="Preferred reply"><Choice name="replyChannel" value={v("replyChannel")} onChange={set("replyChannel")} options={["WhatsApp", "Email", "Phone"]} /></Field>
        </div>
        <div className="enquiry-row">
          <Field label="Phone or WhatsApp" hint="With country code"><Text name="phone" type="tel" autoComplete="tel" value={v("phone")} onChange={set("phone")} placeholder="+91" /></Field>
          <Field label="Email"><Text name="email" type="email" autoComplete="email" value={v("email")} onChange={set("email")} /></Field>
        </div>
        <div className="enquiry-row">
          <Field label="Travelling from" hint="Optional"><Text name="country" autoComplete="country-name" value={v("country")} onChange={set("country")} /></Field>
          <Field label="Preferred language" hint="Optional"><Text name="language" value={v("language")} onChange={set("language")} placeholder="English, Hindi..." /></Field>
        </div>
      </fieldset>

      {type === "custom" && (
        <fieldset className="enquiry-block">
          <legend>Your journey</legend>
          <Pills legend="Where would you like to go?" options={PLACES} value={v("places")} onChange={set("places")} multiple />
          <Pills legend="What interests you?" options={INTERESTS} value={v("interests")} onChange={set("interests")} multiple />
          {dates}
          {party}
          <div className="enquiry-row">
            <Field label="Duration"><Choice name="recommend" value={v("recommend")} onChange={set("recommend")} options={["Please recommend a duration", "I know how many days I have"]} /></Field>
            {v("recommend") !== "Please recommend a duration" && <Field label="Days available"><Text name="days" value={v("days")} onChange={set("days")} /></Field>}
          </div>
          <div className="enquiry-row">
            <Field label="Comfort"><Choice name="comfort" value={v("comfort")} onChange={set("comfort")} options={["Help me choose", "Standard", "Premium", "Luxury"]} /></Field>
            <Field label="Pace"><Choice name="pace" value={v("pace")} onChange={set("pace")} options={["Gentle", "Balanced", "Full days"]} /></Field>
          </div>
        </fieldset>
      )}

      {collection === "shravan" && (
        <fieldset className="enquiry-block">
          <legend>The travellers</legend>
          <Field label="Travelling parent(s) and ages"><Text name="parents" value={v("parents")} onChange={set("parents")} /></Field>
          <Field label="You are"><Choice name="bookingRole" value={v("bookingRole") || "Booking for my parents"} onChange={set("bookingRole")} options={["Booking for my parents", "One of the travellers", "Booking for a relative"]} /></Field>
          <Field label="Pace, steps and mobility" hint="No medical details, please"><Area name="mobility" value={v("mobility")} onChange={set("mobility")} rows={3} /></Field>
          <Field label="Family updates during the journey"><Choice name="updates" value={v("updates") || "Ask the travellers first"} onChange={set("updates")} options={["Ask the travellers first", "Travellers agree to updates", "Travellers agree to updates with photos"]} /></Field>
        </fieldset>
      )}
      {collection === "family-journeys" && (
        <fieldset className="enquiry-block">
          <legend>Children</legend>
          <Field label="Rest and nap needs"><Text name="naps" value={v("naps")} onChange={set("naps")} /></Field>
          <Field label="Meal preferences"><Text name="kidsMeals" value={v("kidsMeals")} onChange={set("kidsMeals")} /></Field>
        </fieldset>
      )}

      {type === "wedding" && (
        <fieldset className="enquiry-block">
          <legend>The wedding</legend>
          <div className="enquiry-row">
            <Field label="You are"><Choice name="role" value={v("role") || "The couple"} onChange={set("role")} options={["The couple", "Family", "A wedding planner"]} /></Field>
            <Field label="Guest count"><Text name="guests" value={v("guests")} onChange={set("guests")} /></Field>
          </div>
          <div className="enquiry-row">
            <Field label="Wedding dates"><Text name="weddingDates" value={v("weddingDates")} onChange={set("weddingDates")} placeholder="Dates or a season" /></Field>
            <Field label="Flexibility"><Choice name="weddingFlex" value={v("weddingFlex") || "Fixed by muhurat"} onChange={set("weddingFlex")} options={["Fixed by muhurat", "Flexible by a few days", "Flexible season"]} /></Field>
          </div>
          <Pills legend="Events" options={["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception", "Puja", "Ganga aarti"]} value={v("events")} onChange={set("events")} multiple />
          <div className="enquiry-row">
            <Field label="Rooms for guests"><Text name="weddingRooms" value={v("weddingRooms")} onChange={set("weddingRooms")} /></Field>
            <Field label="Venue preference"><Text name="venue" value={v("venue")} onChange={set("venue")} placeholder="Riverside palace, hotel, lawn..." /></Field>
          </div>
          <Pills legend="What should we plan?" options={["Venue sourcing", "Guest stays", "Transfers & hospitality", "Ceremonies & priest", "Decor", "Catering", "Photography & video", "Entertainment", "Family experiences", "Pre/post-wedding travel"]} value={v("scope")} onChange={set("scope")} multiple />
          <Field label="Indicative budget" hint="Optional"><Text name="budget" value={v("budget")} onChange={set("budget")} /></Field>
        </fieldset>
      )}

      {type === "departure" && departure && (
        <fieldset className="enquiry-block">
          <legend>{departure.title}</legend>
          <div className="enquiry-row">
            <Field label="Date flexibility"><Choice name="depFlex" value={v("depFlex") || (departure.dated ? "These dates" : "Tell me when dates are set")} onChange={set("depFlex")} options={departure.dated ? ["These dates", "Flexible by a week", "Future dates"] : ["Tell me when dates are set", "A particular month", "Flexible"]} /></Field>
            <Field label="Travellers"><Text name="adults" type="number" value={v("adults")} onChange={set("adults")} /></Field>
          </div>
          <div className="enquiry-row enquiry-row-3">
            <Field label="Preferred tier"><Choice name="comfort" value={v("comfort")} onChange={set("comfort")} options={["Help me choose", "Standard", "Premium", "Luxury"]} /></Field>
            <Field label="Room"><Choice name="roomPref" value={v("roomPref") || "Either"} onChange={set("roomPref")} options={["Either", "Twin share", "Single room"]} /></Field>
            <Field label="Another date if needed?"><Choice name="alternative" value={v("alternative") || "Yes"} onChange={set("alternative")} options={["Yes", "No"]} /></Field>
          </div>
        </fieldset>
      )}

      {type === "wellness" && (
        <fieldset className="enquiry-block">
          <legend>Your stay</legend>
          {dates}
          {party}
          <div className="enquiry-row">
            <Field label="Days available"><Text name="days" value={v("days")} onChange={set("days")} /></Field>
            <Field label="Stay preference"><Choice name="stay" value={v("stay") || "Help me choose"} onChange={set("stay")} options={["Help me choose", "A wellness retreat", "A Ganga-side ashram"]} /></Field>
          </div>
          <Pills legend="Gentle activities you would like" options={["Yoga", "Breathwork", "Meditation", "Ayurveda consultation", "Time by the river", "Gentle cultural visits"]} value={v("activities")} onChange={set("activities")} multiple />
          <Field label="Accessibility needs" hint="Please do not share medical history here"><Area name="assistance" value={v("assistance")} onChange={set("assistance")} rows={2} /></Field>
        </fieldset>
      )}

      {type === "partner" && (
        <fieldset className="enquiry-block">
          <legend>Your business</legend>
          <div className="enquiry-row">
            <Field label="Company"><Text name="company" value={v("company")} onChange={set("company")} /></Field>
            <Field label="Website" hint="Optional"><Text name="site" value={v("site")} onChange={set("site")} /></Field>
          </div>
          <div className="enquiry-row">
            <Field label="Your role"><Text name="role" value={v("role")} onChange={set("role")} /></Field>
            <Field label="Business type"><Choice name="business" value={v("business") || "Travel agency"} onChange={set("business")} options={["Travel agency", "Tour operator / DMC", "Corporate", "Hotel or venue", "Other"]} /></Field>
          </div>
        </fieldset>
      )}

      {(type === "journey" || type === "custom") && (
        <fieldset className="enquiry-block">
          <legend>Helpful details <small>All optional</small></legend>
          <div className="enquiry-row">
            <Field label="Arrival city and timing"><Text name="arrival" value={v("arrival")} onChange={set("arrival")} placeholder="Varanasi airport, morning" /></Field>
            <Field label="Departure city and timing"><Text name="departure" value={v("departure")} onChange={set("departure")} /></Field>
          </div>
          <div className="enquiry-row">
            <Field label="Dietary preferences"><Text name="dietary" value={v("dietary")} onChange={set("dietary")} placeholder="Vegetarian, Jain, no onion-garlic..." /></Field>
            <Field label="Budget range" hint="Optional"><Text name="budget" value={v("budget")} onChange={set("budget")} /></Field>
          </div>
          <Field label="Assistance or accessibility requests" hint="No medical details, please"><Text name="assistance" value={v("assistance")} onChange={set("assistance")} /></Field>
          <Field label="Must-do experiences"><Text name="mustdo" value={v("mustdo")} onChange={set("mustdo")} /></Field>
        </fieldset>
      )}

      <Field label="Anything else?" hint="Optional" full><Area name="notes" value={v("notes")} onChange={set("notes")} placeholder="A milestone you are celebrating, a temple you must visit, the pace that suits your family." /></Field>
      <input className="enquiry-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label className="enquiry-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Send me occasional Tourmelloh news and journey ideas (optional; your enquiry does not subscribe you).</span>
      </label>
      {state === "error" && <div className="enquiry-alert" ref={status} tabIndex={-1} role="alert"><p>{error}</p></div>}
      <div className="enquiry-submit">
        <button className="tour-primary" type="submit" disabled={state === "sending"} style={{ color: "var(--paper)" }}>
          {state === "sending" ? "Sending" : cta ?? CTA[type]} <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <p>This is a request for a personalised quotation, not a confirmed booking. No payment is required. <Link href="/privacy">Privacy</Link></p>
      </div>
    </form>
  );
}
