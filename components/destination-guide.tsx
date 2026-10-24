import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { DestinationGuide as Guide } from "@/content/destination-guides";
import { journeys } from "@/content/travel";
import { Reveal } from "@/components/reveal";

export function DestinationGuide({ guide }: { guide: Guide }) {
  const matchingName = guide.slug === "bodh-gaya" ? "Bodhgaya" : guide.name;
  const routes = journeys.filter((journey) => journey.places.some((place) => place === matchingName));
  return (
    <main id="main" className="guide-page">
      <div className="page-width">
        <nav className="place-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#destinations">Destinations</Link><span>/</span><span aria-current="page">{guide.name}</span></nav>
        <section className={`guide-hero ${guide.slug !== "ayodhya" ? "guide-hero-portrait" : ""}`} aria-labelledby="guide-title">
          <Image src={guide.hero} alt={guide.heroAlt} fill preload quality={90} sizes="(max-width: 700px) 120vw, 100vw" />
          <div className="guide-hero-shade" />
          <div><span>{guide.region}</span><h1 id="guide-title">{guide.name}</h1><p>{guide.lead}</p></div>
        </section>
        <p className="guide-caption">{guide.heroCaption}</p>
        <Reveal className="guide-intro"><span className="eyebrow">GET TO KNOW THE PLACE</span><p>{guide.intro}</p></Reveal>
        <div className="guide-body">
          <section className="guide-visits" aria-labelledby="guide-visits-title"><span className="eyebrow">WORTH YOUR TIME</span><h2 id="guide-visits-title">A little closer<br /><em>to {guide.name}.</em></h2>
            {guide.visits.map((visit,index) => <Reveal className="guide-visit" key={visit.title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{visit.title}</h3><p>{visit.text}</p></div></Reveal>)}
          </section>
          <aside className="guide-practical" aria-labelledby="guide-practical-title"><span className="eyebrow">BEFORE YOU GO</span><h2 id="guide-practical-title">The useful<br /><em>little details.</em></h2><div className="guide-season"><h3>When to consider it</h3><p>{guide.season}</p></div>
            <div className="guide-questions">{guide.practical.map((note,index) => <details key={note.title} open={index === 0}><summary>{note.title}<Plus size={18} /></summary><p>{note.text}</p></details>)}</div>
            <Link className="button button-clay" style={{ color: "var(--paper)" }} href={`/?destination=${encodeURIComponent(matchingName)}#plan`}>Plan for {guide.name}<ArrowUpRight size={18} /></Link>
          </aside>
        </div>
      </div>
      <section className="guide-routes" aria-labelledby="guide-routes-title"><div className="page-width"><span className="eyebrow">PUT IT ON YOUR ROUTE</span><h2 id="guide-routes-title">Make a journey <em>of it.</em></h2><div className="guide-route-list">{routes.map((journey) => <Link key={journey.id} href={`/journeys/${journey.slug}`}><span>{journey.duration}</span><div><h3>{journey.title}</h3><p>{journey.route}</p></div><ArrowUpRight size={26} /></Link>)}</div></div></section>
    </main>
  );
}
