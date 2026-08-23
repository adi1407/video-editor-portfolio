"use client";

import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import MagicBento from "@/components/ui/MagicBento";
import { buttonClassName, Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";

export function FeatureGrid() {
  const { profile, services } = usePortfolio();
  const cards = services.map((service) => ({
    color: "#060010",
    label: service.label,
    title: service.title,
    description: service.description,
  }));
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-24">
      <Container className="flex flex-col items-center gap-10 sm:gap-14">
        <div className="flex w-full max-w-5xl flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            What I do
          </p>
          <FoldText
            text="Craft across formats"
            splitBy="word"
            hinge="top"
            trigger="scroll"
            duration={0.65}
            stagger={0.05}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize="clamp(2.5rem, 8vw, 5.5rem)"
            fontWeight={800}
            color="#f7f2e8"
            className="text-center"
          />
          <p className="max-w-xl text-base leading-7 text-muted">
            Long format, short format, posters, and logos — explore the full
            archive on the work page.
          </p>
          <Link href={profile.ctas.work.href} className={buttonClassName({ variant: "outline" })}>
            Browse categories
          </Link>
        </div>
        <MagicBento
          cards={cards}
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </Container>
    </section>
  );
}
