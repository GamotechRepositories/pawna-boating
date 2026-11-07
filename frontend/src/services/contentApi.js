const projectUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || ''
export const contentApiConfigured = Boolean(projectUrl && publishableKey)

// Resolve the seeded /media paths through Vite's existing bundled assets.
const assets = import.meta.glob(['../assets/{tents-comp,container-rooms-comp,Villa-comp,glamping-tents-comp,home}.png', '../assets/fun-cover.jpg', '../assets/{promotional,FunV,LakeV,MixV,PlayV,PoolV,newPool}.mp4'], { eager: true, query: '?url', import: 'default' })
export function mediaUrl(value) {
  if (!value) return undefined
  if (value.startsWith('/media/')) {
    return assets[`../assets/${value.slice('/media/'.length)}`] || value
  }
  // Only accept website paths or HTTP media URLs from editable content.
  return /^(https?:\/\/|\/(?!\/))/.test(value) ? value : undefined
}

export function mapContent(table, row) {
  if (table === 'staying_experiences') return {
    ...row,
    price: Number(row.price).toLocaleString('en-IN'),
    priceUnit: row.price_unit,
    image: mediaUrl(row.image_url),
    package: { title: row.package_title, accommodation: row.accommodation, inclusions: row.inclusions },
  }
  if (table === 'video_gallery') return { ...row, src: mediaUrl(row.video_url), poster: mediaUrl(row.poster_url) }
  return { ...row, source_url: /^https?:\/\//.test(row.source_url || '') ? row.source_url : undefined }
}

export async function fetchContent(table, signal) {
  const url = new URL(`${projectUrl}/rest/v1/${table}`)
  url.search = new URLSearchParams({ select: '*', order: 'sort_order.asc,id.asc' }).toString()
  const response = await fetch(url, { headers: { apikey: publishableKey }, signal })
  if (!response.ok) throw new Error(`Content API returned ${response.status}`)
  const rows = await response.json()
  if (!Array.isArray(rows)) throw new Error('Content API returned an invalid response')
  return rows.map(row => mapContent(table, row))
}
