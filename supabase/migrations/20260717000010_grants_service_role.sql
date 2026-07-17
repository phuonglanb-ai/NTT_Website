-- Migration truoc chi GRANT cho anon/authenticated, quen mat service_role
-- (dung o server-side, service_role da co bypassrls nhung van can duoc GRANT
-- quyen o cap bang truoc khi PostgREST cho truy cap).

grant usage on schema public to service_role;

grant select, insert, update, delete
  on all tables in schema public
  to service_role;

alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;
