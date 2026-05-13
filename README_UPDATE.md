# StudentStack landing · onboarding · admin updates

This note summarizes what shipped for the newsletter onboarding modal, Supabase `subscribers` table, `/api/generate`, and admin tooling.

## Environment variables

Add or confirm these in `.env.local` (or your deployment env):

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_URL` | Yes (server actions + admin) | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-side Supabase client (never expose to browser) |
| `ADMIN_PASSWORD` | Yes for `/admin` | Plain-text gate for admin dashboard cookie login |
| `OPENAI_API_KEY` | Yes for `/api/generate` | OpenAI API key for GPT-4o newsletter drafts |
| `OPENAI_MODEL` | Optional | Defaults used elsewhere (`gpt-4o-mini` in legacy newsletter route). **`/api/generate` always uses `gpt-4o`**. |

Existing Beehiiv or Stripe secrets are unchanged—only wire them if you still use those flows.

## Supabase SQL

1. Open the Supabase SQL editor for your project.
2. Paste and run the contents of **`supabase/schema.sql`**.

That creates:

- Table **`public.subscribers`** with `parent_email`, `student_grade`, `friction_point`, `created_at`.
- Unique index on **`lower(parent_email)`** so duplicate onboarding submits succeed gracefully in-app.

If the migration fails because an older conflicting index exists, drop it manually and re-run.

## Branded weekly cheat sheet (admin)

- **`Admin → Cheat sheet builder`** compiles the three fixed **StudentStack** modules into paste-ready HTML:
  1. **StudentStack HighSchool AI Research List**
  2. **StudentStack Team → Parent Q&A**
  3. **`{Your roster name}, Updated`** (default: StudentStack AI Tool Roster)
- **`POST /api/admin/cheat-sheet`** (authenticated) accepts `{ weekLabel, contextUrl?, contextNotes? }`, calls **gpt-4o** with **`response_format: json_object`**, then returns `{ html, content }`. Same env as other OpenAI routes: **`OPENAI_API_KEY`**.

Landing **What’s inside** section reads titles from **`src/lib/weekly-cheat-sheet-brand.ts`** so site and email stay aligned.

## Routes / behaviors

- **Landing CTA** (“Learn AI from top college students”) opens the **3-step onboarding modal** (parent email → grade → friction).
- Payload is persisted via **`saveSubscriberAction`** in `src/app/actions/subscribers.ts`.
- **`/admin`** lists **`subscribers`** in a table and exposes the **Newsletter Generator** (URL → **`POST /api/generate`** → HTML + **Copy**). Requires admin cookie (`ADMIN_PASSWORD`).

## Operational notes

- `/api/generate` performs a **server-side GET** to the pasted URL (15s timeout). Paywalled or bot-blocked sites may fail—paste a public article URL when possible.
- Generated HTML is **not** stored automatically; copy from admin and paste into your ESP.
