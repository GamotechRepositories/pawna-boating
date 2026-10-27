import { useEffect, useRef } from 'react'

const wavePath = 'M0 105 C110 55 240 125 345 120 S465 5 535 35 S655 170 735 120 S845 65 910 85 S1000 155 1040 130 S1160 55 1210 85 S1320 155 1360 125 L1440 90'
const mobileWavePath = 'M0 115 C70 95 100 65 185 65 C285 65 320 145 410 145 C510 145 565 30 675 30 C795 30 845 120 930 120 C1015 120 1080 80 1160 80 C1260 80 1310 155 1370 140 L1440 110'

export default function ScrollBoat() {
  const trackRef = useRef(null)
  const boatRef = useRef(null)
  const pathRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const boat = boatRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 767px)')
    let frame = null

    const update = () => {
      frame = null
      const section = track.closest('section').getBoundingClientRect()
      const progress = reducedMotion.matches ? 0.5 : Math.min(1, Math.max(0,
        (window.innerHeight - section.top) / ((window.innerHeight + section.height) * 0.5),
      ))
      const path = pathRef.current
      const currentPath = mobile.matches ? mobileWavePath : wavePath
      if (path.getAttribute('d') !== currentPath) {
        path.setAttribute('d', currentPath)
        fillRef.current.setAttribute('d', `${currentPath} L1440 220 H0 Z`)
      }
      const length = path.getTotalLength()
      const edgeInset = 90
      const distance = edgeInset + progress * (length - edgeInset * 2)
      const point = path.getPointAtLength(distance)
      const before = path.getPointAtLength(distance - 1)
      const after = path.getPointAtLength(distance + 1)
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI
      boat.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`)
    }
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(track)
    observer.observe(track.closest('section'))
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reducedMotion.addEventListener('change', schedule)
    mobile.addEventListener('change', schedule)
    update()

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reducedMotion.removeEventListener('change', schedule)
      mobile.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none mb-2 w-full overflow-hidden">
      <div ref={trackRef}>
        <svg viewBox="0 -80 1440 300" className="block h-auto min-h-28 w-full bg-warm" preserveAspectRatio="none" fill="none">
          <path ref={fillRef} d={`${wavePath} L1440 220 H0 Z`} fill="#0B59BE" />
          <path ref={pathRef} d={wavePath} />
          <g ref={boatRef}>
            <g transform="scale(1.6)">
            <path d="M-35-23 Q-32-12-22-13 L22-13 Q33-14 36-25 L40-22 Q38-2 18-1 H-20 Q-37-2-40-22Z" fill="#F5AA16" />
            <path d="M-35-18 Q0-10 35-18" stroke="#FFD675" strokeWidth="3" strokeLinecap="round" />
            <path d="M-15-15 L-19-35 Q-6-30-7-15Z" fill="#B7DED5" />
            <path d="M10-15 L6-35 Q19-30 18-15Z" fill="#B7DED5" />
            <path d="M-25-7H25" stroke="#D78B0B" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
