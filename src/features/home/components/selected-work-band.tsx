"use client";

import Link from "next/link";
import ChromaGrid, { type ChromaItem } from "@/components/ui/ChromaGrid";
import FoldText from "@/components/ui/FoldText";
import { buttonClassName, Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import { useMounted } from "@/hooks";

export function SelectedWorkBand() {
  const { profile, selectedWork } = usePortfolio();
  const mounted = useMounted();

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

  return (
    <section
      id="selected-work"
      aria-label="Selected work"
      className="scroll-mt-24 border-b border-border py-12 sm:py-20"
    >
      <Container className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Selected work
          </p>
          <FoldText
            text="Frames that hold attention"
            splitBy="word"
            hinge="top"
            trigger="scroll"
            duration={0.55}
            stagger={0.04}
            fontSize="clamp(1.75rem, 5vw, 3.25rem)"
            fontWeight={700}
            color="#F8FAFC"
            className="mt-3"
          />
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
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

      {mounted ? (
        <div className="relative mx-auto h-auto min-h-[360px] w-full max-w-6xl px-4 sm:min-h-[420px] sm:px-6 lg:min-h-[480px]">
          <ChromaGrid
            items={chromaItems.slice(0, 4)}
            radius={280}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            className="!h-auto"
          />
        </div>
      ) : (
        <Container>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {selectedWork.slice(0, 4).map((item) => (
              <div
                key={item.title}
                className="aspect-[4/5] animate-pulse border border-border bg-surface"
              />
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
