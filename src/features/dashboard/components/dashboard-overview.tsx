"use client";

import Link from "next/link";
import { EmptyState } from "@/components/shared";
import { buttonClassName, Card, CardDescription, CardHeader, CardTitle, Container } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { useDashboard } from "../hooks/use-dashboard";

export function DashboardOverview() {
  const { greeting, configured, loading } = useDashboard();

  return (
    <Container size="md" className="flex flex-col gap-8 py-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{greeting}</h1>
        <p className="mt-2 text-sm text-muted">
          Feature UI lives here. Shared cards and empty states come from components/.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
            <CardDescription>
              {loading
                ? "Checking auth state…"
                : configured
                  ? "Supabase is connected. Auth session will appear here."
                  : "Supabase keys are not set yet. The UI still works."}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next feature</CardTitle>
            <CardDescription>
              Add a new folder under features/ and compose it from a thin page in app/.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <EmptyState
        title="Nothing to show yet"
        description="This empty state is a shared component. Features reuse it whenever a list or feed is empty."
        action={
          <Link href={ROUTES.home} className={buttonClassName({ variant: "outline" })}>
            Back to home
          </Link>
        }
      />
    </Container>
  );
}
