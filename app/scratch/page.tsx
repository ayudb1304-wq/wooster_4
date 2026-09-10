// Temporary type and button specimen for step 00 verification. Delete after screenshots.
import { Button } from "@/components/ui/button";

export default function Scratch() {
  return (
    <main id="scratch">
      <section className="bg-ink text-paper px-gutter py-section-y">
        <h1 className="text-display1">Moneyball your SAT. Study what actually moves your score.</h1>
        <p className="text-lead text-paper-muted mt-6 max-w-[48ch]">
          A free diagnostic finds your highest-ROI gaps. Then you train only those, in order, from
          6,000 real questions.
        </p>
        <p className="text-body mt-6">
          Body text on ink. Most students spend hours on topics worth a few points. Wooster ranks
          every concept by how much it moves your score, and how fast you can learn it.
        </p>
        <p className="text-small text-paper-muted mt-4">Small text on ink, paper-muted.</p>
        <div className="mt-8 flex items-baseline gap-3">
          <span className="font-mono-figure text-stat text-signal">+42</span>
          <span className="text-small text-paper-muted">projected</span>
        </div>
        <p className="font-mono-figure text-price mt-6">$249.99</p>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <Button>Start free diagnostic</Button>
          <Button variant="secondary" tone="onInk">
            Student login
          </Button>
        </div>
      </section>

      <section className="bg-paper text-ink px-gutter py-section-y">
        <h2 className="text-display2">Generic prep goes chapter by chapter. Your score doesn&apos;t.</h2>
        <p className="text-body mt-6">
          Body on paper. Most students spend hours on topics worth a few points. Wooster ranks every
          concept by how much it moves your score, and how fast you can learn it. You start at the top.
        </p>
        <p className="text-small text-ink-muted mt-4">Small text on paper, ink-muted.</p>
        <p className="font-body-strong mt-4">Body 600, concept label style.</p>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <Button>Start free diagnostic</Button>
          <Button variant="secondary">Student login</Button>
        </div>
      </section>
    </main>
  );
}
