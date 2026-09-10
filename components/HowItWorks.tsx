import Image from "next/image";
import { SectionBackground } from "@/components/SectionBackground";

// Copy: content/copy.md → How it works. Verbatim. "[25] minutes" is a founder-confirmed value.
const steps = [
  {
    n: "1",
    name: "Diagnose",
    text: "25 minutes, free. We find exactly where points are hiding.",
    src: "/screens/diagnostic.png",
    alt: "Diagnostic question screen",
    width: 1120,
    height: 875,
  },
  {
    n: "2",
    name: "Get your ROI plan",
    text: "Every concept ranked by projected points per hour.",
    src: "/screens/roi-plan.png",
    alt: "ROI plan list",
    width: 1138,
    height: 932,
  },
  {
    n: "3",
    name: "Train and track",
    text: "Work the top of the list. Watch your projection update as you go.",
    src: "/screens/progress.png",
    alt: "Progress view with updated projection",
    width: 1028,
    height: 922,
  },
];

// Three aligned columns. Text blocks share one height and every screenshot is
// cropped to the same 4:3 frame from the top, so all three images sit on the
// same top and bottom lines. No borders, no cards, no icons, no hover effects.
// The only motion is the CSS scroll-driven fade on each screenshot.
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-paper text-ink"
      data-section-theme="paper"
    >
      <SectionBackground variant="grid" />
      <div className="relative mx-auto max-w-[1440px] px-gutter py-section-y">
        <h2 className="text-display2">Three steps. No guesswork.</h2>

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 lg:mt-16 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="flex flex-col">
              <div className="lg:min-h-44">
                <p className="font-display text-display2 text-ink-muted" aria-hidden="true">
                  {step.n}
                </p>
                <h3 className="mt-2 max-w-none font-body-strong text-body text-ink">
                  <span className="sr-only">Step {step.n}: </span>
                  {step.name}
                </h3>
                <p className="mt-1 max-w-[36ch] text-body text-ink-muted">{step.text}</p>
              </div>
              <div className="screenshot-enter mt-8 aspect-[4/3] w-full overflow-hidden rounded-screenshot shadow-screenshot">
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  loading="lazy"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
