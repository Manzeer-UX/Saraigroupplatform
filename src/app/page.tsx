import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Approach } from "@/components/sections/Approach";
import { Capabilities } from "@/components/sections/Capabilities";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ExpertiseBenefits } from "@/components/sections/ExpertiseBenefits";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { caseStudies, companies, services, site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.tagline,
  description: site.description,
  subOrganization: companies.map((company) => ({
    "@type": "Organization",
    name: company.name,
    url: company.href,
    knowsAbout: company.services,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title, description: service.description },
    })),
  },
  subjectOf: caseStudies.map((study) => ({
    "@type": "CreativeWork",
    name: study.name,
    abstract: study.description,
    ...(study.href ? { url: study.href } : {}),
  })),
};

export default function Home() {
  return (
    <>
      <span id="top" aria-hidden="true" />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Capabilities />
        <Approach />
        <ExpertiseBenefits />
        <CaseStudies />
        <Services />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
    </>
  );
}
