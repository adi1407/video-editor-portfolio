import { redirect } from "next/navigation";
import { AdminDashboard } from "@/features/admin/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getPortfolio } from "@/lib/portfolio/get-portfolio";
import { createServiceSupabaseClient, isAdminDbReady } from "@/lib/supabase/admin";
import type { WorkCategorySlug, WorkItem } from "@/types/portfolio";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const portfolio = await getPortfolio();
  let workItems: WorkItem[] = portfolio.workItems;

  if (isAdminDbReady) {
    const client = createServiceSupabaseClient();
    if (client) {
      const { data } = await client
        .from("work_items")
        .select("*")
        .order("sort_order", { ascending: true });
      if (data?.length) {
        workItems = data.map((row) => ({
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
        }));
      }
    }
  }

  return (
    <AdminDashboard
      initial={portfolio}
      initialWorkItems={workItems}
      dbReady={isAdminDbReady}
    />
  );
}
