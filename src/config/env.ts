function trimEnv(value: string | undefined) {
  return value?.trim() ?? "";
}

/**
 * Literal process.env.NAME access so Next/Vercel include the values.
 * Also accept common aliases (new Supabase key names, integration imports).
 */
export function getSupabaseUrl() {
  return (
    trimEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    trimEnv(process.env.SUPABASE_URL)
  );
}

export function getSupabaseAnonKey() {
  return (
    trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    trimEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    trimEnv(process.env.SUPABASE_ANON_KEY) ||
    trimEnv(process.env.SUPABASE_PUBLISHABLE_KEY)
  );
}

export function getSupabaseServiceRoleKey() {
  return (
    trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    trimEnv(process.env.SUPABASE_SECRET_KEY) ||
    trimEnv(process.env.SUPABASE_SERVICE_KEY)
  );
}

function resolveSiteUrl() {
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
  if (!flags.hasUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!flags.hasAnon) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!flags.hasServiceRole) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  return missing;
}
