import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItemDetail } from "@/components/catalog/item-detail";
import { services } from "@/content/catalog";
import { pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => services.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? pageMeta({ ...s.seo, path: `/services/${slug}`, image: s.hero }) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return <ItemDetail item={s} />;
}
