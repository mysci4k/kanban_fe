import { FeaturesSection } from "@/components/landing/features-section";
import { FooterSection } from "@/components/landing/footer-section";
import { HeroSection } from "@/components/landing/hero-section";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}
