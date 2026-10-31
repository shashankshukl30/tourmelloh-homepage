import { Plus } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, EnquiryBand } from "@/components/catalog/blocks";
import { faqGroups } from "@/content/catalog";
import { faqLd, pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Questions About Planning with Tourmelloh | FAQs",
  description: "What happens after you enquire, how Standard, Premium and Luxury differ, hosts and guides, parents, boats and weather, darshan, payments and cancellations.",
  path: "/faq",
  image: "varanasi-chai",
});

export default function Page() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <div className="tour-width cat-legal-opening">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Questions", path: "/faq" }]} />
          <h1>Questions, <em>answered plainly.</em></h1>
          <p className="tour-lead">The doubts guests actually have before they book: how planning works, what each tier includes, and what happens when plans change.</p>
        </div>
        <div className="tour-width cat-section">
          {faqGroups.map((group) => (
            <section key={group.heading} className="cat-faq" style={{ paddingBlock: 36 }} aria-label={group.heading}>
              <h2 className="cat-legal-heading">{group.heading}</h2>
              <div className="faq-list">
                {group.faqs.map((f) => (
                  <details key={f.q}><summary>{f.q}<Plus size={19} aria-hidden="true" /></summary><p>{f.a}</p></details>
                ))}
              </div>
            </section>
          ))}
          <JsonLd data={faqLd(faqGroups.flatMap((g) => g.faqs))} />
        </div>
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
