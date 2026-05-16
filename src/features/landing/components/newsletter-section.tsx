"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to a real email service (e.g. Resend, Mailchimp)
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto rounded-3xl border bg-background/80 backdrop-blur-sm p-10 md:p-16 text-center shadow-xl">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-7 w-7 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-outfit tracking-tight mb-3">
            Stay in the loop
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get the latest Dragify updates, templates, and tips delivered
            straight to your inbox. No spam, unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4 text-green-600 dark:text-green-400 text-sm font-medium">
              🎉 You&apos;re subscribed! Check your inbox for a confirmation.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
              />
              <Button type="submit" className="rounded-xl shrink-0">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            Join <strong className="text-foreground">12,000+</strong> creators
            already subscribed.
          </p>
        </div>
      </div>
    </section>
  );
}
