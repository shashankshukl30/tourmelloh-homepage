/** The enquiry a visitor sends from /plan. Shared by the form and the API route. */
export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
  when: string;
  length: string;
  adults: string;
  children: string;
  stay: string;
  message: string;
};

export const emptyEnquiry: Enquiry = {
  name: "", email: "", phone: "", country: "", interest: "", when: "Flexible",
  length: "", adults: "2", children: "0", stay: "Palace & heritage hotels", message: "",
};

export const stayStyles = ["Palace & heritage hotels", "Contemporary luxury", "Boutique & intimate", "A mix, as you suggest"];
export const lengths = ["Up to 5 nights", "6 to 9 nights", "10 to 14 nights", "Longer than two weeks", "Not sure yet"];

export function travelMonths(from = new Date()) {
  const months = ["Flexible"];
  for (let i = 0; i < 18; i++) {
    const d = new Date(from.getFullYear(), from.getMonth() + i, 1);
    months.push(d.toLocaleString("en-GB", { month: "long", year: "numeric" }));
  }
  return months;
}

const clip = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/** Returns a clean enquiry, or the first problem in plain words. */
export function readEnquiry(body: Record<string, unknown>): { enquiry?: Enquiry; error?: string } {
  const enquiry: Enquiry = {
    name: clip(body.name, 120), email: clip(body.email, 160), phone: clip(body.phone, 40),
    country: clip(body.country, 80), interest: clip(body.interest, 200), when: clip(body.when, 40),
    length: clip(body.length, 40), adults: clip(body.adults, 3), children: clip(body.children, 3),
    stay: clip(body.stay, 60), message: clip(body.message, 3000),
  };
  if (enquiry.name.length < 2) return { error: "Please tell us your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email)) return { error: "Please check your email address." };
  if (enquiry.phone.replace(/\D/g, "").length < 7) return { error: "Please add a phone or WhatsApp number with its country code." };
  return { enquiry };
}

export function enquiryText(e: Enquiry) {
  return [
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    `Phone / WhatsApp: ${e.phone}`,
    e.country && `Travelling from: ${e.country}`,
    e.interest && `Interested in: ${e.interest}`,
    `When: ${e.when}`,
    e.length && `Length: ${e.length}`,
    `Travellers: ${e.adults} adult(s), ${e.children} child(ren)`,
    `Stays: ${e.stay}`,
    e.message && `\n${e.message}`,
  ].filter(Boolean).join("\n");
}
