import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

type SectionLabelProps = {
  index: string;
  children: ReactNode;
  className?: string;
  tone?: Tone;
};

/** Small editorial label: "01 —— Capabilities" */
export function SectionLabel({ index, children, className, tone = "light" }: SectionLabelProps) {
  const dark = tone === "dark";
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em]",
        dark ? "text-white/65" : "text-muted",
        className,
      )}
    >
      <span className={dark ? "text-accent-light" : "text-accent-ink"}>{index}</span>
      <span aria-hidden="true" className={cn("h-px w-8", dark ? "bg-white/25" : "bg-line-strong")} />
      {children}
    </p>
  );
}

type SectionHeaderProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  className?: string;
  /** Lay the intro beside the title on large screens. */
  split?: boolean;
  /** Use "dark" on navy sections. */
  tone?: Tone;
};

export function SectionHeader({
  id,
  index,
  label,
  title,
  intro,
  className,
  split = false,
  tone = "light",
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        split && "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10",
        className,
      )}
    >
      <div className={cn(split && "lg:col-span-7")}>
        <SectionLabel index={index} tone={tone}>
          {label}
        </SectionLabel>
        <h2 id={id} className={cn("mt-4 text-title", dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
      </div>
      {intro ? (
        <p
          className={cn(
            "max-w-[46ch] text-lead",
            dark ? "text-white/75" : "text-ink-soft",
            split ? "lg:col-span-5 lg:justify-self-end lg:pb-2" : "mt-4",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
