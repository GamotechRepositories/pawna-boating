// Dashboard copy: paste this entire file into the razorpay-webhook function editor.
// Standalone dashboard source; no local-file imports are needed.
import { createClient } from 'npm:@supabase/supabase-js@2.119.0'

export class BookingError extends Error {
  constructor(message, status = 400) { super(message); this.status = status }
}
export function credentials(input) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.booking_id || '') || !/^[0-9a-f]{64}$/.test(input.booking_token || '')) {
    throw new BookingError('Invalid booking reference.')
  }
  return { id: input.booking_id, token: input.booking_token }
}
export function validateGuest(input, now = new Date()) {
  const name = String(input.name || '').trim()
  const email = String(input.email || '').trim().toLowerCase()
  const phone = String(input.phone || '').trim()
  const notes = String(input.notes || '').trim()
  const guests = Number(input.guests)
  if (!name || name.length > 100) throw new BookingError('Enter your name (up to 100 characters).')
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new BookingError('Enter a valid email address.')
  if (!/^\+?[\d\s()-]{7,25}$/.test(phone) || phone.replace(/\D/g, '').length < 7) throw new BookingError('Enter a valid phone number.')
  if (!Number.isInteger(guests) || guests < 1 || guests > 100) throw new BookingError('Choose between 1 and 100 guests.')
  const date = String(input.date || '')
  const parsed = new Date(`${date}T00:00:00Z`)
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date || date < today) throw new BookingError('Choose a valid visit date, today or later.')
  if (notes.length > 2000) throw new BookingError('Notes must be under 2000 characters.')
  if (!/^[a-z0-9-]+$/.test(String(input.stay || ''))) throw new BookingError('Choose an available stay.')
  return { guest_name: name, email, phone, visit_date: date, guests, notes }
}
export function quoteStay(stay, guests) {
  if (!stay?.is_published || !['per person', 'per couple'].includes(stay.price_unit)) throw new BookingError('This stay is not available for booking.')
  const unit = Math.round(Number(stay.price) * 100)
  const units = stay.price_unit === 'per couple' ? Math.ceil(guests / 2) : guests
  const total = unit * units
  if (!Number.isSafeInteger(total) || unit <= 0) throw new BookingError('This stay does not have a valid online price.')
  return { unit_price_paise: unit, billable_units: units, total_amount_paise: total, price_unit: stay.price_unit }
}
export async function hashToken(token) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
}
export async function verifyHmac(secret, content, signature) {
  if (!/^[0-9a-f]{64}$/i.test(signature || '')) return false
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
  const bytes = Uint8Array.from(signature.match(/../g), byte => parseInt(byte, 16))
  return crypto.subtle.verify('HMAC', key, bytes, new TextEncoder().encode(content))
}
export function paymentUpdate(booking, payment) {
  if (!payment || payment.order_id !== booking.razorpay_order_id || payment.currency !== 'INR' || Number(payment.amount) !== Number(booking.total_amount_paise)) throw new BookingError('Payment details do not match this booking.', 409)
  if (!/^pay_[a-zA-Z0-9]+$/.test(payment.id || '')) throw new BookingError('Invalid payment ID.')
  const refunded = Number(payment.amount_refunded || 0)
  if (!Number.isSafeInteger(refunded) || refunded < 0 || refunded > Number(payment.amount)) throw new BookingError('Invalid refund details.', 409)
  return {
    p_order_id: booking.razorpay_order_id, p_payment_id: payment.id,
    p_amount: Number(payment.amount), p_currency: payment.currency,
    p_captured: payment.status === 'captured' || payment.status === 'refunded',
    p_failed: payment.status === 'failed', p_refunded: refunded,
  }
}
export function publicBooking(booking) {
  return {
    booking_id: booking.id, stay_name: booking.stay_name, guests: booking.guests,
    visit_date: booking.visit_date, total_amount_paise: Number(booking.total_amount_paise),
    currency: booking.currency, payment_status: booking.payment_status, booking_status: booking.booking_status,
    razorpay_order_id: booking.razorpay_order_id,
  }
}


