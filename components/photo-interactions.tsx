"use client";

import { useEffect } from "react";
import { animate } from "framer-motion";

const PHOTO = [
  ".atlas-photo",
  ".chapter-photo",
  ".journey-photo",
  ".collection-image",
  ".place-moment-photo",
  ".place-journey-photo",
  ".tour-gallery-photo",
  ".tour-related-photo",
].join(",");
const CARD = ".journey-card,.collection-card,.place-journey-link,.tour-related-card";
const EASE = [0.2, 0.75, 0.25, 1] as const;

type PhotoState = {
  element: HTMLElement;
  image: HTMLImageElement;
  caption: HTMLElement | null;
  pointer: boolean;
  focus: boolean;
  active: boolean;
  imageTransform: string;
  captionTransform: string;
  controls: { stop: () => void }[];
};

/** One controller also covers filtered cards and client-side route changes. */
export function PhotoInteractions() {
  useEffect(() => {
    const photos = new Map<HTMLElement, PhotoState>();
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scanFrame = 0;

    function paint(photo: PhotoState, force = false) {
      const active = photo.pointer || photo.focus;
      if (!force && active === photo.active) return;
      photo.active = active;
      photo.controls.forEach((control) => control.stop());
      photo.element.dataset.photoActive = String(active);
      const still = reducedMotion.matches;
      const options = { duration: still ? 0 : active ? 1.05 : 1.2, ease: EASE };
      photo.controls = [
        animate(photo.image, {
          scale: active && !still ? 1.055 : 1,
          x: active && !still ? 3 : 0,
          y: active && !still ? -3 : 0,
        }, options),
        animate(photo.element, {
          "--photo-frame-opacity": active ? 1 : 0,
        }, { duration: still ? 0 : active ? 0.45 : 0.6, ease: EASE }),
      ];
      if (photo.caption) {
        photo.controls.push(animate(photo.caption, {
          y: active && !still ? -4 : 0,
        }, { duration: still ? 0 : 0.55, ease: EASE }));
      }
    }

    function release(photo: PhotoState) {
      photo.controls.forEach((control) => control.stop());
      photo.image.style.transform = photo.imageTransform;
      delete photo.image.dataset.photoImage;
      if (photo.caption) photo.caption.style.transform = photo.captionTransform;
      delete photo.element.dataset.photoMotion;
      delete photo.element.dataset.photoActive;
      photo.element.style.removeProperty("--photo-frame-opacity");
      photos.delete(photo.element);
    }

    function scan() {
      photos.forEach((photo) => {
        if (!photo.element.isConnected || photo.element.querySelector("img") !== photo.image) {
          release(photo);
        }
      });
      document.querySelectorAll<HTMLElement>(PHOTO).forEach((element) => {
        const image = element.querySelector("img");
        if (!image || photos.has(element)) return;
        const caption = element.querySelector<HTMLElement>(".journey-tag,.collection-image-tag");
        const photo: PhotoState = {
          element, image, caption, pointer: false, focus: false, active: false,
          imageTransform: image.style.transform,
          captionTransform: caption?.style.transform ?? "",
          controls: [],
        };
        element.dataset.photoMotion = "ready";
        element.dataset.photoActive = "false";
        image.dataset.photoImage = "true";
        photos.set(element, photo);
      });
    }

    function find(target: EventTarget | null) {
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>(PHOTO)
        ?? target.closest(CARD)?.querySelector<HTMLElement>(PHOTO);
      return element ? photos.get(element) : undefined;
    }

    function onPointerOver(event: PointerEvent) {
      if (!finePointer.matches || event.pointerType === "touch") return;
      const photo = find(event.target);
      if (!photo || find(event.relatedTarget) === photo) return;
      photo.pointer = true;
      paint(photo);
    }

    function onPointerOut(event: PointerEvent) {
      const photo = find(event.target);
      if (!photo || find(event.relatedTarget) === photo) return;
      photo.pointer = false;
      paint(photo);
    }

    function isLink(target: EventTarget | null) {
      return target instanceof Element && !!target.closest("a[href]");
    }

    function onFocusIn(event: FocusEvent) {
      if (!isLink(event.target)) return;
      const photo = find(event.target);
      if (!photo) return;
      photo.focus = true;
      paint(photo);
    }

    function onFocusOut(event: FocusEvent) {
      const photo = find(event.target);
      if (!photo || (find(event.relatedTarget) === photo && isLink(event.relatedTarget))) return;
      photo.focus = false;
      paint(photo);
    }

    function onPreferenceChange() {
      photos.forEach((photo) => {
        if (!finePointer.matches) photo.pointer = false;
        paint(photo, true);
      });
    }

    scan();
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(scanFrame);
      scanFrame = requestAnimationFrame(scan);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    finePointer.addEventListener("change", onPreferenceChange);
    reducedMotion.addEventListener("change", onPreferenceChange);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(scanFrame);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      finePointer.removeEventListener("change", onPreferenceChange);
      reducedMotion.removeEventListener("change", onPreferenceChange);
      photos.forEach(release);
    };
  }, []);

  return null;
}
