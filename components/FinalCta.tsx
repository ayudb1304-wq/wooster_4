import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionBackground } from "@/components/SectionBackground";

// Copy: content/copy.md → Final CTA. Verbatim. H2 at display1 size, cols 1 to 9,
// primary button beneath. Nothing else. The button carries data-final-cta so
// the sticky mobile bar hides while it is in view.
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper" data-section-theme="ink">
      <SectionBackground variant="dots" />
      <div className="relative mx-auto max-w-[1440px] px-gutter py-section-y lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-9">
            <h2 className="text-display1 text-paper">Stop studying everything. Find your six things.</h2>
            <div className="mt-10 lg:mt-12">
              <Button
                size="lg"
                full
                className="sm:w-auto"
                nativeButton={false}
                render={<Link href="/diagnostic" data-final-cta data-placement="final" />}
              >
                Start free diagnostic
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
