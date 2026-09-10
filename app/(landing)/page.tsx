import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";

// Sections are assembled here in the fixed order from CLAUDE.md as each one is built.
// The placeholder below stands in for the hero until step 02 and exists only so the
// sticky bar has a hero CTA to watch.
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-ink px-gutter py-section-y text-paper" style={{ minHeight: "88svh" }}>
          <p className="text-small text-paper-muted">Hero placeholder (replaced in step 02)</p>
          <span data-hero-cta className="mt-8 inline-block h-tap w-48 border border-paper-muted/40" />
        </section>
        <section className="bg-paper px-gutter py-section-y" style={{ minHeight: "200vh" }}>
          <p className="text-small text-ink-muted">Scroll area placeholder</p>
        </section>
      </main>
      <StickyCta />
    </>
  );
}
