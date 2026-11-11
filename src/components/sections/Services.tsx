import type { CSSProperties } from "react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services, servicesSection } from "@/content/site";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-t border-line bg-sunken/60 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeader
          split
          id="services-title"
          index="05"
          label={servicesSection.label}
          title={servicesSection.title}
          intro={servicesSection.intro}
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {services.map(({ title, description, icon: Icon, tools }, i) => (
            <li key={title} className="reveal" style={{ "--stagger": i % 3 } as CSSProperties}>
              <SpotlightCard className="group flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:p-7">
                <div className="relative flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-accent-ink"
                  >
                    <Icon className="size-6" />
                  </span>
                  <span aria-hidden="true" className="font-mono text-xs text-muted">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="relative mt-6 text-heading font-semibold text-ink">{title}</h3>
                <p className="relative mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{description}</p>

                <div className="relative mt-auto pt-6">
                  <div className="border-t border-line pt-5">
                    <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-accent-ink">
                      Typical tools
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${title}: typical tools`}>
                      {tools.map(({ name, icon: ToolIcon }) => (
                        <li
                          key={name}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1.5 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-200 group-hover:border-line-strong"
                        >
                          <ToolIcon aria-hidden="true" className="size-3.5 shrink-0 text-navy" />
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
