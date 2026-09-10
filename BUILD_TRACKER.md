# Wooster landing page: build tracker

Source of truth for progress. Update this file whenever a step is started, finished, or blocked.
Prompts live in `wooster_revamp_docs/build-prompts.md`. Rules live in `wooster_revamp_docs/CLAUDE.md`.

Status legend: `[ ]` not started, `[~]` in progress, `[x]` done and verified, `[!]` blocked (say why in Notes).

Last updated: 2026-09-10

## Summary

| # | Step | Status | Verified 390px | Verified 1440px | Reduced motion | Notes |
|---|------|--------|----------------|-----------------|----------------|-------|
| P | Pre-work (repo scaffold, docs in place, references, tooling) | [ ] | n/a | n/a | n/a | |
| 00 | Setup: fonts, globals.css, tailwind, shadcn, layouts, shot script | [ ] | [ ] | [ ] | n/a | |
| 01 | Header + sticky mobile CTA | [ ] | [ ] | [ ] | [ ] | |
| 02 | Hero | [ ] | [ ] | [ ] | [ ] | |
| 03 | Problem / ROI comparison | [ ] | [ ] | [ ] | [ ] | |
| 04 | How it works | [ ] | [ ] | [ ] | [ ] | |
| 05 | Video | [ ] | [ ] | [ ] | n/a | |
| 06 | Proof | [ ] | [ ] | [ ] | n/a | |
| 07 | Testimonials | [ ] | [ ] | [ ] | [ ] | |
| 08 | Pricing | [ ] | [ ] | [ ] | n/a | |
| 09 | Guarantee + FAQ | [ ] | [ ] | [ ] | n/a | |
| 10 | Final CTA + footer + page assembly | [ ] | [ ] | [ ] | n/a | |
| 11 | Hardening: analytics, schema, perf, a11y, metadata | [ ] | [ ] | [ ] | [ ] | |

Progress: 0 / 13 steps done.

## Detailed checklist

### P. Pre-work (before prompt 00)
- [ ] Create Next.js (App Router) + Tailwind project at repo root
- [ ] Copy `CLAUDE.md` to repo root
- [ ] Move `design-tokens.ts` to `app/design-tokens.ts`
- [ ] Move `copy.md` to `content/copy.md`
- [ ] Add 1 to 2 reference screenshots to `/design/reference/`
- [ ] Product screenshots in `/public/screens/` (diagnostic.png, roi-plan.png, progress.png)
- [ ] Video poster + captions file (`/public/video/moneyball.vtt`) and `NEXT_PUBLIC_VIDEO_URL`
- [ ] Install Frontend Design plugin, Playwright MCP, shadcn MCP
- [ ] `git init` and first commit

### 00. Setup
- [ ] Fonts via next/font/google: Fraunces (300, 600, opsz + WONK), Schibsted Grotesk (400, 600), JetBrains Mono (500), display swap
- [ ] CSS variables `--font-fraunces`, `--font-schibsted`, `--font-jetbrains`
- [ ] `app/globals.css`: one variable per token, base body styles, 68ch measure, reduced-motion kill switch
- [ ] `tailwind.config` reads token variables (ink, paper, signal, display/body/mono, button/screenshot radius)
- [ ] shadcn/ui installed with only button, accordion, carousel
- [ ] Button variants retokened (primary signal fill, secondary outline, 4px radius, 48px min height)
- [ ] `app/(landing)/layout.tsx` with `viewport-fit=cover`
- [ ] `app/layout.tsx` metadata copied from live site
- [ ] Playwright + `npm run shot -- <name>` script writing to `/design/shots/`
- [ ] Verification: scratch page screenshot, fonts loaded, AA contrast, scratch page deleted

### 01. Header + sticky mobile CTA
- [ ] `components/Header.tsx` (server component + client island)
- [ ] Ink-deep bg, 56px mobile / 64px desktop, Fraunces 600 wordmark
- [ ] Desktop links: How it works, Student login, primary CTA. Mobile: wordmark + Student login only
- [ ] `components/StickyCta.tsx`: appears after hero CTA scrolls out, hidden at >= 1024px, safe-area padding
- [ ] Slide-up 320ms, instant under reduced motion
- [ ] All targets >= 48px, signal focus rings
- [ ] Verification: screenshots, bar absent at top and present after hero on mobile

