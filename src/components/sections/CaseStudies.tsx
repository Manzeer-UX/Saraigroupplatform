import Image from "next/image";
import { PiArrowUpRight } from "react-icons/pi";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies, caseStudiesSection, type CaseStudy } from "@/content/site";
import { cn } from "@/lib/cn";

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const linked = Boolean(study.href);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft outline-offset-4 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-quart)]",
        linked && "hover:-translate-y-1 hover:shadow-lift has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-navy",
      )}
    >
      {/* Navy stage: product screenshot */}
      <div className="glare-hover relative h-48 overflow-hidden bg-[linear-gradient(160deg,var(--color-navy)_0%,var(--color-navy-deep)_75%)] xl:h-44">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_100%,oklch(0.64_0.15_248/0.35),transparent_70%)]"
        />
        <div className="absolute -right-10 bottom-[-14%] left-5 top-5 overflow-hidden rounded-tl-xl shadow-[0_24px_48px_-12px_oklch(0_0_0/0.5)] ring-1 ring-white/15 transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:-translate-y-1.5">
          <Image
            src={study.screenshot}
            alt={`${study.name} product screenshot`}
            placeholder="blur"
            sizes="(min-width: 1280px) 340px, (min-width: 1024px) 420px, (min-width: 640px) 50vw, 90vw"
            className="size-full object-cover object-left-top"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Logo doubles as the card heading (alt = product name) */}
        <h3 className="flex h-10 items-center">
          <Image
            src={study.logo}
            alt={study.name}
            sizes="180px"
            className={cn("w-auto max-w-[11rem] object-contain object-left", study.logoClass)}
          />
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft xl:text-sm">{study.description}</p>

        {study.href ? (
          <div className="mt-auto pt-5">
            <a
              href={study.href}
              className="stretched-link inline-flex min-h-6 items-center gap-1.5 text-sm font-semibold text-navy underline decoration-navy/25 decoration-1 underline-offset-[5px] transition-[text-decoration-color] duration-200 group-hover:decoration-navy focus-visible:outline-none"
            >
              View case study
              <PiArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">: {study.name}</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          split
          id="case-studies-title"
          index="04"
          label={caseStudiesSection.label}
          title={caseStudiesSection.title}
          intro={caseStudiesSection.intro}
        />

        {/* Auto-sliding: 1 (with peek) → 2 → 3 → 4 cards visible */}
        <Carousel
          label="Case studies"
          className="mt-10 lg:mt-12"
          slideClassName="w-[86%] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
          slides={caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        />
      </Container>
    </section>
  );
}
