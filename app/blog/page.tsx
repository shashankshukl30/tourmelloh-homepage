import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JournalIndex } from "@/components/journal";
import "./journal.css";

export const metadata: Metadata = {
  title: "India Travel Journal | Guides & Planning by Tourmelloh",
  description: "Practical travel guides to Varanasi, Ayodhya, Prayagraj, Bodh Gaya, Agra, Vrindavan and Lucknow. Explore places and plan a more thoughtful journey.",
};

export default function BlogPage() {
  return <><Navigation tone="paper" /><JournalIndex /><Footer /></>;
}
