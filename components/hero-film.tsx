"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

const poster = "/images/india-film-poster.webp";
const mobileFilm = "/videos/india-mobile.mp4";
const desktopFilm = "/videos/india-desktop.mp4";
const places = [
  { landmark: "On the Ganga", location: "Varanasi, Uttar Pradesh" },
  { landmark: "The Taj Mahal", location: "Agra, Uttar Pradesh" },
  { landmark: "Rumi Darwaza", location: "Lucknow, Uttar Pradesh" },
  { landmark: "Amber Fort", location: "Jaipur, Rajasthan" },
];

function placeAt(time: number) {
  if (time < 5.5 || time >= 23.5) return 0;
  if (time < 11.5) return 1;
  return time < 17.5 ? 2 : 3;
}

export function HeroFilm() {
  // Discover the first film frame in server-rendered hints, ahead of scripts.
  preload(poster, { as: "image", fetchPriority: "high" });
  const film = useRef<HTMLVideoElement>(null);
  const [place, setPlace] = useState(0);

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Native sources start the selected film before hydration. Reduced motion
    // matches neither source, keeping the poster still without a video download.
    const respectPreference = () => {
      if (reduced.matches) video.pause();
      else {
        if (!video.currentSrc) video.load();
        void video.play().catch(() => { /* The poster remains if autoplay is unavailable. */ });
      }
    };
    respectPreference();
    reduced.addEventListener("change", respectPreference);
    return () => reduced.removeEventListener("change", respectPreference);
  }, []);

  return (
    <>
      <video ref={film} className="hero-film" autoPlay muted loop playsInline
        preload="metadata" poster={poster}
        aria-hidden="true" tabIndex={-1}
        onTimeUpdate={(event) => setPlace(placeAt(event.currentTarget.currentTime))}>
        <source src={mobileFilm} type="video/mp4" media="(max-width: 700px) and (prefers-reduced-motion: no-preference)" />
        <source src={desktopFilm} type="video/mp4" media="(min-width: 701px) and (prefers-reduced-motion: no-preference)" />
      </video>
      <div className="hero-location">{places[place].landmark}<span>{places[place].location}</span></div>
    </>
  );
}
