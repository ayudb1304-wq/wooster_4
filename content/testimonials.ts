// Real testimonials only. Ships empty; the Testimonials block renders nothing
// until entries exist. Sample data lives in testimonials.sample.ts and is only
// imported when NEXT_PUBLIC_SAMPLE_TESTIMONIALS === "true".
export type Testimonial = {
  name: string;
  school: string;
  year: string;
  before: number;
  after: number;
  quote: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [];
