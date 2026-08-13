-- Parent buys Elite for a student; student uses the portal.
-- Run after 002_student_portal.sql

create table if not exists public.elite_entitlements (
  id uuid primary key default gen_random_uuid(),
  parent_email text not null,
  student_email text not null,
  student_name text,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'past_due', 'canceled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists elite_entitlements_active_student_email_key
  on public.elite_entitlements (lower(student_email))
  where status = 'active';

create index if not exists elite_entitlements_parent_email_idx
  on public.elite_entitlements (lower(parent_email));

alter table public.elite_entitlements enable row level security;

-- Students can read their own entitlement row (matched by email)
create policy "elite_entitlements_student_read" on public.elite_entitlements
  for select using (lower(student_email) = lower(coalesce(auth.jwt() ->> 'email', '')));

comment on table public.elite_entitlements is
  'Parent-purchased StudentStack Elite access keyed to the student email';
