import { useEffect } from 'react'
import Layout from './components/Layout'
import AppRoutes from './routes/AppRoutes'
import { getRoute } from './routes/routeConfig'
import { applyTheme } from './utility/theme'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  useEffect(() => {
    applyTheme()
    document.title = `${getRoute(path).title} | Paluma`
  }, [path])
  return <Layout path={path}><AppRoutes path={path} /></Layout>
}
