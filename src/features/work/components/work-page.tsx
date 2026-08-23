"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import PixelTransition from "@/components/ui/PixelTransition";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { Container } from "@/components/ui";
import { workCategories } from "@/features/home/content";
import { useMediaQuery, useMounted } from "@/hooks";
import { WorkCard } from "./work-card";
import type { MorphItem } from "@/components/ui/MorphSlider";

const DriftWall = dynamic(() => import("@/components/ui/DriftWall"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-surface" />,
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
  loading: () => <div className="h-full w-full animate-pulse bg-surface" />,
});

const PixelSwap = dynamic(() => import("@/components/ui/PixelSwap"), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] w-full animate-pulse bg-surface" />,
});

const FlyingPosters = dynamic(() => import("@/components/ui/FlyingPosters"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-background" />,
});

const InfiniteMenu = dynamic(() => import("@/components/ui/InfiniteMenu"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-background" />,
});

const ScrollExpand = dynamic(() => import("@/components/ui/ScrollExpand"), {
  ssr: false,
  loading: () => <div className="h-[50vh] w-full animate-pulse bg-surface" />,
});

const archiveItems = workCategories.flatMap((category) =>
  category.items.map((item) => ({
    image: item.image,
    title: item.title,
    href: `/work#${category.slug}`,
  })),
);

