"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, useReducedMotion } from "framer-motion";

const controls = ".button, .tour-primary, .save-button, .film-control, .filter-chip, .category-tabs button, .hero-explore, .text-link, .journey-detail-link, .chapter-photo-note a";

export function InterfaceInteractions() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const touched = new Set<HTMLElement>();
    const find = (target: EventTarget | null) => target instanceof Element ? target.closest<HTMLElement>(controls) : null;
    function move(element: HTMLElement, active: boolean, pressed = false) {
      touched.add(element);
      element.toggleAttribute("data-ui-active", active);
      animations.get(element)?.stop();
      const arrow = element.querySelector<HTMLElement>(".lucide-arrow-up-right, .lucide-arrow-right, .lucide-arrow-down");
      if (reduced !== false) return;
      animations.set(element, animate(element, { y: active && !pressed ? -3 : 0, scale: pressed ? 0.97 : 1 }, { duration: 0.22, ease: [0.22, 1, 0.36, 1] }));
      if (arrow) {
        animations.get(arrow)?.stop();
        animations.set(arrow, animate(arrow, { x: active && !arrow.classList.contains("lucide-arrow-down") ? 3 : 0, y: active ? (arrow.classList.contains("lucide-arrow-down") ? 3 : -3) : 0 }, { duration: 0.25 }));
      }
    }
    function enter(event: PointerEvent) {
      const element = find(event.target);
      if (!element || !finePointer.matches || element.contains(event.relatedTarget as Node | null)) return;
      move(element, true);
    }
    function leave(event: PointerEvent) {
      const element = find(event.target);
      if (!element || element.contains(event.relatedTarget as Node | null)) return;
      move(element, element.matches(":focus-visible"));
    }
    function focus(event: FocusEvent) { const element = find(event.target); if (element?.matches(":focus-visible")) move(element, true); }
    function blur(event: FocusEvent) { const element = find(event.target); if (element) move(element, finePointer.matches && element.matches(":hover")); }
    function press(event: PointerEvent) { const element = find(event.target); if (element) move(element, true, true); }
    function release(event: PointerEvent) { const element = find(event.target); if (element) move(element, (finePointer.matches && element.matches(":hover")) || element.matches(":focus-visible")); }
    document.addEventListener("pointerover", enter);
    document.addEventListener("pointerout", leave);
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", release);
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", blur);
    return () => {
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("focusout", blur);
      animations.forEach(animation => animation.stop());
      touched.forEach(element => { element.removeAttribute("data-ui-active"); element.style.removeProperty("transform"); element.querySelectorAll<HTMLElement>("svg").forEach(arrow => arrow.style.removeProperty("transform")); });
    };
  }, [pathname, reduced]);
  return null;
}
