"use client";

import Link from "next/link";
import DriftWall from "@/components/ui/DriftWall";
import { buttonClassName, Container } from "@/components/ui";
import { profile, selectedWork } from "@/features/home/content";

export function DriftWallBand() {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-background"
    >
      <Container className="relative z-10 flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Selected work
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Frames from the timeline
          </h2>
        </div>
        <Link href={profile.ctas.work.href} className={buttonClassName({ variant: "outline" })}>
          See all work
        </Link>
      </Container>
      <div className="relative h-[560px] sm:h-[640px]">
        <DriftWall
          items={[...selectedWork]}
          columns={5}
          tileWidth={200}
          tileHeight={132}
          gap={18}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={120}
          speed={42}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.55}
          overlayColor="#060010"
        />
      </div>
    </section>
  );
}
