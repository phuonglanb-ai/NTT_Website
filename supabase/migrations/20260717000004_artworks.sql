-- Tac pham + anh, dung mo ta 3 tang co tac gia (content-model.md).
--
-- Rang buoc "artist_note chi Artist duoc ghi" duoc kiem tra o Server Action
-- (khong client-side, khong DB trigger) theo dung ke hoach da duyet -- bang
-- nay chi luu du lieu, khong tu gioi han ai duoc UPDATE cot nao.

create table public.artworks (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title_vi text not null,
  title_en text not null,
  year int not null,
  type artwork_type not null,

  collection_id uuid not null references public.collections (id),
  series_id uuid references public.series (id),
  medium_id uuid not null references public.mediums (id),
  dimensions text,
  dominant_colors text[] not null default '{}',

  desc_objective_vi text,
  desc_objective_en text,

  -- mo ta 3 tang: khach quan / nghe si / phe binh -- moi tang ghi ro tac gia
  artist_note_vi text,
  artist_note_en text,
  artist_note_author uuid references auth.users (id),

  critic_note_vi text,
  critic_note_en text,
  critic_note_author text,

  context_vi text,
  context_en text,
  artist_quote_vi text,
  artist_quote_en text,

  video_url text,

  ownership_status ownership_status not null default 'available',
  exhibition_status exhibition_status not null default 'in_studio',
  status content_status not null default 'draft',
  image_rights image_rights not null default 'viewable',

  keywords text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.artwork_images (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid not null references public.artworks (id) on delete cascade,
  -- ban hien thi web (bucket cong khai artwork-web) va ban goc (bucket rieng
  -- tu artwork-originals) -- xem security-requirements.md muc 4.
  web_storage_path text not null,
  original_storage_path text not null,
  is_primary boolean not null default false,
  alt_text_vi text not null,
  alt_text_en text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Chi 1 anh chinh (primary) cho moi tac pham.
create unique index artwork_images_one_primary_per_artwork
  on public.artwork_images (artwork_id)
  where is_primary;

create table public.artwork_styles (
  artwork_id uuid not null references public.artworks (id) on delete cascade,
  style_id uuid not null references public.styles (id) on delete cascade,
  primary key (artwork_id, style_id)
);

create table public.artwork_themes (
  artwork_id uuid not null references public.artworks (id) on delete cascade,
  theme_id uuid not null references public.themes (id) on delete cascade,
  primary key (artwork_id, theme_id)
);

alter table public.artworks enable row level security;
alter table public.artwork_images enable row level security;
alter table public.artwork_styles enable row level security;
alter table public.artwork_themes enable row level security;

create policy "public read published artworks" on public.artworks
  for select
  using (status = 'published' or public.has_role_at_least('editor'));

create policy "editor+ insert artworks" on public.artworks
  for insert
  with check (public.has_role_at_least('editor'));

create policy "editor+ update artworks" on public.artworks
  for update
  using (public.has_role_at_least('editor'))
  with check (public.has_role_at_least('editor'));

create policy "admin delete artworks" on public.artworks
  for delete
  using (public.has_role_at_least('admin'));

-- Anh di theo trang thai cua tac pham cha: guest chi thay anh cua tac pham
-- da published.
create policy "public read images of published artworks" on public.artwork_images
  for select
  using (
    public.has_role_at_least('editor')
    or exists (
      select 1 from public.artworks a
      where a.id = artwork_id and a.status = 'published'
    )
  );

create policy "editor+ manage artwork_images" on public.artwork_images
  for all
  using (public.has_role_at_least('editor'))
  with check (public.has_role_at_least('editor'));

create policy "public read artwork_styles" on public.artwork_styles for select using (true);
create policy "editor+ manage artwork_styles" on public.artwork_styles for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));

create policy "public read artwork_themes" on public.artwork_themes for select using (true);
create policy "editor+ manage artwork_themes" on public.artwork_themes for all
  using (public.has_role_at_least('editor')) with check (public.has_role_at_least('editor'));
