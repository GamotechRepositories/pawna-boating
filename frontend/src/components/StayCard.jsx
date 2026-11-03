import { Link } from 'react-router-dom'
import Reveal from './Reveal'
export default function StayCard({ stay, index, title = stay.name, showBonfire = true, carousel = false }) {
  const Wrapper = carousel ? 'div' : Reveal
  const wrapperProps = carousel ? {} : { className: 'h-full', delay: Math.min(index, 3) * 0.14 }
  return <Wrapper {...wrapperProps}>
    <article className={`group ${carousel ? 'h-auto' : 'h-full'} overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition-shadow hover:shadow-lg`}>
      <Link to={`/stays/${stay.id}`} className="block">
        <div className="relative">
          <div className="overflow-hidden bg-sand">
            <img src={stay.image} alt={`${stay.name} inspiration — illustrative photography`} loading="lazy" className="aspect-[4/4.5] w-full object-cover transition-transform duration-1000 ease-in-out motion-safe:group-hover:scale-105" />
          </div>
          <div className="relative z-10 -mt-7  bg-white px-2 py-2 sm:px-3 text-center ">
            <h3 className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1  text-base leading-tight  font-semibold">
              <span>{title}</span>
              <span className="whitespace-nowrap">₹{stay.price}</span>
            </h3>
            <p className="mt-1 text-xs text-forest/75">{stay.priceUnit}</p>
          </div>
        </div>
      </Link>
    </article>
  </Wrapper>
}
