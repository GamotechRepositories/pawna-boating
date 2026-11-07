import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminBookings from '../components/AdminBookings'
import { supabase } from '../services/supabase'
import { sections, editValues, buildPayload } from '../utility/adminContent'

const button = 'min-h-11 rounded-lg border border-sand px-4 py-2 font-semibold transition-colors hover:bg-sand disabled:cursor-wait disabled:opacity-50'
const primary = `${button} bg-jungle text-white hover:bg-forest`

function ContentEditor({ table, row, onDone, onCancel, onBusy }) {
  const [values, setValues] = useState(() => editValues(table, row))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const update = event => setValues(previous => ({ ...previous, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }))
  async function save(event) {
    event.preventDefault()
    setError(''); setBusy(true); onBusy(true)
    try {
      const payload = buildPayload(table, values, row?.id)
      const query = row ? supabase.from(table).update(payload).eq('id', row.id) : supabase.from(table).insert(payload)
      const { data, error } = await query.select('id')
      if (error) throw error
      if (!data?.length) throw new Error('Nothing was saved. Check that you still have admin access.')
      onDone('Changes saved. Refresh the website to see them.')
    } catch (error) { setError(error.message) }
    finally { setBusy(false); onBusy(false) }
  }
  return <form onSubmit={save} className="rounded-2xl border border-sand bg-white p-5 sm:p-8">
    <h2 className="font-display text-2xl">{row ? 'Edit' : 'Add'} {sections[table].singular}</h2>
    <p className="mt-2 text-sm text-forest/70">Published content appears on your website. Save as a draft to keep it hidden.</p>
    <fieldset disabled={busy} className="mt-6 grid gap-5 sm:grid-cols-2">
      {sections[table].fields.map(([label, key, type, required]) => <label key={key} className={`field-label ${['textarea', 'lines'].includes(type) ? 'sm:col-span-2' : ''}`}>{label}
        {['textarea', 'lines'].includes(type) ? <textarea name={key} rows={type === 'lines' ? 7 : 4} required={required} maxLength={key === 'text' ? 5000 : undefined} value={values[key]} onChange={update} />
          : ['unit', 'icon'].includes(type) ? <select name={key} value={values[key]} onChange={update}>{(type === 'unit' ? ['per person', 'per couple'] : [...new Set(['tent', 'home', values[key]])]).map(option => <option key={option}>{option}</option>)}</select>
          : <input name={key} type={['money', 'rating'].includes(type) ? 'number' : type === 'url' ? 'url' : 'text'} required={required} disabled={key === 'id' && Boolean(row)} min={type === 'rating' ? 1 : type === 'money' ? 0 : undefined} max={type === 'rating' ? 5 : undefined} step={type === 'money' ? '0.01' : type === 'rating' ? '1' : undefined} maxLength={key === 'name' && table === 'reviews' ? 120 : undefined} value={values[key]} onChange={update} />}
      </label>)}
      <label className="field-label">Display order<input name="sort_order" type="number" step="1" required value={values.sort_order} onChange={update} /><span className="text-xs font-normal">Lower numbers appear first.</span></label>
      <label className="flex min-h-11 items-center gap-3 self-center"><input name="is_published" type="checkbox" className="size-5 accent-jungle" checked={values.is_published} onChange={update} />Published on website</label>
    </fieldset>
    {error && <p role="alert" className="mt-5 text-red-700">{error}</p>}
    <div className="mt-6 flex flex-wrap gap-3"><button disabled={busy} className={primary}>{busy ? 'Saving…' : 'Save changes'}</button><button type="button" disabled={busy} onClick={onCancel} className={button}>Cancel</button></div>
  </form>
}

