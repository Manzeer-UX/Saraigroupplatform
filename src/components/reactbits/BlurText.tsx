import type { CSSProperties, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * BlurText — adapted from React Bits (reactbits.dev/text-animations/blur-text).
 *
 * The original animates each word with motion/react once it scrolls into
 * view. This version keeps the same word-by-word blur → focus effect but is
 * a pure Server Component driven by CSS keyframes, so the headline paints
 * immediately (no hydration wait, good LCP) and is skipped entirely when the
 * user prefers reduced motion.
 *
 * Screen readers get the full sentence once; the animated words are hidden.
 */
type Segment = { text: string; accent?: boolean };

type BlurTextProps = {
  segments: readonly Segment[];
  as?: ElementType;
  id?: string;
  className?: string;
  accentClassName?: string;
};

export function BlurText({
  segments,
  as: Tag = "span",
  id,
  className,
  accentClassName = "text-accent-ink",
}: BlurTextProps) {
  const fullText = segments.map((s) => s.text).join(" ");
  let index = 0;

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true">
        {segments.map((segment, sIdx) => (
          <span key={sIdx} className={cn(segment.accent && accentClassName)}>
            {segment.text.split(" ").map((word, wIdx, words) => {
              const i = index++;
              const isLastWord = sIdx === segments.length - 1 && wIdx === words.length - 1;
              return (
                <span key={wIdx}>
                  <span className="blur-word" style={{ "--i": i } as CSSProperties}>
                    {word}
                  </span>
                  {isLastWord ? null : " "}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}
