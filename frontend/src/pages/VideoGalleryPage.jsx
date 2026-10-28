import VideoGallery from '../components/VideoGallery'
import { getawayVideos } from '../utility/videos'

export default function VideoGalleryPage() {
  return (
    <>
      <h1 className="sr-only">Video gallery</h1>
      <VideoGallery
        videos={getawayVideos}
        eyebrow="The getaway, in motion"
        title="A little closer to being here."
        description="Press play for a glimpse of Pawna. Your next outdoor escape starts with a little inspiration."
      />
    </>
  )
}
