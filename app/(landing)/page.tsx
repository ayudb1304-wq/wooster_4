import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StickyCta } from "@/components/StickyCta";

// Sections are assembled here in the fixed order from CLAUDE.md as each one is built.
// The paper block below is a scroll placeholder until step 03 adds the ROI comparison.
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="bg-paper px-gutter py-section-y" style={{ minHeight: "200vh" }}>
          <p className="text-small text-ink-muted">Scroll area placeholder (replaced in step 03)</p>
        </section>
      </main>
      <StickyCta />
    </>
  );
}
