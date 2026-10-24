"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { destinations, journeys } from "@/content/travel";
import { Reveal } from "@/components/reveal";

export const imageNames: Record<string, string> = {
  varanasi: "varanasi-dawn", ayodhya: "ayodhya-riverfront",
  agra: "agra-doorway", prayagraj: "prayagraj-river",
  lucknow: "lucknow-imambara", bodhgaya: "bodhgaya-spire",
  vrindavan: "vrindavan-prem-mandir",
};
const photoDescriptions: Record<string, string> = {
  varanasi: "Boats and historic ghats on the Ganga at Varanasi",
  ayodhya: "The riverfront architecture of Ram Ki Paidi in Ayodhya",
  agra: "The Taj Mahal framed through an archway in Agra", prayagraj: "The Yamuna at Prayagraj",
  lucknow: "The Bara Imambara complex in Lucknow", bodhgaya: "Mahabodhi Temple in Bodh Gaya",
  vrindavan: "Prem Mandir in Vrindavan",
};

export function Destinations({ onPlan }: { onPlan: (destination: string) => void }) {
  const [selected, setSelected] = useState<string>("Varanasi");
  useEffect(() => {
    const place = new URLSearchParams(window.location.search).get("place");
    if (place && destinations.some((item) => item.name === place)) setSelected(place);
  }, []);
  const place = destinations.find((item) => item.name === selected) ?? destinations[0];
  const journey = journeys.find((item) => item.places.some((name) => name === place.name));
  const guideSlug = ({ Varanasi: "varanasi", Ayodhya: "ayodhya", Agra: "agra", Bodhgaya: "bodh-gaya" } as Record<string,string>)[place.name];
  return (
    <section className="atlas-section page-width" id="destinations" aria-labelledby="destinations-heading">
      <Reveal className="atlas-heading">
        <div><span className="eyebrow">PLACES WITH A PULL</span><h2 id="destinations-heading">Find your somewhere.</h2></div>
        <p>Ancient river cities, quiet courtyards, extraordinary architecture. Eight places we’d put on your map.</p>
      </Reveal>
      <div className="atlas-layout">
        <div className="atlas-visual" id="destination-detail" aria-live="polite" aria-atomic="true">
          <div className="atlas-photo">
            {place.image !== "gaya" ? <Image key={place.image} src={`/images/${imageNames[place.image]}.webp`} alt={photoDescriptions[place.image]} fill sizes="(max-width: 700px) 90vw, 53vw" quality={90} />
              : <div className="atlas-gaya"><span className="eyebrow">GAYA · BIHAR</span><p>A journey of<br /><em>remembrance.</em></p><span>Vishnupad. The Falgu. Family traditions.</span></div>}
            <div className="atlas-photo-label"><span>{place.region}</span><h3>{place.name}</h3></div>
          </div>
          <div className="atlas-description"><p>{place.description}</p>
            {guideSlug && <Link href={`/destinations/${guideSlug}`} className="text-link">Read the destination guide <ArrowUpRight size={19} /></Link>}
            {journey && !guideSlug && <Link href={`/journeys/${journey.slug}`} className="text-link">Explore a journey here <ArrowUpRight size={19} /></Link>}
          </div>
        </div>
        <div className="atlas-index">
          <p className="atlas-index-title">Where would you like to begin?</p>
          <div className="atlas-places" role="group" aria-label="Choose a destination">
            {destinations.map((item,index) => <button key={item.name} type="button"
              className={selected === item.name ? "is-selected" : ""}
              onClick={() => setSelected(item.name)} aria-pressed={selected === item.name} aria-controls="destination-detail">
              <span className="atlas-number">{String(index+1).padStart(2,"0")}</span>
              <span>{item.name}</span><ArrowUpRight size={21} />
            </button>)}
          </div>
          <button className="button atlas-plan" onClick={() => onPlan(place.name)} style={{ color: "var(--ink)" }}>Plan for {place.name} <ArrowUpRight size={19} /></button>
          <p className="atlas-index-note">Have somewhere else in mind?<br />{" "}<a href="#plan">Tell us about it.</a></p>
        </div>
      </div>
    </section>
  );
}
