"use client";

import { useEffect, useRef, useState } from "react";
import type { Globe } from "cobe";
import { cn } from "@/lib/cn";

/**
 * Hero visual: a slowly revolving dotted globe (WebGL via `cobe`, ~13KB,
 * loaded after first paint) centred in a navy card, with an orbit ring and
 * a revolving satellite.
 *
 * - Rotation pauses when the card is off-screen.
 * - With prefers-reduced-motion the globe renders once and stays still.
 * - Drag to spin it by hand (pointer only; purely decorative).
 * - If WebGL is unavailable, a CSS sphere remains as a graceful fallback.
 */

const ROTATION_SPEED = 0.19; // radians per second (~one turn every 33s)

/* ---------------------------------------------------------------------
   Travelling connection line
   A glowing line grows out of one hub, reaches the next, then retracts
   into it — like data moving from one spot to another — and hops on to a
   new destination. Routes are chosen on the side of the globe facing the
   viewer so the movement is always visible.

   cobe draws each arc as a quadratic curve whose control point sits a
   fixed height above the midpoint, so the arc height is rescaled every
   frame to the line's current length (one line at a time) to avoid
   spikes while it grows. Hubs are decorative only (no labels or claims).
--------------------------------------------------------------------- */
type LatLon = [number, number];

const THETA = 0.3; // globe tilt (must match createGlobe)

const HUBS: LatLon[] = [
  [37.77, -122.42], // San Francisco
  [40.71, -74.0], // New York
  [43.65, -79.38], // Toronto
  [-23.55, -46.63], // São Paulo
  [51.51, -0.13], // London
  [52.52, 13.4], // Berlin
  [-1.29, 36.82], // Nairobi
  [25.2, 55.27], // Dubai
  [30.7, 76.72], // Mohali
  [19.08, 72.88], // Mumbai
  [1.35, 103.82], // Singapore
  [35.68, 139.69], // Tokyo
  [-33.87, 151.21], // Sydney
];

const ROUTE_SECONDS = 2.4; // grow + retract time for one hop
const HOP_GAP = 0.35; // pause between hops
const TAIL_LAG = 0.5; // how far the tail trails the head (fraction of the route)
const ARC_COLOR: [number, number, number] = [0.55, 0.78, 1];

/** How directly a location faces the viewer (>0 = front), using cobe's own projection. */
function facing([lat, lon]: LatLon, phi: number, theta: number) {
  const r = (lat * Math.PI) / 180;
  const a = (lon * Math.PI) / 180 - Math.PI;
  const x = -Math.cos(r) * Math.cos(a);
  const y = Math.sin(r);
  const z = Math.cos(r) * Math.sin(a);
  return -Math.sin(phi) * Math.cos(theta) * x + Math.sin(theta) * y + Math.cos(phi) * Math.cos(theta) * z;
}

const toVec = ([lat, lon]: LatLon) => {
  const p = (lat * Math.PI) / 180;
  const l = (lon * Math.PI) / 180;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)] as const;
};

const toLatLon = ([x, y, z]: readonly number[]): LatLon => [
  (Math.asin(Math.max(-1, Math.min(1, z))) * 180) / Math.PI,
  (Math.atan2(y, x) * 180) / Math.PI,
];

