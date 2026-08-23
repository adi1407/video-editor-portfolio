"use client";

import BlurText from "@/components/ui/BlurText";
import { Container } from "@/components/ui";

export function BlurTextBand() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <section
      aria-label="Blur text"
      className="border-y border-border bg-background py-16 sm:py-20"
    >
      <Container className="flex justify-center">
        <BlurText
          text="Isn't this so cool?!"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="mb-8 text-center text-2xl font-semibold text-foreground sm:text-3xl"
        />
      </Container>
    </section>
  );
}
