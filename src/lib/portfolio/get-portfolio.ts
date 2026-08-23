import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  buildWorkCategories,
  getFallbackPortfolio,
} from "@/lib/portfolio/defaults";
import type {
  CategoryMeta,
  ContactContent,
  ExperienceItem,
  PortfolioContent,
  ProfileContent,
  SelectedWorkItem,
  ServiceItem,
  StatItem,
  ToolkitContent,
  WorkCategorySlug,
  WorkItem,
} from "@/types/portfolio";

function asObject<T>(value: unknown, fallback: T): T {
  if (value && typeof value === "object") return value as T;
  return fallback;
}

function asArray<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function mapWorkRow(row: {
  id: string;
  category: string;
  title: string;
  cover_url: string;
  video_url: string | null;
  tags: string[] | null;
  sort_order: number;
  featured: boolean;
  featured_subtitle: string | null;
  published: boolean;
}): WorkItem {
  return {
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
  };
}

export const getPortfolio = cache(async (): Promise<PortfolioContent> => {
  const fallback = getFallbackPortfolio();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return fallback;

  try {
    const [settingsRes, workRes] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase
        .from("work_items")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
    ]);

    if (settingsRes.error || !settingsRes.data) {
      return fallback;
    }

    const settings = settingsRes.data;
    const profile = asObject<ProfileContent>(settings.profile, fallback.profile);
    const contact = asObject<ContactContent>(settings.contact, fallback.contact);
    const stats = asArray<StatItem>(settings.stats, fallback.stats);
    const services = asArray<ServiceItem>(settings.services, fallback.services);
    const toolkit = asObject<ToolkitContent>(settings.toolkit, fallback.toolkit);
    const experience = asArray<ExperienceItem>(
      settings.experience,
      fallback.experience,
    );
    const selectedWork = asArray<SelectedWorkItem>(
      settings.selected_work,
      fallback.selectedWork,
    );
    const categoryMeta = asObject<CategoryMeta>(
      settings.category_meta,
      fallback.categoryMeta,
    );

    const workItems = (workRes.data ?? []).map(mapWorkRow);
    const workCategories = buildWorkCategories(
      categoryMeta,
      workItems.length ? workItems : fallback.workItems,
    );

    const featured =
      workItems
        .filter((item) => item.featured)
        .map((item) => ({
          image: item.coverUrl,
          title: item.title,
          subtitle: item.featuredSubtitle || item.tags.join(" · "),
          href: `/work#${item.category}`,
        })) || selectedWork;

    return {
      profile,
      contact,
      stats,
      services,
      toolkit,
      experience,
      selectedWork: featured.length ? featured : selectedWork,
      categoryMeta,
      workCategories,
      workItems: workItems.length ? workItems : fallback.workItems,
      source: "supabase",
    };
  } catch {
    return fallback;
  }
});
