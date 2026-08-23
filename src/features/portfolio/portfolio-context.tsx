"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getFallbackPortfolio } from "@/lib/portfolio/defaults";
import type { PortfolioContent } from "@/types/portfolio";

const PortfolioContext = createContext<PortfolioContent>(getFallbackPortfolio());

export function PortfolioProvider({
  value,
  children,
}: {
  value: PortfolioContent;
  children: ReactNode;
}) {
  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
