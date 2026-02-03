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
  ImageBreakSection,
  TrustSection,
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
      
      {/* Section 2: Official Tesla highlights - 6 cards */}
      <OfficialHighlightsSection />
      
      {/* Section 3: Blackout demo - Main selling point for Ukraine */}
      <BlackoutDemoSection />
      
      {/* Section 4: Tech specs - 13.5 kWh, 11.5 kW, <20ms, 97.5% */}
      <TechSpecsSection />
      
      {/* Section 5: Tesla App preview - Control in your phone */}
      <TeslaAppPreviewSection />
      
      {/* Section 6: Energy benefits - 3 key benefits */}
      <EnergyBenefitsSection />
      
      {/* Section 7: Directions - Powerwall / Megapack */}
      <DirectionsSection />
      
      {/* Section 8: Value proposition - One team, full responsibility */}
      <ValueSection />
      
      {/* Section 9: Installation process - 5 steps */}
      <InstallationProcessSection />
      
      {/* Section 10: Visual break - Quote with video */}
      <ImageBreakSection />
      
      {/* Section 11: Trust - Why trust us */}
      <TrustSection />
      
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
