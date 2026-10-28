import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Photo } from "@/components/catalog/photo";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { collections, journeysIn } from "@/content/catalog";
import { navCollections } from "@/content/catalog/nav";
import type { Article, Experience, Faq } from "@/content/catalog/types";
import { faqLd } from "@/lib/site";

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

/** Experiences as tall photographs with the words on them: moments, not another card grid. */
export function HomeMoments({ items }: { items: (Experience & { cityName?: string })[] }) {
  return (
    <section className="page-width section-space" aria-labelledby="moments-heading">
      <div className="cat-head">
        <Reveal className="cat-intro">
          <span className="tour-kicker" style={{ color: "var(--muted)" }}>PRIVATE EXPERIENCES</span>
          <h2 id="moments-heading">The hours <em>you will talk about.</em></h2>
        </Reveal>
        <div>
          <p>The Taj at first light, a balloon over the Aravallis, a shikara on Dal Lake before the floating market wakes, a table set on the Thar after dark. Each is arranged privately and fitted into your days at the right hour.</p>
          <Link className="tour-text-link" href="/experiences">All experiences <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="home-moments">
        {items.map((item) => (
          <Link key={item.slug} href={`/experiences/${item.slug}`} className="home-moment">
            <Photo k={item.hero} sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 24vw" />
            <span className="home-moment-copy">
              <small>{item.cityName ?? item.category}</small>
              <strong>{item.title}</strong>
            </span>
          </Link>
        ))}
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

/** Why Tourmelloh: the Varanasi home ground and the way every journey is run, in one place. */
export function HomeStory() {
  return (
    <section className="page-width section-space home-way" aria-labelledby="way-heading">
      <Reveal className="home-way-photo">
        <Photo k="varanasi-river-mist" sizes="(max-width: 900px) 92vw, 46vw" />
        <span className="home-way-caption">Our home ground: the Ganga at Varanasi, before the city wakes</span>
      </Reveal>
      <Reveal className="home-way-copy" delay={0.08}>
        <span className="tour-kicker" style={{ color: "var(--muted)" }}>THE TOURMELLOH WAY</span>
        <h2 id="way-heading">We begin in Kashi. <em>We travel all of India.</em></h2>
        <p className="home-way-lead">
          We are based in Varanasi, one of the oldest living cities on earth, and it shapes how we plan. Nothing here rewards hurry.
          The same patience goes into every journey we design, whether it starts on the Ganga or a long way from it.
        </p>
        <div className="home-way-list">
          {principles.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="home-way-links">
          <Link className="tour-text-link" href="/how-we-travel">How we design a journey <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link className="tour-text-link" href="/experiences#x-varanasi">Experiences in Varanasi <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link className="tour-text-link" href="/cities/varanasi">Our Varanasi guide <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </Reveal>
    </section>
  );
}

/** One closing section for everything a traveller reads before asking: questions on one side, reading on the other. */
export function HomeBeforeYouGo({ faqs, reading }: { faqs: Faq[]; reading: Article[] }) {
  return (
    <section className="page-width section-space home-before" aria-labelledby="before-heading">
      <div>
        <Reveal className="cat-intro">
          <span className="tour-kicker" style={{ color: "var(--muted)" }}>GOOD TO KNOW</span>
          <h2 id="before-heading">Before <em>you set off.</em></h2>
        </Reveal>
        <div className="faq-list" style={{ marginTop: 32 }}>
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}<Plus size={19} aria-hidden="true" /></summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
        <Link className="tour-text-link" href="/faq">All questions <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <aside className="home-reading" aria-labelledby="reading-heading">
        <p id="reading-heading" className="home-reading-label">From the journal</p>
        {reading.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`} className="home-reading-item">
            <span className="home-reading-photo"><Photo k={article.hero} sizes="120px" /></span>
            <span>
              <small>{article.category}</small>
              <strong>{article.title}</strong>
            </span>
          </Link>
        ))}
        <Link className="tour-text-link" href="/journal">Read the journal <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </aside>
      <JsonLd data={faqLd(faqs)} />
    </section>
  );
}
