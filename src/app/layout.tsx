import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { rootMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
