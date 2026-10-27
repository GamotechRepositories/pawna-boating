import { useId, useRef } from 'react'
import Icon from './Icon'

export default function HangingPhotoGallery({ images, backgroundImage }) {
  const trackRef = useRef(null)
  const trackId = useId()
  const move = direction => {
    const track = trackRef.current
    const end = track.scrollWidth - track.clientWidth
    const step = track.firstElementChild.getBoundingClientRect().width
    const target = direction > 0 && track.scrollLeft >= end - 2 ? 0
      : direction < 0 && track.scrollLeft <= 2 ? end
      : track.scrollLeft + direction * step
    track.scrollTo({ left: target, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return (
    <section className="w-full pb-16 md:pb-24" aria-label="Moments from the getaway">
      <div className="relative isolate w-full overflow-hidden bg-forest px-5 pb-12 pt-8 sm:px-10 sm:py-14">
        <img src={backgroundImage} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full scale-110 object-cover blur-sm" />
        <div className="absolute inset-0 -z-10 bg-forest/65" />
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-secondary">A glimpse of the getaway</p>
          <h2 className="font-display text-[28px] leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">See the moments. Feel the escape.</h2>
          <p className="mt-4 leading-7 text-white/85">Little adventures. Favourite people. Memories worth holding on to.</p>
        </div>
        <div role="region" aria-roledescription="carousel" aria-label="Getaway photos" className="relative">
          <svg aria-hidden="true" viewBox="0 0 1000 100" preserveAspectRatio="none" className="photo-rope"><path d="M-20 12 Q500 108 1020 12" fill="none" stroke="#E8D7B7" strokeWidth="9" /><path d="M-20 10 Q500 106 1020 10" fill="none" stroke="#FFF3DC" strokeWidth="2" /></svg>
          <div ref={trackRef} id={trackId} tabIndex={0} aria-label="Swipe or scroll to browse photos" className="hanging-carousel">
            {images.map((photo, index) => <div key={photo.src} className="hanging-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${images.length}`}>
              <figure className="hanging-photo" style={{ '--photo-angle': `${[-3, 3, -4][index % 3]}deg` }}>
                <span aria-hidden="true" className="photo-peg" />
                <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/5] w-full object-contain bg-[#f6f1e8]" />
                <figcaption className="px-1 pb-1 pt-3 text-center font-display text-sm text-mountain sm:text-base">{photo.caption}</figcaption>
              </figure>
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
