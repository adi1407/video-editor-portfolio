"use client";

import MorphSlider, { type MorphItem } from "@/components/ui/MorphSlider";

const items: MorphItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop",
    caption: "One",
  },
  {
    image:
      "https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop",
    caption: "Two",
  },
  {
    image:
      "https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop",
    caption: "Three",
  },
];

export function MorphSliderBand() {
  return (
    <section
      aria-label="Morph slider"
      className="relative h-[500px] w-full overflow-hidden border-y border-border bg-background"
    >
      <MorphSlider
        items={items}
        transition="melt"
        intensity={0.55}
        aberration={0.35}
        drift={0.4}
        autoplay
      />
    </section>
  );
}
