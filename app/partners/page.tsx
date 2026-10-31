import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/catalog/blocks";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { pages } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

const copy = pages.find((p) => p.slug === "partners")!;
export const metadata = pageMeta({ ...copy.seo, path: "/partners" });

export default function Page() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <div className="tour-width"><Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: copy.title, path: "/partners" }]} /></div>
        <section className="tour-width plan-layout" aria-labelledby="partner-title">
          <div className="plan-intro">
            <span className="tour-kicker" style={{ color: "var(--clay)" }}>TRAVEL PARTNERS</span>
            <h1 id="partner-title">{copy.display[0]} <em>{copy.display[1]}</em></h1>
            <p className="tour-lead">{copy.lead}</p>
            <div className="cat-prose cat-prose-plain" style={{ marginTop: 28 }}>
              {copy.sections.map((s) => (
                <div key={s.heading}><h2 className="cat-legal-heading">{s.heading}</h2>{s.paragraphs.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
              ))}
            </div>
          </div>
          <div className="plan-panel"><EnquiryForm type="partner" context="Travel partner enquiry" /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
