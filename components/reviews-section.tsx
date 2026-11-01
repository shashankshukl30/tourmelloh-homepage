import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionIntro } from "@/components/catalog/blocks";
import { ReviewsSlider, type ReviewCard } from "@/components/reviews-slider";
import { journeys, reviews, sampleReviews } from "@/content/catalog";
import type { Review } from "@/content/catalog/types";
import { isProduction } from "@/lib/site";

/** Which filter a review sits under on /reviews, from the package travelled. */
function groupOf(id?: string) {
  const n = Number(id?.slice(1));
  if (!n) return undefined;
  if (n <= 3) return "Varanasi stays";
  if (n === 9) return "Rites and remembrance";
  if (n >= 11 && n <= 16) return "Buddhist circuit";
  return "Pilgrimages";
}

/** Real, consented reviews on tourmelloh.com. Preview builds show the design samples until they arrive. */
export function shownReviews(): ReviewCard[] {
  const list: Review[] = reviews.length ? reviews : isProduction ? [] : sampleReviews;
  return list.filter((r) => r.text).map((r) => {
    const j = r.journeyId ? journeys.find((x) => x.id === r.journeyId) : undefined;
    return {
      id: r.id, name: r.name, place: r.place, text: r.text!, rating: r.rating, month: r.month,
      journey: r.journey, href: j ? `/journeys/${j.slug}` : undefined, group: groupOf(r.journeyId),
    };
  });
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
          <Link className="tour-text-link" href="/reviews">Read all {list.length} reviews <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <ReviewsSlider reviews={list.slice(0, 8)} />
    </section>
  );
}
