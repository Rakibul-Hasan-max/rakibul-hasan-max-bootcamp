import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/features/landing/constants";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden bg-muted/30"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight mb-4">
            Choose your plan
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border bg-background p-8 flex flex-col gap-6 transition-all duration-300",
                plan.highlighted
                  ? "border-2 border-primary shadow-xl shadow-primary/10 scale-[1.03] hover:shadow-2xl hover:shadow-primary/20"
                  : "hover:shadow-md"
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-lg whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <div>
                <p
                  className={cn(
                    "text-sm font-semibold uppercase tracking-wider mb-2",
                    plan.highlighted
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-bold font-outfit">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground mb-2">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.tagline}</p>
              </div>

              <Button
                size="lg"
                variant={plan.highlighted ? "default" : "outline"}
                className="rounded-xl w-full"
                asChild
              >
                <Link href={plan.ctaHref}>
                  {plan.cta}
                  {plan.highlighted && (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Link>
              </Button>

              <ul className="flex flex-col gap-3 text-sm">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-center gap-3",
                      plan.highlighted ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.highlighted ? "bg-primary/10" : "bg-muted"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3 w-3",
                          plan.highlighted ? "text-primary" : "text-foreground"
                        )}
                      />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include a{" "}
          <strong className="text-foreground">14-day free trial</strong>. No
          credit card required.
        </p>
      </div>
    </section>
  );
}
