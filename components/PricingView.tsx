"use client";

import { useEffect } from "react";

// Fires "pricing_view" once when the pricing section is 50% in view (motion spec item 7).
export function PricingView() {
  useEffect(() => {
    const section = document.getElementById("pricing");
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(new CustomEvent("pricing_view"));
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);
  return null;
}
