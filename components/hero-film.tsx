"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function HeroFilm() {
  const film = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 700px)");
    video.src = small.matches
      ? "/videos/varanasi-mobile.mp4"
      : "/videos/varanasi-desktop.mp4";
    video.load();
    if (!reduced.matches) void video.play().catch(() => setPlaying(false));
    const respectPreference = () => { if (reduced.matches) video.pause(); };
    reduced.addEventListener("change", respectPreference);
    return () => reduced.removeEventListener("change", respectPreference);
  }, []);

  function toggle() {
    const video = film.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return (
    <>
      <video ref={film} className="hero-film" muted loop playsInline
        preload="metadata" poster="/images/varanasi-film-poster.webp"
        aria-hidden="true" tabIndex={-1}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => setUnavailable(true)} />
      {!unavailable && <button type="button" className="film-control"
        onClick={toggle} aria-label={playing ? "Pause Varanasi film" : "Play Varanasi film"}>
        {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
        <span>{playing ? "Pause film" : "Play film"}</span>
      </button>}
    </>
  );
}