### 02. Hero
- [ ] `components/Hero.tsx`, ink bg, asymmetric 12-col layout, screenshot bleeds right ~10%
- [ ] H1 Fraunces 300 WONK, display1, max 3 lines; lead <= 48ch paper-muted
- [ ] Primary CTA + "Watch 90 sec" text link (anchor #video, no arrow)
- [ ] Proof chip "7-day score-fit guarantee"
- [ ] Screenshot `/public/screens/roi-plan.png`, priority, fetchpriority high, explicit dims, 8px radius, shadow
- [ ] GSAP reveal timeline <= 900ms, dynamic import in client island, skipped under reduced motion
- [ ] min-height 88svh on mobile
- [ ] Verification: screenshots, CTA visible without scrolling at 390x844, Lighthouse mobile LCP reported

### 03. Problem / ROI comparison
- [ ] `components/RoiComparison.tsx`, paper bg, H2 + body cols 1 to 5
- [ ] Two lists cols 6 to 13, breaking upward ~64px across section boundary
- [ ] Chapter order list (6 rows) and Wooster ROI order list with mono figures + "projected"
- [ ] Figure label "Projected gain, from your diagnostic"
- [ ] Rows: hairline rules, 56px tall, no cards
- [ ] GSAP + ScrollTrigger FLIP re-rank at 40% in view, 720ms desktop / 480ms mobile, count-up figures
- [ ] Static final order under reduced motion; base CSS state = final order
- [ ] Verification: before/after screenshots, "projected" on every figure, reduced motion shows final order

### 04. How it works
- [ ] `components/HowItWorks.tsx`, id `how-it-works`, paper bg
- [ ] Bento grid: step 1 tall at left (cols 1 to 5), steps 2 and 3 stacked right (cols 6 to 13)
- [ ] Each step: Fraunces 300 numeral, name body 600, description, lazy screenshot with dims
- [ ] Single CSS scroll-driven opacity animation 0.6 to 1 with fallback, none under reduced motion
- [ ] No icons, no hover effects
- [ ] Verification: screenshots and deltas fixed

### 05. Video
- [ ] `components/ConceptVideo.tsx`, id `video`, ink bg, H2 cols 1 to 5, frame cols 6 to 13
- [ ] Poster image with centered "Play" button
- [ ] On click swap in `<video>` with controls, captions track, preload none, src from `NEXT_PUBLIC_VIDEO_URL`
- [ ] Fire `video_play` event
- [ ] Verification: screenshots, no video bytes before click

### 06. Proof
- [ ] `components/Proof.tsx`, ink bg, H2 + body cols 1 to 7
- [ ] Stat strip: three body 600 items with hairline rule above, no mono, no icons
- [ ] Mount `<Testimonials />` (null when empty)
- [ ] Projection footnote in small paper-muted text
- [ ] Verification: screenshots and deltas fixed

### 07. Testimonials
- [ ] Install solaceui Testimonial Section 3 from 21st.dev, move to `components/Testimonials.tsx`, strip extras
- [ ] Retoken fully: fonts, ink bg, signal only on featured score line, radius 0
- [ ] Featured centre card, flanking cards ~60% width lower contrast
- [ ] `content/testimonials.ts` shipped empty; `content/testimonials.sample.ts` behind `NEXT_PUBLIC_SAMPLE_TESTIMONIALS`
- [ ] Subline, H3 "Reported by students", carousel, card layout with mono score line
- [ ] Mobile ~85vw card with peek, prev/next >= 48px, swipe, keyboard arrows, instant under reduced motion
- [ ] Verification: with flag screenshots; without flag block absent and no "Sample Student" in prod build

### 08. Pricing
- [ ] `components/Pricing.tsx`, id `pricing`, ink bg, H2 + price cols 1 to 6, bullets + CTA cols 7 to 12
- [ ] "$249.99" mono price size, "for two months" beneath
- [ ] Plain bullet list with hairline rules, guarantee bullet links to `#guarantee`
- [ ] Anchor line, primary CTA full width on mobile, button sub text
- [ ] Fire `pricing_view` once at 50% in view
- [ ] Verification: screenshots; guarantee and footnote within one scroll of CTA on mobile

### 09. Guarantee + FAQ
- [ ] `components/Guarantee.tsx` id `guarantee`, signal block with ink text, contrast confirmed
- [ ] `components/Faq.tsx`: restyled Accordion, hairline rules, plus/minus glyph, 48px triggers, keyboard operable
- [ ] FAQPage JSON-LD generated from the same data array
- [ ] Verification: screenshots with one item open; JSON-LD validated

### 10. Final CTA + footer + page assembly
- [ ] `components/FinalCta.tsx`: display1 H2 cols 1 to 9, primary button only
- [ ] `components/Footer.tsx`: wordmark, Privacy/Terms/Disclaimer links, contact email, College Board line
- [ ] `app/(landing)/page.tsx` assembled in fixed section order, one H1, H2 per section, H3 testimonials
- [ ] Verification: full page screenshots; axe clean

### 11. Hardening
- [ ] `lib/analytics.ts` with `track(event, props)`; events wired: diagnostic_start (placement prop), video_play, pricing_view, checkout_start, purchase
- [ ] Schema: Product + Offer, Organization, FAQPage validated
- [ ] Lighthouse mobile: LCP < 2.5s, INP < 200ms, CLS < 0.1; GSAP/Lenis landing route only; fonts two weights max
- [ ] axe clean, keyboard walk-through, focus order, reduced-motion pass on every section
- [ ] Metadata preserved, sitemap.xml, robots index,follow
- [ ] Verification: full page screenshots normal and reduced motion; Lighthouse and axe reports attached

## Metrics (fill in at step 02 and step 11)

| Metric | Target | After 02 | After 11 |
|--------|--------|----------|----------|
| LCP (mobile) | < 2.5s | | |
| INP (mobile) | < 200ms | | |
| CLS (mobile) | < 0.1 | | |
| axe violations | 0 | | |

## Open questions / blockers

- None yet.

## Log

| Date | Step | Change |
|------|------|--------|
| 2026-09-10 | tracker | Created tracker from build-prompts.md. Nothing built yet. |
