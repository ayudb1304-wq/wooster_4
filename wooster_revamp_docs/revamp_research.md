# Revamping Woosterprep.com: A Simple, High-Impact Plan for a Premium, High-Converting SAT-Prep Landing Page

## TL;DR
- **Wooster SAT Prep is a self-serve, algorithmic SAT-prep product** (free diagnostic → personalized "ROI-ordered" study plan → ~6,000-question bank, one plan at $249.99 for 2 months, with a "Moneyball the SATs" hook). It is built on Next.js. The current page has a strong story but leaks conversions because it has **zero trust signals** (no testimonials, no named founder, no documented score results), a single generic CTA, and reads like a wall of feature copy — so the fix is a proof-driven, editorial rebuild, not a cosmetic reskin.
- **Keep the Next.js stack and rebuild the page as a fast, editorial, "anti-slop" experience**: one bold display serif + one clean grotesque (never Inter), a committed color system (deep ink + one sharp accent, not purple gradients), real product screenshots of the diagnostic/ROI plan instead of stock, and *restrained* motion (one orchestrated hero reveal + scroll-reveals). Use GSAP+ScrollTrigger and Lenis for premium feel, Embla for testimonials, and native CSS scroll-driven animations/`prefers-reduced-motion` for performance and accessibility.
- **Execute in two tools:** use Claude.ai for strategy, copy and wireframing; use Claude Code with Anthropic's official **Frontend Design** plugin + a tight anti-slop `CLAUDE.md` + Playwright/Chrome screenshot-refine loop to build. Ship on Vercel (already Next.js-native), instrument analytics from day one (the current site has none visible), and A/B test the hero headline and CTA first.

## Key Findings

**1. What Wooster is (confirmed).** Woosterprep.com is "Wooster SAT Prep," a direct-to-consumer, self-paced digital SAT-prep product. The funnel is: free "quant diagnostic" → a personalized, ROI-ranked study roadmap ("Study this Now!") → practice against a ~6,000-question bank, tracked adaptively. There is a single price point — **$249.99 for full 2-month access** — positioned as "a little more than a generic SAT textbook." The brand hook is "Moneyball the SATs" (data/strategy over brute-force effort), reinforced by a concept video hosted on S3. Contact is a single email, hal@woosterprep.com.

**2. Audience.** Primarily **U.S. college-bound high-schoolers (juniors/sophomores) and their parents** who are paying. The messaging speaks to both: the student wants a higher score with less wasted time; the parent wants measurable ROI and low risk. This is a *considered purchase*, and education is one of the harder categories to convert precisely because cost, commitment and competition are all high. Per Unbounce's Conversion Benchmark Report, the education-industry median conversion rate is 8.4% (roughly 27% above the 6.6% all-industries baseline), but that figure is inflated by cheap/free online courses — **primary-education and tutoring pages convert at just 4.9%, the lowest education subcategory**, while higher-education pages sit at 6.3%. Wooster's paid, considered offer lives at the low-converting end of that range, which is exactly why trust and clarity matter so much.

**3. Current-state weaknesses (the conversion leaks).**
- **No trust/social proof at all.** The audit confirmed the live page has no testimonials, no star ratings, no named founder or tutor credentials, no documented score-improvement results, and no review/organization schema. For a $250 considered purchase this is the single biggest gap — trust signals like testimonials are among the highest-ROI conversion levers.
- **The "+42 pts / +38 pts" numbers are model projections, not results.** The page's own framing ("+23 more concepts unlock after your diagnostic") shows these are illustrative ROI projections. They're compelling but risk reading as unsubstantiated; they must be clearly labeled as projected and paired with real outcomes.
- **One generic CTA doing everything.** "Start Your Diagnostic" is fine as the primary action, but there's no secondary path (e.g., "See how it works / watch 90-sec video") for not-yet-ready visitors, and the pricing block's only action also routes to /diagnostic.
- **Copy-dense, feature-first sections.** Long paragraphs ("Your exam is maybe tomorrow or it's eight weeks out…") bury the value. Education is the *most* copy-sensitive industry in Unbounce's data: the recommended target is about **363 words for the whole page — the lowest across all industries — and copy written at 12th-grade level or below converts 54% to over 2× better** than college-level copy. The current page is well over that and reads dense.
- **No visible analytics.** The audit found no Google Tag Manager/GA tags in the markup — meaning conversions likely aren't being measured, so there's no baseline to optimize against.
- **Guarantee is under-leveraged.** A "7-day score-fit guarantee" is listed as one bullet with no explanation; risk-reversal is a proven lever for price-sensitive, skeptical buyers and deserves its own treatment.
- **SEO basics are decent but thin.** Title, meta description, OG/Twitter cards and `robots: index,follow` are all present and well-written; but there's no structured data (Course/Product/Organization/FAQ schema), a missed opportunity for rich results and AI-answer visibility.

