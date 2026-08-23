"use client";

import PixelTransition from "@/components/ui/PixelTransition";
import { Container } from "@/components/ui";

export function PixelTransitionBand() {
  return (
    <section
      aria-label="Pixel transition"
      className="border-y border-border bg-background py-16 sm:py-20"
    >
      <Container className="flex justify-center">
        <PixelTransition
          firstContent={
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
              alt="default pixel transition content, a cat!"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          }
          secondContent={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#111",
              }}
            >
              <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>
                Meow!
              </p>
            </div>
          }
          gridSize={12}
          pixelColor="#ffffff"
          once={false}
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
      </Container>
    </section>
  );
}
