import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionIntro } from "@/components/catalog/blocks";
import { ReviewsSlider, type ReviewCard } from "@/components/reviews-slider";
import { reviews, sampleReviews } from "@/content/catalog";
import type { Review } from "@/content/catalog/types";
import { isProduction } from "@/lib/site";

/** Real, consented reviews on tourmelloh.com; on preview builds, labelled samples fill in until they arrive. */
export function shownReviews(): ReviewCard[] {
  const list: Review[] = reviews.length ? reviews : isProduction ? [] : sampleReviews;
  return list.filter((r) => r.text).map((r) => ({ id: r.id, name: r.name, place: r.place, journey: r.journey, text: r.text!, rating: r.rating, month: r.month, sample: r.sample }));
}

export function ReviewsSection() {
  const list = shownReviews();
  if (!list.length) return null;
  return (
    <section className="page-width section-space home-reviews" id="reviews" aria-labelledby="reviews-heading">
      <div className="cat-head">
        <SectionIntro id="reviews-heading" label="GUEST REVIEWS" display={["In their", "own words."]} />
        <div>
          <p>What guests say about travelling with Tourmelloh: the planning, the people on the ground and the days themselves.</p>
          <Link className="tour-text-link" href="/reviews">All reviews <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      {list.some((r) => r.sample) && <p className="rv-preview-note">Preview only: sample reviews showing the design. They are replaced by real guest reviews and never appear on tourmelloh.com.</p>}
      <ReviewsSlider reviews={list} />
    </section>
  );
}
