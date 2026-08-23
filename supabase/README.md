# Admin CMS setup

1. Create a Supabase project and copy URL + anon key + **service role** key into Vercel / `.env.local`.
2. In Supabase → SQL → New query, paste and run [`supabase/schema.sql`](supabase/schema.sql).
3. Set admin env vars (defaults already match your request if unset):

```
ADMIN_USERNAME=rajujha
ADMIN_PASSWORD=Raju@editor
ADMIN_SESSION_SECRET=long-random-string
```

4. Deploy on Vercel with the same env vars.
5. Open `/admin/login` → username `rajujha` / password `Raju@editor`.

## What you can edit

- **Work items** by category (`long-form`, `short-form`, `posters`, `logos`)
  - Cover image URL
  - Video link for long/short (plays in a modal on `/work`, or “Open link”)
  - Tags, sort order, featured, published
- **Site info**: profile/hero, contact, toolkit, stats, services
- **Experience** entries

Without Supabase keys the public site still uses the built-in fallback content in `src/features/home/content.ts`. Admin saves require the service role key.
