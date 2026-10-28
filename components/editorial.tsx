import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Photo } from "@/components/catalog/photo";

const chapters = [
  ["01", "Arrive. Meet the river.", "Check in, settle down and walk to the ghats for your first evening beside the Ganga."],
  ["02", "Kashi, before the rush.", "A private boat at first light, the lanes around Kashi Vishwanath, and time to rest before the evening."],
  ["03", "A different kind of quiet.", "Follow the road to Sarnath for the Dhamek Stupa, Buddhist heritage and the archaeological museum."],
  ["04", "One last cup of chai.", "A final morning in the city, with enough room for your onward connection."],
];

export function VaranasiEdit() {
  return (
    <section className="kashi-chapter page-width" id="varanasi" aria-labelledby="varanasi-heading">
      <div className="chapter-heading"><span className="eyebrow">THE HOMEGROUND</span><span>Varanasi · Uttar Pradesh</span></div>
      <div className="chapter-layout">
        <Reveal className="chapter-visual">
          <div className="chapter-photo"><Photo k="varanasi-river-mist" sizes="(max-width: 700px) 90vw, 43vw" /></div>
          <div className="chapter-photo-note"><span>A city you don’t rush.</span><Link href="/cities/varanasi" aria-label="Read our Varanasi city guide"><ArrowUpRight size={24} /></Link></div>
        </Reveal>
        <Reveal className="chapter-copy" delay={0.1}>
          <h2 id="varanasi-heading">Four days in Kashi.<br /><em>From the inside.</em></h2>
          <p className="chapter-intro">Varanasi is where we are based, and where we would begin. Three nights in a palace on the river, and time for the places between the landmarks.</p>
          <ol className="chapter-days">{chapters.map(([day,title,text]) => <li key={day}><span>{day}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          <Link className="button button-clay" style={{ color: "var(--paper)" }} href="/journeys/kashi-before-the-world-wakes">Explore the four-day journey <ArrowUpRight size={19} /></Link>
        </Reveal>
      </div>
    </section>
  );
}
