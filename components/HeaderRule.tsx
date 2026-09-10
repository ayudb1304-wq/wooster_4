"use client";

import { useEffect, useState } from "react";

// Motion spec item 2: a hairline bottom rule fades in once scrollY > 8px. 160ms.
// Also flags the header as scrolled so it turns translucent (founder request).
export function HeaderRule() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const onScroll = () => {
      const past = window.scrollY > 8;
      setScrolled(past);
      // Lets the header switch to its translucent, blurred state via CSS.
      header?.setAttribute("data-scrolled", past ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-paper-muted/30 transition-opacity duration-fast ease-out"
      style={{ opacity: scrolled ? 1 : 0 }}
    />
  );
}
