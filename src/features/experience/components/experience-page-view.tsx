"use client";

import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import Ribbons from "@/components/ui/Ribbons";
import ShinyText from "@/components/ui/ShinyText";
import { buttonClassName, Container } from "@/components/ui";
import { experience, profile, toolkit } from "@/features/home/content";

export function ExperiencePageView() {
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
          <FoldText
            text="Experience"
            splitBy="char"
            hinge="top"
            trigger="mount"
            duration={0.7}
            stagger={0.04}
            fontSize="clamp(3rem, 10vw, 6rem)"
            fontWeight={800}
            color="#F8FAFC"
          />
          <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Professional work at IUI Solutions and a year of freelance craft — the
            timeline behind every frame.
          </p>
        </Container>
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
                <h2 className="mt-3 font-display text-2xl font-medium sm:text-3xl">
                  {job.company}
                </h2>
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

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Video & Motion toolkit
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-base text-foreground/90">
              {toolkit.videoMotion.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Design toolkit
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-base text-foreground/90">
              {toolkit.design.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              See the work this experience built
            </h2>
            <p className="mt-3 text-muted">
              Explore categories across video, short-form, motion, and design.
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
