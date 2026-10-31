import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItemDetail } from "@/components/catalog/item-detail";
import { experiences } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => experiences.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = experiences.find((x) => x.slug === slug);
  return e ? pageMeta({ ...e.seo, path: `/experiences/${slug}`, image: e.hero }) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const e = experiences.find((x) => x.slug === slug);
  if (!e) notFound();
  return <ItemDetail item={e} />;
}
