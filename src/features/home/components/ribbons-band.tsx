"use client";

import Ribbons from "@/components/ui/Ribbons";

export function RibbonsBand() {
  return (
    <section
      aria-label="Interactive ribbons"
      className="relative h-[500px] overflow-hidden border-y border-border bg-background"
    >
      <Ribbons
        baseThickness={30}
        colors={["#ffffff"]}
        speedMultiplier={0.5}
        maxAge={500}
        enableFade={false}
        enableShaderEffect={true}
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          Move to draw
        </p>
      </div>
    </section>
  );
}
