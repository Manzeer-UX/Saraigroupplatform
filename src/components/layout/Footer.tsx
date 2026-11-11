import Link from "next/link";
import { PiArrowUp, PiArrowUpRight } from "react-icons/pi";
import { Container } from "@/components/ui/Container";
import { companies, legalLinks, navigation, site } from "@/content/site";
import { Logo } from "./Logo";

const linkClass =
  "inline-flex min-h-8 items-center rounded-md text-[0.9375rem] text-white/75 transition-colors duration-200 hover:text-white";

const headingClass = "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-accent-light";

export function Footer({ homeHref = "" }: { homeHref?: "" | "/" }) {
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-navy-deep text-white/75">
      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_0%_0%,oklch(0.36_0.13_264/0.9),transparent_70%),radial-gradient(35%_55%_at_100%_100%,oklch(0.64_0.15_248/0.22),transparent_70%)]"
      />

      <Container className="pb-8 pt-14 lg:pt-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Link href="/" aria-label="Sarai Group — home" className="inline-flex rounded-xl">
              <Logo tone="dark" idPrefix="footer-logo" />
            </Link>
            <p className="mt-6 max-w-[20ch] font-display text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
              Your bridge to digital transformation <span className="text-accent-light">excellence!</span>
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className={headingClass}>Explore</h2>
            <ul className="mt-5 grid gap-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={`${homeHref}${item.href}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Group companies</h2>
            <ul className="mt-5 grid gap-2">
              {companies.map((company) => (
                <li key={company.name}>
                  <a href={company.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} group gap-1.5`}>
                    {company.name}
                    <PiArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 opacity-60 transition-[opacity,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/65">
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${linkClass} text-sm`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={`${homeHref}#top`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:rounded-full"
            >
              <PiArrowUp aria-hidden="true" className="size-4" />
              Back to top
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
