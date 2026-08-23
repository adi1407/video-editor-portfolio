"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import PixelTransition from "@/components/ui/PixelTransition";
import ScrollExpand from "@/components/ui/ScrollExpand";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { Container } from "@/components/ui";
import { workCategories } from "@/features/home/content";
import { WorkCard } from "./work-card";
import type { MorphItem } from "@/components/ui/MorphSlider";

const DriftWall = dynamic(() => import("@/components/ui/DriftWall"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-background" />,
});

const WarpText = dynamic(() => import("@/components/ui/WarpText"), {
  ssr: false,
  loading: () => (
    <p className="text-base text-muted sm:text-lg">
      Long format · Short format · Posters · Logos
    </p>
  ),
});

const MorphSlider = dynamic(() => import("@/components/ui/MorphSlider"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-surface" />,
});

const PixelSwap = dynamic(() => import("@/components/ui/PixelSwap"), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] w-full bg-surface" />,
});

const FlyingPosters = dynamic(() => import("@/components/ui/FlyingPosters"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-background" />,
});

const InfiniteMenu = dynamic(() => import("@/components/ui/InfiniteMenu"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-background" />,
});

const archiveItems = workCategories.flatMap((category) =>
  category.items.map((item) => ({
    image: item.image,
    title: item.title,
    href: `/work#${category.slug}`,
  })),
);

export function WorkHero() {
  return (
    <section className="relative overflow-hidden border-b border-border py-20 sm:py-28">
      <Container className="relative z-10 flex flex-col gap-6">
        <ShinyText
          text="Portfolio archive"
          speed={2.2}
          color="#94a3b8"
          shineColor="#ffffff"
          className="text-xs font-semibold uppercase tracking-[0.22em]"
        />
        <h1 className="sr-only">Selected Work — Raju Jha</h1>
        <StrokeText
          text="Selected Work"
          strokeColor="#A78BFA"
          fillColor="#F8FAFC"
          strokeWidth={1.3}
          drawDuration={1.4}
          fillDelay={0.15}
          stagger={0.04}
          ease="power2.out"
          trigger="mount"
          fillMode="wipe"
          fontSize={88}
          fontWeight={800}
          letterSpacing={-3}
          className="max-w-full"
        />
        <div className="relative h-[88px] w-full max-w-3xl sm:h-[110px]">
          <WarpText
            text="Long format · Short format · Posters · Logos"
            color="#94a3b8"
            warpStrength={0.45}
            warpScale={2.2}
            speed={0.35}
            pointerInfluence={0.55}
            pointerStrength={0.4}
            fontSize="clamp(1.1rem, 2.4vw, 1.6rem)"
            fontWeight={600}
            className="h-full w-full"
          />
        </div>
      </Container>
    </section>
  );
}

export function WorkGallery() {
  return (
    <section
      aria-label="Archive wall"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <Container className="relative z-10 flex flex-col gap-3 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ShinyText
            text="Archive wall"
            speed={2.2}
            color="#94a3b8"
            shineColor="#ffffff"
            className="text-xs font-semibold uppercase tracking-[0.22em]"
          />
          <FoldText
            text="Frames from every lane"
            splitBy="word"
            hinge="top"
            trigger="scroll"
            duration={0.65}
            stagger={0.05}
            fontSize="clamp(1.75rem, 4vw, 2.75rem)"
            fontWeight={700}
            color="#F8FAFC"
            className="mt-3"
          />
        </div>
      </Container>
      <div className="relative h-[560px] sm:h-[640px]">
        <DriftWall
          items={archiveItems}
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

export function WorkCategoryNav() {
  return (
    <nav
      aria-label="Work categories"
      className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <Container className="flex gap-1 overflow-x-auto py-3">
        {workCategories.map((category) => (
          <Link
            key={category.id}
            href={`/work#${category.slug}`}
            className="shrink-0 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            {category.title}
          </Link>
        ))}
      </Container>
    </nav>
  );
}

function CategoryHeader({
  title,
  blurb,
}: {
  title: string;
  blurb: string;
}) {
  return (
    <div className="max-w-2xl">
      <FoldText
        text={title}
        splitBy="word"
        hinge="top"
        trigger="scroll"
        duration={0.65}
        stagger={0.05}
        fontSize="clamp(2rem, 5vw, 3.25rem)"
        fontWeight={700}
        color="#F8FAFC"
      />
      <p className="mt-4 text-base leading-7 text-muted">{blurb}</p>
    </div>
  );
}

function ProjectGrid({
  items,
}: {
  items: ReadonlyArray<{
    title: string;
    image: string;
    tags: readonly string[];
  }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <WorkCard
          key={item.title}
          title={item.title}
          image={item.image}
          tags={[...item.tags]}
        />
      ))}
    </div>
  );
}

