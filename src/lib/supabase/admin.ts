import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/config/env";
import type { Database } from "@/types/database";

export function createServiceSupabaseClient() {
  if (!isSupabaseConfigured || !env.supabaseServiceRoleKey) {
    return null;
  }

  return createClient<Database>(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const isAdminDbReady = Boolean(
  isSupabaseConfigured && env.supabaseServiceRoleKey,
);
