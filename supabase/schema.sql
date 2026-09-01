-- Run this in the Supabase SQL Editor (Project → SQL → New query).
-- Then set Vercel env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
-- SUPABASE_SERVICE_ROLE_KEY, ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET.

create extension if not exists "pgcrypto";

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  profile jsonb not null default '{}'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  stats jsonb not null default '[]'::jsonb,
  services jsonb not null default '[]'::jsonb,
  toolkit jsonb not null default '{}'::jsonb,
  experience jsonb not null default '[]'::jsonb,
  selected_work jsonb not null default '[]'::jsonb,
  category_meta jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.work_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('long-form', 'short-form', 'posters', 'logos')),
  title text not null,
  cover_url text not null,
  video_url text,
  tags text[] not null default '{}',
  sort_order int not null default 0,
  featured boolean not null default false,
  featured_subtitle text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists work_items_category_sort_idx
  on public.work_items (category, sort_order);

alter table public.site_settings enable row level security;
alter table public.work_items enable row level security;

drop policy if exists "Public read site_settings" on public.site_settings;
create policy "Public read site_settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read published work" on public.work_items;
create policy "Public read published work"
  on public.work_items for select
  to anon, authenticated
  using (published = true);

-- Writes go through the service role from Next.js server actions (bypasses RLS).

insert into public.site_settings (id, profile, contact, stats, services, toolkit, experience, selected_work, category_meta)
values (
  1,
  '{
    "name": "Raju Jha",
    "role": "Video Editor • Motion Designer • Graphic Designer",
    "shortRole": "Video Editor and Visual Designer",
    "tagline": "EVERY FRAME HAS A PURPOSE.",
    "taglineLines": ["EVERY FRAME", "HAS A PURPOSE."],
    "heroIntro": "I''m Raju Jha — a Video Editor and Visual Designer crafting stories through motion, design, and creativity.",
    "heroBody": "Specializing in long-format videos, short-format content, posters, and logos. Combining storytelling, design, and motion to turn ideas into content people remember.",
    "scrollHint": "Scroll to explore the work. ↓",
    "aboutHeadline": "I don''t just edit videos—I shape how stories are seen.",
    "aboutBody": [
      "With experience in both freelance and professional creative work, I specialize in combining video editing, motion, and visual design to create content that is engaging, polished, and built to make an impact.",
      "From a fast-paced 15-second reel to a detailed long-format video, from a promotional poster to a logo that anchors a brand, I enjoy turning ideas into visuals that connect with people."
    ],
    "profileBlurb": "I transform raw ideas and footage into engaging visual stories—from high-impact short-format content to cinematic long-format videos, posters, logos, and digital creatives.",
    "ctas": {
      "work": { "label": "Explore My Work", "href": "/work" },
      "contact": { "label": "Let''s Create Something", "href": "/contact" },
      "experience": { "label": "View experience", "href": "/experience" },
      "about": { "label": "About Raju", "href": "/about" }
    }
  }'::jsonb,
  '{
    "eyebrow": "Get in touch",
    "headline": "Let''s shape the next frame",
    "body": "Share the brief, references, and deadline — I''ll reply with availability and next steps.",
    "email": "hello@example.com",
    "form": {
      "nameLabel": "Name",
      "emailLabel": "Email",
      "messageLabel": "Message",
      "submitLabel": "Send message",
      "namePlaceholder": "Your name",
      "emailPlaceholder": "you@studio.com",
      "messagePlaceholder": "Project type, timeline, links…"
    }
  }'::jsonb,
  '[
    { "value": "1+", "label": "Years Freelance Experience" },
    { "value": "8", "label": "Months Professional Experience" },
    { "value": "7+", "label": "Tools in Creative Toolkit" },
    { "value": "4", "label": "Lanes — Video, Short, Posters & Logos" }
  ]'::jsonb,
  '[
    { "label": "Video", "title": "Long Format Videos", "description": "YouTube videos, interviews, podcasts, storytelling content, promotional videos, and other narrative-driven edits.", "href": "/work#long-form" },
    { "label": "Social", "title": "Short Format", "description": "Reels, Shorts, Instagram content, fast-paced social media videos, and attention-grabbing edits.", "href": "/work#short-form" },
    { "label": "Print", "title": "Posters", "description": "Campaign posters, social creatives, promotional assets, and digital designs that stop the scroll.", "href": "/work#posters" },
    { "label": "Brand", "title": "Logos", "description": "Logo concepts and brand marks that help create a recognizable visual identity.", "href": "/work#logos" }
  ]'::jsonb,
  '{
    "videoMotion": ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve"],
    "design": ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva"]
  }'::jsonb,
  '[
    {
      "company": "IUI Solutions Pvt. Ltd.",
      "role": "Video Editor & Visual Designer",
      "period": "Dec 2025 – Aug 2026 · 8 Months",
      "summary": "Worked on creating and editing visual content for digital platforms and brand communication.",
      "highlights": [
        "Editing long-format videos",
        "Creating engaging short-format videos and reels",
        "Motion graphics and visual effects",
        "Social media creatives",
        "Posters and promotional designs",
        "Logo and brand-related visuals",
        "Working with creative teams to transform concepts into polished visual content"
      ]
    },
    {
      "company": "Freelance",
      "role": "Video Editor & Graphic Designer",
      "period": "1 Year Experience · Before IUI Solutions",
      "summary": "Worked independently with clients on a variety of creative projects, including video editing and graphic design.",
      "highlights": [
        "Short-format social media content",
        "Long-format video editing",
        "Promotional and marketing videos",
        "Posters and social media creatives",
        "Logo design",
        "Brand visuals and creative assets"
      ]
    }
  ]'::jsonb,
  '[
    { "image": "/work/p-01.jpg", "title": "Long-format edit", "subtitle": "Narrative · YouTube", "href": "/work#long-form" },
    { "image": "/work/p-02.jpg", "title": "Short-format reel", "subtitle": "Reels · Social", "href": "/work#short-form" },
    { "image": "/work/p-04.jpg", "title": "Campaign poster", "subtitle": "Poster · Print", "href": "/work#posters" },
    { "image": "/work/p-05.jpg", "title": "Brand mark", "subtitle": "Logo · Identity", "href": "/work#logos" }
  ]'::jsonb,
  '{
    "long-form": { "title": "Long Format Videos", "blurb": "Long-format edits for YouTube, interviews, podcasts, storytelling, and promotional films — paced for clarity and emotion." },
    "short-form": { "title": "Short Format", "blurb": "Reels, Shorts, and fast social edits built for the first frame — hooks that hold attention." },
    "posters": { "title": "Posters", "blurb": "Campaign posters, social creatives, and promotional assets — designs that make an idea stick." },
    "logos": { "title": "Logos", "blurb": "Logo concepts and brand marks that build a recognizable visual identity." }
  }'::jsonb
)
on conflict (id) do nothing;

