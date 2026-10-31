import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { GuideCard } from "@/components/catalog/cards";
import { EnquiryBand } from "@/components/catalog/blocks";
import { guides } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Destination Guides: Varanasi, Prayagraj, Ayodhya | Tourmelloh",
  description: "Practical guides to Varanasi, Sarnath, Prayagraj, Ayodhya, Gaya and Bodh Gaya: gateways, pacing, steps and walking, seasons and local etiquette.",
  path: "/guides",
  image: "varanasi-aerial-ghats",
});

export default function Page() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening
          trail={[{ name: "Home", path: "/" }, { name: "Destination guides", path: "/guides" }]}
          label="DESTINATION GUIDES"
          display={["Know the place", "before you go."]}
          text="Gateways, suggested pacing, steps and walking, the seasons and the etiquette that matters, for the places our journeys reach."
        />
        <section className="cat-section tour-width" aria-label="Guides" style={{ paddingTop: 0 }}>
          <div className="cat-grid">{guides.map((g) => <GuideCard key={g.slug} guide={g} />)}</div>
        </section>
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
