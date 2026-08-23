import {
  contact as contactFallback,
  experience as experienceFallback,
  profile as profileFallback,
  selectedWork as selectedWorkFallback,
  services as servicesFallback,
  stats as statsFallback,
  toolkit as toolkitFallback,
  workCategories as workCategoriesFallback,
} from "@/features/home/content";
import type {
  CategoryMeta,
  PortfolioContent,
  WorkCategorySlug,
  WorkCategoryView,
  WorkItem,
} from "@/types/portfolio";

const CATEGORY_ORDER: WorkCategorySlug[] = [
  "long-form",
  "short-form",
  "posters",
  "logos",
];

export function getFallbackPortfolio(): PortfolioContent {
  const categoryMeta = Object.fromEntries(
    workCategoriesFallback.map((c) => [
      c.slug,
      { title: c.title, blurb: c.blurb },
    ]),
  ) as CategoryMeta;

  const workItems: WorkItem[] = workCategoriesFallback.flatMap((category) =>
    category.items.map((item, index) => ({
      id: `${category.slug}-${index}`,
      category: category.slug as WorkCategorySlug,
      title: item.title,
      coverUrl: item.image,
      videoUrl: null,
      tags: [...item.tags],
      sortOrder: index,
      featured: false,
      featuredSubtitle: null,
      published: true,
    })),
  );

  const workCategories: WorkCategoryView[] = workCategoriesFallback.map(
    (category) => ({
      id: category.slug as WorkCategorySlug,
      slug: category.slug as WorkCategorySlug,
      title: category.title,
      blurb: category.blurb,
      items: category.items.map((item, index) => ({
        id: `${category.slug}-${index}`,
        title: item.title,
        image: item.image,
        videoUrl: null,
        tags: [...item.tags],
      })),
    }),
  );

  return {
    profile: {
      ...profileFallback,
      taglineLines: [...profileFallback.taglineLines] as [string, string],
      aboutBody: [...profileFallback.aboutBody],
      ctas: {
        work: { ...profileFallback.ctas.work },
        contact: { ...profileFallback.ctas.contact },
        experience: { ...profileFallback.ctas.experience },
        about: { ...profileFallback.ctas.about },
      },
    },
    contact: {
      ...contactFallback,
      form: { ...contactFallback.form },
    },
    stats: statsFallback.map((s) => ({ ...s })),
    services: servicesFallback.map((s) => ({ ...s })),
    toolkit: {
      videoMotion: [...toolkitFallback.videoMotion],
      design: [...toolkitFallback.design],
    },
    experience: experienceFallback.map((job) => ({
      ...job,
      highlights: [...job.highlights],
    })),
    selectedWork: selectedWorkFallback.map((item) => ({ ...item })),
    categoryMeta,
    workCategories,
    workItems,
    source: "fallback",
  };
}

export function buildWorkCategories(
  categoryMeta: CategoryMeta,
  workItems: WorkItem[],
): WorkCategoryView[] {
  return CATEGORY_ORDER.map((slug) => {
    const meta = categoryMeta[slug];
    const items = workItems
      .filter((item) => item.category === slug && item.published)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({
        id: item.id,
        title: item.title,
        image: item.coverUrl,
        videoUrl: item.videoUrl,
        tags: item.tags,
      }));

    return {
      id: slug,
      slug,
      title: meta?.title ?? slug,
      blurb: meta?.blurb ?? "",
      items,
    };
  });
}

export { CATEGORY_ORDER };
