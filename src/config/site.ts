function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Raju Jha",
  shortName: "Rjha",
  description:
    "Video Editor and Visual Designer specializing in long-format videos, short-format content, posters, and logos.",
  url: resolveSiteUrl(),
  locale: "en_US",
  creator: "Raju Jha",
  keywords: [
    "Raju Jha",
    "video editor",
    "motion designer",
    "graphic designer",
    "short-format content",
    "long-format video",
    "posters",
    "logos",
    "portfolio",
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
