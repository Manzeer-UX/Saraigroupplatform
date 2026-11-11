"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PiArrowUpRight, PiList, PiX } from "react-icons/pi";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

export function Header({ homeHref = "" }: { homeHref?: "" | "/" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Elevate the bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: mark the nav item for the section in the middle of the viewport.
  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    const clearAtTop = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  const closeMenu = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Escape closes the mobile menu; widening to desktop closes it too.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && closeMenu();
    const onHashChange = () => closeMenu();
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHashChange);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHashChange);
      mq.removeEventListener("change", onChange);
    };
  }, [open, closeMenu]);

  const elevated = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto max-w-[80rem] rounded-[1.75rem] border transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-quart)]",
          open
            ? "border-line bg-surface shadow-lift"
            : elevated
              ? "border-line bg-surface/85 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-surface/75"
              : "border-transparent bg-transparent",
        )}
      >
        <div className="flex h-16 items-center justify-between gap-6 pl-4 pr-2.5 sm:pl-5">
          <Link href="/" aria-label="Sarai Group — home" className="rounded-xl">
            <Logo idPrefix="header-logo" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={`${homeHref}${item.href}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-200",
                        isActive ? "bg-navy/[0.07] text-navy" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`${homeHref}#case-studies`}
              className="group/cta hidden min-h-11 items-center gap-2 rounded-full bg-navy px-5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-navy-hover focus-visible:rounded-full sm:inline-flex"
            >
              View our work
              <PiArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? (
                <PiX aria-hidden="true" className="size-6" />
              ) : (
                <PiList aria-hidden="true" className="size-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id={menuId} hidden={!open} className="lg:hidden">
          <nav aria-label="Primary mobile" className="border-t border-line px-3 pb-4 pt-3">
            <ul className="grid gap-1">
              {navigation.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={`${homeHref}${item.href}`}
                    onClick={() => closeMenu()}
                    aria-current={active === item.href ? "true" : undefined}
                    className="flex min-h-12 items-center justify-between rounded-2xl px-3 font-display text-xl font-medium tracking-[-0.02em] text-ink transition-colors hover:bg-ink/[0.04]"
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-xs text-muted">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`${homeHref}#case-studies`}
              onClick={() => closeMenu()}
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-5 font-semibold text-white focus-visible:rounded-full sm:hidden"
            >
              View our work
              <PiArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
