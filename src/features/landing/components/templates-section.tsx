import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/features/landing/constants";

export function TemplatesSection() {
  return (
    <section id="templates" className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight mb-4">
            Start from a template
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Pick from professionally designed templates and customize every
            pixel to match your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TEMPLATES.map((template) => (
            <div
              key={template.label}
              className="group relative rounded-2xl border bg-background p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${template.color}`}
              >
                <template.icon className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 font-outfit">
                  {template.label}
                </h3>
                <p className="text-sm text-muted-foreground">{template.desc}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                  asChild
                >
                  <Link href="/dashboard">
                    Use <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            asChild
          >
            <Link href="/dashboard">
              Browse all templates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
