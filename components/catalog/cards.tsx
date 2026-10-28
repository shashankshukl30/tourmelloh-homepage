import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article, City, Destination, Experience, Journey, MediaKey } from "@/content/catalog/types";
import { collections } from "@/content/catalog";
import { Photo } from "@/components/catalog/photo";

const collectionName = (id: Journey["collection"]) =>
  collections.find((collection) => collection.id === id)?.name ?? "";

export const duration = (journey: Pick<Journey, "days" | "nights">) =>
  `${journey.days} days · ${journey.nights} nights`;

function Card({
  href,
  photo,
  tag,
  meta,
  title,
  text,
  action,
  size = "regular",
}: {
  href: string;
  photo: MediaKey;
  tag?: string;
  meta?: string;
  title: string;
  text: string;
  action: string;
  size?: "regular" | "wide";
}) {
  return (
    <article className={`cat-card cat-card-${size}`}>
      <Link href={href} className="cat-card-photo" aria-label={title} tabIndex={-1}>
        <Photo k={photo} sizes={size === "wide" ? "(max-width: 760px) 92vw, 46vw" : "(max-width: 760px) 92vw, (max-width: 1150px) 45vw, 30vw"} />
        {tag && <span className="cat-card-tag">{tag}</span>}
      </Link>
      {meta && <p className="cat-card-meta">{meta}</p>}
      <h3>
        <Link href={href}>{title}</Link>
      </h3>
      <p className="cat-card-text">{text}</p>
      <Link href={href} className="cat-card-action" aria-hidden="true" tabIndex={-1}>
        {action} <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}

export function JourneyCard({ journey, size }: { journey: Journey; size?: "regular" | "wide" }) {
  return (
    <Card
      href={`/journeys/${journey.slug}`}
      photo={journey.hero}
      tag={collectionName(journey.collection)}
      meta={`${duration(journey)} · ${journey.route.join(", ")}`}
      title={journey.title}
      text={journey.summary}
      action="View the journey"
      size={size}
    />
  );
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card
      href={`/destinations/${destination.slug}`}
      photo={destination.hero}
      meta={destination.label}
      title={destination.name}
      text={destination.intro.split(". ")[0] + "."}
      action="Explore the region"
    />
  );
}

export function CityCard({ city }: { city: City }) {
  return (
    <Card
      href={`/cities/${city.slug}`}
      photo={city.hero}
      meta={`${city.label} · ${city.state}`}
      title={city.name}
      text={city.intro.split(". ")[0] + "."}
      action="Read the city guide"
    />
  );
}

export function ExperienceCard({ experience, cityName }: { experience: Experience; cityName?: string }) {
  return (
    <Card
      href={`/experiences/${experience.slug}`}
      photo={experience.hero}
      tag={experience.category}
      meta={[cityName, experience.duration].filter(Boolean).join(" · ")}
      title={experience.title}
      text={experience.summary}
      action="See the experience"
    />
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card
      href={`/journal/${article.slug}`}
      photo={article.hero}
      tag={article.category}
      title={article.title}
      text={article.excerpt}
      action="Read the article"
    />
  );
}
