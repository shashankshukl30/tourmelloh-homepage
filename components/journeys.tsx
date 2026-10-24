"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock3, Heart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, journeys, type JourneyCategory } from "@/content/travel";
import { imageNames } from "@/components/destinations";
import { Reveal } from "@/components/reveal";
import { useShortlist } from "@/hooks/use-shortlist";

export function Journeys({
  category,
  setCategory,
  destination,
  clearDestination,
  onPlan,
}: {
  category: JourneyCategory;
  setCategory: (value: JourneyCategory) => void;
  destination: string;
  clearDestination: () => void;
  onPlan: (destination: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const detailsPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    detailsPanel.current?.focus({ preventScroll: true });
    detailsPanel.current?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [open]);
  const { saved, notice, toggleSave } = useShortlist();
  function closeDetails() {
    const trigger = document.querySelector<HTMLButtonElement>(
      `[data-journey-open="${open}"]`,
    );
    setOpen(null);
    trigger?.focus();
  }
  const filtered = journeys.filter(
    (journey) =>
      (category === "All journeys" || journey.category === category) &&
      (!destination || journey.places.some((place) => place === destination)),
  );
  const detail = filtered.find((journey) => journey.id === open);
  return (
    <section
      className="journeys-section section-space"
      id="journeys"
      aria-labelledby="journeys-heading"
    >
      <Reveal className="section-heading page-width">
        <div>
          <span className="eyebrow">GOOD JOURNEYS BEGIN WITH AN IDEA</span>
          <h2 id="journeys-heading">
            Find a journey.
            <br className="mobile-break" /> <em>Make it yours.</em>
          </h2>
        </div>
        <p>
          Thoughtful starting points, with room
          <br className="desktop-break" /> for your own detours.
        </p>
      </Reveal>
      <div className="journey-tools page-width">
        <div
          className="category-tabs"
          role="group"
          aria-label="Filter journeys by interest"
        >
          {categories.map((value) => (
            <button
              key={value}
              aria-pressed={category === value}
              className={category === value ? "active" : ""}
              onClick={() => {
                setCategory(value);
                setOpen(null);
              }}
            >
              {value}
            </button>
          ))}
        </div>
        {destination && (
          <button className="filter-chip" onClick={clearDestination}>
            {destination} <X size={14} />
            <span className="sr-only">Remove destination filter</span>
          </button>
        )}
      </div>
      <div className="sr-only" role="status">
        {notice}
      </div>
      <div className="journey-grid page-width" aria-live="polite">
        {filtered.map((journey) => (
          <article className="journey-card" key={journey.id}>
            <div className="journey-photo">
              <Link
                className="journey-image-link"
                href={`/journeys/${journey.slug}`}
                aria-label={`Explore ${journey.title}`}
              >
                <Image
                  src={`/images/${imageNames[journey.image]}.webp`}
                  alt={`${journey.route} suggested journey`}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 25vw"
                />
              </Link>
              <span className="journey-tag">{journey.tag}</span>
              <button
                className={`save-button ${saved.includes(journey.id) ? "saved" : ""}`}
                aria-label={`${saved.includes(journey.id) ? "Unsave" : "Save"} ${journey.title}`}
                aria-pressed={saved.includes(journey.id)}
                onClick={() => toggleSave(journey.id)}
              >
                <Heart
                  size={18}
                  fill={saved.includes(journey.id) ? "currentColor" : "none"}
                />
              </button>
            </div>
            <div className="journey-meta">
              <span>
                <Clock3 size={13} />
                {journey.duration}
              </span>
              <span>TAILOR TO YOU</span>
            </div>
            <h3>
              <Link href={`/journeys/${journey.slug}`}>{journey.title}</Link>
            </h3>
            <p className="journey-route">{journey.route}</p>
            <p className="journey-description">{journey.intro}</p>
            <button
              className="text-link journey-detail-link"
              data-journey-open={journey.id}
              onClick={() =>
                setOpen((value) => (value === journey.id ? null : journey.id))
              }
              aria-expanded={open === journey.id}
              aria-controls="journey-detail"
            >
              {open === journey.id ? "Close overview" : "Quick overview"}
              <ArrowUpRight size={17} />
            </button>
          </article>
        ))}
        {!filtered.length && (
          <div className="no-journeys">
            <h3>A different route is taking shape.</h3>
            <p>
              There isn’t a suggested journey for this combination yet. Start
              with a wider selection, or add your ideas to a personal travel
              brief.
            </p>
            <button
              className="text-link"
              onClick={() => {
                setCategory("All journeys");
                clearDestination();
              }}
            >
              See all suggested journeys <ArrowUpRight size={18} />
            </button>
            <button className="text-link" onClick={() => onPlan(destination)}>
              Create a personal brief <ArrowUpRight size={18} />
            </button>
          </div>
        )}
      </div>
      {detail && (
        <div
          className="journey-detail page-width"
          id="journey-detail"
          ref={detailsPanel}
          tabIndex={-1}
        >
          <button
            className="detail-close"
            aria-label="Close itinerary details"
            onClick={closeDetails}
          >
            <X size={18} />
          </button>
          <div className="journey-detail-head">
            <span className="eyebrow">YOUR SUGGESTED ROUTE</span>
            <h3>{detail.title}</h3>
            <p>
              A starting point to discuss. Timings, inclusions and availability
              are to be confirmed.
            </p>
          </div>
          <ol>
            {detail.stages.map((stage, i) => (
              <li key={stage}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {stage}
              </li>
            ))}
          </ol>
          <Link
            className="button button-clay"
            style={{ color: "var(--paper)" }}
            href={`/journeys/${detail.slug}`}
          >
            See the full itinerary <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
      <p className="journey-disclaimer page-width">
        <Check size={14} /> Suggested routes, shaped around your dates,
        interests and pace. Final details follow a planning conversation.
      </p>
      <div className="page-width journey-collection-link">
        <Link className="text-link underlined-link" href="/journeys">
          Explore the full collection <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
