-- Tao bang bang SQL thuan (khong qua Supabase Studio UI) khong tu dong GRANT
-- quyen bang cho role anon/authenticated nhu khi tao qua UI. RLS chi kiem
-- soat tung dong -- van can GRANT o cap bang truoc, RLS moi phat huy tac dung.

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete
  on all tables in schema public
  to anon, authenticated;

-- Ap dung cho ca bang tao sau nay (vd trong cac migration tiep theo).
alter default privileges in schema public
  grant select, insert, update, delete on tables to anon, authenticated;
