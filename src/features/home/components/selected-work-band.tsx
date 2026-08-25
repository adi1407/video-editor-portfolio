"use client";

import Image from "next/image";
import Link from "next/link";
import ChromaGrid, { type ChromaItem } from "@/components/ui/ChromaGrid";
import FoldText from "@/components/ui/FoldText";
import { buttonClassName, Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import { useMediaQuery, useMounted } from "@/hooks";

export function SelectedWorkBand() {
  const { profile, selectedWork } = usePortfolio();
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

      {mounted && isDesktop ? (
        <div className="relative mx-auto h-auto min-h-[420px] w-full max-w-6xl px-4 sm:px-6 lg:min-h-[480px]">
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
          <div className="grid grid-cols-2 gap-3">
            {selectedWork.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative aspect-[4/5] overflow-hidden border border-border bg-surface"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-active:scale-105"
                  sizes="(max-width: 768px) 50vw, 280px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-3">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
