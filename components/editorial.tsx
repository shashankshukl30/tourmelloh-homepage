import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function VaranasiEdit() {
  return (
    <section
      className="varanasi-section page-width section-space"
      id="varanasi"
      aria-labelledby="varanasi-heading"
    >
      <Reveal className="varanasi-copy">
        <span className="eyebrow">
          <span className="small-sun">✳</span> THE VARANASI EDIT
        </span>
        <h2 id="varanasi-heading">
          There is India.
          <br />
          And then,
          <br />
          <em>there is Kashi.</em>
        </h2>
        <p className="editorial-intro">
          A boat on the Ganga before the city wakes. Chai in a lane you almost
          walked past. An evening that glows long after the lamps go out.
        </p>
        <p>
          Begin with Varanasi. Take your time with its ghats and old-city lanes,
          then follow the stories further — to Sarnath, the Sangam, and beyond.
        </p>
        <Link
          className="text-link underlined-link"
          href="/destinations/varanasi"
        >
          Find your way into Kashi <ArrowUpRight size={18} />
        </Link>
        <div className="editorial-footnote">
          <span>THE GANGA · VARANASI</span>
          <span>OLD CITY. NEW PERSPECTIVES.</span>
        </div>
      </Reveal>
      <Reveal className="varanasi-visual" delay={0.12}>
        <div className="varanasi-main-photo">
          <Image
            src="/images/varanasi-evening.webp"
            alt="Historic Varanasi ghats and colourful riverfront buildings seen from a boat"
            fill
            sizes="(max-width: 800px) 92vw, 43vw"
          />
          <span className="vertical-caption">
            A CITY BEST DISCOVERED SLOWLY
          </span>
        </div>
        <figure className="varanasi-inset">
          <div>
            <Image
              src="/images/varanasi-boats.webp"
              alt="Wooden boats lined up beside the Ganga in warm evening light"
              fill
              sizes="(max-width: 600px) 54vw, 260px"
            />
          </div>
          <figcaption>
            A little slower. A little quieter. <MoveUpRight size={15} />
          </figcaption>
        </figure>
        <span className="photo-side-note">01 / A CLOSER LOOK</span>
      </Reveal>
    </section>
  );
}

export function Approach() {
  const ideas = [
    {
      title: "Start with what matters to you.",
      text: "A family pilgrimage, a love of architecture, or simply time away. The reason for your trip comes before the route.",
    },
    {
      title: "Leave a little room in the day.",
      text: "Temple visits, long drives and early starts need a thoughtful rhythm. Rest and unplanned pauses belong in the picture, too.",
    },
    {
      title: "Put the details on the table.",
      text: "Hotels, transfers, walking requirements and inclusions are part of the planning conversation. Clarity makes the journey easier.",
    },
  ];
  return (
    <section
      className="approach-section section-space"
      id="approach"
      aria-labelledby="approach-heading"
    >
      <div className="page-width approach-inner">
        <Reveal>
          <span className="eyebrow">THE WAY WE LOOK AT TRAVEL</span>
          <h2 id="approach-heading">
            A good itinerary
            <br />
            leaves room
            <br />
            <em>for you.</em>
          </h2>
          <p>
            There’s no single way to experience India.
            <br />
            That’s the point.
          </p>
          <a className="text-link underlined-link" href="#plan">
            Let’s find your way <ArrowUpRight size={18} />
          </a>
        </Reveal>
        <div className="approach-list">
          {ideas.map((idea, i) => (
            <Reveal className="approach-item" key={idea.title} delay={i * 0.06}>
              <span className="approach-number">0{i + 1}</span>
              <div>
                <h3>{idea.title}</h3>
                <p>{idea.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
