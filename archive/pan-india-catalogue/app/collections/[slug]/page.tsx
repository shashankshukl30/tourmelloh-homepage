import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JourneyCard } from "@/components/catalog/cards";
import { EnquiryBand, PageOpening, PrimaryLink } from "@/components/catalog/blocks";
import { collections, journeysIn } from "@/content/catalog";
import { pageMeta } from "@/lib/site";
import { collectionFilters } from "@/components/catalog/filters";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => collections.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) return {};
  return pageMeta({ ...collection.seo, path: `/collections/${collection.slug}`, image: collection.hero });
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const list = journeysIn(collection.id);
  const path = `/collections/${collection.slug}`;
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="cat-page">
        <PageOpening
          trail={[{ name: "Home", path: "/" }, { name: "Journeys", path: "/journeys" }, { name: collection.name, path }]}
          label={`${list.length} PRIVATE JOURNEYS`}
          display={collection.display}
          lead={collection.intro}
          photo={collection.hero}
        >
          <PrimaryLink href="/plan">Plan a journey</PrimaryLink>
        </PageOpening>
        <section className="cat-section tour-width cat-split" aria-label={`About ${collection.name}`}>
          <nav className="cat-filters cat-filters-stack" aria-label="Collections">
            {collectionFilters.map((filter) => (
              <a key={filter.href} href={filter.href} aria-current={filter.href === path ? "page" : undefined}>{filter.name}</a>
            ))}
          </nav>
          <div className="cat-prose">{collection.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>
        </section>
        <section className="cat-section tour-width" aria-label={`${collection.name} journeys`}>
          <div className="cat-grid">
            {list.map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}
          </div>
        </section>
        <EnquiryBand />
      </main>
      <Footer />
    </>
  );
}
