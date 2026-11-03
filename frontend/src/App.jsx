import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
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
  return <MotionConfig reducedMotion="user"><Layout path={path}><AppRoutes path={path} /></Layout></MotionConfig>
}
