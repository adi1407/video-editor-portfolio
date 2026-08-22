# Rjha

Next.js App Router starter with a feature-based folder structure, shared UI, SEO helpers, and Supabase clients ready to connect later.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Connect Supabase later

1. Copy `.env.example` to `.env.local`.
2. Create a project at [supabase.com](https://supabase.com).
3. Paste the project URL and anon key:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Generate database types when tables exist:

```bash
npx supabase gen types typescript --project-id <project-id> > src/types/database.ts
```

The app runs without these keys. Auth forms will tell you when Supabase is not connected yet.

## Folder structure

```text
src/
  app/                 Routes only — thin pages, layouts, SEO files
    (marketing)/       Public pages
    (auth)/            Login and register
    (dashboard)/       App workspace
    api/               Route handlers
  components/          Shared UI used by every feature
    ui/                Primitives (Button, Input, Card, Container)
    layout/            Header, footer, site shell
    shared/            Empty states, spinner, headings
    seo/               JSON-LD
  features/            Product areas
    home/              Landing sections
    auth/              Forms, hooks, server actions
    dashboard/         Workspace UI
  hooks/               Shared hooks
  lib/
    supabase/          Browser, server, and middleware clients
    seo/               Metadata and structured-data helpers
  config/              Site and env
  types/               Shared and generated Supabase types
```

### Where new code goes

- Reusable UI → `src/components/ui` or `src/components/shared`
- Cross-feature hook → `src/hooks`
- New product area → `src/features/<name>/{components,hooks,actions}`
- New URL → thin file in `src/app` that imports the feature and `createPageMetadata`

Example feature:

```text
src/features/billing/
  components/invoice-list.tsx
  hooks/use-invoices.ts
  actions/billing.actions.ts
  types.ts
  index.ts
```

```tsx
// src/app/(dashboard)/billing/page.tsx
import { InvoiceList } from "@/features/billing";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Billing",
  description: "Invoices and payments.",
  path: "/billing",
  noIndex: true,
});

export default function BillingPage() {
  return <InvoiceList />;
}
```
