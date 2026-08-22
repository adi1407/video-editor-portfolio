import { AboutPageView } from "@/features/about/components/about-page-view";
import { profile } from "@/features/home/content";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: profile.profileBlurb,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutPageView />
    </>
  );
}
