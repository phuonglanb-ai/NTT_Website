-- Chat lieu khong con bat buoc -- chi giu bat buoc dung theo
-- acceptance-criteria.md: code, title_vi, year, type, collection, primary
-- image (phuc vu quan tri + tim kiem cua khach hang).

alter table public.artworks
  alter column medium_id drop not null;
