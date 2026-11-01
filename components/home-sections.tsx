import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Photo } from "@/components/catalog/photo";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { collections, journeys } from "@/content/catalog";
import type { MediaKey } from "@/content/catalog/media-plan";
import type { Article, Experience, Faq } from "@/content/catalog/types";
import { brand, faqLd } from "@/lib/site";
import { Team } from "@/components/team";

const principles = [
  {
    title: "One coordinator, start to finish",
    text: "A named coordinator plans with you before you travel and stays reachable on WhatsApp throughout. Hosts, guides and drivers on the ground all work from the same plan.",
  },
  {
    title: "Your comfort, your choice",
    text: "Every journey comes in Standard, Premium and Luxury. The tier sets the hotels, the car, the boat and how much is handled for you; the route stays yours to shape.",
  },
  {
    title: "Quoted for your journey",
    text: "No listed prices that change at checkout. You send your selections, we confirm availability and send one complete quotation before any payment.",
  },
];

/** The first section after the hero: what Tourmelloh is and how it works (brief v5, section 6). */
export function HomeIntro() {
  return (
    <section className="page-width section-space home-way" id="about-tourmelloh" aria-labelledby="way-heading">
      <Reveal className="home-way-photo">
        <Photo k="varanasi-river-mist" sizes="(max-width: 900px) 92vw, 46vw" />
        <span className="home-way-caption">Home ground: the Ganges at Varanasi, before the city wakes</span>
      </Reveal>
      <Reveal className="home-way-copy" delay={0.08}>
        <span className="tour-kicker" style={{ color: "var(--muted)" }}>{brand.descriptor.toUpperCase()}</span>
        <h2 id="way-heading">We arrange Kashi <em>and the journeys around it.</em></h2>
        <p className="home-way-lead">
          Tourmelloh is a Varanasi travel company. We plan and coordinate journeys through Varanasi, Sarnath, Prayagraj, Ayodhya,
          Gaya and Bodh Gaya: the hotels and the car, the boats and the darshan, the guides, hosts and rituals, arranged as one plan.
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
          <Link className="tour-text-link" href="/how-it-works">How it works <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link className="tour-text-link" href="/tiers">Standard, Premium and Luxury <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </Reveal>
    </section>
  );
}

