import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/config/env";
import type { Database } from "@/types/database";

export function createServiceSupabaseClient() {
  const url = getSupabaseUrl();
  const serviceKey = getSupabaseServiceRoleKey();
  if (!isSupabaseConfigured() || !url || !serviceKey) {
    return null;
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function isAdminDbReady() {
  return Boolean(isSupabaseConfigured() && getSupabaseServiceRoleKey());
}
