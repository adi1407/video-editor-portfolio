"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/admin/auth";
import { createServiceSupabaseClient, isAdminDbReady } from "@/lib/supabase/admin";
import type {
  CategoryMeta,
  ContactContent,
  ExperienceItem,
  ProfileContent,
  SelectedWorkItem,
  ServiceItem,
  StatItem,
  ToolkitContent,
  WorkCategorySlug,
} from "@/types/portfolio";

type ActionResult = { ok: true } | { ok: false; error: string };

function serviceClientOrError():
  | { ok: true; client: NonNullable<ReturnType<typeof createServiceSupabaseClient>> }
  | { ok: false; error: string } {
  if (!isAdminDbReady()) {
    return {
      ok: false,
      error:
        "Supabase is not fully configured. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }
  const client = createServiceSupabaseClient();
  if (!client) {
    return { ok: false, error: "Could not create Supabase admin client." };
  }
  return { ok: true, client };
}

export async function adminLoginAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(username, password)) {
    return { ok: false, error: "Invalid username or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, await createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function saveSiteSettingsAction(input: {
  profile: ProfileContent;
  contact: ContactContent;
  stats: StatItem[];
  services: ServiceItem[];
  toolkit: ToolkitContent;
  experience: ExperienceItem[];
  selectedWork: SelectedWorkItem[];
  categoryMeta: CategoryMeta;
}): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const db = serviceClientOrError();
  if (!db.ok) return db;

  const { error } = await db.client.from("site_settings").upsert({
    id: 1,
    profile: input.profile as never,
    contact: input.contact as never,
    stats: input.stats as never,
    services: input.services as never,
    toolkit: input.toolkit as never,
    experience: input.experience as never,
    selected_work: input.selectedWork as never,
    category_meta: input.categoryMeta as never,
    updated_at: new Date().toISOString(),
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function upsertWorkItemAction(input: {
  id?: string;
  category: WorkCategorySlug;
  title: string;
  coverUrl: string;
  videoUrl?: string | null;
  tags: string[];
  sortOrder: number;
  featured: boolean;
  featuredSubtitle?: string | null;
  published: boolean;
}): Promise<ActionResult & { id?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const db = serviceClientOrError();
  if (!db.ok) return db;

  const row = {
    category: input.category,
    title: input.title.trim(),
    cover_url: input.coverUrl.trim(),
    video_url: input.videoUrl?.trim() || null,
    tags: input.tags.map((t) => t.trim()).filter(Boolean),
    sort_order: input.sortOrder,
    featured: input.featured,
    featured_subtitle: input.featuredSubtitle?.trim() || null,
    published: input.published,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { error } = await db.client
      .from("work_items")
      .update(row)
      .eq("id", input.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: input.id };
  }

  const { data, error } = await db.client
    .from("work_items")
    .insert(row)
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id };
}

export async function deleteWorkItemAction(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const db = serviceClientOrError();
  if (!db.ok) return db;

  const { error } = await db.client.from("work_items").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getAdminWorkItemsAction() {
  try {
    await requireAdmin();
  } catch {
    return { ok: false as const, error: "Unauthorized", items: [] };
  }

  const db = serviceClientOrError();
  if (!db.ok) return { ok: false as const, error: db.error, items: [] };

  const { data, error } = await db.client
    .from("work_items")
    .select("*")
    .order("category")
    .order("sort_order");

  if (error) return { ok: false as const, error: error.message, items: [] };

  return {
    ok: true as const,
    items: (data ?? []).map((row) => ({
      id: row.id,
      category: row.category as WorkCategorySlug,
      title: row.title,
      coverUrl: row.cover_url,
      videoUrl: row.video_url,
      tags: row.tags ?? [],
      sortOrder: row.sort_order,
      featured: row.featured,
      featuredSubtitle: row.featured_subtitle,
      published: row.published,
    })),
  };
}
