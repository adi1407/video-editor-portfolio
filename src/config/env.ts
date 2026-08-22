function readEnv(key: string) {
  return process.env[key]?.trim() ?? "";
}

function resolveSiteUrl() {
  const explicit = readEnv("NEXT_PUBLIC_SITE_URL");
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = readEnv("VERCEL_URL");
  if (vercel) {
    return `https://${vercel.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}

export const env = {
  supabaseUrl: readEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
  siteUrl: resolveSiteUrl(),
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey,
);
