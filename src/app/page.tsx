import {
  SiteHeader,
  HeroSection,
  FeaturesSection,
  TemplatesSection,
  PricingSection,
  NewsletterSection,
  SiteFooter,
} from "@/features/landing";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <PricingSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  );
}