**4. Tech stack (confirmed).** Next.js (App Router — the page uses `_next/image` optimization and a dynamic `/landing/opengraph-image` route), almost certainly on Vercel. Video is served from an AWS S3 bucket (`wooster-concept-videos`, ap-southeast-1/Singapore region — a latency red flag for a US audience). This is a *good* foundation: Next.js + Vercel is exactly what a solo builder using Claude Code should keep.

## Details

### A. Strategy: audience, positioning, conversion goal, key messages

**Assumptions (stated, since no clarification was possible):** (a) the paying decision-maker is often a parent, the user is the student; (b) traffic will come from paid social/search + word of mouth; (c) the primary conversion is *starting the free diagnostic* (a low-friction, high-intent micro-conversion), with the $249.99 purchase as the downstream goal; (d) "Hal" is the founder and can be featured; (e) real (even if early) student results and testimonials can be gathered before or shortly after launch.

**Positioning (sharpen the Moneyball idea).** The one memorable idea: *"Stop studying everything. Study the 6 things that move your score the most."* Wooster's differentiator is **ROI-ranked, diagnostic-driven prioritization** — not "more questions," but *the right questions in the right order*. This is genuinely distinctive versus Khan Academy (free but unstructured, no plan/guarantee) and PrepScholar/Kaplan/Princeton Review (adaptive but $299–$1,995+, with PrepScholar's flagship self-paced course at $397 and a 160-point guarantee). Wooster's wedge: *personalization of a premium program at a textbook price.*

**Primary conversion goal:** Start the free diagnostic (email/account capture).
**Secondary goals:** Watch the 90-second explainer; view pricing; return-student login.

**Key messages, in priority order:**
1. Precision beats effort — the ROI-ranked plan (the hero idea).
2. Proof — real score gains, real students, the guarantee (the trust layer).
3. Value — premium personalization for the price of a textbook.
4. Low risk — free diagnostic, 7-day guarantee, no wasted hours.

### B. Page architecture — section-by-section blueprint

Each section has one job. Keep it to ~9 sections; every scroll should move the visitor closer to the CTA. Keep total body copy lean (target the ~363-word education benchmark; every paragraph earns its place).

1. **Sticky slim header** — logo, one anchor ("How it works"), "Student login," and a compact primary CTA ("Start free diagnostic"). On mobile this collapses; the CTA becomes a bottom sticky bar (see Mobile plan).
2. **Hero (above the fold).** Job: land the one idea + primary CTA in <5 seconds. Big editorial headline ("Moneyball your SAT. Study the 6 things that actually move your score."), one-line subhead, primary CTA + secondary "Watch 90 sec." Include a *single* proof chip (e.g., "Avg. +[X] pts" or "4.9★ from [N] students") the moment real data exists. Visual: a real, animated screenshot of the ROI-ranked plan, not an abstract illustration.
3. **The problem / "Precision, not generic prep."** Job: agitate the pain (wasted hours on low-yield topics). Keep the existing "generic chapter order vs. Wooster ROI order" comparison — it's your best original visual — but tighten the copy and animate the re-rank on scroll.
4. **How it works (3 steps).** Diagnose → Get your ROI plan → Train & track. Job: make the mechanism feel simple and credible. Use real UI screenshots per step.
5. **The Moneyball explainer video.** Job: let skeptics self-educate. Lazy-loaded, poster image, captions on. Re-host off the Singapore S3 bucket onto Vercel/Cloudflare or a CDN closer to US users (or stream via a proper video host) to cut load time.
6. **Proof / results (NEW — the most important addition).** Job: destroy doubt. Real testimonials (name, photo, school, starting→goal score), a stat strip (students helped, average gain, questions answered), and — if available — a founder note from Hal establishing credibility. Frame the "+42 pts" ROI numbers here explicitly as *projected* gains from the model, sitting next to *real* outcomes.
7. **Pricing.** Job: make $249.99 feel obviously worth it. One clean card, benefit-framed bullets, the textbook-price anchor, and the guarantee given real estate. Add a short comparison line vs. free (unstructured) and $400–$2,000 (competitors).
8. **Risk reversal + FAQ.** Job: handle the last objections. Explain the 7-day score-fit guarantee plainly; FAQ covers "Is the diagnostic really free?", "How long does it take?", "Digital SAT aligned?", "What if it doesn't work for me?" Mark up as FAQ schema.
9. **Final CTA + footer.** Restate the one idea, repeat the primary CTA, then footer (privacy, terms, disclaimer, contact).

