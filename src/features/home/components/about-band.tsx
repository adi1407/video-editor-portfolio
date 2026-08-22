"use client";

import Link from "next/link";
import FoldText from "@/components/ui/FoldText";
import ShinyText from "@/components/ui/ShinyText";
import { buttonClassName, Container } from "@/components/ui";
import { profile } from "@/features/home/content";

export function AboutBand() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24">
      <Container className="flex max-w-3xl flex-col gap-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em]">
          <ShinyText
            text="About Raju"
            speed={2.2}
            color="#94a3b8"
            shineColor="#ffffff"
            className="uppercase tracking-[0.22em]"
          />
        </p>
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
        <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {profile.aboutBody[0]}
        </p>
        <Link href={profile.ctas.about.href} className={buttonClassName({ variant: "outline" })}>
          Read the full story
        </Link>
      </Container>
    </section>
  );
}