function LongFormSection() {
  const category = workCategories[0];
  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border"
    >
      <div className="bg-background">
        <ScrollExpand
          src={category.items[0].image}
          alt={category.items[0].title}
          title={category.title}
          scrollHint="Scroll"
          useWindowScroll
          mediaZoom={1.35}
        >
          <h2 className="font-display text-3xl font-medium text-white sm:text-5xl">
            {category.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            {category.blurb}
          </p>
        </ScrollExpand>
      </div>
      <Container className="flex flex-col gap-10 py-16 sm:py-20">
        <CategoryHeader title="Selected long-format edits" blurb={category.blurb} />
        <ProjectGrid items={category.items} />
      </Container>
    </section>
  );
}

function ShortFormSection() {
  const category = workCategories[1];
  const morphItems: MorphItem[] = category.items.map((item) => ({
    image: item.image,
    caption: item.title,
  }));

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <CategoryHeader title={category.title} blurb={category.blurb} />
        <div className="relative h-[420px] w-full overflow-hidden border border-border sm:h-[500px]">
          <MorphSlider
            items={morphItems}
            transition="melt"
            intensity={0.55}
            aberration={0.35}
            drift={0.4}
            autoplay
            showCaptions
          />
        </div>
        <div className="mx-auto w-full max-w-md">
          <PixelTransition
            gridSize={8}
            pixelColor="#A78BFA"
            animationStepDuration={0.35}
            aspectRatio="125%"
            className="!w-full max-w-full overflow-hidden rounded-none border border-border"
            firstContent={
              <Image
                src={category.items[0].image}
                alt={category.items[0].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            }
            secondContent={
              <Image
                src={category.items[1].image}
                alt={category.items[1].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            }
          />
        </div>
        <ProjectGrid items={category.items} />
      </Container>
    </section>
  );
}

function PostersSection() {
  const category = workCategories[2];
  const posterImages = category.items.map((item) => item.image);
  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border"
    >
      <Container className="flex flex-col gap-10 py-16 sm:pb-10 sm:pt-20">
        <CategoryHeader title={category.title} blurb={category.blurb} />
        <div className="mx-auto w-full max-w-xl overflow-hidden border border-border">
          <PixelSwap
            firstContent={
              <div className="relative h-full w-full">
                <Image
                  src={category.items[0].image}
                  alt={category.items[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>
            }
            secondContent={
              <div className="relative h-full w-full">
                <Image
                  src={category.items[1].image}
                  alt={category.items[1].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>
            }
            pixelSize={48}
            gap={0}
            duration={1200}
            pattern="diagonal"
            trigger="hover"
            aspectRatio="75%"
            className="w-full"
          />
        </div>
      </Container>
      <div className="relative h-[520px] w-full overflow-hidden border-y border-border bg-background sm:h-[600px]">
        <FlyingPosters items={posterImages} />
      </div>
      <Container className="py-16 sm:py-20">
        <ProjectGrid items={category.items} />
      </Container>
    </section>
  );
}

function LogosSection() {
  const category = workCategories[3];
  const menuItems = category.items.map((item) => ({
    image: item.image,
    link: `/work#${category.slug}`,
    title: item.title,
    description: item.tags.join(" · "),
  }));

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border"
    >
      <Container className="flex flex-col gap-10 py-16 sm:pb-10 sm:pt-20">
        <CategoryHeader title={category.title} blurb={category.blurb} />
      </Container>
      <div className="relative h-[520px] w-full overflow-hidden border-y border-border bg-background sm:h-[600px]">
        <InfiniteMenu items={menuItems} />
      </div>
      <Container className="py-16 sm:py-20">
        <ProjectGrid items={category.items} />
      </Container>
    </section>
  );
}

export function WorkCategories() {
  return (
    <>
      <LongFormSection />
      <ShortFormSection />
      <PostersSection />
      <LogosSection />
    </>
  );
}
