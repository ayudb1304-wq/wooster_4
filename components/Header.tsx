import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderRule } from "@/components/HeaderRule";

// Copy: content/copy.md → Header
export function Header() {
  return (
    <header
      className="relative z-40 bg-ink-deep text-paper"
      data-site-header
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-gutter lg:h-16">
        <Link
          href="/"
          className="font-display-strong wonk-off text-[1.375rem] leading-none tracking-[-0.01em] text-paper min-h-tap inline-flex items-center"
        >
          Wooster
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-tap-gap lg:gap-8">
          <a
            href="#how-it-works"
            className="hidden text-body text-paper-muted underline-offset-4 hover:text-paper hover:underline min-h-tap items-center lg:inline-flex"
          >
            How it works
          </a>
          <Link
            href="/login"
            className="text-body text-paper-muted underline-offset-4 hover:text-paper hover:underline min-h-tap inline-flex items-center px-2"
          >
            Student login
          </Link>
          <Button
            className="hidden lg:inline-flex"
            nativeButton={false}
            render={<Link href="/diagnostic" data-placement="header" />}
          >
            Start free diagnostic
          </Button>
        </nav>
      </div>
      <HeaderRule />
    </header>
  );
}
