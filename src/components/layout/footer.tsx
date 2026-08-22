"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Container } from "@/components/ui";
import { siteConfig, navLinks } from "@/config/site";
import { profile } from "@/features/home/content";

export function Footer() {
  const wordRef = useRef<HTMLAnchorElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const letters = "Raju".split("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const onEnter = useCallback(() => {
    if (reducedMotion) return;
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: -10,
        rotationX: -18,
        color: "#c4b5fd",
        textShadow: "0 0 28px rgba(168, 85, 247, 0.45)",
        duration: 0.45,
        ease: "power3.out",
        delay: i * 0.04,
      });
    });
    if (wordRef.current) {
      gsap.to(wordRef.current, {
        letterSpacing: "0.08em",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  const onLeave = useCallback(() => {
    if (reducedMotion) return;
    letterRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        y: 0,
        rotationX: 0,
        color: "#F8FAFC",
        textShadow: "0 0 0 transparent",
        duration: 0.5,
        ease: "power3.out",
      });
    });
    if (wordRef.current) {
      gsap.to(wordRef.current, {
        letterSpacing: "-0.04em",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-10 py-12 sm:py-16">
        <Link
          ref={wordRef}
          href="/"
          aria-label={`${profile.name} — home`}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
          className="group relative block w-full overflow-hidden py-2 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ letterSpacing: "-0.04em", perspective: 800 }}
        >
          <span
            className="footer-raju-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
            aria-hidden
          />
          <span className="flex w-full justify-between font-display text-[clamp(4.5rem,22vw,14rem)] font-medium leading-none tracking-tight text-foreground">
            {letters.map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className="inline-block will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {letter}
              </span>
            ))}
          </span>
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

      <style jsx>{`
        .footer-raju-shine {
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.12) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          animation: footer-shine 1.4s ease forwards;
        }
        @keyframes footer-shine {
          from {
            background-position: 100% 0;
          }
          to {
            background-position: -100% 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-raju-shine {
            animation: none;
            opacity: 0 !important;
          }
        }
      `}</style>
    </footer>
  );
}
