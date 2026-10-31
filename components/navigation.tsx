"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Heart, Menu, Search, X } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { MegaPanel, type MenuId } from "@/components/nav-mega";
import { experiencesMenu, journeysMenu, servicesMenu } from "@/content/catalog/nav";
import { useWishlist } from "@/components/wishlist/provider";

if (typeof window !== "undefined") window.history.scrollRestoration = "manual";
const MotionLink = motion.create(Link);

type Item = { name: string; href: string; menu?: MenuId };
/** Exactly four primary sections (brief v5, section 2). */
const items: Item[] = [
  { name: "Journeys", href: "/journeys", menu: "journeys" },
  { name: "Services", href: "/services", menu: "services" },
  { name: "Experiences", href: "/experiences", menu: "experiences" },
  { name: "Destination Weddings", href: "/wedding-in-varanasi" },
];
const menus = {
  journeys: { groups: journeysMenu, feature: { href: "/journeys", label: "All journeys", image: "/images/library/varanasi-ghats-dawn.webp" } },
  services: { groups: servicesMenu, feature: { href: "/services", label: "All services", image: "/images/library/boat-motor.webp" } },
  experiences: { groups: experiencesMenu, feature: { href: "/experiences", label: "All experiences", image: "/images/library/varanasi-boat-sunrise.webp" } },
};

export function Navigation({ tone = "paper" }: { tone?: "overlay" | "paper" }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const groupId = useId();
  const { count, ready } = useWishlist();
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
  const current = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.href;
  const highlighted = hovered ?? (menu ? items.find((i) => i.menu === menu)?.href : undefined) ?? current;
  const travel = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 34 };
  const solid = tone === "paper" || scrolled || open || menu !== null;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="nav-shell" onPointerLeave={(e) => { if (e.pointerType !== "touch") closeSoon(); }} onPointerEnter={() => window.clearTimeout(closeTimer.current)}>
        <header className={`site-header ${solid ? "is-solid" : ""} ${menu ? "has-menu" : ""}`}>
          <div className="header-inner">
            <Link href="/" className="brand" aria-label="Tourmelloh home"
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
                    <MotionLink key={item.href} href={item.href} {...shared} aria-current={current === item.href ? "page" : undefined}>
                      {body}
                    </MotionLink>
                  );
                })}
              </nav>
            </LayoutGroup>
            <div className="header-actions">
              <Link href="/search" className="nav-search" aria-label="Search journeys, services and experiences"><Search size={20} /></Link>
              <Link href="/your-journey" className="nav-wishlist" aria-label={`My Journey${ready && count ? `, ${count} selected` : ""}`}>
                <Heart size={19} aria-hidden="true" />
                <span className="nav-wishlist-label">My Journey</span>
                {ready && count > 0 && <span className="nav-count">{count}</span>}
              </Link>
              <MotionLink href={ready && count ? "/your-journey" : "/help-me-plan"} className="header-cta" style={{ color: "var(--paper)" }}
                initial="rest" whileHover="hover" whileFocus="hover">
                <motion.span className="nav-cta-fill" aria-hidden="true"
                  variants={{ rest: { y: "105%" }, hover: { y: 0 } }} transition={reduced ? { duration: 0 } : { duration: .28, ease: [.2, .7, .2, 1] }} />
                <span className="nav-cta-label"><span className="nav-plan-full">Plan Your Journey</span><span className="nav-plan-short">Plan</span></span>
                <ArrowUpRight className="nav-cta-arrow" size={17} />
              </MotionLink>
              <button className="menu-toggle" ref={toggle} aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
                {open ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </header>
        {(Object.keys(menus) as MenuId[]).map((id) => (
          <MegaPanel key={id} id={id} open={menu === id} groups={menus[id].groups} feature={menus[id].feature} onNavigate={() => setMenu(null)} />
        ))}
      </div>
      {menu && <div className="mega-scrim" aria-hidden="true" onClick={() => setMenu(null)} />}
      {open && (
        <motion.nav ref={mobile} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"
          initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .22 }}>
          {items.map((item, i) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={current === item.href ? "page" : undefined}>
              <span>0{i + 1}</span>{item.name}<ArrowUpRight />
            </Link>
          ))}
          <div className="mobile-sub">
            <p>Specialist collections</p>
            {journeysMenu[3].links.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.name}</Link>)}
          </div>
          <div className="mobile-sub">
            <p>Comfort tiers</p>
            {journeysMenu[2].links.slice(0, 3).map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.name}</Link>)}
          </div>
          <Link href="/your-journey" className="mobile-search-link" onClick={() => setOpen(false)}>
            <Heart size={20} /><span>My Journey{ready && count ? ` (${count})` : ""}</span><ArrowUpRight />
          </Link>
          <Link href="/search" className="mobile-search-link" onClick={() => setOpen(false)}>
            <Search size={20} /><span>Search</span><ArrowUpRight />
          </Link>
          <Link href="/help-me-plan" onClick={() => setOpen(false)} className="mobile-plan">Plan Your Journey <ArrowUpRight /></Link>
        </motion.nav>
      )}
    </>
  );
}
