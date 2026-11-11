import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPlaceholder title="Terms & Conditions" />;
}
