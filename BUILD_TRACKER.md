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
| 02 | Hero | [x] | [x] | [x] | [ ] | User signed off. Reduced-motion pass still to do. |
| 03 | Problem / ROI comparison | [x] | [x] | [x] | [ ] | Signed off after pin and overlap changes. Reduced-motion pass still to do. |
| 04 | How it works | [x] | [x] | [x] | [ ] | Signed off implicitly (user moved on). Reduced-motion pass still to do. |
| 05 | Video | [x] | [ ] | [x] | n/a | Signed off implicitly. Open items: hosting move, real captions, the 90-second claim. 390 check pending. |
| 06 | Proof | [x] | [ ] | [x] | n/a | Signed off implicitly. 390 check pending. |
| 07 | Testimonials | [~] | [ ] | [x] | [ ] | Rebuilt on the 21st.dev Circular Testimonials component (founder supplied), retokened, Framer replaced with CSS. Lottie accent kept. Visible in dev via sample flag. Awaiting sign-off. |
| 08 | Pricing | [ ] | [ ] | [ ] | n/a | |
| 09 | Guarantee + FAQ | [ ] | [ ] | [ ] | n/a | |
| 10 | Final CTA + footer + page assembly | [ ] | [ ] | [ ] | n/a | |
| 11 | Hardening: analytics, schema, perf, a11y, metadata | [ ] | [ ] | [ ] | [ ] | |

Progress: 7 / 13 steps done (P partly, 07 awaiting sign-off).

## Detailed checklist

### P. Pre-work (before prompt 00)
- [x] Create Next.js (App Router) + Tailwind project at repo root (Next 16.3, Tailwind v4, React 19)
- [x] Copy `CLAUDE.md` to repo root
- [x] Copy `design-tokens.ts` to `app/design-tokens.ts`
- [x] Copy `copy.md` to `content/copy.md`
- [ ] Add 1 to 2 reference screenshots to `/design/reference/` (live logo JPEG and live OG image saved there for reference)
- [x] Product screenshots in `/public/screens/`: roi-plan.png = Concept Library (1138x932), progress.png = Stats dashboard (1028x922, also the hero image since 2026-09-10), diagnostic.png = Practice Exams page (1120x875, closest available; a real diagnostic question screen would be better). Originals in `design/reference/app/`
- [~] Video: founder supplied `public/video/moneyball.mp4` (76MB, 1920x1080, 4m24s, captions burned in). Git-ignored. Poster cut at 3.5s (caption-free frame) with ffmpeg (imageio-ffmpeg) to `public/video/poster.jpg`. `moneyball.vtt` is a placeholder. `NEXT_PUBLIC_VIDEO_URL=/video/moneyball.mp4` in `.env.local` for dev only
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
- [x] `components/Header.tsx` (server component) + `components/HeaderRule.tsx` client island. Founder additions 2026-09-10: header is sticky, turns translucent with backdrop blur after 8px, and adopts the palette of the section under it (ink over dark sections, paper with the ink logo over light ones). EVERY SECTION MUST CARRY `data-section-theme="ink"` or `"paper"` for this to work. Header CTA uses the small button size
- [x] Ink-deep bg, 56px mobile / 64px desktop. Wordmark is the real logo from woosterprep.com (`components/Logo.tsx`, paper and ink PNGs in `public/brand/`) instead of Fraunces text
- [x] Desktop links: How it works, Student login, primary CTA. Mobile: wordmark + Student login only
- [x] `components/StickyCta.tsx`: watches `[data-hero-cta]`, hides when `[data-final-cta]` is in view, hidden at >= 1024px, safe-area padding
- [x] Slide-up 320ms token ease, instant under reduced motion (global kill switch)
- [x] All targets >= 48px, signal focus rings
- [x] Verification: checked by hand at 390px and 1440px. Header changed to sticky top after feedback that it scrolled away

