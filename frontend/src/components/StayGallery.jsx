import { useState } from 'react'

export default function StayGallery({ images, name }) {
  const [index, setIndex] = useState(0)

  return <div className="min-w-0 self-center bg-warm" role="region" aria-label={`${name} photo gallery`}>
    <div className="relative">
      <img src={images[index]} alt={`${name} — photo ${index + 1} of ${images.length}`} className="h-64 w-full object-contain sm:h-80 lg:h-96" />
      <p aria-live="polite" className="absolute bottom-3 right-3 rounded-full bg-forest/80 px-3 py-1 text-xs text-white">{index + 1} / {images.length}</p>
    </div>
    <div className="grid grid-cols-4 gap-2 lg:flex lg:justify-center lg:p-2" aria-label="Choose a stay photo">
      {images.map((src, photoIndex) => <button key={src} type="button" aria-label={`Show stay photo ${photoIndex + 1}`} aria-pressed={index === photoIndex} onClick={() => setIndex(photoIndex)} className={`min-h-11 overflow-hidden rounded-lg border-2 lg:h-14 lg:w-20 lg:shrink-0 lg:rounded-md ${index === photoIndex ? 'border-jungle' : 'border-transparent opacity-65 hover:opacity-100'}`}><img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover lg:h-full lg:aspect-auto" /></button>)}
    </div>
  </div>
}
