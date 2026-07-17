-- Slice 0: extensions + enum types dung chung toan schema.
-- pgvector duoc bat san cho V2/V3 (Hoi dap AI) nhung chua tao bang du lieu.

create extension if not exists pgcrypto;
create extension if not exists vector;

create type artwork_type as enum ('painting', 'sculpture', 'sketch', 'other');

create type ownership_status as enum ('available', 'collected', 'reserved', 'not_for_sale');

create type exhibition_status as enum ('in_studio', 'on_display', 'on_loan', 'archived');

create type content_status as enum ('draft', 'published');

create type image_rights as enum ('viewable', 'downloadable', 'press_only');

-- Thu tu khai bao = thu tu quyen tang dan (Postgres enum so sanh theo thu tu khai bao),
-- cho phep dung truc tiep >= trong RLS policy (vd has_role_at_least('editor')).
create type user_role as enum (
  'guest',
  'member',
  'contributor',
  'editor',
  'artist',
  'moderator',
  'admin'
);
