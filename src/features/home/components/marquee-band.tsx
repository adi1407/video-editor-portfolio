"use client";

import TextLoop from "@/components/ui/TextLoop";

export function MarqueeBand() {
  return (
    <section
      aria-label="Studio marquee"
      className="overflow-hidden border-y border-border bg-background py-6 sm:py-10"
    >
      <TextLoop
        text="EVERY FRAME HAS A PURPOSE"
        shape="wave"
        speed={90}
        direction="forward"
        separator="✦"
        curviness={90}
        fontSize={42}
        fontWeight={800}
        letterSpacing={2}
        uppercase
        color="#ffffff"
        ribbon
        ribbonColor="#5227FF"
        ribbonWidth={86}
        pauseOnHover
      />
    </section>
  );
}
