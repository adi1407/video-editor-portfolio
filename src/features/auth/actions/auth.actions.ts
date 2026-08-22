"use server";

import { isSupabaseConfigured } from "@/config/env";
import { SUPABASE_MISSING_MESSAGE } from "@/lib/constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AuthFormState } from "../types";

export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!isSupabaseConfigured) {
    return { error: SUPABASE_MISSING_MESSAGE };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { error: SUPABASE_MISSING_MESSAGE };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { success: "Signed in successfully." };
}

export async function signUpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (!isSupabaseConfigured) {
    return { error: SUPABASE_MISSING_MESSAGE };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { error: SUPABASE_MISSING_MESSAGE };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { success: "Check your email to confirm your account." };
}