insert into public.work_items (category, title, cover_url, video_url, tags, sort_order, featured, featured_subtitle)
select * from (values
  ('long-form', 'Narrative long-format', '/work/p-01.jpg', null::text, array['YouTube','Story'], 0, true, 'Narrative · YouTube'),
  ('long-form', 'Interview & podcast cut', '/hero.jpg', null, array['Interview','Talk'], 1, false, null),
  ('long-form', 'Promotional film', '/work/p-05.jpg', null, array['Brand','Promo'], 2, false, null),
  ('short-form', 'Reel sequence', '/work/p-02.jpg', null, array['Reels','Social'], 0, true, 'Reels · Social'),
  ('short-form', 'Shorts pack', '/work/p-06.jpg', null, array['Shorts','Vertical'], 1, false, null),
  ('short-form', 'Campaign cutdowns', '/work/p-03.jpg', null, array['Ads','Feed'], 2, false, null),
  ('posters', 'Campaign poster', '/work/p-04.jpg', null, array['Poster','Print'], 0, true, 'Poster · Print'),
  ('posters', 'Social creative set', '/work/p-06.jpg', null, array['Social','Design'], 1, false, null),
  ('posters', 'Promo key art', '/work/p-01.jpg', null, array['Promo','Key art'], 2, false, null),
  ('logos', 'Logo & brand mark', '/work/p-05.jpg', null, array['Logo','Brand'], 0, true, 'Logo · Identity'),
  ('logos', 'Identity lockup', '/work/p-03.jpg', null, array['Identity','Type'], 1, false, null),
  ('logos', 'Brand system mark', '/work/p-02.jpg', null, array['System','Mark'], 2, false, null)
) as v(category, title, cover_url, video_url, tags, sort_order, featured, featured_subtitle)
where not exists (select 1 from public.work_items limit 1);

-- Portfolio media uploads (admin → Supabase Storage, public read)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  83886080,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read portfolio media" on storage.objects;
create policy "Public read portfolio media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio-media');

