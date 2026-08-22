"use client";

import Link from "next/link";
import TextLoop from "@/components/ui/TextLoop";
import { buttonClassName, Container } from "@/components/ui";
import { profile } from "@/features/home/content";

export function WorkClosing() {
  return (
    <>
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
          fontSize={40}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#5227FF"
          ribbonWidth={86}
          pauseOnHover
        />
      </section>
      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              Ready to shape the next frame?
            </h2>
            <p className="mt-3 text-muted">
              Share a brief — let&apos;s build something people remember.
            </p>
          </div>
          <Link href={profile.ctas.contact.href} className={buttonClassName({ size: "lg" })}>
            {profile.ctas.contact.label}
          </Link>
        </Container>
      </section>
    </>
  );
}
