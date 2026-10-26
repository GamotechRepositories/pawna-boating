import { useState } from 'react'
import { todayISO } from '../utility/dates'
import { stays } from '../utility/content'

const storageKey = 'paluma-visit-plan'
export default function useVisitController() {
  const [values, setValues] = useState(() => {
    const selected = new URLSearchParams(window.location.search).get('stay')
    const initial = { name: '', email: '', date: '', guests: '2', stay: stays.some(item => item.id === selected) ? selected : 'camping', notes: '' }
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey))
      if (saved && typeof saved === 'object') {
        Object.keys(initial).forEach(key => { if (typeof saved[key] === 'string') initial[key] = saved[key] })
        if (stays.some(item => item.id === selected)) initial.stay = selected
      }
    } catch { /* A visit can still be planned when browser storage is unavailable. */ }
    return initial
  })
  const [message, setMessage] = useState('')
  const [saved, setSaved] = useState(false)
  function update(event) {
    setValues(previous => ({ ...previous, [event.target.name]: event.target.value }))
    setMessage('')
    setSaved(false)
  }
  function submit(event) {
    event.preventDefault()
    if (!values.name.trim()) { setMessage('Please enter your name.'); return }
    if (values.date < todayISO()) { setMessage('Choose today or a future date.'); return }
    try {
      localStorage.setItem(storageKey, JSON.stringify(values))
      setSaved(true)
      setMessage('Your visit plan is saved in this browser. It has not been sent to the camp and is not a confirmed booking.')
    } catch {
      setMessage('Your browser could not save this plan. You can download a copy below.')
    }
  }
  function download() {
    const stay = stays.find(item => item.id === values.stay)?.name || values.stay
    const contents = `PALUMA — VISIT PLAN\n\nName: ${values.name}\nEmail: ${values.email}\nPreferred date: ${values.date}\nGuests: ${values.guests}\nStay: ${stay}\nNotes: ${values.notes}\n\nThis is a personal plan, not a confirmed reservation. Contact the camp to check availability and rates.`
    const url = URL.createObjectURL(new Blob([contents], { type: 'text/plain' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'paluma-visit-plan.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return { values, message, saved, update, submit, download }
}
