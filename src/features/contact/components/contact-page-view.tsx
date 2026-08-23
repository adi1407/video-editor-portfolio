"use client";

import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ShinyText from "@/components/ui/ShinyText";
import StrokeText from "@/components/ui/StrokeText";
import { buttonClassName, Container, Input } from "@/components/ui";
import { usePortfolio } from "@/features/portfolio/portfolio-context";

const Orb = dynamic(() => import("@/components/ui/Orb"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
});

export function ContactPageView() {
  const { contact, profile } = usePortfolio();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry from ${name.trim() || "portfolio visitor"}`,
    );
    const body = encodeURIComponent(
      [`Name: ${name.trim()}`, `Email: ${email.trim()}`, "", message.trim()].join(
        "\n",
      ),
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          aria-hidden
        >
          <Orb
            hue={270}
            hoverIntensity={0.35}
            rotateOnHover
            forceHoverState={false}
          />
        </div>
        <Container className="relative z-10 flex flex-col gap-5">
          <ShinyText
            text={contact.eyebrow}
            speed={2.2}
            color="#94a3b8"
            shineColor="#ffffff"
            className="text-xs font-semibold uppercase tracking-[0.22em]"
          />
          <h1 className="sr-only">{contact.headline}</h1>
          <StrokeText
            text="Contact"
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
          <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {contact.body}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-none border border-border bg-surface/40 p-6 sm:p-8"
          >
            <Input
              name="name"
              label={contact.form.nameLabel}
              placeholder={contact.form.namePlaceholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
            <Input
              name="email"
              type="email"
              label={contact.form.emailLabel}
              placeholder={contact.form.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                {contact.form.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder={contact.form.messagePlaceholder}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-3 text-sm text-foreground shadow-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </div>
            <button type="submit" className={buttonClassName({ size: "lg" })}>
              {contact.form.submitLabel}
            </button>
            <p className="text-sm text-muted">
              Or email directly:{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-foreground underline-offset-4 hover:underline"
              >
                {contact.email}
              </a>
            </p>
          </form>

          <div className="flex flex-col justify-center gap-6">
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              Prefer to browse first?
            </h2>
            <p className="max-w-md text-base leading-7 text-muted">
              See recent work or learn more about {profile.name} before you reach
              out.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={profile.ctas.work.href}
                className={buttonClassName({ size: "lg", variant: "outline" })}
              >
                {profile.ctas.work.label}
              </Link>
              <Link
                href={profile.ctas.about.href}
                className={buttonClassName({ size: "lg", variant: "outline" })}
              >
                {profile.ctas.about.label}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
