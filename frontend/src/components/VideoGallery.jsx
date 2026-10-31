import { useEffect, useId, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

function VideoCard({ video, index }) {
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef(null)

  return (
    <li className="video-gallery-card">
      <Reveal delay={index * 0.12}>
        <article className="video-gallery-photo">
          <video
            ref={playerRef}
            src={video.src}
            poster={video.poster}
            controls={playing}
            playsInline
            preload="metadata"
            aria-label={video.title}
            onPlay={event => {
              setPlaying(true)
              const player = event.currentTarget
              player.closest('ul').querySelectorAll('video').forEach(other => {
                if (other !== player) other.pause()
              })
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
            onLoadedData={() => setFailed(false)}
            className="block aspect-[9/16] w-full bg-forest object-cover"
          >
            {(video.captions || []).map(track => <track key={`${track.srcLang}-${track.src}`} kind="captions" {...track} />)}
            Your browser does not support embedded video. <a href={video.src}>Open the video</a>.
          </video>
          {!playing && <>
            <div className="video-gallery-shade" aria-hidden="true" />
            <button type="button" className="video-gallery-play" aria-label={`Play ${video.title}`} onClick={() => {
              playerRef.current?.play()?.catch(() => setFailed(true))
            }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4.5v15l12-7.5z" fill="currentColor" /></svg></button>
            <div className="video-gallery-caption">
              <h3 className="video-gallery-label">{video.title}</h3>
              {video.description && <p>{video.description}</p>}
            </div>
          </>}
          {failed && <p role="status" className="video-gallery-error">This video couldn’t load. <a href={video.src} className="underline">Open video</a></p>}
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
  const rowRef = useRef(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame
    let previous = 0
    let direction = 1
    let interacting = false
    let focused = false
    const pause = () => { interacting = true }
    const resume = () => { interacting = false }
    const focus = () => { focused = true }
    const blur = event => { focused = row.contains(event.relatedTarget) }
    const advance = time => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0
      previous = time
      const playing = [...row.querySelectorAll('video')].some(video => !video.paused && !video.ended)
      const limit = row.scrollWidth - row.clientWidth
      if (!playing && !interacting && !focused && limit > 0) {
        if (row.scrollLeft >= limit - 1) direction = -1
        if (row.scrollLeft <= 0) direction = 1
        row.scrollLeft += direction * elapsed * 0.035
      }
      frame = requestAnimationFrame(advance)
    }
    row.addEventListener('pointerenter', pause)
    row.addEventListener('pointerleave', resume)
    row.addEventListener('pointerdown', pause)
    window.addEventListener('pointerup', resume)
    row.addEventListener('focusin', focus)
    row.addEventListener('focusout', blur)
    frame = requestAnimationFrame(advance)
    return () => {
      cancelAnimationFrame(frame)
      row.removeEventListener('pointerenter', pause)
      row.removeEventListener('pointerleave', resume)
      row.removeEventListener('pointerdown', pause)
      window.removeEventListener('pointerup', resume)
      row.removeEventListener('focusin', focus)
      row.removeEventListener('focusout', blur)
    }
  }, [videos])
  const availableVideos = videos.filter(video => video.src)

  return (
    <section aria-labelledby={headingId} className={`video-gallery ${spacing}`}>
      <div className="relative pt-6 md:pt-10">
        <div id={headingId} className="video-gallery-heading page-width text-center [&>div]:justify-center">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </div>
        {availableVideos.length ? (
          <ul ref={rowRef} aria-label="Videos from the getaway" className="video-gallery-row">
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
