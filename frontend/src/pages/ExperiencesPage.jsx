import { useState } from 'react'
import { activities } from '../utility/content'
import SectionHeading from '../components/SectionHeading'
import ExperienceCarousel from '../components/ExperienceCarousel'
import Button from '../components/Button'

export default function ExperiencesPage() {
  const [filter, setFilter] = useState('All')
  const visible = activities.filter(item => filter === 'All' || item.category === filter)

  return (
    <section className="page-width py-16 md:py-24">
      <div className="experience-filters" aria-label="Filter experiences">
        {['All', 'Water', 'Games', 'Family'].map(category => <button
          key={category}
          type="button"
          aria-pressed={filter === category}
          onClick={() => setFilter(category)}
          className={`experience-filter min-h-11 rounded-full border transition-colors ${filter === category ? 'border-jungle bg-jungle text-white' : 'border-sand bg-white hover:border-jungle'}`}
        >{category === 'All' ? 'All experiences' : category}</button>)}
      </div>
      <div className="-mx-5 sm:mx-0">
        <ExperienceCarousel key={filter} items={visible} />
      </div>
      <div className="mt-12 rounded-3xl bg-turmeric p-6 sm:p-10 [&>div]:mb-0">
      <SectionHeading
        eyebrow="Make time for a little fun"
        title="Follow your sense of adventure."
        description="On the water, in the pool, or around the games board — there’s more than one way to spend a good day together."
      />
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-turmeric/40 bg-gradient-to-r from-turmeric/25 to-primary/10 p-8">
        <p className="max-w-xl text-[13px] sm:text-sm leading-6 sm:leading-7">Ask the camp about activity availability, timings, safety guidance, and any additional charges. Children need adult supervision around pools and water.</p>
        <Button href="/plan-your-visit">Plan a day outdoors</Button>
      </div>
    </section>
  )
}
