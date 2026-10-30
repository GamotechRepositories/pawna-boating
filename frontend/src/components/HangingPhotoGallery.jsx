import { useEffect, useId, useRef } from 'react'
import { motion as Motion, useReducedMotion } from 'motion/react'
import Icon from './Icon'

export default function HangingPhotoGallery({ images, backgroundImage }) {
  const reducedMotion = useReducedMotion()
  const trackRef = useRef(null)
  const trackId = useId()
  const looping = images.length > 1
  const slides = looping ? [...images, ...images, ...images] : images

  useEffect(() => {
    const track = trackRef.current
    if (!looping) return
    let timer
    const cycleWidth = () => track.firstElementChild.getBoundingClientRect().width * images.length
    const reset = () => track.scrollTo({ left: cycleWidth(), behavior: 'instant' })
    const normalize = () => {
      const width = cycleWidth()
      if (width && (track.scrollLeft < width || track.scrollLeft >= width * 2)) {
        track.scrollTo({ left: width + ((track.scrollLeft % width) + width) % width, behavior: 'instant' })
      }
    }
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(normalize, 180)
    }
    reset()
    track.addEventListener('scroll', onScroll, { passive: true })
    const observer = new ResizeObserver(reset)
    observer.observe(track)
    return () => {
      clearTimeout(timer)
      track.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [images.length, looping])

  const move = direction => {
    const track = trackRef.current
    const step = track.firstElementChild.getBoundingClientRect().width
    track.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return (
    <section className="w-full" aria-label="Moments from the getaway">
      <div className="relative isolate w-full overflow-hidden bg-forest px-5 pb-12 pt-8 sm:px-10 sm:py-14">
        <img src={backgroundImage} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full scale-110 object-cover blur-sm" />
        <div className="absolute inset-0 -z-10 bg-forest/40" />
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-secondary">A glimpse of the getaway</p>
          <h2 className="section-title text-white">See the moments. Feel the escape.</h2>
          <p className="mt-4 leading-7 text-white/85">Little adventures. Favourite people. Memories worth holding on to.</p>
        </div>
        <div role="region" aria-roledescription="carousel" aria-label="Getaway photos" className="relative">
          <svg aria-hidden="true" viewBox="0 0 1000 100" preserveAspectRatio="none" className="photo-rope"><path d="M-20 12 Q500 108 1020 12" fill="none" stroke="#E8D7B7" strokeWidth="9" /><path d="M-20 10 Q500 106 1020 10" fill="none" stroke="#FFF3DC" strokeWidth="2" /></svg>
          <div ref={trackRef} id={trackId} tabIndex={0} aria-label="Swipe or scroll to browse photos" className="hanging-carousel">
            {slides.map((photo, index) => <div key={`${photo.src}-${index}`} className="hanging-slide" role="group" aria-roledescription="slide" aria-label={`${index % images.length + 1} of ${images.length}`}>
              <Motion.figure
                className="hanging-photo"
                initial={reducedMotion ? false : { opacity: 0, y: 28, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-3, 3, -4][(index % images.length) % 3] }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={reducedMotion ? undefined : { y: -8, rotate: 0, scale: 1.02 }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span aria-hidden="true" className="photo-peg" />
                <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/5] w-full object-contain bg-[#f6f1e8]" />
                <figcaption className="px-1 pb-1 pt-3 text-center font-display text-sm text-mountain sm:text-base">{photo.caption}</figcaption>
              </Motion.figure>
            </div>)}
          </div>
          {images.length > 1 && <div className="mt-4 flex justify-center gap-4">
            <button type="button" aria-label="Previous photos" aria-controls={trackId} onClick={() => move(-1)} className="flex size-12 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white/15"><Icon className="size-5 rotate-180" /></button>
            <button type="button" aria-label="Next photos" aria-controls={trackId} onClick={() => move(1)} className="flex size-12 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white/15"><Icon /></button>
          </div>}
        </div>
        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[.2em] text-white/90 sm:text-sm">A few moments. A whole lot of memories.</p>
      </div>
    </section>
  )
}
