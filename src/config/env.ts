function trimEnv(value: string | undefined) {
  return value?.trim() ?? "";
}

function resolveSiteUrl() {
  // Direct process.env.* access — Next.js only inlines these when written literally
  const explicit = trimEnv(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = trimEnv(process.env.VERCEL_URL);
  if (vercel) {
    return `https://${vercel.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}

export const env = {
  supabaseUrl: trimEnv(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  supabaseServiceRoleKey: trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
  siteUrl: resolveSiteUrl(),
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey,
);