/** Point a fraction `t` of the way along the great circle from a to b. */
function along(a: LatLon, b: LatLon, t: number): LatLon {
  const va = toVec(a);
  const vb = toVec(b);
  const dot = Math.max(-1, Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const s = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / s;
  const wb = Math.sin(t * omega) / s;
  return toLatLon([va[0] * wa + vb[0] * wb, va[1] * wa + vb[1] * wb, va[2] * wa + vb[2] * wb]);
}

/** Angle between two locations, in radians. */
function angleBetween(a: LatLon, b: LatLon) {
  const va = toVec(a);
  const vb = toVec(b);
  return Math.acos(Math.max(-1, Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2])));
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/** Picks hop destinations and produces the arc + markers for each frame. */
function createTraveller() {
  let from = 4;
  let to = 4;
  let start = Number.NEGATIVE_INFINITY;

  const pickNext = (clock: number, phi: number) => {
    let origin = to;
    if (facing(HUBS[origin]!, phi, THETA) < 0.25) {
      origin = HUBS.reduce((best, hub, i) => (facing(hub, phi, THETA) > facing(HUBS[best]!, phi, THETA) ? i : best), 0);
    }
    const ahead = phi + ROTATION_SPEED * ROUTE_SECONDS * 0.5; // where the globe will be mid-hop
    let options = HUBS.map((_, i) => i).filter((i) => {
      if (i === origin) return false;
      const distance = angleBetween(HUBS[origin]!, HUBS[i]!);
      return facing(HUBS[i]!, ahead, THETA) > 0.3 && distance > 0.3 && distance < 1.7;
    });
    if (!options.length) {
      options = HUBS.map((_, i) => i)
        .filter((i) => i !== origin)
        .sort((a, b) => facing(HUBS[b]!, ahead, THETA) - facing(HUBS[a]!, ahead, THETA))
        .slice(0, 3);
    }
    from = origin;
    to = options[Math.floor(Math.random() * options.length)]!;
    start = clock;
  };

  const shape = (head: number, tail: number) => {
    const a = HUBS[from]!;
    const b = HUBS[to]!;
    const segment = (head - tail) * angleBetween(a, b);
    return {
      arcs: segment > 0.012 ? [{ from: along(a, b, tail), to: along(a, b, head) }] : [],
      // Arc height proportional to the visible length → no spikes while growing.
      arcHeight: Math.max(0.01, Math.min(0.32, segment * 0.3)),
      markers: HUBS.map((location, i) => ({
        location,
        size: i === to ? 0.022 + 0.026 * head : i === from ? 0.022 + 0.026 * (1 - tail) : 0.02,
      })),
    };
  };

  return {
    /** Animated frame at `clock` seconds. */
    frame(clock: number, phi: number) {
      if (clock - start > ROUTE_SECONDS + HOP_GAP) pickNext(clock, phi);
      const p = clamp01((clock - start) / ROUTE_SECONDS) * (1 + TAIL_LAG);
      return shape(easeInOut(clamp01(p)), easeInOut(clamp01(p - TAIL_LAG)));
    },
    /** A single complete, still route (reduced motion). */
    still(phi: number) {
      if (!Number.isFinite(start)) pickNext(0, phi);
      return shape(1, 0);
    },
  };
}

