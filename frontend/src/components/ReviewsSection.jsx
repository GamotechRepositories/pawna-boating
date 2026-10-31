import { useRef } from 'react'
import Reveal from './Reveal'
import Icon from './Icon'

const reviews = [
  { name: 'Deepak Bajaj', text: 'Absolutely peaceful getaway experience. Great for big groups with very polite staff and good food. Cheers.. keep it up👍 …' },
  { name: 'Mahesh Bhatkar', text: 'Very nice place in Pawananagar for boating and camping, Spacious and calm environment, great ambience 👌, freindly and Cooperative crew. …' },
  { name: 'Varsha Gorde', text: 'It was a great experience. The staff is very cooperative and the service is also very good.😊 …' },
  { name: 'Chaithara S', text: 'Amazing experience! Good facilities,good food and hospitality..what more could you ask for!Highly recommended:)' },
  { name: 'Satish Shinde', text: 'One of the beast place river side near pawna. The place is huge with boating nd swimming pool. Really a peaceful place' },
  { name: 'Raunak Nehe',  text: 'A relaxing weekend by the water, with plenty of space to unwind and enjoy a quiet break with friends.' },
  { name: 'Roshan Mathure', text: 'We enjoyed the outdoor games and the peaceful setting. A lovely spot to spend time together as a family.' },
  { name: 'Tushar Shinde', text: 'Boating, good company, and an evening outdoors made this a memorable getaway. We left feeling refreshed and happy.' },
  { name: 'Sushil Makde', text: 'A peaceful outdoor escape with room to relax and play. Spending the evening by the river was a lovely experience.' },
]
const mapsUrl = 'https://www.google.com/maps/place/Pawna+boating+camping/@18.6832061,73.5281079,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2a96d7997ae95:0x32392dd5e8767d68!8m2!3d18.6832061!4d73.5281079!16s%2Fg%2F11h3ldnpb4'

export default function ReviewsSection() {
  const trackRef = useRef(null)
  const scroll = direction => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (card) track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <section className="page-width py-12 md:py-16" aria-labelledby="guest-reviews-heading">
    <Reveal className="text-center">
      <h2 id="guest-reviews-heading" className="section-title">Guest reviews</h2>
      <p className="mt-3 text-xs text-forest/60">Excerpts from guest reviews</p>
    </Reveal>
    <div ref={trackRef} role="region" aria-label="Guest review carousel" tabIndex={0} className="reviews-carousel mt-8 flex items-start snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
      {reviews.map((review, index) => <Reveal key={review.name} delay={Math.min(index, 3) * 0.1} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
        <figure style={{ backgroundColor: index % 2 === 0 ? '#C4D6D8' : '#D3D460' }} className="rounded-3xl p-6 sm:p-8">
          <blockquote>
            <h3 className="text-lg font-black leading-tight tracking-tight text-[#07366B] sm:text-xl">“{review.text.split(/[.!]/)[0].split(' ').slice(0, 7).join(' ')}”</h3>
            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#594A20] sm:text-base">{review.text}</p>
          </blockquote>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Read more guest reviews on Google Maps" className="mt-2 inline-flex min-h-11 items-center text-sm text-[#594A20] underline-offset-4 hover:underline">Read More</a>
          <figcaption className="mt-3 border-t border-[#163828]/30 pt-4 text-base font-medium text-[#15283F]">
            {review.name}
            {review.demo && <span className="mt-1 block text-xs">Demo review · sample content</span>}
          </figcaption>
        </figure>
      </Reveal>)}
    </div>
    <div className="mt-5 flex justify-center gap-3">
      <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className="flex size-11 items-center justify-center rounded-full border border-sand bg-white text-forest hover:bg-sand"><Icon name="arrow" className="size-5 rotate-180" /></button>
      <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className="flex size-11 items-center justify-center rounded-full border border-sand bg-white text-forest hover:bg-sand"><Icon name="arrow" className="size-5" /></button>
    </div>
    <div className="mt-6 text-center"><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-jungle px-5 text-sm font-semibold text-jungle transition-colors hover:bg-river-surface">View on Google Maps</a></div>
  </section>
}
