import {
  HeroSection,
  DirectionsSection,
  ValueSection,
  TrustSection,
  SupportSection,
  FAQSection,
  CTASection,
} from "@/components/home";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <DirectionsSection />
      <ValueSection />
      <TrustSection />
      <SupportSection />
      <FAQSection />
      <CTASection />
      </main>
  );
}
