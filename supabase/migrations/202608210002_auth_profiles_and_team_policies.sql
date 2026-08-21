create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, role, customer_id)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    case when new.raw_user_meta_data ->> 'role' in ('client','team','admin')
      then (new.raw_user_meta_data ->> 'role')::public.user_role else 'client' end,
    case when new.raw_user_meta_data ->> 'customer_id' is not null
      then (new.raw_user_meta_data ->> 'customer_id')::uuid else null end
  );
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create policy customers_team_write on public.customers for all using (public.is_team()) with check (public.is_team());
create policy profiles_team_write on public.profiles for all using (public.is_team()) with check (public.is_team());

do $$ declare t text; begin
  foreach t in array array['project_briefs','project_requirements','project_versions','project_previews','project_change_requests','project_approvals','payments','deployments','project_messages','project_files','audit_logs']
  loop execute format('create policy %I on public.%I for all using (public.is_team()) with check (public.is_team())', t || '_team_write', t); end loop;
end $$;

create or replace function public.friendly_project_id(project public.projects) returns text
language sql stable set search_path = '' as $$
  select 'LE-' || lpad(project.public_id::text, 6, '0');
$$;
