import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Layout, Zap } from "lucide-react";

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
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container relative z-10 mx-auto text-center">
            <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Now in Public Beta
            </div>
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
