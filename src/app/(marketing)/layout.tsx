import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout";
import { PortfolioProvider } from "@/features/portfolio/portfolio-context";
import { getPortfolio } from "@/lib/portfolio/get-portfolio";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const portfolio = await getPortfolio();

  return (
    <PortfolioProvider value={portfolio}>
      <SiteShell>{children}</SiteShell>
    </PortfolioProvider>
  );
}
