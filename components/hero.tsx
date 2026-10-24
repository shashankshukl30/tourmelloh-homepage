"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import { destinations, type JourneyCategory } from "@/content/travel";
import { useState } from "react";

export function Hero({
  onExplore,
}: {
  onExplore: (destination: string, category: JourneyCategory) => void;
}) {
  const [destination, setDestination] = useState("Anywhere in our collection");
  const [style, setStyle] = useState<JourneyCategory>("All journeys");
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <Image
          src="/images/varanasi-aerial.webp"
          alt="The ghats and dense old city of Varanasi curving along the River Ganga"
          fill
          preload
          sizes="(max-width: 600px) 160vh, 100vw"
          className="hero-image"
          quality={90}
        />
        <div className="hero-shade" />
        <div className="hero-content page-width">
          <p className="eyebrow hero-eyebrow">
            <span className="little-line" /> VARANASI AT HEART. INDIA WITHIN
            REACH.
          </p>
          <h1 id="hero-heading">
            Some journeys
            <br />
            stay <em>with you.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              From the first light on the Ganga to the places
              <br className="desktop-break" /> you’ve always wanted to see. Go a
              little deeper.
            </p>
            <a
              className="hero-explore"
              aria-label="Explore the Varanasi edit"
              href="#varanasi"
            >
              <span>Take a closer look</span>
              <span className="round-arrow">
                <ArrowDown size={20} />
              </span>
            </a>
          </div>
        </div>
        <div className="hero-caption">
          <MapPin size={13} />
          <span>VARANASI, UTTAR PRADESH</span>
          <span className="caption-number">01 — 08</span>
        </div>
      </section>
      <div className="finder-wrap page-width">
        <form
          className="trip-finder"
          onSubmit={(event) => {
            event.preventDefault();
            onExplore(destination, style);
          }}
          aria-label="Find a suggested journey"
        >
          <div className="finder-intro">
            <span className="eyebrow">EVERY JOURNEY STARTS</span>
            <strong>with a little curiosity.</strong>
          </div>
          <label className="finder-field">
            <span>Where would you like to go?</span>
            <div className="select-wrap">
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              >
                <option>Anywhere in our collection</option>
                {destinations.map((place) => (
                  <option key={place.name}>{place.name}</option>
                ))}
              </select>
              <ChevronDown size={16} />
            </div>
          </label>
          <label className="finder-field">
            <span>What draws you here?</span>
            <div className="select-wrap">
              <select
                value={style}
                onChange={(event) =>
                  setStyle(event.target.value as JourneyCategory)
                }
              >
                <option value="All journeys">A little of everything</option>
                <option>Sacred journeys</option>
                <option>Culture &amp; heritage</option>
                <option>Buddhist trails</option>
              </select>
              <ChevronDown size={16} />
            </div>
          </label>
          <button
            className="button button-clay"
            style={{ color: "var(--paper)" }}
            type="submit"
          >
            Find my journey <ArrowUpRight size={19} />
          </button>
        </form>
        <div className="finder-foot">
          <span>
            A place for faith. A taste for culture. A journey that feels like
            you.
          </span>
          <a href="#plan">
            Have something else in mind? <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