### C. Design direction (premium, non-generic) — with an explicit "avoid" list

The core principle from Anthropic's own Frontend Aesthetics Cookbook: unguided AI "converges toward generic, 'on distribution' outputs… the 'AI slop' aesthetic." The antidote is *deliberate, committed choices* and *explicit negative constraints.*

**Aesthetic direction:** *Editorial / confident-analytical* — think a smart sports-analytics magazine (fits "Moneyball") crossed with a premium study tool. Bold, data-forward, trustworthy, a little contrarian.

**Typography.** Pair one distinctive display face with one clean, modern grotesque body face and a monospace for data/numbers (great for "Moneyball" stat callouts). Use weight and size *extremes* for hierarchy (e.g., 200 vs. 800; 3×+ size jumps), not timid 1.5× steps. **Never Inter/Roboto/Open Sans/Lato/Arial or system defaults** — these are the #1 AI-slop tell (and are banned by name in Anthropic's cookbook). Good candidates: a characterful serif (e.g., Fraunces) or a strong grotesque display for headlines, paired with a refined body sans; a mono like JetBrains Mono for the point-gain figures.

**Color.** Commit to one dominant color + one sharp accent, defined as CSS variables. For an analytical/trustworthy education brand, deep ink/navy or near-black grounds with a single confident accent (a chalk-cream neutral + one vivid signal color for CTAs and score gains). **Avoid the purple→blue gradient on white, default shadcn grays, and evenly-distributed "timid" palettes.**

**Imagery.** Real product screenshots of the diagnostic and ROI plan; a real photo of Hal/founder; real student faces in testimonials. **Avoid generic stock photos of smiling teens with laptops** — a top edtech tell that erodes credibility.

**Motion (restraint is the premium signal).** One well-orchestrated page-load hero reveal (staggered) beats scattered micro-animations. Add purposeful scroll-reveals (the ROI re-rank animating into priority order is the signature moment). Everything must respect `prefers-reduced-motion` and degrade to static.

**Layout.** Use asymmetry, an intentional grid, and a few grid-breaking moments; a bento-style block works well for the "how it works / features" cluster. **Avoid:** full-width centered-everything hero, three identical rounded feature cards with 8px shadows, testimonial carousels as the *only* proof, and rounded-corner overload.

**Explicit AI-slop "avoid" list (put this verbatim in CLAUDE.md):** Inter/Roboto/system fonts; purple-to-blue gradients on white; centered-everything layouts; three-equal-card feature grids; default Lucide/Hero icon grids; glassmorphism clichés; stock "happy student" photography; generic copy like "transform your learning"; evenly distributed pastel palettes; excessive border-radius.

### D. Recommended tech stack & libraries (with justification)

**Framework: stay on Next.js (App Router), deploy on Vercel.** It's already there, it's excellent for a marketing page with a bit of interactivity, and it's the shortest path for a solo builder in Claude Code. (Astro would ship less JS by default and is objectively the Core-Web-Vitals-optimal choice for a pure content page — but the migration cost isn't worth it here given the site is already Next.js and integrates with an app/login. Keep Next.js and be disciplined about JS.) Use `next/image` (already in use) for AVIF/WebP, `next/font` to self-host fonts (avoids layout shift and a render-blocking request), and React Server Components to keep client JS minimal.

**Styling/components:** Tailwind CSS + shadcn/ui primitives (via the shadcn MCP so Claude uses real components instead of hand-rolling slop). Lock the design into a tokens file so future sessions don't drift back to defaults.

