import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/config/env";
import type { Database } from "@/types/database";

function readServiceRoleKey() {
  // Literal access so Vercel/Next includes this server secret in the bundle
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
}

export function createServiceSupabaseClient() {
  const serviceKey = readServiceRoleKey();
  if (!isSupabaseConfigured || !serviceKey) {
    return null;
  }

  return createClient<Database>(env.supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function isAdminDbReady() {
  return Boolean(isSupabaseConfigured && readServiceRoleKey());
}