function checked(result) {
  if (result.error) throw new Error(`Database operation failed (${result.error.code || 'unknown'}).`)
  return result.data
}
export function makeStore(db) {
  return {
    async find(id) { return checked(await db.from('bookings').select('*').eq('id', id).maybeSingle()) },
    async byOrder(id) { return checked(await db.from('bookings').select('*').eq('razorpay_order_id', id).maybeSingle()) },
    async stay(id) { return checked(await db.from('staying_experiences').select('id,name,price,price_unit,is_published').eq('id', id).maybeSingle()) },
    async recentCount(email) {
      const result = await db.from('bookings').select('id', { count: 'exact', head: true }).eq('email', email).gte('created_at', new Date(Date.now() - 15 * 60000).toISOString())
      checked(result); return result.count || 0
    },
    async insert(row) {
      const result = await db.from('bookings').insert(row)
      if (result.error?.code === '23505') return false
      checked(result); return true
    },
    async attachOrder(id, orderId) { checked(await db.from('bookings').update({ razorpay_order_id: orderId }).eq('id', id)) },
    async setupFailed(id) { checked(await db.from('bookings').update({ payment_status: 'setup_failed' }).eq('id', id).is('razorpay_order_id', null)) },
    async apply(args) { checked(await db.rpc('apply_booking_payment', args)) },
  }
}



