# Motion and scroll choreography — single source of truth

Principle: one performer, the ROI re-rank. Everything else is still. If a proposed animation is not on this list, do not add it.

## Global
- Lenis: desktop pointer devices only, lerp 0.1, wheel multiplier 1. Disabled on touch and under prefers-reduced-motion.
- GSAP + ScrollTrigger: imported dynamically on the landing route only. Used for exactly two things: hero reveal, ROI re-rank.
- CSS `animation-timeline: view()` for the one below-fold effect (How it works screenshots).
- Reduced motion: every base CSS state is the finished state. JS timelines are skipped entirely. Nothing is ever hidden without JS.
- Forbidden: per-section fade-and-slide-up, hover lifts, parallax backgrounds, animated gradients, cursor effects.

## Sequence

| # | Section | Trigger | What moves | Duration | Mobile | Reduced motion |
|---|---------|---------|-----------|----------|--------|----------------|
| 1 | Hero | page load, once | H1 lines, lead, buttons, chip, then screenshot translateY 24→0 + opacity | ≤900ms total, 80ms stagger | same | rendered finished |
| 2 | Header | scrollY > 8px | hairline bottom rule fades in | 160ms | same | instant |
| 2b | Sticky CTA bar | hero primary CTA leaves viewport | bar slides up from bottom | 320ms | mobile/tablet only (<1024px) | instant show |
| 3 | ROI comparison | desktop: pin block for 80vh, scrub 0→1. mobile: one-shot at 40% in view | rows FLIP from chapter order to ROI order; figures count 0→N; "projected" label static throughout | desktop scrubbed; mobile 480ms | no pin, one-shot | final ROI order, figures at N |
| 4 | How it works | each screenshot enters viewport | opacity 0.6→1 | over 30% of entry | same | opacity 1 |
| 5 | Video | click on Play | poster → video element | 160ms crossfade | same | instant swap |
| 6 | Proof | none | — | — | — | — |
| 6b | Testimonials | user drag / arrow keys | slide change | 320ms | swipe | instant |
| 7 | Pricing | 50% in view | analytics event only | — | — | — |
| 8 | Guarantee + FAQ | trigger click | accordion height + plus/minus glyph | 240ms | same | instant |
| 9 | Final CTA | its button enters viewport | sticky bar hides | 320ms | mobile only | instant |

## ROI re-rank detail (the moment)
- Initial state visible to the user: right list in chapter order with figures at 0.
- Desktop: ScrollTrigger pins the block (start "top 15%"), scrub true, end "+=80%". Progress 0→0.6 drives the FLIP re-order; 0.3→1 drives the count-up. Once progress reaches 1 the block unpins and the state is frozen; scrolling back up does not reverse it (set `once` after completion).
- Mobile: no pin. At 40% in view, play the same timeline once at 480ms.
- The comparison's left list ("Chapter order") never moves; only the right list re-ranks. That contrast is the point.

## Analytics events tied to scroll/interaction
- diagnostic_start {placement: header|hero|sticky|pricing|final}
- video_play
- pricing_view (once, 50% visible)
- roi_rerank_complete (desktop: progress = 1; mobile: timeline complete) — used to check whether visitors reach the moment
- checkout_start, purchase (downstream, /diagnostic app)
