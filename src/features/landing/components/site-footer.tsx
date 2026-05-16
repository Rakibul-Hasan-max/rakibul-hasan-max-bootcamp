import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FOOTER_LINKS } from "@/features/landing/constants";

const SOCIAL_LINKS = [
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaGithub, label: "GitHub", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Settings", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto pt-16 pb-8">
        {/* Top grid: brand + link columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Dragify"
                width={130}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The professional drag-and-drop website builder for creators,
              freelancers, and teams.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold mb-4">{section}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Dragify Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
