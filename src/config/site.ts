export const siteConfig = {
  name: "Raju Jha",
  shortName: "Rjha",
  description:
    "Video Editor and Visual Designer specializing in long-form videos, short-form content, motion graphics, posters, and brand visuals.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  creator: "Raju Jha",
  keywords: [
    "Raju Jha",
    "video editor",
    "motion designer",
    "graphic designer",
    "short-form content",
    "long-form video",
    "motion graphics",
    "portfolio",
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;
