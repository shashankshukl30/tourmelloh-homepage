import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { ArticleCard } from "@/components/catalog/cards";
import { EnquiryBand } from "@/components/catalog/blocks";
import { articles } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "The Tourmelloh Journal: Planning Varanasi and Beyond",
  description: "Practical notes on a first Kashi visit, choosing a boat, travelling with parents, Gaya and Bodh Gaya, women's departures and Kashi weddings.",
  path: "/journal",
  image: "varanasi-boats-evening",
});

export default function Page() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }]}
          label="THE JOURNAL"
          display={["Notes that help", "you choose."]}
          text="How coordination works, what to expect, and how to plan each place well."
        />
        <section className="cat-section tour-width" aria-label="Articles" style={{ paddingTop: 0 }}>
          <div className="cat-grid">{articles.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </section>
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
