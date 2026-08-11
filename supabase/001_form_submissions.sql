-- noBRon Admin — fase 1: formulários -> Kanban
-- Execute somente no projeto Supabase exclusivo da noBRon.

create extension if not exists pgcrypto;

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  source_key text not null
    check (source_key ~ '^[a-z0-9][a-z0-9_-]{1,63}$'),
  source_label text not null
    check (char_length(source_label) between 2 and 120),
  source_path text,
  form_version text,
  contact_name text,
  contact_whatsapp text,
  contact_email text,
  business_name text,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'contacted', 'waiting', 'completed')),
  priority text not null default 'normal'
    check (priority in ('low', 'normal', 'high')),
  answers jsonb not null default '{}'::jsonb
    check (jsonb_typeof(answers) = 'object'),
  attribution jsonb not null default '{}'::jsonb
    check (jsonb_typeof(attribution) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists form_submissions_status_created_idx
  on public.form_submissions (status, created_at desc);
create index if not exists form_submissions_source_created_idx
  on public.form_submissions (source_key, created_at desc);
create index if not exists form_submissions_contact_whatsapp_idx
  on public.form_submissions (contact_whatsapp)
  where contact_whatsapp is not null;

create table if not exists public.form_submission_rate_limits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists form_submission_rate_limits_lookup_idx
  on public.form_submission_rate_limits (ip_hash, created_at desc);

alter table public.form_submissions enable row level security;
alter table public.form_submission_rate_limits enable row level security;

drop policy if exists "admin_aal2_select_form_submissions"
  on public.form_submissions;
drop policy if exists "admin_aal2_update_form_submissions"
  on public.form_submissions;

-- O administrador precisa de app_metadata.role = 'admin' e sessão MFA AAL2.
create policy "admin_aal2_select_form_submissions"
on public.form_submissions
for select
to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  and (select auth.jwt() ->> 'aal') = 'aal2'
);

create policy "admin_aal2_update_form_submissions"
on public.form_submissions
for update
to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  and (select auth.jwt() ->> 'aal') = 'aal2'
)
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  and (select auth.jwt() ->> 'aal') = 'aal2'
);

-- Nada é público; o admin só lê e altera o fluxo operacional.
revoke all on table public.form_submissions from anon, authenticated;
revoke all on table public.form_submission_rate_limits from anon, authenticated;
grant select on table public.form_submissions to authenticated;
grant update (status, priority, updated_at)
  on table public.form_submissions to authenticated;

-- O backend recebe os formulários com a chave secreta.
grant select, insert on table public.form_submissions to service_role;
grant select, insert, delete
  on table public.form_submission_rate_limits to service_role;
grant usage, select
  on sequence public.form_submission_rate_limits_id_seq to service_role;

-- Privilégios futuros permanecem fechados por padrão.
alter default privileges for role postgres in schema public
  revoke select, insert, update, delete on tables from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke usage, select on sequences from anon, authenticated;
