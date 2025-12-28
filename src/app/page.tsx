import { FeaturesSection } from "@/features/landing/components/features-section";
import { FooterSection } from "@/features/landing/components/footer-section";
import { HeroSection } from "@/features/landing/components/hero-section";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}
