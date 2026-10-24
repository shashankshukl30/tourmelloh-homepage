"use client";

import { useEffect, useState } from "react";
import { journeys } from "@/content/travel";

const storageKey = "tourmelloh-journey-shortlist";

export function useShortlist() {
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const value: unknown = JSON.parse(
        localStorage.getItem(storageKey) || "[]",
      );
      if (Array.isArray(value)) {
        setSaved(
          value.filter(
            (id) =>
              typeof id === "string" &&
              journeys.some((journey) => journey.id === id),
          ),
        );
      }
    } catch {
      // A shortlist is optional when browser storage is unavailable.
    }
  }, []);
  function toggleSave(id: string) {
    const next = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotice(
        next.includes(id)
          ? "Journey saved on this device."
          : "Journey removed from your shortlist.",
      );
    } catch {
      setNotice(
        "Your shortlist is available for this visit. Device storage is unavailable.",
      );
    }
  }
  return { saved, notice, toggleSave };
}
