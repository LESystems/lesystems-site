create extension if not exists pgcrypto;

create type public.user_role as enum ('client', 'team', 'admin');
create type public.project_status as enum (
  'new_request','brief_received','under_analysis','in_development','internal_review',
  'preview_released','changes_requested','awaiting_approval','approved','awaiting_payment',
  'payment_confirmed','preparing_production','published','delivered','cancelled'
);

create table public.customers (
  id uuid primary key default gen_random_uuid(), name text not null,
  segment text, created_at timestamptz not null default now()
);
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  full_name text not null default '', role public.user_role not null default 'client',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.projects (
  id uuid primary key default gen_random_uuid(), customer_id uuid not null references public.customers(id),
  public_id bigint generated always as identity unique,
  name text not null, project_type text not null, description text,
  status public.project_status not null default 'new_request', progress smallint not null default 0 check (progress between 0 and 100),
  final_url text, created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.project_briefs (
  id uuid primary key default gen_random_uuid(), project_id uuid not null unique references public.projects(id) on delete cascade,
  company jsonb not null default '{}', project jsonb not null default '{}', identity jsonb not null default '{}',
  contact jsonb not null default '{}', additional_notes text, created_at timestamptz not null default now()
);
create table public.project_requirements (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  executive_summary text, requirements jsonb not null default '[]', generated_by text,
  reviewed_by uuid references public.profiles(id), reviewed_at timestamptz, created_at timestamptz not null default now()
);
create table public.project_versions (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  version text not null, snapshot jsonb not null, is_frozen boolean not null default false,
  created_by uuid references public.profiles(id), created_at timestamptz not null default now(), unique(project_id, version)
);
create table public.project_previews (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  version_id uuid references public.project_versions(id), url text not null, access_token_hash text,
  expires_at timestamptz, released_by uuid references public.profiles(id), released_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.project_change_requests (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  version_id uuid references public.project_versions(id), requested_by uuid not null references public.profiles(id),
  description text not null, resolved_at timestamptz, created_at timestamptz not null default now()
);
create table public.project_approvals (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  version_id uuid not null references public.project_versions(id), approved_by uuid not null references public.profiles(id),
  approved_at timestamptz not null default now(), unique(project_id, version_id)
);
create table public.payments (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id),
  version_id uuid not null references public.project_versions(id), provider text, provider_reference text,
  amount_cents integer check(amount_cents >= 0), status text not null default 'pending', confirmed_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.deployments (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id),
  version_id uuid not null references public.project_versions(id), environment text not null check(environment in ('preview','production')),
  url text not null, deployed_by uuid references public.profiles(id), deployed_at timestamptz not null default now()
);
create table public.project_messages (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  author_id uuid not null references public.profiles(id), body text not null, created_at timestamptz not null default now()
);
create table public.project_files (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  uploaded_by uuid references public.profiles(id), storage_path text not null, file_name text not null,
  mime_type text, size_bytes bigint, created_at timestamptz not null default now()
);
create table public.audit_logs (
  id bigint generated always as identity primary key, project_id uuid references public.projects(id) on delete cascade,
  actor_id uuid references public.profiles(id), action text not null, metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index projects_customer_idx on public.projects(customer_id);
create index projects_status_idx on public.projects(status);
create index audit_logs_project_created_idx on public.audit_logs(project_id, created_at desc);

create function public.is_team() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role in ('team','admin'));
$$;
create function public.owns_project(target uuid) returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.projects p join public.profiles u on u.customer_id = p.customer_id where p.id = target and u.id = auth.uid());
$$;

alter table public.customers enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_briefs enable row level security;
alter table public.project_requirements enable row level security;
alter table public.project_versions enable row level security;
alter table public.project_previews enable row level security;
alter table public.project_change_requests enable row level security;
alter table public.project_approvals enable row level security;
alter table public.payments enable row level security;
alter table public.deployments enable row level security;
alter table public.project_messages enable row level security;
alter table public.project_files enable row level security;
alter table public.audit_logs enable row level security;

create policy profiles_self_or_team on public.profiles for select using (id = auth.uid() or public.is_team());
create policy customers_member_or_team on public.customers for select using (public.is_team() or id = (select customer_id from public.profiles where id = auth.uid()));
create policy projects_member_or_team on public.projects for select using (public.is_team() or public.owns_project(id));
create policy projects_team_write on public.projects for all using (public.is_team()) with check (public.is_team());

do $$ declare t text; begin
  foreach t in array array['project_briefs','project_requirements','project_versions','project_previews','project_change_requests','project_approvals','payments','deployments','project_messages','project_files','audit_logs']
  loop execute format('create policy %I on public.%I for select using (public.is_team() or public.owns_project(project_id))', t || '_read', t); end loop;
end $$;

create policy change_requests_client_insert on public.project_change_requests for insert with check (public.owns_project(project_id) and requested_by = auth.uid());
create policy approvals_client_insert on public.project_approvals for insert with check (public.owns_project(project_id) and approved_by = auth.uid());
create policy messages_member_insert on public.project_messages for insert with check ((public.is_team() or public.owns_project(project_id)) and author_id = auth.uid());

create or replace function public.guard_production_deployment() returns trigger language plpgsql set search_path = '' as $$
begin
  if new.environment = 'production' and not exists (
    select 1 from public.payments where project_id = new.project_id and version_id = new.version_id and status = 'confirmed'
  ) then raise exception 'Produção bloqueada: pagamento ainda não confirmado'; end if;
  return new;
end $$;
create trigger enforce_payment_before_production before insert or update on public.deployments for each row execute function public.guard_production_deployment();

create or replace function public.freeze_approved_version() returns trigger language plpgsql set search_path = '' as $$
begin update public.project_versions set is_frozen = true where id = new.version_id; return new; end $$;
create trigger freeze_version_after_approval after insert on public.project_approvals for each row execute function public.freeze_approved_version();

create or replace function public.prevent_frozen_version_changes() returns trigger language plpgsql set search_path = '' as $$
begin if old.is_frozen then raise exception 'Versão aprovada é imutável'; end if; return new; end $$;
create trigger immutable_approved_versions before update or delete on public.project_versions for each row execute function public.prevent_frozen_version_changes();
