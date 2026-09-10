"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Lottie accent (founder request). The dotLottie player is loaded only when
// this component is on the page and near the viewport, so it never ships to
// visitors who do not reach the block. Plays while in view, pauses out of view,
// and stays on its first frame under prefers-reduced-motion.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

type Props = { src: string; className?: string; label?: string };

export function LottieAccent({ src, className = "", label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        setInView(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    // Fallback for environments where the observer is deferred: a direct bounds
    // check on mount and on scroll. Cheap, and covers already-in-view mounts.
    const check = () => {
      const r = el.getBoundingClientRect();
      const within = r.bottom > -200 && r.top < window.innerHeight + 200;
      if (within) {
        setNear(true);
        setInView(true);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
    };
  }, []);

  return (
    <div ref={ref} className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={!label}>
      {near && (
        <DotLottieReact src={src} loop autoplay={inView && !reduced} className="h-full w-full" />
      )}
    </div>
  );
}
