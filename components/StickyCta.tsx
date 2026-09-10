"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/*
  Sticky bottom bar, mobile and tablet only (hidden at >= 1024px).
  Shows once the hero primary CTA ([data-hero-cta]) has scrolled out above the
  viewport, and hides again when the final CTA button ([data-final-cta]) is in
  view (motion spec items 2b and 9). Slide-up 320ms with the token ease; the
  global reduced-motion rule turns the transition off so the show is instant.
  Base state is hidden via transform so nothing overlaps content without JS.
*/
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");
    if (!heroCta) return;
    const finalCta = document.querySelector<HTMLElement>("[data-final-cta]");

    let heroPassed = false;
    let finalInView = false;
    const update = () => setVisible(heroPassed && !finalInView);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 },
    );
    heroObserver.observe(heroCta);

    let finalObserver: IntersectionObserver | undefined;
    if (finalCta) {
      finalObserver = new IntersectionObserver(
        ([entry]) => {
          finalInView = entry.isIntersecting;
          update();
        },
        { threshold: 0 },
      );
      finalObserver.observe(finalCta);
    }

    return () => {
      heroObserver.disconnect();
      finalObserver?.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-ink-deep px-gutter pt-3 transition-transform duration-(--duration-base) ease-out lg:hidden"
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
        transform: visible ? "translateY(0)" : "translateY(100%)",
      }}
      aria-hidden={!visible}
      data-sticky-cta
    >
      <Button
        full
        nativeButton={false}
        tabIndex={visible ? 0 : -1}
        render={<Link href="/diagnostic" data-placement="sticky" />}
      >
        Start free diagnostic
      </Button>
    </div>
  );
}
