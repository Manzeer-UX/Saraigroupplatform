import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-soft hover:bg-navy-hover active:translate-y-px",
  secondary:
    "border border-line-strong bg-surface/70 text-ink hover:border-ink/40 hover:bg-surface",
  ghost: "text-ink hover:bg-ink/5",
};

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  icon?: ReactNode;
};

/** An anchor styled as a button. Min 48px tall for comfortable touch targets. */
export function ButtonLink({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out-quart)] focus-visible:rounded-full",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon ? (
        <span
          aria-hidden="true"
          className="-mr-1 inline-flex transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover/btn:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </a>
  );
}
