-- Run once in Supabase Dashboard > SQL Editor. All changes are transactional.
begin;

create table public.staying_experiences (
  id text primary key check (id ~ '^[a-z0-9-]+$'),
  name text not null check (length(trim(name)) > 0),
  price numeric(10,2) not null check (price >= 0),
  currency text not null default 'INR' check (currency = 'INR'),
  price_unit text not null check (price_unit in ('per person', 'per couple')),
  tag text not null default '',
  description text not null,
  image_url text not null,
  icon text not null default 'tent',
  package_title text not null,
  accommodation text not null,
  inclusions text[] not null default '{}',
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.video_gallery (
  id text primary key check (id ~ '^[a-z0-9-]+$'),
  title text not null check (length(trim(title)) > 0),
  description text not null default '',
  video_url text not null,
  poster_url text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 120),
  text text not null check (length(trim(text)) between 1 and 5000),
  -- Existing excerpts have no recorded rating; do not invent one.
  rating smallint check (rating between 1 and 5),
  source_url text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.staying_experiences enable row level security;
alter table public.video_gallery enable row level security;
alter table public.reviews enable row level security;

revoke all on public.staying_experiences, public.video_gallery, public.reviews from public, anon, authenticated;
grant usage on schema public to anon, authenticated, service_role;
grant select on public.staying_experiences, public.video_gallery, public.reviews to anon, authenticated;
grant select, insert, update, delete on public.staying_experiences, public.video_gallery, public.reviews to service_role;

create policy "Published stays are public" on public.staying_experiences
  for select to anon, authenticated using (is_published);
create policy "Published videos are public" on public.video_gallery
  for select to anon, authenticated using (is_published);
create policy "Published reviews are public" on public.reviews
  for select to anon, authenticated using (is_published);

create index staying_experiences_public_order on public.staying_experiences (sort_order, id) where is_published;
create index video_gallery_public_order on public.video_gallery (sort_order, id) where is_published;
create index reviews_public_order on public.reviews (sort_order, id) where is_published;

commit;
