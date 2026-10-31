import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/catalog/blocks";
import { YourJourney } from "@/components/wishlist/your-journey";

export const metadata = {
  title: { absolute: "My Journey | Tourmelloh" },
  description: "Review your chosen journey, tier, services and experiences, then request a personalised quotation from Tourmelloh.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <div className="tour-width">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "My Journey", path: "/your-journey" }]} />
          <div className="yj-head">
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>MY JOURNEY</span>
            <h1>Review, then <em>ask for your quote.</em></h1>
            <p className="tour-lead">Everything here is a request. We confirm scope, timing and availability, then send a complete quotation before any payment.</p>
          </div>
          <YourJourney />
        </div>
      </main>
      <Footer />
    </>
  );
}
