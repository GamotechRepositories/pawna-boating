import Reveal from './Reveal'
import Icon from './Icon'
export default function StayCard({ stay, index }) {
  return <Reveal className="h-full" delay={Math.min(index, 3) * 0.14}>
    <article className="group h-full overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition-shadow hover:shadow-lg">
      <a href={`/plan-your-visit?stay=${stay.id}`} className="block">
        <div className="relative">
          <div className="overflow-hidden bg-sand">
            <img src={stay.image} alt={`${stay.name} inspiration — illustrative photography`} loading="lazy" className="aspect-[4/4.5] w-full object-cover transition-transform duration-1000 ease-in-out motion-safe:group-hover:scale-105" />
          </div>
          <div className="absolute inset-x-4 bottom-0 z-10 translate-y-1/2 rounded-xl border border-sand bg-warm px-3 py-2 text-center shadow-sm">
            <h3 className="font-display text-lg leading-tight text-mountain sm:text-xl">{stay.name}</h3>
          </div>
        </div>
        <div className="px-4 pb-4 pt-9 sm:pt-10">
          <p className="text-xs sm:text-[13px] leading-5 text-forest/75 line-clamp-2">{stay.description}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-jungle">Explore stay <span className="ml-2 text-forest/40">0{index + 1}</span></span>
            <Icon name="arrow" />
          </div>
        </div>
      </a>
    </article>
  </Reveal>
}
