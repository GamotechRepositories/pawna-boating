const sharedInclusions = [
  'Welcome snacks and tea',
  'Limited BBQ — vegetarian and non-vegetarian',
  'Unlimited dinner — vegetarian and non-vegetarian',
  'Breakfast and tea before checkout',
  'Swimming pool and boating',
  'Music and dance floor',
  'Kids play area',
  'Indoor games: chess, carrom, darts and archery',
  'Outdoor games: cricket, badminton, table tennis and fishing',
]

export const stayPackages = {
  camping: {
    title: 'Tent Camping Package',
    accommodation: 'Exclusive tent stay',
    inclusions: ['Exclusive tent accommodation', 'Bonfire', ...sharedInclusions],
  },
  glamping: {
    title: 'Glamping Tent Package',
    accommodation: 'Glamping tent stay',
    inclusions: ['Glamping tent accommodation', 'Bonfire', ...sharedInclusions],
  },
  villa: {
    title: 'Waterfront Villa Package',
    accommodation: 'Waterfront villa stay with a private bonfire',
    inclusions: ['Waterfront villa accommodation', 'Private bonfire', ...sharedInclusions],
  },
  container: {
    title: 'Container Room Package',
    accommodation: 'Container room stay for a couple',
    inclusions: ['Container room accommodation for a couple', 'Bonfire', ...sharedInclusions],
  },
}
