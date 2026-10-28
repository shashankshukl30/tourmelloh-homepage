import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/catalog/blocks";
import { media } from "@/content/catalog/media";

export const metadata = {
  title: { absolute: "Photo credits | Tourmelloh" },
  description: "Credits for photographs used on tourmelloh.com under licences that ask for attribution.",
  robots: { index: false, follow: true },
};

/** Required by CC BY-SA and GODL-India licences. Linked from the terms page only. */
export default function PhotoCreditsPage() {
  const credited = Object.values(media).filter((photo) => photo.credit);
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <div className="tour-width cat-legal-opening">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Photo credits", path: "/photo-credits" }]} />
          <h1>Photo <em>credits</em></h1>
          <p className="tour-lead">Most photographs on this site are used under licences that need no credit. These need one, and we are glad to give it.</p>
        </div>
        <section className="tour-width cat-section">
          <ul className="cat-list">
            {credited.map((photo) => (
              <li key={photo.src}>
                {photo.alt}. Photo by {photo.by}, <a href={photo.page} target="_blank" rel="noopener noreferrer">source</a>,{" "}
                licensed under <a href={photo.license} target="_blank" rel="noopener noreferrer">{photo.licenseName}</a>. Resized and converted for the web.
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
