import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container relative z-10 mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-outfit tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          Build Stunning Websites <br /> Without Limits
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
          The professional website builder for modern creators. Drag, drop, and
          publish with high-performance code generated automatically.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/dashboard">
              Start Building <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
            <Link href="#templates">View Templates</Link>
          </Button>
        </div>
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
    </section>
  );
}
