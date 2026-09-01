"use client";

import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import LightTunnel from "@/components/ui/LightTunnel";
import RotatingText from "@/components/ui/RotatingText";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { buttonClassName, Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import { useHeavyEffects } from "@/hooks";

export function Hero() {
  const { profile } = usePortfolio();
  const { enableHeavyEffects, mounted } = useHeavyEffects();
  const strokeSize = 64;

  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {mounted && enableHeavyEffects ? (
          <div className="h-full w-full opacity-90">
            <LightTunnel
              cableColor="#A855F7"
              pulseColor="#A855F7"
              tunnelColor="#5227FF"
              tunnelOpacity={0}
              speed={0.1}
              flowDirection="outward"
              pulseSpeed={2}
              pulseLength={0.28}
              pulseBlend={1}
              pulseWidth={1}
              cableCount={20}
              thickness={0.35}
              rimWidth={0.15}
              waviness={0.3}
              sway={0.5}
              size={1.0}
              centerX={0.5}
              centerY={0.0}
              glow={1.0}
              fadeNear={0.5}
              fadeFar={2}
              brightness={1.0}
              colorVariance
              grain
              grainIntensity={0.05}
              opacity={1.0}
              mouseInteraction={false}
              mouseStrength={0.1}
            />
          </div>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(168,85,247,0.35),transparent_70%),linear-gradient(180deg,#0a0f18_0%,#05070c_100%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/85" />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center gap-5 py-20 sm:gap-6 sm:py-24 lg:py-28">
        <ShinyText
          text={profile.role}
          speed={2.4}
          color="#94a3b8"
          shineColor="#ffffff"
          className="text-xs font-semibold uppercase tracking-[0.18em]"
        />

        <div className="w-full max-w-3xl overflow-hidden">
          <h1 className="sr-only">
            {profile.tagline} {profile.heroIntro}
          </h1>
          <StrokeText
            text="EVERY FRAME"
            strokeColor="#A78BFA"
            fillColor="#F8FAFC"
            strokeWidth={1.35}
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
          <div className="-mt-1 sm:-mt-2">
            <FoldText
              text="HAS A PURPOSE."
              trigger="mount"
              splitBy="word"
              hinge="bottom"
              duration={0.85}
              stagger={0.06}
              fontSize="clamp(1.75rem, 6vw, 4.5rem)"
              fontWeight={800}
              color="#F8FAFC"
            />
          </div>

          <p className="mt-5 max-w-xl text-base font-medium leading-7 text-foreground sm:text-lg">
            {profile.heroIntro}
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted sm:leading-8">
            {profile.heroBody}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-lg font-semibold tracking-tight sm:text-xl">
            <span className="text-foreground/90">Built for</span>
            <RotatingText
              texts={[
                "Long-form",
                "Short-form",
                "Motion",
                "Posters",
                "Brands",
              ]}
              mainClassName="px-2 sm:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2200}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={profile.ctas.work.href}
            className={buttonClassName({ size: "lg" })}
          >
            {profile.ctas.work.label}
          </Link>
          <Link
            href={profile.ctas.contact.href}
            className={buttonClassName({ size: "lg", variant: "outline" })}
          >
            {profile.ctas.contact.label}
          </Link>
        </div>

        <p className="text-sm text-muted">{profile.scrollHint}</p>
      </Container>
    </section>
  );
}
