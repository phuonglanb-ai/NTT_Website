-- Audit log cho thao tac admin (security-requirements.md muc 8).
-- Chi Admin doc duoc; Editor+ ghi duoc; khong ai sua/xoa (giu tinh toan ven
-- cua nhat ky he thong).

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  actor_email text,
  action text not null,      -- create | update | publish | handle ...
  entity text not null,      -- artwork | artist | exhibition | journal | person | inquiry ...
  entity_id text,
  summary text,
  created_at timestamptz not null default now()
);

create index audit_log_created_at_idx on public.audit_log (created_at desc);

alter table public.audit_log enable row level security;

create policy "admin reads audit_log" on public.audit_log
  for select
  using (public.has_role_at_least('admin'));

create policy "editor+ writes audit_log" on public.audit_log
  for insert
  with check (public.has_role_at_least('editor'));

-- Khong tao policy UPDATE/DELETE -> deny-by-default: khong ai sua/xoa duoc.