export function GlobeVisual({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let globe: Globe | undefined;
    let frame = 0;
    let running = false;
    let cancelled = false;
    let phi = 4.4; // initial longitude
    let dragOffset = 0;
    let dragStartX: number | null = null;
    let size = canvas.offsetWidth;
    let clock = 0; // seconds of animation time (freezes while paused)
    const traveller = createTraveller();

    const render = () => {
      if (!globe) return;
      const view = phi + dragOffset;
      const line = reduceMotion ? traveller.still(view) : traveller.frame(clock, view);
      globe.update({
        phi: view,
        width: size * dpr,
        height: size * dpr,
        arcs: line.arcs,
        arcHeight: line.arcHeight,
        markers: line.markers,
      });
    };

    // Time-based so the speed is identical on 60Hz, 120Hz or throttled screens.
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      clock += dt;
      if (dragStartX === null) phi += ROTATION_SPEED * dt;
      render();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion || !globe) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // Pause the loop whenever the globe is not on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else stop();
    });

    const resize = new ResizeObserver(() => {
      size = canvas.offsetWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      render();
    });

    // Pointer drag to spin.
    const onPointerDown = (e: PointerEvent) => {
      dragStartX = e.clientX - dragOffset * 200;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (dragStartX === null) return;
      dragOffset = (e.clientX - dragStartX) / 200;
      if (!running) render();
    };
    const onPointerUp = () => {
      dragStartX = null;
      canvas.style.cursor = "";
    };

    import("cobe")
      .then(({ default: createGlobe }) => {
        if (cancelled) return;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: size * dpr,
          height: size * dpr,
          phi,
          theta: THETA,
          dark: 1,
          diffuse: 1.3,
          mapSamples: 18000,
          mapBrightness: 7,
          mapBaseBrightness: 0.04,
          baseColor: [0.17, 0.27, 0.56],
          markerColor: [0.66, 0.82, 0.98],
          glowColor: [0.24, 0.46, 0.88],
          markers: [],
          markerElevation: 0.01,
          arcs: [],
          arcColor: ARC_COLOR,
          arcWidth: 0.9,
          arcHeight: 0.1,
          opacity: 0.95,
        });
        render();
        setReady(true);
        setAnimate(!reduceMotion);
        visibility.observe(wrap);
        resize.observe(canvas);
        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("pointercancel", onPointerUp);
      })
      .catch(() => {
        /* WebGL or chunk failed: the CSS sphere fallback stays visible. */
      });

    return () => {
      cancelled = true;
      stop();
      visibility.disconnect();
      resize.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      globe?.destroy();
    };
  }, []);

  return (
    <figure
      role="img"
      aria-label="A revolving globe with an orbiting satellite."
      className={cn(
        "relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(165deg,var(--color-navy)_0%,var(--color-navy-deep)_70%)] text-white shadow-lift ring-1 ring-navy/10",
        className,
      )}
    >
      <div aria-hidden="true" className="relative aspect-[12/9.6] w-full sm:aspect-[12/8.4] lg:aspect-[1/1.04]">
        {/* Faint grid + atmospheric glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black,transparent_80%)]" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.15_248/0.45)_0%,transparent_62%)]" />

        {/* Globe */}
        <div
          ref={wrapRef}
          className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 sm:w-[62%] lg:w-[82%]"
        >
          {/* Fallback sphere (visible until WebGL paints, or if it can't) */}
          <div
            className={cn(
              "absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_35%_30%,oklch(0.52_0.12_258)_0%,oklch(0.3_0.1_264)_55%,oklch(0.22_0.075_265)_100%)] shadow-[inset_0_0_40px_oklch(0.64_0.15_248/0.5)] transition-opacity duration-700",
              ready ? "opacity-0" : "opacity-100",
            )}
          />
          <canvas
            ref={canvasRef}
            className={cn(
              "absolute inset-0 size-full cursor-grab touch-pan-y transition-opacity duration-1000 ease-[var(--ease-out-quart)]",
              ready ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Orbit ring with a revolving satellite */}
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 size-full overflow-visible">
            <g transform="rotate(-14 50 50)">
              <ellipse cx="50" cy="50" rx="58" ry="15" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.3" />
              <ellipse cx="50" cy="50" rx="66" ry="20" fill="none" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.25" strokeDasharray="1 1.5" />
              <circle r="1.4" className="fill-accent-light" cx={animate ? 0 : 108} cy={animate ? 0 : 50}>
                {animate ? (
                  <animateMotion
                    dur="12s"
                    repeatCount="indefinite"
                    path="M108 50a58 15 0 1 1-116 0a58 15 0 1 1 116 0"
                  />
                ) : null}
              </circle>
              <circle r="3.2" className="fill-accent-light" fillOpacity="0.18" cx={animate ? 0 : 108} cy={animate ? 0 : 50}>
                {animate ? (
                  <animateMotion
                    dur="12s"
                    repeatCount="indefinite"
                    path="M108 50a58 15 0 1 1-116 0a58 15 0 1 1 116 0"
                  />
                ) : null}
              </circle>
            </g>
          </svg>
        </div>
      </div>
    </figure>
  );
}
