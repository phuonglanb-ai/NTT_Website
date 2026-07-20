-- Slice 2: bo sung cot cho trang Nghe si + Nhat ky.

-- Hanh trinh sang tac = 1 khoi van ban (chua can bang timeline rieng cho MVP),
-- + anh chan dung optional.
alter table public.artists
  add column if not exists journey_vi text,
  add column if not exists journey_en text,
  add column if not exists portrait_storage_path text;

-- Phan loai bai viet: journal (blog/goc nhin/hau truong) | criticism (phe binh)
-- | press (bao chi viet VE nghe si). Trang Nghe si keo press; Nhat ky keo
-- journal + criticism. Giu dang text (mem deo), validate gia tri o tang zod.
alter table public.articles
  add column if not exists kind text not null default 'journal';

-- Ban ghi nghe si that (chi danh tinh; noi dung bio/statement/journey do Admin
-- nhap sau qua UI, khong seed noi dung gia).
insert into public.artists (slug, name)
values ('nguyen-tuan-thinh', 'Nguyễn Tuấn Thịnh')
on conflict (slug) do nothing;
