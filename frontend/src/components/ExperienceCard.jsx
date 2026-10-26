import Icon from './Icon'

export default function ExperienceCard({ activity, active = false }) {
  return (
    <div className={`experience-card ${active ? 'experience-card-active' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[.16em] text-jungle sm:text-xs">{activity.category} experience</span>
        <Icon name="leaf" className="size-5 shrink-0" />
      </div>
      <div className="my-7 flex flex-1 items-center justify-center sm:my-9">
        <div className="flex size-24 items-center justify-center rounded-full border border-jungle/10 bg-river-surface sm:size-32">
          <Icon name={activity.icon} className="size-14 text-jungle sm:size-20" />
        </div>
      </div>
      <div>
        <h2 className="font-display text-2xl leading-tight text-mountain sm:text-3xl">{activity.name}</h2>
        <p className="mt-3 text-sm leading-6 text-forest/75">{activity.description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 border-t border-sand pt-4 text-[10px] font-semibold uppercase tracking-[.12em] text-jungle sm:text-xs">
        <Icon name="sun" className="size-4 shrink-0" /> Make a day of it
      </div>
    </div>
  )
}
