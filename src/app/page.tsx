import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Layout, Zap, Check, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dragify" width={140} height={40} className="h-9 w-auto" priority />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#templates" className="text-sm font-medium hover:text-primary transition-colors">Templates</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container relative z-10 mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-outfit tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Build Stunning Websites <br /> Without Limits
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
              The professional website builder for modern creators. Drag, drop, and publish with high-performance code generated automatically.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/dashboard">
                  Start Building <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                View Templates
              </Button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-outfit mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Powerful tools designed to help you create, manage, and scale your online presence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border bg-background p-8 transition-all hover:shadow-lg">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Optimized assets and edge delivery ensure your sites load in milliseconds.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-8 transition-all hover:shadow-lg">
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                  <Layers className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Components</h3>
                <p className="text-muted-foreground">
                  Build and reuse your own component library across all your projects.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-8 transition-all hover:shadow-lg">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-6">
                  <Layout className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
                <p className="text-muted-foreground">
                  Your site looks perfect on every device automatically with zero effort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight mb-4">
                Choose your plan
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Start free, scale as you grow. No hidden fees, no surprises.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">

              {/* Free */}
              <div className="relative rounded-2xl border bg-background p-8 flex flex-col gap-6 hover:shadow-md transition-all duration-300">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Free</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-bold font-outfit">$0</span>
                    <span className="text-muted-foreground mb-2">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Perfect for side projects &amp; experimenting.</p>
                </div>
                <Button variant="outline" size="lg" className="rounded-xl w-full" asChild>
                  <Link href="/register">Get started free</Link>
                </Button>
                <ul className="flex flex-col gap-3 text-sm">
                  {[
                    "3 projects",
                    "Drag & drop editor",
                    "Community templates",
                    "Dragify subdomain",
                    "1 GB storage",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Check className="h-3 w-3 text-foreground" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro — highlighted */}
              <div className="relative rounded-2xl border-2 border-primary bg-background p-8 flex flex-col gap-6 shadow-xl shadow-primary/10 scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                {/* Popular badge */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-lg whitespace-nowrap">
                  Most Popular
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Pro</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-bold font-outfit">$19</span>
                    <span className="text-muted-foreground mb-2">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For freelancers &amp; growing businesses.</p>
                </div>
                <Button size="lg" className="rounded-xl w-full" asChild>
                  <Link href="/register">
                    Start Pro <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <ul className="flex flex-col gap-3 text-sm">
                  {[
                    "Unlimited projects",
                    "Everything in Free",
                    "Custom domain",
                    "Premium templates",
                    "50 GB storage",
                    "Priority support",
                    "Remove Dragify branding",
                    "Advanced analytics",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business */}
              <div className="relative rounded-2xl border bg-background p-8 flex flex-col gap-6 hover:shadow-md transition-all duration-300">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Business</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-bold font-outfit">$49</span>
                    <span className="text-muted-foreground mb-2">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For agencies &amp; large teams at scale.</p>
                </div>
                <Button variant="outline" size="lg" className="rounded-xl w-full" asChild>
                  <Link href="/register">Start Business</Link>
                </Button>
                <ul className="flex flex-col gap-3 text-sm">
                  {[
                    "Everything in Pro",
                    "10 team members",
                    "500 GB storage",
                    "White-label solution",
                    "API access",
                    "Custom integrations",
                    "SLA & dedicated support",
                    "SSO / SAML login",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Check className="h-3 w-3 text-foreground" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom note */}
            <p className="text-center text-sm text-muted-foreground mt-12">
              All plans include a <strong className="text-foreground">14-day free trial</strong>. No credit card required.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dragify" width={120} height={34} className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-sm text-muted-foreground">
            © 2026 Dragify Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
