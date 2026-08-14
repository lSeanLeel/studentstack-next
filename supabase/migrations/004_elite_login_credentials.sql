-- Elite student login credentials issued after Stripe subscription.
-- Temporary password is shown once to the parent ops desk / success email path;
-- students sign in at /login and should change password after first visit.

create table if not exists public.elite_login_credentials (
  id uuid primary key default gen_random_uuid(),
  entitlement_id uuid references public.elite_entitlements(id) on delete set null,
  student_email text not null,
  parent_email text,
  student_name text,
  temporary_password text not null,
  delivered boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists elite_login_credentials_student_email_idx
  on public.elite_login_credentials (lower(student_email));

alter table public.elite_login_credentials enable row level security;

comment on table public.elite_login_credentials is
  'Unique portal passwords generated at Stripe activation for Elite students';
