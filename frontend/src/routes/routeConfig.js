import { lazy } from 'react'
import { matchPath } from 'react-router-dom'
import StayDetailsPage from '../pages/StayDetailsPage'
import { stays } from '../utility/content'
import HomePage from '../pages/HomePage'
import StaysPage from '../pages/StaysPage'
import ExperiencesPage from '../pages/ExperiencesPage'
import VisitPage from '../pages/VisitPage'
import VideoGalleryPage from '../pages/VideoGalleryPage'
import ReviewsPage from '../pages/ReviewsPage'
import NotFoundPage from '../pages/NotFoundPage'

const AdminPage = lazy(() => import('../pages/AdminPage'))

export const routes = {
  '/admin': { component: AdminPage, title: 'Content Admin' },
  '/': { component: HomePage, title: 'Boating & Jungle River Camp' },
  '/stays/:stayId': { component: StayDetailsPage, title: 'Stay Details' },
  '/stays': { component: StaysPage, title: 'Our Stays' },
  '/experiences': { component: ExperiencesPage, title: 'Experiences' },
  '/video-gallery': { component: VideoGalleryPage, title: 'Video Gallery' },
  '/reviews': { component: ReviewsPage, title: 'Reviews' },
  '/plan-your-visit': { component: VisitPage, title: 'Plan Your Visit' },
}
export function getRoute(path) {
  const match = matchPath('/stays/:stayId', path)
  if (match) {
    const stay = stays.find(item => item.id === match.params.stayId)
    if (stay) return { ...routes['/stays/:stayId'], title: stay.name }
  }
  return routes[path] || { component: NotFoundPage, title: 'Page Not Found' }
}
