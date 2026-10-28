import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/catalog/photo";
import { Reveal } from "@/components/reveal";
import { collections, journeysIn } from "@/content/catalog";
import { navCollections } from "@/content/catalog/nav";

/** Six collections, set as an editorial spread: one tall lead image, five smaller around it. */
export function HomeCollections() {
  return (
    <section className="home-collections page-width section-space" id="collections" aria-labelledby="collections-heading">
      <Reveal className="cat-head">
        <div className="cat-intro">
          <span className="tour-kicker" style={{ color: "var(--muted)" }}>SIGNATURE JOURNEYS</span>
          <h2 id="collections-heading">Six ways <em>to see India.</em></h2>
        </div>
        <p>Every journey is private and built around you: your own car and driver, guides who know the place, hotels chosen for character. Start with the kind of journey that calls to you.</p>
      </Reveal>
      <div className="home-collection-grid">
        {navCollections.map((item, index) => {
          const collection = collections.find((c) => c.slug === item.slug);
          const count = collection ? journeysIn(collection.id).length : 0;
          return (
            <Link key={item.slug} href={`/collections/${item.slug}`} className={`home-collection home-collection-${index}`}>
              <div className="home-collection-photo">
                <Photo k={collection?.hero ?? item.photo} sizes={index === 0 ? "(max-width: 760px) 92vw, 40vw" : "(max-width: 760px) 92vw, 28vw"} />
              </div>
              <div className="home-collection-copy">
                <span>{count} journeys</span>
                <h3>{item.name}</h3>
                <p>{item.line}</p>
              </div>
              <span className="home-collection-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const principles = [
  {
    title: "Private, from door to door",
    text: "Your own chauffeur-driven car, your own guides and a single trip contact who knows your plans. No coaches, no group departures, no strangers at your table.",
  },
  {
    title: "Paced for the place",
    text: "We put the Taj at sunrise, the Ganga before six and the long drives where they belong. Rest is part of the plan, not what is left over.",
  },
  {
    title: "Hotels with a sense of place",
    text: "Palaces, heritage houses and the best contemporary hotels, chosen for the view, the welcome and how easily you can step out into the city.",
  },
];

export function HowWeTravel() {
  return (
    <section className="page-width section-space home-way" aria-labelledby="way-heading">
      <Reveal className="home-way-photo">
        <Photo k="luxury-palace-courtyard" sizes="(max-width: 900px) 92vw, 46vw" />
      </Reveal>
      <Reveal className="home-way-copy" delay={0.08}>
        <span className="tour-kicker" style={{ color: "var(--muted)" }}>THE TOURMELLOH WAY</span>
        <h2 id="way-heading">India, <em>properly arranged.</em></h2>
        <div className="home-way-list">
          {principles.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link className="tour-text-link" href="/how-we-travel">How we design a journey <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </Reveal>
    </section>
  );
}
