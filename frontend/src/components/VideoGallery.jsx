import { useId, useState } from 'react'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

/** Videos: { id, src, title, description?, poster?, duration?, captions? }.
 * Captions: [{ src, srcLang, label, default? }] pointing to WebVTT files.
 */
export default function VideoGallery({
  videos = [],
  previewImage,
  previewAlt = '',
  eyebrow = 'A glimpse of the getaway',
  title = 'See the moments. Feel the escape.',
  description = 'A little inspiration for your next adventure outdoors.',
}) {
  const headingId = useId()
  const playerId = useId()
  const [selectedId, setSelectedId] = useState(null)
  const [failedSource, setFailedSource] = useState(null)
  const availableVideos = videos.filter(video => video.src)
  const activeVideo = availableVideos.find(video => video.id === selectedId) || availableVideos[0]

  return (
    <section aria-labelledby={headingId} className="page-width py-16 md:py-24">
      <div id={headingId}>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </div>
      {!activeVideo ? (
        <div className="overflow-hidden rounded-2xl border border-sand bg-surface">
          {previewImage && <img src={previewImage} alt={previewAlt} loading="lazy" className="mx-auto h-auto w-full max-w-2xl" />}
          <p className="px-6 py-8 text-center text-forest/75">
            New moments are on their way. Check back soon for videos from the getaway.
          </p>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-sand bg-surface">
            <video
              key={`${activeVideo.id}-${activeVideo.src}`}
              id={playerId}
              src={activeVideo.src}
              poster={activeVideo.poster}
              controls
              playsInline
              preload="none"
              aria-label={activeVideo.title}
              onError={() => setFailedSource(activeVideo.src)}
              onLoadedData={() => setFailedSource(null)}
              className="aspect-video w-full bg-forest object-contain"
            >
              {(activeVideo.captions || []).map(track => <track key={`${track.srcLang}-${track.src}`} kind="captions" {...track} />)}
              Your browser does not support embedded video. <a href={activeVideo.src}>Open the video</a>.
            </video>
            <div className="p-5 sm:p-6">
              <p className="eyebrow">Now showing</p>
              <h3 className="font-display text-2xl text-mountain">{activeVideo.title}</h3>
              {activeVideo.description && <p className="mt-3 leading-7 text-forest/75">{activeVideo.description}</p>}
              {failedSource === activeVideo.src && <p role="status" className="mt-4 text-sm">This video couldn’t load. <a href={activeVideo.src} className="text-link">Try opening it directly <Icon /></a></p>}
            </div>
          </div>
          <ul aria-label="Choose a video" className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {availableVideos.map((video, index) => {
              const selected = video.id === activeVideo.id
              return (
                <li key={video.id} className="min-w-0">
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-controls={playerId}
                    onClick={() => setSelectedId(video.id)}
                    className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors ${selected ? 'border-jungle bg-jungle/5' : 'border-sand bg-surface hover:border-jungle/50'}`}
                  >
                    <span className="relative flex aspect-video w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-forest text-white sm:w-24 xl:w-32">
                      {video.poster && <img src={video.poster} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />}
                      <span className="relative flex size-9 items-center justify-center rounded-full bg-forest/80"><Icon name="play" className="size-4" /></span>
                      {video.duration && <span className="absolute bottom-1 right-1 rounded bg-forest/90 px-1.5 text-xs text-white">{video.duration}</span>}
                    </span>
                    <span className="min-w-0">
                      <span className="mb-1 block text-xs font-semibold text-jungle">{selected ? 'Selected' : `Video ${index + 1}`}</span>
                      <span className="block break-words font-display text-lg leading-snug text-mountain">{video.title}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