/** Five specialist collections and weddings, set as an editorial spread: one tall lead image, five around it. */
export function HomeCollections() {
  const tiles: { href: string; name: string; line: string; photo: MediaKey; tag: string }[] = [
    ...collections.map((c) => ({
      href: `/journeys/${c.slug}`,
      name: c.name,
      line: c.subtitle,
      photo: c.hero,
      tag: c.journeys.length ? `${c.journeys.filter((id) => journeys.some((j) => j.id === id)).length || c.journeys.length} journeys` : "Collection",
    })),
    { href: "/wedding-in-varanasi", name: "Destination Weddings", line: "Weddings in Varanasi, with guest travel arranged as one plan", photo: "wedding-mandap", tag: "Weddings" },
  ];
  return (
    <section className="home-collections page-width section-space" id="collections" aria-labelledby="collections-heading">
      <Reveal className="cat-head">
        <div className="cat-intro">
          <span className="tour-kicker" style={{ color: "var(--muted)" }}>SPECIALIST COLLECTIONS</span>
          <h2 id="collections-heading">Six ways <em>to travel with us.</em></h2>
        </div>
        <p>Some journeys need more than a route. Women travelling together with a female host, parents with a companion beside them, families across generations, the Buddhist circuit, rest by the river, and weddings on the Ganges.</p>
      </Reveal>
      <div className="home-collection-grid">
        {tiles.map((item, index) => (
          <Link key={item.href} href={item.href} className={`home-collection home-collection-${index}`}>
            <div className="home-collection-photo">
              <Photo k={item.photo} sizes={index === 0 ? "(max-width: 760px) 92vw, 40vw" : "(max-width: 760px) 92vw, 28vw"} />
            </div>
            <div className="home-collection-copy">
              <span>{item.tag}</span>
              <h3>{item.name}</h3>
              <p>{item.line}</p>
            </div>
            <span className="home-collection-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const tierRows = [
  { key: "standard", name: "Standard", line: "Selected 3-star hotels, a private air-conditioned car, breakfast, the journey's included boat ride and a named remote coordinator." },
  { key: "premium", name: "Premium", line: "Selected 4-star hotels, an upgraded MPV or SUV, a private boat where the route has one, accompanied darshan and hosted assistance." },
  { key: "luxury", name: "Luxury", line: "Heritage, boutique or 4/5-star stays, a confirmed premium vehicle, a dedicated concierge and the journey's Luxury experiences selected for you." },
];

/** Comfort tiers as an editorial list rather than three cards. */
export function HomeTiers() {
  return (
    <section className="page-width section-space home-tiers" aria-labelledby="tiers-heading">
      <Reveal className="cat-intro">
        <span className="tour-kicker" style={{ color: "var(--muted)" }}>CHOOSE YOUR COMFORT</span>
        <h2 id="tiers-heading">One journey, <em>three ways to travel it.</em></h2>
      </Reveal>
      <ol className="home-tier-list">
        {tierRows.map((t, i) => (
          <li key={t.key}>
            <Link href={`/journeys/${t.key}`} className="home-tier">
              <span className="home-tier-num">{String(i + 1).padStart(2, "0")}</span>
              <strong>{t.name}</strong>
              <span className="home-tier-line">{t.line}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>
      <Link className="tour-primary home-tiers-cta" href="/tiers#compare" style={{ color: "var(--paper)" }}>Compare Standard, Premium &amp; Luxury <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  );
}

/** Experiences as tall photographs with the words on them: moments, not another card grid. */
export function HomeMoments({ items }: { items: Experience[] }) {
  return (
    <section className="page-width section-space" aria-labelledby="moments-heading">
      <div className="cat-head">
        <Reveal className="cat-intro">
          <span className="tour-kicker" style={{ color: "var(--muted)" }}>SERVICES AND EXPERIENCES</span>
          <h2 id="moments-heading">Add what matters <em>to your days.</em></h2>
        </Reveal>
        <div>
          <p>The aarti from your own boat, a morning with Banarasi weavers, the city&apos;s breakfasts, an evening of raag. Add experiences and services to My Journey and we fit them in at the right hour, never charging twice for what your tier already includes.</p>
          <div className="home-way-links" style={{ marginTop: 18 }}>
            <Link className="tour-text-link" href="/experiences">All experiences <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link className="tour-text-link" href="/services">All services <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <div className="home-moments">
        {items.map((item) => (
          <Link key={item.slug} href={`/experiences/${item.slug}`} className="home-moment">
            <Photo k={item.hero} sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 24vw" />
            <span className="home-moment-copy">
              <small>{item.category}</small>
              <strong>{item.title}</strong>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** The team, introduced by name: two founders and the two people who run sales and operations. */
export function HomeTeam() {
  return (
    <section className="page-width section-space home-team" aria-labelledby="team-heading">
      <div className="cat-head">
        <Reveal className="cat-intro">
          <span className="tour-kicker" style={{ color: "var(--muted)" }}>THE PEOPLE BEHIND TOURMELLOH</span>
          <h2 id="team-heading">Planned in Varanasi, <em>by people who live here.</em></h2>
        </Reveal>
        <div>
          <p>Tourmelloh was founded in Varanasi to make Kashi, and the pilgrim routes around it, easier to travel well: one plan, one coordinator, and people on the ground who know the ghats, the temples and the timings.</p>
          <Link className="tour-text-link" href="/about">About Tourmelloh <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <Team />
    </section>
  );
}

/** Questions on one side, reading on the other. */
export function HomeBeforeYouGo({ faqs, reading }: { faqs: Faq[]; reading: Article[] }) {
  return (
    <section className="page-width section-space home-before" aria-labelledby="before-heading">
      <div>
        <Reveal className="cat-intro">
          <span className="tour-kicker" style={{ color: "var(--muted)" }}>GOOD TO KNOW</span>
          <h2 id="before-heading">Before <em>you enquire.</em></h2>
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
