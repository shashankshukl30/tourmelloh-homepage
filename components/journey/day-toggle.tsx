"use client";

import { useEffect, useState } from "react";

/** Opens every day on desktop; on phones Day 1 starts open and this button opens or closes the rest. */
export function DayToggle({ scope }: { scope: string }) {
  const [allOpen, setAllOpen] = useState(false);
  const days = () => Array.from(document.querySelectorAll<HTMLDetailsElement>(`${scope} details.dd`));
  useEffect(() => {
    if (window.matchMedia("(min-width: 1001px)").matches) { days().forEach((d) => (d.open = true)); setAllOpen(true); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <button type="button" className="dd-toggle" aria-expanded={allOpen}
      onClick={() => { const next = !allOpen; days().forEach((d) => (d.open = next)); setAllOpen(next); }}>
      {allOpen ? "Close all days" : "Open all days"}
    </button>
  );
}
