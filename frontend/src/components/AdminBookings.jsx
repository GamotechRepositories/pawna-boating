import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
const button = 'min-h-11 rounded-lg border border-sand px-4 py-2 font-semibold hover:bg-sand disabled:opacity-50'
const money = value => `₹${(Number(value) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
const fields = 'id,stay_name,guest_name,email,phone,visit_date,guests,notes,price_unit,billable_units,total_amount_paise,amount_paid_paise,amount_refunded_paise,payment_status,booking_status,admin_notes,razorpay_order_id,razorpay_payment_id,created_at,paid_at'
const size = 25

function BookingCard({ booking, onSaved }) {
  const [status, setStatus] = useState(booking.booking_status)
  const [notes, setNotes] = useState(booking.admin_notes)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  async function save(event) {
    event.preventDefault(); setBusy(true); setMessage('')
    try {
      if (status === 'cancelled' && booking.booking_status !== 'cancelled' && !window.confirm('Cancel this booking? This does not issue a refund. Process any refund separately in Razorpay.')) return
      const { data, error } = await supabase.from('bookings').update({ booking_status: status, admin_notes: notes.trim() }).eq('id', booking.id).select(fields).single()
      if (error) throw error
      onSaved(data); setMessage('Booking updated.')
    } catch (error) { setMessage(error.message) }
    finally { setBusy(false) }
  }
  return <li className="rounded-2xl border border-sand bg-white p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="text-lg font-semibold">{booking.guest_name}</h3><p className="mt-1 text-sm">{booking.stay_name} · {booking.visit_date} · {booking.guests} guests</p></div><div className="flex flex-wrap gap-2 text-sm"><span className="rounded-full bg-river-surface px-3 py-1">{booking.booking_status}</span><span className={`rounded-full px-3 py-1 ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-900' : 'bg-amber-100 text-amber-900'}`}>{booking.payment_status.replaceAll('_', ' ')}</span></div></div>
    <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
      <div><dt className="text-forest/65">Contact</dt><dd className="mt-1 break-all"><a href={`mailto:${booking.email}`} className="underline">{booking.email}</a><br /><a href={`tel:${booking.phone.replace(/[^+\d]/g, '')}`} className="inline-block py-2 underline">{booking.phone}</a></dd></div>
      <div><dt className="text-forest/65">Full package amount</dt><dd className="mt-1 font-semibold">{money(booking.total_amount_paise)}</dd><dd className="mt-1">Paid {money(booking.amount_paid_paise)} · Refunded {money(booking.amount_refunded_paise)}</dd></div>
      <div><dt className="text-forest/65">Received (India time)</dt><dd className="mt-1">{new Date(booking.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</dd></div>
      <div className="sm:col-span-2 lg:col-span-3"><dt className="text-forest/65">Booking reference</dt><dd className="mt-1 break-all font-mono text-xs">{booking.id}</dd>{booking.razorpay_order_id && <dd className="mt-1 break-all text-xs">Order: {booking.razorpay_order_id} · Payment: {booking.razorpay_payment_id || 'Awaiting payment'}</dd>}</div>
    </dl>
    {booking.notes && <p className="mt-4 whitespace-pre-wrap rounded-lg bg-river-surface p-3 text-sm">Guest note: {booking.notes}</p>}
    <form onSubmit={save} className="mt-5 border-t border-sand pt-5"><fieldset disabled={busy} className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"><label className="field-label">Booking status<select value={status} onChange={event => setStatus(event.target.value)}>{['new', 'confirmed', 'cancelled', 'completed'].map(value => <option key={value} disabled={['confirmed', 'completed'].includes(value) && booking.payment_status !== 'paid'}>{value}</option>)}</select></label><label className="field-label">Internal notes<textarea rows="2" maxLength="4000" value={notes} onChange={event => setNotes(event.target.value)} /></label></fieldset><div className="mt-4 flex flex-wrap items-center gap-4"><button disabled={busy} className={button}>{busy ? 'Saving…' : 'Save booking'}</button>{message && <p role="status" className="text-sm">{message}</p>}</div></form>
  </li>
}
export default function AdminBookings() {
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [payment, setPayment] = useState('')
  const [status, setStatus] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [version, setVersion] = useState(0)
  useEffect(() => {
    let active = true
    let query = supabase.from('bookings').select(fields, { count: 'exact' }).order('created_at', { ascending: false }).order('id').range(page * size, (page + 1) * size - 1)
    if (payment) query = query.eq('payment_status', payment)
    if (status) query = query.eq('booking_status', status)
    if (search) query = query.eq('email', search)
    query.then(({ data, count, error }) => {
      if (active) { setRows(data || []); setTotal(count || 0); setError(error?.message || ''); setLoading(false) }
    }).catch(error => { if (active) { setError(error.message); setLoading(false) } })
    return () => { active = false }
  }, [page, payment, status, search, version])
  function refresh() { setLoading(true); setVersion(value => value + 1) }
  return <section aria-labelledby="bookings-heading">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 id="bookings-heading" className="font-display text-2xl">Bookings</h2><p className="mt-2 text-sm text-forest/70">All booking attempts, including unpaid and failed payments. Payment status is verified by the server.</p></div><button className={button} disabled={loading} onClick={refresh}>Refresh bookings</button></div>
    <form onSubmit={event => { event.preventDefault(); setPage(0); setSearch(email.trim().toLowerCase()); refresh() }} className="mt-6 grid items-end gap-4 rounded-xl border border-sand bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="field-label">Payment<select value={payment} onChange={event => { setPayment(event.target.value); setPage(0); refresh() }}><option value="">All payments</option>{['pending', 'paid', 'failed', 'setup_failed', 'partially_refunded', 'refunded'].map(value => <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>)}</select></label>
      <label className="field-label">Booking<select value={status} onChange={event => { setStatus(event.target.value); setPage(0); refresh() }}><option value="">All bookings</option>{['new', 'confirmed', 'cancelled', 'completed'].map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="field-label">Guest email<input type="email" value={email} placeholder="Exact email address" onChange={event => setEmail(event.target.value)} /></label><button className={button}>Find bookings</button>
    </form>
    <p className="my-5 text-xs leading-5 text-forest/70">Confirm only after checking availability. Cancelling a booking does not refund a payment. Issue refunds in Razorpay; the refund webhook updates payment status here.</p>
    {error && <p role="alert" className="mb-5 text-red-700">{error}</p>}
    {loading ? <p role="status">Loading bookings…</p> : rows.length ? <ul className="space-y-5">{rows.map(row => <BookingCard key={`${row.id}-${row.booking_status}-${row.admin_notes}`} booking={row} onSaved={updated => setRows(previous => previous.map(item => item.id === updated.id ? updated : item))} />)}</ul> : <p className="rounded-xl border border-sand bg-white p-8">No bookings match these filters.</p>}
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="text-sm">{total} bookings · Page {page + 1}</p><div className="flex gap-3"><button className={button} disabled={loading || page === 0} onClick={() => { setPage(value => value - 1); refresh() }}>Previous</button><button className={button} disabled={loading || (page + 1) * size >= total} onClick={() => { setPage(value => value + 1); refresh() }}>Next</button></div></div>
  </section>
}
