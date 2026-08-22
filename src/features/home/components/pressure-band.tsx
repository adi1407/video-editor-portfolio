"use client";

import TextPressure from "@/components/ui/TextPressure";
import { Container } from "@/components/ui";

export function PressureBand() {
  return (
    <section
      aria-label="Purpose"
      className="border-b border-border bg-background py-10 sm:py-14"
    >
      <Container>
        <div className="mx-auto h-[160px] w-full max-w-4xl sm:h-[220px]">
          <TextPressure
            text="PURPOSE"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#F8FAFC"
            strokeColor="#A78BFA"
            minFontSize={36}
          />
        </div>
      </Container>
    </section>
  );
}
