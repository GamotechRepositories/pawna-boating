import glampingImage from '../assets/glamping-tents-comp.png'
import villaImage from '../assets/Villa-comp.png'
import tentsImage from '../assets/tents-comp.png'
import containerImage from '../assets/container-rooms-comp.png'

export const brand = 'Pawna Boating & Jungle River Camp'
export const bookingPhones = ['8282841919', '9975212123']
export const photos = {
  hero: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2200&q=85',
  camping: tentsImage,
  container: containerImage,
  villa: villaImage,
  glamping: glampingImage,
  boating: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',
}
export const stays = [
  { id: 'camping', name: 'Camping', price: '999', priceUnit: 'per person', tag: '', description: 'Trade city lights for starry skies and the simple joy of sleeping outdoors.', image: photos.camping, icon: 'tent' },
  { id: 'container', name: 'Container Room', price: '3,300', priceUnit: 'per couple', tag: 'A different kind of escape', description: 'A unique space to unwind, with a little more room between you and the everyday.', image: photos.container, icon: 'home' },
  { id: 'villa', name: "Villa's with private Bonfire", price: '1,899', priceUnit: 'per person', tag: 'Make room for everyone', description: 'Bring your favourite people together for an easy, unhurried getaway with a private bonfire.', image: photos.villa, icon: 'home' },
  { id: 'glamping', name: 'Glamping Tents', price: '1,359', priceUnit: 'per person', tag: 'The best of both worlds', description: 'The spirit of camping, with a more comfortable place to call it a night.', image: photos.glamping, icon: 'tent' },
]
export const activities = [
  { name: 'Darts', category: 'Games', icon: 'target', description: 'Take aim and enjoy a friendly game of darts.' },
  { name: 'Table tennis', category: 'Games', icon: 'target', description: 'Challenge your group to a game of table tennis.' },
  { name: 'Fishing', category: 'Water', icon: 'waves', description: 'Slow down with a spot of fishing at camp.' },
  { name: 'Music & dance floor', category: 'Family', icon: 'play', description: 'Enjoy music and time together on the dance floor.' },
  { name: 'Bonfire', category: 'Family', icon: 'sun', description: 'Gather around the bonfire for an evening together.' },
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
export const navigation = [{ path: '/', label: 'Home' }, { path: '/experiences', label: 'Experiences' }, { path: '/plan-your-visit', label: 'Plan your visit' }]
