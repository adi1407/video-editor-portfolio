export const APP_NAME = "Rjha";

export const ROUTES = {
  home: "/",
  about: "/about",
  work: "/work",
  experience: "/experience",
  contact: "/contact",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
} as const;

export const SUPABASE_MISSING_MESSAGE =
  "Supabase is not connected yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.";
