import { useId, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const highlights = [
  'Stay a little longer',
  'Take the scenic route',
  'Play without a clock',
  'Come closer to nature',
]
const ribbonText = `${highlights.join('   •   ')}   •   `

export default function HomeHighlights() {
  const pathId = useId()
  const ribbonRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const pause = () => ribbonRef.current?.querySelectorAll('svg').forEach(svg => svg.pauseAnimations())
  const resume = () => {
    if (!ribbonRef.current?.matches(':hover, :focus-within')) {
      ribbonRef.current?.querySelectorAll('svg').forEach(svg => svg.unpauseAnimations())
    }
  }

  return (
    <section
      ref={ribbonRef}
      aria-label="Camp highlights"
      className="highlights-strip highlights-ribbon"
      tabIndex={0}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <p className="sr-only">{highlights.join('. ')}.</p>
      {[false, true].map(mobile => <svg key={String(mobile)} aria-hidden="true" className={`highlights-flow ${mobile ? 'highlights-flow-mobile' : 'highlights-flow-desktop'}`} viewBox={mobile ? '0 0 720 140' : '0 0 1440 140'} preserveAspectRatio="none">
        <defs>
          <path id={`${pathId}-${mobile}`} d="M-1440 70 C-1200 34 -960 34 -720 70 S-240 106 0 70 S480 34 720 70 S1200 106 1440 70 S1920 34 2160 70 S2640 106 2880 70 S3360 34 3600 70 S4080 106 4320 70 S4800 34 5040 70 S5520 106 5760 70" />
        </defs>
        <use href={`#${pathId}-${mobile}`} className="highlights-band" />
        <text className="highlights-flow-text" dominantBaseline="middle">
          <textPath href={`#${pathId}-${mobile}`} startOffset="0">
            {!reducedMotion && <animate attributeName="startOffset" from="0" to="-1440" dur="55s" repeatCount="indefinite" />}
            {Array.from({ length: 5 }, (_, index) => (
              <tspan key={index} textLength="1440" lengthAdjust="spacing">{ribbonText}</tspan>
            ))}
          </textPath>
        </text>
      </svg>)}
    </section>
  )
}
