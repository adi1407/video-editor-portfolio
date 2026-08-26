"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/config/env";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { AuthUser } from "../types";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const syncUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(
        data.user
          ? { id: data.user.id, email: data.user.email }
          : null,
      );
      setLoading(false);
    };

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email }
          : null,
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, configured: isSupabaseConfigured() };
}
