"use server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/admin/auth";
import { createServiceSupabaseClient, isAdminDbReady, adminDbNotReadyMessage } from "@/lib/supabase/admin";
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

type UploadResult = { ok: true; publicUrl: string } | { ok: false; error: string };

const COVER_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const VIDEO_MIME = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const COVER_MAX_BYTES = 8 * 1024 * 1024;
const VIDEO_MAX_BYTES = 80 * 1024 * 1024;
const MEDIA_BUCKET = "portfolio-media";

function extFromMime(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "video/mp4") return "mp4";
  if (mime === "video/webm") return "webm";
  if (mime === "video/quicktime") return "mov";
  return "bin";
}

function serviceClientOrError():
  | { ok: true; client: NonNullable<ReturnType<typeof createServiceSupabaseClient>> }
  | { ok: false; error: string } {
  if (!isAdminDbReady()) {
    return {
      ok: false,
      error: adminDbNotReadyMessage(),
    };
  }
  const client = createServiceSupabaseClient();
  if (!client) {
    return { ok: false, error: "Could not create Supabase admin client." };
  }
  return { ok: true, client };
}

export async function uploadAdminMediaAction(
  formData: FormData,
): Promise<UploadResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const db = serviceClientOrError();
  if (!db.ok) return db;

  const kind = String(formData.get("kind") ?? "");
  const file = formData.get("file");

  if (kind !== "cover" && kind !== "video") {
    return { ok: false, error: "Invalid upload kind." };
  }

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose a file to upload." };
  }

  const allowed = kind === "cover" ? COVER_MIME : VIDEO_MIME;
  const maxBytes = kind === "cover" ? COVER_MAX_BYTES : VIDEO_MAX_BYTES;

  if (!allowed.has(file.type)) {
    return {
      ok: false,
      error:
        kind === "cover"
          ? "Cover must be JPEG, PNG, or WebP."
          : "Video must be MP4, WebM, or MOV.",
    };
  }

  if (file.size > maxBytes) {
    return {
      ok: false,
      error:
        kind === "cover"
          ? "Cover image must be 8 MB or smaller."
          : "Video must be 80 MB or smaller.",
    };
  }

  const ext = extFromMime(file.type);
  const folder = kind === "cover" ? "covers" : "videos";
  const path = `${folder}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await db.client.storage
    .from(MEDIA_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return { ok: false, error: uploadError.message };
  }

  const { data } = db.client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  if (!data.publicUrl) {
    return { ok: false, error: "Upload succeeded but public URL was missing." };
  }

  return { ok: true, publicUrl: data.publicUrl };
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