function ContentManager() {
  const [table, setTable] = useState('staying_experiences')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editor, setEditor] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [busy, setBusy] = useState(false)
  const [version, setVersion] = useState(0)
  useEffect(() => {
    let active = true
    supabase.from(table).select('*').order('sort_order').order('id').then(({ data, error }) => {
      if (!active) return
      setRows(data || []); setError(error?.message || ''); setLoading(false)
    }).catch(error => { if (active) { setError(error.message); setLoading(false) } })
    return () => { active = false }
  }, [table, version])
  function reload() { setLoading(true); setVersion(value => value + 1) }
  async function remove() {
    setBusy(true); setError('')
    try {
      const { data, error } = await supabase.from(table).delete().eq('id', deleting.id).select('id')
      if (error) throw error
      if (!data?.length) throw new Error('Nothing was deleted. Check your admin access.')
      setDeleting(null); setMessage('Content deleted.'); reload()
    } catch (error) { setError(error.message) }
    finally { setBusy(false) }
  }
  return <>
    <nav aria-label="Content sections" className="mb-6 flex flex-wrap gap-2">{Object.entries(sections).map(([key, section]) => <button key={key} disabled={busy} aria-current={key === table ? 'page' : undefined} className={key === table ? primary : button} onClick={() => {
      if (editor && !window.confirm('Discard the current unsaved edits?')) return
      setTable(key); setEditor(null); setDeleting(null); setRows([]); setLoading(true); setMessage(''); setError(''); setVersion(value => value + 1)
    }}>{section.label}</button>)}</nav>
    {message && <p role="status" className="mb-5 rounded-lg bg-jungle/10 p-4">{message}</p>}
    {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
    {editor ? <ContentEditor key={`${table}-${editor.row?.id || 'new'}`} table={table} row={editor.row} onBusy={setBusy} onCancel={() => { if (window.confirm('Discard unsaved edits?')) setEditor(null) }} onDone={message => { setEditor(null); setMessage(message); reload() }} /> : <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-display text-2xl">{sections[table].label}</h2><p className="mt-1 text-sm text-forest/70">Manage drafts and published content.</p></div><div className="flex gap-2"><button className={button} disabled={loading || busy} onClick={reload}>Refresh</button><button className={primary} disabled={busy} onClick={() => { setEditor({ row: null }); setMessage('') }}>Add {sections[table].singular}</button></div></div>
      {loading ? <p role="status" className="py-10">Loading content…</p> : !rows.length ? <p className="rounded-xl border border-sand bg-white p-8">No content yet. Add your first {sections[table].singular}.</p> : <ul className="space-y-3">{rows.map(row => <li key={row.id} className="rounded-xl border border-sand bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div className="min-w-0"><h3 className="break-words font-semibold">{row.name || row.title}</h3><p className="mt-1 text-sm text-forest/70">{row.is_published ? 'Published' : 'Draft'} · Order {row.sort_order}{row.price !== undefined ? ` · ₹${Number(row.price).toLocaleString('en-IN')} ${row.price_unit}` : ''}</p></div><div className="flex gap-2"><button disabled={busy} className={button} aria-label={`Edit ${row.name || row.title}`} onClick={() => { setEditor({ row }); setMessage('') }}>Edit</button><button disabled={busy} className={`${button} text-red-700`} aria-label={`Delete ${row.name || row.title}`} onClick={() => setDeleting(row)}>Delete</button></div></div>
        {deleting?.id === row.id && <div className="mt-4 border-t border-sand pt-4"><p>Delete “{row.name || row.title}”? This cannot be undone.</p><div className="mt-3 flex gap-2"><button disabled={busy} className={`${button} bg-red-700 text-white hover:bg-red-800`} onClick={remove}>{busy ? 'Deleting…' : 'Confirm delete'}</button><button disabled={busy} className={button} onClick={() => setDeleting(null)}>Keep content</button></div></div>}
      </li>)}</ul>}
    </>}
  </>
}

function AdminDashboard() {
  const [section, setSection] = useState('bookings')
  return <><nav aria-label="Admin workspace" className="mb-8 flex flex-wrap gap-3">{['bookings', 'content'].map(value => <button key={value} className={section === value ? primary : button} aria-current={section === value ? 'page' : undefined} onClick={() => {
    if (section === 'content' && value !== section && !window.confirm('Leave content editing? Unsaved changes will be discarded.')) return
    setSection(value)
  }}>{value === 'bookings' ? 'Bookings' : 'Website content'}</button>)}</nav>{section === 'bookings' ? <AdminBookings /> : <ContentManager />}</>
}

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [access, setAccess] = useState({ userId: null, allowed: false, error: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!supabase) return
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { setSession(session); setAuthReady(true) })
    return () => data.subscription.unsubscribe()
  }, [])
  const userId = session?.user.id
  useEffect(() => {
    if (!userId) return
    let active = true
    supabase.from('admin_users').select('user_id').eq('user_id', userId).maybeSingle().then(({ data, error }) => {
      if (active) setAccess({ userId, allowed: Boolean(data) && !error, error: error?.message || '' })
    }).catch(error => { if (active) setAccess({ userId, allowed: false, error: error.message }) })
    return () => { active = false }
  }, [userId])
  async function login(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (error) throw error
      setPassword('')
    } catch (error) { setError(error.message) }
    finally { setBusy(false) }
  }
  async function logout() {
    setBusy(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setAccess({ userId: null, allowed: false, error: '' })
    } catch (error) { setError(error.message) }
    finally { setBusy(false) }
  }
  return <div className="min-h-screen bg-river-surface text-forest"><header className="border-b border-sand bg-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-8"><div><p className="text-xs font-semibold uppercase tracking-widest text-jungle">Pawna Boating & Jungle River Camp</p><h1 className="mt-1 font-display text-2xl sm:text-3xl">Camp admin</h1></div><div className="flex flex-wrap items-center gap-3"><Link to="/" className={button}>View website</Link>{session && <button className={button} disabled={busy} onClick={logout}>Sign out</button>}</div></div></header>
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      {error && <p role="alert" className="mb-5 text-red-700">{error}</p>}
      {!supabase ? <p>Configure the Supabase URL and publishable key to use the admin panel.</p> : !authReady ? <p role="status">Checking sign-in…</p> : !session ? <form onSubmit={login} className="mx-auto max-w-md rounded-2xl border border-sand bg-white p-6 sm:p-8"><h2 className="font-display text-2xl">Welcome back</h2><p className="mt-2 text-sm text-forest/70">Sign in with your approved admin account.</p><fieldset disabled={busy} className="mt-6 space-y-5"><label className="field-label">Email<input type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} /></label><label className="field-label">Password<input type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></label><button className={`${primary} w-full`}>{busy ? 'Signing in…' : 'Sign in'}</button></fieldset></form>
        : access.userId !== userId ? <p role="status">Checking admin access…</p> : !access.allowed ? <div className="rounded-xl border border-sand bg-white p-6"><h2 className="text-xl font-semibold">Admin access required</h2><p className="mt-3">Your account is signed in but does not have access to this panel. Ask the project owner to approve your account.</p>{access.error && <p role="alert" className="mt-3 text-red-700">Access check failed. Ensure the admin migration has been applied, then reload.</p>}</div> : <AdminDashboard key={userId} />}
    </main></div>
}
