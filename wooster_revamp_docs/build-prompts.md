# Claude Code prompts — run in order, one per session or one per commit

Before prompt 01: drop `CLAUDE.md` in the repo root, `app/design-tokens.ts` and `content/copy.md` in place, and 1–2 reference screenshots in `/design/reference/`. Install the Frontend Design plugin, Playwright MCP, and shadcn MCP.

---

## 00 — Setup

```
Read CLAUDE.md, app/design-tokens.ts, and content/copy.md before doing anything.

1. Add fonts with next/font/google: Fraunces (weights 300, 600, axes opsz + WONK), Schibsted Grotesk (400, 600), JetBrains Mono (500). Expose as CSS variables --font-fraunces, --font-schibsted, --font-jetbrains. display: swap.
2. Write app/globals.css: one CSS variable per token in design-tokens.ts (colors, radii, shadow, motion durations/eases, tap min-height). Set base styles: body uses Schibsted, ink text on paper, measure 68ch for prose. Add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }`.
3. Extend tailwind.config to read the same variables (colors.ink, colors.paper, colors.signal, fontFamily.display/body/mono, borderRadius.button/screenshot).
4. Install shadcn/ui and add only: button, accordion, carousel. Restyle Button variants to tokens: primary = signal fill, ink text, radius 4px, min-height 48px; secondary = ink outline on paper / paper outline on ink. Delete the default gray palette usage.
5. Create app/(landing)/layout.tsx with `viewport-fit=cover`, and app/layout.tsx with metadata copied from the current live site's title/description/OG/Twitter tags.
6. Add Playwright and a script `npm run shot -- <name>` that captures /#<name> at 390x844 and 1440x900 into /design/shots/.

Verification: render a scratch page showing the H1 style, lead, body, a stat figure in mono, and both button variants on ink and on paper. Screenshot at 390px and 1440px, confirm fonts loaded (no fallback), contrast AA on all pairs, then delete the scratch page.
```

---

## 01 — Header + sticky mobile CTA

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Header.

Build components/Header.tsx (server component with a small client island for the sticky bar):
- Ink-deep background, 56px tall on mobile, 64px desktop. Wordmark set in Fraunces 600 at left. Right side on desktop: "How it works" (anchor to #how-it-works), "Student login" (link to /login), primary Button "Start free diagnostic" (link to /diagnostic). No hamburger; on mobile show only wordmark + "Student login".
- components/StickyCta.tsx: fixed bottom bar, ink-deep background, full-width primary button "Start free diagnostic", padding-bottom uses env(safe-area-inset-bottom). Appears (IntersectionObserver on the hero CTA) only after the hero CTA has scrolled out; hidden on ≥1024px. Slide-up 320ms with the token ease; instant under prefers-reduced-motion.
- All targets ≥48px. Visible focus rings in signal.

Verification: screenshot at 390px and 1440px, compare to reference, list and fix deltas. On mobile confirm the bar is absent at top and present after scrolling past the hero.
```

---

## 02 — Hero

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Hero. Do not change or add words.

