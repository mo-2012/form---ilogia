create table if not exists public.institution_applications (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  institution_type text not null check (institution_type in ('school', 'center')),
  institution_name text not null,
  institution_data jsonb not null,
  contact_name text not null,
  phone text not null,
  whatsapp text,
  email text not null,
  governorate text not null,
  city text not null,
  address text not null,
  status text not null default 'Pending'
    check (status in ('Pending', 'Under Review', 'Contacted', 'Approved', 'Rejected')),
  created_at timestamptz not null default now()
);

alter table public.institution_applications enable row level security;
revoke all on public.institution_applications from anon, authenticated;
grant all on public.institution_applications to service_role;

create table if not exists public.institution_application_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0),
  updated_at timestamptz not null default now()
);

alter table public.institution_application_rate_limits enable row level security;
revoke all on public.institution_application_rate_limits from anon, authenticated;
grant all on public.institution_application_rate_limits to service_role;

create or replace function public.consume_institution_application_rate_limit(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  insert into public.institution_application_rate_limits as limits
    (ip_hash, window_started_at, request_count, updated_at)
  values (p_ip_hash, now(), 1, now())
  on conflict (ip_hash) do update
  set
    window_started_at = case
      when limits.window_started_at <= now() - interval '15 minutes' then now()
      else limits.window_started_at
    end,
    request_count = case
      when limits.window_started_at <= now() - interval '15 minutes' then 1
      else limits.request_count + 1
    end,
    updated_at = now()
  returning request_count into v_count;

  return v_count <= 5;
end;
$$;

revoke all on function public.consume_institution_application_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_institution_application_rate_limit(text) to service_role;
