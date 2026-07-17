-- 2 bucket theo security-requirements.md muc 4: ban goc rieng tu, ban hien
-- thi web cong khai.

insert into storage.buckets (id, name, public)
values ('artwork-web', 'artwork-web', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('artwork-originals', 'artwork-originals', false)
on conflict (id) do nothing;

create policy "public read artwork-web" on storage.objects
  for select using (bucket_id = 'artwork-web');

create policy "editor+ upload artwork-web" on storage.objects
  for insert with check (bucket_id = 'artwork-web' and public.has_role_at_least('editor'));

create policy "editor+ update artwork-web" on storage.objects
  for update using (bucket_id = 'artwork-web' and public.has_role_at_least('editor'));

create policy "editor+ delete artwork-web" on storage.objects
  for delete using (bucket_id = 'artwork-web' and public.has_role_at_least('editor'));

-- Anh goc: khong ai doc/ghi qua client -- chi service_role (server-side) dung.
create policy "editor+ manage artwork-originals" on storage.objects
  for all
  using (bucket_id = 'artwork-originals' and public.has_role_at_least('editor'))
  with check (bucket_id = 'artwork-originals' and public.has_role_at_least('editor'));
