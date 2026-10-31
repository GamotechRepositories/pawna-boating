import HomePage from '../pages/HomePage'
import StaysPage from '../pages/StaysPage'
import ExperiencesPage from '../pages/ExperiencesPage'
import VisitPage from '../pages/VisitPage'
import VideoGalleryPage from '../pages/VideoGalleryPage'
import ReviewsPage from '../pages/ReviewsPage'
import NotFoundPage from '../pages/NotFoundPage'

export const routes = {
  '/': { component: HomePage, title: 'Boating & Jungle River Camp' },
  '/stays': { component: StaysPage, title: 'Our Stays' },
  '/experiences': { component: ExperiencesPage, title: 'Experiences' },
  '/video-gallery': { component: VideoGalleryPage, title: 'Video Gallery' },
  '/reviews': { component: ReviewsPage, title: 'Reviews' },
  '/plan-your-visit': { component: VisitPage, title: 'Plan Your Visit' },
}
export function getRoute(path) {
  return routes[path] || { component: NotFoundPage, title: 'Page Not Found' }
}
