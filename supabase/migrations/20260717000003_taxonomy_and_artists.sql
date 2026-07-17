-- Danh muc phan loai (content-model.md): collections = ba coi (dieu huong
-- chinh), con lai la bo loc hoc thuat phu. Tat ca doc cong khai, chi editor+
-- duoc sua.

create table public.artists (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  bio_vi text,
  bio_en text,
  statement_vi text,
  statement_en text,
  created_at timestamptz not null default now()
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, -- nang | doi | hon-mang
  name_vi text not null,
  name_en text not null,
  note_vi text,
  note_en text
);

create table public.mediums (
  id uuid primary key default gen_random_uuid(),
  name_vi text not null,
  name_en text not null
);

create table public.styles (
  id uuid primary key default gen_random_uuid(),
  name_vi text not null,
  name_en text not null
);

create table public.themes (
  id uuid primary key default gen_random_uuid(),
  name_vi text not null,
  name_en text not null
);

create table public.series (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists (id) on delete cascade,
  name_vi text not null,
  name_en text not null
);

alter table public.artists enable row level security;
alter table public.collections enable row level security;
alter table public.mediums enable row level security;
alter table public.styles enable row level security;
alter table public.themes enable row level security;
alter table public.series enable row level security;

create policy "public read artists" on public.artists for select using (true);
create policy "editor+ manage artists" on public.artists for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read collections" on public.collections for select using (true);
create policy "editor+ manage collections" on public.collections for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read mediums" on public.mediums for select using (true);
create policy "editor+ manage mediums" on public.mediums for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read styles" on public.styles for select using (true);
create policy "editor+ manage styles" on public.styles for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read themes" on public.themes for select using (true);
create policy "editor+ manage themes" on public.themes for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read series" on public.series for select using (true);
create policy "editor+ manage series" on public.series for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));
