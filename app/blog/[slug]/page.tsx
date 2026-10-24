import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JournalArticle } from "@/components/journal";
import "../journal.css";

const titles: Record<string, string> = {
  "first-time-in-varanasi": "First Time in Varanasi: A Practical Guide | Tourmelloh",
  "varanasi-prayagraj-ayodhya-route": "Varanasi, Prayagraj & Ayodhya Route Guide | Tourmelloh",
  "planning-an-ayodhya-visit": "Ayodhya Travel Guide: Plan Your First Visit | Tourmelloh",
  "sarnath-to-bodh-gaya": "Sarnath to Bodh Gaya: A Buddhist Trail Guide | Tourmelloh",
  "agra-and-vrindavan": "Agra & Vrindavan: A Thoughtful Travel Guide | Tourmelloh",
  "a-slower-visit-to-lucknow": "Lucknow Travel Guide: Culture, Craft & Food | Tourmelloh",
};
export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return {};
  return { title: titles[slug], description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, type: "article", images: [{ url: "/og.jpg", width: 1200, height: 630 }] } };
}
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) notFound();
  return <><Navigation tone="paper" /><JournalArticle post={post} /><Footer /></>;
}
