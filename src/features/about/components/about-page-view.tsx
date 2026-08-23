"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FoldText from "@/components/ui/FoldText";
import MagicBento from "@/components/ui/MagicBento";
import ProfileCard from "@/components/ui/ProfileCard";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { buttonClassName, Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden border border-border bg-surface">
      <Image
        src="/lanyard/raju.jpeg"
        alt="Portrait"
        fill
        className="object-cover"
        sizes="400px"
      />
    </div>
  ),
});

export function AboutPageView() {
  const router = useRouter();
  const { profile, services, stats, toolkit } = usePortfolio();
  const cards = services.map((service) => ({
    color: "#060010",
    label: service.label,
    title: service.title,
    description: service.description,
  }));

  return (
    <>
      <section className="border-b border-border py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col gap-5">
            <ShinyText
              text={profile.role}
              speed={2.2}
              color="#94a3b8"
              shineColor="#ffffff"
              className="text-xs font-semibold uppercase tracking-[0.18em]"
            />
            <h1 className="sr-only">{profile.name}</h1>
            <StrokeText
              text="Raju Jha"
              strokeColor="#A78BFA"
              fillColor="#F8FAFC"
              strokeWidth={1.3}
              drawDuration={1.4}
              fillDelay={0.15}
              stagger={0.05}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={96}
              fontWeight={800}
              letterSpacing={-3}
              className="max-w-full"
            />
            <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">
              {profile.profileBlurb}
            </p>
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
          </div>
          <div className="relative mx-auto h-[min(70svh,520px)] w-full max-w-md lg:max-w-none">
            <Lanyard
              className="h-full w-full"
              position={[0, 0, 24]}
              gravity={[0, -26, 0]}
              fov={18}
              frontImage="/lanyard/raju.jpeg"
              backImage="/lanyard/raju.jpeg"
              imageFit="cover"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FoldText
            text={profile.aboutHeadline}
            splitBy="word"
            hinge="bottom"
            trigger="scroll"
            duration={0.7}
            stagger={0.04}
            fontSize="clamp(1.75rem, 4vw, 2.75rem)"
            fontWeight={600}
            color="#F8FAFC"
          />
          <div className="mt-6 flex flex-col gap-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {profile.aboutBody.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="mx-auto w-full max-w-sm">
            <ProfileCard
              avatarUrl="/lanyard/raju.jpeg"
              miniAvatarUrl="/lanyard/raju.jpeg"
              iconUrl="/assets/demo/iconpattern.png"
              name={profile.name}
              title={profile.shortRole}
              handle="raju"
              status="Available"
              contactText="Contact"
              showUserInfo
              enableTilt
              onContactClick={() => router.push(profile.ctas.contact.href)}
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              What I do
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              Four lanes of craft
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              Long format videos, short format, posters, and logos — the formats I
              shape every week.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-10">
          <MagicBento
            cards={cards}
            textAutoHide
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={280}
            particleCount={10}
            glowColor="132, 0, 255"
          />
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <p className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
                  {stat.value}
                </p>
                <p className="text-sm leading-6 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Video & Motion
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-base text-foreground/90">
              {toolkit.videoMotion.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Design
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-base text-foreground/90">
              {toolkit.design.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
