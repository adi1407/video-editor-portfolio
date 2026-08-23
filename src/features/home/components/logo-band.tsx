"use client";

import LogoLoop from "@/components/ui/LogoLoop";
import { Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";

export function LogoBand() {
  const { toolkit } = usePortfolio();
  const toolLogos = [...toolkit.videoMotion, ...toolkit.design].map((title) => ({
    node: (
      <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-foreground/90 sm:text-base">
        {title}
      </span>
    ),
    title,
  }));
  return (
    <section
      id="toolkit"
      aria-label="Creative toolkit"
      className="scroll-mt-24 border-y border-border bg-surface py-10 sm:py-12"
    >
      <Container className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Creative toolkit
        </p>
        <p className="mt-2 text-sm text-muted">
          Video & motion · Design — the tools behind every frame.
        </p>
      </Container>
      <div className="relative h-[72px] overflow-hidden sm:h-[88px]">
        <LogoLoop
          logos={toolLogos}
          speed={90}
          direction="left"
          logoHeight={28}
          gap={56}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#05070c"
          ariaLabel="Creative toolkit"
        />
      </div>
    </section>
  );
}
