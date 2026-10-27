import { useState } from 'react'

export default function ImageCarousel({ images, className = '' }) {
  const [index, setIndex] = useState(0)
  if (!images.length) return null
  const current = index % images.length
  const move = direction => setIndex((current + direction + images.length) % images.length)

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Pawna adventures"
      className={className}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}
    >
      <div className="isolate grid px-8 pb-10 pt-6 sm:px-12 sm:pt-8">
        {images.map((image, slideIndex) => {
          const isFront = current === slideIndex
          return <button
            key={image.src}
            type="button"
            aria-label={`Bring image ${slideIndex + 1} to front: ${image.alt}`}
            aria-pressed={isFront}
            onClick={() => setIndex(slideIndex)}
            className={`col-start-1 row-start-1 w-[76%] self-center overflow-hidden rounded-2xl border-4 border-white bg-white text-left shadow-xl transition-transform duration-500 motion-reduce:transition-none ${isFront ? 'relative z-10 justify-self-end translate-y-3 rotate-[4deg]' : 'relative z-0 justify-self-start -translate-y-2 -rotate-[4deg] hover:-translate-y-4'}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" className="block aspect-[4/5] w-full object-contain" />
          </button>
        })}
      </div>
      <p aria-live="polite" aria-atomic="true" className="sr-only">Image {current + 1} of {images.length}</p>
    </div>
  )
}
