"use client";

import Link from "next/link";
import { buttonClassName, Container } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";

export function ExperienceBand() {
  const { experience, profile } = usePortfolio();
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-y border-border py-20 sm:py-24"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Experience
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Professional & freelance
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              8+ months professional and 1+ year freelance — a snapshot of the path.
            </p>
          </div>
          <Link
            href={profile.ctas.experience.href}
            className={buttonClassName({ variant: "outline" })}
          >
            Full timeline
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {experience.map((job) => (
            <article
              key={job.company}
              className="flex flex-col gap-3 border border-border bg-surface/40 p-6"
            >
              <h3 className="font-display text-xl font-medium">{job.company}</h3>
              <p className="text-sm font-semibold text-accent">{job.role}</p>
              <p className="text-sm text-muted">{job.period}</p>
              <p className="text-sm leading-6 text-muted">{job.summary}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
