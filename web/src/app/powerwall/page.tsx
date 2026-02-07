import {
  PowerwallHeroSection,
  OfficialHighlightsSection,
  BlackoutDemoSection,
  TechSpecsSection,
  TeslaAppPreviewSection,
  EnergyBenefitsSection,
  CasesSection,
  FAQSection,
  CTASection,
} from "@/components/home";

export default function PowerwallPage() {
  return (
    <main className="relative">
      {/* Powerwall Hero */}
      <PowerwallHeroSection />

      {/* Інший клас резерву - Powerwall features */}
      <OfficialHighlightsSection />

      {/* Що відбувається під час відключення */}
      <BlackoutDemoSection />

      {/* Технічні характеристики */}
      <TechSpecsSection />

      {/* Контроль у вашому смартфоні */}
      <TeslaAppPreviewSection />

      {/* Чому Tesla Energy */}
      <EnergyBenefitsSection />

      {/* Installation examples */}
      <CasesSection />

      {/* FAQ */}
      <FAQSection />

      {/* Contact CTA */}
      <CTASection />
    </main>
  );
}
