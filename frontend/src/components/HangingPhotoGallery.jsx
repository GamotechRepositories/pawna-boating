import { useRef, useState } from 'react'
import { AnimatePresence, motion as Motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'

export default function HangingPhotoGallery({ images }) {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], ['-15%', '35%'])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120])
  const glowX = useTransform(scrollYProgress, [0, 1], ['15%', '-25%'])

  useMotionValueEvent(scrollYProgress, 'change', progress => {
    setActiveIndex(Math.min(images.length - 1, Math.max(0, Math.floor(progress * images.length))))
  })

  if (!images.length) return null
  const photo = images[activeIndex] || images[0]

  return (
    <section
      ref={sectionRef}
      aria-label="Moments from the getaway"
      className="relative w-full photo-gallery-sky text-[#4B2E1F]"
      style={{ height: `${Math.max(1, images.length) * 80 + 100}vh` }}
    >
      <div className="photo-gallery-sky sticky top-20 isolate">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Motion.div className="gallery-glow gallery-glow-green" style={reducedMotion ? undefined : { y: glowY }} />
          <Motion.div className="gallery-glow gallery-glow-gold" style={reducedMotion ? undefined : { x: glowX }} />
          <div className="gallery-dot-grid" />
          <Motion.div className="gallery-orbit" style={reducedMotion ? undefined : { rotate: ringRotate }}><span /></Motion.div>
          <svg className="gallery-ferris-wheel" viewBox="0 0 480 560" fill="none">
            <path d="M240 248 126 532M240 248l114 284M98 534h284" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            <path d="m164 440 152 0" stroke="currentColor" strokeWidth="4" />
            <g className="gallery-wheel-rotor">
              <circle cx="240" cy="240" r="196" stroke="currentColor" strokeWidth="5" />
              <circle cx="240" cy="240" r="176" stroke="currentColor" strokeWidth="2" />
              {Array.from({ length: 12 }, (_, index) => {
                const angle = index * Math.PI / 6
                const x = 240 + Math.sin(angle) * 196
                const y = 240 - Math.cos(angle) * 196
                return <g key={index}>
                  <path d={`M240 240 ${x} ${y}`} stroke="currentColor" strokeWidth="2" />
                  <circle cx={x} cy={y} r="5" fill="currentColor" />
                  <g className="gallery-wheel-cabin" style={{ transformOrigin: `${x}px ${y}px` }}>
                    <path d={`M${x} ${y}v12`} stroke="currentColor" strokeWidth="3" />
                    <rect x={x - 14} y={y + 12} width="28" height="24" rx="6" stroke="currentColor" strokeWidth="3" fill="#a8dcf7" />
                    <path d={`M${x - 14} ${y + 22}h28`} stroke="currentColor" strokeWidth="2" />
                  </g>
                </g>
              })}
              <circle cx="240" cy="240" r="12" fill="currentColor" />
            </g>
          </svg>
        </div>
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-6 px-5 py-6 sm:px-10 md:grid-cols-2 md:gap-16 md:py-10">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#4B2E1F]/70">Moments from the getaway</p>
          <h2 className="section-title text-[#4B2E1F]">See the moments. Feel the escape.</h2>
          <p className="mt-5 max-w-md leading-7 text-[#4B2E1F]/85">Little adventures. Favourite people. Memories worth holding on to.</p>
          <p className="mt-6 text-sm text-[#4B2E1F]/65">Scroll down to explore our getaway.</p>
          <div className="mt-6 flex gap-2" aria-hidden="true">
            {images.map((image, index) => (
              <span key={`${image.src}-${index}`} className={`h-1 rounded-full transition-all motion-reduce:transition-none ${index === activeIndex ? 'w-10 bg-secondary' : 'w-5 bg-[#12365b]/20'}`} />
            ))}
          </div>
        </div>
        <figure className="m-0 min-w-0">
          <div className="relative flex h-[42svh] items-center justify-center md:h-[65svh]">
            <AnimatePresence initial={false}>
            <Motion.div
              key={photo.src}
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -16, scale: reducedMotion ? 1 : 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img src={photo.src} alt={photo.alt} className="h-auto max-h-full w-auto max-w-full rounded-2xl object-contain" />
            </Motion.div>
            </AnimatePresence>
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-[#4B2E1F]/85">
            <span>{photo.caption}</span>
            <span className="tabular-nums text-[#4B2E1F]/60">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          </figcaption>
        </figure>
      </div>
      </div>
    </section>
  )
}
