import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { blogPosts, type BlogPost } from "@/content/blog";
import { Reveal } from "@/components/reveal";

function photographPosition(post: BlogPost) {
  return post.slug === "sarnath-to-bodh-gaya" ? "50% 0%" : "50% 50%";
}

export function readingMinutes(post: BlogPost) {
  const words = post.sections.flatMap(section => section.paragraphs).join(" ").split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

function ArticleMeta({ post }: { post: BlogPost }) {
  return <div className="journal-meta"><span>{post.category}</span><span><Clock3 size={16} aria-hidden="true" />{readingMinutes(post)} min read</span></div>;
}

export function JournalIndex() {
  const [featured, ...articles] = blogPosts;
  return <main id="main" className="journal-page page-width">
    <header className="journal-heading">
      <div><span className="eyebrow">THE TOURMELLOH JOURNAL</span><h1>India, <em>in the details.</em></h1></div>
      <p>Routes worth thinking through. Places worth slowing down for. Practical reading for your next journey.</p>
    </header>
    <Link className="journal-feature" href={`/blog/${featured.slug}`}>
      <div className="journal-photo"><Image src={featured.image} alt={featured.imageAlt} fill preload quality={90} sizes="(max-width: 760px) 100vw, 60vw" /></div>
      <div className="journal-feature-copy"><ArticleMeta post={featured} /><h2>{featured.title}</h2><p>{featured.excerpt}</p><span className="journal-read">Read the story <ArrowUpRight size={22} /></span></div>
    </Link>
    <div className="journal-list-heading"><span className="eyebrow">MORE FROM THE JOURNAL</span><span>Routes, places &amp; practicalities</span></div>
    <div className="journal-list">{articles.map((post, index) => <Reveal key={post.slug}>
      <Link className="journal-row" href={`/blog/${post.slug}`}>
        <span className="journal-number">{String(index + 2).padStart(2, "0")}</span>
        <div className="journal-photo"><Image src={post.image} alt={post.imageAlt} fill quality={90} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 32vw, 28vw" style={{ objectPosition: photographPosition(post) }} /></div>
        <div className="journal-row-copy"><ArticleMeta post={post} /><h2>{post.title}</h2><p>{post.excerpt}</p><span className="journal-read">Read the story <ArrowUpRight size={21} /></span></div>
      </Link>
    </Reveal>)}</div>
  </main>;
}

export function JournalArticle({ post }: { post: BlogPost }) {
  const more = blogPosts.filter(item => item.slug !== post.slug).slice(0, 2);
  return <main id="main" className="article-page page-width">
    <Link href="/blog" className="article-back"><ArrowLeft size={18} />The travel journal</Link>
    <header className="article-heading"><div><ArticleMeta post={post} /><h1>{post.title}</h1></div><p>{post.excerpt}</p></header>
    <div className="article-cover"><Image src={post.image} alt={post.imageAlt} fill preload quality={90} sizes="(max-width: 700px) 120vw, 100vw" style={{ objectPosition: photographPosition(post) }} /></div>
    <div className="article-layout">
      <aside className="article-contents"><span className="eyebrow">IN THIS STORY</span><nav aria-label="Article contents">{post.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a>)}</nav><p>Tourmelloh travel journal<br />Varanasi, Uttar Pradesh</p></aside>
      <div className="article-copy">{post.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
        <aside className="article-takeaways"><span className="eyebrow">BEFORE YOU SET OFF</span><h2>Keep in mind.</h2><ul>{post.takeaways.map(item => <li key={item}>{item}</li>)}</ul></aside>
        <div className="article-next"><span className="eyebrow">FROM READING TO GOING</span><h2>Give the journey <em>some shape.</em></h2><p>Explore a suggested route, then tell us what you would like to make your own.</p><Link href={`/journeys/${post.relatedJourney}`} className="button button-clay" style={{ color: "var(--paper)" }}>Explore the journey <ArrowUpRight size={19} /></Link></div>
      </div>
    </div>
    <section className="article-more" aria-labelledby="more-stories"><div className="section-heading"><h2 id="more-stories">Keep <em>exploring.</em></h2><Link href="/blog" className="text-link">All stories <ArrowUpRight size={20} /></Link></div><div>{more.map(item => <Link href={`/blog/${item.slug}`} key={item.slug}><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><span className="journal-read">Read the story <ArrowUpRight size={20} /></span></Link>)}</div></section>
  </main>;
}
