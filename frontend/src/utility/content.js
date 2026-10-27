import campingImage from '../assets/camping.png'

export const brand = 'Paluma'
export const photos = {
  hero: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2200&q=85',
  camping: campingImage,
  container: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=85',
  villa: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=85',
  glamping: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=85',
  boating: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',
}
export const stays = [
  { id: 'camping', name: 'Camping', tag: 'Closer to the wild', description: 'Trade city lights for starry skies and the simple joy of sleeping outdoors.', image: photos.camping, icon: 'tent' },
  { id: 'container', name: 'Container Room', tag: 'A different kind of escape', description: 'A unique space to unwind, with a little more room between you and the everyday.', image: photos.container, icon: 'home' },
  { id: 'villa', name: 'Villa Stay', tag: 'Make room for everyone', description: 'Bring your favourite people together for an easy, unhurried getaway.', image: photos.villa, icon: 'home' },
  { id: 'glamping', name: 'Glamping Tents', tag: 'The best of both worlds', description: 'The spirit of camping, with a more comfortable place to call it a night.', image: photos.glamping, icon: 'tent' },
]
export const activities = [
  { name: 'Boating', category: 'Water', icon: 'boat', description: 'Head out on the water and enjoy a slower view of the outdoors.' },
  { name: 'Swimming pool', category: 'Water', icon: 'waves', description: 'Make a splash or take a refreshing break between adventures.' },
  { name: 'Kids pool', category: 'Family', icon: 'waves', description: 'A dedicated pool for little splash-makers. Adult supervision is essential.' },
  { name: 'Badminton', category: 'Games', icon: 'badminton', description: 'Pick a partner and get a friendly rally going.' },
  { name: 'Cricket', category: 'Games', icon: 'cricket', description: 'Gather your team for a classic outdoor favourite.' },
  { name: 'Archery', category: 'Games', icon: 'archery', description: 'Find your focus and take aim at something new.' },
  { name: 'Carrom', category: 'Games', icon: 'carrom', description: 'Slow down with a little friendly competition around the board.' },
  { name: 'Chess', category: 'Games', icon: 'chess', description: 'Take your time. Your next move can wait.' },
  { name: 'Kids play area', category: 'Family', icon: 'sun', description: 'A space for little explorers to play and make their own memories.' },
]
export const navigation = [{ path: '/', label: 'Home' }, { path: '/stays', label: 'Our stays' }, { path: '/experiences', label: 'Experiences' }, { path: '/plan-your-visit', label: 'Plan your visit' }]
