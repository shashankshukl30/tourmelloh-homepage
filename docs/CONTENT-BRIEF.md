# Tourmelloh content brief (v5 catalogue)

Read `Tourmelloh_Developer_Brief.docx` text below in summary, `content/catalog/types.ts` (the exact data shapes) and `content/catalog/media-plan.ts` (the only photo keys you may use).

## Who Tourmelloh is

**Tourmelloh: Travel and Destination Partners**, based in Varanasi, Uttar Pradesh. Founder: Aparajita Upadhyaya. The founders come from Varanasi's hospitality industry. Tourmelloh arranges stays, transport, local experiences, rituals and personal assistance for journeys in Varanasi and the surrounding pilgrimage region (Sarnath, Prayagraj, Ayodhya, Chitrakoot, Gaya, Bodh Gaya, Rajgir, Nalanda, Kushinagar, Shravasti, Sankisa, Naimisharanya, Vindhyachal, Chunar). It also plans weddings in Varanasi.

Contact: +91 63910 85555 (phone and WhatsApp). enquiries@tourmelloh.com. tourmelloh.com.

Everything is **enquiry-led**: the guest chooses a journey, a tier (Standard, Premium, Luxury) and extras, and receives a complete written quotation before any payment. There are **no prices** anywhere; price lines say "Quoted for your journey".

## Voice

Warm, clear, practical, quietly premium. British/Indian English. Concrete details (the ghat, the hour, the steps) over adjectives. Short paragraphs.

**Banned:** em dashes, "nestled", "tapestry", "embark", "unforgettable", "hidden gem", "breathtaking", "delve", "testament", "bucket list", "magical", "once-in-a-lifetime", "seamless", "elevate", "immerse yourself", "symphony", exclamation marks, rupee amounts, "starting at", "guaranteed".

## Truth rules (from the client's brief, non-negotiable)

- **Never promise:** guaranteed darshan, VIP or unrestricted access, guaranteed river operation, guaranteed flights/trains, fully accessible routes, all-inclusive care, medical or nursing care, cure or detox outcomes, 5-star hotels everywhere, a Mercedes everywhere, "private guides on every journey", "no group departures", "palace stays".
- **A driver is not a guide.** Standard tier has a named remote coordinator and no sightseeing guide unless listed.
- Gaya and Bodh Gaya are different places. A Hindu rites journey does not include a Buddhist programme unless expressly added, and vice versa. Lumbini (Nepal) is only ever a separate extension enquiry.
- Boat outings depend on river level and local orders; darshan depends on the temple's own rules and crowds.
- No years in business, traveller counts, awards, reviews, ratings or superlatives ("best", "No. 1", "popular").
- No copying other operators' text. Original prose only.
- Durations are proposed planning versions; say so where it matters ("a suggested four-day version").

## Tier definitions (use these words)

| | Standard | Premium | Luxury |
|---|---|---|---|
| Hotels | Selected 3-star hotels | Selected 4-star hotels | Selected 4/5-star, heritage or boutique properties; actual category and room disclosed in the quote |
| Vehicle | Private air-conditioned sedan or suitable equivalent | Upgraded MPV/SUV, such as Innova Crysta or equivalent | Specifically confirmed premium vehicle (Fortuner, Mercedes or suitable alternative) chosen for the party and route |
| Meals | Breakfast on hotel nights | Breakfast | Breakfast; other meals expressly listed |
| Boat | The specified included ride where the route has one; shared or private stated | Specified private upgrade on applicable routes | Highest suitable option mapped to the journey |
| Darshan | Planned visits and clearly stated arrangements | Specified accompanied assistance | Dedicated coordination and accompaniment within stated scope |
| Assistance | Named remote coordinator; sightseeing guide excluded unless listed | Defined hosted assistance and selected guided visits | Dedicated travel concierge, personal host/escort scope and agreed support hours |
| Experiences | Base inclusions; extras available | Base plus specified Premium inclusions | All journey-mapped Luxury experiences selected automatically |
| Photography | Optional | Optional | Defined professional session on applicable journeys |
| Security | On request | On request | Included when requested, applicable and accepted in the quotation |

Each tier's `lines` reference real IDs (S01–S34, E01–E34) with day/session, scope and replacement groups. Boats in one session share a replacementGroup like `boat-day2-dawn`. E28 is delivered by S20, E29 by S21: list only one line per ritual.

## Catalogue IDs (exact approved titles)

See the tables in the client brief (copied into each agent's prompt). Journey slugs: kebab-case of the title, short. Service and experience slugs: kebab-case of the name without the subtitle.

## Definition of done

`npx tsc --noEmit` passes, `npm run validate` reports no problems in your file, no banned words, no prices, every referenced ID exists, no photo repeats inside one record.
