import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

/*
  Two variants only, both from tokens.
  primary:   signal fill, ink text. Hover goes to signal-deep.
  secondary: outline. On paper it is an ink outline with ink text; on ink
             sections pass `tone="onInk"` for a paper outline with paper text.
  Every size is at least 48px tall (tap target).
*/
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-button border font-body-strong leading-none transition-colors duration-(--duration-fast) ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-signal text-ink border-signal hover:bg-signal-deep hover:border-signal-deep active:bg-signal-deep",
        secondary: "bg-transparent",
      },
      tone: {
        onPaper: "",
        onInk: "",
      },
      size: {
        // sm is for desktop-only placements (header). Mobile targets stay at 48px.
        sm: "min-h-10 px-4 text-small",
        default: "min-h-tap px-6 text-body",
        lg: "min-h-14 px-8 text-body",
        icon: "min-h-tap min-w-tap px-0 size-tap text-body",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "secondary",
        tone: "onPaper",
        className: "border-ink text-ink hover:bg-ink hover:text-paper",
      },
      {
        variant: "secondary",
        tone: "onInk",
        className: "border-paper text-paper hover:bg-paper hover:text-ink",
      },
    ],
    defaultVariants: {
      variant: "primary",
      tone: "onPaper",
      size: "default",
      full: false,
    },
  },
);

function Button({
  className,
  variant = "primary",
  tone = "onPaper",
  size = "default",
  full = false,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      // Not passed through cn: its Tailwind merger treats text-ink and the
      // size class text-body as conflicting and drops the colour.
      className={buttonVariants({ variant, tone, size, full, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
