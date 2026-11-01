import { brand } from "@/lib/brand";

/**
 * Page-specific WhatsApp messages (brief v5, section 12). Only known values are interpolated;
 * nothing personal ever goes into the URL. The guest edits and sends the message themselves.
 */
export type WhatsAppContext =
  | { kind: "home" }
  | { kind: "journey"; id?: string; title: string; route?: string; tier?: string; url?: string }
  | { kind: "departure"; title: string; dates?: string; url?: string }
  | { kind: "wellness"; url?: string }
  | { kind: "service"; title: string; place?: string; url?: string }
  | { kind: "experience"; title: string; place?: string; url?: string }
  | { kind: "wedding"; url?: string }
  | { kind: "guide"; place: string; url?: string }
  | { kind: "collection"; title: string; url?: string }
  | { kind: "enquiry"; reference: string; summary?: string }
  | { kind: "general"; page?: string; url?: string };

const join = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" ");

export function whatsappText(context: WhatsAppContext): string {
  switch (context.kind) {
    case "journey":
      return join(`Hello Tourmelloh, I am interested in the itinerary ${context.id ? `${context.id} ` : ""}"${context.title}"${context.route ? ` (${context.route})` : ""}${context.tier ? `, ${context.tier} tier` : ""}.`, "Could you help me with suitable dates, duration and inclusions?", context.url);
    case "departure":
      return join(`I am interested in ${context.title}${context.dates ? `, ${context.dates}` : ""}.`, "Is the departure confirmed, and what are the room-sharing options?", context.url);
    case "wellness":
      return join("I am interested in Stillness by the Ganges. Could you explain retreat/ashram stays and available Ayurveda and yoga sessions?", context.url);
    case "service":
      return join(`I would like ${context.title}${context.place ? ` in ${context.place}` : ""}.`, "What options and availability can you arrange?", context.url);
    case "experience":
      return join(`I am interested in ${context.title}${context.place ? ` in ${context.place}` : ""}.`, "What timings, duration and walking requirements should I plan for?", context.url);
    case "wedding":
      return join("I am planning a wedding in Varanasi. Could you help with venues, guest stays and arrangements?", context.url);
    case "guide":
      return join(`I am exploring ${context.place}. Which journeys and duration would you recommend?`, context.url);
    case "collection":
      return join(`I am interested in ${context.title}. Could you tell me more about how it works?`, context.url);
    case "enquiry":
      return join(`Hello Tourmelloh, I have sent an enquiry, reference ${context.reference}.`, context.summary);
    case "general":
      return join("I would like help planning a journey with Tourmelloh.", context.url);
    default:
      return "I would like help planning a journey with Tourmelloh.";
  }
}

export const whatsappUrl = (context: WhatsAppContext) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(whatsappText(context))}`;
