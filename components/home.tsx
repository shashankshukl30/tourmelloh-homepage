"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { VaranasiEdit, Approach } from "@/components/editorial";
import { Destinations } from "@/components/destinations";
import { Journeys } from "@/components/journeys";
import { Planner } from "@/components/planner";
import { Footer } from "@/components/footer";
import { faqs, type JourneyCategory } from "@/content/travel";
import { Plus } from "lucide-react";

function goTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
}

export function Home() {
  const [category, setCategory] = useState<JourneyCategory>("All journeys");
  const [filterDestination, setFilterDestination] = useState("");
  const [planDestination, setPlanDestination] = useState("");
  const [planRequest, setPlanRequest] = useState(0);
  function onPlan(value: string) {
    setPlanDestination(value);
    setPlanRequest((count) => count + 1);
    goTo("plan");
  }
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero
          onExplore={(destination, value) => {
            setFilterDestination(
              destination === "Anywhere in our collection" ? "" : destination,
            );
            setCategory(value);
            goTo("journeys");
          }}
        />
        <VaranasiEdit />
        <Destinations onPlan={onPlan} />
        <Journeys
          category={category}
          setCategory={setCategory}
          destination={filterDestination}
          clearDestination={() => setFilterDestination("")}
          onPlan={onPlan}
        />
        <Approach />
        <section className="slow-moment" aria-label="A moment by the river">
          <div className="slow-moment-image" />
          <div className="page-width">
            <span className="eyebrow">THE MOMENTS BETWEEN THE MILESTONES</span>
            <p>
              Sometimes, the best part
              <br />
              is just <em>being there.</em>
            </p>
            <span className="slow-caption">EVENING ON THE GANGA, VARANASI</span>
          </div>
        </section>
        <Planner
          selectedDestination={planDestination}
          requestId={planRequest}
        />
        <section
          className="faq-section page-width section-space"
          aria-labelledby="faq-heading"
        >
          <div>
            <span className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span>
            <h2 id="faq-heading">
              Before <br />
              <em>you set off.</em>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={19} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
