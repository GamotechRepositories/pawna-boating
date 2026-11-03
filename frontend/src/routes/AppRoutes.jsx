import { motion as Motion, useReducedMotion } from 'motion/react'
import { Routes, Route } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'
import { routes } from './routeConfig'

export default function AppRoutes({ path }) {
  const reducedMotion = useReducedMotion()
  return (
    <Motion.div
      key={path}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Routes>
        {Object.entries(routes).map(([routePath, { component: Page }]) => <Route key={routePath} path={routePath} element={<Page />} />)}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Motion.div>
  )
}
