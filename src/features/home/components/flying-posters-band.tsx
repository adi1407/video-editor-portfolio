"use client";

import FlyingPosters from "@/components/ui/FlyingPosters";

const items = [
  "https://picsum.photos/500/500?grayscale",
  "https://picsum.photos/600/600?grayscale",
  "https://picsum.photos/400/400?grayscale",
];

export function FlyingPostersBand() {
  return (
    <section
      aria-label="Flying posters"
      className="relative h-[600px] w-full overflow-hidden border-y border-border bg-background"
    >
      <FlyingPosters items={items} />
    </section>
  );
}
