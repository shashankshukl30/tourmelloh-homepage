const message = "Hello Tourmelloh, I'd like to plan a journey. Could you help me explore the options?";
export const whatsappHref = `https://wa.me/917706997271?text=${encodeURIComponent(message)}`;

// Reuses the agency's direct-chat icon pattern from Hotel Augusto.
// Opening this link prepares a draft in WhatsApp; it never sends a message.
export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20.5l1.6-5a8.2 8.2 0 1 1 15.6-3.8Z" />
      <path d="m8.3 7.5 1.5 2.2-.8 1.1c.7 1.5 1.8 2.6 3.4 3.3l1.1-.8 2.2 1.4c-.3 1.3-1.1 1.8-2.1 1.6-3.9-.9-6.3-3.4-7-6.9-.2-.9.4-1.6 1.7-1.9Z" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppLink({ placement = "floating" }: { placement?: "header" | "floating" | "footer" }) {
  return (
    <a className={`${placement === "footer" ? "" : "button "}whatsapp-link whatsapp-${placement}`}
      href={whatsappHref} target="_blank" rel="noopener noreferrer"
      aria-label="Chat with Tourmelloh on WhatsApp (opens in a new tab)"
      style={{ color: placement === "footer" ? "var(--ink)" : "var(--paper)" }}>
      <WhatsAppIcon size={placement === "floating" ? 28 : 23} />
      {placement === "footer" && <span>Chat on WhatsApp</span>}
    </a>
  );
}
