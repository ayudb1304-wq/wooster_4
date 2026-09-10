import type { Testimonial } from "@/content/testimonials";

// Sample data for layout work only. Imported solely when
// NEXT_PUBLIC_SAMPLE_TESTIMONIALS === "true". Never ships to production.
export const sampleTestimonials: Testimonial[] = [
  {
    name: "Sample Student A",
    school: "Sample High School",
    year: "Class of 2027",
    before: 1240,
    after: 1390,
    quote:
      "I stopped grinding vocabulary and spent two weeks on linear equations and transitions. That was the whole difference.",
  },
  {
    name: "Sample Student B",
    school: "Sample Academy",
    year: "Class of 2026",
    before: 1120,
    after: 1310,
    quote: "The plan told me what to skip. I had never had anything tell me what to skip before.",
  },
  {
    name: "Sample Student C",
    school: "Sample Prep",
    year: "Class of 2027",
    before: 1350,
    after: 1480,
    quote: "Watching the projection move after each session kept me going on the boring days.",
  },
];
