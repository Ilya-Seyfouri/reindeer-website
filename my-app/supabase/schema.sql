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

-- Return requests from the Start a return page. Every request waits for a
-- person to review it; nothing is refunded automatically.
--   order_number is unique, so each order can only have one return request.
--   reference is the code the customer must write on the parcel.
create table if not exists public.refund_requests (
  id bigint generated always as identity primary key,
  reference text not null unique,
  order_number text not null unique check (order_number ~ '^RC-[0-9]{5}$'),
  email text not null check (email = lower(email)),
  -- The code on the tamper-evident seal; required for change-of-mind returns,
  -- which must be unopened. Damaged, faulty and wrong items won't have one.
  seal_code text check (seal_code is null or seal_code ~ '^[A-Z0-9]{4}-[A-Z0-9]{4}$'),
  reason text not null check (reason in ('changed-mind', 'damaged', 'faulty', 'wrong-item')),
  details text,
  status text not null default 'pending_review'
    check (status in ('pending_review', 'approved', 'rejected', 'refunded')),
  created_at timestamptz not null default now()
);

alter table public.refund_requests enable row level security;
