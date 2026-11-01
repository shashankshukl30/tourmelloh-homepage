import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { EnquiryBand } from "@/components/catalog/blocks";
import { ReviewsWall } from "@/components/reviews-wall";
import { ReviewBody, ReviewByline } from "@/components/reviews-slider";
import { shownReviews } from "@/components/reviews-section";
import { WhatsAppPageLink } from "@/components/whatsapp-page-link";
import { WhatsAppIcon } from "@/components/whatsapp-link";
import { reviews } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta({
    title: "Guest Reviews of Tourmelloh Journeys in Varanasi and Beyond",
    description: "What guests say about travelling with Tourmelloh: planning, darshan, boats, guides and the people on the ground in Varanasi, Prayagraj, Ayodhya and Bodh Gaya.",
    path: "/reviews",
  }),
  ...(reviews.length ? {} : { robots: { index: false, follow: true } }),
};

export default function ReviewsPage() {
  const list = shownReviews();
  if (!list.length) notFound();
  const testimonials = list.filter((r) => r.format === "testimonial");
  const rated = list.filter((r) => r.format !== "testimonial");
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening trail={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]} label="TESTIMONIALS & REVIEWS" display={["In their", "own words."]} text="What guests say about travelling with Tourmelloh: the planning, the people on the ground and the days themselves." />
        <section className="cat-section tour-width" aria-label="Reviews" style={{ paddingTop: 0 }}>
          {testimonials.length > 0 && (
            <div className="rt">
              <h2 className="rt-head">Testimonials</h2>
              <div className="rt-grid">
                {testimonials.map((r, i) => (
                  <figure className="rv-card rt-card" key={r.id}>
                    <ReviewBody r={r} />
                    <ReviewByline r={r} index={i} />
                  </figure>
                ))}
              </div>
            </div>
          )}
          {rated.length > 0 && (
            <div className="rt">
              <h2 className="rt-head">Reviews</h2>
              <ReviewsWall reviews={rated} />
            </div>
          )}
          <div className="rv-share">
            <p>Travelled with us? We would love to hear how it went.</p>
            <WhatsAppPageLink className="cat-whatsapp"><WhatsAppIcon size={18} /> Share your review</WhatsAppPageLink>
          </div>
        </section>
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
