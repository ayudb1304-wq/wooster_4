import { Testimonials } from "@/components/Testimonials";
import { SectionBackground } from "@/components/SectionBackground";

// Copy: content/copy.md → Proof. Verbatim. No animation in this section.
const stats = ["6,000 questions", "Digital SAT aligned", "7-day score-fit guarantee"];

export function Proof() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper" data-section-theme="ink">
      <SectionBackground variant="dots" />
      <div className="relative mx-auto max-w-[1440px] px-gutter py-section-y">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <h2 className="text-display2 text-paper">See your plan before you pay a cent.</h2>
            <p className="mt-6 max-w-[60ch] text-body text-paper-muted">
              The diagnostic is free, and it shows your full ROI ranking, not a teaser. If the plan
              doesn&apos;t fit, you owe nothing. If you buy and it isn&apos;t working in 7 days, we
              refund you.
            </p>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3 lg:mt-16">
          {stats.map((item) => (
            <li key={item} className="border-t border-paper-muted/30 pt-4 font-body-strong text-body text-paper">
              {item}
            </li>
          ))}
        </ul>

        <Testimonials />

        <p className="mt-12 max-w-[60ch] text-small text-paper-muted lg:mt-16">
          Score gains shown are model projections. We publish real results as students report them.
        </p>
      </div>
    </section>
  );
}
