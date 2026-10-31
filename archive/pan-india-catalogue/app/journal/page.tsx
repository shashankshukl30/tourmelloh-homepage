import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { ArticleCard } from "@/components/catalog/cards";
import { EnquiryBand } from "@/components/catalog/blocks";
import { articles } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "The Tourmelloh Journal: India Travel Notes & Guides",
  description:
    "Field notes and planning guides from a Varanasi travel house: when to go, how to see the Golden Triangle well, Char Dham by helicopter, Andaman islands and more.",
  path: "/journal",
  image: "varanasi-boats-evening",
});

export default function JournalPage() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }]}
          label="THE JOURNAL"
          display={["Notes from", "the road."]}
          text="What we have learned from planning journeys across India: the right season, the right order, the details that change a day."
        />
        <section className="cat-section tour-width" aria-label="Articles" style={{ paddingTop: 0 }}>
          <div className="cat-grid">
            {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
        </section>
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
