begin;
create table public.bookings (
  id uuid primary key,
  access_token_hash text not null check (access_token_hash ~ '^[0-9a-f]{64}$'),
  stay_id text references public.staying_experiences(id) on delete set null,
  stay_name text not null,
  guest_name text not null,
  email text not null,
  phone text not null,
  visit_date date not null,
  guests integer not null check (guests between 1 and 100),
  notes text not null default '',
  unit_price_paise bigint not null check (unit_price_paise > 0),
  price_unit text not null check (price_unit in ('per person', 'per couple')),
  billable_units integer not null check (billable_units > 0),
  total_amount_paise bigint not null check (total_amount_paise > 0),
  currency text not null default 'INR' check (currency = 'INR'),
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'setup_failed', 'failed', 'paid', 'partially_refunded', 'refunded')),
  amount_paid_paise bigint not null default 0,
  amount_refunded_paise bigint not null default 0,
  booking_status text not null default 'new' check (booking_status in ('new', 'confirmed', 'cancelled', 'completed')),
  admin_notes text not null default '' check (length(admin_notes) <= 4000),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  check (total_amount_paise = unit_price_paise * billable_units),
  check (amount_paid_paise between 0 and total_amount_paise),
  check (amount_refunded_paise between 0 and amount_paid_paise)
);
alter table public.bookings enable row level security;
revoke all on public.bookings from public, anon, authenticated;
grant select on public.bookings to authenticated;
-- Admins cannot alter gateway IDs, contact data, prices or payment state.
grant update (booking_status, admin_notes) on public.bookings to authenticated;
grant select, insert, update, delete on public.bookings to service_role;
create policy "Admins read bookings" on public.bookings for select to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins manage booking workflow" on public.bookings for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create index bookings_created_at on public.bookings (created_at desc, id);
create index bookings_email_created_at on public.bookings (email, created_at desc);

create function public.check_booking_confirmation() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.booking_status is distinct from old.booking_status and new.booking_status in ('confirmed', 'completed') and new.payment_status <> 'paid' then
    raise exception 'Only fully paid bookings can be confirmed or completed';
  end if;
  return new;
end;
$$;
revoke all on function public.check_booking_confirmation() from public, anon, authenticated;
create trigger check_booking_confirmation before update of booking_status on public.bookings
  for each row execute function public.check_booking_confirmation();

-- Single locked transaction: duplicate/out-of-order events cannot regress a payment.
-- Callable only by the server; canonical payment data is fetched from Razorpay first.
create function public.apply_booking_payment(
  p_order_id text, p_payment_id text, p_amount bigint, p_currency text,
  p_captured boolean, p_failed boolean, p_refunded bigint
) returns void language plpgsql security invoker set search_path = '' as $$
declare b public.bookings; refund_total bigint;
begin
  select * into b from public.bookings where razorpay_order_id = p_order_id for update;
  if not found then raise exception 'Unknown booking order'; end if;
  if p_amount <> b.total_amount_paise or p_currency <> b.currency then
    raise exception 'Payment amount or currency mismatch';
  end if;
  if p_refunded < 0 or p_refunded > p_amount then raise exception 'Invalid refund amount'; end if;
  if b.razorpay_payment_id is not null and b.razorpay_payment_id <> p_payment_id then
    -- Failed attempts from the same order must not replace its captured payment.
    if not p_captured then return; end if;
    raise exception 'Payment ID mismatch';
  end if;
  if p_captured then
    refund_total := greatest(b.amount_refunded_paise, p_refunded);
    update public.bookings set
      razorpay_payment_id = p_payment_id,
      amount_paid_paise = p_amount,
      amount_refunded_paise = refund_total,
      payment_status = case when refund_total = p_amount then 'refunded' when refund_total > 0 then 'partially_refunded' else 'paid' end,
      booking_status = case when refund_total = p_amount then 'cancelled' else booking_status end,
      paid_at = coalesce(paid_at, now())
    where id = b.id;
  elsif p_failed and b.amount_paid_paise = 0 then
    update public.bookings set payment_status = 'failed' where id = b.id;
  end if;
end;
$$;
revoke all on function public.apply_booking_payment(text, text, bigint, text, boolean, boolean, bigint) from public, anon, authenticated;
grant execute on function public.apply_booking_payment(text, text, bigint, text, boolean, boolean, bigint) to service_role;
commit;
