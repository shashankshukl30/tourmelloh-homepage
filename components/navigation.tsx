"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { brand } from "@/content/travel";

if (typeof window !== "undefined") window.history.scrollRestoration = "manual";

export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 31h32M12 36h24M16 41h16M14 26a10 10 0 0 1 20 0M24 2v9M8 9l6 7M1 24h9M40 9l-6 7M38 24h9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="24" cy="26" r="3" fill="currentColor" />
    </svg>
  );
}

export function Navigation({
  tone = "overlay",
}: {
  tone?: "overlay" | "paper";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 35);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(
      () => menu.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
      30,
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(
          menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
        );
        const last = links.at(-1);
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        }
        if (event.shiftKey && document.activeElement === toggle.current) {
          event.preventDefault();
          last?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prior;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const links = [
    { name: "Destinations", href: "/#destinations" },
    { name: "Our journeys", href: "/journeys" },
    { name: "The Varanasi edit", href: "/destinations/varanasi" },
    { name: "Our approach", href: "/#approach" },
  ];
  const solid = tone === "paper" || scrolled || open;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${solid ? "is-solid" : ""}`}>
        <div className="header-inner">
          <Link
            href="/"
            className="brand"
            aria-label={`${brand.name} Home`}
            onClick={(event) => {
              setOpen(false);
              if (location.pathname === "/") {
                event.preventDefault();
                setOpen(false);
                history.replaceState(null, "", "/");
                window.scrollTo({
                  top: 0,
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                });
              }
            }}
          >
            <Image
              className="brand-logo"
              src={
                solid
                  ? "/brand/tourmelloh-logo.svg"
                  : "/brand/tourmelloh-logo-ivory.svg"
              }
              alt="Tourmelloh"
              width={220}
              height={52}
              unoptimized
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link href="/#plan" className="header-cta">
            Plan your journey <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open && (
        <nav
          ref={menu}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {" "}
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <span>0{i + 1}</span>
              {link.name}
              <ArrowUpRight />
            </Link>
          ))}
          <Link
            href="/#plan"
            onClick={() => setOpen(false)}
            className="mobile-plan"
          >
            Plan your journey <ArrowUpRight />
          </Link>
          <p>India, with time to feel it.</p>
        </nav>
      )}
    </>
  );
}
