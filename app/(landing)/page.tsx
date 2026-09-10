import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RoiComparison } from "@/components/RoiComparison";
import { HowItWorks } from "@/components/HowItWorks";
import { ConceptVideo } from "@/components/ConceptVideo";
import { Proof } from "@/components/Proof";
import { Pricing } from "@/components/Pricing";
import { GuaranteeFaq } from "@/components/GuaranteeFaq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";

// Fixed section order from CLAUDE.md. One H1 (hero); every section an H2;
// testimonials an H3.
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RoiComparison />
        <HowItWorks />
        <ConceptVideo />
        <Proof />
        <Pricing />
        <GuaranteeFaq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