export function makeRazorpay({ keyId, keySecret, baseUrl = 'https://api.razorpay.com/v1', fetcher = fetch }) {
  return async (path, body) => {
    let response
    try {
      response = await fetcher(`${baseUrl}${path}`, {
        method: body ? 'POST' : 'GET',
        headers: { Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`, 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(12000),
      })
    } catch { throw new BookingError('Payment gateway is unavailable. Please check your booking status before trying again.', 502) }
    if (!response.ok) throw new BookingError('Payment gateway request failed. Please contact the camp with your booking reference.', 502)
    return response.json()
  }
}

export function makeBookingService({ store, razorpay, keyId, keySecret, webhookSecret }) {
  async function owned(input) {
    const { id, token } = credentials(input)
    const booking = await store.find(id)
    if (!booking || booking.access_token_hash !== await hashToken(token)) throw new BookingError('Booking not found.', 404)
    return booking
  }
  async function reconcile(booking, payment) {
    await store.apply(paymentUpdate(booking, payment))
    return store.find(booking.id)
  }
  function checkout(booking) { return { ...publicBooking(booking), key_id: keyId } }
  async function create(input) {
    const { id, token } = credentials(input)
    const previous = await store.find(id)
    if (previous) {
      if (previous.access_token_hash !== await hashToken(token)) throw new BookingError('Booking not found.', 404)
      if (previous.booking_status === 'cancelled' && !['paid', 'refunded', 'partially_refunded'].includes(previous.payment_status)) throw new BookingError('This booking was cancelled. Please contact the camp before making another payment.', 409)
      if (!previous.razorpay_order_id) throw new BookingError('Payment setup is incomplete. Contact the camp with your booking reference before creating another booking.', 409)
      return checkout(previous)
    }
    const guest = validateGuest(input)
    if (await store.recentCount(guest.email) >= 5) throw new BookingError('Too many booking attempts. Please try again in 15 minutes or contact the camp.', 429)
    const stay = await store.stay(input.stay)
    const quote = quoteStay(stay, guest.guests)
    const booking = {
      id, access_token_hash: await hashToken(token), stay_id: stay.id, stay_name: stay.name,
      ...guest, ...quote, currency: 'INR',
    }
    // Insert before contacting the gateway. The primary key also guards concurrent retries.
    if (!await store.insert(booking)) throw new BookingError('Booking is already being prepared. Use Check payment status in a moment.', 409)
    try {
      const order = await razorpay('/orders', {
        amount: quote.total_amount_paise, currency: 'INR', receipt: id,
        notes: { booking_id: id },
      })
      if (!/^order_[a-zA-Z0-9]+$/.test(order.id || '') || Number(order.amount) !== quote.total_amount_paise || order.currency !== 'INR') throw new BookingError('Payment gateway returned unexpected order details.', 502)
      await store.attachOrder(id, order.id)
      return checkout(await store.find(id))
    } catch (error) {
      // A gateway timeout may have created an order. Never blindly retry order creation.
      try { await store.setupFailed(id) } catch { /* Original failure is reported; admin still has the booking. */ }
      throw error
    }
  }
  async function verify(input) {
    const booking = await owned(input)
    if (!booking.razorpay_order_id || input.razorpay_order_id !== booking.razorpay_order_id || !/^pay_[a-zA-Z0-9]+$/.test(input.razorpay_payment_id || '')) throw new BookingError('Invalid payment reference.')
    if (!await verifyHmac(keySecret, `${booking.razorpay_order_id}|${input.razorpay_payment_id}`, input.razorpay_signature)) throw new BookingError('Invalid payment signature.', 401)
    const payment = await razorpay(`/payments/${input.razorpay_payment_id}`)
    return publicBooking(await reconcile(booking, payment))
  }
  async function status(input) {
    const booking = await owned(input)
    if (!booking.razorpay_order_id) return publicBooking(booking)
    const result = await razorpay(`/orders/${booking.razorpay_order_id}/payments`)
    if (!Array.isArray(result.items)) throw new BookingError('Unable to check payment status.', 502)
    // A failed attempt must not take precedence over a later successful payment.
    const payment = result.items.find(p => ['captured', 'refunded'].includes(p.status)) || result.items.find(p => p.status === 'failed')
    return publicBooking(payment ? await reconcile(booking, payment) : booking)
  }
  async function webhook(rawBody, signature) {
    if (!await verifyHmac(webhookSecret, rawBody, signature)) throw new BookingError('Invalid webhook signature.', 401)
    let event
    try { event = JSON.parse(rawBody) } catch { throw new BookingError('Invalid webhook JSON.') }
    if (!['payment.captured', 'payment.authorized', 'payment.failed', 'order.paid', 'refund.processed'].includes(event?.event)) return { received: true, ignored: true }
    const paymentId = event.payload?.payment?.entity?.id || event.payload?.refund?.entity?.payment_id
    if (!/^pay_[a-zA-Z0-9]+$/.test(paymentId || '')) throw new BookingError('Missing payment ID.')
    // Query the current entity; webhook snapshots can arrive late or out of order.
    const payment = await razorpay(`/payments/${paymentId}`)
    const booking = await store.byOrder(payment.order_id)
    if (!booking) return { received: true, ignored: true } // Other payments in the same Razorpay account.
    await reconcile(booking, payment)
    return { received: true }
  }
  return { create, verify, status, webhook }
}


export function secret(name) {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Missing server configuration: ${name}`)
  return value
}
export function service(webhook = false) {
  const db = createClient(secret('SUPABASE_URL'), secret('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } })
  const keyId = secret('RAZORPAY_KEY_ID')
  const keySecret = secret('RAZORPAY_KEY_SECRET')
  return makeBookingService({
    store: makeStore(db), razorpay: makeRazorpay({ keyId, keySecret }), keyId, keySecret,
    webhookSecret: webhook ? secret('RAZORPAY_WEBHOOK_SECRET') : '',
  })
}


Deno.serve(async request => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    const raw = await request.text()
    if (raw.length > 100000) throw new BookingError('Payload too large.', 413)
    const result = await service(true).webhook(raw, request.headers.get('x-razorpay-signature'))
    return Response.json(result)
  } catch (error) {
    const known = error instanceof BookingError
    if (!known) console.error('Webhook processing failed:', error instanceof Error ? error.message : 'unknown')
    // Non-2xx causes provider retries when reconciliation/database access fails.
    return Response.json({ error: known ? error.message : 'Webhook processing failed.' }, { status: known ? error.status : 500 })
  }
})
