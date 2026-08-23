"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TextPressure from "@/components/ui/TextPressure";
import { Container } from "@/components/ui";
import { siteConfig, navLinks } from "@/config/site";
import { profile } from "@/features/home/content";

export function Footer() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-10 py-12 sm:py-16">
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="relative block w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {reducedMotion ? (
            <span className="block w-full py-4 font-display text-[clamp(4.5rem,22vw,14rem)] font-medium leading-none tracking-tight text-foreground">
              RAJU
            </span>
          ) : (
            <div className="mx-auto h-[clamp(7rem,18vw,14rem)] w-full">
              <TextPressure
                text="RAJU"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="#F8FAFC"
                strokeColor="#A78BFA"
                minFontSize={48}
              />
            </div>
          )}
        </Link>

        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{profile.shortRole}</p>
            <p className="mt-1 text-sm text-muted">{profile.tagline}</p>
            <p className="mt-4 text-xs text-muted">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
