import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroReveal } from "@/components/HeroReveal";

// Copy: content/copy.md → Hero. Verbatim, nothing added.
export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ink text-paper min-h-[88svh] lg:min-h-0"
      data-hero
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-12 px-gutter pt-12 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-24 lg:pb-32">
        <div className="lg:col-span-7 lg:col-start-1">
          <h1 className="text-display1 text-paper" data-hero-reveal>
            Moneyball your SAT. Study what actually moves your score.
          </h1>
          <p className="text-lead mt-6 max-w-[48ch] text-paper-muted" data-hero-reveal>
            A free diagnostic finds your highest-ROI gaps. Then you train only those, in order,
            from 6,000 real questions.
          </p>
          <div className="mt-8 flex flex-col items-start gap-tap-gap sm:flex-row sm:items-center sm:gap-6" data-hero-reveal>
            <Button
              full
              className="sm:w-auto"
              nativeButton={false}
              render={<Link href="/diagnostic" data-hero-cta data-placement="hero" />}
            >
              Start free diagnostic
            </Button>
            <a
              href="#video"
              className="inline-flex min-h-tap items-center text-body text-paper underline decoration-paper-muted underline-offset-4 hover:decoration-paper"
            >
              Watch 90 sec
            </a>
          </div>
          <p className="mt-6" data-hero-reveal>
            <span className="inline-flex min-h-8 items-center rounded-full border border-paper-edge/40 px-3 text-small text-paper-muted">
              7-day score-fit guarantee
            </span>
          </p>
        </div>

        <div
          className="relative self-center lg:col-span-5 lg:col-start-8"
          data-hero-reveal="screenshot"
        >
          <Image
            src="/screens/roi-plan.png"
            alt="Wooster study plan ranking SAT concepts by projected points gained"
            width={1138}
            height={932}
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-auto w-full rounded-screenshot shadow-screenshot"
          />
        </div>
      </div>
      <HeroReveal />
    </section>
  );
}
