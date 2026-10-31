"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CatalogIndex } from "@/lib/catalog-index";
import { emptyWishlist, RETENTION_MS, STORAGE_KEY, type Wishlist } from "@/lib/wishlist";
import type { WhatsAppContext } from "@/lib/whatsapp";

type Ctx = {
  index: CatalogIndex;
  wishlist: Wishlist;
  ready: boolean;
  update: (next: Wishlist | ((w: Wishlist) => Wishlist)) => void;
  clear: () => void;
  count: number;
  whatsapp: WhatsAppContext;
  setWhatsapp: (c: WhatsAppContext) => void;
};

const WishlistContext = createContext<Ctx | null>(null);

function read(): Wishlist {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyWishlist();
    const parsed = JSON.parse(raw) as Wishlist;
    if (parsed.v !== 1 || Date.now() - parsed.updatedAt > RETENTION_MS) return emptyWishlist();
    return { ...emptyWishlist(), ...parsed };
  } catch {
    return emptyWishlist();
  }
}

export function WishlistProvider({ index, children }: { index: CatalogIndex; children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist>(emptyWishlist);
  const [ready, setReady] = useState(false);
  const [whatsapp, setWhatsapp] = useState<WhatsAppContext>({ kind: "home" });

  useEffect(() => {
    setWishlist(read());
    setReady(true);
    const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY) setWishlist(read()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((next: Wishlist | ((w: Wishlist) => Wishlist)) => {
    setWishlist((current) => {
      const value = typeof next === "function" ? next(current) : next;
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch { /* private mode: keep in memory */ }
      return value;
    });
  }, []);

  const clear = useCallback(() => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setWishlist(emptyWishlist());
  }, []);

  const value = useMemo<Ctx>(() => ({
    index, wishlist, ready, update, clear, whatsapp, setWhatsapp,
    count: wishlist.items.length + (wishlist.journey ? 1 : 0),
  }), [index, wishlist, ready, update, clear, whatsapp]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist outside WishlistProvider");
  return ctx;
}

/** Drop this on a page to give the WhatsApp button and mobile bar that page's own message. */
export function PageWhatsApp({ context }: { context: WhatsAppContext }) {
  const { setWhatsapp } = useWishlist();
  const key = JSON.stringify(context);
  useEffect(() => {
    setWhatsapp(JSON.parse(key));
    return () => setWhatsapp({ kind: "home" });
  }, [key, setWhatsapp]);
  return null;
}
