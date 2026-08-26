import { createClient } from "@supabase/supabase-js";
import {
  getMissingSupabaseEnvNames,
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

export function adminDbNotReadyMessage() {
  const missing = getMissingSupabaseEnvNames();
  if (!missing.length) {
    return "Could not create Supabase admin client.";
  }
  return `Missing env on this server: ${missing.join(", ")}. Add them in Vercel → Settings → Environment Variables (Production + Preview), then Redeploy. Locally put them in .env.local and restart npm run dev. Check /api/health.`;
}
