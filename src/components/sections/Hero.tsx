import type { CSSProperties } from "react";
import { PiArrowRight } from "react-icons/pi";
import { GlobeVisual } from "@/components/illustrations/GlobeVisual";
import { BlurText } from "@/components/reactbits/BlurText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-8 pt-28 sm:pb-10 sm:pt-32 lg:pb-12 lg:pt-36">
      {/* Background: soft navy/azure light wash + dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(48%_55%_at_88%_8%,oklch(0.9_0.05_252/0.75),transparent_70%),radial-gradient(30%_35%_at_0%_55%,oklch(0.94_0.03_240/0.7),transparent_70%)]"
      />
      <div aria-hidden="true" className="dot-grid fade-mask-radial absolute inset-0 -z-10" />

      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: copy + actions */}
        <div className="lg:col-span-7">
          <BlurText
            as="h1"
            id="hero-title"
            segments={hero.title}
            className="max-w-[16ch] text-display font-semibold text-ink lg:max-w-[18ch]"
          />

          <div className="rise-in" style={{ "--delay": "700ms" } as CSSProperties}>
            <p className="mt-6 max-w-[42ch] text-lead text-ink-soft">{hero.lead}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={hero.primaryCta.href} icon={<PiArrowRight className="size-4" />}>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Right: revolving globe, vertically centred against the copy */}
        <div className="rise-in lg:col-span-5" style={{ "--delay": "450ms" } as CSSProperties}>
          <GlobeVisual />
        </div>
      </Container>
    </section>
  );
}
