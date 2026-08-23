"use client";

import ParticleText from "@/components/ui/ParticleText";

export function ParticleTextBand() {
  return (
    <section
      aria-label="Particle text"
      className="relative h-[360px] w-full overflow-hidden border-y border-border bg-[#09090f]"
    >
      <ParticleText
        text="Launch Faster"
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
        fontSize="clamp(3rem, 12vw, 8rem)"
        fontWeight={800}
        fontFamily="inherit"
        glow
      />
    </section>
  );
}
