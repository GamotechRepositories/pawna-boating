const url = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
let checkoutScript
export async function bookingRequest(action, input) {
  if (!url || !key) throw new Error('Online booking is not configured. Please contact the camp.')
  const response = await fetch(`${url}/functions/v1/booking-checkout`, {
    method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, action }), signal: AbortSignal.timeout(25000),
  })
  let result
  try { result = await response.json() } catch { throw new Error('Booking service is unavailable. Please contact the camp.') }
  if (!response.ok) throw new Error(result.error || 'Unable to process this booking.')
  return result
}
function loadCheckout() {
  if (window.Razorpay) return Promise.resolve()
  if (checkoutScript) return checkoutScript
  checkoutScript = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const fail = () => { clearTimeout(timeout); script.remove(); checkoutScript = null; reject(new Error('Payment checkout could not load. Please check your connection and try again.')) }
    const timeout = setTimeout(fail, 15000)
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => { clearTimeout(timeout); if (window.Razorpay) resolve(); else fail() }
    script.onerror = fail
    document.head.appendChild(script)
  })
  return checkoutScript
}
export async function launchCheckout(order, guest) {
  await loadCheckout()
  return new Promise((resolve, reject) => {
    try {
      const checkout = new window.Razorpay({
        key: order.key_id, order_id: order.razorpay_order_id,
        amount: order.total_amount_paise, currency: order.currency,
        name: 'Pawna Boating & Jungle River Camp', description: `${order.stay_name} · full payment`,
        prefill: { name: guest.name, email: guest.email, contact: guest.phone },
        handler: response => resolve(response),
        modal: { ondismiss: () => resolve(null), confirm_close: true },
        theme: { color: '#087F5B' },
      })
      checkout.open()
    } catch { reject(new Error('Unable to open payment checkout. Your booking reference is saved; please try again.')) }
  })
}
export function newBookingAttempt() {
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  return { booking_id: crypto.randomUUID(), booking_token: Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('') }
}
export async function bookingFingerprint(values) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(values)))
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('')
}
