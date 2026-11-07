import VideoGallery from '../components/VideoGallery'
import { useContent } from '../controllers/useContent'

export default function VideoGalleryPage() {
  const { data: getawayVideos, loading: videosLoading, error: videosError } = useContent('video_gallery')
  return (
    <>
      <h1 className="sr-only">Video gallery</h1>
      <VideoGallery
        videos={getawayVideos}
    loading={videosLoading}
    error={videosError}
        eyebrow=""
        title=""
        description=""
      />
    </>
  )
}
