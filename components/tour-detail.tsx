"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Heart, MapPin, Minus, Plus } from "lucide-react";
import type { JourneyDetail } from "@/content/journey-details";
import { journeys } from "@/content/travel";
import { Reveal } from "@/components/reveal";
import { useShortlist } from "@/hooks/use-shortlist";

const art = {
  kashi: {
    first: "Kashi,", emphasis: "before the world wakes",
    hero: "varanasi-evening", alt: "Historic riverfront buildings and ghats beside the Ganga in Varanasi",
    location: "The ghats of Varanasi", position: "50% 66%", landscape: false,
    second: "varanasi-boats", secondAlt: "Wooden boats beside the Ganga at sunset in Varanasi",
    caption: "Evening on the Ganga, Varanasi",
  },
  sacred: {
    first: "Along the", emphasis: "sacred rivers",
    hero: "ayodhya-ram-mandir", alt: "Shri Ram Janambhoomi Mandir and its courtyard in Ayodhya",
    location: "Shri Ram Janambhoomi Mandir, Ayodhya", position: "50% 46%", landscape: true,
    second: "prayagraj-yamuna", secondAlt: "A boat on the Yamuna in Prayagraj with the Naini bridge beyond",
    caption: "Along the Yamuna, Prayagraj",
  },
  buddhist: {
    first: "The road to", emphasis: "Bodh Gaya",
    hero: "bodhgaya-mahabodhi", alt: "The spire and carved stonework of the Mahabodhi Temple in Bodh Gaya",
    location: "Mahabodhi Temple, Bodh Gaya", position: "50% 27%", landscape: false,
    second: "varanasi-riverfront", secondAlt: "A boat passing the historic ghats of Varanasi",
    caption: "The riverfront in Varanasi, where this route begins",
  },
  heritage: {
    first: "Awadh, Agra &", emphasis: "the lanes of Braj",
    hero: "agra-taj-mahal", alt: "The Taj Mahal seen across its reflecting pool in Agra",
    location: "The Taj Mahal, Agra", position: "50% 50%", landscape: true,
    second: "lucknow-rumi-darwaza", secondAlt: "The Rumi Darwaza gateway in Lucknow",
    caption: "Rumi Darwaza, Lucknow",
  },
} as const;

export function TourDetail({ detail }: { detail: JourneyDetail }) {
  return <TourDetailContent key={detail.id} detail={detail} />;
}

