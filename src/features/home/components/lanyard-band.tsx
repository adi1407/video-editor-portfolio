"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(78svh,640px)] w-full items-center justify-center text-sm text-muted sm:h-[min(100svh,720px)]">
      Loading badge…
    </div>
  ),
});

export function LanyardBand() {
  return (
    <section
      aria-label="Interactive lanyard badge"
      className="relative overflow-hidden border-y border-border bg-background"
    >
      <div className="mx-auto h-[min(78svh,640px)] w-full touch-none sm:h-[min(92svh,760px)] lg:h-[min(100svh,820px)]">
        <Lanyard
          className="h-full w-full"
          position={[0, 0, 20]}
          gravity={[0, -34, 0]}
          fov={20}
        />
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-muted sm:bottom-6">
        Drag or hold to stretch — release to let it swing
      </p>
    </section>
  );
}
