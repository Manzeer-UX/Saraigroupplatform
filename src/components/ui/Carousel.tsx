"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { PiArrowLeft, PiArrowRight, PiPause, PiPlay } from "react-icons/pi";
import { cn } from "@/lib/cn";

/**
 * Auto-sliding carousel (WAI-ARIA carousel pattern) on native scroll-snap.
 *
 * - Slides advance every `interval` ms and loop back to the start.
 * - Auto-play pauses on hover, on keyboard focus, while off-screen, and via
 *   the Pause button (WCAG 2.2.2). It never starts with reduced motion.
 * - Swipe / trackpad / arrow keys work natively; prev/next wrap around.
 * - Dots jump straight to a position.
 */
type CarouselProps = {
  label: string;
  slides: ReactNode[];
  /** Width classes for each slide (sets how many are visible per breakpoint). */
  slideClassName: string;
  interval?: number;
  className?: string;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function Carousel({ label, slides, slideClassName, interval = 4500, className }: CarouselProps) {
  const trackId = useId();
  const regionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState(slides.length);

  const autoplay = playing && !reducedMotion;
  const running = autoplay && !hovered && !focused && inView;

  /** Width of one slide + gap, in px. */
  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    return first.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      track.scrollTo({
        left: Math.min(max, Math.max(0, index * step())),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion, step],
  );

  const next = useCallback(() => goTo(active + 1 >= positions ? 0 : active + 1), [active, positions, goTo]);
  const prev = useCallback(() => goTo(active - 1 < 0 ? positions - 1 : active - 1), [active, positions, goTo]);

  // Track position → active dot, number of positions.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const s = step();
      if (!s) return;
      const visible = Math.max(1, Math.round((track.clientWidth + (s - track.firstElementChild!.clientWidth)) / s));
      const total = Math.max(1, slides.length - visible + 1);
      const max = track.scrollWidth - track.clientWidth;
      const index = track.scrollLeft >= max - 4 ? total - 1 : Math.round(track.scrollLeft / s);
      setPositions(total);
      setActive(Math.min(total - 1, index));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, [slides.length, step]);

  // Only auto-play while on screen.
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  // Auto-advance. Restarts whenever the slide changes, so manual navigation
  // always gets a full interval before the next automatic move.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(next, interval);
    return () => window.clearTimeout(id);
  }, [running, next, interval, active]);

  const controlClass =
    "inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-ink shadow-soft transition-[background-color,color,border-color] duration-200 hover:border-navy hover:bg-navy hover:text-white focus-visible:rounded-full";

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div
        id={trackId}
        ref={trackRef}
        aria-live={running ? "off" : "polite"}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 pt-1 [scrollbar-width:none] motion-safe:scroll-smooth lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={cn("shrink-0 snap-start", slideClassName)}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        {/* Position dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: positions }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-controls={trackId}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              className="group/dot inline-flex h-6 items-center rounded-full px-0.5 focus-visible:rounded-full"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-quart)]",
                  i === active ? "w-7 bg-navy" : "w-1.5 bg-line-strong group-hover/dot:bg-muted",
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!reducedMotion ? (
            <button
              type="button"
              aria-controls={trackId}
              aria-label={playing ? "Pause automatic slide show" : "Play automatic slide show"}
              onClick={() => setPlaying((value) => !value)}
              className={controlClass}
            >
              {playing ? <PiPause aria-hidden="true" className="size-5" /> : <PiPlay aria-hidden="true" className="size-5" />}
            </button>
          ) : null}
          <button type="button" aria-controls={trackId} aria-label="Previous slide" onClick={prev} className={controlClass}>
            <PiArrowLeft aria-hidden="true" className="size-5" />
          </button>
          <button type="button" aria-controls={trackId} aria-label="Next slide" onClick={next} className={controlClass}>
            <PiArrowRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
