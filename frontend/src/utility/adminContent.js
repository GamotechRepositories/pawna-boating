// label, database field, input type, required
export const sections = {
  staying_experiences: { label: 'Stays', singular: 'stay', fields: [
    ['Stay ID', 'id', 'slug', true], ['Name', 'name', 'text', true],
    ['Price (₹)', 'price', 'money', true], ['Price unit', 'price_unit', 'unit', true],
    ['Short tag', 'tag', 'text'], ['Description', 'description', 'textarea', true],
    ['Image URL or /media path', 'image_url', 'media', true], ['Icon', 'icon', 'icon', true],
    ['Package title', 'package_title', 'text', true], ['Accommodation', 'accommodation', 'text', true],
    ['Inclusions (one per line)', 'inclusions', 'lines'],
  ] },
  video_gallery: { label: 'Videos', singular: 'video', fields: [
    ['Video ID', 'id', 'slug', true], ['Title', 'title', 'text', true],
    ['Description', 'description', 'textarea'], ['Video URL or /media path', 'video_url', 'media', true],
    ['Poster URL or /media path', 'poster_url', 'media'],
  ] },
  reviews: { label: 'Reviews', singular: 'review', fields: [
    ['Guest name', 'name', 'text', true], ['Review', 'text', 'textarea', true],
    ['Rating (optional, 1–5)', 'rating', 'rating'], ['Source link', 'source_url', 'url'],
  ] },
}
export function editValues(table, row) {
  return {
    ...Object.fromEntries(sections[table].fields.map(([, key]) => [key, row?.[key] ?? ''])),
    inclusions: (row?.inclusions || []).join('\n'),
    price_unit: row?.price_unit || 'per person', icon: row?.icon || 'tent',
    sort_order: row?.sort_order ?? 0, is_published: row?.is_published ?? false,
  }
}
export function buildPayload(table, values, existingId) {
  const result = {}
  for (const [label, key, type, required] of sections[table].fields) {
    let value = String(values[key] ?? '').trim()
    if (required && !value) throw new Error(`${label} is required.`)
    if (type === 'slug' && !/^[a-z0-9-]+$/.test(value)) throw new Error(`${label} must use lowercase letters, numbers, or hyphens.`)
    if (type === 'media' && value && !/^(https?:\/\/|\/media\/)/.test(value)) throw new Error(`${label} must be an HTTP URL or a /media/ path.`)
    if (type === 'url' && value && !/^https?:\/\//.test(value)) throw new Error(`${label} must be an HTTP URL.`)
    if (type === 'money') {
      value = Number(value)
      if (!Number.isFinite(value) || value < 0 || value > 99999999.99) throw new Error('Enter a valid nonnegative price.')
    }
    if (type === 'rating') {
      value = value === '' ? null : Number(value)
      if (value !== null && (!Number.isInteger(value) || value < 1 || value > 5)) throw new Error('Rating must be between 1 and 5.')
    }
    if (type === 'lines') value = value.split('\n').map(item => item.trim()).filter(Boolean)
    if (['poster_url', 'source_url'].includes(key) && !value) value = null
    result[key] = value
  }
  if (existingId && table !== 'reviews') result.id = existingId
  const order = Number(values.sort_order)
  if (!Number.isInteger(order) || order < -2147483648 || order > 2147483647) throw new Error('Display order must be a whole number.')
  return { ...result, sort_order: order, is_published: Boolean(values.is_published) }
}
