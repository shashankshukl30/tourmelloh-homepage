"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type ReviewCard = {
  id: string;
  name: string;
  place?: string;
  journey: string;
  href?: string;
  group?: string;
  text: string;
  rating?: number;
  month?: string;
  title?: string;
  format?: "testimonial" | "review";
};

export function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="rv-stars" role="img" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} aria-hidden="true" fill={i < rating ? "currentColor" : "none"} />)}
    </span>
  );
}

function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => /^\p{L}/u.test(w));
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

/** Avatar, name, place and the package travelled: one byline for the slider and the reviews page. */
export function ReviewByline({ r, index }: { r: ReviewCard; index: number }) {
  return (
    <figcaption className="rv-byline">
      <span className="rv-avatar" data-tone={index % 3} aria-hidden="true">{initials(r.name)}</span>
      <span className="rv-who">
        <strong>{r.name}</strong>
        {r.place && <span>{r.place}</span>}
      </span>
      {r.href
        ? <Link className="rv-journey" href={r.href}>{r.journey}</Link>
        : <span className="rv-journey">{r.journey}</span>}
    </figcaption>
  );
}

/** Stars (reviews) or a "Testimonial" tag, then the guest's headline and words. */
export function ReviewBody({ r }: { r: ReviewCard }) {
  return (
    <>
      <div className="rv-top">
        {r.rating ? <Stars rating={r.rating} /> : <span className="rv-kind">Testimonial</span>}
        {r.month && <span className="rv-month">{r.month}</span>}
      </div>
      {r.title && <h3 className="rv-title">{r.title}</h3>}
      <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
    </>
  );
}

/** Guest reviews as a slider: swipe on phones (with dots), arrows and three cards on larger screens. */
export function ReviewsSlider({ reviews }: { reviews: ReviewCard[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting && e.intersectionRatio > 0.6) setActive(cards.indexOf(e.target as HTMLElement));
    }, { root: el, threshold: [0.6] });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [reviews.length]);

  function go(i: number) {
    const el = rail.current;
    const card = el?.children[Math.max(0, Math.min(reviews.length - 1, i))] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }

  return (
    <div className="rv">
      <div className="rv-rail" ref={rail} aria-label="Guest reviews">
        {reviews.map((r, i) => (
          <figure className="rv-card" key={r.id}>
            <ReviewBody r={r} />
            <ReviewByline r={r} index={i} />
          </figure>
        ))}
      </div>
      <div className="rv-controls">
        <div className="rv-dots" aria-hidden="true">{reviews.map((r, i) => <i key={r.id} data-on={i === active} />)}</div>
        <div className="rv-arrows">
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous review" disabled={active === 0}><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next review" disabled={active >= reviews.length - 1}><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}
