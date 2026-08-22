"use client";

import Image from "next/image";
import { useState } from "react";

type WorkCardProps = {
  title: string;
  image: string;
  tags: readonly string[];
};

export function WorkCard({ title, image, tags }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative overflow-hidden border border-border bg-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            hovered ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent transition-opacity duration-500 ${
            hovered ? "opacity-90" : "opacity-60"
          }`}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-display text-lg font-medium text-foreground sm:text-xl">
          {title}
        </h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`pointer-events-none absolute inset-0 border-2 transition-colors duration-300 ${
          hovered ? "border-accent/70" : "border-transparent"
        }`}
      />
    </article>
  );
}
