import { WorkClosing } from "@/features/work/components/work-closing";
import {
  WorkCategories,
  WorkCategoryNav,
  WorkGallery,
  WorkHero,
} from "@/features/work/components/work-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Selected work by Raju Jha — long format videos, short format, posters, and logos.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkGallery />
      <WorkCategoryNav />
      <WorkCategories />
      <WorkClosing />
    </>
  );
}
