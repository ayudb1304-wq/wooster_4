"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/content/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/*
  Embla via the shadcn Carousel. The selected (centre) slide is the featured
  quote in display type; the flanking slides are narrower and lower contrast,
  which breaks the three-identical-cards pattern. Three are visible on load at
  desktop; extra entries scroll. Mobile shows one ~85vw card with the next
  peeking. Arrow keys move slides (Embla handles keyboard on the focused
  viewport), prev/next are 48px, swipe works. Under prefers-reduced-motion the
  global rule removes Embla's transform transition so changes are instant.
*/
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "center", startIndex: Math.min(1, items.length - 1), loop: items.length > 3 }}
      className="mt-8"
    >
      <CarouselContent className="-ml-4 lg:-ml-8">
        {items.map((t, i) => {
          const featured = i === selected;
          return (
            <CarouselItem
              key={`${t.name}-${i}`}
              className={
                "pl-4 basis-[85%] transition-[flex-basis,opacity] duration-(--duration-base) ease-out lg:pl-8 " +
                (featured ? "lg:basis-[44%] opacity-100" : "lg:basis-[28%] opacity-60")
              }
            >
              <figure className="flex h-full flex-col justify-between border-t border-paper-muted/30 pt-6">
                <blockquote
                  className={
                    featured
                      ? "font-display text-[clamp(1.375rem,2.2vw,2rem)] leading-[1.15] text-paper"
                      : "text-body text-paper-muted"
                  }
                >
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-body-strong text-body text-paper">{t.name}</p>
                  <p className="text-small text-paper-muted">{t.school}</p>
                  <p className="text-small text-paper-muted">{t.year}</p>
                  <p
                    className={
                      "mt-4 font-mono-figure text-lead " + (featured ? "text-signal" : "text-paper")
                    }
                  >
                    {t.before} → {t.after}
                  </p>
                  <p className="text-small text-paper-muted">reported by student</p>
                </figcaption>
              </figure>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-8 flex gap-tap-gap">
        <CarouselPrevious className="static translate-y-0" tone="onInk" />
        <CarouselNext className="static translate-y-0" tone="onInk" />
      </div>
    </Carousel>
  );
}
