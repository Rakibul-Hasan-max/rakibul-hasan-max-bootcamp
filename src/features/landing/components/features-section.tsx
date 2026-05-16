import { FEATURES } from "@/features/landing/constants";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-outfit mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Powerful tools designed to help you create, manage, and scale your
            online presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="rounded-2xl border bg-background p-8 transition-all hover:shadow-lg"
            >
              <div
                className={`h-12 w-12 rounded-lg flex items-center justify-center mb-6 ${color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
