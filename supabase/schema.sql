-- StudentStack newsletter onboarding subscribers (run once in Supabase SQL editor)
--
-- Data is stored in Supabase (Postgres). Free tier exists; you need a Supabase project,
-- .env with SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from Supabase → Settings → API,
-- and this schema applied in the SQL editor. See src/lib/supabase-server.ts

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  parent_email text not null,
  student_email text,
  student_grade text not null check (
    student_grade in ('8th', 'Freshman', 'Sophomore', 'Junior', 'Senior')
  ),
  friction_point text not null check (
    friction_point in (
      'Finding Research/Internships',
      'Boosting GPA',
      'Writing Essays'
    )
  ),
  created_at timestamptz not null default now()
);

create unique index if not exists subscribers_parent_email_key on public.subscribers (lower(parent_email));

comment on table public.subscribers is 'Parent onboarding captures from landing modal (playbook signup)';

alter table public.subscribers add column if not exists student_email text;

-- Newsletter landing signups (run in Supabase SQL editor after creating the project)
create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  student_email text not null,
  parent_email text,
  grade text not null,
  top_focus text not null check (
    top_focus in (
      'Boosting GPA',
      'Finding Research/Internships',
      'Writing',
      'Applying to College'
    )
  ),
  created_at timestamptz not null default now()
);

create unique index if not exists signups_student_email_lower_key on public.signups (lower(student_email));

comment on table public.signups is 'Weekly email signup captures from the landing modal';
