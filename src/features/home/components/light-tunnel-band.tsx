"use client";

import LightTunnel from "@/components/ui/LightTunnel";

export function LightTunnelBand() {
  return (
    <section
      aria-label="Light tunnel"
      className="relative h-[600px] w-full overflow-hidden border-y border-border bg-background"
    >
      <LightTunnel
        cableColor="#A855F7"
        pulseColor="#A855F7"
        tunnelColor="#5227FF"
        tunnelOpacity={0}
        speed={0.1}
        flowDirection="outward"
        pulseSpeed={2}
        pulseLength={0.28}
        pulseBlend={1}
        pulseWidth={1}
        cableCount={20}
        thickness={0.35}
        rimWidth={0.15}
        waviness={0.3}
        sway={0.5}
        size={1.0}
        centerX={0.0}
        centerY={0.0}
        glow={1.0}
        fadeNear={0.5}
        fadeFar={2}
        brightness={1.0}
        colorVariance={true}
        grain={true}
        grainIntensity={0.05}
        opacity={1.0}
        mouseInteraction={true}
        mouseStrength={0.1}
      />
    </section>
  );
}
