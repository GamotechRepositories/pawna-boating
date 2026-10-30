import { useReducedMotion } from 'motion/react'
import Icon from './Icon'
import lakeVideo from '../assets/LakeV.mp4'
import poolVideo from '../assets/PoolV.mp4'
import playVideo from '../assets/PlayV.mp4'
import funVideo from '../assets/FunV.mp4'
import poster from '../assets/home.png'

export default function ExperienceCard({ activity, active = false }) {
  const reducedMotion = useReducedMotion()
  const video = activity.name.toLowerCase().includes('pool') ? poolVideo
    : activity.category === 'Water' ? lakeVideo
    : activity.category === 'Games' ? playVideo : funVideo

  return (
    <div className={`experience-card relative isolate overflow-hidden ${active ? 'experience-card-active' : ''}`}>
      <video key={video} src={video} poster={poster} autoPlay={!reducedMotion} muted loop playsInline preload="metadata" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/85" />
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[.16em] text-white sm:text-xs">{activity.category} experience</span>
      </div>
      <div className="mt-auto pt-8">
        <div className="flex items-center gap-3 text-white"><Icon name={activity.icon} className="size-6 shrink-0 sm:size-8" /><h2 className="font-display text-xl leading-tight sm:text-3xl">{activity.name}</h2></div>
        <p className="mt-2 text-[13px] leading-5 text-white/90 sm:mt-3 sm:text-sm sm:leading-6">{activity.description}</p>
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-white/25 pt-3 text-[10px] font-semibold uppercase tracking-[.12em] text-white sm:mt-6 sm:pt-4 sm:text-xs">
        <Icon name="sun" className="size-4 shrink-0" /> Make a day of it
      </div>
    </div>
  )
}
