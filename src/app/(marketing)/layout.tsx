import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
