import { getRoute } from './routeConfig'

export default function AppRoutes({ path }) {
  const Page = getRoute(path).component
  return <Page />
}
