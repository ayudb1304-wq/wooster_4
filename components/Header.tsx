import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderRule } from "@/components/HeaderRule";
import { Logo } from "@/components/Logo";

// Copy: content/copy.md → Header
export function Header() {
  return (
    <header
      className="group sticky top-0 z-40 bg-ink-deep text-paper transition-colors duration-reveal ease-out data-[scrolled=true]:bg-ink-deep/70 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:backdrop-saturate-150 data-[theme=paper]:bg-paper data-[theme=paper]:text-ink data-[theme=paper]:data-[scrolled=true]:bg-paper/75"
      data-site-header
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-gutter lg:h-16">
        <Link href="/" className="min-h-tap inline-flex items-center" aria-label="Wooster Prep home">
          {/* Both tones are stacked and crossfaded as the header theme changes. */}
          <span className="relative block h-7 lg:h-8">
            <Logo
              tone="paper"
              height={28}
              priority
              className="h-7 w-auto transition-opacity duration-reveal ease-out group-data-[theme=paper]:opacity-0 lg:h-8"
            />
            <Logo
              tone="ink"
              height={28}
              className="absolute inset-0 h-7 w-auto opacity-0 transition-opacity duration-reveal ease-out group-data-[theme=paper]:opacity-100 lg:h-8"
            />
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-tap-gap lg:gap-8">
          <a
            href="#how-it-works"
            className="hidden text-body text-paper-muted underline-offset-4 transition-colors duration-reveal ease-out hover:text-paper hover:underline min-h-tap items-center group-data-[theme=paper]:text-ink-muted group-data-[theme=paper]:hover:text-ink lg:inline-flex"
          >
            How it works
          </a>
          <Link
            href="/login"
            className="text-body text-paper-muted underline-offset-4 transition-colors duration-reveal ease-out hover:text-paper hover:underline min-h-tap inline-flex items-center px-2 group-data-[theme=paper]:text-ink-muted group-data-[theme=paper]:hover:text-ink"
          >
            Student login
          </Link>
          <Button
            size="sm"
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
