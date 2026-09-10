# Wooster landing page: build tracker

Source of truth for progress. Update this file whenever a step is started, finished, or blocked.
Prompts live in `wooster_revamp_docs/build-prompts.md`. Rules live in `wooster_revamp_docs/CLAUDE.md`.

Status legend: `[ ]` not started, `[~]` in progress, `[x]` done and verified, `[!]` blocked (say why in Notes).

Last updated: 2026-09-10 (afternoon)

## Summary

| # | Step | Status | Verified 390px | Verified 1440px | Reduced motion | Notes |
|---|------|--------|----------------|-----------------|----------------|-------|
| P | Pre-work (repo scaffold, docs in place, references, tooling) | [~] | n/a | n/a | n/a | Code side done. Still need: reference screenshots, product screenshots, video poster + vtt, MCP plugins |
| 00 | Setup: fonts, globals.css, tailwind, shadcn, layouts, shot script | [x] | [x] | [x] | n/a | Verified by hand on /scratch. Scratch page deleted. |
| 01 | Header + sticky mobile CTA | [x] | [x] | [x] | [ ] | Checked by hand. Header made sticky after user feedback. Reduced-motion pass still to do. |
| 02 | Hero | [~] | [x] | [x] | [ ] | Verified in Chrome at 390 and 1920 with real screenshot. Reveal made failsafe. Awaiting user sign-off and reduced-motion pass. |
| 03 | Problem / ROI comparison | [ ] | [ ] | [ ] | [ ] | |
| 04 | How it works | [ ] | [ ] | [ ] | [ ] | |
| 05 | Video | [ ] | [ ] | [ ] | n/a | |
| 06 | Proof | [ ] | [ ] | [ ] | n/a | |
| 07 | Testimonials | [ ] | [ ] | [ ] | [ ] | |
| 08 | Pricing | [ ] | [ ] | [ ] | n/a | |
| 09 | Guarantee + FAQ | [ ] | [ ] | [ ] | n/a | |
| 10 | Final CTA + footer + page assembly | [ ] | [ ] | [ ] | n/a | |
| 11 | Hardening: analytics, schema, perf, a11y, metadata | [ ] | [ ] | [ ] | [ ] | |

Progress: 2 / 13 steps done (P partly, 02 awaiting manual check).

## Detailed checklist

### P. Pre-work (before prompt 00)
- [x] Create Next.js (App Router) + Tailwind project at repo root (Next 16.3, Tailwind v4, React 19)
- [x] Copy `CLAUDE.md` to repo root
- [x] Copy `design-tokens.ts` to `app/design-tokens.ts`
- [x] Copy `copy.md` to `content/copy.md`
- [ ] Add 1 to 2 reference screenshots to `/design/reference/` (live logo JPEG and live OG image saved there for reference)
- [x] Product screenshots in `/public/screens/`: roi-plan.png = Concept Library (1138x932), progress.png = Stats dashboard (1028x922), diagnostic.png = Practice Exams page (1120x875, closest available; a real diagnostic question screen would be better). Originals in `design/reference/app/`
- [ ] Video poster + captions file (`/public/video/moneyball.vtt`) and `NEXT_PUBLIC_VIDEO_URL`
- [!] Install Frontend Design plugin, Playwright MCP, shadcn MCP (Playwright does not run here; user checks visually by hand)
- [x] `git init` and first commit

### 00. Setup
- [x] Fonts via next/font/google in `app/fonts.ts`: Fraunces variable with opsz + WONK axes, Schibsted Grotesk 400/600, JetBrains Mono 500, display swap
- [x] CSS variables `--font-fraunces`, `--font-schibsted`, `--font-jetbrains`
- [x] `app/globals.css`: one variable per token, base body styles, 68ch measure, reduced-motion kill switch
- [x] Tailwind v4 has no config file; `@theme inline` in globals.css maps tokens to utilities (bg-ink, text-signal, font-display, rounded-button, shadow-screenshot, text-display1, etc.) and wipes the default palette, fonts, radii and shadows
- [x] shadcn/ui installed with only button, accordion, carousel (base-nova style; tw-animate-css removed)
- [x] Button variants retokened: primary (signal fill, ink text), secondary with tone onPaper / onInk, icon size for carousel, 4px radius, 48px min height, signal focus ring
- [x] `app/(landing)/layout.tsx` with `viewport-fit=cover`; placeholder `app/(landing)/page.tsx`
- [x] `app/layout.tsx` metadata copied from live site (title, description, OG, Twitter). Title em dash replaced with a colon per house style; revert if SEO continuity matters more
- [~] Playwright + `npm run shot -- <name> [route]` script in `scripts/shot.mjs`. Installed but the headless browser times out on this machine; user verifies manually for now
- [x] Verification: scratch page checked by hand at 390px and 1440px, fonts confirmed, then deleted

