# GitHub Pages + Supabase

This `docs` folder is a GitHub Pages-ready frontend that can use Supabase on the free tier for shared anonymous submissions.

What it keeps:
- The full assessment experience.
- Result scoring and explanations.
- Optional anonymized sharing.
- A separate dashboard page.

What the architecture is:
- GitHub Pages hosts the static frontend from `docs/`.
- Supabase stores shared submissions in a hosted Postgres table.
- The browser reads and writes directly to Supabase using the public anon key and row-level security policies.
- If Supabase is not configured yet, the app falls back to browser-local storage so the UI still works.

## Free-tier setup

1. Create a free Supabase project.
2. In the Supabase SQL editor, run [docs/supabase/schema.sql](docs/supabase/schema.sql).
3. Copy [docs/supabase-config.example.js](docs/supabase-config.example.js) to `docs/supabase-config.js` or edit the existing [docs/supabase-config.js](docs/supabase-config.js).
4. Paste your Supabase project URL and anon public key into [docs/supabase-config.js](docs/supabase-config.js).
5. Push the repo to GitHub.
6. In GitHub, open Settings > Pages.
7. Set `Deploy from a branch` and choose the `/docs` folder.

## Why this works on the free tier

- No server runtime is required on GitHub Pages.
- No Supabase Edge Functions are required.
- The app uses one public table with row-level security.
- Anonymous insert and select are constrained by the table policies in [docs/supabase/schema.sql](docs/supabase/schema.sql).

## Important privacy note

The anon key is safe to expose in the frontend, but only because the database table is protected by row-level security policies. Do not put a service role key in the browser.

## Publishing identity

GitHub Pages will publish under whichever GitHub account owns the repository or organization. If you do not want your personal identity attached, publish from a separate GitHub account that is not tied to your real name or school account.