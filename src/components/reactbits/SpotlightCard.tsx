"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * SpotlightCard — adapted from React Bits (reactbits.dev/components/spotlight-card).
 *
 * A soft radial glow follows the pointer. Position is written to CSS custom
 * properties on the element (no React re-renders); the glow itself is drawn
 * by `.spotlight-card::before` in globals.css. Touch and keyboard users see
 * the glow centred when the card has focus within.
 */
type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export function SpotlightCard({ children, className, spotlightColor }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("spotlight-card relative isolate overflow-hidden", className)}
      style={spotlightColor ? ({ "--spot-color": spotlightColor } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
