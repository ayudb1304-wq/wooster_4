import { testimonials, type Testimonial } from "@/content/testimonials";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { LottieAccent } from "@/components/LottieAccent";

// Copy: content/copy.md → Proof → Testimonials block. Verbatim.
// Renders nothing until real entries exist in content/testimonials.ts.
// Sample entries are only pulled in when NEXT_PUBLIC_SAMPLE_TESTIMONIALS === "true".
async function loadTestimonials(): Promise<Testimonial[]> {
  if (testimonials.length > 0) return testimonials;
  if (process.env.NEXT_PUBLIC_SAMPLE_TESTIMONIALS === "true") {
    const { sampleTestimonials } = await import("@/content/testimonials.sample");
    return sampleTestimonials;
  }
  return [];
}

export async function Testimonials() {
  const items = await loadTestimonials();
  if (items.length === 0) return null;

  return (
    <div className="mt-16 lg:mt-24">
      <p className="text-body text-paper-muted">Real scores, sent to us by students</p>
      <div className="mt-2 flex items-center gap-4">
        <h3 className="max-w-none text-display2 text-paper">Reported by students</h3>
        {/* Lottie accent. Replace public/lottie/reported.json with a LottieFiles pick. */}
        <LottieAccent src="/lottie/reported.json" className="h-14 w-14 shrink-0 lg:h-16 lg:w-16" />
      </div>
      <TestimonialCarousel items={items} />
    </div>
  );
}