### 02. Hero
- [x] `components/Hero.tsx`, ink bg, asymmetric 12-col layout (copy cols 1 to 7, screenshot cols 8 to 12). The screenshot bleeds off the right edge (48vw from col 8) and an ink gradient over the right 16vw of the hero (22vw on mobile) fades it out so the cut is soft. Founder request 2026-09-10. The shadow token was also deepened
- [x] H1 Fraunces 300 WONK, display1, three lines at desktop (display1 cap lowered from 6rem to 5rem in the tokens to make that true); lead <= 48ch paper-muted
- [x] Primary CTA (`data-hero-cta`, placement hero) + "Watch 90 sec" text link (anchor #video, no arrow, 4px underline offset)
- [x] Proof chip "7-day score-fit guarantee". Spec said ink-muted text; that fails AA on ink, so paper-muted is used
- [x] Screenshot `/public/screens/roi-plan.png` is the real Concept Library screen (1138x932). next/image, priority, fetchpriority high, explicit dims, 8px radius, shadow. Resolution is about 1.3x at 1440px; a 2x capture would be sharper
- [x] GSAP reveal in `components/HeroReveal.tsx`: dynamic import, fromTo with explicit end values, gsap.context revert on cleanup and completion, skipped when the tab is hidden, 1.5s failsafe restores the finished state. Ease is power3.out (GSAP core cannot read the cubic-bezier token). An earlier from() version could stall and hide the screenshot; fixed
- [x] min-height 88svh on mobile, none on desktop
- [x] Verification in Chrome via MCP: CTA above the fold at 390x844, three-line H1 at desktop, real screenshot renders, bleed works. Lighthouse LCP deferred to step 11. Reduced-motion pass pending

### 03. Problem / ROI comparison
- [x] `components/RoiComparison.tsx`, paper bg, H2 + body cols 1 to 5. Rows come from `content/roi.ts`
- [x] Two lists cols 6 to 13. The spec called for the block to break upward 64px into the hero; the founder saw it as an overlap bug and asked for it removed, so the section now starts cleanly below the hero (decision 2026-09-10)
- [x] Chapter order list (6 rows) and Wooster ROI order list with mono stat figures in signal + "projected"
- [x] Figure label "Projected gain, from your diagnostic"
- [x] Rows: hairline rules, exactly 56px in both lists so the rules line up, names never wrap, figures right-aligned on a fixed width. New token `statRow` (clamp 1.5rem to 2rem) for figures inside rows; the full `stat` size broke the rows
- [x] `components/RoiRerank.tsx`: GSAP + ScrollTrigger + Flip. Follows motion-spec.md rather than the prompt: desktop pins the whole section (top 15%, +80%) and scroll progress drives FLIP (0 to 0.6) and count-up (0.3 to 1), frozen once complete; touch or < 1024px plays once at 480ms at 40% in view. Fires `roi_rerank_complete`. Seen completing at desktop once the tab was visible
- [x] Base DOM order is the final ROI order with figures at N; JS rearranges to chapter order only when motion is allowed
- [~] Verification: initial state and final state confirmed at desktop, stacked layout confirmed at 390. Reduced-motion check pending

### 04. How it works
- [x] `components/HowItWorks.tsx`, id `how-it-works`, paper bg, data-section-theme paper
- [x] Layout changed again at founder request: the 21st.dev Elastic Gallery (`components/ui/elastic-gallery.tsx`, retokened, sentence case, props-driven). The active step expands to show its screenshot with number, name and description; the other two collapse to dimmed strips with a rotated label. Hover, click or focus switches. Step 1 opens first. All three step texts are also listed under the gallery with hairline rules
- [x] Each step: Fraunces 300 display2 numeral in ink-muted, name body 600 (h3 with sr-only step label), description, lazy screenshot with dims, 8px radius, screenshot shadow. "[25] minutes" rendered as 25; confirm with founder
- [x] `screenshot-enter` utility in globals.css: animation-timeline view(), entry 0% to 40%, opacity 0.6 to 1, wrapped in @supports with opacity 1 base. Global reduced-motion rule disables it
- [x] No icons, no hover effects
- [x] Verification: checked at desktop (1920) and 390 via /preview. Partial opacities measured mid-entry, so the scroll-driven fade is live

### 05. Video
- [x] `components/ConceptVideo.tsx`, id `video`, ink bg, H2 cols 1 to 5, 16:9 frame cols 6 to 13, data-section-theme ink
- [x] `components/VideoPlayer.tsx`: lazy next/image poster with the centred primary "Play" button
- [x] On click swaps in `<video>` with controls, captions track, preload none, playsInline, src from `NEXT_PUBLIC_VIDEO_URL`, 160ms fade-in
- [x] Fires `video_play` on window
- [~] Verification: confirmed in Chrome that no .mp4 request happens before the click and the video element mounts after it. 390px check and a real playback check by the user pending

### 06. Proof
- [x] `components/Proof.tsx`, ink bg with dots texture, H2 + body cols 1 to 7, body 60ch paper-muted
- [x] Stat strip: three body 600 items with hairline rule above, row on md+, column on mobile, no mono, no icons
- [x] `<Testimonials />` mounted; `content/testimonials.ts` created empty with the Testimonial type; the component is a stub returning null until step 07
- [x] Projection footnote in small paper-muted text
- [~] Verification: checked at desktop. 390 check pending

### 07. Testimonials
- [x] Founder supplied the 21st.dev Circular Testimonials component instead of solaceui. Lives at `components/ui/circular-testimonials.tsx`. Adapted: framer-motion replaced with CSS keyframes (`quote-in`, `word-in`), react-icons replaced with lucide-react, styled-jsx replaced with Tailwind, arrows scoped to focus, autoplay paused under reduced motion and off screen, optional photo with a monogram fallback. `components/Testimonials.tsx` (server) maps the data into it. The earlier Embla carousel was removed
- [x] Tokens only: Fraunces for the featured quote, Schibsted for name/school/year, JetBrains Mono for the score line, signal only on the featured score line, radius 0, hairline top rules instead of cards
- [x] Layout is the component design: a 3D photo stack (active front, neighbours tilted behind) beside the active quote in display type, name, school and year, mono score line in signal, "reported by student"
- [x] `content/testimonials.ts` shipped empty; `content/testimonials.sample.ts` (Sample Student A/B/C) imported only when `NEXT_PUBLIC_SAMPLE_TESTIMONIALS=true` (set in `.env.local` for dev)
- [x] Subline, H3 "Reported by students" with a Lottie accent beside it, carousel, card layout with mono score line and "reported by student" label
- [x] Mobile stacks photo over text; prev/next 48px square with the token radius; arrow keys when the block has focus; autoplay every 5s until the visitor interacts; instant under reduced motion. Sample photos are Unsplash stock (sample only)
- [~] Verification: with the flag, checked at desktop in Chrome (featured 591px, flanks 376px at 0.6, buttons 48px, Lottie canvas mounted). Still to do: 390 check, and a production build without the flag to confirm no "Sample Student" string ships

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
- The Chrome tab used for automated checks reports document.hidden = true (its window is in the background). Animation frames do not run there, so GSAP and ScrollTrigger motion cannot be verified through it. Bring that window to the front, or check motion by hand.
- Lottie (founder request 2026-09-10): `@lottiefiles/dotlottie-react` added. `components/LottieAccent.tsx` loads the player only when the block is near the viewport (IntersectionObserver plus a scroll bounds fallback), plays in view, pauses out of view, first frame only under reduced motion. `public/lottie/reported.json` is a hand-made placeholder (three pulsing signal dots). Replace it with a LottieFiles pick at the same path; `.lottie` files also work.
- Subtle section textures added at founder request (2026-09-10): `components/SectionBackground.tsx` with `pattern-dots` (paper dots at 7% on ink sections) and `pattern-grid` (ink grid at 5% on paper sections), edge-masked by `pattern-fade`. Rebuilt in tokens after the MagicUI patterns on 21st.dev, no library. Every new section should include it and be `relative overflow-hidden` with its content wrapper `relative`.
- Turbopack sometimes fails to pick up new Tailwind classes from a rewritten file. If a class is missing from the served CSS, restart `npm run dev -- -p 3002`.
- Tailwind v4 has no named duration namespace, so `duration-fast` style classes do nothing. Use `duration-(--duration-fast)`, `duration-(--duration-base)`, `duration-(--duration-reveal)`. Fixed across all components 2026-09-10.
- Next 16 caches optimized images under `.next/dev/cache/images`. After replacing a file in `public/`, delete that folder or the browser keeps getting the old image.
- Assets still needed from the founder: design reference screenshots, video poster, captions file. A true diagnostic question screenshot and 2x captures of all screens would improve steps 02 and 04.
- The founder video is 4 minutes 24 seconds, but the copy says "90 seconds" in the hero link and the video H2. Either a 90-second cut is needed or the copy must change.
- Production hosting: upload `public/video/moneyball.mp4` to Vercel Blob or Cloudflare and set `NEXT_PUBLIC_VIDEO_URL` there. The file is git-ignored and must not ship in the repo.
- Current live video lives on S3 Singapore: https://wooster-concept-videos.s3.ap-southeast-1.amazonaws.com/Landing/Wooster_Prep_The_Moneyball_of_SAT_updated_06-16-2026_with_captions.mp4. Must move to Vercel Blob or Cloudflare before step 05; captions are burned in, a separate .vtt is still needed.
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
| 2026-09-10 | 03 | ROI comparison built with content/roi.ts, RoiComparison, RoiRerank. Mounted after hero. Layout verified, motion pending a visible tab. |
| 2026-09-10 | 02 | User asked for a visible right edge on the hero image. Bleed removed, shadow token deepened (0 24px 64px -8px rgba(2,6,16,0.7)). |
| 2026-09-10 | 01 | Header: translucent blur on scroll, smaller CTA, and palette that follows the section beneath (ink or paper). Sections tagged with data-section-theme. |
| 2026-09-10 | 07/04 | Founder supplied two 21st.dev components. Circular Testimonials replaces the Embla carousel; Elastic Gallery replaces the three-column screenshots in How it works. Both retokened, Framer and react-icons swapped for CSS and lucide. |
| 2026-09-10 | 07 | Testimonials carousel built natively with Lottie accent, sample data behind a flag. Verified at desktop. |
| 2026-09-10 | 06 | Proof built and mounted with empty testimonials data and stub. |
| 2026-09-10 | 04 | How it works rebuilt as three aligned columns after user feedback. Subtle dot and grid backgrounds added to hero, ROI, how it works, video. Dev server restarted to fix stale Tailwind scan. |
| 2026-09-10 | 05 | Video section built with the founder-supplied mp4 served from public/video in dev, poster cut at 3.5s, placeholder vtt. Verified click-to-play wiring in Chrome. |
| 2026-09-10 | 04 | How it works built and mounted. Bento cells top-aligned after a first pass showed bottom-anchored images. |
| 2026-09-10 | 01 | Header theme change made smooth: logos crossfade, colours transition over 720ms. Found and fixed that no duration class had been applying anywhere (Tailwind v4). |
| 2026-09-10 | 02 | User then asked for the bleed back with a soft fade. Bleed restored, ink gradient fade added on the right of the hero. |
| 2026-09-10 | 03 | User asked to remove the overlap into the hero. Removed. Page has no grid-breaking moment now. |
| 2026-09-10 | 03 | User flagged the pin: only the lists block pinned (headline scrolled away, block shifted 30px). Now the whole section pins. Headline levelled with the lists. |
| 2026-09-10 | 03 | User flagged misalignment. Rows fixed to 56px, figures moved to a new statRow token, lists now line up. Verified at desktop and 390. |
| 2026-09-10 | 02 | User could not see the screenshot. Two causes: stale Next image cache, and a GSAP from() stall. Both fixed. H1 trimmed to three lines, bleed reworked, /preview route added. Verified in Chrome at 390 and 1920. |
