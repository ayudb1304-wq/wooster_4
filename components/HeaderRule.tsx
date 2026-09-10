"use client";

import { useEffect, useState } from "react";

// Motion spec item 2: a hairline bottom rule fades in once scrollY > 8px. 160ms.
// Also flags the header as scrolled (translucent state) and with the theme of the
// section beneath it, so it reads ink over dark sections and paper over light ones.
export function HeaderRule() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const onScroll = () => {
      const past = window.scrollY > 8;
      setScrolled(past);
      if (!header) return;
      // Lets the header switch to its translucent, blurred state via CSS.
      header.setAttribute("data-scrolled", past ? "true" : "false");
      // Sample the section under the header's bottom edge and adopt its palette.
      const probeY = header.offsetHeight;
      let theme = "ink";
      for (const section of document.querySelectorAll<HTMLElement>("[data-section-theme]")) {
        const r = section.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          theme = section.dataset.sectionTheme ?? "ink";
          break;
        }
      }
      header.setAttribute("data-theme", theme);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-paper-muted/30 transition-[opacity,background-color] duration-(--duration-reveal) ease-out group-data-[theme=paper]:bg-ink/15"
      style={{ opacity: scrolled ? 1 : 0 }}
    />
  );
}
