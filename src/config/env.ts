function trimEnv(value: string | undefined) {
  return value?.trim() ?? "";
}

/** Literal process.env.* access so Next.js inlines / includes these correctly. */
export function getSupabaseUrl() {
  return trimEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function getSupabaseAnonKey() {
  return trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseServiceRoleKey() {
  return trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
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

/** Live getters — do not cache secrets/URL at module load. */
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
