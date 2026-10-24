"use client";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { destinations, type JourneyCategory } from "@/content/travel";
import { useState } from "react";
import { HeroFilm } from "@/components/hero-film";

export function Hero({ onExplore }: {
  onExplore: (destination: string, category: JourneyCategory) => void;
}) {
  const [destination, setDestination] = useState("Anywhere in our collection");
  const [style, setStyle] = useState<JourneyCategory>("All journeys");
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <HeroFilm />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-eyebrow">Rooted in Varanasi. Open to India.</p>
          <h1 id="hero-heading">Begin in Kashi.<br /><em>Go a little further.</em></h1>
          <div className="hero-bottom">
            <p>The river at first light. Cities with a thousand stories.<br className="desktop-break" /> India, experienced at your own pace.</p>
            <a className="hero-explore" href="#destinations">
              Explore the places <span className="round-arrow"><ArrowDown size={20} /></span>
            </a>
          </div>
        </div>
        <div className="hero-location">On the Ganga <span>Varanasi, India</span></div>
      </section>
      <div className="finder-wrap page-width">
        <form className="trip-finder" aria-label="Find a suggested journey"
          onSubmit={(event) => { event.preventDefault(); onExplore(destination, style); }}>
          <div className="finder-intro"><span className="eyebrow">WHERE TO NEXT?</span><strong>Follow your curiosity.</strong></div>
          <label className="finder-field"><span>A place on your mind</span>
            <div className="select-wrap">
              <select value={destination} onChange={(event) => setDestination(event.target.value)}>
                <option value="Anywhere in our collection">Anywhere in India</option>
                {destinations.map((place) => <option key={place.name}>{place.name}</option>)}
              </select><ChevronDown size={18} />
            </div>
          </label>
          <label className="finder-field"><span>What brings you here?</span>
            <div className="select-wrap">
              <select value={style} onChange={(event) => setStyle(event.target.value as JourneyCategory)}>
                <option value="All journeys">A bit of everything</option>
                <option>Sacred journeys</option><option>Culture &amp; heritage</option><option>Buddhist trails</option>
              </select><ChevronDown size={18} />
            </div>
          </label>
          <button className="button button-clay" style={{ color: "var(--paper)" }} type="submit">Find my journey <ArrowUpRight size={19} /></button>
        </form>
      </div>
    </>
  );
}