**Motion & UX libraries (all free; choose the minimum):**
- **GSAP + ScrollTrigger** — became 100% free including commercial use as of April 30, 2025 (v3.13 release; Webflow, which owns GSAP, confirmed "GSAP is now 100% free to all users… we're also expanding the standard license to cover commercial use"). It's the gold standard for the orchestrated hero reveal and the scroll-driven ROI re-rank. ~70KB; load only on the landing route.
- **Lenis** (~3KB, MIT) — smooth momentum scroll for the premium feel; respects `position: sticky` and Intersection Observer, integrates cleanly with ScrollTrigger. Disable/soften on mobile and under reduced-motion.
- **Motion** (formerly Framer Motion, the React path) — for component-level entrance/interaction animations if you prefer it over raw GSAP; ~30–50KB, so don't ship *both* it and GSAP unless justified.
- **Embla Carousel** (~7KB, dependency-free, powers shadcn's carousel) — for the testimonials row. Prefer it over Swiper (~47KB) unless you need Swiper's 3D effects; Splide (~27KB) is the pick if documented WCAG compliance is the priority.
- **Native CSS scroll-driven animations (`animation-timeline: scroll()/view()`) + the View Transitions API** — use these *first* for reveal-on-scroll and any page/state transitions. They run on the compositor thread, ship 0KB of JS, and in 2026 cover the majority of what libraries used to do; removing JS animation libs has been shown to cut LCP by ~280ms on real sites. Reserve GSAP for the one or two effects that genuinely need timeline control.
- **SplitType/Splitting.js** — only if you want per-character kinetic headline animation; otherwise skip.
- **Lottie/dotLottie** — optional, for a lightweight animated icon; skip if it doesn't earn its weight.
- **Do NOT use Three.js / React Three Fiber.** A 3D/WebGL scene would add hundreds of KB, hurt mobile battery/INP, and scream "gratuitous." It adds nothing to an SAT-prep conversion page.

**Rule of thumb:** native CSS → shadcn/Embla → GSAP/Lenis only where they clearly elevate UX. Every library loads on the landing route only.

### E. Mobile-specific plan (mobile-first, because education pages skew heavily mobile)

Per Unbounce, education landing pages get about 6× more traffic from mobile than desktop, yet desktop converts ~17.6% better — so the entire mobile experience is a conversion battleground you cannot afford to lose.

- **Sticky bottom CTA bar** ("Start free diagnostic") that appears after the hero scrolls out — the single highest-impact mobile conversion pattern for long pages.
- **Thumb-zone placement:** primary actions in the bottom third; **tap targets ≥44–48px tall**, ≥8px spacing, full-width buttons.
- **Simplified mobile copy:** "Start free" beats "Start Your Personalized SAT Diagnostic Today."
- **Performance budget:** hero image/LCP element optimized and preloaded with `fetchpriority="high"`; keep the hero under ~100KB; two font weights max; lazy-load the video and everything below the fold.
- **Reduce motion on mobile:** soften/disable Lenis smooth-scroll and heavy parallax on touch devices and always under `prefers-reduced-motion`; prefer CSS transforms/opacity only.
- **Viewport & safe areas:** `viewport-fit=cover` + `env(safe-area-inset-*)` so the sticky bar clears the iOS home indicator/notch.
- **No hover-only interactions** — anything important must be tappable/visible.
- **Test on real devices** (not just responsive preview), held one-handed; use Chrome DevTools device emulation + PageSpeed Insights mobile + the reduced-motion emulation toggle.

### F. Performance, SEO, accessibility, analytics checklist

**Core Web Vitals (2026 targets, judged at the 75th percentile of real users):** LCP < 2.5s (aim < 2.0s), INP < 200ms (top sites target < 150ms), CLS < 0.1 (aim < 0.08).
- Serve hero and all imagery as AVIF/WebP via `next/image` with explicit width/height (prevents CLS); preload the LCP image with `fetchpriority="high"`.
- Self-host fonts via `next/font` with `font-display: swap`; subset to the weights used.
- Keep client JS minimal (RSC by default; load GSAP/Lenis only where needed) — INP is the metric most sites now fail, and it's driven by JS on the main thread.
- Re-host the Moneyball video off the Singapore S3 bucket to a US-edge/CDN or dedicated video host; poster image + lazy load.

**SEO:** Preserve the strong existing title/description/OG/Twitter tags. **Add structured data:** `Course`/`Product` + `Offer` (price $249.99), `Organization`, and `FAQPage` schema (helps rich results and AI-answer engines). Ensure one clear H1, logical heading order, descriptive alt text, and a sitemap. Keep `robots: index,follow`.

**Accessibility (WCAG 2.2):** color-contrast AA on text and CTAs; visible focus states; keyboard-navigable carousel and menu; `prefers-reduced-motion` honored everywhere (set base state to no-motion, layer motion as enhancement); captions on the video; form inputs labeled with ≥48px targets and correct input modes.

**Analytics/measurement (currently missing — set up before launch):** GA4 (or a privacy-light alternative like Plausible) + define events: `diagnostic_start`, `video_play`, `pricing_view`, `checkout_start`, `purchase`. Add a heatmap/session tool (e.g., Microsoft Clarity — free) to see scroll depth and drop-off. This gives the baseline needed for A/B testing.

### G. Execution roadmap — Claude.ai (strategy/copy) → Claude Code (build)

**Phase 0 — Setup (Claude Code).**
- Install Anthropic's official **Frontend Design** plugin (published Nov 12, 2025 as a ~4.5KB SKILL.md that generates "polished code that avoids generic AI aesthetics"). It forces a four-question framework (purpose, tone, constraints, differentiation) and bans overused fonts before any code is written — this is the single highest-leverage change.
- Add the **Playwright MCP** (or Claude-in-Chrome) so Claude can screenshot localhost and self-critique against a reference.
- Add the **shadcn MCP** so Claude uses real component primitives.
- Create a tight `CLAUDE.md` (outline below).

**Phase 1 — Strategy & copy (Claude.ai).** Use Claude.ai (Projects) to: finalize positioning, write all section copy in the editorial voice (kept lean, ~12th-grade-or-below reading level, near the 363-word education target), draft the FAQ, generate testimonial-collection templates, and produce a low-fi wireframe/section spec (requirements-first). *Prompt example:* "You're a conversion copywriter for a premium SAT-prep product called Wooster ('Moneyball the SATs'). Audience: college-bound teens + paying parents. Write hero options (headline ≤9 words, subhead ≤20), a 3-step 'how it works', a pricing block that anchors $249.99 against a textbook, and 6 FAQs. Benefit-led, ≤12th-grade reading level, no fluff, no 'transform your learning' clichés. Keep the whole page under ~400 words."

**Phase 2 — Design reference.** Generate 2–3 visual references for the hero/proof sections (screenshot a reference you like, or use a design-image tool) so Claude Code builds against a visual, not a text description — this is the biggest quality lever after the plugin. Commit to *one* direction.

**Phase 3 — Build (Claude Code), section by section.** Build hero first, then run the **screenshot → compare → refine loop** (Anthropic's own recommended pattern): "Implement this section. Take a screenshot at 390px and 1440px, compare to the reference, list the differences in typography scale, color, spacing and hero structure, and fix them." Two passes per section is the sweet spot. Then extract the design system into a tokens file and reference it in `CLAUDE.md` so later sections don't drift.

**Phase 4 — Harden.** Add analytics/events, schema, accessibility pass (reduced-motion, contrast, keyboard), performance pass (Lighthouse/PageSpeed mobile, fix LCP/INP/CLS), real-device mobile QA.

**Phase 5 — Launch & iterate.** Ship to Vercel preview → verify CWV in the field → promote to production.

**Suggested `CLAUDE.md` outline:**
```
# Wooster SAT Prep — Landing Page
## Project
Next.js (App Router) + Tailwind + shadcn/ui, deploy on Vercel. Single marketing landing page.
Primary goal: start free diagnostic. Audience: college-bound teens + paying parents.
Keep total copy lean (~363 words), 12th-grade reading level or below.
## Frontend aesthetics (anti-slop)
- Direction: editorial / analytical ("Moneyball" sports-analytics magazine meets premium study tool). Commit fully.
- Typography: Display = [distinctive serif/grotesque]; Body = [refined grotesque]; Mono = JetBrains Mono for stats.
  NEVER Inter/Roboto/Open Sans/Lato/Arial/system. Weight extremes (200 vs 800), size jumps 3x+.
- Color: one dominant (deep ink/navy) + one sharp accent, all in CSS variables.
  FORBIDDEN: purple→blue gradients on white, shadcn default grays, timid even palettes.
- Backgrounds: layered gradients/texture, atmospheric depth — not flat white.
- Motion: CSS scroll-driven + View Transitions first; GSAP+ScrollTrigger + Lenis only for the hero reveal and ROI re-rank.
  One orchestrated load beats scattered micro-interactions. ALWAYS respect prefers-reduced-motion.
- Layout: asymmetric, intentional grid, some grid-breaking. FORBIDDEN: centered-everything hero,
  3 identical rounded cards, carousel-only proof, radius overload, stock teen-with-laptop photos.
## Components & tokens
- Use shadcn primitives (via MCP), don't hand-roll. Embla for testimonials.
- Design tokens are the source of truth: app/design-tokens.ts.
## Performance/a11y (non-negotiable)
- next/image AVIF/WebP + width/height; preload LCP w/ fetchpriority=high. next/font self-hosted, swap.
- Targets: LCP<2.5s, INP<200ms, CLS<0.1. Lazy-load video + below-fold.
- WCAG 2.2 AA contrast, focus states, keyboard nav, captions.
## Verification
- After each section: screenshot at 390px & 1440px, compare to reference, fix deltas.
```

### H. Launch & A/B testing plan

- **Instrument first, then test.** With GA4 + Clarity live, establish a baseline diagnostic-start rate.
- **Test in priority order (one variable at a time; near-CTA proof placement matters most):**
  1. **Hero headline** (Moneyball/ROI framing vs. plain "personalized SAT prep that moves your score").
  2. **Primary CTA copy** ("Start free diagnostic" vs. "See my ROI plan" vs. "Take the free diagnostic").
  3. **Proof placement** (stat strip + testimonial directly under hero vs. lower).
  4. **Pricing framing** (textbook-price anchor vs. competitor-comparison anchor).
  5. **Guarantee prominence** (bullet vs. dedicated risk-reversal block).
- **Method:** Because this is a single Next.js page, use Vercel's built-in experimentation/edge middleware or a lightweight tool (e.g., GrowthBook/PostHog). Run each test to significance before moving on; don't stack changes.
- **Guardrail metrics:** watch mobile CWV (a heavy variant that wins on desktop can lose on mobile) and diagnostic→purchase rate, not just diagnostic-start.
- **Benchmarks that change the plan:** tutoring/education pages convert ~4.9% median; if diagnostic-start is well below that, the problem is the hero/offer clarity (fix messaging) — if start is high but purchase is low, the problem is proof/pricing/guarantee (deepen the trust layer).

## Recommendations

**Do first (highest impact, this week):**
1. **Add a real proof layer** — collect and publish 3–6 testimonials (name, photo, school, score change) and a stat strip; add a founder note from Hal. This is the biggest single conversion lever for a $250 considered purchase and the current site's largest gap.
2. **Install analytics + Clarity** and define conversion events before touching design, so every later change is measurable.
3. **Rewrite the hero** around one sharp idea ("Study the 6 things that move your score most"), with a primary CTA + a secondary "watch 90 sec," and a proof chip — and cut the page's total word count hard.

**Then (the rebuild, ~1–2 weeks solo with Claude Code):**
4. Rebuild on the existing Next.js/Vercel stack with the Frontend Design plugin + anti-slop `CLAUDE.md`; editorial typography, committed color, real screenshots.
5. Implement restrained motion (CSS scroll-driven first; GSAP+Lenis for the hero reveal and ROI re-rank), a mobile sticky CTA bar, and the full performance/accessibility checklist.
6. Re-host the video off the Singapore S3 bucket; add Course/Product/FAQ schema; give the guarantee its own block.

**Then (ongoing):**
7. Launch, verify field CWV, and A/B test hero → CTA → proof placement in that order.

**Thresholds that should change your approach:** If you can't gather real testimonials/results quickly, lean harder on the guarantee and a founder-credibility story instead — but do not ship a $250 page with zero social proof. If mobile LCP can't get under ~2.5s with the video present, cut the auto-loaded video to a click-to-play poster. If GSAP+Lenis push INP over 200ms on mid-range phones, drop them on mobile and rely on native CSS animations.

## Caveats
- **Subpage content unverified.** The audit fully retrieved only the landing page; /diagnostic, /privacy, /terms, /disclaimer could not be fetched, so the exact diagnostic signup flow, checkout mechanism, and full guarantee terms are inferred from the landing page and should be confirmed directly.
- **Analytics "absent" = not observed.** No GTM/GA tags or JSON-LD were visible in the extracted markup, but markdown extraction can hide script tags; verify in the live source before assuming none exist.
- **"+42 pts" figures are model projections**, per the page's own framing ("+23 more concepts unlock after your diagnostic"); presenting them as achieved results would be misleading and a compliance risk given the site's own "Educational Disclaimer."
- **Trend and library figures vary in rigor.** Design-trend and library claims are synthesized from multiple 2025–2026 industry sources; treat specific bundle-size and performance numbers (e.g., "GSAP ~70KB," "removing libs cut LCP ~280ms") as representative figures, not guarantees for your exact build — measure your own.
- **Font/color specifics are directional.** Final type and palette choices should be validated for licensing, readability, and brand fit; the named fonts are strong candidates, not mandates.
- **Conversion-rate benchmarks are medians across many pages** (Unbounce Conversion Benchmark Report); Wooster's actual numbers depend on traffic source and offer, so use them as rough goalposts, not promises.