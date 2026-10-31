import { ItemIndex } from "@/components/catalog/item-index";
import { services } from "@/content/catalog";
import type { ServiceCategory } from "@/content/catalog/types";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Travel Services in Varanasi: Cars, Boats, Hosts & Rituals | Tourmelloh",
  description: "Arrival welcome, private cars, boat upgrades, darshan assistance, travel hosts, senior companions, rituals, photography and more, arranged and quoted with your journey.",
  path: "/services",
  image: "boat-motor",
});

const ORDER: [ServiceCategory, string][] = [
  ["Arrival & transport", "Meeting you at the airport or station, private cars with chauffeurs, luggage and porters."],
  ["River & boats", "The boat in your journey, and how to upgrade it for the same session."],
  ["Temple, ritual & puja", "Aarti viewing, darshan assistance, priests and rituals, arranged within each temple's rules."],
  ["Hosts, guides & companions", "A planning concierge, a host who travels with you, specialist guides and interpreters."],
  ["Family, senior & accessible travel", "Childcare, family comforts, senior companions and mobility assistance. Non-medical unless a qualified provider is separately arranged."],
  ["Photography & films", "Photography, videography and a cinematic reel of your journey, each with its own scope."],
  ["Occasions, dining & gifts", "Birthdays, anniversaries, dining reservations and welcome gifts."],
  ["Stays, tickets & insurance", "Extra nights, room upgrades and help with flights and trains."],
  ["Specialist services", "Security, an astrologer consultation and helicopter transfers, all on request and subject to confirmation."],
];

export default function Page() {
  return (
    <ItemIndex
      trail={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
      label={`${services.length} SERVICES`}
      display={["Practical support,", "arranged around you."]}
      text="The arrangements that make a journey run well, from the moment you land. Add any of them to My Journey; each is quoted with your journey, never charged twice, and confirmed before you pay."
      feature={{ href: "/services/upgrade-your-boat-ride-boat-booking", title: "Upgrade your boat ride", text: "Swap the boat in your journey for a private or better boat in the same session." }}
      groups={ORDER.map(([name, intro]) => ({ name, intro, items: services.filter((s) => s.category === name) }))}
    />
  );
}
