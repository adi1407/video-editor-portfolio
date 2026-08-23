"use client";

import Link from "next/link";
import ChromaGrid, { type ChromaItem } from "@/components/ui/ChromaGrid";
import FoldText from "@/components/ui/FoldText";
import { buttonClassName, Container } from "@/components/ui";
import { profile, selectedWork } from "@/features/home/content";

const chromaItems: ChromaItem[] = selectedWork.map((item, index) => {
  const accents = ["#A78BFA", "#5227FF", "#38BDF8", "#F472B6"];
  const color = accents[index % accents.length];
  return {
    image: item.image,
    title: item.title,
    subtitle: item.subtitle,
    borderColor: color,
    gradient: `linear-gradient(145deg, ${color}, #05070c)`,
    url: item.href,
  };
});

export function SelectedWorkBand() {
  return (
    <section
      id="selected-work"
      aria-label="Selected work"
      className="scroll-mt-24 border-b border-border py-16 sm:py-20"
    >
      <Container className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Selected work
          </p>
          <FoldText
            text="Frames that hold attention"
            splitBy="word"
            hinge="top"
            trigger="scroll"
            duration={0.65}
            stagger={0.05}
            fontSize="clamp(2rem, 5vw, 3.25rem)"
            fontWeight={700}
            color="#F8FAFC"
            className="mt-3"
          />
          <p className="mt-3 text-base leading-7 text-muted">
            A quick look across long format, short format, posters, and logos.
          </p>
        </div>
        <Link
          href={profile.ctas.work.href}
          className={buttonClassName({ variant: "outline" })}
        >
          {profile.ctas.work.label}
        </Link>
      </Container>
      <div className="relative mx-auto h-[520px] w-full max-w-6xl px-4 sm:h-[560px] sm:px-6">
        <ChromaGrid
          items={chromaItems}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  );
}
