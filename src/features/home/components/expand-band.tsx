"use client";

import ScrollExpand from "@/components/ui/ScrollExpand";

export function ExpandBand() {
  return (
    <section aria-label="Showreel expand" className="bg-background">
      <ScrollExpand
        src="/hero.jpg"
        alt="Selected reel frame"
        title="Selected reel"
        scrollHint="Scroll"
        useWindowScroll
        mediaZoom={1.35}
      >
        <h2 className="font-display text-3xl font-medium text-white sm:text-5xl">
          Every frame has a purpose
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
          From high-impact short-form to cinematic long-form — stories shaped to
          hold attention.
        </p>
      </ScrollExpand>
    </section>
  );
}
