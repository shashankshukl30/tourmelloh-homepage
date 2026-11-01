"use client";

import { useState } from "react";
import type { Tier } from "@/content/catalog/types";
import { TierLadder } from "@/components/journey/tier-ladder";

/** The client's tier framework (doc, 2026-10-31) and brief v5 section 5, in short phone-length lines. */
const GENERAL: Record<Tier, string[]> = {
  standard: [
    "Selected 3-star boutique or deluxe hotels",
    "AC sedan, or a Tempo Traveller for groups",
    "Regular boat ride where the route has one",
    "Planned darshan with queue support",
    "Named coordinator, local guide where listed",
  ],
  premium: [
    "4-star heritage or premium hotels",
    "AC SUV: Ertiga or Innova Crysta",
    "Private motor boat where the route has one",
    "Private handloom walk with a weaver",
    "Escorted fast-track darshan where allowed",
    "Scholar guide and hosted help",
  ],
  luxury: [
    "5-star: Taj Ganges or BrijRama Palace",
    "Luxury SUV: Crysta, Fortuner or Mercedes",
    "Private bajra with live shehnai or sitar",
    "Luxury experiences: music, dining, a photo shoot",
    "Puja officiant, VIP protocol where allowed",
    "Dedicated concierge, 24/7 butler-style host",
  ],
};

/** Standard, Premium and Luxury in general: the same ladder as each package, opened side by side. */
export function TierCompare() {
  const [tier, setTier] = useState<Tier>("premium");
  return (
    <div className="tier-compare-page">
      <TierLadder highlights={GENERAL} tier={tier} onTier={setTier} openCompare />
      <p className="tier-compare-note">
        Hotels and vehicles are named in your quotation and depend on availability. VIP and fast-track darshan are arranged only
        where the temple&apos;s official arrangements allow. Each package page shows exactly what its three levels include.
      </p>
    </div>
  );
}
