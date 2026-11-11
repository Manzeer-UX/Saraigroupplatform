import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

/** "S" mark paths from the official Sarai logo (Figma: Sarai › Image (Sarai Group)). */
const MARK_TOP =
  "M16.8397 30.693C10.753 30.693 7.77584 23.2709 12.1752 19.0647L31.6905 0.406109C31.9631 0.145464 32.3258 0 32.7029 0H42.6475C45.9038 0 47.4965 3.97065 45.1429 6.22091L21.5042 28.8219C20.2481 30.0228 18.5774 30.693 16.8397 30.693Z";
const MARK_BOTTOM =
  "M32.1851 45.8587H21.6529C18.3967 45.8587 16.8039 41.8881 19.1575 39.6378L42.7963 17.0368C44.0523 15.8359 45.723 15.1658 47.4607 15.1658C53.5473 15.1658 56.5245 22.5878 52.1251 26.7941L32.1851 45.8587Z";
const WORDMARK =
  "M69.6792 35.7593L79.7788 9.46094H83.5278L94.2917 35.7593H90.3272L87.259 27.7944H76.2628L73.3746 35.7593H69.6792ZM77.2674 24.9601H86.1831L83.438 17.6769C82.601 15.4645 81.9797 13.6467 81.5724 12.2235C81.2381 13.9098 80.7658 15.584 80.1555 17.2464L77.2674 24.9601ZM103.249 35.7593V9.46094H114.909C117.253 9.46094 119.035 9.70009 120.255 10.1785C121.475 10.6449 122.45 11.4761 123.179 12.672C123.908 13.8679 124.273 15.1894 124.273 16.6364C124.273 18.5021 123.669 20.0748 122.461 21.3544C121.254 22.6341 119.388 23.4473 116.864 23.7941C117.785 24.2366 118.485 24.6731 118.963 25.1036C119.98 26.0365 120.943 27.2025 121.852 28.6017L126.426 35.7593H122.049L118.569 30.288C117.552 28.7094 116.715 27.5015 116.057 26.6643C115.4 25.8272 114.808 25.2412 114.281 24.9063C113.767 24.5714 113.24 24.3382 112.703 24.2067C112.308 24.1229 111.662 24.0811 110.766 24.0811H106.729V35.7593H103.249ZM106.729 21.0674H114.21C115.8 21.0674 117.044 20.906 117.941 20.583C118.838 20.2482 119.52 19.722 119.986 19.0044C120.452 18.2749 120.685 17.4856 120.685 16.6364C120.685 15.3927 120.231 14.3702 119.322 13.5689C118.425 12.7676 117.002 12.367 115.052 12.367H106.729V21.0674ZM132.98 35.7593L143.079 9.46094H146.829L157.592 35.7593H153.627L150.56 27.7944H139.563L136.675 35.7593H132.98ZM140.568 24.9601H149.483L146.739 17.6769C145.902 15.4645 145.28 13.6467 144.873 12.2235C144.538 13.9098 144.066 15.584 143.456 17.2464L140.568 24.9601ZM167.087 35.7593V9.46094H170.568V35.7593H167.087Z";

/**
 * Official Sarai logo: the interlocking "S" mark + "ARAI" wordmark.
 * The wordmark uses currentColor (black on light, white on navy); the mark
 * keeps its grey→white gradient strokes. `idPrefix` keeps the SVG gradient
 * and mask ids unique when the logo appears more than once on a page.
 */
export function Logo({
  className,
  tone = "light",
  idPrefix = "logo",
}: {
  className?: string;
  tone?: Tone;
  idPrefix?: string;
}) {
  const id = (name: string) => `${idPrefix}-${name}`;
  return (
    <svg
      viewBox="0 0 174 47"
      role="img"
      aria-label="Sarai"
      focusable="false"
      className={cn("h-9 w-auto", tone === "dark" ? "text-white" : "text-[#0a0a0a]", className)}
    >
      <defs>
        <linearGradient id={id("top")} x1="20.4148" y1="0" x2="20.4148" y2="30.693" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C6C6C" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id={id("bottom")} x1="43.8856" y1="45.8587" x2="43.8856" y2="15.1658" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C6C6C" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <mask id={id("mask-top")} maskUnits="userSpaceOnUse" x="10" y="0" width="37" height="31" style={{ maskType: "luminance" }}>
          <path d={MARK_TOP} fill="#fff" />
        </mask>
        <mask id={id("mask-bottom")} maskUnits="userSpaceOnUse" x="18" y="15" width="37" height="31" style={{ maskType: "luminance" }}>
          <path d={MARK_BOTTOM} fill="#fff" />
        </mask>
      </defs>
      <g mask={`url(#${id("mask-top")})`}>
        <path d={MARK_TOP} fill="none" stroke={`url(#${id("top")})`} strokeWidth="4.33313" />
      </g>
      <g mask={`url(#${id("mask-bottom")})`}>
        <path d={MARK_BOTTOM} fill="none" stroke={`url(#${id("bottom")})`} strokeWidth="4.33313" />
      </g>
      <path d={WORDMARK} fill="currentColor" />
    </svg>
  );
}
