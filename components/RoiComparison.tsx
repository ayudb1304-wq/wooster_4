import { chapterOrder, roiRows } from "@/content/roi";
import { RoiRerank } from "@/components/RoiRerank";

// Copy: content/copy.md → Problem / ROI comparison. Verbatim.
// This is the page's one memorable moment and its one grid-breaking moment:
// the lists block breaks upward across the hero boundary by 64px on desktop.
export function RoiComparison() {
  return (
    <section className="relative z-10 bg-paper text-ink" data-roi-section>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-12 px-gutter pb-section-y pt-12 lg:grid-cols-12 lg:gap-x-8 lg:pt-0">
        <div className="lg:col-span-5 lg:col-start-1 lg:pt-4">
          <h2 className="text-display2">Generic prep goes chapter by chapter. Your score doesn&apos;t.</h2>
          <p className="mt-6 max-w-[60ch] text-body">
            Most students spend hours on topics worth a few points. Wooster ranks every concept by
            how much it moves your score, and how fast you can learn it. You start at the top.
          </p>
        </div>

        <div
          className="bg-paper lg:col-span-7 lg:col-start-6 lg:-mt-16 lg:px-8 lg:pt-8"
          data-roi-block
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
            <div>
              <p className="text-small text-ink-muted">Chapter order</p>
              <ol className="mt-3 border-t border-paper-edge">
                {chapterOrder.map((concept) => (
                  <li
                    key={concept}
                    className="flex h-14 items-center whitespace-nowrap border-b border-paper-edge font-body-strong text-body"
                  >
                    {concept}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-small text-ink-muted">Wooster ROI order</p>
              <ol className="mt-3 border-t border-paper-edge" data-roi-list>
                {roiRows.map((row, i) => (
                  <li
                    key={row.concept}
                    className="flex h-14 items-center justify-between gap-4 border-b border-paper-edge"
                    data-roi-row
                    data-roi-index={i}
                    data-chapter-index={chapterOrder.indexOf(row.concept)}
                  >
                    <span className="whitespace-nowrap font-body-strong text-body">{row.concept}</span>
                    <span className="flex shrink-0 items-baseline gap-2">
                      <span
                        className="min-w-[3ch] text-right font-mono-figure text-stat-row text-signal"
                        data-roi-figure
                        data-value={row.projected}
                      >
                        +{row.projected}
                      </span>
                      <span className="w-[5.5em] text-small text-ink-muted">projected</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-small text-ink-muted">Projected gain, from your diagnostic</p>
            </div>
          </div>
        </div>
      </div>
      <RoiRerank />
    </section>
  );
}
