import { createBrowserClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/config/env";
import type { Database } from "@/types/database";

export function createBrowserSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  return createBrowserClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
}
