"use client";

import { useAuth } from "@/features/auth";

export function useDashboard() {
  const { user, loading, configured } = useAuth();

  return {
    user,
    loading,
    configured,
    greeting: user?.email ? `Welcome, ${user.email}` : "Welcome to your workspace",
  };
}
