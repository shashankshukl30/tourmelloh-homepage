/** Who Tourmelloh is and how to reach them. Client-safe: no catalogue imports. */
export const brand = {
  name: "Tourmelloh",
  descriptor: "Travel and Destination Partners",
  line: "Your travel and destination partners in Varanasi and beyond",
  phone: "+91 63910 85555",
  phoneHref: "tel:+916391085555",
  phoneE164: "+916391085555",
  whatsapp: "916391085555",
  email: "tourmelloh@gmail.com",
  city: "Varanasi",
  region: "Uttar Pradesh",
  founder: "Aparajita Upadhyaya",
  founders: ["Aparajita", "Gaurav"],
};

/** The team, as the client gave it (WhatsApp, 2026-10-31). Portraits replace the initials once real photos arrive. */
export const team: { name: string; role: string; photo?: string }[] = [
  { name: "Aparajita", role: "Founder" },
  { name: "Gaurav", role: "Founder" },
  { name: "Vishal", role: "Head of Sales & Marketing" },
  { name: "Faizan", role: "Head of Operations" },
];
