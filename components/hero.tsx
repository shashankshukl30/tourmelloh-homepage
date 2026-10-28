"use client";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroFilm } from "@/components/hero-film";
import { animate, useReducedMotion } from "framer-motion";
import { navCollections, navDestinations } from "@/content/catalog/nav";

export function Hero() {
  const router = useRouter();
  const [region, setRegion] = useState("");
  const [style, setStyle] = useState("");
  const reduced = useReducedMotion();
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced !== false || !content.current) return;
    const elements = Array.from(content.current.querySelectorAll<HTMLElement>(".hero-title-line, .hero-bottom"));
    const delays = [0.05, 0.17, 0.29];
    const controls = elements.map((element, index) => animate(element,
      { opacity: [0, 1], y: [element.classList.contains("hero-bottom") ? 12 : 22, 0] },
      { duration: 0.85, delay: delays[index], ease: [0.22, 1, 0.36, 1] }));
    return () => {
      controls.forEach(control => control.stop());
      elements.forEach(element => { element.style.removeProperty("opacity"); element.style.removeProperty("transform"); });
    };
  }, [reduced]);
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <HeroFilm />
        <div className="hero-shade" />
        <div className="hero-content" ref={content}>
          <h1 id="hero-heading"><span className="hero-title-line">Begin in Kashi.</span>{" "}<span className="hero-title-line"><em>Go a little further.</em></span></h1>
          <div className="hero-bottom">
            <p>Private journeys across India, designed in Varanasi.<br className="desktop-break" /> Your own car, your own guides, hotels with a sense of place.</p>
            <a className="hero-explore" href="#collections" style={{ color: "var(--ink)" }}>
              See the journeys <span className="round-arrow"><ArrowDown size={20} /></span>
            </a>
          </div>
        </div>
      </section>
      <div className="finder-wrap page-width">
        <form className="trip-finder" aria-label="Find a journey"
          onSubmit={(event) => {
            event.preventDefault();
            router.push(style ? `/collections/${style}` : region ? `/destinations/${region}` : "/journeys");
          }}>
          <div className="finder-intro"><span className="eyebrow">WHERE TO NEXT?</span><strong>Follow your curiosity.</strong></div>
          <label className="finder-field"><span>A region on your mind</span>
            <div className="select-wrap">
              <select value={region} onChange={(event) => setRegion(event.target.value)}>
                <option value="">Anywhere in India</option>
                {navDestinations.map((place) => <option key={place.slug} value={place.slug}>{place.name}</option>)}
              </select><ChevronDown size={18} />
            </div>
          </label>
          <label className="finder-field"><span>The kind of journey</span>
            <div className="select-wrap">
              <select value={style} onChange={(event) => setStyle(event.target.value)}>
                <option value="">A bit of everything</option>
                {navCollections.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select><ChevronDown size={18} />
            </div>
          </label>
          <button className="button button-clay" style={{ color: "var(--paper)" }} type="submit">Find my journey <ArrowUpRight size={19} /></button>
        </form>
      </div>
    </>
  );
}
