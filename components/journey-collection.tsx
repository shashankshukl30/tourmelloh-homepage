"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronDown, Heart, X } from "lucide-react";
import {
  categories,
  destinations,
  journeys,
  type JourneyCategory,
} from "@/content/travel";
import { imageNames } from "@/components/destinations";
import { Reveal } from "@/components/reveal";
import { useShortlist } from "@/hooks/use-shortlist";

export function JourneyCollection() {
  const [category, setCategory] = useState<JourneyCategory>("All journeys");
  const [destination, setDestination] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const { saved, notice, toggleSave } = useShortlist();
  const filtered = journeys.filter(
    (journey) =>
      (category === "All journeys" || journey.category === category) &&
      (!destination || journey.places.some((place) => place === destination)) &&
      (!onlySaved || saved.includes(journey.id)),
  );
  function reset() {
    setCategory("All journeys");
    setDestination("");
    setOnlySaved(false);
  }
  return (
    <main id="main" className="collection-page">
      <section className="collection-opening page-width">
        <nav className="collection-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Our journeys</span>
        </nav>
        <div className="collection-heading">
          <div>
            <span className="eyebrow">THE TOURMELLOH COLLECTION</span>
            <h1>
              Follow your
              <br />
              <em>sense of wonder.</em>
            </h1>
          </div>
          <div className="collection-opening-note">
            <span className="collection-small-number">01 — 04</span>
            <p>
              Sacred rivers. Storied cities. A little time to find your own
              rhythm. Start with a journey that speaks to you.
            </p>
            <a href="#collection" className="text-link">
              Discover the collection <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </section>
      <section
        className="collection-main page-width"
        id="collection"
        aria-label="Suggested journeys"
      >
        <div className="collection-filter-row">
          <div
            className="collection-interests"
            role="group"
            aria-label="Filter by interest"
          >
            {categories.map((value) => (
              <button
                key={value}
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <label className="collection-destination">
            <span className="sr-only">Filter by destination</span>
            <span className="select-wrap">
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              >
                <option value="">All destinations</option>
                {destinations.map((place) => (
                  <option key={place.name}>{place.name}</option>
                ))}
              </select>
              <ChevronDown size={14} />
            </span>
          </label>
        </div>
        <div className="collection-results-row">
          <p role="status">
            {filtered.length === 1
              ? "1 journey"
              : `${filtered.length} journeys`}{" "}
            to make your own
          </p>
          <button
            className="collection-saved"
            aria-pressed={onlySaved}
            onClick={() => setOnlySaved(!onlySaved)}
          >
            <Heart size={15} fill={onlySaved ? "currentColor" : "none"} />
            My shortlist <span>{saved.length}</span>
          </button>
        </div>
        <span className="sr-only" role="status">
          {notice}
        </span>
        <div className="collection-grid">
          {filtered.map((journey, index) => (
            <Reveal className="collection-card" key={journey.id}>
              <div className="collection-image">
                <Link
                  href={`/journeys/${journey.slug}`}
                  aria-label={`Explore ${journey.title}`}
                >
                  <Image
                    src={`/images/${imageNames[journey.image]}.webp`}
                    alt={`${journey.image === "varanasi" ? "The riverfront ghats of Varanasi" : journey.image === "ayodhya" ? "Ram Mandir in Ayodhya" : journey.image === "bodhgaya" ? "Mahabodhi Temple in Bodh Gaya" : "The Taj Mahal in Agra"}`}
                    fill
                    sizes="(max-width: 700px) 90vw, 44vw"
                  />
                </Link>
                <span className="collection-image-tag">{journey.tag}</span>
                <button
                  className="collection-save"
                  onClick={() => toggleSave(journey.id)}
                  aria-label={`${saved.includes(journey.id) ? "Unsave" : "Save"} ${journey.title}`}
                  aria-pressed={saved.includes(journey.id)}
                >
                  <Heart
                    size={18}
                    fill={saved.includes(journey.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
              <div className="collection-card-meta">
                <span>{journey.duration}</span>
                <span>{journey.category}</span>
              </div>
              <div className="collection-card-title">
                <span className="collection-index">0{index + 1}</span>
                <h2>
                  <Link href={`/journeys/${journey.slug}`}>
                    {journey.title}
                  </Link>
                </h2>
              </div>
              <div className="collection-card-copy">
                <p className="collection-route">{journey.route}</p>
                <p>{journey.intro}</p>
                <Link
                  href={`/journeys/${journey.slug}`}
                  className="text-link underlined-link"
                >
                  Explore this journey <ArrowUpRight size={19} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        {!filtered.length && (
          <div className="collection-empty">
            <span className="eyebrow">A LITTLE ROOM TO EXPLORE</span>
            <h2>
              {onlySaved && !saved.length
                ? "Your next journey is waiting."
                : "Let’s open up the possibilities."}
            </h2>
            <p>
              {onlySaved && !saved.length
                ? "Tap the heart on any journey to keep it in your shortlist on this device."
                : "There isn’t a suggested route for this combination yet. Explore the full collection, or start a brief around the places that matter to you."}
            </p>
            <button className="text-link underlined-link" onClick={reset}>
              Show all journeys <X size={16} />
            </button>
          </div>
        )}
        <p className="collection-footnote">
          A collection of suggested routes. Dates, stays, transport and pricing
          are agreed during planning.
        </p>
      </section>
      <section className="collection-personal section-space">
        <div className="page-width collection-personal-inner">
          <Reveal>
            <span className="eyebrow">YOUR IDEAS BELONG HERE</span>
            <h2>
              There’s a journey
              <br />
              only <em>you could take.</em>
            </h2>
          </Reveal>
          <div>
            <p>
              A family tradition to honour. A place you’ve kept coming back to
              in your mind. Tell us where you would like to begin.
            </p>
            <Link
              href="/#plan"
              className="button button-clay"
              style={{ color: "var(--paper)" }}
            >
              Start your travel brief <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
