-- Noi dung bien tap: trien lam, tin tuc, bai bao, Goc ban be.
-- Tat ca deu co status content_status (draft/published) va chi editor+ duoc
-- ghi -- dung mo hinh RLS nhu artworks.

create table public.exhibitions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_vi text not null,
  title_en text not null,
  venue text,
  start_date date,
  end_date date,
  exhibition_status exhibition_status not null default 'in_studio',
  description_vi text,
  description_en text,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.artwork_exhibitions (
  artwork_id uuid not null references public.artworks (id) on delete cascade,
  exhibition_id uuid not null references public.exhibitions (id) on delete cascade,
  primary key (artwork_id, exhibition_id)
);

create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_vi text not null,
  title_en text not null,
  body_vi text,
  body_en text,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_vi text not null,
  title_en text not null,
  body_vi text,
  body_en text,
  author text,
  source_url text,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.article_artworks (
  article_id uuid not null references public.articles (id) on delete cascade,
  artwork_id uuid not null references public.artworks (id) on delete cascade,
  primary key (article_id, artwork_id)
);

create table public.people (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role_note_vi text,
  role_note_en text,
  bio_vi text,
  bio_en text,
  avatar_storage_path text,
  status content_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.friend_contributions (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people (id) on delete cascade,
  title_vi text not null,
  title_en text not null,
  body_vi text,
  body_en text,
  status content_status not null default 'draft',
  submitted_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.exhibitions enable row level security;
alter table public.artwork_exhibitions enable row level security;
alter table public.news enable row level security;
alter table public.articles enable row level security;
alter table public.article_artworks enable row level security;
alter table public.people enable row level security;
alter table public.friend_contributions enable row level security;

create policy "public read published exhibitions" on public.exhibitions
  for select using (status = 'published' or public.has_role_at_least('editor'));
create policy "editor+ manage exhibitions" on public.exhibitions for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read artwork_exhibitions" on public.artwork_exhibitions for select using (true);
create policy "editor+ manage artwork_exhibitions" on public.artwork_exhibitions for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read published news" on public.news
  for select using (status = 'published' or public.has_role_at_least('editor'));
create policy "editor+ manage news" on public.news for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read published articles" on public.articles
  for select using (status = 'published' or public.has_role_at_least('editor'));
create policy "editor+ manage articles" on public.articles for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read article_artworks" on public.article_artworks for select using (true);
create policy "editor+ manage article_artworks" on public.article_artworks for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read published people" on public.people
  for select using (status = 'published' or public.has_role_at_least('editor'));
create policy "editor+ manage people" on public.people for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read published friend_contributions" on public.friend_contributions
  for select using (status = 'published' or public.has_role_at_least('editor'));
create policy "contributor+ submit friend_contributions" on public.friend_contributions
  for insert with check (public.has_role_at_least('contributor'));
create policy "editor+ manage friend_contributions" on public.friend_contributions
  for update using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));
create policy "admin delete friend_contributions" on public.friend_contributions
  for delete using (public.has_role_at_least('admin'));
