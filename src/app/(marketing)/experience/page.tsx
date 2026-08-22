import { ExperiencePageView } from "@/features/experience/components/experience-page-view";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "Professional and freelance experience — Video Editor & Visual Designer Raju Jha.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />
      <ExperiencePageView />
    </>
  );
}
