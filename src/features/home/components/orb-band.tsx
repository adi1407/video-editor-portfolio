"use client";

import dynamic from "next/dynamic";

const Orb = dynamic(() => import("@/components/ui/Orb"), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full bg-background" />,
});

export function OrbBand() {
  return (
    <section
      aria-label="Interactive orb"
      className="relative h-[420px] w-full overflow-hidden border-y border-border bg-background sm:h-[520px]"
    >
      <Orb hoverIntensity={0.5} rotateOnHover hue={0} forceHoverState={false} />
    </section>
  );
}
