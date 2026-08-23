"use client";

import { useMemo, useState, useTransition } from "react";
import {
  adminLogoutAction,
  deleteWorkItemAction,
  saveSiteSettingsAction,
  upsertWorkItemAction,
} from "@/features/admin/actions";
import { buttonClassName, Container, Input } from "@/components/ui";
import { CATEGORY_ORDER } from "@/lib/portfolio/defaults";
import type {
  CategoryMeta,
  ContactContent,
  ExperienceItem,
  PortfolioContent,
  ProfileContent,
  SelectedWorkItem,
  ServiceItem,
  StatItem,
  ToolkitContent,
  WorkCategorySlug,
  WorkItem,
} from "@/types/portfolio";

type Tab = "site" | "experience" | "work";

type Props = {
  initial: PortfolioContent;
  initialWorkItems: WorkItem[];
  dbReady: boolean;
};

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  if (multiline) {
    return (
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
        />
      </label>
    );
  }
  return (
    <Input label={label} value={value} onChange={(e) => onChange(e.target.value)} />
  );
}

const emptyWork = (category: WorkCategorySlug): Omit<WorkItem, "id"> & { id?: string } => ({
  category,
  title: "",
  coverUrl: "",
  videoUrl: "",
  tags: [],
  sortOrder: 0,
  featured: false,
  featuredSubtitle: "",
  published: true,
});

