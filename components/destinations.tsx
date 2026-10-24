"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { destinations } from "@/content/travel";
import { Reveal } from "@/components/reveal";

export const imageNames: Record<string, string> = {
  varanasi: "varanasi-riverfront",
  ayodhya: "ayodhya-ram-mandir",
  agra: "agra-taj-mahal",
  prayagraj: "prayagraj-yamuna",
  lucknow: "lucknow-rumi-darwaza",
  bodhgaya: "bodhgaya-mahabodhi",
  vrindavan: "vrindavan-madan-mohan",
  gaya: "gaya-vishnupad",
};
const photoDescriptions: Record<string, string> = {
  varanasi: "Boats and historic ghats on the Ganga at Varanasi",
  ayodhya: "Shri Ram Janambhoomi Mandir in Ayodhya",
  agra: "The Taj Mahal and its reflecting pool in Agra",
  prayagraj: "A boat on the Yamuna at Prayagraj, with Naini bridge beyond",
  lucknow: "Rumi Darwaza in Lucknow",
  bodhgaya: "The Mahabodhi Temple in Bodh Gaya",
  vrindavan: "Madan Mohan Temple in Vrindavan",
  gaya: "Vishnupad Temple in Gaya",
};

export function Destinations({
  onPlan,
}: {
  onPlan: (destination: string) => void;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const detail = destinations.find((place) => place.name === selected);
  const move = (direction: number) =>
    rail.current?.scrollBy({
      left: direction * (rail.current.clientWidth * 0.8),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <section
      className="destinations-section section-space"
      id="destinations"
      aria-labelledby="destinations-heading"
    >
      <Reveal className="section-heading page-width">
        <div>
          <span className="eyebrow">
            EIGHT PLACES. ENDLESS WAYS TO CONNECT.
          </span>
          <h2 id="destinations-heading">
            Where will India <em>take you?</em>
          </h2>
        </div>
        <div className="rail-controls">
          <button
            aria-label="Previous destinations"
            disabled={position.start}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            aria-label="Next destinations"
            disabled={position.end}
            onClick={() => move(1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </Reveal>
      <div
        className="destination-rail"
        ref={rail}
        onScroll={() => {
          const el = rail.current;
          if (el)
            setPosition({
              start: el.scrollLeft <= 2,
              end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
            });
        }}
      >
        {destinations.map((place, i) => (
          <button
            className={`destination-card ${selected === place.name ? "is-selected" : ""}`}
            key={place.name}
            onClick={() =>
              setSelected((current) =>
                current === place.name ? null : place.name,
              )
            }
            aria-expanded={selected === place.name}
            aria-controls="destination-detail"
          >
            <div className="destination-photo">
              <Image
                src={`/images/${imageNames[place.image]}.webp`}
                alt={photoDescriptions[place.image]}
                fill
                sizes="(max-width: 600px) 80vw, (max-width: 1000px) 42vw, 27vw"
              />
              <span className="destination-index">0{i + 1}</span>
              <span className="destination-open">
                <ArrowUpRight size={19} />
              </span>
            </div>
            <div className="destination-copy">
              <span className="eyebrow">{place.region}</span>
              <h3>{place.name}</h3>
              <p>{place.note}</p>
            </div>
          </button>
        ))}
      </div>
      {detail && (
        <div className="destination-detail page-width" id="destination-detail">
          <div>
            <span className="eyebrow">
              A CLOSER LOOK AT {detail.name.toUpperCase()}
            </span>
            <h3>{detail.highlights}</h3>
            <p>{detail.description}</p>
          </div>
          <button className="text-link" onClick={() => onPlan(detail.name)}>
            Plan for {detail.name} <ArrowUpRight size={18} />
          </button>
          <button
            className="detail-close"
            aria-label="Close destination details"
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>
        </div>
      )}
      <div className="destination-bottom page-width">
        <span>
          A closer look at North India. A starting point for the rest.
        </span>
        <a className="text-link" href="#plan">
          Dreaming of somewhere else? <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
