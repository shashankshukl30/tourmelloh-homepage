import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const moments = [
  {
    number: "01",
    label: "BEGIN AT THE RIVER",
    title: "A morning with no hurry.",
    text: "Make an early start for the Ganga. Watch the riverfront come into view, then leave room for breakfast and a slower morning. A boat ride can bring a different perspective, when conditions allow.",
    image: "/images/varanasi-riverfront.webp",
    alt: "Boats and historic Varanasi ghats seen across the Ganga in warm daylight",
    caption: "THE GHATS, SEEN FROM THE WATER",
  },
  {
    number: "02",
    label: "THE CITY BETWEEN THE SIGHTS",
    title: "Follow a lane. Find your own Kashi.",
    text: "Walk between the old-city lanes and the ghats. Pause for chai, take in the river, and resist filling every hour. The small spaces between your plans are part of the visit.",
    image: "/images/varanasi-aerial.webp",
    alt: "An aerial view of Varanasi's dense old city beside the curving Ganga riverfront",
    caption: "THE OLD CITY & ITS RIVER",
  },
  {
    number: "03",
    label: "WHEN DAY BECOMES EVENING",
    title: "Stay for the aarti.",
    text: "Evening Ganga aarti at Dashashwamedh Ghat is one of the city's defining rituals. Allow time to arrive and settle in, with the day's arrangements checked around the current schedule and river conditions.",
    image: "/images/varanasi-boats.webp",
    alt: "Wooden boats along the Ganga as the sun reaches the horizon in Varanasi",
    caption: "EVENING LIGHT ON THE GANGA",
  },
  {
    number: "04",
    label: "A LITTLE FURTHER, A DIFFERENT PACE",
    title: "Leave an afternoon for Sarnath.",
    text: "Make room for nearby Sarnath and its Buddhist heritage. It gives the journey another perspective, and a reason to spend more than a single night in Varanasi.",
  },
];

const connectedJourneys = [
  {
    title: "Kashi, before the world wakes",
    route: "VARANASI · SARNATH",
    duration: "4 days / 3 nights",
    image: "/images/varanasi-riverfront.webp",
    alt: "Varanasi riverfront architecture and colourful boats on the Ganga",
    href: "/journeys/kashi-before-the-world-wakes",
  },
  {
    title: "Along the sacred rivers",
    route: "VARANASI · PRAYAGRAJ · AYODHYA",
    duration: "6 days / 5 nights",
    image: "/images/prayagraj-yamuna.webp",
    alt: "A small boat on the Yamuna near the bridge in Prayagraj",
    href: "/journeys/along-the-sacred-rivers",
  },
];

