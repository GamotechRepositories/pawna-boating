import { motion as Motion, useReducedMotion } from 'motion/react'
import ExperienceCard from './ExperienceCard'
import Icon from './Icon'
import useExperienceCarousel from '../controllers/useExperienceCarousel'

export default function ExperienceCarousel({ items }) {
  const reducedMotion = useReducedMotion()
  const { index, move, gestureHandlers } = useExperienceCarousel(items)
  if (!items.length) return <p>No experiences in this category.</p>
  const previous = (index - 1 + items.length) % items.length
  const next = (index + 1) % items.length
  const hasNeighbors = items.length > 1

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Camp experiences"
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}
    >
      <p className="mb-2 text-center text-xs text-forest/65">Choose an experience. Swipe or use the arrows to explore.</p>
      <div className="experience-stage" {...gestureHandlers}>
        {hasNeighbors && <button
          type="button"
          className="experience-slide experience-slide-previous"
          aria-label={`Previous experience: ${items[previous].name}`}
          onClick={() => move(-1)}
        >
          <div className="experience-preview" aria-hidden="true"><ExperienceCard activity={items[previous]} /></div>
        </button>}
        <article
          className="experience-slide experience-slide-current"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${items.length}: ${items[index].name}`}
        >
          <Motion.div
            key={items[index].name}
            className="h-full"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ExperienceCard activity={items[index]} active />
          </Motion.div>
        </article>
        {hasNeighbors && <button
          type="button"
          className="experience-slide experience-slide-next"
          aria-label={`Next experience: ${items[next].name}`}
          onClick={() => move(1)}
        >
          <div className="experience-preview" aria-hidden="true"><ExperienceCard activity={items[next]} /></div>
        </button>}
      </div>
      <div className="mt-4 flex items-center justify-center gap-5 sm:gap-8">
        <button type="button" onClick={() => move(-1)} disabled={!hasNeighbors} aria-label="Previous experience" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-jungle text-jungle transition-colors hover:bg-jungle hover:text-white disabled:opacity-40"><Icon className="size-5 rotate-180" /></button>
        <p aria-live="polite" aria-atomic="true" className="min-w-28 text-center text-[13px] sm:text-sm font-semibold text-mountain">{String(index + 1).padStart(2, '0')} <span className="mx-2 font-normal text-forest/50">/</span> {String(items.length).padStart(2, '0')}</p>
        <button type="button" onClick={() => move(1)} disabled={!hasNeighbors} aria-label="Next experience" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-jungle text-jungle transition-colors hover:bg-jungle hover:text-white disabled:opacity-40"><Icon /></button>
      </div>
    </div>
  )
}