export function AdminDashboard({ initial, initialWorkItems, dbReady }: Props) {
  const [tab, setTab] = useState<Tab>("work");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [profile, setProfile] = useState<ProfileContent>(initial.profile);
  const [contact, setContact] = useState<ContactContent>(initial.contact);
  const [stats, setStats] = useState<StatItem[]>(initial.stats);
  const [services, setServices] = useState<ServiceItem[]>(initial.services);
  const [toolkit, setToolkit] = useState<ToolkitContent>(initial.toolkit);
  const [experience, setExperience] = useState<ExperienceItem[]>(initial.experience);
  const [selectedWork, setSelectedWork] = useState<SelectedWorkItem[]>(
    initial.selectedWork,
  );
  const [categoryMeta, setCategoryMeta] = useState<CategoryMeta>(
    initial.categoryMeta,
  );
  const [workItems, setWorkItems] = useState<WorkItem[]>(initialWorkItems);
  const [activeCategory, setActiveCategory] =
    useState<WorkCategorySlug>("long-form");
  const [draft, setDraft] = useState(emptyWork("long-form"));

  const categoryItems = useMemo(
    () =>
      workItems
        .filter((item) => item.category === activeCategory)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [workItems, activeCategory],
  );

  const isVideoCategory =
    activeCategory === "long-form" || activeCategory === "short-form";

  function flash(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 3500);
  }

  function saveSite() {
    startTransition(async () => {
      const result = await saveSiteSettingsAction({
        profile,
        contact,
        stats,
        services,
        toolkit,
        experience,
        selectedWork,
        categoryMeta,
      });
      flash(result.ok ? "Site content saved." : result.error);
    });
  }

  function saveWork() {
    if (!draft.title.trim() || !draft.coverUrl.trim()) {
      flash("Title and cover image URL are required.");
      return;
    }
    startTransition(async () => {
      const result = await upsertWorkItemAction({
        id: draft.id,
        category: activeCategory,
        title: draft.title,
        coverUrl: draft.coverUrl,
        videoUrl: isVideoCategory ? draft.videoUrl : null,
        tags: draft.tags,
        sortOrder: draft.sortOrder,
        featured: draft.featured,
        featuredSubtitle: draft.featuredSubtitle,
        published: draft.published,
      });
      if (!result.ok) {
        flash(result.error);
        return;
      }
      const nextItem: WorkItem = {
        id: result.id || draft.id || crypto.randomUUID(),
        category: activeCategory,
        title: draft.title,
        coverUrl: draft.coverUrl,
        videoUrl: isVideoCategory ? draft.videoUrl || null : null,
        tags: draft.tags,
        sortOrder: draft.sortOrder,
        featured: draft.featured,
        featuredSubtitle: draft.featuredSubtitle || null,
        published: draft.published,
      };
      setWorkItems((prev) => {
        const exists = prev.some((item) => item.id === nextItem.id);
        if (exists) {
          return prev.map((item) => (item.id === nextItem.id ? nextItem : item));
        }
        return [...prev, nextItem];
      });
      setDraft(emptyWork(activeCategory));
      flash(draft.id ? "Work item updated." : "Work item added.");
    });
  }

  function editItem(item: WorkItem) {
    setDraft({
      ...item,
      videoUrl: item.videoUrl ?? "",
      featuredSubtitle: item.featuredSubtitle ?? "",
    });
  }

  function removeItem(id: string) {
    if (!window.confirm("Delete this work item?")) return;
    startTransition(async () => {
      const result = await deleteWorkItemAction(id);
      if (!result.ok) {
        flash(result.error);
        return;
      }
      setWorkItems((prev) => prev.filter((item) => item.id !== id));
      if (draft.id === id) setDraft(emptyWork(activeCategory));
      flash("Work item deleted.");
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Portfolio CMS
            </p>
            <h1 className="font-display text-2xl font-medium">Admin panel</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/" className={buttonClassName({ variant: "outline" })}>
              View site
            </a>
            <form action={adminLogoutAction}>
              <button type="submit" className={buttonClassName({ variant: "outline" })}>
                Log out
              </button>
            </form>
          </div>
        </Container>
      </header>

      <Container className="flex flex-col gap-6 py-8">
        {!dbReady ? (
          <div className="border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
            Supabase service role is missing. Add{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> (and URL/anon key), then run{" "}
            <code>supabase/schema.sql</code> in the Supabase SQL editor. Until then,
            admin saves will fail.
          </div>
        ) : null}

        {message ? (
          <p className="border border-border bg-surface px-4 py-3 text-sm">{message}</p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["work", "Work items"],
              ["site", "Site info"],
              ["experience", "Experience"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={buttonClassName({
                variant: tab === id ? "primary" : "outline",
                size: "sm",
              })}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "work" ? (
          <section className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="flex flex-col gap-2">
              {CATEGORY_ORDER.map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => {
                    setActiveCategory(slug);
                    setDraft(emptyWork(slug));
                  }}
                  className={`border px-3 py-2 text-left text-sm ${
                    activeCategory === slug
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {categoryMeta[slug]?.title ?? slug}
                </button>
              ))}
            </aside>

            <div className="flex flex-col gap-6">
              <div className="grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2">
                <Field
                  label="Category title"
                  value={categoryMeta[activeCategory]?.title ?? ""}
                  onChange={(v) =>
                    setCategoryMeta((prev) => ({
                      ...prev,
                      [activeCategory]: { ...prev[activeCategory], title: v },
                    }))
                  }
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Category blurb"
                    value={categoryMeta[activeCategory]?.blurb ?? ""}
                    onChange={(v) =>
                      setCategoryMeta((prev) => ({
                        ...prev,
                        [activeCategory]: { ...prev[activeCategory], blurb: v },
                      }))
                    }
                    multiline
                  />
                </div>
                <button
                  type="button"
                  disabled={pending}
                  onClick={saveSite}
                  className={buttonClassName({ variant: "outline" })}
                >
                  Save category copy
                </button>
              </div>

              <div className="border border-border bg-surface p-4">
                <h2 className="font-display text-xl font-medium">
                  {draft.id ? "Edit work item" : "Add work item"}
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Title"
                    value={draft.title}
                    onChange={(v) => setDraft((d) => ({ ...d, title: v }))}
                  />
                  <Field
                    label="Cover image URL"
                    value={draft.coverUrl}
                    onChange={(v) => setDraft((d) => ({ ...d, coverUrl: v }))}
                  />
                  {isVideoCategory ? (
                    <div className="sm:col-span-2">
                      <Field
                        label="Video link (YouTube / Vimeo / direct URL)"
                        value={draft.videoUrl || ""}
                        onChange={(v) => setDraft((d) => ({ ...d, videoUrl: v }))}
                      />
                    </div>
                  ) : null}
                  <Field
                    label="Tags (comma separated)"
                    value={draft.tags.join(", ")}
                    onChange={(v) =>
                      setDraft((d) => ({
                        ...d,
                        tags: v.split(",").map((t) => t.trim()).filter(Boolean),
                      }))
                    }
                  />
                  <Field
                    label="Sort order"
                    value={String(draft.sortOrder)}
                    onChange={(v) =>
                      setDraft((d) => ({ ...d, sortOrder: Number(v) || 0 }))
                    }
                  />
                  <Field
                    label="Featured subtitle"
                    value={draft.featuredSubtitle || ""}
                    onChange={(v) =>
                      setDraft((d) => ({ ...d, featuredSubtitle: v }))
                    }
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={draft.featured}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, featured: e.target.checked }))
                      }
                    />
                    Featured on home
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={draft.published}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, published: e.target.checked }))
                      }
                    />
                    Published
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={saveWork}
                    className={buttonClassName()}
                  >
                    {draft.id ? "Update item" : "Add item"}
                  </button>
                  {draft.id ? (
                    <button
                      type="button"
                      onClick={() => setDraft(emptyWork(activeCategory))}
                      className={buttonClassName({ variant: "outline" })}
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {categoryItems.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col gap-3 border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{item.title}</p>
                      <p className="truncate text-xs text-muted">{item.coverUrl}</p>
                      {item.videoUrl ? (
                        <p className="truncate text-xs text-accent">{item.videoUrl}</p>
                      ) : null}
                      <p className="mt-1 text-xs text-muted">
                        {item.tags.join(" · ") || "No tags"} · order {item.sortOrder}
                        {item.featured ? " · featured" : ""}
                        {!item.published ? " · draft" : ""}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editItem(item)}
                        className={buttonClassName({ variant: "outline", size: "sm" })}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className={buttonClassName({ variant: "outline", size: "sm" })}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
                {!categoryItems.length ? (
                  <p className="text-sm text-muted">No items in this category yet.</p>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {tab === "site" ? (
          <section className="flex flex-col gap-6">
            <div className="grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2">
              <h2 className="sm:col-span-2 font-display text-xl">Profile / hero</h2>
              <Field label="Name" value={profile.name} onChange={(v) => setProfile((p) => ({ ...p, name: v }))} />
              <Field label="Role" value={profile.role} onChange={(v) => setProfile((p) => ({ ...p, role: v }))} />
              <Field label="Short role" value={profile.shortRole} onChange={(v) => setProfile((p) => ({ ...p, shortRole: v }))} />
              <Field label="Tagline" value={profile.tagline} onChange={(v) => setProfile((p) => ({ ...p, tagline: v }))} />
              <div className="sm:col-span-2">
                <Field label="Hero intro" value={profile.heroIntro} onChange={(v) => setProfile((p) => ({ ...p, heroIntro: v }))} multiline />
              </div>
              <div className="sm:col-span-2">
                <Field label="Hero body" value={profile.heroBody} onChange={(v) => setProfile((p) => ({ ...p, heroBody: v }))} multiline />
              </div>
              <div className="sm:col-span-2">
                <Field label="About headline" value={profile.aboutHeadline} onChange={(v) => setProfile((p) => ({ ...p, aboutHeadline: v }))} />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="About body (paragraphs separated by blank line)"
                  value={profile.aboutBody.join("\n\n")}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      aboutBody: v.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                  multiline
                />
              </div>
              <div className="sm:col-span-2">
                <Field label="Profile blurb" value={profile.profileBlurb} onChange={(v) => setProfile((p) => ({ ...p, profileBlurb: v }))} multiline />
              </div>
            </div>

            <div className="grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2">
              <h2 className="sm:col-span-2 font-display text-xl">Contact</h2>
              <Field label="Eyebrow" value={contact.eyebrow} onChange={(v) => setContact((c) => ({ ...c, eyebrow: v }))} />
              <Field label="Email" value={contact.email} onChange={(v) => setContact((c) => ({ ...c, email: v }))} />
              <div className="sm:col-span-2">
                <Field label="Headline" value={contact.headline} onChange={(v) => setContact((c) => ({ ...c, headline: v }))} />
              </div>
              <div className="sm:col-span-2">
                <Field label="Body" value={contact.body} onChange={(v) => setContact((c) => ({ ...c, body: v }))} multiline />
              </div>
            </div>

            <div className="grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2">
              <h2 className="sm:col-span-2 font-display text-xl">Toolkit</h2>
              <Field
                label="Video & motion (comma separated)"
                value={toolkit.videoMotion.join(", ")}
                onChange={(v) =>
                  setToolkit((t) => ({
                    ...t,
                    videoMotion: v.split(",").map((s) => s.trim()).filter(Boolean),
                  }))
                }
              />
              <Field
                label="Design (comma separated)"
                value={toolkit.design.join(", ")}
                onChange={(v) =>
                  setToolkit((t) => ({
                    ...t,
                    design: v.split(",").map((s) => s.trim()).filter(Boolean),
                  }))
                }
              />
            </div>

            <div className="border border-border bg-surface p-4">
              <h2 className="font-display text-xl">Stats</h2>
              <div className="mt-3 flex flex-col gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="grid gap-2 sm:grid-cols-2">
                    <Field
                      label="Value"
                      value={stat.value}
                      onChange={(v) =>
                        setStats((prev) =>
                          prev.map((s, i) => (i === index ? { ...s, value: v } : s)),
                        )
                      }
                    />
                    <Field
                      label="Label"
                      value={stat.label}
                      onChange={(v) =>
                        setStats((prev) =>
                          prev.map((s, i) => (i === index ? { ...s, label: v } : s)),
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border bg-surface p-4">
              <h2 className="font-display text-xl">Services</h2>
              <div className="mt-3 flex flex-col gap-4">
                {services.map((service, index) => (
                  <div key={index} className="grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
                    <Field label="Label" value={service.label} onChange={(v) => setServices((prev) => prev.map((s, i) => (i === index ? { ...s, label: v } : s)))} />
                    <Field label="Title" value={service.title} onChange={(v) => setServices((prev) => prev.map((s, i) => (i === index ? { ...s, title: v } : s)))} />
                    <div className="sm:col-span-2">
                      <Field label="Description" value={service.description} onChange={(v) => setServices((prev) => prev.map((s, i) => (i === index ? { ...s, description: v } : s)))} multiline />
                    </div>
                    <Field label="Href" value={service.href} onChange={(v) => setServices((prev) => prev.map((s, i) => (i === index ? { ...s, href: v } : s)))} />
                  </div>
                ))}
              </div>
            </div>

            <button type="button" disabled={pending} onClick={saveSite} className={buttonClassName({ size: "lg" })}>
              Save site info
            </button>
          </section>
        ) : null}

        {tab === "experience" ? (
          <section className="flex flex-col gap-4">
            {experience.map((job, index) => (
              <div key={index} className="grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2">
                <Field label="Company" value={job.company} onChange={(v) => setExperience((prev) => prev.map((j, i) => (i === index ? { ...j, company: v } : j)))} />
                <Field label="Role" value={job.role} onChange={(v) => setExperience((prev) => prev.map((j, i) => (i === index ? { ...j, role: v } : j)))} />
                <Field label="Period" value={job.period} onChange={(v) => setExperience((prev) => prev.map((j, i) => (i === index ? { ...j, period: v } : j)))} />
                <div className="sm:col-span-2">
                  <Field label="Summary" value={job.summary} onChange={(v) => setExperience((prev) => prev.map((j, i) => (i === index ? { ...j, summary: v } : j)))} multiline />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Highlights (one per line)"
                    value={job.highlights.join("\n")}
                    onChange={(v) =>
                      setExperience((prev) =>
                        prev.map((j, i) =>
                          i === index
                            ? {
                                ...j,
                                highlights: v
                                  .split("\n")
                                  .map((line) => line.trim())
                                  .filter(Boolean),
                              }
                            : j,
                        ),
                      )
                    }
                    multiline
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className={buttonClassName({ variant: "outline" })}
              onClick={() =>
                setExperience((prev) => [
                  ...prev,
                  {
                    company: "New role",
                    role: "",
                    period: "",
                    summary: "",
                    highlights: [],
                  },
                ])
              }
            >
              Add experience entry
            </button>
            <button type="button" disabled={pending} onClick={saveSite} className={buttonClassName({ size: "lg" })}>
              Save experience
            </button>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
