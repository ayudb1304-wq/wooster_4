// Wooster SAT Prep — design tokens (single source of truth)
// Mirror every value here as a CSS variable in app/globals.css. Never hardcode in components.

export const color = {
  ink: "#10203A",        // dominant. Backgrounds for hero, proof, pricing, final CTA.
  inkDeep: "#0A1528",    // header, footer, sticky CTA bar.
  paper: "#EEF1F5",      // light sections: problem/ROI, how it works, FAQ.
  paperEdge: "#DDE3EB",  // rules, borders on paper.
  inkMuted: "#5B6B85",   // secondary text on paper.
  paperMuted: "#B8C3D3", // secondary text on ink.
  signal: "#FFC23D",     // ONLY CTAs and score gains. Ink text on signal fills.
  signalDeep: "#E5A81F", // signal hover/pressed.
} as const;

export const font = {
  display: "var(--font-fraunces)",   // Fraunces, weights 300 + 600, opsz auto, WONK 1 on h1/h2
  body: "var(--font-schibsted)",     // Schibsted Grotesk, weights 400 + 600
  mono: "var(--font-jetbrains)",     // JetBrains Mono 500. Score figures and price only.
} as const;

// Type scale — extremes, not timid steps. rem values; line-height paired.
export const type = {
  display1: { size: "clamp(2.75rem, 7vw, 5rem)", lh: 0.95, weight: 300, family: "display" }, // hero H1
  display2: { size: "clamp(2rem, 5vw, 3.5rem)", lh: 1.02, weight: 300, family: "display" },   // section H2
  lead:     { size: "clamp(1.125rem, 1.8vw, 1.375rem)", lh: 1.45, weight: 400, family: "body" },
  body:     { size: "1rem", lh: 1.6, weight: 400, family: "body" },
  small:    { size: "0.875rem", lh: 1.5, weight: 400, family: "body" },
  stat:     { size: "clamp(2rem, 6vw, 4rem)", lh: 1, weight: 500, family: "mono" },          // "+42" / "1240 → 1390"
  statRow:  { size: "clamp(1.5rem, 2.2vw, 2rem)", lh: 1, weight: 500, family: "mono" },      // figures inside 56px list rows
  price:    { size: "clamp(2.5rem, 6vw, 4.5rem)", lh: 1, weight: 500, family: "mono" },
} as const;

// Spacing — 8px base. Section rhythm is intentionally uneven.
export const space = {
  1: "0.5rem", 2: "1rem", 3: "1.5rem", 4: "2rem", 6: "3rem", 8: "4rem", 12: "6rem", 16: "8rem",
  sectionY: { mobile: "4rem", desktop: "7.5rem" },
  gutter: { mobile: "1.25rem", desktop: "4rem" },
  measure: "68ch",
} as const;

export const radius = { button: "4px", input: "4px", screenshot: "8px", card: "0px" } as const;

export const shadow = {
  screenshot: "0 24px 64px -8px rgba(2, 6, 16, 0.7)", // the only shadow on the page. Enough spread to show on the sides
} as const;

export const tap = { minHeight: "48px", gap: "8px" } as const;

export const motion = {
  duration: { fast: "160ms", base: "320ms", reveal: "720ms" },
  ease: { out: "cubic-bezier(0.22, 1, 0.36, 1)", inOut: "cubic-bezier(0.65, 0, 0.35, 1)" },
  heroStagger: "80ms",
  // Everything below is gated by prefers-reduced-motion and disabled on touch for Lenis.
} as const;

export const breakpoint = { sm: 390, md: 768, lg: 1024, xl: 1440 } as const;
