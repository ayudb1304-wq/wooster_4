import Link from "next/link";
import { Logo } from "@/components/Logo";

// Copy: content/copy.md → Footer. Verbatim. Ink-deep, no social icons.
// Spacious on purpose: the wordmark on its own row, links and contact in
// separate columns, the College Board line alone under a hairline.
const links = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  return (
    <footer className="bg-ink-deep text-paper" data-section-theme="ink">
      <div className="mx-auto max-w-[1440px] px-gutter pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <Link href="/" className="inline-flex min-h-tap items-center" aria-label="Wooster Prep home">
              <Logo tone="paper" height={44} className="h-10 w-auto lg:h-11" />
            </Link>
          </div>

          <div className="lg:col-span-3">
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-tap items-center text-body text-paper-muted underline decoration-paper-muted/50 underline-offset-4 transition-colors duration-(--duration-fast) ease-out hover:text-paper hover:decoration-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <a
              href="mailto:hal@woosterprep.com"
              className="inline-flex min-h-tap items-center text-body text-paper-muted underline decoration-paper-muted/50 underline-offset-4 transition-colors duration-(--duration-fast) ease-out hover:text-paper hover:decoration-paper"
            >
              hal@woosterprep.com
            </a>
          </div>
        </div>

        <div className="mt-20 border-t border-paper-muted/20 pt-8 lg:mt-28">
          <p className="text-small text-paper-muted">Wooster is not affiliated with the College Board.</p>
        </div>
      </div>
    </footer>
  );
}
