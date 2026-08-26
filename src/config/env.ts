function trimEnv(value: string | undefined | null) {
  return value?.trim() ?? "";
}

/**
 * Read an env var without Next build-time inlining of empty NEXT_PUBLIC_* values.
 * Static `process.env.NEXT_PUBLIC_FOO` is replaced at build — if missing then, it
 * stays "" forever even when Vercel has the var at runtime. Dynamic access +
 * non-public aliases fix admin/server on Vercel after env is added.
 */
function readEnv(...names: string[]) {
  for (const name of names) {
    const value = trimEnv(process.env[name]);
    if (value) return value;
  }
  return "";
}

export function getSupabaseUrl() {
  // Prefer runtime (non-inlined) names first — this is why service role already works
  return readEnv(
    "SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
  );
}

export function getSupabaseAnonKey() {
  return readEnv(
    "SUPABASE_ANON_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  );
}

export function getSupabaseServiceRoleKey() {
  return readEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_KEY",
  );
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

/** Live getters — never cache at module load. */
export const env = {
  get supabaseUrl() {
    return getSupabaseUrl();
  },
  get supabaseAnonKey() {
    return getSupabaseAnonKey();
  },
  get supabaseServiceRoleKey() {
    return getSupabaseServiceRoleKey();
  },
  get siteUrl() {
    return resolveSiteUrl();
  },
};

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export function getSupabaseEnvFlags() {
  return {
    hasUrl: Boolean(getSupabaseUrl()),
    hasAnon: Boolean(getSupabaseAnonKey()),
    hasServiceRole: Boolean(getSupabaseServiceRoleKey()),
  };
}

export function getMissingSupabaseEnvNames() {
  const flags = getSupabaseEnvFlags();
  const missing: string[] = [];
  if (!flags.hasUrl) {
    missing.push("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  }
  if (!flags.hasAnon) {
    missing.push("SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  }
  if (!flags.hasServiceRole) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }
  return missing;
}
