import {
  HeroSection,
  OfficialHighlightsSection,
  BlackoutDemoSection,
  TechSpecsSection,
  TeslaAppPreviewSection,
  EnergyBenefitsSection,
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
      {/* Section 1: Hero - First impression */}
      <HeroSection />
      
      {/* Section 2: Powerwall features */}
      <OfficialHighlightsSection />
      
      {/* Section 3: Blackout demo - Main selling point */}
      <BlackoutDemoSection />
      
      {/* Section 4: Tech specs teaser */}
      <TechSpecsSection />
      
      {/* Section 4: Tesla App preview */}
      <TeslaAppPreviewSection />
      
      {/* Section 5: Energy benefits */}
      <EnergyBenefitsSection />
      
      {/* Section 7: Directions - Powerwall / Megapack */}
      <DirectionsSection />
      
      {/* Section 8: Value proposition - One team, full responsibility */}
      <ValueSection />
      
      {/* Section 9: Installation process - 5 steps */}
      <InstallationProcessSection />
      
      {/* Section 12: Cases - Installation examples */}
      <CasesSection />
      
      {/* Section 13: Support - Post-launch support */}
      <SupportSection />
      
      {/* Section 14: Financing teaser - Available financing */}
      <FinancingTeaserSection />
      
      {/* Section 15: FAQ - Questions & answers */}
      <FAQSection />
      
      {/* Section 16: CTA - Contact form */}
      <CTASection />
    </main>
  );
}
