import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPayload, editValues } from '../src/utility/adminContent.js'

test('editing retains numeric zero, nullable rating and published state', () => {
  const values = editValues('reviews', { name: 'Guest', text: 'Lovely stay', rating: null, sort_order: 0, is_published: true })
  const payload = buildPayload('reviews', values, 'review-id')
  assert.equal(payload.rating, null)
  assert.equal(payload.sort_order, 0)
  assert.equal(payload.is_published, true)
  assert.equal(payload.source_url, null)
  assert.equal(Object.hasOwn(payload, 'id'), false)
})
test('new content defaults to a hidden draft', () => {
  assert.equal(editValues('video_gallery').is_published, false)
})
test('stay payload preserves primary key and parses inclusions', () => {
  const values = editValues('staying_experiences', {
    id: 'camping', name: 'Camping', price: 999, description: 'A stay', image_url: '/media/tents-comp.png',
    package_title: 'Camping package', accommodation: 'Tent', inclusions: ['Dinner', 'Breakfast'],
  })
  values.id = 'changed-id'
  values.inclusions = ' Dinner \n\n Breakfast\n'
  const payload = buildPayload('staying_experiences', values, 'camping')
  assert.equal(payload.id, 'camping')
  assert.equal(payload.price, 999)
  assert.deepEqual(payload.inclusions, ['Dinner', 'Breakfast'])
})
test('invalid ratings and fractional sort orders are rejected', () => {
  const values = { ...editValues('reviews'), name: 'Guest', text: 'Review' }
  assert.throws(() => buildPayload('reviews', { ...values, rating: 6 }), /Rating/)
  assert.throws(() => buildPayload('reviews', { ...values, rating: 2.5 }), /Rating/)
  assert.throws(() => buildPayload('reviews', { ...values, sort_order: 0.5 }), /whole number/)
})
test('active script URLs are rejected and optional media stays nullable', () => {
  const values = { ...editValues('video_gallery'), id: 'new-video', title: 'Video', video_url: 'https://example.com/video.mp4' }
  assert.equal(buildPayload('video_gallery', values).poster_url, null)
  assert.throws(() => buildPayload('video_gallery', { ...values, video_url: 'javascript:alert(1)' }), /HTTP URL/)
  assert.throws(() => buildPayload('video_gallery', { ...values, id: 'Invalid ID' }), /lowercase/)
})
