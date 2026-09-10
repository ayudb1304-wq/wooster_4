// Subtle texture behind a section. Ink sections get paper dots, paper sections
// get an ink grid. Purely decorative, sits under the content, never captures
// pointer events. Parent must be position: relative.
type Props = { variant: "dots" | "grid"; className?: string };

export function SectionBackground({ variant, className = "" }: Props) {
  const pattern =
    variant === "dots"
      ? "pattern-dots text-paper opacity-[0.07]"
      : "pattern-grid text-ink opacity-[0.05]";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 pattern-fade ${pattern} ${className}`}
    />
  );
}
