import VideoGallery from '../components/VideoGallery'
import { getawayVideos } from '../utility/videos'

export default function VideoGalleryPage() {
  return (
    <>
      <h1 className="sr-only">Video gallery</h1>
      <VideoGallery
        videos={getawayVideos}
        eyebrow=""
        title="A little closer to being here."
        description=""
      />
    </>
  )
}
