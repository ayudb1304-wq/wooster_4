import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RoiComparison } from "@/components/RoiComparison";
import { HowItWorks } from "@/components/HowItWorks";
import { StickyCta } from "@/components/StickyCta";

// Sections are assembled here in the fixed order from CLAUDE.md as each one is built.
// The ink block below is a scroll placeholder until step 05 adds the video.
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RoiComparison />
        <HowItWorks />
        <section className="bg-ink px-gutter py-section-y text-paper" style={{ minHeight: "60vh" }} data-section-theme="ink">
          <p className="text-small text-paper-muted">Scroll area placeholder (replaced in step 05)</p>
        </section>
      </main>
      <StickyCta />
    </>
  );
}
