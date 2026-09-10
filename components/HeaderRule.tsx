"use client";

import { useEffect, useState } from "react";

// Motion spec item 2: a hairline bottom rule fades in once scrollY > 8px. 160ms.
// The rule is the only thing that moves; the header itself is static.
export function HeaderRule() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