function MobileImageStrip({
  items,
  label,
}: {
  items: ReadonlyArray<{ image: string; title: string }>;
  label: string;
}) {
  return (
    <div
      className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label={label}
    >
      {items.map((item) => (
        <figure
          key={item.title}
          className="relative aspect-[3/4] w-[72vw] max-w-[280px] shrink-0 snap-center overflow-hidden border border-border bg-surface sm:w-[240px]"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="280px"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-sm font-medium">
            {item.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function WorkHero() {
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const strokeSize = !mounted || !isDesktop ? 42 : 88;

  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-28">
      <Container className="relative z-10 flex flex-col gap-5 sm:gap-6">
        <ShinyText
          text="Portfolio archive"
          speed={2.2}
          color="#94a3b8"
          shineColor="#ffffff"
          className="text-xs font-semibold uppercase tracking-[0.22em]"
        />
        <h1 className="sr-only">Selected Work — Raju Jha</h1>
        <div className="w-full max-w-full overflow-hidden">
          <StrokeText
            text="Selected Work"
            strokeColor="#A78BFA"
            fillColor="#F8FAFC"
            strokeWidth={1.3}
            drawDuration={1.2}
            fillDelay={0.12}
            stagger={0.03}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={strokeSize}
            fontWeight={800}
            letterSpacing={-2}
            className="max-w-full"
          />
        </div>
        {mounted && isDesktop ? (
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
        ) : (
          <p className="max-w-2xl text-base leading-7 text-muted">
            Long format · Short format · Posters · Logos — every frame with a
            purpose.
          </p>
        )}
      </Container>
    </section>
  );
}

export function WorkGallery() {
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section
      aria-label="Archive wall"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <Container className="relative z-10 flex flex-col gap-3 py-8 sm:py-10">
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
          duration={0.55}
          stagger={0.04}
          fontSize="clamp(1.5rem, 4vw, 2.75rem)"
          fontWeight={700}
          color="#F8FAFC"
          className="mt-2"
        />
      </Container>
      {mounted && isDesktop ? (
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
            speed={36}
            direction="up"
            variance={0.45}
            parallax={0.5}
            lift={64}
            fade={0.6}
            dim={0.55}
            overlayColor="#060010"
          />
        </div>
      ) : (
        <div className="pb-8">
          <MobileImageStrip items={archiveItems} label="Work archive" />
        </div>
      )}
    </section>
  );
}

export function WorkCategoryNav() {
  return (
    <nav
      aria-label="Work categories"
      className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md"
    >
      <Container className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {workCategories.map((category) => (
          <Link
            key={category.id}
            href={`/work#${category.slug}`}
            className="shrink-0 rounded-full border border-transparent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-border hover:text-foreground active:text-foreground sm:text-xs sm:tracking-[0.16em]"
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
        duration={0.55}
        stagger={0.04}
        fontSize="clamp(1.75rem, 5vw, 3.25rem)"
        fontWeight={700}
        color="#F8FAFC"
      />
      <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{blurb}</p>
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
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border content-visibility-auto"
    >
      {mounted && isDesktop ? (
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
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border sm:aspect-[21/9]">
          <Image
            src={category.items[0].image}
            alt={category.items[0].title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <h2 className="font-display text-2xl font-medium text-white sm:text-4xl">
              {category.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              {category.blurb}
            </p>
          </div>
        </div>
      )}
      <Container className="flex flex-col gap-8 py-12 sm:gap-10 sm:py-20">
        <CategoryHeader title="Selected long-format edits" blurb={category.blurb} />
        <ProjectGrid items={category.items} />
      </Container>
    </section>
  );
}

function ShortFormSection() {
  const category = workCategories[1];
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const morphItems: MorphItem[] = category.items.map((item) => ({
    image: item.image,
    caption: item.title,
  }));

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border py-12 sm:py-20 content-visibility-auto"
    >
      <Container className="flex flex-col gap-8 sm:gap-10">
        <CategoryHeader title={category.title} blurb={category.blurb} />
        {mounted && isDesktop ? (
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
        ) : (
          <MobileImageStrip items={category.items} label="Short format stills" />
        )}
        <div className="mx-auto w-full max-w-md">
          <PixelTransition
            gridSize={mounted && isDesktop ? 8 : 6}
            pixelColor="#A78BFA"
            animationStepDuration={0.3}
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
          <p className="mt-2 text-center text-xs text-muted md:hidden">
            Tap to swap frames
          </p>
        </div>
        <ProjectGrid items={category.items} />
      </Container>
    </section>
  );
}

function PostersSection() {
  const category = workCategories[2];
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const posterImages = category.items.map((item) => item.image);

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border content-visibility-auto"
    >
      <Container className="flex flex-col gap-8 py-12 sm:gap-10 sm:pb-10 sm:pt-20">
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
            pixelSize={mounted && isDesktop ? 48 : 40}
            gap={0}
            duration={1000}
            pattern="diagonal"
            trigger={mounted && isDesktop ? "hover" : "click"}
            aspectRatio="75%"
            className="w-full"
          />
          <p className="border-t border-border px-3 py-2 text-center text-xs text-muted md:hidden">
            Tap to reveal the other poster
          </p>
        </div>
      </Container>
      {mounted && isDesktop ? (
        <div className="relative h-[520px] w-full overflow-hidden border-y border-border bg-background sm:h-[600px]">
          <FlyingPosters items={posterImages} />
        </div>
      ) : (
        <div className="border-y border-border py-6">
          <MobileImageStrip items={category.items} label="Poster gallery" />
        </div>
      )}
      <Container className="py-12 sm:py-20">
        <ProjectGrid items={category.items} />
      </Container>
    </section>
  );
}

function LogosSection() {
  const category = workCategories[3];
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const menuItems = category.items.map((item) => ({
    image: item.image,
    link: `/work#${category.slug}`,
    title: item.title,
    description: item.tags.join(" · "),
  }));

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border content-visibility-auto"
    >
      <Container className="flex flex-col gap-8 py-12 sm:gap-10 sm:pb-10 sm:pt-20">
        <CategoryHeader title={category.title} blurb={category.blurb} />
      </Container>
      {mounted && isDesktop ? (
        <div className="relative h-[520px] w-full overflow-hidden border-y border-border bg-background sm:h-[600px]">
          <InfiniteMenu items={menuItems} />
        </div>
      ) : (
        <div className="border-y border-border py-6">
          <MobileImageStrip items={category.items} label="Logo gallery" />
        </div>
      )}
      <Container className="py-12 sm:py-20">
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