function TourDetailContent({ detail }: { detail: JourneyDetail }) {
  const [openDay, setOpenDay] = useState<number | null>(detail.dayPlans[0]?.day ?? null);
  const { saved, notice, toggleSave } = useShortlist();
  const journey = journeys.find((item) => item.id === detail.id);
  if (!journey) return null;
  const visual = art[journey.id];
  const destination = journey.places[0];
  const planHref = `/?destination=${encodeURIComponent(destination)}&journey=${journey.slug}#plan`;
  const stops = journey.route.split("·").map((place) => place.trim());
  const related = journeys.find((item) => item.id !== journey.id && item.category === journey.category)
    ?? journeys.find((item) => item.id !== journey.id)!;
  const relatedArt = art[related.id];
  const isSaved = saved.includes(journey.id);

  return (
    <main id="main" className="tour-page">
      <div className="tour-width">
        <nav className="tour-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/journeys">Our journeys</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{journey.title}</span>
        </nav>
        <section className="tour-opening" aria-labelledby="tour-title">
          <Reveal className="tour-opening-copy">
            <span className="tour-kicker">{detail.kicker}</span>
            <h1 id="tour-title">{visual.first} <em>{visual.emphasis}</em></h1>
            <div className="tour-opening-meta">
              <span>{journey.duration}</span><span>{journey.category}</span>
            </div>
            <p className="tour-lead">{detail.lead}</p>
            <div className="tour-opening-actions">
              <Link href={planHref} className="tour-primary" style={{ color: "var(--paper)" }}>
                Make this journey yours <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <button className="tour-save" type="button" aria-pressed={isSaved} onClick={() => toggleSave(journey.id)}>
                <Heart size={17} fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
                {isSaved ? "Journey saved" : "Save for later"}
              </button>
            </div>
            <a href="#tour-itinerary" className="tour-read-link">Discover the days ahead <ArrowDown size={16} aria-hidden="true" /></a>
          </Reveal>
          <Reveal className="tour-opening-visual" delay={0.12}>
            <figure>
              <div className="tour-hero-photo">
                <Image src={`/images/${visual.hero}.webp`} alt={visual.alt} fill preload quality={90}
                  sizes={visual.landscape ? "(max-width: 700px) 145vw, 85vw" : "(max-width: 700px) 92vw, 55vw"}
                  style={{ objectPosition: visual.position }} />
              </div>
              <figcaption><MapPin size={13} aria-hidden="true" /><span>{visual.location}</span></figcaption>
            </figure>
          </Reveal>
        </section>
        <section className="tour-route" aria-label="Journey route">
          <span className="tour-kicker">THE THREAD OF YOUR JOURNEY</span>
          <ol>{stops.map((place, index) => (
            <li key={place}><span className="tour-stop-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{place}</span>{index < stops.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
            </li>
          ))}</ol>
        </section>
      </div>

      <div className="tour-body tour-width">
        <section className="tour-itinerary" id="tour-itinerary" aria-labelledby="tour-itinerary-title">
          <Reveal className="tour-section-intro">
            <span className="tour-kicker">A SUGGESTED ITINERARY</span>
            <h2 id="tour-itinerary-title">The days, <em>unfolding.</em></h2>
            <p>A route to begin with. Space to make it your own.</p>
          </Reveal>
          <div className="tour-days">
            {detail.dayPlans.map((day) => {
              const expanded = openDay === day.day;
              const panelId = `tour-${detail.id}-day-${day.day}`;
              return (
                <article className={`tour-day ${expanded ? "tour-day-open" : ""}`} key={day.day}>
                  <h3>
                    <button className="tour-day-trigger" type="button" aria-expanded={expanded}
                      aria-controls={panelId} id={`${panelId}-trigger`}
                      onClick={() => setOpenDay(expanded ? null : day.day)}>
                      <span className="tour-day-number"><span>DAY</span>{String(day.day).padStart(2, "0")}</span>
                      <span className="tour-day-heading"><span className="tour-day-location">{day.location}</span>{day.title}</span>
                      <span className="tour-day-toggle">{expanded ? <Minus size={18} /> : <Plus size={18} />}</span>
                    </button>
                  </h3>
                  <div id={panelId} className="tour-day-content" role="region" aria-labelledby={`${panelId}-trigger`} hidden={!expanded}>
                    <p>{day.description}</p>
                    <ul>{day.moments.map((moment) => <li key={moment}>{moment}</li>)}</ul>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="tour-itinerary-note">The order of visits can change with your dates, arrival times and the pace that suits you.</p>
        </section>

        <aside className="tour-planning" aria-labelledby="tour-planning-title">
          <div className="tour-plan-panel">
            <span className="tour-kicker">YOUR JOURNEY, AT A GLANCE</span>
            <h2 id="tour-planning-title">A starting point.<br /><em>Your own story.</em></h2>
            <dl className="tour-facts">
              <div><dt>Time to explore</dt><dd>{journey.duration}</dd></div>
              <div><dt>The rhythm</dt><dd>{detail.pace}</dd></div>
              <div><dt>Begin in</dt><dd>{detail.arrival}</dd></div>
              <div><dt>Finish in</dt><dd>{detail.departure}</dd></div>
            </dl>
            <Link href={planHref} className="tour-primary tour-plan-cta" style={{ color: "var(--paper)" }}>
              Let’s plan your journey <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <p className="tour-plan-note">Share your dates, travel companions and what matters to you. The details follow from there.</p>
          </div>
          <div className="tour-highlights">
            <span className="tour-kicker">MOMENTS TO LOOK FORWARD TO</span>
            <ul>{detail.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </div>
        </aside>

        <Reveal className="tour-gallery">
          <figure>
            <div className="tour-gallery-photo">
              <Image src={`/images/${visual.second}.webp`} alt={visual.secondAlt} fill
                sizes="(max-width: 900px) 100vw, 62vw" />
            </div>
            <figcaption><span>{visual.caption}</span><span className="tour-kicker">A CLOSER LOOK</span></figcaption>
          </figure>
        </Reveal>

        <section className="tour-notes" aria-labelledby="tour-notes-title">
          <Reveal className="tour-section-intro">
            <span className="tour-kicker">THE DETAILS THAT MATTER</span>
            <h2 id="tour-notes-title">Before <em>you go.</em></h2>
          </Reveal>
          <div className="tour-notes-list">
            {detail.planningNotes.map((note, index) => (
              <article key={note.title}>
                <span className="tour-note-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{note.title}</h3><p>{note.text}</p></div>
              </article>
            ))}
          </div>
          <p className="tour-final-note">This is a suggested journey. Confirm your final itinerary, arrangements and price with Tourmelloh before booking.</p>
        </section>
      </div>

      <section className="tour-related" aria-labelledby="tour-related-title">
        <div className="tour-related-inner tour-width">
          <Reveal className="tour-related-heading">
            <span className="tour-kicker">KEEP EXPLORING</span>
            <h2 id="tour-related-title">Another way<br /><em>to go.</em></h2>
            <Link href="/journeys" className="tour-text-link"><ArrowLeft size={15} aria-hidden="true" /> All our journeys</Link>
          </Reveal>
          <Link href={`/journeys/${related.slug}`} className="tour-related-card" aria-label={`Explore ${related.title}`}>
            <div className="tour-related-photo"><Image src={`/images/${relatedArt.hero}.webp`} alt={relatedArt.alt} fill sizes="(max-width: 600px) 45vw, 24vw" style={{ objectPosition: relatedArt.position }} /></div>
            <div className="tour-related-copy">
              <span className="tour-kicker">{related.duration}</span>
              <h3>{related.title}</h3>
              <p>{related.route}</p>
              <span className="tour-related-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span>
            </div>
          </Link>
        </div>
      </section>
      <span className="tour-sr-only" role="status" aria-live="polite">{notice}</span>
    </main>
  );
}
