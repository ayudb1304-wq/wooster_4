import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RoiComparison } from "@/components/RoiComparison";
import { StickyCta } from "@/components/StickyCta";

// Sections are assembled here in the fixed order from CLAUDE.md as each one is built.
// The paper block below is a scroll placeholder until step 04 adds How it works.
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RoiComparison />
        <section className="bg-paper px-gutter py-section-y" style={{ minHeight: "120vh" }}>
          <p className="text-small text-ink-muted">Scroll area placeholder (replaced in step 04)</p>
        </section>
      </main>
      <StickyCta />
    </>
  );
}
