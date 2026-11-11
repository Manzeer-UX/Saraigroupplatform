import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { benefits, expertise, expertiseBenefitsSection } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Benefit tiles step from light azure to deep navy — a quiet visual
 * crescendo from "Efficiency" to "Impact". Every step keeps AA contrast:
 * dark text on the two light tiles, white text on the three deep ones.
 */
const benefitTones = [
  { tile: "bg-accent-soft", icon: "bg-white text-accent-ink", text: "text-ink", index: "text-muted" },
  { tile: "bg-[oklch(0.9_0.05_250)]", icon: "bg-white/80 text-accent-ink", text: "text-ink", index: "text-ink-soft" },
  { tile: "bg-accent-ink", icon: "bg-white/15 text-white", text: "text-white", index: "text-white/75" },
  { tile: "bg-navy-hover", icon: "bg-white/12 text-accent-light", text: "text-white", index: "text-white/70" },
  { tile: "bg-navy", icon: "bg-white/10 text-accent-light", text: "text-white", index: "text-white/70" },
] as const;

const subLabel = "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted";

export function ExpertiseBenefits() {
  return (
    <section id="expertise-benefits" aria-labelledby="expertise-benefits-title" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          split
          id="expertise-benefits-title"
          index="03"
          label={expertiseBenefitsSection.label}
          title={expertiseBenefitsSection.title}
          intro={expertiseBenefitsSection.intro}
        />

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* Expertise */}
          <div className="flex flex-col lg:col-span-5">
            <h3 className={subLabel}>Expertise</h3>
            <ul className="mt-5 grid flex-1 gap-3">
              {expertise.map(({ name, icon: Icon }, i) => (
                <li
                  key={name}
                  className="reveal group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-soft transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quart)] hover:translate-x-1 hover:border-line-strong hover:shadow-lift sm:p-5"
                  style={{ "--stagger": i } as CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-accent-ink"
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold tracking-[-0.02em] text-ink sm:text-xl">
                    {name}
                  </span>
                  <span aria-hidden="true" className="font-mono text-xs text-muted">
                    0{i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="flex flex-col lg:col-span-7">
            <h3 className={subLabel}>Benefits</h3>
            <ul className="mt-5 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {benefits.map(({ name, icon: Icon }, i) => {
                const tone = benefitTones[i] ?? benefitTones[benefitTones.length - 1];
                return (
                  <li
                    key={name}
                    className={cn(
                      "reveal flex min-h-36 flex-col justify-between gap-6 rounded-2xl p-5 transition-transform duration-300 ease-[var(--ease-out-quart)] last:col-span-2 hover:-translate-y-1 sm:last:col-span-2 lg:min-h-0 lg:last:col-span-1",
                      tone.tile,
                    )}
                    style={{ "--stagger": i } as CSSProperties}
                  >
                    <div className="flex items-start justify-between">
                      <span className={cn("inline-flex size-10 items-center justify-center rounded-xl", tone.icon)}>
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span aria-hidden="true" className={cn("font-mono text-xs", tone.index)}>
                        0{i + 1}
                      </span>
                    </div>
                    <span className={cn("font-display text-lg font-semibold tracking-[-0.02em]", tone.text)}>
                      {name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
