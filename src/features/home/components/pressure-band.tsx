"use client";

import ParticleText from "@/components/ui/ParticleText";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import { useMediaQuery, useMounted } from "@/hooks";

export function PressureBand() {
  const { profile } = usePortfolio();
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!mounted || !isDesktop) {
    return (
      <section
        aria-label="Purpose"
        className="border-y border-border bg-[#09090f] px-4 py-14 text-center sm:py-16"
      >
        <p className="font-display text-[clamp(1.5rem,7vw,3rem)] font-bold tracking-tight text-foreground">
          {profile.tagline}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Purpose"
      className="relative h-[320px] w-full overflow-hidden border-y border-border bg-[#09090f] sm:h-[380px]"
    >
      <ParticleText
        text={profile.tagline}
        particleSize={2}
        density={4}
        color="#ffffff"
        highlightColor="#8b5cf6"
        scatter={180}
        gatherDuration={1600}
        stagger={420}
        pointerRepel={40}
        repelRadius={120}
        idleDrift={0.7}
        trigger="hover"
        fontSize="clamp(1.75rem, 6vw, 4.5rem)"
        fontWeight={800}
        fontFamily="inherit"
        glow
      />
    </section>
  );
}
