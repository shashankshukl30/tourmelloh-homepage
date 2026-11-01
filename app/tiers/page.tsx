import { CompanyPage, companyMeta } from "@/components/catalog/company-page";
import { SectionIntro } from "@/components/catalog/blocks";
import { TierCompare } from "@/components/journey/tier-compare";

export const metadata = companyMeta("tiers");

export default function Page() {
  return (
    <CompanyPage slug="tiers">
      <section className="tour-width cat-section" id="compare" aria-labelledby="compare-title">
        <SectionIntro id="compare-title" label="AT A GLANCE" display={["What changes", "from level to level."]} text="Swipe or tap through the three levels. Every upgrade is marked against the level below it, and the side-by-side view lines them up row by row." />
        <div style={{ marginTop: 36 }}><TierCompare /></div>
      </section>
    </CompanyPage>
  );
}
