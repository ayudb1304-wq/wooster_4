import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingView } from "@/components/PricingView";
import { SectionBackground } from "@/components/SectionBackground";

// Copy: content/copy.md → Pricing. Verbatim, except the en dash in the anchor
// line is written as "to" per house style.
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
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-y-12 px-gutter py-section-y lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6 lg:col-start-1">
          <h2 className="text-display2 text-paper">One plan.</h2>
          <p className="mt-10 font-mono-figure text-price text-paper">$249.99</p>
          <p className="mt-2 text-body text-paper-muted">for two months</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-t border-paper-muted/30">
            {bullets.map((b) => (
              <li key={b.text} className="border-b border-paper-muted/30 py-4 text-body text-paper">
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
          <p className="mt-8 max-w-[48ch] text-body text-paper-muted">
            About the price of a good textbook. Big-brand courses run $400 to $2,000.
          </p>
          <div className="mt-8">
            <Button
              full
              className="lg:w-auto"
              nativeButton={false}
              render={<Link href="/diagnostic" data-placement="pricing" />}
            >
              Start free diagnostic
            </Button>
            <p className="mt-3 text-small text-paper-muted">Start free, upgrade when you see your plan.</p>
          </div>
        </div>
      </div>
      <PricingView />
    </section>
  );
}