### 01. Header + sticky mobile CTA
- [x] `components/Header.tsx` (server component) + `components/HeaderRule.tsx` client island for the scroll hairline
- [x] Ink-deep bg, 56px mobile / 64px desktop. Wordmark is the real logo from woosterprep.com (`components/Logo.tsx`, paper and ink PNGs in `public/brand/`) instead of Fraunces text
- [x] Desktop links: How it works, Student login, primary CTA. Mobile: wordmark + Student login only
- [x] `components/StickyCta.tsx`: watches `[data-hero-cta]`, hides when `[data-final-cta]` is in view, hidden at >= 1024px, safe-area padding
- [x] Slide-up 320ms token ease, instant under reduced motion (global kill switch)
- [x] All targets >= 48px, signal focus rings
- [x] Verification: checked by hand at 390px and 1440px. Header changed to sticky top after feedback that it scrolled away

### 02. Hero
- [x] `components/Hero.tsx`, ink bg, asymmetric 12-col layout (copy cols 1 to 7, screenshot from col 8 sized 48vw so it bleeds off the right edge at every desktop width), 12% bleed on mobile
- [x] H1 Fraunces 300 WONK, display1, three lines at desktop (display1 cap lowered from 6rem to 5rem in the tokens to make that true); lead <= 48ch paper-muted
- [x] Primary CTA (`data-hero-cta`, placement hero) + "Watch 90 sec" text link (anchor #video, no arrow, 4px underline offset)
- [x] Proof chip "7-day score-fit guarantee". Spec said ink-muted text; that fails AA on ink, so paper-muted is used
- [x] Screenshot `/public/screens/roi-plan.png` is the real Concept Library screen (1138x932). next/image, priority, fetchpriority high, explicit dims, 8px radius, shadow. Resolution is about 1.3x at 1440px; a 2x capture would be sharper
- [x] GSAP reveal in `components/HeroReveal.tsx`: dynamic import, fromTo with explicit end values, gsap.context revert on cleanup and completion, skipped when the tab is hidden, 1.5s failsafe restores the finished state. Ease is power3.out (GSAP core cannot read the cubic-bezier token). An earlier from() version could stall and hide the screenshot; fixed
- [x] min-height 88svh on mobile, none on desktop
- [x] Verification in Chrome via MCP: CTA above the fold at 390x844, three-line H1 at desktop, real screenshot renders, bleed works. Lighthouse LCP deferred to step 11. Reduced-motion pass pending

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

- Playwright headless Chromium hangs on page.goto on this machine. Visual checks are done through the Claude in Chrome extension instead, plus the dev-only `/preview` route that frames the page at 390 and 1024.
- Next 16 caches optimized images under `.next/dev/cache/images`. After replacing a file in `public/`, delete that folder or the browser keeps getting the old image.
- Assets still needed from the founder: design reference screenshots, video poster, captions file. A true diagnostic question screenshot and 2x captures of all screens would improve steps 02 and 04.
- Current video lives on S3 Singapore: https://wooster-concept-videos.s3.ap-southeast-1.amazonaws.com/Landing/Wooster_Prep_The_Moneyball_of_SAT_updated_06-16-2026_with_captions.mp4. Must move to Vercel Blob or Cloudflare before step 05; captions are burned in, a separate .vtt is still needed.
- Live OG image is off-brand (blue, sans). Generate a new one in step 11.
- Title metadata: em dash from live site replaced with a colon. Confirm.

## Log

| Date | Step | Change |
|------|------|--------|
| 2026-09-10 | tracker | Created tracker from build-prompts.md. Nothing built yet. |
| 2026-09-10 | P | Scaffolded Next 16 + Tailwind v4 at repo root, placed CLAUDE.md, tokens, copy. git init, first commit. |
| 2026-09-10 | 00 | Fonts, globals.css tokens, shadcn button/accordion/carousel retokened, layouts, metadata, shot script, scratch page. Awaiting manual visual check. |
| 2026-09-10 | 00 | Verified by hand. Scratch page deleted. Done. |
| 2026-09-10 | 01 | Header, HeaderRule, StickyCta built. Page assembled with a temporary hero placeholder. Awaiting manual check. |
| 2026-09-10 | 01 | Pulled the real logo from woosterprep.com, made transparent paper and ink PNGs, used in header via Logo component. |
| 2026-09-10 | 01 | User checked. Header made sticky. Done. |
| 2026-09-10 | 02 | Hero, HeroReveal (GSAP), placeholder roi-plan.png. Page assembled with a paper scroll placeholder for step 03. Awaiting manual check. |
| 2026-09-10 | P/02 | Real app screenshots added by user. Mapped to roi-plan, diagnostic, progress. Hero now uses the real Concept Library image. |
| 2026-09-10 | 02 | User could not see the screenshot. Two causes: stale Next image cache, and a GSAP from() stall. Both fixed. H1 trimmed to three lines, bleed reworked, /preview route added. Verified in Chrome at 390 and 1920. |
