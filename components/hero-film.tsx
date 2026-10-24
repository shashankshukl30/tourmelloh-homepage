"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { preload } from "react-dom";

const poster = "/images/varanasi-film-poster.webp";
const mobileFilm = "/videos/varanasi-mobile.mp4";
const desktopFilm = "/videos/varanasi-desktop.mp4";

function sourceForScreen() {
  return window.matchMedia("(max-width: 700px)").matches ? mobileFilm : desktopFilm;
}

export function HeroFilm() {
  // Put the existing poster in the server-rendered resource hints, ahead of scripts.
  preload(poster, { as: "image", fetchPriority: "high" });
  const film = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Native sources start the selected film before hydration. Reduced motion
    // matches neither source, keeping the poster still until explicitly played.
    setPlaying(!video.paused);
    if (!reduced.matches) void video.play().catch(() => setPlaying(false));
    const respectPreference = () => { if (reduced.matches) video.pause(); };
    reduced.addEventListener("change", respectPreference);
    return () => reduced.removeEventListener("change", respectPreference);
  }, []);

  function toggle() {
    const video = film.current;
    if (!video) return;
    if (video.paused) {
      if (!video.currentSrc) video.src = sourceForScreen();
      void video.play().catch(() => setPlaying(false));
    }
    else video.pause();
  }

  return (
    <>
      <video ref={film} className="hero-film" autoPlay muted loop playsInline
        preload="metadata" poster={poster}
        aria-hidden="true" tabIndex={-1}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onCanPlay={() => setUnavailable(false)}
        onError={(event) => {
          // WebKit reports skipped <source> candidates through this handler too.
          // Only a failure of the video itself should remove its playback control.
          if (event.target === event.currentTarget && event.currentTarget.error) setUnavailable(true);
        }}>
        <source src={mobileFilm} type="video/mp4" media="(max-width: 700px) and (prefers-reduced-motion: no-preference)" />
        <source src={desktopFilm} type="video/mp4" media="(min-width: 701px) and (prefers-reduced-motion: no-preference)" />
      </video>
      {!unavailable && <button type="button" className="film-control"
        onClick={toggle} aria-label={playing ? "Pause Varanasi film" : "Play Varanasi film"}>
        {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
        <span>{playing ? "Pause film" : "Play film"}</span>
      </button>}
    </>
  );
}
