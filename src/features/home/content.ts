export const profile = {
  name: "Raju Jha",
  role: "Video Editor • Motion Designer • Graphic Designer",
  shortRole: "Video Editor and Visual Designer",
  tagline: "EVERY FRAME HAS A PURPOSE.",
  taglineLines: ["EVERY FRAME", "HAS A PURPOSE."] as const,
  heroIntro:
    "I'm Raju Jha — a Video Editor and Visual Designer crafting stories through motion, design, and creativity.",
  heroBody:
    "Specializing in long-form videos, short-form content, motion graphics, posters, and brand visuals. Combining storytelling, design, and motion to turn ideas into content people remember.",
  scrollHint: "Scroll to explore the work. ↓",
  aboutHeadline: "I don't just edit videos—I shape how stories are seen.",
  aboutBody: [
    "With experience in both freelance and professional creative work, I specialize in combining video editing, motion, and visual design to create content that is engaging, polished, and built to make an impact.",
    "From a fast-paced 15-second reel to a detailed long-form video, from a promotional poster to a complete visual concept, I enjoy turning ideas into visuals that connect with people.",
  ] as const,
  profileBlurb:
    "I transform raw ideas and footage into engaging visual stories—from high-impact short-form content to cinematic long-form videos, motion graphics, posters, logos, and digital creatives.",
  ctas: {
    work: { label: "Explore My Work", href: "/work" },
    contact: { label: "Let's Create Something", href: "/#contact" },
    experience: { label: "View experience", href: "/experience" },
    about: { label: "About Raju", href: "/about" },
  },
} as const;

export const stats = [
  { value: "1+", label: "Years Freelance Experience" },
  { value: "8", label: "Months Professional Experience" },
  { value: "7+", label: "Tools in Creative Toolkit" },
  { value: "Multi", label: "Formats — Video, Motion & Design" },
] as const;

export const services = [
  {
    label: "Video",
    title: "Long-Form Videos",
    description:
      "YouTube videos, interviews, podcasts, storytelling content, promotional videos, and other narrative-driven edits.",
    href: "/work#video",
  },
  {
    label: "Social",
    title: "Short-Form Content",
    description:
      "Reels, Shorts, Instagram content, fast-paced social media videos, and attention-grabbing edits.",
    href: "/work#short-form",
  },
  {
    label: "Motion",
    title: "Motion Graphics",
    description:
      "Animated text, transitions, visual effects, graphics, and motion-based storytelling.",
    href: "/work#motion",
  },
  {
    label: "Design",
    title: "Graphic Design",
    description:
      "Posters, social media creatives, promotional assets, and digital designs.",
    href: "/work#posters",
  },
  {
    label: "Brand",
    title: "Logo & Brand Visuals",
    description:
      "Logo concepts and visual assets that help create a recognizable brand identity.",
    href: "/work#posters",
  },
  {
    label: "Story",
    title: "Visual Storytelling",
    description:
      "Turning raw ideas and footage into polished stories people finish watching—and remember.",
    href: "/work#video",
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
      "Editing long-form videos",
      "Creating engaging short-form videos and reels",
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
      "Short-form social media content",
      "Long-form video editing",
      "Promotional and marketing videos",
      "Posters and social media creatives",
      "Logo design",
      "Motion graphics",
      "Brand visuals and creative assets",
    ],
  },
] as const;

export const selectedWork = [
  { image: "/work/p-01.jpg", title: "Long-form edit", href: "/work#video" },
  { image: "/work/p-02.jpg", title: "Short-form reel", href: "/work#short-form" },
  { image: "/work/p-03.jpg", title: "Motion graphics", href: "/work#motion" },
  { image: "/work/p-04.jpg", title: "Poster design", href: "/work#posters" },
  { image: "/work/p-05.jpg", title: "Brand visual", href: "/work#posters" },
  { image: "/work/p-06.jpg", title: "Social creative", href: "/work#short-form" },
] as const;

export const workCategories = [
  {
    id: "video",
    slug: "video",
    title: "Video Projects",
    blurb:
      "Long-form edits for YouTube, interviews, podcasts, storytelling, and promotional films — paced for clarity and emotion.",
    items: [
      {
        title: "Narrative long-form",
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
    title: "Short-Form Content",
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
        image: "/work/p-04.jpg",
        tags: ["Ads", "Feed"],
      },
    ],
  },
  {
    id: "motion",
    slug: "motion",
    title: "Motion Graphics",
    blurb:
      "Animated type, transitions, VFX, and motion-led storytelling that lifts every cut.",
    items: [
      {
        title: "Title & type motion",
        image: "/work/p-03.jpg",
        tags: ["Type", "AE"],
      },
      {
        title: "Transition system",
        image: "/work/p-01.jpg",
        tags: ["FX", "Flow"],
      },
      {
        title: "Explainer motion",
        image: "/work/p-05.jpg",
        tags: ["Motion", "Brand"],
      },
    ],
  },
  {
    id: "posters",
    slug: "posters",
    title: "Posters & Designs",
    blurb:
      "Posters, social creatives, logos, and brand visuals — assets that make an identity stick.",
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
        title: "Logo & brand mark",
        image: "/work/p-05.jpg",
        tags: ["Logo", "Brand"],
      },
    ],
  },
] as const;
