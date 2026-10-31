import type { ItemId, Tier } from "@/content/catalog/types";
import type { CatalogIndex, IndexLine } from "@/lib/catalog-index";

/**
 * My Journey: one proposed journey per guest, kept in this browser only (brief v5, section 9).
 * No contact details are stored here; they are typed into the request form and sent once.
 */
export type WishItem = {
  id: ItemId;
  qty: number;
  /** "replace" swaps out the included item in the same session group (a better boat). */
  mode: "add" | "replace";
  group?: string;
  note?: string;
};

export type Wishlist = {
  v: 1;
  updatedAt: number;
  journey?: { id: string; slug: string; title: string; tier: Tier };
  collection?: string;
  departure?: string;
  dates: { mode: "exact" | "month" | "undecided"; from?: string; to?: string; month?: string; flexible: boolean };
  durationRequest: "as-proposed" | "recommend" | "custom";
  customDays?: string;
  party: { adults: number; childrenAges: string; rooms: string };
  arrival: string;
  departureCity: string;
  items: WishItem[];
  /** Optional inclusions the guest has declined (never mandatory ones). */
  declined: ItemId[];
  notes: string;
};

export const STORAGE_KEY = "tourmelloh-my-journey";
/** Drafts are kept for 60 days, then cleared. */
export const RETENTION_MS = 60 * 24 * 60 * 60 * 1000;

export const emptyWishlist = (): Wishlist => ({
  v: 1,
  updatedAt: Date.now(),
  dates: { mode: "undecided", flexible: true },
  durationRequest: "as-proposed",
  party: { adults: 2, childrenAges: "", rooms: "" },
  arrival: "",
  departureCity: "",
  items: [],
  declined: [],
  notes: "",
});

export type ItemState =
  | "Included" | "Selected" | "Upgrade requested" | "Add to My Journey"
  | "Available on request" | "Needs review" | "Unavailable";

const manifest = (index: CatalogIndex, w: Wishlist): IndexLine[] => {
  if (!w.journey) return [];
  return index.journeys.find((j) => j.id === w.journey!.id)?.tiers[w.journey.tier] ?? [];
};

/** What a card should say for this item, given the guest's current journey, tier and selections. */
export function itemState(index: CatalogIndex, w: Wishlist, id: ItemId): ItemState {
  const item = index.items.find((i) => i.id === id);
  if (!item) return "Unavailable";
  const lines = manifest(index, w);
  if (lines.some((l) => l.item === id) && !w.declined.includes(id)) return "Included";
  const chosen = w.items.find((i) => i.id === id);
  if (chosen) {
    if (reviewNotes(index, w).some((n) => n.ids.includes(id))) return "Needs review";
    return chosen.mode === "replace" ? "Upgrade requested" : "Selected";
  }
  return "Add to My Journey";
}

/** Adding an item: a boat (or vehicle) in the same group as an included one replaces it for that session. */
export function addItem(index: CatalogIndex, w: Wishlist, id: ItemId): Wishlist {
  if (w.items.some((i) => i.id === id)) return w;
  const item = index.items.find((i) => i.id === id);
  const lines = manifest(index, w);
  const replaced = item?.replacementGroup ? lines.find((l) => index.items.find((i) => i.id === l.item)?.replacementGroup === item.replacementGroup && l.item !== id) : undefined;
  const entry: WishItem = replaced
    ? { id, qty: 1, mode: "replace", group: replaced.group ?? item?.replacementGroup }
    : { id, qty: 1, mode: "add" };
  return touch({ ...w, items: [...w.items, entry] });
}

export const removeItem = (w: Wishlist, id: ItemId): Wishlist => touch({ ...w, items: w.items.filter((i) => i.id !== id) });

export const toggleDeclined = (w: Wishlist, id: ItemId): Wishlist =>
  touch({ ...w, declined: w.declined.includes(id) ? w.declined.filter((d) => d !== id) : [...w.declined, id] });

/**
 * Changing tier (brief section 10). Upgrading absorbs extras that become included.
 * Downgrading returns the items that would stop being included, so the guest can keep them as requests.
 */
export function changeTier(index: CatalogIndex, w: Wishlist, tier: Tier): { next: Wishlist; absorbed: ItemId[]; dropped: ItemId[] } {
  if (!w.journey) return { next: w, absorbed: [], dropped: [] };
  const journey = index.journeys.find((j) => j.id === w.journey!.id);
  if (!journey) return { next: w, absorbed: [], dropped: [] };
  const before = new Set(journey.tiers[w.journey.tier].map((l) => l.item));
  const after = new Set(journey.tiers[tier].map((l) => l.item));
  const absorbed = w.items.filter((i) => after.has(i.id)).map((i) => i.id);
  const dropped = [...before].filter((id) => !after.has(id) && !w.declined.includes(id));
  const next = touch({ ...w, journey: { ...w.journey, tier }, items: w.items.filter((i) => !after.has(i.id)) });
  return { next, absorbed, dropped };
}

/** Choosing a different parent journey keeps compatible requests; the UI asks before anything is dropped. */
export function setJourney(w: Wishlist, journey: Wishlist["journey"]): Wishlist {
  return touch({ ...w, journey, declined: [] });
}

/** Overlaps and duplicate deliveries that staff must look at (brief section 11). Never auto-resolved. */
export function reviewNotes(index: CatalogIndex, w: Wishlist): { ids: ItemId[]; text: string }[] {
  const notes: { ids: ItemId[]; text: string }[] = [];
  const lines = manifest(index, w);
  const included = new Set(lines.filter((l) => !w.declined.includes(l.item)).map((l) => l.item));
  const chosen = new Set(w.items.map((i) => i.id));
  const all = new Set([...included, ...chosen]);
  const title = (id: ItemId) => index.items.find((i) => i.id === id)?.title ?? id;
  for (const id of chosen) {
    const item = index.items.find((i) => i.id === id);
    if (!item) continue;
    for (const other of item.overlapsWith) {
      if (all.has(other) && other !== id) notes.push({ ids: [id, other], text: `${title(id)} and ${title(other)} may overlap in time or coverage. We will review the timing and scope with you.` });
    }
    for (const via of item.deliveredBy) {
      if (all.has(via)) notes.push({ ids: [id, via], text: `${title(via)} is how ${title(id)} is delivered. It is one arrangement and is never charged twice.` });
    }
  }
  if (w.durationRequest !== "as-proposed" || w.items.length > 4) {
    notes.push({ ids: [], text: "Extra items may need more time than the proposed duration. We will confirm what fits before quoting." });
  }
  const seen = new Set<string>();
  return notes.filter((n) => (seen.has(n.text) ? false : (seen.add(n.text), true)));
}

const touch = (w: Wishlist): Wishlist => ({ ...w, updatedAt: Date.now() });
