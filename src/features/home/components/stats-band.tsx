import { Container } from "@/components/ui";
import { stats } from "@/features/home/content";

export function StatsBand() {
  return (
    <section aria-label="Stats" className="border-b border-border py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <p className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                {stat.value}
              </p>
              <p className="text-sm leading-6 text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
