"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import BlurText from "@/components/ui/BlurText";
import FoldText from "@/components/ui/FoldText";
import LogoLoop from "@/components/ui/LogoLoop";
import ParticleText from "@/components/ui/ParticleText";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import TextLoop from "@/components/ui/TextLoop";
import { buttonClassName, Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";

const Ribbons = dynamic(() => import("@/components/ui/Ribbons"), {
  ssr: false,
  loading: () => null,
});

const WarpText = dynamic(() => import("@/components/ui/WarpText"), {
  ssr: false,
  loading: () => (
    <p className="text-base text-muted">The timeline behind every frame.</p>
  ),
});

export function ExperiencePageView() {
  const { experience, profile, toolkit } = usePortfolio();
  const toolLogos = [...toolkit.videoMotion, ...toolkit.design].map((title) => ({
    node: (
      <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-foreground/90 sm:text-base">
        {title}
      </span>
    ),
    title,
  }));
  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <Ribbons
            baseThickness={24}
            colors={["#A855F7", "#5227FF"]}
            speedMultiplier={0.4}
            maxAge={450}
            enableFade
            enableShaderEffect
          />
        </div>
        <Container className="relative z-10 flex flex-col gap-5">
          <ShinyText
            text="Career path"
            speed={2.2}
            color="#94a3b8"
            shineColor="#ffffff"
            className="text-xs font-semibold uppercase tracking-[0.22em]"
          />
          <h1 className="sr-only">Experience — Raju Jha</h1>
          <StrokeText
            text="Experience"
            strokeColor="#A78BFA"
            fillColor="#F8FAFC"
            strokeWidth={1.3}
            drawDuration={1.4}
            fillDelay={0.15}
            stagger={0.04}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={96}
            fontWeight={800}
            letterSpacing={-3}
            className="max-w-full"
          />
          <div className="relative h-[72px] w-full max-w-2xl sm:h-[90px]">
            <WarpText
              text="Professional craft · Freelance hustle · Every frame"
              color="#94a3b8"
              warpStrength={0.4}
              warpScale={2}
              speed={0.3}
              pointerInfluence={0.5}
              fontSize="clamp(1rem, 2.2vw, 1.35rem)"
              fontWeight={600}
              className="h-full w-full"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-12 sm:py-16">
        <Container className="flex justify-center">
          <BlurText
            text="Built across long format, short format, posters, and logos."
            delay={80}
            animateBy="words"
            direction="top"
            className="max-w-3xl text-center font-display text-2xl font-medium text-foreground sm:text-3xl"
          />
        </Container>
      </section>

      <section
        aria-label="Purpose"
        className="relative h-[280px] w-full overflow-hidden border-b border-border bg-[#09090f] sm:h-[320px]"
      >
        <ParticleText
          text="PURPOSE"
          particleSize={2}
          density={5}
          color="#ffffff"
          highlightColor="#8b5cf6"
          scatter={160}
          gatherDuration={1500}
          stagger={380}
          pointerRepel={36}
          repelRadius={110}
          idleDrift={0.65}
          trigger="hover"
          fontSize="clamp(3rem, 12vw, 7rem)"
          fontWeight={800}
          fontFamily="inherit"
          glow
        />
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="flex flex-col gap-14">
          {experience.map((job, index) => (
            <article
              key={job.company}
              className="grid gap-6 border-t border-border pt-10 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  0{index + 1}
                </p>
                <FoldText
                  text={job.company}
                  splitBy="word"
                  hinge="bottom"
                  trigger="scroll"
                  duration={0.55}
                  stagger={0.04}
                  fontSize="clamp(1.5rem, 3vw, 2rem)"
                  fontWeight={600}
                  color="#F8FAFC"
                  className="mt-3"
                />
                <p className="mt-2 text-sm font-semibold text-foreground">{job.role}</p>
                <p className="mt-1 text-sm text-muted">{job.period}</p>
              </div>
              <div>
                <p className="text-base leading-7 text-muted">{job.summary}</p>
                <ul className="mt-6 flex flex-col gap-2.5 text-sm leading-6 text-foreground/90">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section
        aria-label="Tagline marquee"
        className="overflow-hidden border-b border-border py-6 sm:py-10"
      >
        <TextLoop
          text="EVERY FRAME HAS A PURPOSE"
          shape="wave"
          speed={90}
          direction="forward"
          separator="✦"
          curviness={90}
          fontSize={36}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#5227FF"
          ribbonWidth={80}
          pauseOnHover
        />
      </section>

      <section
        aria-label="Creative toolkit"
        className="border-b border-border bg-surface py-10 sm:py-12"
      >
        <Container className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Creative toolkit
          </p>
          <p className="mt-2 text-sm text-muted">
            Video & motion · Design — the tools behind every frame.
          </p>
        </Container>
        <div className="relative h-[72px] overflow-hidden sm:h-[88px]">
          <LogoLoop
            logos={toolLogos}
            speed={90}
            direction="left"
            logoHeight={28}
            gap={56}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#05070c"
            ariaLabel="Creative toolkit"
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              See the work this experience built
            </h2>
            <p className="mt-3 text-muted">
              Explore long format, short format, posters, and logos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={profile.ctas.work.href} className={buttonClassName({ size: "lg" })}>
              {profile.ctas.work.label}
            </Link>
            <Link
              href={profile.ctas.contact.href}
              className={buttonClassName({ size: "lg", variant: "outline" })}
            >
              {profile.ctas.contact.label}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
