import Link from "next/link";
import type { Display } from "@/content/catalog/types";
import { Breadcrumbs, type Crumb } from "@/components/catalog/blocks";
import { Reveal } from "@/components/reveal";

/** Opening for index pages: a large title, a short note and optional filter links. */
export function IndexOpening({
  trail,
  label,
  display,
  text,
  filters,
  current,
}: {
  trail: Crumb[];
  label: string;
  display: Display;
  text: string;
  filters?: { name: string; href: string }[];
  current?: string;
}) {
  return (
    <div className="tour-width cat-index-opening">
      <Breadcrumbs trail={trail} />
      <Reveal className="collection-heading">
        <div>
          <span className="tour-kicker" style={{ color: "var(--clay)" }}>{label}</span>
          <h1>
            {display[0]} <em>{display[1]}</em>
          </h1>
        </div>
        <div className="collection-opening-note">
          <p>{text}</p>
        </div>
      </Reveal>
      {filters && (
        <nav className="cat-filters" aria-label="Filter">
          {filters.map((filter) => (
            <Link key={filter.href} href={filter.href} aria-current={filter.href === current ? "page" : undefined}>
              {filter.name}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
