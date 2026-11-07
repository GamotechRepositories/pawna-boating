import { MotionConfig } from 'motion/react'
import { Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import AppRoutes from './routes/AppRoutes'
import { getRoute } from './routes/routeConfig'
import { applyTheme } from './utility/theme'

export default function App() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/+$/, '') || '/'
  useEffect(() => {
    applyTheme()
    window.scrollTo(0, 0)
    document.title = `${getRoute(path).title} | Pawna Boating & Jungle River Camp`
  }, [path])
  if (path === "/admin") return <Suspense fallback={<p role="status" className="p-8">Loading admin…</p>}><AppRoutes path={path} /></Suspense>
  return <MotionConfig reducedMotion="user"><Layout path={path}><AppRoutes path={path} /></Layout></MotionConfig>
}
