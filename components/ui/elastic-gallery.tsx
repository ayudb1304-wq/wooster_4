"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/*
  Elastic Gallery, adapted from the 21st.dev component for this codebase:
  - Items come in as props instead of being hard-coded.
  - Colours, radius, shadow and type come from the design tokens; the
    all-caps tag and title are sentence case per the copy rules.
  - The "View project" call to action is removed (nothing to link to).
  - Under prefers-reduced-motion the global rule removes the transitions, so
    panels snap between states.
  Hover or click a panel to expand it. The active panel shows the step's
  screenshot with its number, name and description; inactive panels show the
  step name rotated on desktop and the number on mobile.
*/
export interface ElasticItem {
  id: string;
  title: string;
  description?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ElasticGalleryProps {
  items: ElasticItem[];
  initialId?: string;
  className?: string;
}

const ease = "ease-[cubic-bezier(0.25,1,0.5,1)]";

export function ElasticGallery({ items, initialId, className }: ElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string>(initialId ?? items[0]?.id ?? "");

  return (
    <div
      className={cn("flex h-[520px] w-full flex-col gap-2 md:h-[600px] md:flex-row md:gap-4", className)}
      role="list"
    >
      {items.map((item) => {
        const active = activeId === item.id;
        return (
          <div
            key={item.id}
            role="listitem"
            tabIndex={0}
            onMouseEnter={() => setActiveId(item.id)}
            onFocus={() => setActiveId(item.id)}
            onClick={() => setActiveId(item.id)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-screenshot bg-ink-deep shadow-screenshot outline-none",
              "transition-[flex,filter] duration-(--duration-reveal)",
              ease,
              active ? "flex-[4]" : "flex-[1]",
              active ? "brightness-100" : "brightness-[.55] hover:brightness-75",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
            )}
          >
            <div className="absolute inset-0">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={cn(
                  "object-cover object-top transition-transform duration-1000",
                  ease,
                  active ? "scale-100" : "scale-110",
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/30 to-transparent transition-opacity duration-(--duration-base)",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
              {/* Active content */}
              <div
                className={cn(
                  "flex flex-col gap-2 transition-all duration-(--duration-base)",
                  ease,
                  active ? "translate-y-0 opacity-100 delay-200" : "translate-y-12 opacity-0",
                )}
                aria-hidden={!active}
              >
                <span className="font-display text-display2 leading-none text-paper-muted">{item.id}</span>
                <h3 className="max-w-none font-body-strong text-lead text-paper">{item.title}</h3>
                {item.description && (
                  <p className="max-w-[44ch] text-body text-paper-muted">{item.description}</p>
                )}
              </div>

              {/* Inactive label */}
              <div
                className={cn(
                  "absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-(--duration-base) md:bottom-8",
                  ease,
                  active ? "scale-50 opacity-0" : "opacity-100 delay-300",
                )}
                aria-hidden={active}
              >
                <span className="hidden whitespace-nowrap font-body-strong text-body text-paper [writing-mode:vertical-rl] md:block">
                  {item.title}
                </span>
                <span className="block font-display text-lead text-paper md:hidden">{item.id}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ElasticGallery;
