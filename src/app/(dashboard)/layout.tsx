import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/lib/constants";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <Link href={ROUTES.dashboard} className="text-sm font-semibold">
            {siteConfig.name}
          </Link>
          <Link href={ROUTES.home} className="text-sm text-muted hover:text-foreground">
            Back to site
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
