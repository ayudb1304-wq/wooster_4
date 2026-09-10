import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingView } from "@/components/PricingView";
import { SectionBackground } from "@/components/SectionBackground";

// Copy: content/copy.md → Pricing. Verbatim, except the en dash in the anchor
// line is written as "to" per house style.
// Layout follows the founder's reference: a rounded card with title and
// subtitle, an inner panel listing the plan with check marks, and a footer
// with the price beside a pill button.
const bullets = [
  { text: "Your personalized ROI plan" },
  { text: "All 6,000 questions, tracked adaptively" },
  { text: "Projection updates after every session" },
  { text: "7-day score-fit guarantee", href: "#guarantee" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-ink text-paper" data-section-theme="ink">
      <SectionBackground variant="dots" />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-y-12 px-gutter py-section-y lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div className="lg:col-span-5 lg:col-start-1">
          <h2 className="text-display2 text-paper">One plan.</h2>
          <p className="mt-6 max-w-[40ch] text-body text-paper-muted">
            About the price of a good textbook. Big-brand courses run $400 to $2,000.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-panel bg-ink-deep p-6 shadow-screenshot md:p-8">
            <p className="font-display-strong wonk-off text-lead text-paper">Wooster SAT Prep</p>
            <p className="mt-1 text-body text-paper-muted">Start free, upgrade when you see your plan.</p>

            <ul className="mt-6 rounded-panel-inner bg-ink px-5 py-3 md:px-6">
              {bullets.map((b) => (
                <li key={b.text} className="flex items-center gap-4 py-3 text-body text-paper">
                  <Check className="size-5 shrink-0 text-signal" strokeWidth={2.5} aria-hidden="true" />
                  {b.href ? (
                    <a href={b.href} className="underline decoration-paper-muted underline-offset-4 hover:decoration-paper">
                      {b.text}
                    </a>
                  ) : (
                    b.text
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-small text-paper-muted">for two months</p>
                <p className="mt-1 font-mono-figure text-stat text-paper">$249.99</p>
              </div>
              <Button
                size="lg"
                full
                className="rounded-pill sm:w-auto"
                nativeButton={false}
                render={<Link href="/diagnostic" data-placement="pricing" />}
              >
                Start free diagnostic
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PricingView />
    </section>
  );
}
