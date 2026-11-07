-- Run after 202611070001_content_api.sql, then add your Auth user as described in README.
begin;
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from public, anon, authenticated;
grant select on public.admin_users to authenticated;
grant select, insert, delete on public.admin_users to service_role;
create policy "Admins can check their own membership" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

-- Only SQL Editor/server administrators can change the allowlist.
grant insert, update, delete on public.staying_experiences, public.video_gallery, public.reviews to authenticated;
create policy "Admins manage stays" on public.staying_experiences
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins manage videos" on public.video_gallery
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins manage reviews" on public.reviews
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
commit;
