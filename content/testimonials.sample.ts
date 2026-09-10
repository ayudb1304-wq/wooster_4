import type { Testimonial } from "@/content/testimonials";

// Sample data for layout work only. Photos are Unsplash stock, sample use only. Imported solely when
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
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Sample Student B",
    school: "Sample Academy",
    year: "Class of 2026",
    before: 1120,
    after: 1310,
    quote: "The plan told me what to skip. I had never had anything tell me what to skip before.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Sample Student C",
    school: "Sample Prep",
    year: "Class of 2027",
    before: 1350,
    after: 1480,
    quote: "Watching the projection move after each session kept me going on the boring days.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=80&auto=format&fit=crop",
  },
];
