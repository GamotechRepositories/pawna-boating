import { useEffect, useState } from 'react'
import { stays } from '../utility/content'
import { getawayVideos } from '../utility/videos'
import { reviews } from '../utility/reviews'
import { contentApiConfigured, fetchContent } from '../services/contentApi'

const localContent = { staying_experiences: stays, video_gallery: getawayVideos, reviews }

export function useContent(table) {
  const [state, setState] = useState(() => ({
    data: contentApiConfigured ? [] : localContent[table],
    loading: contentApiConfigured,
    error: null,
  }))
  useEffect(() => {
    if (!contentApiConfigured) return
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    let active = true
    fetchContent(table, controller.signal)
      .then(data => { if (active) setState({ data, loading: false, error: null }) })
      .catch(error => {
        if (active) {
          console.warn(`Unable to load ${table}:`, error.message)
          // Do not reintroduce hidden records or stale prices on API failure.
          setState({ data: [], loading: false, error: 'Content is temporarily unavailable. Please try again later.' })
        }
      })
      .finally(() => clearTimeout(timeout))
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [table])
  return state
}
