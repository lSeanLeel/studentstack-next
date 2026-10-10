-- Parent applications for monthly StudentStack cohorts.
-- Run in the Supabase SQL editor (or `supabase db push`).

create table if not exists public.program_applications (
  id uuid primary key default gen_random_uuid(),
  cohort text not null,
  parent_name text not null,
  parent_email text not null,
  parent_phone text,
  student_name text not null,
  student_grade text not null,
  school text,
  goals text not null,
  ai_use text not null,
  heard_from text,
  utm text,
  newsletter_opt_in boolean not null default false,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'accepted', 'enrolled', 'waitlisted', 'declined')),
  notes text,
  contacted_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists program_applications_created_at_idx
  on public.program_applications (created_at desc);
create index if not exists program_applications_status_idx
  on public.program_applications (status);

-- Only the server (service role) reads or writes applications.
alter table public.program_applications enable row level security;

comment on table public.program_applications is
  'Parent applications from /apply. Reviewed and contacted from /operator/applications.';
