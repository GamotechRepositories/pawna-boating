import thrower from '../assets/disc-Photoroom (1).png'
import catcher from '../assets/disc-2-Photoroom (1).png'
import cricketer from '../assets/cricket-Photoroom (1).png'
import badmintonPlayer from '../assets/badminton-Photoroom (1).png'
import archer from '../assets/archary-Photoroom (1).png'
import landscape from '../assets/home.png'
import Icon from './Icon'

const games = [
  { src: thrower, title: 'Disc Throwing', icon: 'ball' },
  { src: cricketer, title: 'Gully Cricket', icon: 'cricket' },
  { src: badmintonPlayer, title: 'Badminton', icon: 'badminton' },
  { src: archer, title: 'Archery', icon: 'target' },
  { src: catcher, title: 'More Games', icon: 'games' },
]

export default function DiscGameScene() {
  return <section className="outdoor-games" aria-labelledby="outdoor-games-title">
    <div className="outdoor-games-backdrop" style={{ backgroundImage: `url(${landscape})` }} aria-hidden="true" />
    <div className="relative mx-auto max-w-[1600px] px-3 pb-12 pt-10 sm:px-10 sm:pt-14 lg:px-14">
      <div className="text-center">
        <p className="outdoor-games-eyebrow">More games. More memories.</p>
        <h2 id="outdoor-games-title" className="mt-3 font-display text-3xl font-semibold leading-tight text-[#163828] sm:text-5xl lg:text-6xl">Outdoor Fun &amp; <em className="outdoor-games-accent">Adventure</em></h2>
      </div>
      <div className="outdoor-games-grid">
        {games.map(game => <article key={game.title} className="outdoor-game-card">
          <div className="outdoor-game-content">
            <h3 className="flex items-center justify-center gap-2 text-xs font-bold text-[#163828] sm:text-base lg:text-lg"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F8C454] sm:size-10"><Icon name={game.icon} className="size-4 sm:size-5" /></span>{game.title}</h3>
            <img src={game.src} alt={game.title === 'More Games' ? 'Guest playing with a disc' : `Guest enjoying ${game.title.toLowerCase()}`} loading="lazy" className="outdoor-game-player" />
          </div>
        </article>)}
      </div>
    </div>
  </section>
}
