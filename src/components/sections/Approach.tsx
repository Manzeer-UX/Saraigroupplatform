import { CountUp } from "@/components/reactbits/CountUp";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { lifecycleSection, stages, transitions } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Navy feature section. It is the one deep-colour band on an otherwise
 * light page, which gives the lifecycle — the core story — visual weight.
 */
export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="px-2 sm:px-4">
      <div className="on-dark relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-navy py-14 text-white/75 shadow-lift sm:rounded-[2.5rem] sm:py-16 lg:py-20">
        {/* Atmosphere: azure glow + faint grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_100%_0%,oklch(0.64_0.15_248/0.32),transparent_70%),radial-gradient(45%_50%_at_0%_100%,oklch(0.22_0.075_265/0.9),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(1_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_20%,black,transparent_75%)]"
        />

        <Container>
          <SectionHeader
            split
            tone="dark"
            id="approach-title"
            index="02"
            label={lifecycleSection.label}
            title={lifecycleSection.title}
            intro={lifecycleSection.intro}
          />

          {/* Lifecycle timeline */}
          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7 lg:mt-12 lg:p-8">
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/65">
              {lifecycleSection.subtitle}
            </p>

            <div className="relative mt-8">
              {/* Desktop track */}
              <div
                aria-hidden="true"
                className="absolute left-6 right-[calc(25%-1.5rem)] top-6 hidden h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/15 lg:block"
              >
                <div className="track-fill-x h-full rounded-full bg-gradient-to-r from-accent to-accent-light" />
              </div>

              <ol className="grid lg:grid-cols-4">
                {stages.map(({ name, icon: Icon }, i) => {
                  const transition = transitions[i];
                  const isLast = i === stages.length - 1;
                  return (
                    <li key={name} className="relative pb-10 pl-[4.5rem] last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8">
                      {/* Mobile track segment */}
                      {!isLast ? (
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 left-6 top-12 w-0.5 -translate-x-1/2 overflow-hidden bg-white/15 lg:hidden"
                        >
                          <div className="track-fill-y h-full w-full bg-accent-light" />
                        </div>
                      ) : null}

                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-0 top-0 z-10 flex size-12 items-center justify-center rounded-full lg:relative",
                          isLast
                            ? "bg-accent-light text-navy-deep shadow-[0_0_0_6px_oklch(0.84_0.08_240/0.18)]"
                            : "border border-white/20 bg-navy text-white",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>

                      <p className="pt-1 font-mono text-xs text-white/65 lg:pt-7">Stage 0{i + 1}</p>
                      <h3 className="mt-2 text-heading font-medium text-white">{name}</h3>

                      {transition ? (
                        <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-deep px-3.5 py-1.5 font-mono text-xs text-white lg:absolute lg:left-[calc(50%+1.5rem)] lg:top-6 lg:z-10 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
                          <span className="size-1.5 rounded-full bg-accent-light" aria-hidden="true" />
                          <span>
                            <CountUp to={transition.weeks} /> weeks
                          </span>
                          <span className="sr-only">
                            {" "}
                            from {transition.from.toLowerCase()} to {transition.to}
                          </span>
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