export function DestinationPreview() {
  return (
    <main id="main" className="destination-page">
      <section className="place-hero page-width" aria-labelledby="place-title">
        <Reveal className="place-hero-copy">
          <nav className="place-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">India</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Varanasi</span>
          </nav>
          <span className="eyebrow place-region">
            UTTAR PRADESH · THE GANGA PLAIN
          </span>
          <h1 id="place-title">
            Varanasi.
            <br />A city to
            <br />
            <em>feel.</em>
          </h1>
          <p className="place-hero-intro">
            Some journeys begin with a place.
            <br />
            This one begins with a feeling.
          </p>
          <p>
            River mornings. Old-city lanes. An evening by the ghats. Take your
            time with Kashi, and let the city find its own way into your day.
          </p>
          <a className="place-explore text-link" href="#varanasi-moments">
            Get to know Varanasi <ArrowDown size={18} />
          </a>
        </Reveal>
        <Reveal className="place-hero-visual" delay={0.12}>
          <figure>
            <div className="place-hero-image">
              <Image
                src="/images/varanasi-evening.webp"
                alt="Varanasi's historic riverfront buildings and ghats seen from the Ganga"
                fill
                preload
                sizes="(max-width: 760px) 90vw, 48vw"
              />
            </div>
            <figcaption>
              <span>VARANASI, FROM THE WATER</span>
              <span>THE GANGA · UTTAR PRADESH</span>
            </figcaption>
          </figure>
          <span className="place-hero-handnote">
            Let the river set the pace.
          </span>
        </Reveal>
      </section>

      <section
        className="place-moments page-width"
        id="varanasi-moments"
        aria-labelledby="place-moments-title"
      >
        <Reveal className="place-section-intro">
          <span className="eyebrow">FOUR WAYS INTO THE CITY</span>
          <h2 id="place-moments-title">
            A city revealed.
            <br />
            <em>One moment at a time.</em>
          </h2>
          <p>Start with these moments. Leave the spaces between them open.</p>
        </Reveal>
        <div className="place-moment-list">
          {moments.map((moment) => (
            <article
              className={`place-moment place-moment-${moment.number}`}
              key={moment.number}
              aria-labelledby={`place-moment-${moment.number}`}
            >
              <Reveal className="place-moment-media">
                {moment.image ? (
                  <figure>
                    <div className="place-moment-photo">
                      <Image
                        src={moment.image}
                        alt={moment.alt}
                        fill
                        sizes="(max-width: 760px) 90vw, 50vw"
                      />
                    </div>
                    <figcaption>{moment.caption}</figcaption>
                  </figure>
                ) : (
                  <div className="place-sarnath-panel">
                    <span className="eyebrow">BEYOND THE RIVER</span>
                    <div className="place-sarnath-type">
                      <span>Kashi.</span>
                      <i aria-hidden="true">&</i>
                      <span>Sarnath.</span>
                    </div>
                    <span className="place-sarnath-rule" aria-hidden="true" />
                    <p>
                      Two perspectives.
                      <br />
                      One thoughtfully paced journey.
                    </p>
                  </div>
                )}
              </Reveal>
              <Reveal className="place-moment-copy" delay={0.08}>
                <span className="place-moment-number" aria-hidden="true">
                  {moment.number}
                </span>
                <span className="eyebrow">{moment.label}</span>
                <h3 id={`place-moment-${moment.number}`}>{moment.title}</h3>
                <p>{moment.text}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="place-pacing" aria-labelledby="place-pacing-title">
        <div className="place-pacing-inner page-width">
          <Reveal className="place-pacing-lead">
            <span className="eyebrow">A LITTLE THOUGHT BEFORE YOU GO</span>
            <h2 id="place-pacing-title">
              Give the city
              <br />
              <em>a little time.</em>
            </h2>
            <div className="place-nights">
              <span>3</span>
              <div>
                nights to begin with
                <small>A suggested pace, shaped around you.</small>
              </div>
            </div>
          </Reveal>
          <Reveal className="place-pacing-notes" delay={0.1}>
            <div>
              <span>01 / YOUR TIME</span>
              <h3>Room for the river. And for rest.</h3>
              <p>
                Three nights is a useful starting point for the ghats, old city
                and Sarnath. Allow breathing room around arrival, early starts
                and onward travel.
              </p>
            </div>
            <div>
              <span>02 / YOUR COMFORT</span>
              <h3>Let walking needs shape the route.</h3>
              <p>
                Ghats and temple lanes can involve steps, uneven surfaces and
                walking. Share stair concerns, walking limits and rest
                preferences before settling the itinerary.
              </p>
            </div>
            <div>
              <span>03 / YOUR DATES</span>
              <h3>Plan with the season in mind.</h3>
              <p>
                Weather, river conditions and local schedules can affect the
                day. Check boating, temple visits and aarti arrangements for
                your actual travel dates.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="place-journeys page-width"
        aria-labelledby="place-journeys-title"
      >
        <Reveal className="place-journeys-heading">
          <div>
            <span className="eyebrow">A PLACE TO START PLANNING</span>
            <h2 id="place-journeys-title">
              Make Kashi
              <br />
              <em>part of your story.</em>
            </h2>
          </div>
          <p>
            Stay a little longer, or follow the rivers further.
            <br />
            These routes are starting points for your journey.
          </p>
        </Reveal>
        <div className="place-journey-grid">
          {connectedJourneys.map((journey, index) => (
            <Reveal key={journey.href} delay={index * 0.08}>
              <Link className="place-journey-link" href={journey.href}>
                <div className="place-journey-photo">
                  <Image
                    src={journey.image}
                    alt={journey.alt}
                    fill
                    sizes="(max-width: 760px) 90vw, 44vw"
                  />
                </div>
                <div className="place-journey-meta">
                  <span>{journey.route}</span>
                  <span>{journey.duration}</span>
                </div>
                <div className="place-journey-title">
                  <h3>{journey.title}</h3>
                  <ArrowUpRight size={25} />
                </div>
                <span className="place-journey-action">
                  Explore this journey
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="place-closing page-width"
        aria-labelledby="place-closing-title"
      >
        <Reveal className="place-closing-inner">
          <span className="eyebrow">YOUR VARANASI, YOUR WAY</span>
          <h2 id="place-closing-title">
            What brings you
            <br />
            <em>to Kashi?</em>
          </h2>
          <div>
            <p>
              A family journey, a new perspective, a little time by the river.
              Tell us what matters to you.
            </p>
            <Link
              className="button button-clay"
              style={{ color: "var(--paper)" }}
              href="/?destination=Varanasi#plan"
            >
              Plan your Varanasi journey <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
