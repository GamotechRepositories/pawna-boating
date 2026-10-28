import Reveal from './Reveal'
import Icon from './Icon'
export default function StayCard({ stay, index }) {
  return <Reveal delay={Math.min(index, 3) * 0.14}><article className="group"><a href={`/plan-your-visit?stay=${stay.id}`} className="block"><div className="relative overflow-hidden rounded-xl bg-sand"><img src={stay.image} alt={`${stay.name} inspiration — illustrative photography`} loading="lazy" className="aspect-[4/4.5] w-full object-cover transition-transform duration-1000 ease-in-out motion-safe:group-hover:scale-105" /></div><div className="mt-5 flex items-center justify-between"><h3 className="font-display text-xl sm:text-2xl text-mountain">{stay.name}</h3><Icon name="arrow" /></div><p className="mt-2 text-[13px] sm:text-sm leading-6 text-forest/75">{stay.description}</p><span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-jungle">Explore stay <span className="ml-2 text-forest/40">0{index + 1}</span></span></a></article></Reveal>
}
