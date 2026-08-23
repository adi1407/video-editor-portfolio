"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TextPressure from "@/components/ui/TextPressure";
import { Container } from "@/components/ui";
import { siteConfig, navLinks } from "@/config/site";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import { useMediaQuery } from "@/hooks";

export function Footer() {
  const { profile } = usePortfolio();
  const [reducedMotion, setReducedMotion] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const usePressure = isDesktop && !reducedMotion;

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-8 py-10 sm:gap-10 sm:py-16">
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="group relative block w-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {usePressure ? (
            <div className="mx-auto h-[min(28vw,12rem)] w-full max-w-5xl sm:h-[min(22vw,14rem)]">
              <TextPressure
                text="RAJU"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                scale
                textColor="#F8FAFC"
                strokeColor="#A78BFA"
                minFontSize={36}
              />
            </div>
          ) : (
            <span
              className="block w-full overflow-visible py-2 text-center font-display text-[clamp(3.25rem,18vw,8rem)] font-medium leading-[0.9] tracking-[-0.04em] text-foreground transition-[letter-spacing,color,text-shadow] duration-500 ease-out group-hover:tracking-[0.06em] group-hover:text-[#c4b5fd] group-hover:shadow-none group-active:tracking-[0.06em] group-active:text-[#c4b5fd]"
              style={{
                textShadow: "0 0 0 transparent",
              }}
            >
              <span className="inline-block transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_28px_rgba(168,85,247,0.45)] group-active:[text-shadow:0_0_28px_rgba(168,85,247,0.45)]">
                RAJU
              </span>
            </span>
          )}
        </Link>

        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{profile.shortRole}</p>
            <p className="mt-1 text-sm text-muted">{profile.tagline}</p>
            <p className="mt-4 text-xs text-muted">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
          >
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
