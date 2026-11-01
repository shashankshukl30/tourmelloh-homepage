"use client";

import { Check, Plus, RefreshCw } from "lucide-react";
import type { ItemId } from "@/content/catalog/types";
import { addItem, itemState, removeItem } from "@/lib/wishlist";
import { useWishlist } from "@/components/wishlist/provider";

/** "Add to My Journey" with the item's live state: Included, Selected, Upgrade requested or Needs review. */
export function AddToJourney({ id, compact = false, short = false }: { id: ItemId; compact?: boolean; short?: boolean }) {
  const { index, wishlist, update, ready } = useWishlist();
  const state = ready ? itemState(index, wishlist, id) : "Add to My Journey";
  const item = index.items.find((i) => i.id === id);
  const replaces = item?.replacementGroup === "boat";

  if (state === "Included") {
    return <span className="wl-state wl-included"><Check size={15} aria-hidden="true" /> {short ? "Included" : "Included in your journey"}</span>;
  }
  const chosen = state === "Selected" || state === "Upgrade requested" || state === "Needs review";
  return (
    <div className={`wl-action ${compact ? "wl-compact" : ""}`}>
      <button
        type="button"
        className={`wl-button ${chosen ? "is-chosen" : ""}`}
        aria-pressed={chosen}
        aria-label={short ? `${chosen ? "Remove" : "Add"} ${item?.title ?? "this"} ${chosen ? "from" : "to"} My Journey` : undefined}
        onClick={() => update((w) => (chosen ? removeItem(w, id) : addItem(index, w, id)))}
      >
        {chosen ? <Check size={16} aria-hidden="true" /> : replaces ? <RefreshCw size={15} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        {short ? (chosen ? "Added" : "Add") : chosen ? "In My Journey" : replaces && wishlist.journey ? "Upgrade your boat ride" : "Add to My Journey"}
      </button>
      {chosen && state !== "Selected" && <span className="wl-note">{state}</span>}
    </div>
  );
}
