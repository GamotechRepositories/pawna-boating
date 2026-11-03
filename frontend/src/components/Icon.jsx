import leafIcon from '../assets/leaf-svgrepo-com.svg'
import boatIcon from '../assets/boat-with-a-sail-svgrepo-com.svg'
import tentIcon from '../assets/tent-7-svgrepo-com.svg'
import archeryIcon from '../assets/archery-svgrepo-com.svg'
import badmintonIcon from '../assets/badminton-svgrepo-com.svg'
import cricketIcon from '../assets/cricket-game-svgrepo-com.svg'
import carromIcon from '../assets/vecteezy_carrom-board-game_182357.svg'
import chessIcon from '../assets/king-chess-piece-shape-svgrepo-com.svg'

const maskedIcons = { boat: boatIcon, tent: tentIcon, archery: archeryIcon, chess: chessIcon }
const imageIcons = { leaf: leafIcon, badminton: badmintonIcon, cricket: cricketIcon, carrom: carromIcon }

const paths = {
  campTent: 'M3 21 12 3l9 18H3ZM8 21l4-8 4 8M10 3l4 0',
  cabin: 'm3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8',
  coffee: 'M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM17 8h2a3 3 0 1 1 0 6h-2M7 2v3M11 2v3M15 2v3',
  utensils: 'M4 3v6a2 2 0 0 0 4 0V3M6 3v18M20 21V3c-4 3-5 8 0 9',
  flame: 'M12 3c1 5 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 3 2 4 2 4s3-4 1-10ZM12 15c-2 2-2 5 0 6 3-1 3-4 0-6Z',
  music: 'M9 18V5l12-2v13M9 9l12-2M9 18a3 3 0 1 1-3-3c2 0 3 1 3 3ZM21 16a3 3 0 1 1-3-3c2 0 3 1 3 3Z',
  games: 'M7 8h10a4 4 0 0 1 4 3l1 7a2 2 0 0 1-3 2l-4-3H9l-4 3a2 2 0 0 1-3-2l1-7a4 4 0 0 1 4-3ZM7 10v5M4.5 12.5h5M16 12h.01M19 14h.01',
  ball: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM5 5l14 14M5 19 19 5M2 12h20M12 2v20',
  family: 'M9 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM14 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M21 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM17 15h2a3 3 0 0 1 3 3v3',
  moon: 'M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z',
  login: 'M14 3h6v18h-6M3 12h12m-4-4 4 4-4 4',
  logout: 'M10 3H4v18h6M10 12h11m-4-4 4 4-4 4',
  shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3ZM8 12l3 3 5-6',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17.5 6.5h.01',
  facebook: 'M14 22V12h3l.5-4H14V6c0-1.2.3-2 2-2h2V.5A24 24 0 0 0 15 .3c-3 0-5 1.8-5 5.2V8H7v4h3v10',
  chat: 'M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5ZM8 10h8M8 14h5',
  clock: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM8 14h2M14 14h2M8 18h2',
  compass: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM16 8l-2.5 5.5L8 16l2.5-5.5L16 8Z',
  location: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.08 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  home: 'm3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8',
  waves: 'M2 8c3-5 5 5 10 0s7 5 10 0M2 14c3-5 5 5 10 0s7 5 10 0M2 20c3-5 5 5 10 0s7 5 10 0',
  target: 'M21 12a9 9 0 1 1-9-9m0 4a5 5 0 1 0 5 5M12 12l9-9m-5 0h5v5',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  play: 'm9 5 10 7-10 7V5ZM3 5v14',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6',
}
export default function Icon({ name = 'arrow', className = 'size-5' }) {
  const asset = maskedIcons[name]
  if (asset) {
    return <span aria-hidden="true" className={`inline-block shrink-0 ${className}`} style={{ backgroundColor: 'currentColor', mask: `url("${asset}") center / contain no-repeat`, WebkitMask: `url("${asset}") center / contain no-repeat` }} />
  }
  const imageAsset = imageIcons[name]
  if (imageAsset) {
    return <img src={imageAsset} alt="" aria-hidden="true" className={className} width="24" height="24" />
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>
}
