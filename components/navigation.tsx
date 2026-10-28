"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { MegaPanel, type MenuId } from "@/components/nav-mega";
import { navCollections, navDestinations } from "@/content/catalog/nav";

if (typeof window !== "undefined") window.history.scrollRestoration = "manual";
const MotionLink = motion.create(Link);

type Item = { name: string; href: string; menu?: MenuId };
const items: Item[] = [
  { name: "Journeys", href: "/journeys", menu: "journeys" },
  { name: "Destinations", href: "/destinations", menu: "destinations" },
  { name: "Experiences", href: "/experiences" },
  { name: "Journal", href: "/journal" },
  { name: "About", href: "/about" },
];

export function Navigation({ tone = "overlay" }: { tone?: "overlay" | "paper" }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const groupId = useId();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobile = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
    setMenu(null);
    setOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 35);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menu) setMenu(null);
      if (open) { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu, open]);

  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => mobile.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 30);
    return () => { clearTimeout(timer); document.body.style.overflow = prior; };
  }, [open]);

  const openMenu = (id: MenuId | null) => { window.clearTimeout(closeTimer.current); setMenu(id); };
  const closeSoon = () => { closeTimer.current = window.setTimeout(() => setMenu(null), 160); };
  const current = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    || (item.menu === "journeys" && pathname.startsWith("/collections"))
    || (item.menu === "destinations" && pathname.startsWith("/cities")))?.href;
  const highlighted = hovered ?? (menu ? items.find((i) => i.menu === menu)?.href : undefined) ?? current;
  const travel = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 34 };
  const solid = tone === "paper" || scrolled || open || menu !== null;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="nav-shell" onPointerLeave={(e) => { if (e.pointerType !== "touch") closeSoon(); }} onPointerEnter={() => window.clearTimeout(closeTimer.current)}>
        <header className={`site-header ${solid ? "is-solid" : ""} ${menu ? "has-menu" : ""}`}>
          <div className="header-inner">
            <Link href="/" className="brand" aria-label="Tourmelloh Home"
              onClick={(event) => {
                setOpen(false);
                setMenu(null);
                if (location.pathname === "/") {
                  event.preventDefault();
                  history.replaceState(null, "", "/");
                  window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
                }
              }}>
              <Image className="brand-logo" src={solid ? "/brand/tourmelloh-logo.svg" : "/brand/tourmelloh-logo-ivory.svg"}
                alt="Tourmelloh" width={220} height={52} unoptimized />
            </Link>
            <LayoutGroup id={groupId}>
              <nav className="desktop-nav" aria-label="Main navigation" onPointerLeave={() => setHovered(null)}>
                {items.map((item) => {
                  const body = (
                    <>
                      {highlighted === item.href && <motion.span className="nav-backplate" layoutId="navigation-backplate"
                        aria-hidden="true" transition={travel} style={{ borderRadius: 999 }} />}
                      <span className="nav-link-label">{item.name}</span>
                      {item.menu && <ChevronDown className="nav-chevron" size={15} aria-hidden="true" />}
                    </>
                  );
                  const shared = {
                    className: "nav-text-link",
                    "data-highlighted": highlighted === item.href,
                    onPointerEnter: (event: React.PointerEvent) => {
                      if (event.pointerType === "touch") return;
                      setHovered(item.href);
                      openMenu(item.menu ?? null);
                    },
                  };
                  return item.menu ? (
                    <button key={item.href} type="button" {...shared} aria-expanded={menu === item.menu}
                      aria-controls={`mega-${item.menu}`} aria-current={current === item.href ? "page" : undefined}
                      onClick={() => openMenu(menu === item.menu ? null : item.menu!)}>
                      {body}
                    </button>
                  ) : (
                    <MotionLink key={item.href} href={item.href} {...shared}
                      aria-current={current === item.href ? "page" : undefined}
                      whileTap={reduced ? undefined : { scale: .97 }}>
                      {body}
                    </MotionLink>
                  );
                })}
              </nav>
            </LayoutGroup>
            <div className="header-actions">
              <MotionLink href="/search" className="nav-search" aria-label="Search journeys, places and experiences"
                whileHover={reduced ? undefined : { scale: 1.07 }} whileTap={reduced ? undefined : { scale: .94 }} transition={travel}>
                <Search size={20} />
              </MotionLink>
              <WhatsAppLink placement="header" />
              <MotionLink href="/plan" className="header-cta" style={{ color: solid ? "var(--paper)" : "var(--ink)" }}
                initial="rest" whileHover="hover" whileFocus="hover" whileTap={reduced ? undefined : { scale: .98 }}>
                <motion.span className="nav-cta-fill" aria-hidden="true"
                  variants={{ rest: { y: "105%" }, hover: { y: 0 } }} transition={reduced ? { duration: 0 } : { duration: .28, ease: [.2, .7, .2, 1] }} />
                <span className="nav-cta-label"><span className="nav-plan-full">Plan your journey</span><span className="nav-plan-short">Plan a trip</span></span>
                <motion.span className="nav-cta-arrow" variants={{ rest: { x: 0, y: 0 }, hover: { x: reduced ? 0 : 2, y: reduced ? 0 : -2 } }} transition={travel}>
                  <ArrowUpRight size={17} />
                </motion.span>
              </MotionLink>
              <motion.button className="menu-toggle" ref={toggle} aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}
                whileTap={reduced ? undefined : { scale: .92 }}>
                {open ? <X /> : <Menu />}
              </motion.button>
            </div>
          </div>
        </header>
        <MegaPanel id="journeys" open={menu === "journeys"} onNavigate={() => setMenu(null)} />
        <MegaPanel id="destinations" open={menu === "destinations"} onNavigate={() => setMenu(null)} />
      </div>
      {menu && <div className="mega-scrim" aria-hidden="true" onClick={() => setMenu(null)} />}
      {open && (
        <motion.nav ref={mobile} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"
          initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .22 }}>
          {items.map((item, i) => (
            <MotionLink key={item.href} href={item.href} onClick={() => setOpen(false)}
              aria-current={current === item.href ? "page" : undefined}
              initial={reduced ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : .32, delay: reduced ? 0 : .04 * i }}>
              <span>0{i + 1}</span>{item.name}<ArrowUpRight />
            </MotionLink>
          ))}
          <div className="mobile-sub">
            <p>Journeys by style</p>
            {navCollections.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`} onClick={() => setOpen(false)}>{c.name}</Link>)}
          </div>
          <div className="mobile-sub">
            <p>Regions</p>
            {navDestinations.map((d) => <Link key={d.slug} href={`/destinations/${d.slug}`} onClick={() => setOpen(false)}>{d.name}</Link>)}
            <Link href="/cities" onClick={() => setOpen(false)}>All city guides</Link>
          </div>
          <Link href="/search" className="mobile-search-link" onClick={() => setOpen(false)}>
            <Search size={21} /><span>Search journeys & places</span><ArrowUpRight />
          </Link>
          <Link href="/plan" onClick={() => setOpen(false)} className="mobile-plan">Plan your journey <ArrowUpRight /></Link>
        </motion.nav>
      )}
    </>
  );
}
