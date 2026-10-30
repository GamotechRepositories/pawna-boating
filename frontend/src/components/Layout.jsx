import { AnimatePresence, motion as Motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { navigation } from '../utility/content'
import Icon from './Icon'
import Button from './Button'
import Logo from './Logo'
export default function Layout({ children, path }) {
  const reducedMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const isHome = path === '/'
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const transparentHeader = isHome && !scrolled

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-4">Skip to content</a><header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${transparentHeader ? 'bg-gradient-to-b from-forest/85 to-transparent text-white' : 'border-b border-sand bg-warm text-forest shadow-sm'}`}><div className="page-width flex h-16 items-center sm:h-20 justify-between gap-5"><Logo /><nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">{navigation.map(item => <a key={item.path} href={item.path} aria-current={path === item.path ? 'page' : undefined} className={`py-2 text-[13px] sm:text-sm font-medium ${transparentHeader ? (path === item.path ? 'border-b-2 border-primary text-white' : 'text-white/85 hover:text-secondary') : (path === item.path ? 'border-b-2 border-primary text-mountain' : 'text-forest/75 hover:text-jungle')}`}>{item.label}</a>)}</nav><div className="hidden sm:block"><Button href="/plan-your-visit">Plan your escape</Button></div><button className="p-3 lg:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button></div><AnimatePresence>{open && <Motion.nav initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }} id="mobile-nav" aria-label="Mobile navigation" className={`page-width flex flex-col gap-1 pb-6 lg:hidden ${transparentHeader ? 'bg-forest text-white' : ''}`}>{navigation.map(item => <a key={item.path} href={item.path} aria-current={path === item.path ? 'page' : undefined} className={`rounded-lg p-3 ${transparentHeader ? 'hover:bg-white/10' : 'hover:bg-sand'}`}>{item.label}</a>)}</Motion.nav>}</AnimatePresence></header>{!isHome && <div aria-hidden="true" className="h-16 sm:h-20" />}<main id="main-content">{children}</main><footer className="bg-forest text-warm">
      <div className="page-width py-6 sm:py-14">
        <div className="flex flex-col gap-4 border-b border-white/15 pb-6 sm:gap-8 sm:pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Logo />
            <div>
              <p className="font-display text-2xl sm:text-3xl">Pawna</p>
              <p className="mt-1 text-xs leading-5 text-white/65 sm:text-sm">Boating &amp; Jungle River Camp</p>
            </div>
          </div>
          <p className="max-w-sm font-display text-2xl leading-snug text-white/90 sm:text-right sm:text-3xl">A little adventure.<br /><span className="text-turmeric">A whole lot of memories.</span></p>
        </div>
        <div className="grid gap-6 py-6 sm:gap-10 sm:py-10 md:grid-cols-[1fr_1.25fr] md:gap-16">
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-8">
            <div className="min-w-0">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-turmeric">Explore Pawna</h2>
            <nav aria-label="Footer navigation" className="grid gap-y-0 sm:gap-y-1">
              {navigation.map(item => <a key={item.path} href={item.path} className="flex min-h-11 items-center text-sm text-white/80 transition-colors hover:text-turmeric">{item.label}</a>)}
            </nav>
            </div>
            <div className="min-w-0">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-turmeric">Find us</h2>
              <address className="flex max-w-sm items-start gap-2 text-sm not-italic leading-6 text-white/80"><Icon name="location" className="mt-1 size-4 shrink-0 text-turmeric" /><span>Pawna Dam, Pawna Riverside,<br />Yelse Gaon, Lonavala</span></address>
              <h2 className="mb-2 mt-3 sm:mt-5 text-xs font-bold uppercase tracking-[.18em] text-turmeric">Book your stay</h2>
              <div className="flex flex-wrap gap-x-5">
                {['9975212123', '9689151919', '9823900620'].map(number => <a key={number} href={`tel:+91${number}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-white/80 transition-colors hover:text-turmeric"><Icon name="phone" className="size-4 shrink-0 text-turmeric" />{number}</a>)}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-turmeric">Your next getaway</p>
            <h2 className="font-display text-2xl leading-tight sm:text-3xl">Make time for the outdoors.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">Find your stay, pick your adventures, and bring your favourite people along.</p>
            <div className="mt-4 sm:mt-6"><Button href="/plan-your-visit">Let’s make a plan</Button></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/15 pt-4 sm:gap-3 sm:pt-6 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pawna. All rights reserved.</p>
          <p className="flex items-center gap-2"><Icon name="sun" className="size-4 text-turmeric" /> Nature is calling. Take your time.</p>
        </div>
      </div>
    </footer></>
}
