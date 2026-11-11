import { PiArrowLeft } from "react-icons/pi";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionHeader";

/**
 * Placeholder for legal pages, which are not yet published on the current
 * site. Replace the body with the approved policy text.
 */
export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <>
      <span id="top" aria-hidden="true" />
      <Header homeHref="/" />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Container className="pb-28 pt-40 lg:pb-36 lg:pt-48">
          <SectionLabel index="—">Legal</SectionLabel>
          <h1 className="mt-6 text-title">{title}</h1>
          <p className="mt-6 max-w-[52ch] text-lead text-ink-soft">
            This page is being prepared and will be published soon.
          </p>
          <ButtonLink href="/" variant="secondary" className="mt-10">
            <PiArrowLeft aria-hidden="true" className="-ml-1 size-4" />
            Back to homepage
          </ButtonLink>
        </Container>
      </main>
      <Footer homeHref="/" />
    </>
  );
}
