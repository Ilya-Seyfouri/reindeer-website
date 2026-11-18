-- Rudy & Co. database setup.
-- Paste all of this into Supabase → SQL Editor → New query, then click Run.
-- Safe to run more than once.

-- Waiting list: one row per email, from the sold-out box or the Waiting List page.
create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique check (email = lower(email)),
  source text not null check (source in ('sold-out', 'waiting-list')),
  created_at timestamptz not null default now()
);

-- The store's settings. There is only ever one row (id = 1).
--   sold_out      true shows the sold-out box instead of adding to the cart
--   next_drop_at  when the next drop goes live; the countdown everyone sees
create table if not exists public.store_settings (
  id smallint primary key default 1 check (id = 1),
  sold_out boolean not null default true,
  next_drop_at timestamptz,
  updated_at timestamptz not null default now()
);

insert into public.store_settings (id, sold_out, next_drop_at)
values (1, true, now() + interval '8 days')
on conflict (id) do nothing;

-- Lock both tables. The website reads and writes them from the server with the
-- secret key, which skips these rules; nobody else can read your email list.
alter table public.waitlist enable row level security;
alter table public.store_settings enable row level security;
