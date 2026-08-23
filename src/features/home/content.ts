export const profile = {
  name: "Raju Jha",
  role: "Video Editor • Motion Designer • Graphic Designer",
  shortRole: "Video Editor and Visual Designer",
  tagline: "EVERY FRAME HAS A PURPOSE.",
  taglineLines: ["EVERY FRAME", "HAS A PURPOSE."] as const,
  heroIntro:
    "I'm Raju Jha — a Video Editor and Visual Designer crafting stories through motion, design, and creativity.",
  heroBody:
    "Specializing in long-format videos, short-format content, posters, and logos. Combining storytelling, design, and motion to turn ideas into content people remember.",
  scrollHint: "Scroll to explore the work. ↓",
  aboutHeadline: "I don't just edit videos—I shape how stories are seen.",
  aboutBody: [
    "With experience in both freelance and professional creative work, I specialize in combining video editing, motion, and visual design to create content that is engaging, polished, and built to make an impact.",
    "From a fast-paced 15-second reel to a detailed long-format video, from a promotional poster to a logo that anchors a brand, I enjoy turning ideas into visuals that connect with people.",
  ] as const,
  profileBlurb:
    "I transform raw ideas and footage into engaging visual stories—from high-impact short-format content to cinematic long-format videos, posters, logos, and digital creatives.",
  ctas: {
    work: { label: "Explore My Work", href: "/work" },
    contact: { label: "Let's Create Something", href: "/contact" },
    experience: { label: "View experience", href: "/experience" },
    about: { label: "About Raju", href: "/about" },
  },
} as const;

export const contact = {
  eyebrow: "Get in touch",
  headline: "Let's shape the next frame",
  body: "Share the brief, references, and deadline — I'll reply with availability and next steps.",
  email: "hello@example.com",
  form: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submitLabel: "Send message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@studio.com",
    messagePlaceholder: "Project type, timeline, links…",
  },
} as const;

export const stats = [
  { value: "1+", label: "Years Freelance Experience" },
  { value: "8", label: "Months Professional Experience" },
  { value: "7+", label: "Tools in Creative Toolkit" },
  { value: "4", label: "Lanes — Video, Short, Posters & Logos" },
] as const;

export const services = [
  {
    label: "Video",
    title: "Long Format Videos",
    description:
      "YouTube videos, interviews, podcasts, storytelling content, promotional videos, and other narrative-driven edits.",
    href: "/work#long-form",
  },
  {
    label: "Social",
    title: "Short Format",
    description:
      "Reels, Shorts, Instagram content, fast-paced social media videos, and attention-grabbing edits.",
    href: "/work#short-form",
  },
  {
    label: "Print",
    title: "Posters",
    description:
      "Campaign posters, social creatives, promotional assets, and digital designs that stop the scroll.",
    href: "/work#posters",
  },
  {
    label: "Brand",
    title: "Logos",
    description:
      "Logo concepts and brand marks that help create a recognizable visual identity.",
    href: "/work#logos",
  },
] as const;

export const toolkit = {
  videoMotion: [
    "Adobe Premiere Pro",
    "Adobe After Effects",
    "DaVinci Resolve",
  ],
  design: [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Figma",
    "Canva",
  ],
} as const;

export const experience = [
  {
    company: "IUI Solutions Pvt. Ltd.",
    role: "Video Editor & Visual Designer",
    period: "Dec 2025 – Aug 2026 · 8 Months",
    summary:
      "Worked on creating and editing visual content for digital platforms and brand communication.",
    highlights: [
      "Editing long-format videos",
      "Creating engaging short-format videos and reels",
      "Motion graphics and visual effects",
      "Social media creatives",
      "Posters and promotional designs",
      "Logo and brand-related visuals",
      "Working with creative teams to transform concepts into polished visual content",
    ],
  },
  {
    company: "Freelance",
    role: "Video Editor & Graphic Designer",
    period: "1 Year Experience · Before IUI Solutions",
    summary:
      "Worked independently with clients on a variety of creative projects, including video editing and graphic design.",
    highlights: [
      "Short-format social media content",
      "Long-format video editing",
      "Promotional and marketing videos",
      "Posters and social media creatives",
      "Logo design",
      "Brand visuals and creative assets",
    ],
  },
] as const;

export const selectedWork = [
  {
    image: "/work/p-01.jpg",
    title: "Long-format edit",
    subtitle: "Narrative · YouTube",
    href: "/work#long-form",
  },
  {
    image: "/work/p-02.jpg",
    title: "Short-format reel",
    subtitle: "Reels · Social",
    href: "/work#short-form",
  },
  {
    image: "/work/p-04.jpg",
    title: "Campaign poster",
    subtitle: "Poster · Print",
    href: "/work#posters",
  },
  {
    image: "/work/p-05.jpg",
    title: "Brand mark",
    subtitle: "Logo · Identity",
    href: "/work#logos",
  },
] as const;

export const workCategories = [
  {
    id: "long-form",
    slug: "long-form",
    title: "Long Format Videos",
    blurb:
      "Long-format edits for YouTube, interviews, podcasts, storytelling, and promotional films — paced for clarity and emotion.",
    items: [
      {
        title: "Narrative long-format",
        image: "/work/p-01.jpg",
        tags: ["YouTube", "Story"],
      },
      {
        title: "Interview & podcast cut",
        image: "/hero.jpg",
        tags: ["Interview", "Talk"],
      },
      {
        title: "Promotional film",
        image: "/work/p-05.jpg",
        tags: ["Brand", "Promo"],
      },
    ],
  },
  {
    id: "short-form",
    slug: "short-form",
    title: "Short Format",
    blurb:
      "Reels, Shorts, and fast social edits built for the first frame — hooks that hold attention.",
    items: [
      {
        title: "Reel sequence",
        image: "/work/p-02.jpg",
        tags: ["Reels", "Social"],
      },
      {
        title: "Shorts pack",
        image: "/work/p-06.jpg",
        tags: ["Shorts", "Vertical"],
      },
      {
        title: "Campaign cutdowns",
        image: "/work/p-03.jpg",
        tags: ["Ads", "Feed"],
      },
    ],
  },
  {
    id: "posters",
    slug: "posters",
    title: "Posters",
    blurb:
      "Campaign posters, social creatives, and promotional assets — designs that make an idea stick.",
    items: [
      {
        title: "Campaign poster",
        image: "/work/p-04.jpg",
        tags: ["Poster", "Print"],
      },
      {
        title: "Social creative set",
        image: "/work/p-06.jpg",
        tags: ["Social", "Design"],
      },
      {
        title: "Promo key art",
        image: "/work/p-01.jpg",
        tags: ["Promo", "Key art"],
      },
    ],
  },
  {
    id: "logos",
    slug: "logos",
    title: "Logos",
    blurb:
      "Logo concepts and brand marks that build a recognizable visual identity.",
    items: [
      {
        title: "Logo & brand mark",
        image: "/work/p-05.jpg",
        tags: ["Logo", "Brand"],
      },
      {
        title: "Identity lockup",
        image: "/work/p-03.jpg",
        tags: ["Identity", "Type"],
      },
      {
        title: "Brand system mark",
        image: "/work/p-02.jpg",
        tags: ["System", "Mark"],
      },
    ],
  },
] as const;
