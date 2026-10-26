import Icon from './Icon'

const highlights = [
  { icon: 'tent', label: 'Stay a little longer' },
  { icon: 'boat', label: 'Take the scenic route' },
  { icon: 'play', label: 'Play without a clock' },
  { icon: 'leaf', label: 'Come closer to nature' },
]

export default function HomeHighlights() {
  return (
    <section aria-label="Camp highlights" className="border-b border-sand bg-surface">
      <div className="highlights-strip flex items-center gap-3 px-3 py-5 sm:hidden">
        <div className="min-w-0 flex-1 overflow-x-auto" tabIndex={0} role="region" aria-label="Scrolling camp highlights">
          <div className="highlights-track">
            {[false, true].map(duplicate => (
              <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className="flex shrink-0 items-center gap-8 pr-8">
                {highlights.map(item => (
                  <li key={item.label} className="flex shrink-0 items-center gap-3 whitespace-nowrap text-[13px] font-medium text-mountain">
                    <Icon name={item.icon} className="size-6 shrink-0 text-jungle" />
                    {item.label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <ul className="page-width hidden grid-cols-2 gap-7 py-8 sm:grid md:grid-cols-4">
        {highlights.map(item => (
          <li key={item.label} className="flex items-center justify-center gap-3 text-sm font-medium text-mountain">
            <Icon name={item.icon} className="size-7 shrink-0 text-jungle" />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
