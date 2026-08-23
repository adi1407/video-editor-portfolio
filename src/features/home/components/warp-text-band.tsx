"use client";

import WarpText from "@/components/ui/WarpText";

export function WarpTextBand() {
  return (
    <section
      aria-label="Warp text"
      className="relative w-full overflow-hidden border-y border-border bg-background"
    >
      <WarpText
        text="Bend the moment"
        color="#f8f5ff"
        warpStrength={0.08}
        warpScale={1.7}
        speed={0.55}
        pointerInfluence={0.42}
        pointerStrength={0.38}
        refraction={0.018}
        ripple
        fontSize="clamp(3rem, 10vw, 9rem)"
        fontWeight={800}
        style={{ height: "320px" }}
      />
    </section>
  );
}
