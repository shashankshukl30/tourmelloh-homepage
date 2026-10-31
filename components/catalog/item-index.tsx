import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { IndexOpening } from "@/components/catalog/index-opening";
import { ExperienceCard, ServiceCard } from "@/components/catalog/cards";
import { EnquiryBand, SectionIntro } from "@/components/catalog/blocks";
import { anchor } from "@/content/catalog/nav";
import type { Experience, Service } from "@/content/catalog/types";
import type { Crumb } from "@/components/catalog/blocks";

/** A section index (Services or Experiences) grouped by category, each group linkable by anchor. */
export function ItemIndex({
  trail, label, display, text, groups, filters, current, feature,
}: {
  trail: Crumb[];
  label: string;
  display: [string, string];
  text: string;
  groups: { name: string; intro?: string; items: (Service | Experience)[] }[];
  filters?: { name: string; href: string }[];
  current?: string;
  feature?: { href: string; title: string; text: string };
}) {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <IndexOpening trail={trail} label={label} display={display} text={text} filters={filters} current={current} />
        {feature && (
          <div className="tour-width">
            <Link href={feature.href} className="item-feature">
              <span className="tour-kicker">FEATURED</span>
              <strong>{feature.title}</strong>
              <span>{feature.text}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
        )}
        {groups.filter((g) => g.items.length).map((group) => (
          <section key={group.name} id={anchor(group.name)} className="cat-section tour-width item-group" aria-labelledby={`h-${anchor(group.name)}`}>
            <div className="cat-head">
              <SectionIntro id={`h-${anchor(group.name)}`} label={`${group.items.length} ${group.items.length === 1 ? "OPTION" : "OPTIONS"}`} display={[group.name, ""]} />
              {group.intro && <p>{group.intro}</p>}
            </div>
            <div className="cat-grid">
              {group.items.map((item) => item.id.startsWith("S")
                ? <ServiceCard key={item.id} service={item as Service} />
                : <ExperienceCard key={item.id} experience={item as Experience} />)}
            </div>
          </section>
        ))}
        <EnquiryBand title={["Build it into", "your journey."]} text="Add what you like to My Journey. We check timing, overlaps and availability, then quote everything together." planHref="/your-journey" />
      </main>
      <Footer />
    </>
  );
}
