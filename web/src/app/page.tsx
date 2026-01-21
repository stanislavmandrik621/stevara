import {
  HeroSection,
  OfficialHighlightsSection,
  EnergyBenefitsSection,
  DirectionsSection,
  ValueSection,
  ImageBreakSection,
  TrustSection,
  SupportSection,
  FAQSection,
  CTASection,
} from "@/components/home";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <OfficialHighlightsSection />
      <EnergyBenefitsSection />
      <DirectionsSection />
      <ValueSection />
      <ImageBreakSection />
      <TrustSection />
      <SupportSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
