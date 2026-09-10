import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

/*
  shadcn Accordion (Base UI) restyled to tokens: no borders except hairline
  rules, question in body 600, answer in body, chevron that rotates when open,
  48px minimum trigger height, keyboard operable via Base UI. The panel height
  animates over 240ms (motion spec item 8); the global reduced-motion rule
  makes it instant.
*/
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-current/15", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    // Base UI renders the header as an h3; reset the global heading styles so the
    // question stays in body type on a single line.
    <AccordionPrimitive.Header className="flex max-w-none font-body [font-variation-settings:normal]">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex min-h-tap flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left font-body-strong text-body outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="size-5 shrink-0 transition-transform duration-[240ms] ease-out group-aria-expanded/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-[240ms] ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div className={cn("pb-5 text-body", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
