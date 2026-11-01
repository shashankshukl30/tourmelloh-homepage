"use client";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroFilm } from "@/components/hero-film";
import { animate, useReducedMotion } from "framer-motion";

const PLACES = [
  ["varanasi", "Varanasi"], ["prayagraj", "Prayagraj"], ["ayodhya", "Ayodhya"], ["chitrakoot", "Chitrakoot"],
  ["gaya", "Gaya"], ["sarnath", "Sarnath"], ["bodh-gaya", "Bodh Gaya"], ["kushinagar", "Kushinagar"], ["naimisharanya", "Naimisharanya"],
] as const;
const LENGTHS = [["short", "2 to 3 nights"], ["medium", "4 to 5 nights"], ["long", "6 nights or more"]] as const;

export function Hero() {
  const router = useRouter();
  const [place, setPlace] = useState("");
  const [length, setLength] = useState("");
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
          <h1 id="hero-heading"><span className="hero-title-line">Your travel and destination partners</span>{" "}<span className="hero-title-line"><em>in Varanasi and beyond.</em></span></h1>
          <div className="hero-bottom">
            <p>Packages, services and experiences through Kashi, Prayagraj, Ayodhya, Gaya and Bodh Gaya.<br className="desktop-break" /> Choose your comfort, personalise it, and receive one complete quotation.</p>
            <a className="hero-explore" href="#packages" style={{ color: "var(--ink)" }}>
              See the packages <span className="round-arrow"><ArrowDown size={20} /></span>
            </a>
          </div>
        </div>
      </section>
      <div className="finder-wrap page-width">
        <form className="trip-finder" aria-label="Find a journey"
          onSubmit={(event) => {
            event.preventDefault();
            const q = new URLSearchParams();
            if (place) q.set("destination", place);
            if (length) q.set("length", length);
            router.push(q.size ? `/journeys?${q}` : "/journeys");
          }}>
          <div className="finder-intro"><span className="eyebrow">WHERE TO NEXT?</span><strong>Find a suggested package.</strong></div>
          <label className="finder-field"><span>Where</span>
            <div className="select-wrap">
              <select value={place} onChange={(event) => setPlace(event.target.value)}>
                <option value="">Any destination</option>
                {PLACES.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
              </select><ChevronDown size={18} />
            </div>
          </label>
          <label className="finder-field"><span>How long</span>
            <div className="select-wrap">
              <select value={length} onChange={(event) => setLength(event.target.value)}>
                <option value="">Any length</option>
                {LENGTHS.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select><ChevronDown size={18} />
            </div>
          </label>
          <button className="button button-clay" style={{ color: "var(--paper)" }} type="submit">Show packages <ArrowUpRight size={19} /></button>
        </form>
      </div>
    </>
  );
}
