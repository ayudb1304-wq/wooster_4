"use client";

import { useEffect } from "react";

/*
  The ROI re-rank (motion spec item 3). The one performer on the page.

  Base DOM order is the final ROI order with figures at N, so no-JS and
  reduced-motion visitors see the finished state. With JS and motion allowed:
  1. Rows are reordered into chapter order and figures set to 0 (initial visible state).
  2. Desktop (pointer, >= 1024px): ScrollTrigger pins the whole section (start "top 15%",
     end "+=80%"). Scroll progress 0 to 0.6 drives the FLIP re-order, 0.3 to 1 the
     count-up. Once progress hits 1 the state is frozen; scrolling back does not reverse.
  3. Mobile / touch: no pin. At 40% in view the same timeline plays once at 480ms.
  The left "Chapter order" list never moves.
*/
export function RoiRerank() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = document.querySelector<HTMLElement>("[data-roi-section]");
    const block = section?.querySelector<HTMLElement>("[data-roi-block]");
    const list = section?.querySelector<HTMLElement>("[data-roi-list]");
    if (!section || !block || !list) return;

    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-roi-row]"));
    const figures = rows.map((r) => r.querySelector<HTMLElement>("[data-roi-figure]")!);
    const targets = figures.map((f) => Number(f.dataset.value));
    if (rows.length === 0) return;

    const byAttr = (attr: string) => (a: HTMLElement, b: HTMLElement) =>
      Number(a.getAttribute(attr)) - Number(b.getAttribute(attr));
    const setFigures = (values: number[]) =>
      figures.forEach((f, i) => (f.textContent = `+${Math.round(values[i])}`));

    // Step 1: initial visible state.
    rows
      .slice()
      .sort(byAttr("data-chapter-index"))
      .forEach((r) => list.appendChild(r));
    setFigures(targets.map(() => 0));

    const isDesktop =
      window.matchMedia("(min-width: 1024px)").matches && window.matchMedia("(pointer: fine)").matches;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/Flip")]).then(
      ([{ gsap }, { ScrollTrigger }, { Flip }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger, Flip);

        let done = false;
        const complete = () => {
          if (done) return;
          done = true;
          window.dispatchEvent(new CustomEvent("roi_rerank_complete"));
        };

        // Build the timeline lazily: Flip needs the DOM to move at build time.
        const build = () => {
          const state = Flip.getState(rows);
          rows
            .slice()
            .sort(byAttr("data-roi-index"))
            .forEach((r) => list.appendChild(r));
          const flip = Flip.from(state, { duration: 0.6, ease: "power3.inOut" });
          const counter = { v: 0 };
          const tl = gsap.timeline({ paused: true, onComplete: complete });
          tl.add(flip, 0).to(
            counter,
            {
              v: 1,
              duration: 0.7,
              ease: "power2.out",
              onUpdate: () => setFigures(targets.map((t) => t * counter.v)),
            },
            0.3,
          );
          return tl;
        };

        let tl: ReturnType<typeof gsap.timeline> | undefined;

        const trigger = ScrollTrigger.create(
          isDesktop
            ? {
                trigger: section,
                start: "top 15%",
                end: "+=80%",
                pin: section,
                pinSpacing: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                  tl ??= build();
                  if (done) return;
                  tl.progress(self.progress);
                  if (self.progress >= 1) complete();
                },
              }
            : {
                trigger: block,
                start: "top 60%",
                once: true,
                onEnter: () => {
                  tl ??= build();
                  tl.totalDuration(0.48).play();
                },
              },
        );

        cleanup = () => {
          trigger.kill();
          tl?.kill();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup?.();
      // Restore the finished base state.
      rows
        .slice()
        .sort(byAttr("data-roi-index"))
        .forEach((r) => list.appendChild(r));
      setFigures(targets);
    };
  }, []);

  return null;
}
