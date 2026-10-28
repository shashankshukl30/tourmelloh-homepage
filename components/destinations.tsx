"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export type AtlasPlace = {
  slug: string;
  name: string;
  label: string;
  text: string;
  photo: { src: string; alt: string; blur: string };
};

/** The homepage index of regions: choose a name, see its photograph and a line about it. */
export function Destinations({ places }: { places: AtlasPlace[] }) {
  const [selected, setSelected] = useState(places[0]?.slug);
  const place = places.find((item) => item.slug === selected) ?? places[0];
  return (
    <section className="atlas-section page-width" id="destinations" aria-labelledby="destinations-heading">
      <Reveal className="atlas-heading">
        <div><span className="eyebrow">PLACES WITH A PULL</span><h2 id="destinations-heading">Find your somewhere.</h2></div>
        <p>Sacred rivers, desert palaces, tea hills and turquoise islands. {places.length} regions we know well, and love to show.</p>
      </Reveal>
      <div className="atlas-layout">
        <div className="atlas-visual" id="destination-detail" aria-live="polite" aria-atomic="true">
          <div className="atlas-photo">
            <Image key={place.slug} src={place.photo.src} alt={place.photo.alt} fill sizes="(max-width: 700px) 90vw, 53vw"
              quality={86} placeholder="blur" blurDataURL={place.photo.blur} />
            <div className="atlas-photo-label"><span>{place.label.toUpperCase()}</span><h3>{place.name}</h3></div>
          </div>
          <div className="atlas-description"><p>{place.text}</p>
            <Link href={`/destinations/${place.slug}`} className="text-link">Explore {place.name} <ArrowUpRight size={19} /></Link>
          </div>
        </div>
        <div className="atlas-index">
          <p className="atlas-index-title">Where would you like to begin?</p>
          <div className="atlas-places" role="group" aria-label="Choose a region">
            {places.map((item, index) => (
              <button key={item.slug} type="button" className={selected === item.slug ? "is-selected" : ""}
                onClick={() => setSelected(item.slug)} onPointerEnter={(e) => { if (e.pointerType === "mouse") setSelected(item.slug); }}
                aria-pressed={selected === item.slug} aria-controls="destination-detail">
                <span className="atlas-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.name}</span><ArrowUpRight size={21} />
              </button>
            ))}
          </div>
          <Link className="button atlas-plan" href={`/plan?destination=${place.slug}`} style={{ color: "var(--ink)" }}>Plan for {place.name} <ArrowUpRight size={19} /></Link>
          <p className="atlas-index-note">Somewhere else in mind?<br />{" "}<Link href="/plan">Tell us about it.</Link></p>
        </div>
      </div>
      {/* Phones: a swipeable row of regions, each with its own photograph. */}
      <div className="atlas-rail" aria-label="Regions">
        {places.map((item) => (
          <Link key={item.slug} href={`/destinations/${item.slug}`} className="atlas-card">
            <Image src={item.photo.src} alt={item.photo.alt} fill sizes="75vw" placeholder="blur" blurDataURL={item.photo.blur} />
            <span className="atlas-card-copy">
              <small>{item.label}</small>
              <strong>{item.name}</strong>
            </span>
          </Link>
        ))}
      </div>
      <div className="atlas-rail-foot">
        <span>Swipe to see all {places.length}</span>
        <Link href="/destinations" className="tour-text-link">All regions <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
