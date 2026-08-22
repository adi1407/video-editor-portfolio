import { WorkClosing } from "@/features/work/components/work-closing";
import { WorkCategories, WorkCategoryNav, WorkHero } from "@/features/work";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Selected work by Raju Jha — video projects, short-form content, motion graphics, and posters & designs.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkCategoryNav />
      <WorkCategories />
      <WorkClosing />
    </>
  );
}
