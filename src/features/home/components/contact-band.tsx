"use client";

import Link from "next/link";
import ShinyText from "@/components/ui/ShinyText";
import { buttonClassName, Container } from "@/components/ui";
import { profile } from "@/features/home/content";

export function ContactBand() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-20">
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]">
            <ShinyText
              text="Let's create something"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="uppercase tracking-[0.22em]"
            />
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-balance sm:text-4xl">
            Have an idea, a reel, or a brand that needs sharper visuals?
          </h2>
          <p className="mt-3 text-muted">
            Share the brief, references, and deadline — {profile.name} will reply
            with availability.
          </p>
        </div>
        <Link
          href="mailto:hello@example.com"
          className={buttonClassName({ size: "lg" })}
        >
          {profile.ctas.contact.label}
        </Link>
      </Container>
    </section>
  );
}
