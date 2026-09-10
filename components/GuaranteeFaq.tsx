import { faq } from "@/content/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionBackground } from "@/components/SectionBackground";

// Copy: content/copy.md → Guarantee + FAQ. Verbatim.
// Layout follows the founder's reference: one bordered panel split in two.
// Left: the guarantee inside a signal block with ink text (the page's second
// and last use of signal outside buttons and scores). Right: the FAQ accordion.
// Stacked on mobile.
export function GuaranteeFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="relative overflow-hidden bg-paper text-ink" data-section-theme="paper">
      <SectionBackground variant="grid" />
      <div className="relative mx-auto max-w-[1440px] px-gutter py-section-y">
        <div className="grid grid-cols-1 overflow-hidden rounded-panel border border-paper-edge bg-paper lg:grid-cols-12">
          <div id="guarantee" className="scroll-mt-24 bg-signal p-6 text-ink md:p-10 lg:col-span-5 lg:p-12">
            <p className="text-small text-ink-muted">Guarantee</p>
            <h2 className="mt-4 text-display2 text-ink">The 7-day score-fit guarantee</h2>
            <p className="mt-6 max-w-[44ch] text-body text-ink">
              Buy, work your plan for 7 days. If your projected score doesn&apos;t move, or the
              plan doesn&apos;t fit how you study, email us for a full refund.
            </p>
          </div>

          <div className="border-t border-paper-edge p-6 md:p-10 lg:col-span-7 lg:border-t-0 lg:border-l lg:p-12">
            <Accordion defaultValue={[faq[0].q]}>
              {faq.map((item) => (
                <AccordionItem key={item.q} value={item.q} className="border-paper-edge">
                  <AccordionTrigger className="text-ink">{item.q}</AccordionTrigger>
                  <AccordionContent className="max-w-[60ch] text-ink-muted">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