Build components/Hero.tsx on an ink background:
- Asymmetric layout. Desktop: 12-col grid, copy in cols 1–6, product screenshot in cols 7–13 bleeding off the right edge by ~10%. Mobile: copy first, screenshot below at full width with a small right bleed.
- H1 in Fraunces 300 with WONK on, display1 size, max 3 lines desktop, left-aligned. Lead beneath at lead size, paper-muted color, measure ≤ 48ch. Then primary Button "Start free diagnostic" and a text link "Watch 90 sec" (anchors to #video, underline offset 4px, no arrow). Beneath: proof chip "7-day score-fit guarantee" as a small paper-edge outlined pill, ink-muted text.
- Screenshot: /public/screens/roi-plan.png via next/image, priority, fetchpriority="high", explicit width/height, radius 8px, the token screenshot shadow. This is the LCP element. Alt from copy.md.
- Reveal (the ONE orchestrated load animation): GSAP timeline, staggered 80ms — H1 lines, lead, buttons, chip, then screenshot translateY(24px)→0 with opacity. Total ≤ 900ms. Import GSAP dynamically inside a client island so it only ships on this route. Under prefers-reduced-motion skip the timeline entirely; base CSS state is the finished state so nothing is hidden without JS.
- Height: min 88svh on mobile so the CTA sits inside the first screen; do not force 100vh.

Verification: screenshot at 390px and 1440px, compare to reference, list and fix deltas in type scale, spacing, and hero structure. Confirm the primary CTA is visible without scrolling at 390x844. Run Lighthouse mobile and report LCP.
```

---

## 03 — Problem / ROI comparison

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Problem / ROI comparison.

Build components/RoiComparison.tsx on paper background. This is the page's one memorable moment; everything else stays quiet.
- H2 (display2, Fraunces 300) and body (measure 60ch) left-aligned, occupying cols 1–5 on desktop.
- Right side, cols 6–13, breaking upward across the hero/section boundary by ~64px: two lists side by side. Left list "Chapter order" shows the six rows in textbook order (Vocabulary, Geometry, Punctuation, Transitions, Data analysis, Linear equations). Right list "Wooster ROI order" shows the same rows re-ranked by projected gain, each with its figure in mono stat size (e.g. "+42") and the word "projected" in small body text beside it. The figure label "Projected gain, from your diagnostic" sits under the right list.
- Rows: no cards. Hairline paper-edge rules between rows, 56px tall, concept in body 600, figure in mono.
- Motion (the ROI re-rank): GSAP + ScrollTrigger, triggered once when the block is 40% in view. Rows animate from chapter order into ROI order using FLIP (gsap.utils / Flip plugin), 720ms, token ease; figures count up from 0 in the same window. Under prefers-reduced-motion and on touch devices with no scroll trigger support, render the final ROI order statically. Base CSS state = final order.
- Mobile: stack lists vertically, "Chapter order" first, then the re-ranked list. Keep the re-rank animation but reduce to 480ms.

Verification: screenshot at 390px and 1440px before and after the trigger, compare to reference, list and fix deltas. Confirm "projected" is visible on every figure. Confirm reduced-motion shows the final order.
```

---

## 04 — How it works

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → How it works.

Build components/HowItWorks.tsx, id="how-it-works", paper background.
- H2 left-aligned. Then three steps as a numbered sequence (numbers are justified here: it is a process). Layout is NOT three equal cards: a bento-style grid on desktop where step 1 spans two rows tall at left (cols 1–5), steps 2 and 3 stack at right (cols 6–13). Mobile: single column in order.
- Each step: a large numeral in Fraunces 300 (display2 size, ink-muted), the step name in body 600, the one-line description in body, and a real product screenshot via next/image (lazy, explicit dimensions, radius 8px, screenshot shadow). Screenshot paths: /public/screens/diagnostic.png, /public/screens/roi-plan.png, /public/screens/progress.png. Alts from copy.md.
- No icons. No hover effects. One CSS scroll-driven animation only: each screenshot fades from 0.6 to 1 opacity as it enters (animation-timeline: view()), with a static fallback and none under reduced motion.

Verification: screenshot at 390px and 1440px, compare to reference, list and fix deltas.
```

---

## 05 — Video

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Video.

Build components/ConceptVideo.tsx, id="video", ink background.
- H2 left-aligned in cols 1–5 on desktop. Video frame in cols 6–13, 16:9, radius 8px, screenshot shadow. Mobile: H2 then full-width frame.
- Click-to-play: render a poster image (next/image, lazy) with a single primary Button "Play" centered on the poster (this is the one allowed centered element). On click, swap in a <video> element with controls, captions track (/public/video/moneyball.vtt), preload="none", src from process.env.NEXT_PUBLIC_VIDEO_URL (Vercel Blob or Cloudflare, not S3 Singapore). Fire a custom event "video_play" for analytics.
- No autoplay, no iframe embeds, no additional libraries.

Verification: screenshot at 390px and 1440px, compare to reference, list and fix deltas. Confirm no video bytes load before click (network tab).
```

---

## 06 — Proof (with testimonials placeholder)

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Proof.

Build components/Proof.tsx on ink background.
- H2 and body in cols 1–7, left-aligned, body measure 60ch, paper-muted text.
- Stat strip below: three items laid out as a row on desktop, a column on mobile. Each item is the phrase in body 600 paper text with a hairline rule above. No numbers in mono here (they are not scores). No icons.
- Mount <Testimonials /> beneath the strip (build next per the Testimonials prompt). It returns null when content/testimonials.ts is empty.
- Footnote: "Score gains shown are model projections. We publish real results as students report them." in small size, paper-muted.
- No animation in this section.

Verification: screenshot at 390px and 1440px, compare to reference, list and fix deltas.
```

---

## 07 — Testimonials (21st.dev solaceui Testimonial Section 3)

```
Build the Testimonials block for the Proof section. Follow CLAUDE.md and app/design-tokens.ts.

Source: install solaceui "Testimonial Section 3" from 21st.dev:
npx shadcn@latest add "https://21st.dev/r/solaceui/testimonial-section-3?api_key=$API_KEY_21ST"
Move it to components/Testimonials.tsx and strip anything not needed (company logos, placeholder avatars, demo text).

Retoken it fully — no defaults may survive:
- Fonts: Fraunces for the featured quote, Schibsted for name/school/year, JetBrains Mono for the score line only.
- Colours: ink background; signal used only on the featured card's score line. Remove shadcn default grays; radius 0 on cards.
- Break the three-identical-cards pattern: centre card is the featured quote (larger, display type), flanking cards ~60% width and lower contrast.

Data: create content/testimonials.ts exporting testimonials: Testimonial[] where Testimonial = { name; school; year; before: number; after: number; quote; photo? }. Ship EMPTY. Add content/testimonials.sample.ts with 3 entries named "Sample Student A/B/C", imported only when process.env.NEXT_PUBLIC_SAMPLE_TESTIMONIALS === "true".

Behaviour: if the array is empty, return null. Otherwise render the subline "Real scores, sent to us by students" (sentence case, body size, not an eyebrow), H3 "Reported by students", then the carousel. Each card: quote, then name, school and year on separate lines, score line in mono "1240 → 1390", label "reported by student". Show 3 on load; extra entries live in the carousel.

Mobile: single card ~85vw with the next peeking; prev/next ≥48px; swipe enabled. Keyboard: arrow keys move slides, focus rings visible. Under prefers-reduced-motion, slide changes are instant. Contrast AA on both card states.

Verification: run with NEXT_PUBLIC_SAMPLE_TESTIMONIALS=true, screenshot at 390px and 1440px, compare to the reference, list and fix deltas. Then run without the flag and confirm the block is absent and no "Sample Student" string exists in the production build.
```

---

## 08 — Pricing

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Pricing.

Build components/Pricing.tsx, id="pricing", ink background, single offer.
- Not a centered card. Desktop: H2 "One plan." and the price block in cols 1–6; bullets and CTA in cols 7–12. Mobile: stacked in that order.
- Price "$249.99" in mono price size, paper color; "for two months" in body beneath.
- Bullets as a plain list with hairline rules, no check icons.
- Anchor line in body, paper-muted. Then primary Button "Start free diagnostic" (full width on mobile) with the button sub in small size beneath.
- The "7-day score-fit guarantee" bullet links to #guarantee.
- Fire "pricing_view" once when 50% in view.

Verification: screenshot at 390px and 1440px, compare to reference, list and fix deltas. Confirm the guarantee and the projection footnote (Proof section) are both within one scroll of the CTA on mobile.
```

---

## 09 — Guarantee + FAQ

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Guarantee + FAQ.

Build components/Guarantee.tsx (id="guarantee") and components/Faq.tsx, paper background, rendered together.
- Guarantee: H2 and body left-aligned in cols 1–6. The body sits inside a single signal-colored block with ink text — this is the page's second and last use of signal outside buttons and scores. Confirm contrast.
- FAQ in cols 7–13 (mobile: below): shadcn Accordion, restyled — no borders except hairline rules, question in body 600, answer in body, chevron replaced by a plus/minus glyph, 48px min-height per trigger, keyboard operable.
- Add FAQPage JSON-LD generated from the same data array so the schema can never drift from the visible copy.

Verification: screenshot at 390px and 1440px with one item open, compare to reference, list and fix deltas. Validate JSON-LD with the Schema.org validator.
```

---

## 10 — Final CTA + footer

```
Follow CLAUDE.md and app/design-tokens.ts. Copy from content/copy.md → Final CTA and Footer.

Build components/FinalCta.tsx and components/Footer.tsx.
- Final CTA on ink: H2 in display1 size (as large as the hero H1), left-aligned, cols 1–9. Primary Button beneath. Nothing else.
- Footer on ink-deep: wordmark, links (Privacy, Terms, Disclaimer) as plain text links with underline, contact email, the College Board line in small paper-muted text. Single row on desktop, stacked on mobile. No social icons.
- Assemble app/(landing)/page.tsx in the fixed section order. One H1 on the page; every section H2; testimonials H3.

Verification: screenshot the full page at 390px and 1440px, compare to reference, list and fix deltas. Run axe on the page and fix all violations.
```

---

## 11 — Hardening

```
Follow CLAUDE.md. Harden the landing page before launch.

1. Analytics: add a thin lib/analytics.ts with track(event, props) that currently no-ops and logs in dev. Wire events: diagnostic_start (all "Start free diagnostic" buttons, with a `placement` prop: header, hero, sticky, pricing, final), video_play, pricing_view, checkout_start, purchase. The provider (GA4 or Plausible) will be chosen later; keep the interface stable.
2. Schema: add Product + Offer (price 249.99 USD, availability InStock, url /diagnostic), Organization (name Wooster SAT Prep, email hal@woosterprep.com), and confirm FAQPage from the FAQ data. Validate.
3. Performance: run Lighthouse mobile. Confirm LCP element is the hero screenshot, GSAP/Lenis ship only on the landing route, fonts are two weights per family, no layout shift on font load. Report LCP, INP, CLS and fix until LCP < 2.5s, INP < 200ms, CLS < 0.1.
4. Accessibility: axe clean, keyboard walk-through of header, carousel, accordion, sticky bar; focus order matches visual order; reduced-motion pass on every section.
5. Metadata: preserve existing title/description/OG/Twitter, add sitemap.xml and robots index,follow.

Verification: screenshot the full page at 390px and 1440px in both normal and reduced-motion, compare to reference, list and fix deltas. Attach Lighthouse and axe reports.
```
