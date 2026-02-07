import {
  HeroSection,
  DirectionsSection,
  ValueSection,
  InstallationProcessSection,
  CasesSection,
  SupportSection,
  FinancingTeaserSection,
  FAQSection,
  CTASection,
} from "@/components/home";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Hero - First impression */}
      <HeroSection />
      
      {/* Чому STEVARA - company trust points */}
      <ValueSection />
      
      {/* Powerwall product showcase with link to /powerwall */}
      <DirectionsSection />
      
      {/* Як працюємо */}
      <InstallationProcessSection />
      
      {/* Installation examples */}
      <CasesSection />
      
      {/* Post-launch support */}
      <SupportSection />
      
      {/* Financing teaser */}
      <FinancingTeaserSection />
      
      {/* FAQ */}
      <FAQSection />
      
      {/* Contact CTA */}
      <CTASection />
    </main>
  );
}
