"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/*
  Circular Testimonials, adapted from the 21st.dev component for this codebase:
  - framer-motion replaced with CSS keyframes (quote-in, word-in in globals.css),
    since the project bans Motion/Framer and already ships GSAP.
  - react-icons replaced with lucide-react, already installed.
  - styled-jsx replaced with Tailwind classes; every colour, radius, shadow and
    font comes from the design tokens.
  - Keyboard arrows work when the block has focus, not globally.
  - Autoplay pauses under prefers-reduced-motion and while off screen.
  - Photo is optional; without one a monogram block is shown.
*/
export interface CircularTestimonial {
  quote: string;
  name: string;
  designation: string;
  score?: string;
  scoreLabel?: string;
  src?: string;
}

interface CircularTestimonialsProps {
  testimonials: CircularTestimonial[];
  autoplay?: boolean;
  intervalMs?: number;
}

function calculateGap(width: number) {
  // Narrow stacks (phones) get a tighter offset so the side photos stay inside the frame.
  if (width < 560) return Math.max(16, Math.round(width * 0.08));
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  intervalMs = 5000,
}: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [canAnimate, setCanAnimate] = useState(false);
  const [inView, setInView] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const total = testimonials.length;
  const active = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  // Motion preference and visibility gate the autoplay.
  useEffect(() => {
    setCanAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Responsive gap.
  useEffect(() => {
    const onResize = () => {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!autoplay || !canAnimate || !inView || total < 2) return;
    timerRef.current = window.setInterval(() => setActiveIndex((p) => (p + 1) % total), intervalMs);
    return stopAutoplay;
  }, [autoplay, canAnimate, inView, total, intervalMs, stopAutoplay]);

  const next = useCallback(() => {
    setActiveIndex((p) => (p + 1) % total);
    stopAutoplay();
  }, [total, stopAutoplay]);
  const prev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + total) % total);
    stopAutoplay();
  }, [total, stopAutoplay]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const transition = canAnimate ? "all 0.8s cubic-bezier(.4,2,.3,1)" : "none";

  function imageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const lift = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + total) % total === index;
    const isRight = (activeIndex + 1) % total === index;
    if (isActive) {
      return { zIndex: 3, opacity: 1, transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition };
    }
    if (isLeft && total > 1) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(-${gap}px) translateY(-${lift}px) scale(0.85) rotateY(15deg)`,
        transition,
      };
    }
    if (isRight && total > 2) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(${gap}px) translateY(-${lift}px) scale(0.85) rotateY(-15deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition };
  }

  if (total === 0) return null;

  return (
    <div
      ref={rootRef}
      className="w-full outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student testimonials"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Photo stack */}
        <div ref={imageContainerRef} className="relative h-80 w-full [perspective:1000px] md:h-96">
          {testimonials.map((t, index) => {
            const style = imageStyle(index);
            const hidden = index !== activeIndex;
            return t.src ? (
              // Plain img on purpose: sample photos are remote and the block never ships without real data.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${t.name}-${index}`}
                src={t.src}
                alt={t.name}
                loading="lazy"
                aria-hidden={hidden}
                className="absolute inset-0 h-full w-full rounded-screenshot object-cover shadow-screenshot"
                style={style}
              />
            ) : (
              <div
                key={`${t.name}-${index}`}
                aria-hidden={hidden}
                className="absolute inset-0 flex h-full w-full items-center justify-center rounded-screenshot bg-ink-deep font-display text-display1 text-paper-muted shadow-screenshot"
                style={style}
              >
                {initials(t.name)}
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <div key={activeIndex} className={canAnimate ? "quote-in" : undefined} aria-live="polite">
            <p className="font-body-strong text-lead text-paper">{active.name}</p>
            <p className="mt-1 text-body text-paper-muted">{active.designation}</p>
            {active.score && (
              <p className="mt-4 font-mono-figure text-lead text-signal">{active.score}</p>
            )}
            {active.scoreLabel && <p className="text-small text-paper-muted">{active.scoreLabel}</p>}
            <p className="mt-8 max-w-[44ch] font-display text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.35] text-paper">
              {active.quote.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={canAnimate ? "word-in inline-block" : "inline-block"}
                  style={canAnimate ? { animationDelay: `${i * 25}ms` } : undefined}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>

          <div className="mt-10 flex gap-tap-gap md:mt-0 md:pt-10">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="inline-flex size-tap items-center justify-center rounded-button border border-paper text-paper transition-colors duration-(--duration-fast) ease-out hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <ArrowLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="inline-flex size-tap items-center justify-center rounded-button border border-paper text-paper transition-colors duration-(--duration-fast) ease-out hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <ArrowRight className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircularTestimonials;
