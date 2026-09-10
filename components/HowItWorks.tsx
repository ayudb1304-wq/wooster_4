import Image from "next/image";

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

// Bento: step 1 is tall at left (cols 1 to 5, two rows); steps 2 and 3 stack at right.
// No icons, no hover effects. The only motion is the CSS scroll-driven fade on each screenshot.
export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper text-ink" data-section-theme="paper">
      <div className="mx-auto max-w-[1440px] px-gutter py-section-y">
        <h2 className="text-display2">Three steps. No guesswork.</h2>

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 lg:mt-16 lg:grid-cols-12 lg:grid-rows-2 lg:gap-y-16">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={
                i === 0
                  ? "flex flex-col lg:col-span-5 lg:row-span-2"
                  : "grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-end lg:col-span-7 lg:col-start-6"
              }
            >
              <div>
                <p className="font-display text-display2 text-ink-muted" aria-hidden="true">
                  {step.n}
                </p>
                <h3 className="mt-2 font-body-strong text-body text-ink max-w-none">
                  <span className="sr-only">Step {step.n}: </span>
                  {step.name}
                </h3>
                <p className="mt-1 max-w-[40ch] text-body text-ink-muted">{step.text}</p>
              </div>
              <div className={i === 0 ? "mt-8 flex flex-1 items-end" : ""}>
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  loading="lazy"
                  sizes={i === 0 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 34vw, (min-width: 768px) 60vw, 100vw"}
                  className="screenshot-enter h-auto w-full rounded-screenshot shadow-screenshot"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
