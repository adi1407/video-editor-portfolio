"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import FoldText from "@/components/ui/FoldText";
import PixelTransition from "@/components/ui/PixelTransition";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import { useMounted } from "@/hooks";
import { WorkCard } from "./work-card";
import { WorkVideoModal } from "./work-video-modal";
import type { MorphItem } from "@/components/ui/MorphSlider";
import type { WorkCategoryView } from "@/types/portfolio";

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
  const strokeSize = 56;

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
            className="max-w-full [&_svg]:h-auto [&_svg]:max-w-full [&_svg]:w-full"
          />
        </div>
        {mounted ? (
          <div className="relative h-[72px] w-full max-w-3xl sm:h-[110px]">
            <WarpText
              text="Long format · Short format · Posters · Logos"
              color="#94a3b8"
              warpStrength={0.45}
              warpScale={2.2}
              speed={0.35}
              pointerInfluence={0.55}
              pointerStrength={0.4}
              fontSize="clamp(1rem, 3.5vw, 1.6rem)"
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
  const { workCategories } = usePortfolio();
  const archiveItems = useMemo(
    () =>
      workCategories.flatMap((category) =>
        category.items.map((item) => ({
          image: item.image,
          title: item.title,
          href: `/work#${category.slug}`,
        })),
      ),
    [workCategories],
  );

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
      {mounted ? (
        <div className="relative h-[420px] sm:h-[560px] lg:h-[640px]">
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
  const { workCategories } = usePortfolio();
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
  onPlay,
}: {
  items: WorkCategoryView["items"];
  onPlay?: (payload: { title: string; videoUrl: string }) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <WorkCard
          key={item.id}
          title={item.title}
          image={item.image}
          tags={[...item.tags]}
          videoUrl={item.videoUrl}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
}

function LongFormSection({
  category,
  onPlay,
}: {
  category: WorkCategoryView;
  onPlay: (payload: { title: string; videoUrl: string }) => void;
}) {
  const mounted = useMounted();
  const lead = category.items[0];

  if (!lead) {
    return (
      <section id={category.slug} className="scroll-mt-24 border-b border-border py-16">
        <Container>
          <CategoryHeader title={category.title} blurb={category.blurb} />
          <p className="mt-6 text-sm text-muted">No projects yet.</p>
        </Container>
      </section>
    );
  }

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border content-visibility-auto"
    >
      {mounted ? (
        <div className="bg-background">
          <ScrollExpand
            src={lead.image}
            alt={lead.title}
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
            src={lead.image}
            alt={lead.title}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized={lead.image.startsWith("http")}
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
        <ProjectGrid items={category.items} onPlay={onPlay} />
      </Container>
    </section>
  );
}

function ShortFormSection({
  category,
  onPlay,
}: {
  category: WorkCategoryView;
  onPlay: (payload: { title: string; videoUrl: string }) => void;
}) {
  const mounted = useMounted();
  const morphItems: MorphItem[] = category.items.map((item) => ({
    image: item.image,
    caption: item.title,
  }));
  const first = category.items[0];
  const second = category.items[1] ?? category.items[0];

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border py-12 sm:py-20 content-visibility-auto"
    >
      <Container className="flex flex-col gap-8 sm:gap-10">
        <CategoryHeader title={category.title} blurb={category.blurb} />
        {mounted && morphItems.length ? (
          <div className="relative h-[320px] w-full overflow-hidden border border-border sm:h-[420px] md:h-[500px]">
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
        {first && second ? (
          <div className="mx-auto w-full max-w-md">
            <PixelTransition
              gridSize={8}
              pixelColor="#A78BFA"
              animationStepDuration={0.3}
              aspectRatio="125%"
              className="!w-full max-w-full overflow-hidden rounded-none border border-border"
              firstContent={
                <Image
                  src={first.image}
                  alt={first.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                  unoptimized={first.image.startsWith("http")}
                />
              }
              secondContent={
                <Image
                  src={second.image}
                  alt={second.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                  unoptimized={second.image.startsWith("http")}
                />
              }
            />
            <p className="mt-2 text-center text-xs text-muted">
              Tap or hover to swap frames
            </p>
          </div>
        ) : null}
        <ProjectGrid items={category.items} onPlay={onPlay} />
      </Container>
    </section>
  );
}

function PostersSection({ category }: { category: WorkCategoryView }) {
  const mounted = useMounted();
  const posterImages = category.items.map((item) => item.image);
  const first = category.items[0];
  const second = category.items[1] ?? category.items[0];

  return (
    <section
      id={category.slug}
      className="scroll-mt-24 border-b border-border content-visibility-auto"
    >
      <Container className="flex flex-col gap-8 py-12 sm:gap-10 sm:pb-10 sm:pt-20">
        <CategoryHeader title={category.title} blurb={category.blurb} />
        {first && second ? (
          <div className="mx-auto w-full max-w-xl overflow-hidden border border-border">
            <PixelSwap
              firstContent={
                <div className="relative h-full w-full">
                  <Image
                    src={first.image}
                    alt={first.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 560px"
                    unoptimized={first.image.startsWith("http")}
                  />
                </div>
              }
              secondContent={
                <div className="relative h-full w-full">
                  <Image
                    src={second.image}
                    alt={second.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 560px"
                    unoptimized={second.image.startsWith("http")}
                  />
                </div>
              }
              pixelSize={48}
              gap={0}
              duration={1000}
              pattern="diagonal"
              trigger="click"
              aspectRatio="75%"
              className="w-full"
            />
            <p className="border-t border-border px-3 py-2 text-center text-xs text-muted">
              Tap to reveal the other poster
            </p>
          </div>
        ) : null}
      </Container>
      {mounted && posterImages.length ? (
        <div className="relative h-[380px] w-full overflow-hidden border-y border-border bg-background sm:h-[520px] md:h-[600px]">
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

function LogosSection({ category }: { category: WorkCategoryView }) {
  const mounted = useMounted();
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
      {mounted && menuItems.length ? (
        <div className="relative h-[380px] w-full overflow-hidden border-y border-border bg-background sm:h-[520px] md:h-[600px]">
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
  const { workCategories } = usePortfolio();
  const [playing, setPlaying] = useState<{ title: string; videoUrl: string } | null>(
    null,
  );

  const longForm = workCategories.find((c) => c.slug === "long-form");
  const shortForm = workCategories.find((c) => c.slug === "short-form");
  const posters = workCategories.find((c) => c.slug === "posters");
  const logos = workCategories.find((c) => c.slug === "logos");

  return (
    <>
      {longForm ? <LongFormSection category={longForm} onPlay={setPlaying} /> : null}
      {shortForm ? <ShortFormSection category={shortForm} onPlay={setPlaying} /> : null}
      {posters ? <PostersSection category={posters} /> : null}
      {logos ? <LogosSection category={logos} /> : null}
      {playing ? (
        <WorkVideoModal
          title={playing.title}
          videoUrl={playing.videoUrl}
          onClose={() => setPlaying(null)}
        />
      ) : null}
    </>
  );
}
