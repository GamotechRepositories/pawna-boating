import { motion as Motion, useReducedMotion } from 'motion/react'
import { getRoute } from './routeConfig'

export default function AppRoutes({ path }) {
  const Page = getRoute(path).component
  const reducedMotion = useReducedMotion()
  return (
    <Motion.div
      key={path}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Page />
    </Motion.div>
  )
}
