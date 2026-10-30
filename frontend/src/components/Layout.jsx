import { AnimatePresence, motion as Motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { navigation } from '../utility/content'
import Icon from './Icon'
import Button from './Button'
import Logo from './Logo'
import safetyMascot from '../assets/safety-mascot.png'
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
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-4">Skip to content</a><header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${transparentHeader ? 'bg-gradient-to-b from-forest/85 to-transparent text-white' : 'border-b border-sand bg-warm text-forest shadow-sm'}`}><div className="page-width flex h-16 items-center sm:h-20 justify-between gap-5"><Logo /><nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">{navigation.map(item => <a key={item.path} href={item.path} aria-current={path === item.path ? 'page' : undefined} className={`py-2 text-[13px] sm:text-sm font-medium ${transparentHeader ? (path === item.path ? 'border-b-2 border-primary text-white' : 'text-white/85 hover:text-secondary') : (path === item.path ? 'border-b-2 border-primary text-mountain' : 'text-forest/75 hover:text-jungle')}`}>{item.label}</a>)}</nav><div className="hidden sm:block"><Button href="/plan-your-visit">Plan your escape</Button></div><button className="p-3 lg:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button></div><AnimatePresence>{open && <Motion.nav initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }} id="mobile-nav" aria-label="Mobile navigation" className={`page-width flex flex-col gap-1 pb-6 lg:hidden ${transparentHeader ? 'bg-forest text-white' : ''}`}>{navigation.map(item => <a key={item.path} href={item.path} aria-current={path === item.path ? 'page' : undefined} className={`rounded-lg p-3 ${transparentHeader ? 'hover:bg-white/10' : 'hover:bg-sand'}`}>{item.label}</a>)}</Motion.nav>}</AnimatePresence></header>{!isHome && <div aria-hidden="true" className="h-16 sm:h-20" />}<main id="main-content">{children}</main>{isHome && <>

      <section aria-labelledby="safety-heading" className="relative bg-gradient-to-b from-[#082a55] to-[#0B59BE]">
        <div className="page-width relative flex min-h-[140px] items-center gap-2 py-3 sm:min-h-[360px] sm:gap-8 sm:py-10">
          <img src={safetyMascot} alt="Friendly lion safety mascot wearing a yellow hard hat" width="1024" height="1536" loading="lazy" className="relative z-20 -mt-12 w-[30%] max-w-64 shrink-0 self-start object-contain drop-shadow-xl sm:-mt-28 sm:self-end" />
          <h2 id="safety-heading" className="relative z-10 min-w-0 font-sans text-[clamp(.75rem,3.6vw,1.5rem)] font-black uppercase leading-tight text-white sm:text-[clamp(1.35rem,4.5vw,4.5rem)]">
            <span className="block whitespace-nowrap">Great Times Begin</span>
            <span className="mt-2 inline-block -skew-x-6 whitespace-nowrap bg-primary px-3 py-2 text-black sm:px-6"><span className="inline-block skew-x-6">With Safety</span></span>
          </h2>
        </div>
      </section>
</>}<footer className="bg-forest text-warm">
      <div className="page-width py-4 sm:py-8">
        <div className="flex flex-col gap-4 border-b border-white/15 pb-4 sm:gap-6 sm:pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Logo />
            <div>
              <p className="font-display text-2xl sm:text-3xl">Pawna</p>
              <p className="mt-1 text-xs leading-5 text-white/65 sm:text-sm">Boating &amp; Jungle River Camp</p>
            </div>
          </div>
          <p className="max-w-sm font-display text-2xl leading-snug text-white/90 sm:text-right sm:text-3xl">A little adventure.<br /><span className="text-turmeric">A whole lot of memories.</span></p>
        </div>
        <div className="grid gap-4 py-4 sm:gap-6 sm:py-6 md:grid-cols-[1fr_1.25fr] md:gap-10">
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-8">
            <div className="col-span-2 mb-2">
              <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-turmeric"><Icon name="location" className="size-4 shrink-0" />Find us</h2>
              <address className="overflow-x-auto whitespace-nowrap text-sm not-italic leading-6 text-white/80">Pawna Dam, Pawna Riverside, Yelse Gaon, Lonavala</address>
            </div>
            <div className="min-w-0">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-turmeric"><Icon name="compass" className="size-4 shrink-0" />Explore Pawna</h2>
            <nav aria-label="Footer navigation" className="grid gap-y-0 sm:gap-y-1">
              {navigation.map(item => <a key={item.path} href={item.path} className="flex min-h-11 items-center text-sm text-white/80 transition-colors hover:text-turmeric">{item.label}</a>)}
            </nav>
            </div>
            <div className="min-w-0">
              <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-turmeric"><Icon name="calendar" className="size-4 shrink-0" />Book Your Stay</h2>
              <div className="flex flex-wrap gap-x-5 md:flex-col md:items-start">
                {['9975212123', '9689151919', '9823900620'].map(number => <a key={number} href={`tel:+91${number}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-white/80 transition-colors hover:text-turmeric"><Icon name="phone" className="size-4 shrink-0 text-turmeric" />{number}</a>)}
              </div>
              
            </div>
          </div>
          <div className="self-start rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-turmeric">Your next getaway</p>
            <h2 className="font-display text-2xl leading-tight sm:text-3xl">Make time for the outdoors.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">Find your stay, pick your adventures, and bring your favourite people along.</p>
            <div className="mt-4 sm:mt-6"><Button href="/plan-your-visit">Let’s make a plan</Button></div>
          </div>
        </div>
        <section aria-labelledby="footer-social-heading" className="border-t border-white/15 py-4 sm:py-5">
          <h2 id="footer-social-heading" className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-turmeric">Stay connected</h2>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {[
              { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/pawna.boating.camping' },
              { label: 'WhatsApp', icon: 'chat', href: 'https://wa.me/919975212123' },
              { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/pawnaboatingcamping' },
            ].map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-full border border-white/20 px-2 text-[11px] text-white/85 transition-colors hover:border-turmeric hover:bg-white/5 hover:text-turmeric sm:gap-2 sm:px-4 sm:text-sm"><Icon name={social.icon} className="size-4 shrink-0" />{social.label}<Icon name="arrow" className="ml-1 hidden size-4 -rotate-45 sm:block" /></a>)}
          </div>
        </section>
        <div className="flex flex-col gap-2 border-t border-white/15 pt-3 sm:gap-3 sm:pt-4 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pawna. All rights reserved.</p>
          <p className="flex items-center gap-2"><Icon name="sun" className="size-4 text-turmeric" /> Nature is calling. Take your time.</p>
        </div>
      </div>
    </footer></>
}
