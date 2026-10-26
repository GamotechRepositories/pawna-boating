import { useRef, useState } from 'react'

export default function useExperienceCarousel(items) {
  const [activeIndex, setActiveIndex] = useState(0)
  const gesture = useRef(null)
  const suppressClick = useRef(false)
  const count = items.length
  const index = count ? activeIndex % count : 0

  function move(direction) {
    if (count > 1) setActiveIndex(previous => (previous + direction + count) % count)
  }

  function onPointerDown(event) {
    suppressClick.current = false
    if (!event.isPrimary || event.button !== 0) return
    gesture.current = { x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event) {
    if (!gesture.current) return
    const dx = event.clientX - gesture.current.x
    const dy = event.clientY - gesture.current.y
    gesture.current = null
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressClick.current = true
      move(dx < 0 ? 1 : -1)
    }
  }

  return {
    index,
    move,
    gestureHandlers: {
      onPointerDown,
      onPointerUp,
      onPointerCancel: () => { gesture.current = null },
      onClickCapture: event => {
        if (suppressClick.current) {
          event.preventDefault()
          event.stopPropagation()
          suppressClick.current = false
        }
      },
    },
  }
}
