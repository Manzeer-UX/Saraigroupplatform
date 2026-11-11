# Sarai Group — corporate landing page

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · react-icons (Phosphor set). Light theme, fully static.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerendered)
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | **All copy, links and section data** (from the homepage content inventory). Edit text here. |
| `src/app/globals.css` | Design tokens (`@theme`: colors in OKLCH, fluid type scale, easing) and motion styles. |
| `src/components/sections/*` | Hero (globe), Capabilities, Approach (lifecycle), Expertise & benefits, Case studies, Services. |
| `src/components/layout/*` | Header (sticky, scroll-spy, accessible mobile menu), Footer, Logo. |
| `src/components/illustrations/*` | Hero revolving globe (WebGL via `cobe`, CSS fallback). |
| `src/assets/case-studies/*` | Product logos and screenshots exported from the Sarai Platforms Figma file (served optimised via `next/image`). |
| `src/components/reactbits/*` | React Bits components adapted for this site (see below). |
| `src/app/opengraph-image.tsx`, `icon.svg`, `robots.ts`, `sitemap.ts` | SEO assets. JSON-LD `Organization` data is in `src/app/page.tsx`. |

## React Bits adaptations

| Component | Used in | Notes |
| --- | --- | --- |
| BlurText | Hero headline | CSS-only, server-rendered, so the headline paints without waiting for JS. |
| SpotlightCard | Capability cards | Pointer-following glow via CSS variables (no re-renders). |
| CountUp | Lifecycle week labels | Final value is server-rendered; animates once on first view. |
| AnimatedContent | Section reveals (`.reveal`) | Native CSS scroll-driven animations; unsupported browsers simply show content. |
| GlareHover | Case-study media | Single soft sheen on hover. |

Every animation is disabled under `prefers-reduced-motion: reduce`.

## Accessibility

Skip link, landmark regions, labelled sections, one `h1` with logical heading order, visible `:focus-visible` rings, 44px+ touch targets, Escape-to-close mobile menu with focus return, screen-reader text for icon-only and external links, AA contrast for all text tokens.

## Notes and placeholders

- **Logo** — the official Sarai logo (Figma › Sarai) lives in `src/components/layout/Logo.tsx` as inline SVG; `src/app/icon.svg` uses its "S" mark.
- **Privacy Policy / Terms & Conditions** — placeholders on the current site; routes exist at `/privacy-policy` and `/terms-and-conditions` with a "being prepared" notice (set to `noindex`).
- **Copyright year** — `site.copyrightYear` in `src/content/site.ts` (kept static so the page fully prerenders).
