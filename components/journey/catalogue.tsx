"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tier } from "@/content/catalog/types";

export type CatalogueJourney = {
  slug: string; title: string; subtitle?: string; route: string; nights: number; days: number; summary: string;
  types: string[]; destinations: string[]; photo: { src: string; alt: string; blur: string };
};

const LENGTHS = [
  { key: "", label: "Any length" },
  { key: "short", label: "2 to 3 nights", test: (n: number) => n <= 3 },
  { key: "medium", label: "4 to 5 nights", test: (n: number) => n >= 4 && n <= 5 },
  { key: "long", label: "6 nights or more", test: (n: number) => n >= 6 },
];
const TYPES: Record<string, string> = { "": "Every kind", "hindu-pilgrimage": "Hindu pilgrimage", buddhist: "Buddhist journeys", culture: "Culture & food", heritage: "Heritage" };
const PLACES: Record<string, string> = { "": "Anywhere", varanasi: "Varanasi", sarnath: "Sarnath", prayagraj: "Prayagraj", ayodhya: "Ayodhya", "bodh-gaya": "Bodh Gaya", kushinagar: "Kushinagar", shravasti: "Shravasti" };

/** Filters live in the URL so menu links land pre-filtered and the back button keeps them (brief v5, section 19). */
export function JourneyCatalogue({ journeys, tier }: { journeys: CatalogueJourney[]; tier?: Tier }) {
  const [length, setLength] = useState("");
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setLength(q.get("length") ?? "");
    setType(q.get("type") ?? "");
    setPlace(q.get("destination") ?? "");
  }, []);

  function set(key: string, value: string, setter: (v: string) => void) {
    setter(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  const shown = useMemo(() => journeys.filter((j) => {
    const len = LENGTHS.find((l) => l.key === length);
    if (len?.test && !len.test(j.nights)) return false;
    if (type && !j.types.includes(type)) return false;
    if (place && !j.destinations.includes(place)) return false;
    return true;
  }), [journeys, length, type, place]);

  const availablePlaces = Object.entries(PLACES).filter(([k]) => !k || journeys.some((j) => j.destinations.includes(k)));
  const availableTypes = Object.entries(TYPES).filter(([k]) => !k || journeys.some((j) => j.types.includes(k)));

  return (
    <div className="jc">
      <div className="jc-filters" role="group" aria-label="Filter journeys">
        <label><span>Length</span>
          <select value={length} onChange={(e) => set("length", e.target.value, setLength)}>
            {LENGTHS.map((l) => <option key={l.key} value={l.key}>{l.label}</option>)}
          </select>
        </label>
        <label><span>Destination</span>
          <select value={place} onChange={(e) => set("destination", e.target.value, setPlace)}>
            {availablePlaces.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label><span>Kind of journey</span>
          <select value={type} onChange={(e) => set("type", e.target.value, setType)}>
            {availableTypes.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <p className="jc-count" role="status">{shown.length} {shown.length === 1 ? "journey" : "journeys"}</p>
      </div>
      {shown.length ? (
        <div className="cat-grid">
          {shown.map((j) => (
            <article className="cat-card" key={j.slug}>
              <Link href={`/journeys/${j.slug}${tier ? `?tier=${tier}` : ""}`} className="cat-card-photo" tabIndex={-1} aria-label={j.title}>
                <Image src={j.photo.src} alt={j.photo.alt} fill sizes="(max-width: 760px) 92vw, (max-width: 1150px) 45vw, 30vw" placeholder="blur" blurDataURL={j.photo.blur} />
                <span className="cat-card-tag">{j.nights}N / {j.days}D</span>
              </Link>
              <p className="cat-card-meta">{j.route}</p>
              <h3><Link href={`/journeys/${j.slug}${tier ? `?tier=${tier}` : ""}`}>{j.title}</Link></h3>
              {j.subtitle && <p className="cat-card-sub">{j.subtitle}</p>}
              <p className="cat-card-text">{j.summary}</p>
              <div className="cat-card-foot">
                <span className="cat-card-action">See the journey <ArrowUpRight size={16} /></span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="jc-empty">
          <p>No proposed journey matches all three filters yet. We design routes around you all the time.</p>
          <Link href="/help-me-plan" className="tour-primary" style={{ color: "var(--paper)" }}>Help me plan <ArrowUpRight size={17} /></Link>
        </div>
      )}
    </div>
  );
}
