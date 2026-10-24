"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { brand } from "@/content/travel";

if (typeof window !== "undefined") window.history.scrollRestoration = "manual";
const MotionLink = motion.create(Link);
const links = [
  { name: "Explore India", href: "/#destinations" },
  { name: "Tours & routes", href: "/journeys" },
  { name: "Varanasi guide", href: "/destinations/varanasi" },
  { name: "Get in touch", href: "/#contact" },
];

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
  const reduced = useReducedMotion();
  const groupId = useId();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
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
  const currentLink = links.find((link) => !link.href.includes("#") &&
    (pathname === link.href || pathname.startsWith(`${link.href}/`)))?.href;
  const highlighted = hovered ?? focused ?? currentLink;
  const travel = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 34 };
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
          <LayoutGroup id={groupId}>
            <nav className="desktop-nav" aria-label="Main navigation" onPointerLeave={() => setHovered(null)}>
              {links.map((link) => (
                <MotionLink key={link.href} href={link.href} className="nav-text-link"
                  aria-current={pathname === link.href ? "page" : undefined}
                  data-highlighted={highlighted === link.href}
                  onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(link.href); }}
                  onFocus={() => { setHovered(null); setFocused(link.href); }}
                  onBlur={() => setFocused(null)}
                  whileTap={reduced ? undefined : { scale: .97 }}>
                  {highlighted === link.href && <motion.span className="nav-backplate" layoutId="navigation-backplate"
                    aria-hidden="true" transition={travel} style={{ borderRadius: 999 }} />}
                  <span className="nav-link-label">{link.name}</span>
                </MotionLink>
              ))}
            </nav>
          </LayoutGroup>
          <MotionLink href="/search" className="nav-search" aria-label="Search tours and destinations"
            whileHover={reduced ? undefined : { scale: 1.07 }} whileTap={reduced ? undefined : { scale: .94 }} transition={travel}>
            <Search size={20} />
          </MotionLink>
          <MotionLink href="/#plan" className="header-cta" style={{ color: solid ? "var(--paper)" : "var(--ink)" }}
            initial="rest" whileHover="hover" whileFocus="hover" whileTap={reduced ? undefined : { scale: .98 }}>
            <motion.span className="nav-cta-fill" aria-hidden="true"
              variants={{ rest: { y: "105%" }, hover: { y: 0 } }} transition={reduced ? { duration: 0 } : { duration: .28, ease: [.2, .7, .2, 1] }} />
            <span className="nav-cta-label">Plan your journey</span>
            <motion.span className="nav-cta-arrow" variants={{ rest: { x: 0, y: 0 }, hover: { x: reduced ? 0 : 2, y: reduced ? 0 : -2 } }} transition={travel}>
              <ArrowUpRight size={17} />
            </motion.span>
          </MotionLink>
          <motion.button
            className="menu-toggle"
            ref={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            whileTap={reduced ? undefined : { scale: .92 }}
          >
            {open ? <X /> : <Menu />}
          </motion.button>
        </div>
      </header>
      {open && (
        <motion.nav
          ref={menu}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : .22 }}
        >
          {" "}
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          {links.map((link, i) => (
            <MotionLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : .32, delay: reduced ? 0 : .04 * i }}
              whileHover={reduced ? undefined : { x: 5 }}
              whileTap={reduced ? undefined : { scale: .98 }}
            >
              <span>0{i + 1}</span>
              {link.name}
              <ArrowUpRight />
            </MotionLink>
          ))}
          <Link
            href="/#plan"
            onClick={() => setOpen(false)}
            className="mobile-plan"
          >
            Plan your journey <ArrowUpRight />
          </Link>
          <p>India, with time to feel it.</p>
        </motion.nav>
      )}
    </>
  );
}
