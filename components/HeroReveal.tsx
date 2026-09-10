"use client";

import { useEffect } from "react";
import type gsapType from "gsap";

/*
  The ONE orchestrated load animation (motion spec item 1).
  GSAP is imported dynamically so it ships on the landing route only.
  Base CSS state is the finished state; this island only plays a "from"
  timeline on top of it. Under prefers-reduced-motion nothing runs.
  Timeline budget: 80ms stagger across five copy elements, then the
  screenshot. Total stays under 900ms.
*/
export function HeroReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = document.querySelector<HTMLElement>("[data-hero]");
    if (!section) return;
    const copy = Array.from(
      section.querySelectorAll<HTMLElement>('[data-hero-reveal]:not([data-hero-reveal="screenshot"])'),
    );
    const shot = section.querySelector<HTMLElement>('[data-hero-reveal="screenshot"]');
    if (copy.length === 0 || !shot) return;

    let cancelled = false;
    let tl: ReturnType<typeof gsapType.timeline> | undefined;

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      // GSAP core cannot parse a cubic-bezier string. power3.out is the closest
      // built-in to the token ease (0.22, 1, 0.36, 1).
      const stagger =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hero-stagger")) / 1000 ||
        0.08;

      tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(copy, { opacity: 0, y: 16, duration: 0.42, stagger })
        .from(shot, { opacity: 0, y: 24, duration: 0.48 }, `-=${0.42 - stagger}`);
    });

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, []);

  return null;
}
