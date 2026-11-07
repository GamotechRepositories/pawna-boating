import { useState } from 'react'
import { todayISO } from '../utility/dates'
import { useContent } from './useContent'
import { bookingRequest, launchCheckout, newBookingAttempt, bookingFingerprint } from '../services/bookingApi'

const storageKey = 'pawna-booking-attempt'
function restoreAttempt() {
  try { return JSON.parse(sessionStorage.getItem(storageKey)) || null } catch { return null }
}
function paymentMessage(result) {
  if (result.booking_status === 'cancelled') return `Booking ${result.booking_id} is cancelled. Payment status: ${result.payment_status.replaceAll('_', ' ')}. Contact the camp about any refund.`
  if (result.payment_status === 'paid') return `Payment received. Your booking reference is ${result.booking_id}. The camp will confirm availability and your booking separately.`
  if (['refunded', 'partially_refunded'].includes(result.payment_status)) return 'A refund has been recorded for this payment. Contact the camp for booking details.'
  if (result.payment_status === 'setup_failed') return 'Payment setup did not finish. Contact the camp with your reference before making a new booking.'
  if (result.payment_status === 'failed') return 'The payment attempt failed. You can retry payment for the same booking.'
  return 'Payment is not yet confirmed. If money was debited, use Check payment status before trying again.'
}
export default function useVisitController() {
  const { data: stays } = useContent('staying_experiences')
  const [values, setValues] = useState(() => ({ name: '', phone: '', email: '', date: '', guests: '2', stay: new URLSearchParams(window.location.search).get('stay') || 'camping', notes: '' }))
  const [attempt, setAttempt] = useState(restoreAttempt)
  const [receipt, setReceipt] = useState(() => restoreAttempt()?.summary || null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [phase, setPhase] = useState('')
  function remember(next) {
    setAttempt(next)
    try { sessionStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* Checkout still works without session storage. */ }
  }
  function record(result, current) {
    setReceipt(result); remember({ ...current, summary: result }); setMessage(paymentMessage(result))
  }
  function update(event) {
    setValues(previous => ({ ...previous, [event.target.name]: event.target.value }))
    setMessage('')
  }
  async function submit(event) {
    event.preventDefault()
    if (busy) return
    if (!stays.some(stay => stay.id === values.stay)) { setMessage('Please choose an available stay.'); return }
    if (!values.name.trim()) { setMessage('Please enter your name.'); return }
    if (values.date < todayISO()) { setMessage('Choose today or a future date.'); return }
    setBusy(true); setMessage(''); setPhase('Preparing booking…')
    let current
    try {
      const fingerprint = await bookingFingerprint(values)
      if (attempt && attempt.fingerprint !== fingerprint && !window.confirm('You have an earlier booking attempt. If you already paid, check its payment status before starting another booking. Start a new booking?')) return
      current = attempt?.fingerprint === fingerprint ? attempt : { ...newBookingAttempt(), fingerprint }
      remember(current)
      const order = await bookingRequest('create', { ...values, ...current })
      setReceipt(order); remember({ ...current, summary: order })
      if (['paid', 'refunded', 'partially_refunded'].includes(order.payment_status)) { record(order, current); return }
      setPhase('Complete payment in Razorpay…')
      const response = await launchCheckout(order, values)
      if (!response) { setMessage('Checkout closed. Your booking is saved as awaiting payment. If money was debited, check payment status before retrying.'); return }
      setPhase('Verifying payment…')
      record(await bookingRequest('verify', { ...current, ...response }), current)
    } catch (error) {
      setMessage(`${error.message || 'Booking could not be completed.'} If you paid, use Check payment status before retrying.${current ? ` Reference: ${current.booking_id}` : ''}`)
    } finally { setBusy(false); setPhase('') }
  }
  async function checkPayment() {
    if (!attempt || busy) return
    setBusy(true); setPhase('Checking payment…'); setMessage('')
    try { record(await bookingRequest('status', attempt), attempt) }
    catch (error) { setMessage(`${error.message} Please contact the camp if you were charged.`) }
    finally { setBusy(false); setPhase('') }
  }
  function startNew() {
    if (!window.confirm('Start a new booking? Keep your earlier booking reference if you paid.')) return
    setAttempt(null); setReceipt(null); setMessage('')
    try { sessionStorage.removeItem(storageKey) } catch { /* Optional browser storage. */ }
  }
  return { values, message, busy, phase, receipt, attempt, update, submit, checkPayment, startNew }
}
