-- Run in Supabase SQL editor if you already created `subscribers` with the old friction_point values.

alter table public.subscribers drop constraint if exists subscribers_friction_point_check;

alter table public.subscribers add constraint subscribers_friction_point_check check (
  friction_point in (
    'Finding Research/Internships',
    'Boosting GPA',
    'Writing Essays'
  )
);
