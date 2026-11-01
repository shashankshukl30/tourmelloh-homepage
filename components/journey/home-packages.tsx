"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PackageCard, type PackageCardData } from "@/components/journey/package-card";

export type PackageGroup = { key: string; label: string; href: string; items: PackageCardData[] };

/**
 * The homepage's first section after the finder (client call, 2026-10-31): every package, grouped the way
 * guests think about them. A grid on desktop, a swipeable row on phones; the tab keeps the page short.
 */
export function HomePackages({ groups }: { groups: PackageGroup[] }) {
  const [active, setActive] = useState(groups[0]?.key);
  const group = groups.find((g) => g.key === active) ?? groups[0];
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  if (!group) return null;
  return (
    <div className="hp">
      <div className="hp-tabs" role="tablist" aria-label="Kinds of package">
        {groups.map((g) => (
          <button key={g.key} type="button" role="tab" id={`hp-tab-${g.key}`} aria-selected={g.key === group.key} aria-controls="hp-panel" onClick={() => setActive(g.key)}>
            {g.label} <span>{g.items.length}</span>
          </button>
        ))}
      </div>
      <div className="hp-rail" id="hp-panel" role="tabpanel" aria-labelledby={`hp-tab-${group.key}`}>
        {group.items.map((p, i) => <PackageCard key={p.id} pkg={p} priority={i === 0} />)}
      </div>
      <div className="hp-foot">
        <span className="hp-swipe" aria-hidden="true">Swipe to see all {group.items.length}</span>
        <Link className="tour-text-link" href={group.href}>See all: {group.label} <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link className="tour-text-link" href="/journeys">All {total} packages <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
