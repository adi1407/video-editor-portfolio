import { ContactPageView } from "@/features/contact";
import { contact } from "@/features/home/content";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: contact.body,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactPageView />
    </>
  );
}
