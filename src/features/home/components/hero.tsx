"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import LightTunnel from "@/components/ui/LightTunnel";
import RotatingText from "@/components/ui/RotatingText";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { buttonClassName, Container } from "@/components/ui";
import { profile } from "@/features/home/content";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center text-sm text-muted">
      Loading badge…
    </div>
  ),
});

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
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
            centerX={0.35}
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-background/20" />
      </div>

      <Container className="relative z-10 grid min-h-[100svh] items-center gap-10 py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6 lg:py-28">
        <div className="flex flex-col gap-6">
          <ShinyText
            text={profile.role}
            speed={2.4}
            color="#94a3b8"
            shineColor="#ffffff"
            className="text-xs font-semibold uppercase tracking-[0.18em]"
          />

          <div className="w-full max-w-3xl">
            <h1 className="sr-only">
              {profile.tagline} {profile.heroIntro}
            </h1>
            <StrokeText
              text="EVERY FRAME"
              strokeColor="#A78BFA"
              fillColor="#F8FAFC"
              strokeWidth={1.35}
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
            <div className="-mt-1 sm:-mt-2">
              <FoldText
                text="HAS A PURPOSE."
                trigger="mount"
                splitBy="word"
                hinge="bottom"
                duration={0.85}
                stagger={0.06}
                fontSize="clamp(2rem, 6vw, 4.5rem)"
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
        </div>

        <div className="relative h-[min(70svh,560px)] w-full lg:h-[min(80svh,680px)]">
          <Lanyard
            className="h-full w-full"
            position={[0, 0, 22]}
            gravity={[0, -28, 0]}
            fov={18}
            frontImage="/lanyard/raju.jpeg"
            backImage="/lanyard/raju.jpeg"
            imageFit="cover"
            lanyardWidth={1.05}
          />
        </div>
      </Container>
    </section>
  );
}
