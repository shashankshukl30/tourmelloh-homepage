"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Search, X } from "lucide-react";
import { prepare, search, type SearchEntry, type SearchKind } from "@/lib/search";

const KINDS: { value: "All" | SearchKind; label: string }[] = [
  { value: "All", label: "Everything" },
  { value: "Journey", label: "Journeys" },
  { value: "Region", label: "Regions" },
  { value: "City", label: "Cities" },
  { value: "Experience", label: "Experiences" },
  { value: "Article", label: "Journal" },
];
const POPULAR = ["Varanasi", "Golden Triangle", "Andaman", "Char Dham", "Kerala backwaters", "Ladakh", "Tiger safari", "Udaipur", "Honeymoon", "Pilgrimage"];

export function TravelSearch({ entries }: { entries: SearchEntry[] }) {
  const router = useRouter();
  const prepared = useMemo(() => prepare(entries), [entries]);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"All" | SearchKind>("All");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q.slice(0, 120));
    input.current?.focus();
  }, []);

  const everything = useMemo(() => search(prepared, query), [prepared, query]);
  const results = kind === "All" ? everything.results : everything.results.filter((r) => r.kind === kind);
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    everything.results.forEach((r) => map.set(r.kind, (map.get(r.kind) ?? 0) + 1));
    return map;
  }, [everything]);

  function update(value: string) {
    setQuery(value);
    setActive(0);
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  function onKey(event: React.KeyboardEvent) {
    if (!results.length) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    if (event.key === "Enter") { event.preventDefault(); router.push(results[active].href); }
  }

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <main id="main" className="search-page page-width">
      <span className="eyebrow">SEARCH TOURMELLOH</span>
      <h1>What draws <em>you here?</em></h1>
      <p className="search-intro">A city, a temple, a season, a kind of journey. Try Kashi, the Taj at sunrise, Havelock, a tiger safari or a honeymoon.</p>
      <form className="search-box" role="search" onSubmit={(event) => { event.preventDefault(); if (results[active]) router.push(results[active].href); }}>
        <Search size={24} aria-hidden="true" />
        <label className="sr-only" htmlFor="travel-search">Search journeys, places and experiences</label>
        <input ref={input} id="travel-search" name="q" type="search" autoComplete="off" maxLength={120} enterKeyHint="search"
          role="combobox" aria-expanded={results.length > 0} aria-controls="search-results" aria-autocomplete="list"
          aria-activedescendant={results.length ? `result-${active}` : undefined}
          placeholder="Where would you like to go?" value={query} onChange={(event) => update(event.target.value)} onKeyDown={onKey} />
        {query && <button type="button" aria-label="Clear search" onClick={() => { update(""); input.current?.focus(); }}><X size={22} /></button>}
      </form>

      {!query.trim() ? (
        <div className="search-popular">
          <p>Popular right now</p>
          <div>{POPULAR.map((term) => <button key={term} type="button" onClick={() => update(term)}>{term}</button>)}</div>
        </div>
      ) : (
        <>
          <div className="search-tools">
            <div className="cat-filters" role="group" aria-label="Result type" style={{ marginBottom: 0 }}>
              {KINDS.map(({ value, label }) => {
                const count = value === "All" ? everything.results.length : counts.get(value) ?? 0;
                if (value !== "All" && !count) return null;
                return (
                  <button key={value} type="button" aria-pressed={kind === value} onClick={() => { setKind(value); setActive(0); }}>
                    {label} <span className="search-count">{count}</span>
                  </button>
                );
              })}
            </div>
            <p role="status" aria-live="polite">
              {results.length ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "No results"}
              {everything.partial && results.length ? " · closest matches" : ""}
            </p>
          </div>
          <div className="search-results" id="search-results" role="listbox" ref={list} aria-label="Search results">
            {results.slice(0, 60).map((entry, index) => (
              <Link className="search-result" href={entry.href} key={`${entry.kind}-${entry.id}`} id={`result-${index}`}
                role="option" aria-selected={index === active} data-index={index} data-active={index === active}
                onPointerEnter={() => setActive(index)}>
                <div className="search-thumb">
                  {entry.thumb && <Image src={entry.thumb.src} alt="" fill sizes="160px" placeholder="blur" blurDataURL={entry.thumb.blur} />}
                </div>
                <div>
                  <span className="search-kind">{entry.kind === "Region" ? "Region" : entry.kind}</span>
                  <h2>{entry.title}</h2>
                  <p className="search-detail">{entry.detail}</p>
                  <p>{entry.description}</p>
                </div>
                <span className="search-result-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
              </Link>
            ))}
            {!results.length && (
              <div className="search-empty">
                <h2>Let us widen the map.</h2>
                <p>Nothing matched “{query.trim()}”. Try a city or a region, or tell us what you have in mind and we will design it.</p>
                <div>
                  <button className="button button-clay" style={{ color: "var(--paper)" }} onClick={() => { update(""); setKind("All"); }}>Clear the search <ArrowUpRight size={18} /></button>
                  <Link className="text-link" href="/plan">Plan something personal <ArrowUpRight size={18} /></Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
