"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * CountUp — adapted from React Bits (reactbits.dev/text-animations/count-up).
 *
 * Counts from `from` to `to` once the number scrolls into view. The final
 * value is server-rendered, so it is correct without JavaScript and for
 * users who prefer reduced motion. Assistive tech reads only the final value.
 */
type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
};

export function CountUp({ to, from = 0, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only animate numbers that have not been seen yet.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.textContent = String(from);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000));
          const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
          el.textContent = String(Math.round(from + (to - from) * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.75 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = String(to);
    };
  }, [to, from, duration]);

  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sr-only">{to}</span>
      <span ref={ref} aria-hidden="true">
        {to}
      </span>
    </span>
  );
}
