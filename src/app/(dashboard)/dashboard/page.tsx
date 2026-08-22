import { DashboardOverview } from "@/features/dashboard";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Dashboard",
  description: "Your workspace overview.",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardPage() {
  return <DashboardOverview />;
}
