import type { CSSProperties } from "react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilities, capabilitiesSection } from "@/content/site";
import { cn } from "@/lib/cn";

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeader
            id="capabilities-title"
            index="01"
            label={capabilitiesSection.label}
            title={capabilitiesSection.title}
            intro={capabilitiesSection.intro}
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:pb-6 lg:col-span-7 lg:gap-5">
          {capabilities.map(({ label, text, icon: Icon }, i) => {
            // The first card is the navy "featured" tile — a single point of
            // brand colour that breaks the grid's rhythm.
            const featured = i === 0;
            return (
              <li
                key={label}
                className="reveal sm:[&:nth-child(2n)]:translate-y-6"
                style={{ "--stagger": i % 2 } as CSSProperties}
              >
                <SpotlightCard
                  spotlightColor={featured ? "oklch(0.84 0.08 240 / 0.18)" : undefined}
                  className={cn(
                    "group flex h-full min-h-[14rem] flex-col rounded-[1.75rem] p-6 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 sm:p-7",
                    featured
                      ? "on-dark bg-navy text-white shadow-lift"
                      : "border border-line bg-surface shadow-soft hover:border-line-strong hover:shadow-lift",
                  )}
                >
                  <div className="relative flex items-start justify-between">
                    <span
                      className={cn(
                        "inline-flex size-12 items-center justify-center rounded-2xl transition-colors duration-300",
                        featured
                          ? "bg-white/10 text-accent-light"
                          : "bg-accent-soft text-accent-ink group-hover:bg-navy group-hover:text-white",
                      )}
                    >
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span aria-hidden="true" className={cn("font-mono text-xs", featured ? "text-white/65" : "text-muted")}>
                      0{i + 1}
                    </span>
                  </div>
                  <div className="relative mt-auto pt-7">
                    <p
                      className={cn(
                        "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em]",
                        featured ? "text-accent-light" : "text-accent-ink",
                      )}
                    >
                      {label}
                    </p>
                    <h3 className={cn("mt-3 text-heading font-medium", featured ? "text-white" : "text-ink")}>{text}</h3>
                  </div>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
