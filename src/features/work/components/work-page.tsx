"use client";

import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { Container } from "@/components/ui";
import { workCategories } from "@/features/home/content";
import { WorkCard } from "./work-card";

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
        <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Four lanes of craft — video projects, short-form, motion graphics, and
          posters & designs. Every frame with a purpose.
        </p>
      </Container>
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

export function WorkCategories() {
  return (
    <>
      {workCategories.map((category) => (
        <section
          key={category.id}
          id={category.slug}
          className="scroll-mt-24 border-b border-border py-16 sm:py-20"
        >
          <Container className="flex flex-col gap-10">
            <div className="max-w-2xl">
              <FoldText
                text={category.title}
                splitBy="word"
                hinge="top"
                trigger="scroll"
                duration={0.65}
                stagger={0.05}
                fontSize="clamp(2rem, 5vw, 3.25rem)"
                fontWeight={700}
                color="#F8FAFC"
              />
              <p className="mt-4 text-base leading-7 text-muted">{category.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <WorkCard
                  key={item.title}
                  title={item.title}
                  image={item.image}
                  tags={item.tags}
                />
              ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
