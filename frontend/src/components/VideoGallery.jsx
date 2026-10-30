import { useId, useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

function VideoCard({ video, index }) {
  const [failed, setFailed] = useState(false)

  return (
    <li className="video-gallery-card">
      <Reveal delay={index * 0.12}>
        <article className="video-gallery-photo">
          <video
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={video.title}
            onPlay={event => {
              const player = event.currentTarget
              player.closest('ul').querySelectorAll('video').forEach(other => {
                if (other !== player) other.pause()
              })
            }}
            onError={() => setFailed(true)}
            onLoadedData={() => setFailed(false)}
            className="block aspect-[9/16] w-full bg-forest object-cover"
          >
            {(video.captions || []).map(track => <track key={`${track.srcLang}-${track.src}`} kind="captions" {...track} />)}
            Your browser does not support embedded video. <a href={video.src}>Open the video</a>.
          </video>
          <h3 className="video-gallery-label">{video.title}</h3>
          {failed && <p role="status" className="px-2 pb-3 text-sm text-forest">This video couldn’t load. <a href={video.src} className="underline">Open video</a></p>}
        </article>
      </Reveal>
    </li>
  )
}

/** Videos: { id, src, title, description?, poster?, duration?, captions? }. */
export default function VideoGallery({
  videos = [],
  spacing = 'pt-16 pb-16 md:pt-24 md:pb-24',
  previewImage,
  previewAlt = '',
  eyebrow = 'A glimpse of the getaway',
  title = 'See the moments. Feel the escape.',
  description = 'A little inspiration for your next adventure outdoors.',
}) {
  const headingId = useId()
  const availableVideos = videos.filter(video => video.src)

  return (
    <section aria-labelledby={headingId} className={`video-gallery bg-turmeric ${spacing}`}>
      <div className="page-width relative pt-6 md:pt-10">
        <div id={headingId} className="text-center [&>div]:justify-center">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </div>
        {availableVideos.length ? (
          <ul aria-label="Videos from the getaway" className="video-gallery-row">
            {availableVideos.map((video, index) => <VideoCard key={video.id} video={video} index={index} />)}
          </ul>
        ) : (
          <div className="rounded-2xl border border-forest/15">
            {previewImage && <img src={previewImage} alt={previewAlt} loading="lazy" className="mx-auto h-auto w-full max-w-2xl" />}
            <p className="px-6 py-8 text-center text-forest/75">New moments are on their way. Check back soon for videos from the getaway.</p>
          </div>
        )}
      </div>
    </section>
  )
}
