import { ElasticGallery } from "@/components/ui/elastic-gallery";
import { SectionBackground } from "@/components/SectionBackground";

// Copy: content/copy.md → How it works. Verbatim. "[25] minutes" is a founder-confirmed value.
const steps = [
  {
    id: "1",
    title: "Diagnose",
    description: "25 minutes, free. We find exactly where points are hiding.",
    src: "/screens/diagnostic.png",
    alt: "Diagnostic question screen",
    width: 1120,
    height: 875,
  },
  {
    id: "2",
    title: "Get your ROI plan",
    description: "Every concept ranked by projected points per hour.",
    src: "/screens/roi-plan.png",
    alt: "ROI plan list",
    width: 1138,
    height: 932,
  },
  {
    id: "3",
    title: "Train and track",
    description: "Work the top of the list. Watch your projection update as you go.",
    src: "/screens/progress.png",
    alt: "Progress view with updated projection",
    width: 1028,
    height: 922,
  },
];

// The three steps as an elastic gallery (founder request): the active panel
// expands to show its screenshot, number, name and description; the others
// collapse to a labelled strip. Step 1 opens first. The text is also listed
// below the gallery for screen readers and for anyone who wants all three at once.
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

        <div className="mt-12 lg:mt-16">
          <ElasticGallery items={steps} initialId="1" />
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3 lg:mt-12">
          {steps.map((step) => (
            <li key={step.id} className="border-t border-paper-edge pt-4">
              <p className="font-body-strong text-body text-ink">
                <span className="mr-2 font-display text-lead text-ink-muted" aria-hidden="true">
                  {step.id}
                </span>
                <span className="sr-only">Step {step.id}: </span>
                {step.title}
              </p>
              <p className="mt-1 max-w-[36ch] text-body text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
