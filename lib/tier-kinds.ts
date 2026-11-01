/** Sort a tier's short lines into comparable kinds so Standard, Premium and Luxury line up row for row.
 * Shared by the comfort ladder and the catalogue validator. */
export type Kind = "stay" | "car" | "boat" | "experience" | "tickets" | "ritual" | "people" | "other";

export const KIND_ORDER: Kind[] = ["stay", "car", "boat", "experience", "tickets", "ritual", "people", "other"];
export const KIND_LABEL: Record<Kind, string> = {
  stay: "Stay", car: "Car", boat: "Boat", experience: "Experiences", tickets: "Tickets & entry",
  ritual: "Darshan & rituals", people: "Guide & help", other: "Also",
};

const TESTS: [Kind, RegExp][] = [
  ["stay", /hotel|star|stay|propert|resort|lodge|guest ?house|ashram|monaster|accommodation|palace/i],
  ["car", /sedan|suv|innova|\bcar\b|vehicle|tempo|fortuner|mercedes|crysta|chauffeur|transfers?\b/i],
  ["boat", /boat|bajra|cruise/i],
  ["experience", /food|trail|tasting|\bwalk|music|sitar|yoga|\bspa\b|cultural|sightseeing|high tea|dining|\bmeals?\b/i],
  ["tickets", /ticket|entrance|ropeway|monument pass|\bentry\b/i],
  ["ritual", /darshan|vip|temple|puja|priest|pujari|ritual|rudrabhishek|pind|purohit|officiant|parikrama|meditation|aarti|priority|mandir|snan/i],
  ["people", /guide|scholar|historian|host|concierge|butler|escort|monk|coordinator|assist|manager/i],
];

export const kindOf = (line: string): Kind => TESTS.find(([, re]) => re.test(line))?.[0] ?? "other";

/** One merged line per kind. */
export function byKind(lines: string[]) {
  const map = new Map<Kind, string>();
  for (const line of lines) {
    const k = kindOf(line);
    map.set(k, map.has(k) ? `${map.get(k)}; ${line}` : line);
  }
  return map;
}
