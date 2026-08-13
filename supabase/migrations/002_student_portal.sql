-- Student portal: profiles, courses, enrollments, progress, certificates
-- Run in Supabase SQL editor (Auth must be enabled on the project).

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  membership_tier text not null default 'free'
    check (membership_tier in ('free', 'elite')),
  membership_status text not null default 'inactive'
    check (membership_status in ('inactive', 'active', 'past_due', 'canceled')),
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  estimated_hours numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  lesson_key text not null,
  completed_at timestamptz,
  unique (user_id, course_id, lesson_key)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  code text not null unique,
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.certificates enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "courses_public_read" on public.courses
  for select using (status = 'published' or auth.role() = 'service_role');

create policy "enrollments_own" on public.enrollments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "lesson_progress_own" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "certificates_own_read" on public.certificates
  for select using (auth.uid() = user_id);

-- Auto-create a profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
