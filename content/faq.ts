// Copy: content/copy.md → Guarantee + FAQ → FAQ. Verbatim.
// "[25] minutes" is a founder-confirmed value. The FAQPage JSON-LD is generated
// from this same array, so schema and visible copy cannot drift.
export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  { q: "Is the diagnostic really free?", a: "Yes. No card, no catch. You see your full plan." },
  { q: "How long does it take?", a: "About 25 minutes. You get your plan immediately." },
  { q: "Is it built for the digital SAT?", a: "Yes, every question matches the current format." },
  { q: "Is it for parents or students?", a: "Students use it. Parents see the same plan and projection." },
  { q: "What if it doesn't work for me?", a: "The 7-day guarantee covers you." },
];
