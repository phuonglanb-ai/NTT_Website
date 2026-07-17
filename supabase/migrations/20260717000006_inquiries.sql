-- Private Inquiry: ai cung gui duoc (insert), nhung chi Editor/Artist/Admin
-- doc duoc. Khong bao gio join bang nay vao query cong khai cua artworks --
-- day la noi duy nhat co the chua thong tin nguoi mua.

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  artwork_id uuid references public.artworks (id),
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "anyone can submit an inquiry" on public.inquiries
  for insert
  with check (true); -- rate limiting/CAPTCHA duoc ap dung o tang ung dung

create policy "editor+ read inquiries" on public.inquiries
  for select
  using (public.has_role_at_least('editor'));

create policy "admin update inquiries" on public.inquiries
  for update
  using (public.has_role_at_least('admin'))
  with check (public.has_role_at_least('admin'));

create policy "admin delete inquiries" on public.inquiries
  for delete
  using (public.has_role_at_least('admin'));
