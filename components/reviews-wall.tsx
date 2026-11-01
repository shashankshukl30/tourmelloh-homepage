"use client";

import { useMemo, useState } from "react";
import { ReviewByline, Stars, type ReviewCard } from "@/components/reviews-slider";

/** The /reviews page: rating summary, filters by kind of journey, and every review as a card wall. */
export function ReviewsWall({ reviews }: { reviews: ReviewCard[] }) {
  const groups = useMemo(() => Array.from(new Set(reviews.map((r) => r.group).filter(Boolean))) as string[], [reviews]);
  const [group, setGroup] = useState<string | null>(null);
  const shown = group ? reviews.filter((r) => r.group === group) : reviews;

  const rated = reviews.filter((r) => r.rating);
  const average = rated.length ? rated.reduce((sum, r) => sum + r.rating!, 0) / rated.length : 0;
  const bars = [5, 4, 3, 2, 1].map((n) => ({ n, count: rated.filter((r) => r.rating === n).length }));

  return (
    <div className="rw">
      {rated.length > 0 && (
        <div className="rw-summary">
          <div className="rw-score">
            <strong>{average.toFixed(1)}</strong>
            <div>
              <Stars rating={Math.round(average)} size={20} />
              <span>Average of {rated.length} guest {rated.length === 1 ? "review" : "reviews"}</span>
            </div>
          </div>
          <ul className="rw-bars" aria-label="How guests rated us">
            {bars.map(({ n, count }) => (
              <li key={n}>
                <span>{n} star</span>
                <i aria-hidden="true"><b style={{ width: `${(count / rated.length) * 100}%` }} /></i>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {groups.length > 1 && (
        <div className="cat-filters rw-filters" role="group" aria-label="Show reviews for">
          <button type="button" aria-pressed={group === null} onClick={() => setGroup(null)}>All reviews</button>
          {groups.map((g) => (
            <button key={g} type="button" aria-pressed={group === g} onClick={() => setGroup(g)}>{g}</button>
          ))}
        </div>
      )}

      <div className="rw-grid" key={group ?? "all"}>
        {shown.map((r, i) => (
          <figure className="rv-card rw-card" key={r.id}>
            <div className="rv-top">
              {r.rating ? <Stars rating={r.rating} /> : <span />}
              {r.month && <span className="rv-month">{r.month}</span>}
            </div>
            <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
            <ReviewByline r={r} index={i} />
          </figure>
        ))}
      </div>
    </div>
  );
}
