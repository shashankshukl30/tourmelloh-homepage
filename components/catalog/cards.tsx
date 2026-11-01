import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article, Experience, Guide, Journey, MediaKey, Service } from "@/content/catalog/types";
import { Photo } from "@/components/catalog/photo";
import { AddToJourney } from "@/components/wishlist/add-button";
import { PackageCard, type PackageCardData } from "@/components/journey/package-card";
import { media } from "@/content/catalog/media";

export const duration = (j: Pick<Journey, "days" | "nights">) => `${j.nights}N / ${j.days}D`;
export const durationLong = (j: Pick<Journey, "days" | "nights">) => `${j.nights} nights · ${j.days} days`;

const typeLabel: Record<string, string> = {
  "hindu-pilgrimage": "Hindu pilgrimage",
  buddhist: "Buddhist journey",
  heritage: "Heritage",
  culture: "Culture",
  "ancestral-rites": "Ancestral rites",
};

function Card({
  href, photo, tag, meta, title, subtitle, text, action, footer,
}: {
  href: string; photo: MediaKey; tag?: string; meta?: string; title: string; subtitle?: string; text: string; action: string; footer?: React.ReactNode;
}) {
  return (
    <article className="cat-card">
      <Link href={href} className="cat-card-photo" aria-label={title} tabIndex={-1}>
        <Photo k={photo} sizes="(max-width: 760px) 92vw, (max-width: 1150px) 45vw, 30vw" />
        {tag && <span className="cat-card-tag">{tag}</span>}
      </Link>
      {meta && <p className="cat-card-meta">{meta}</p>}
      <h3><Link href={href}>{title}</Link></h3>
      {subtitle && <p className="cat-card-sub">{subtitle}</p>}
      <p className="cat-card-text">{text}</p>
      <div className="cat-card-foot">
        <Link href={href} className="cat-card-action" aria-hidden="true" tabIndex={-1}>{action} <ArrowUpRight size={16} /></Link>
        {footer}
      </div>
    </article>
  );
}

/** Plain data for a package card (client component), from a journey record. */
export function toPackage(j: Journey): PackageCardData & { types: string[]; destinations: string[] } {
  const [name, rest] = j.title.split(" – ");
  const photo = media[j.hero];
  return {
    id: j.id, slug: j.slug, title: name, where: rest ?? j.route, route: j.route, nights: j.nights, days: j.days,
    summary: j.summary, kind: typeLabel[j.types[0]] ?? "Journey", types: j.types, destinations: j.destinations,
    photo: { src: photo.src, alt: photo.alt, blur: photo.blur },
  };
}

/** Package card: name on the photograph, nights, days and places together (brief v5 s3; client call 2026-10-31). */
export function JourneyCard({ journey, priority }: { journey: Journey; priority?: boolean }) {
  return <PackageCard pkg={toPackage(journey)} priority={priority} />;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card
      href={`/services/${service.slug}`}
      photo={service.hero}
      meta={`${service.category} · Quoted for your journey`}
      title={service.title}
      text={service.summary}
      action="Details"
      footer={<AddToJourney id={service.id} compact />}
    />
  );
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Card
      href={`/experiences/${experience.slug}`}
      photo={experience.hero}
      tag={experience.category}
      meta={experience.locations}
      title={experience.title}
      subtitle={experience.subtitle}
      text={experience.summary}
      action="Details"
      footer={<AddToJourney id={experience.id} compact />}
    />
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Card href={`/guides/${guide.slug}`} photo={guide.hero} meta={guide.state} title={guide.name} text={guide.intro.split(". ")[0] + "."} action="Read the guide" />
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card href={`/journal/${article.slug}`} photo={article.hero} tag={article.category} title={article.title} text={article.excerpt} action="Read the article" />
  );
}
