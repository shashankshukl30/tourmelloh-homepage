import { experiences, journeys, services, tierLabel } from "@/content/catalog";
import { media } from "@/content/catalog/media";
import { TIERS, type ItemId, type Tier } from "@/content/catalog/types";

/** The small slice of the catalogue the browser needs for My Journey. Built on the server, passed as props. */
export type IndexItem = {
  id: ItemId;
  kind: "service" | "experience";
  title: string;
  subtitle?: string;
  href: string;
  category: string;
  unit: string;
  price: "quote";
  thumb: string;
  replacementGroup?: string;
  overlapsWith: ItemId[];
  deliveredBy: ItemId[];
};
export type IndexLine = { item: ItemId; day?: number; session?: string; scope: string; state: "included" | "conditional"; mandatory: boolean; group?: string };
export type IndexJourney = {
  id: string;
  slug: string;
  title: string;
  route: string;
  nights: number;
  days: number;
  thumb: string;
  tiers: Record<Tier, IndexLine[]>;
};
export type CatalogIndex = { items: IndexItem[]; journeys: IndexJourney[] };

export function buildCatalogIndex(): CatalogIndex {
  const items: IndexItem[] = [
    ...services.map((s) => ({
      id: s.id, kind: "service" as const, title: s.title, href: `/services/${s.slug}`, category: s.category, unit: s.unit,
      price: "quote" as const, thumb: media[s.hero].src, replacementGroup: s.relations.replacementGroup,
      overlapsWith: s.relations.overlapsWith ?? [], deliveredBy: s.relations.deliveredBy ?? [],
    })),
    ...experiences.map((e) => ({
      id: e.id, kind: "experience" as const, title: e.title, subtitle: e.subtitle, href: `/experiences/${e.slug}`, category: e.category,
      unit: e.unit, price: "quote" as const, thumb: media[e.hero].src, replacementGroup: e.relations.replacementGroup,
      overlapsWith: e.relations.overlapsWith ?? [], deliveredBy: e.relations.deliveredBy ?? [],
    })),
  ];
  const index: CatalogIndex["journeys"] = journeys.map((j) => ({
    id: j.id, slug: j.slug, title: j.title, route: j.route, nights: j.nights, days: j.days, thumb: media[j.hero].src,
    tiers: Object.fromEntries(
      TIERS.map((t) => [t, j.tiers[t].lines.map((l) => ({ item: l.item, day: l.day, session: l.session, scope: l.scope, state: l.state, mandatory: l.mandatory, group: l.replacementGroup }))]),
    ) as Record<Tier, IndexLine[]>,
  }));
  return { items, journeys: index };
}

export { tierLabel };
