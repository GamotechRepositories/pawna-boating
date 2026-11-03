import { useId, useState } from 'react'

export default function StayGallery({ images, name }) {
  const [index, setIndex] = useState(0)
  const imageId = useId()
  const hasMultipleImages = images.length > 1

  return (
    <div className="flex min-w-0 flex-col justify-center border-b border-sand bg-warm lg:border-b-0 lg:border-r" role="region" aria-label={`${name} photo gallery`}>
      <div className="relative">
        <img id={imageId} src={images[index]} alt={`${name} — photo ${index + 1} of ${images.length}`} className="h-72 w-full object-contain sm:h-96" />
        {hasMultipleImages && <p aria-live="polite" aria-atomic="true" className="absolute bottom-3 right-3 rounded-full bg-forest/85 px-3 py-1.5 text-xs font-semibold tabular-nums text-white">{index + 1} / {images.length}</p>}
      </div>
      {hasMultipleImages && <div className="border-t border-sand px-2 py-3 sm:px-4">
        <div className="grid grid-cols-4 gap-2 lg:flex lg:justify-center" role="group" aria-label="Choose a stay photo">
          {images.map((src, photoIndex) => <button
            key={src}
            type="button"
            aria-label={`Show ${name} photo ${photoIndex + 1}`}
            aria-controls={imageId}
            aria-pressed={index === photoIndex}
            onClick={() => setIndex(photoIndex)}
            className={`min-h-11 min-w-0 overflow-hidden rounded-lg border-2 bg-white transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-jungle lg:h-14 lg:w-20 lg:shrink-0 ${index === photoIndex ? 'border-jungle' : 'border-sand hover:border-jungle/50'}`}
          >
            <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-contain lg:h-full lg:aspect-auto" />
          </button>)}
        </div>
      </div>}
    </div>
  )
}
