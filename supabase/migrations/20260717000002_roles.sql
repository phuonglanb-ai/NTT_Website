-- Vai tro nguoi dung + ham kiem tra quyen dung trong moi RLS policy ve sau.
-- Moi user co dung 1 role; khong co dong nghia la Guest (muc quyen thap nhat).

create table public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null default 'guest',
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users (id)
);

alter table public.user_roles enable row level security;

-- security definer de policy cua BANG KHAC goi duoc ham nay ma khong bi chinh
-- RLS cua user_roles chan lai (tranh de quy vo han khi kiem tra quyen).
create or replace function public.has_role_at_least(min_role user_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role >= min_role from public.user_roles where user_id = auth.uid()),
    false
  );
$$;

create policy "users read own role" on public.user_roles
  for select
  using (user_id = auth.uid());

create policy "admin manages roles" on public.user_roles
  for all
  using (public.has_role_at_least('admin'))
  with check (public.has_role_at_least('admin'));
