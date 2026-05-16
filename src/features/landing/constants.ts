import {
  Globe,
  ShoppingBag,
  Briefcase,
  User,
  Palette,
  BarChart2,
  Layers,
  Layout,
  Zap,
} from "lucide-react";
import type { ElementType } from "react";

// ─── Feature Section ──────────────────────────────────────────────────────────

export interface Feature {
  icon: ElementType;
  title: string;
  description: string;
  color: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized assets and edge delivery ensure your sites load in milliseconds.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Layers,
    title: "Custom Components",
    description:
      "Build and reuse your own component library across all your projects.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Layout,
    title: "Responsive Design",
    description:
      "Your site looks perfect on every device automatically with zero effort.",
    color: "bg-green-500/10 text-green-500",
  },
];

// ─── Templates Section ────────────────────────────────────────────────────────

export interface Template {
  icon: ElementType;
  label: string;
  color: string;
  desc: string;
  tags: string[];
}

export const TEMPLATES: Template[] = [
  {
    icon: Globe,
    label: "Landing Page",
    color: "bg-primary/10 text-primary",
    desc: "High-converting landing pages for SaaS, apps & products.",
    tags: ["Marketing", "SaaS"],
  },
  {
    icon: User,
    label: "Portfolio",
    color: "bg-violet-500/10 text-violet-500",
    desc: "Showcase your work with a sleek, minimal portfolio site.",
    tags: ["Personal", "Creative"],
  },
  {
    icon: ShoppingBag,
    label: "E-Commerce",
    color: "bg-orange-500/10 text-orange-500",
    desc: "Sell your products online with a fully styled storefront.",
    tags: ["Shop", "Business"],
  },
  {
    icon: Briefcase,
    label: "Agency",
    color: "bg-blue-500/10 text-blue-500",
    desc: "Bold agency sites that turn visitors into clients.",
    tags: ["Agency", "Corporate"],
  },
  {
    icon: BarChart2,
    label: "Dashboard",
    color: "bg-green-500/10 text-green-500",
    desc: "Data-rich dashboards and admin panel starters.",
    tags: ["App", "Analytics"],
  },
  {
    icon: Palette,
    label: "Blog",
    color: "bg-pink-500/10 text-pink-500",
    desc: "Beautiful blog layouts for writers and content creators.",
    tags: ["Content", "Personal"],
  },
];

// ─── Pricing Section ──────────────────────────────────────────────────────────

export interface PricingPlan {
  name: string;
  price: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  highlighted: boolean;
  features: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    tagline: "Perfect for side projects & experimenting.",
    cta: "Get started free",
    ctaHref: "/register",
    highlighted: false,
    features: [
      "3 projects",
      "Drag & drop editor",
      "Community templates",
      "Dragify subdomain",
      "1 GB storage",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    tagline: "For freelancers & growing businesses.",
    cta: "Start Pro",
    ctaHref: "/register",
    highlighted: true,
    features: [
      "Unlimited projects",
      "Everything in Free",
      "Custom domain",
      "Premium templates",
      "50 GB storage",
      "Priority support",
      "Remove Dragify branding",
      "Advanced analytics",
    ],
  },
  {
    name: "Business",
    price: "$49",
    tagline: "For agencies & large teams at scale.",
    cta: "Start Business",
    ctaHref: "/register",
    highlighted: false,
    features: [
      "Everything in Pro",
      "10 team members",
      "500 GB storage",
      "White-label solution",
      "API access",
      "Custom integrations",
      "SLA & dedicated support",
      "SSO / SAML login",
    ],
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_LINKS: Record<string, string[]> = {
  Product: ["Features", "Templates", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Documentation", "API Reference", "Blog", "Tutorials", "Community"],
  Company: ["About Us", "Careers", "Press Kit", "Contact", "Partners"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
};

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
];
