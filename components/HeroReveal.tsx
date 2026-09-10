"use client";

import { useEffect } from "react";
import type gsapType from "gsap";

/*
  The ONE orchestrated load animation (motion spec item 1).
  GSAP is imported dynamically so it ships on the landing route only.
  Base CSS state is the finished state; this island plays a fromTo timeline
  with explicit end values so an interrupted run can never leave anything
  hidden, and gsap.context().revert() strips every inline style on cleanup
  and on completion. Under prefers-reduced-motion nothing runs.
  Budget: 80ms stagger across the copy, then the screenshot. Under 900ms total.
*/
export function HeroReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A hidden tab has no animation frames. Render finished and skip the timeline.
    if (document.hidden) return;

    const section = document.querySelector<HTMLElement>("[data-hero]");
    if (!section) return;
    const copy = Array.from(
      section.querySelectorAll<HTMLElement>('[data-hero-reveal]:not([data-hero-reveal="screenshot"])'),
    );
    const shot = section.querySelector<HTMLElement>('[data-hero-reveal="screenshot"]');
    if (copy.length === 0 || !shot) return;

    let cancelled = false;
    let ctx: ReturnType<typeof gsapType.context> | undefined;
    // Safety net: whatever happens to the frame loop, the finished state is
    // restored well inside the reveal budget plus a margin.
    const failsafe = window.setTimeout(() => ctx?.revert(), 1500);

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const stagger =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hero-stagger")) / 1000 ||
        0.08;

      ctx = gsap.context(() => {
        // power3.out is the closest built-in to the token ease (0.22, 1, 0.36, 1).
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => ctx?.revert(),
        });
        tl.fromTo(copy, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.42, stagger }).fromTo(
          shot,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.48 },
          `-=${0.42 - stagger}`,
        );
      }, section);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      ctx?.revert();
    };
  }, []);

  return null;
}
