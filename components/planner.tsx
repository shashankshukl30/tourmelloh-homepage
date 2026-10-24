"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  RotateCcw,
  X,
} from "lucide-react";
import { brand, destinations, journeys } from "@/content/travel";

type Brief = {
  destination: string;
  month: string;
  party: string;
  interests: string;
  journey?: { title: string; route: string; duration: string };
};

export function Planner({
  selectedDestination,
  requestId,
  selectedJourney,
}: {
  selectedDestination: string;
  requestId: number;
  selectedJourney?: (typeof journeys)[number];
}) {
  const [destination, setDestination] = useState(
    selectedDestination || "Varanasi",
  );
  const [month, setMonth] = useState("I’m flexible");
  const [party, setParty] = useState("As a couple");
  const [interests, setInterests] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [status, setStatus] = useState("");
  const [chosenJourney, setChosenJourney] = useState(selectedJourney);
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedDestination) {
      setDestination(selectedDestination);
      setBrief(null);
      setChosenJourney(selectedJourney);
    }
  }, [selectedDestination, requestId, selectedJourney]);
  useEffect(() => {
    if (brief) result.current?.focus();
  }, [brief]);
  function briefText() {
    return brief
      ? `MY TOURMELLOH JOURNEY — PLANNING BRIEF\n\n${brief.journey ? `Suggested journey: ${brief.journey.title}\nRoute: ${brief.journey.route}\nDuration: ${brief.journey.duration}\n\n` : ""}Destination: ${brief.destination}\nWhen: ${brief.month}\nTravelling: ${brief.party}\nIdeas and preferences: ${brief.interests || "Open to suggestions"}\n\nPersonal planning draft. This is not a booking or confirmed quote. No enquiry has been sent.`
      : "";
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(briefText());
      setStatus("Your travel brief has been copied.");
    } catch {
      setStatus("Copy is unavailable here. Use Download brief to keep a copy.");
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([briefText()], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "my-tourmelloh-journey.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setStatus("Your travel brief is ready to keep.");
  }
  return (
    <section
      className="planner-section"
      id="plan"
      aria-labelledby="planner-heading"
    >
      <div className="page-width planner-inner">
        <div className="planner-copy">
          <span className="eyebrow">A JOURNEY OF YOUR OWN</span>
          <h2 id="planner-heading">
            Your India
            <br />
            begins with
            <br />
            <em>a conversation.</em>
          </h2>
          <p>
            Tell us the places on your mind.
            <br />
            The people coming with you.
            <br />
            The things you don’t want to miss.
          </p>
          <a className="planner-phone" href={brand.phoneHref}>
            <span>Prefer to talk?</span> {brand.phone}{" "}
            <ArrowUpRight size={16} />
          </a>
          <div className="planner-signoff">
            <span className="small-sun">✳</span>
            <span>
              Somewhere between a plan
              <br />
              and a possibility.
            </span>
          </div>
        </div>
        <div className="planner-panel">
          {brief ? (
            <div className="brief-result" ref={result} tabIndex={-1}>
              <span className="brief-check">
                <Check size={24} />
              </span>
              <span className="eyebrow">YOUR TRAVEL BRIEF</span>
              <h3>
                Your journey is
                <br />
                taking shape.
              </h3>
              <dl>
                {brief.journey && (
                  <div>
                    <dt>Your route idea</dt>
                    <dd>
                      {brief.journey.title}
                      <small className="brief-journey-route">
                        {brief.journey.route} · {brief.journey.duration}
                      </small>
                    </dd>
                  </div>
                )}
                <div>
                  <dt>Start with</dt>
                  <dd>{brief.destination}</dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>{brief.month}</dd>
                </div>
                <div>
                  <dt>Travelling</dt>
                  <dd>{brief.party}</dd>
                </div>
                {brief.interests && (
                  <div>
                    <dt>On your mind</dt>
                    <dd>{brief.interests}</dd>
                  </div>
                )}
              </dl>
              <p className="preview-note">
                This is your personal planning draft. In this design preview, no
                enquiry is sent and no booking is made.
              </p>
              <div className="brief-actions">
                <button
                  className="button button-clay"
                  style={{ color: "var(--paper)" }}
                  onClick={download}
                >
                  Download brief <ArrowDownToLine size={17} />
                </button>
                <button
                  className="icon-button"
                  aria-label="Copy travel brief"
                  onClick={copy}
                >
                  <Copy size={19} />
                </button>
              </div>
              <button
                className="text-link edit-brief"
                onClick={() => {
                  setBrief(null);
                  setStatus("");
                }}
              >
                Adjust my ideas <RotateCcw size={15} />
              </button>
              <p role="status" className="form-status">
                {status}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setBrief({
                  destination,
                  month,
                  party,
                  interests: interests.trim(),
                  journey: chosenJourney
                    ? {
                        title: chosenJourney.title,
                        route: chosenJourney.route,
                        duration: chosenJourney.duration,
                      }
                    : undefined,
                });
              }}
            >
              <span className="eyebrow">LET’S PLAN YOUR INDIA</span>
              <h3>What’s calling you?</h3>
              {chosenJourney && (
                <div className="planner-chosen-journey">
                  <div>
                    <span className="eyebrow">YOUR CHOSEN JOURNEY</span>
                    <strong>{chosenJourney.title}</strong>
                    <small>
                      {chosenJourney.route} · {chosenJourney.duration}
                    </small>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove chosen itinerary"
                    onClick={() => setChosenJourney(undefined)}
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
              <label className="planner-field">
                <span>I’d like to explore</span>
                <div className="select-wrap">
                  <select
                    value={destination}
                    onChange={(event) => {
                      setDestination(event.target.value);
                      setChosenJourney(undefined);
                    }}
                  >
                    {destinations.map((place) => (
                      <option key={place.name}>{place.name}</option>
                    ))}
                    <option>More than one destination</option>
                    <option>Somewhere else in India</option>
                  </select>
                  <ChevronDown size={17} />
                </div>
              </label>
              <div className="planner-row">
                <label className="planner-field">
                  <span>When are you thinking?</span>
                  <div className="select-wrap">
                    <select
                      value={month}
                      onChange={(event) => setMonth(event.target.value)}
                    >
                      <option>I’m flexible</option>
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                    <ChevronDown size={17} />
                  </div>
                </label>
                <label className="planner-field">
                  <span>Who’s coming along?</span>
                  <div className="select-wrap">
                    <select
                      value={party}
                      onChange={(event) => setParty(event.target.value)}
                    >
                      <option>As a couple</option>
                      <option>With family</option>
                      <option>With friends</option>
                      <option>On my own</option>
                      <option>With a group</option>
                    </select>
                    <ChevronDown size={17} />
                  </div>
                </label>
              </div>
              <label className="planner-field">
                <span>
                  Anything you’d love to include? <small>Optional</small>
                </span>
                <textarea
                  value={interests}
                  onChange={(event) => setInterests(event.target.value)}
                  maxLength={600}
                  rows={3}
                  placeholder="A sunrise boat ride, time for temple visits, a gentler pace for my parents…"
                />
              </label>
              <button
                className="button button-clay planner-submit"
                style={{ color: "var(--paper)" }}
                type="submit"
              >
                Create my travel brief <ArrowUpRight size={19} />
              </button>
              <p className="preview-note">
                Design preview · Create a personal brief to keep. No enquiry is
                sent.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
