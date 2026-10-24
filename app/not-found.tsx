import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navigation tone="paper" />
      <main id="main" className="not-found-page page-width">
        <span className="eyebrow">404 · A SMALL DETOUR</span>
        <h1>
          Let’s find your
          <br />
          <em>way back.</em>
        </h1>
        <p>
          This page isn’t part of the collection. There are other journeys
          waiting to be discovered.
        </p>
        <Link
          href="/journeys"
          className="button button-clay"
          style={{ color: "var(--paper)" }}
        >
          Explore our journeys <ArrowUpRight size={18} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
