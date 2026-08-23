"use client";

import PixelSwap from "@/components/ui/PixelSwap";
import { Container } from "@/components/ui";

export function PixelSwapBand() {
  return (
    <section
      aria-label="Pixel swap"
      className="border-y border-border bg-background py-16 sm:py-20"
    >
      <Container className="flex justify-center">
        <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border shadow-[0_28px_80px_rgba(0,0,0,0.32)]">
          <PixelSwap
            firstContent={
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  Interact
                </span>
                <span className="font-display text-3xl font-medium text-foreground sm:text-4xl">
                  Click me
                </span>
              </div>
            }
            secondContent={
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-white to-[#e4d9f7] px-6 text-center text-[#120f17]">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#120f17]/90">
                  Revealed
                </span>
                <span className="font-display text-3xl font-medium sm:text-4xl">
                  You found me
                </span>
              </div>
            }
            pixelSize={64}
            gap={0}
            pixelRadius={0}
            pixelSpin={0}
            pixelScale={0.35}
            duration={1400}
            pixelDuration={450}
            pattern="random"
            randomness={0}
            fade
            trigger="click"
            aspectRatio="16 / 10"
            className="cursor-pointer select-none"
          />
        </div>
      </Container>
    </section>
  );
}
