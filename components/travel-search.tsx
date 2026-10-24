"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { searchTravel, type SearchEntry } from "@/lib/search-index";

export function TravelSearch({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [kind, setKind] = useState<"All" | SearchEntry["kind"]>("All");
  const results = searchTravel(query, kind);
  function updateQuery(value: string) {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }
  return (
    <main id="main" className="search-page page-width">
      <span className="eyebrow">A PLACE. A FEELING. A FIRST IDEA.</span>
      <h1>What draws <em>you here?</em></h1>
      <p className="search-intro">Look for a city, a landmark or a kind of journey. Try Kashi, the Taj Mahal, Buddhist trails or a family pilgrimage.</p>
      <form className="search-box" role="search" onSubmit={(event) => event.preventDefault()}>
        <Search size={24} aria-hidden="true" />
        <label className="sr-only" htmlFor="travel-search">Search tours and destinations</label>
        <input id="travel-search" name="q" type="search" autoComplete="off" maxLength={120}
          placeholder="Where would you like to go?" value={query} onChange={(event) => updateQuery(event.target.value)} />
        {query && <button type="button" aria-label="Clear search" onClick={() => updateQuery("")}><X size={22} /></button>}
      </form>
      <div className="search-tools">
        <div className="category-tabs" role="group" aria-label="Search result type">
          {(["All", "Journey", "Destination"] as const).map((value) => <button key={value} type="button" className={kind === value ? "active" : ""} aria-pressed={kind === value} onClick={() => setKind(value)}>{value === "All" ? "Everything" : value === "Journey" ? "Journeys" : "Destinations"}</button>)}
        </div>
        <p role="status" aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}{query.trim() ? ` for “${query.trim()}”` : " to explore"}</p>
      </div>
      <div className="search-results">
        {results.map((entry) => <Link className="search-result" href={entry.href} key={`${entry.kind}-${entry.id}`}>
          <span className="search-kind">{entry.kind}</span>
          <div><h2>{entry.title}</h2><p className="search-detail">{entry.detail}</p><p>{entry.description}</p></div>
          <span className="search-result-arrow"><ArrowUpRight size={24} /></span>
        </Link>)}
        {!results.length && <div className="search-empty"><h2>Let’s widen the map.</h2><p>We couldn’t find that combination. Try a city name or explore all journeys. You can also tell us about a route you have in mind.</p><div><button className="button button-clay" style={{ color: "var(--paper)" }} onClick={() => { updateQuery(""); setKind("All"); }}>Clear the search <ArrowUpRight size={18} /></button><Link className="text-link" href="/#plan">Plan something personal <ArrowUpRight size={18} /></Link></div></div>}
      </div>
    </main>
  );
}
