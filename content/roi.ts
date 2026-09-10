// Sample rows from content/copy.md → Problem / ROI comparison.
// Figures are model projections. Always rendered with the word "projected".
export type RoiRow = { concept: string; projected: number };

// Wooster ROI order (the final, visible-by-default order).
export const roiRows: RoiRow[] = [
  { concept: "Linear equations", projected: 42 },
  { concept: "Data analysis", projected: 38 },
  { concept: "Transitions", projected: 31 },
  { concept: "Punctuation", projected: 24 },
  { concept: "Geometry", projected: 11 },
  { concept: "Vocabulary", projected: 6 },
];

// Textbook chapter order, the left list and the re-rank's starting state.
export const chapterOrder: string[] = [
  "Vocabulary",
  "Geometry",
  "Punctuation",
  "Transitions",
  "Data analysis",
  "Linear equations",
];
