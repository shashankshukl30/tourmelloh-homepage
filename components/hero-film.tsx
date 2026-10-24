"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { preload } from "react-dom";
import { Play, RotateCw } from "lucide-react";

const poster = "/images/india-film-poster.webp";
const mobileFilm = "/videos/india-mobile.mp4";
const desktopFilm = "/videos/india-desktop.mp4";
const places = [
  { landmark: "The riverfront at dusk", location: "Varanasi, Uttar Pradesh" },
  { landmark: "The Taj Mahal", location: "Agra, Uttar Pradesh" },
  { landmark: "Rumi Darwaza", location: "Lucknow, Uttar Pradesh" },
  { landmark: "Amber Fort", location: "Jaipur, Rajasthan" },
];

function placeAt(time: number) {
  if (time < 3.5 || time >= 15.5) return 0;
  if (time < 7.5) return 1;
  return time < 11.5 ? 2 : 3;
}

export function HeroFilm() {
  // Discover the first film frame in server-rendered hints, ahead of scripts.
  preload(poster, { as: "image", fetchPriority: "high" });
  const film = useRef<HTMLVideoElement>(null);
  const previousTime = useRef(0);
  const previousWasPlaying = useRef(false);
  const resumeLoop = useRef(false);
  const requestedMotion = useRef(false);
  const [place, setPlace] = useState(0);
  const [prompt, setPrompt] = useState<"play" | "retry" | null>(null);

  const start = useCallback((fromTap = false, retry = false) => {
    const video = film.current;
    if (!video) return;
    if (!fromTap && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestedMotion.current = false;
      resumeLoop.current = false;
      video.pause();
      setPrompt("play");
      return;
    }
    if (fromTap) requestedMotion.current = true;
    // Set both DOM properties and attributes before play, including in webviews.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    const selected = window.matchMedia("(max-width: 700px)").matches ? mobileFilm : desktopFilm;
    const useDirectSource = () => {
      previousTime.current = 0;
      previousWasPlaying.current = false;
      resumeLoop.current = false;
      video.src = selected;
      video.load();
    };
    if (!video.currentSrc || (fromTap && (retry || video.error)) || video.networkState === video.NETWORK_NO_SOURCE) useDirectSource();

    // Invoke play synchronously inside a real tap; awaiting anything first can
    // lose the browser's transient user activation, particularly on iPhone.
    const failure = (error: unknown) => {
      const name = error instanceof DOMException ? error.name : "";
      if (name === "AbortError" || !video.paused) return;
      setPrompt(name === "NotAllowedError" ? "play" : "retry");
    };
    void video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "NotSupportedError" && !video.hasAttribute("src")) {
        // Older browsers/webviews can fail to select a media-qualified source.
        useDirectSource();
        void video.play().catch(failure);
      } else failure(error);
    });
  }, []);

  const sourceFailed = (event: SyntheticEvent<HTMLSourceElement>) => {
    // A failed <source> can leave play() pending without setting video.error.
    // Only offer retry for the selected candidate, never an unmatched source.
    if (window.matchMedia(event.currentTarget.media).matches) setPrompt("retry");
  };

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Native sources start the selected film before hydration. Reduced motion
    // matches neither source, keeping the poster still without a video download.
    const respectPreference = () => start();
    const resume = () => {
      if (document.visibilityState === "visible" && video.paused) start();
    };
    respectPreference();
    reduced.addEventListener("change", respectPreference);
    window.addEventListener("pageshow", resume);
    document.addEventListener("visibilitychange", resume);
    return () => {
      reduced.removeEventListener("change", respectPreference);
      window.removeEventListener("pageshow", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [start]);

  return (
    <>
      <video ref={film} className="hero-film" data-place={place} autoPlay muted loop playsInline
        preload="metadata" poster={poster}
        aria-hidden="true" tabIndex={-1}
        onPlaying={() => setPrompt(null)}
        onPause={() => { previousWasPlaying.current = false; }}
        onError={(event) => {
          // WebKit also bubbles errors from skipped source candidates.
          if (event.target === event.currentTarget && event.currentTarget.error) setPrompt("retry");
        }}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          // Some native WebKit media backends pause while seeking from the end
          // to frame zero. Recover only that observed loop transition.
          if (video.paused && previousWasPlaying.current && video.currentTime < .1 && previousTime.current > video.duration - .5) resumeLoop.current = true;
          previousTime.current = video.currentTime;
          previousWasPlaying.current = !video.paused;
          setPlace(placeAt(video.currentTime));
        }}
        onSeeked={() => {
          if (!resumeLoop.current) return;
          resumeLoop.current = false;
          if (document.visibilityState === "visible") start(requestedMotion.current);
        }}>
        <source src={mobileFilm} type="video/mp4" media="(max-width: 700px) and (prefers-reduced-motion: no-preference)" onError={sourceFailed} />
        <source src={desktopFilm} type="video/mp4" media="(min-width: 701px) and (prefers-reduced-motion: no-preference)" onError={sourceFailed} />
      </video>
      {prompt && <button className="hero-play-prompt button" type="button"
        aria-label={prompt === "retry" ? "Retry destination video" : "Play destination video"}
        style={{ color: "var(--ink)" }} onClick={() => start(true, prompt === "retry")}>
        {prompt === "retry" ? <RotateCw size={19} /> : <Play size={18} fill="currentColor" />}
        <span>{prompt === "retry" ? "Retry video" : "Play video"}</span>
      </button>}
      <div className="hero-location">{places[place].landmark}<span>{places[place].location}</span></div>
    </>
  );
}
