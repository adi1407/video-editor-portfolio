"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(100svh,720px)] w-full items-center justify-center text-sm text-muted">
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
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </section>
  );
}
