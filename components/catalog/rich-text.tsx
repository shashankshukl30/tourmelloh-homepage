import Link from "next/link";
import type { ReactNode } from "react";

/** Inline `**bold**` and `[label](href)` for article copy. Internal links use the router; external open in a new tab. */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (m[1]) out.push(<strong key={at}>{m[1]}</strong>);
    else if (m[3].startsWith("/")) out.push(<Link key={at} href={m[3]}>{m[2]}</Link>);
    else out.push(<a key={at} href={m[3]} target="_blank" rel="noopener noreferrer">{m[2]}</a>);
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain text for search and JSON-LD: markers removed. */
export const plain = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
