import Image from "next/image";

// Wordmark taken from woosterprep.com, converted to transparent PNG in two tones.
// Source aspect ratio is 1521 x 386. Pass a height and the width follows.
type LogoProps = {
  tone?: "paper" | "ink";
  height?: number;
  priority?: boolean;
  className?: string;
};

const RATIO = 1521 / 386;

export function Logo({ tone = "paper", height = 32, priority = false, className }: LogoProps) {
  const width = Math.round(height * RATIO);
  return (
    <Image
      src={`/brand/wooster-logo-${tone}.png`}
      alt="Wooster Prep"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
