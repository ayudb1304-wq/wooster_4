# Wooster SAT Prep — Landing Page

## Project
Next.js (App Router) + Tailwind + shadcn/ui, deployed on Vercel. One marketing landing page at `/`.
Primary goal: visitor starts the free diagnostic (`/diagnostic`). Secondary: watch the 90-sec video, view pricing.
Audience: college-bound US high-schoolers and the parents paying. Every line must work for both.
Copy lives in `content/copy.md` and is final. Do not rewrite, expand, or add copy. Whole page ≈ 380 words.

## Fixed decisions (do not revisit)
- Section order: header → hero → problem/ROI comparison → how it works (3 steps) → video → proof → pricing → guarantee + FAQ → final CTA + footer.
- Motion: native CSS scroll-driven animations first. GSAP + ScrollTrigger and Lenis only for (a) the hero reveal and (b) the ROI re-rank. Embla (via shadcn Carousel) for testimonials. No Three.js, no Motion/Framer.
- Libraries load on the landing route only. Anything else added must be justified in the PR description.
- "+42 pts" style figures are model projections. Always label them "projected". Never present as results.
- Real proof only. Testimonials render from `content/testimonials.ts` and return null when empty. No sample text in production.

## Design system
Tokens are the single source of truth: `app/design-tokens.ts` and the CSS variables in `app/globals.css`. Never hardcode a color, font, radius, or spacing value.

Direction: editorial / analytical. A sports-analytics magazine spread meets a serious study tool. Confident, data-forward, a little contrarian. Spend boldness in one place: the ROI re-rank is the memorable moment; everything else stays quiet.

Typography
- Display: Fraunces (variable; opsz high, WONK 1 on headlines). Body: Schibsted Grotesk. Numbers: JetBrains Mono, used ONLY for score figures and the price, never for small labels or eyebrows.
- Hierarchy through extremes: display 300 vs body 500, size jumps 3x+. Line length under 70ch.
- Self-host with next/font, two weights per family max, display: swap.

Color
- Ink `#10203A` dominant, Paper `#EEF1F5` for light sections, Signal `#FFC23D` for CTAs and score gains, Ink text on Signal fills. Full set in tokens.
- Score deltas and CTAs are the ONLY uses of Signal.

Layout
- Left-aligned by default. Asymmetric two-column hero (copy left, product screenshot right, screenshot bleeds off the right edge).
- One grid-breaking moment: the ROI comparison overlaps the section boundary.
- Radius: 4px on buttons and inputs, 8px on product screenshots, 0 elsewhere.
- Shadows: none, except one soft lift under product screenshots.

## FORBIDDEN (anti-slop, applies to every file)
Inter, Roboto, Open Sans, Lato, Arial, Geist, system fonts. Purple→blue gradients, gradient washes as decoration, glassmorphism. Cream `#F4F1EA`-style backgrounds with terracotta accents. Centered-everything hero. Three identical rounded cards. Icon grids as content, default Lucide icon rows. ALL-CAPS tracked eyebrow labels. Meta strings joined with middle dots. Arrows appended to button text. Accenting a single word of a headline in a different color. Fade-and-slide-up on every section. Hover lift on every card. Stock photos of teens with laptops. Copy like "transform your learning", "unlock your potential", "supercharge".

## Mobile (design for 390px first)
- Sticky bottom CTA bar "Start free diagnostic" appears once the hero CTA scrolls out; respects `env(safe-area-inset-bottom)`; `viewport-fit=cover`.
- Tap targets ≥48px tall, full-width primary buttons, ≥8px between targets. No hover-only interactions.
- Lenis off on touch devices. Under `prefers-reduced-motion` all motion is static; the base state is the finished state.

## Performance and accessibility (non-negotiable)
- LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile. Hero screenshot is the LCP element: next/image AVIF/WebP, explicit width/height, `priority` + `fetchpriority="high"`.
- Server Components by default; `"use client"` only where a hook is needed.
- Video: click-to-play poster, lazy loaded, captions. Hosted on Vercel Blob / Cloudflare (not the Singapore S3 bucket).
- WCAG 2.2 AA contrast, visible focus rings, keyboard-navigable carousel and FAQ, one H1, logical heading order, descriptive alt text.
- Schema: Product + Offer ($249.99), Organization, FAQPage as JSON-LD in `app/layout.tsx`.

## Verification (after every section)
1. `npm run dev`, screenshot at 390px and 1440px with Playwright.
2. Compare to the reference image in `/design/reference/`.
3. List deltas in typography scale, color, spacing, structure. Fix. Screenshot again. Two passes max.
4. Toggle `prefers-reduced-motion` and confirm the section is complete and static.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
