# StudentStack Deployment Handoff

This guide walks you through database setup, environment variables, and local API testing before deploying to Vercel.

## 1) Run this SQL in Supabase SQL Editor

Copy and run this exact SQL:

```sql
create extension if not exists "pgcrypto";

create table if not exists public.waitlist_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  grade_level text not null,
  zip_code text not null,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_users_created_at_idx
  on public.waitlist_users (created_at desc);

create table if not exists public.elite_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create index if not exists elite_subscribers_created_at_idx
  on public.elite_subscribers (created_at desc);

alter table public.waitlist_users enable row level security;
alter table public.elite_subscribers enable row level security;
```

## 2) Add these environment variables (`.env.local` and Vercel)

Create a local file named `.env.local` in the project root:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

ADMIN_PASSWORD=your_admin_password_here

OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4o-mini
```

Add the same variables in Vercel:

1. Open your Vercel project.
2. Go to **Settings -> Environment Variables**.
3. Add each variable above for Production (and Preview if desired).
4. Redeploy after saving variables.

## 3) Test the waitlist flow locally before deploying

### Start app

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Test the waitlist insert from UI

1. Click **Join Free Waitlist**.
2. Submit Parent Email, Grade Level, and Zip Code.
3. Confirm success message appears in modal.

### Confirm data reached Supabase

In Supabase:

1. Open **Table Editor**.
2. Open `waitlist_users`.
3. Confirm your test row exists.

### Test admin dashboard locally

1. Open `http://localhost:3000/admin`.
2. Enter `ADMIN_PASSWORD`.
3. Verify:
   - Waitlist rows render in CRM table.
   - **Download CSV** returns a CSV file.
   - Newsletter Generator returns HTML when given a topic.
