export type WorkCategorySlug =
  | "long-form"
  | "short-form"
  | "posters"
  | "logos";

export type ProfileContent = {
  name: string;
  role: string;
  shortRole: string;
  tagline: string;
  taglineLines: [string, string];
  heroIntro: string;
  heroBody: string;
  scrollHint: string;
  aboutHeadline: string;
  aboutBody: string[];
  profileBlurb: string;
  ctas: {
    work: { label: string; href: string };
    contact: { label: string; href: string };
    experience: { label: string; href: string };
    about: { label: string; href: string };
  };
};

export type ContactContent = {
  eyebrow: string;
  headline: string;
  body: string;
  email: string;
  form: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
};

export type StatItem = { value: string; label: string };
export type ServiceItem = {
  label: string;
  title: string;
  description: string;
  href: string;
};
export type ToolkitContent = {
  videoMotion: string[];
  design: string[];
};
export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};
export type SelectedWorkItem = {
  image: string;
  title: string;
  subtitle: string;
  href: string;
};

export type CategoryMeta = Record<
  WorkCategorySlug,
  { title: string; blurb: string }
>;

export type WorkItem = {
  id: string;
  category: WorkCategorySlug;
  title: string;
  coverUrl: string;
  videoUrl: string | null;
  tags: string[];
  sortOrder: number;
  featured: boolean;
  featuredSubtitle: string | null;
  published: boolean;
};

export type WorkCategoryView = {
  id: WorkCategorySlug;
  slug: WorkCategorySlug;
  title: string;
  blurb: string;
  items: Array<{
    id: string;
    title: string;
    image: string;
    videoUrl: string | null;
    tags: string[];
  }>;
};

export type PortfolioContent = {
  profile: ProfileContent;
  contact: ContactContent;
  stats: StatItem[];
  services: ServiceItem[];
  toolkit: ToolkitContent;
  experience: ExperienceItem[];
  selectedWork: SelectedWorkItem[];
  categoryMeta: CategoryMeta;
  workCategories: WorkCategoryView[];
  workItems: WorkItem[];
  source: "supabase" | "fallback";
};
