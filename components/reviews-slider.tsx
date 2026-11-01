"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type ReviewCard = { id: string; name: string; place?: string; journey: string; text: string; rating?: number; month?: string; sample?: boolean };

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
        {reviews.map((r) => (
          <figure className="rv-card" key={r.id}>
            <div className="rv-top">
              {r.rating ? (
                <span className="rv-stars" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} aria-hidden="true" fill={i < r.rating! ? "currentColor" : "none"} />)}
                </span>
              ) : <span />}
              {r.sample && <span className="rv-sample">Sample</span>}
            </div>
            <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
            <figcaption>
              <strong>{r.name}{r.place ? `, ${r.place}` : ""}</strong>
              <span>{r.journey}{r.month && !r.sample ? ` · ${r.month}` : ""}</span>
            </figcaption>
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
