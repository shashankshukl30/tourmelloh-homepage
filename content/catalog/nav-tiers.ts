import type { Tier } from "./types";

/** Tier display names, kept tiny so client components can import them. */
export const tierLabel: Record<Tier, string> = { standard: "Standard", premium: "Premium", luxury: "Luxury" };
