import { stayPackages } from '../utility/packages'
import { bookingPhones } from '../utility/content'
import Icon from './Icon'

function inclusionIcon(label) {
  if (/tent|glamping/i.test(label)) return 'campTent'
  if (/villa|container/i.test(label)) return 'cabin'
  if (/tea|breakfast|snacks/i.test(label)) return 'coffee'
  if (/BBQ|bonfire/i.test(label)) return 'flame'
  if (/dinner/i.test(label)) return 'utensils'
  if (/pool|boating/i.test(label)) return 'waves'
  if (/music/i.test(label)) return 'music'
  if (/kids/i.test(label)) return 'family'
  if (/indoor/i.test(label)) return 'games'
  if (/outdoor/i.test(label)) return 'ball'
  return 'check'
}

const facilities = [
  'Exclusive tents and glamping huts', 'Waterfront villas',
  'Welcome snacks and tea', 'Limited BBQ — vegetarian and non-vegetarian',
  'Unlimited dinner — vegetarian and non-vegetarian', 'Breakfast and tea before checkout',
  'Swimming pool and boating', 'Music, dance floor and bonfire', 'Kids play area',
  'Indoor games: chess, carrom, darts and archery',
  'Outdoor games: cricket, badminton, table tennis and fishing',
]
const schedule = [
  ['Check-in', '4 pm onwards', 'login'], ['Tea and pakoda', '4–6 pm', 'coffee'],
  ['Limited BBQ · veg & non-veg', '7–8 pm', 'flame'],
  ['Unlimited dinner · veg & non-veg', '9:30–11 pm', 'utensils'],
  ['Silent hours', '11:30 pm–8 am', 'moon'],
  ['Next-day breakfast and tea', '8:30–10 am', 'coffee'], ['Check-out', '11 am', 'logout'],
]

export function CampFacilities({ stay }) {
  const selectedPackage = stay ? (stay.package || stayPackages[stay.id]) : null
  const inclusions = selectedPackage?.inclusions || facilities
  return <section className="rounded-2xl border border-sand bg-white p-6 max-sm:px-3 sm:p-10" aria-labelledby="facilities-heading">
    <h2 id="facilities-heading" className="font-display text-2xl text-mountain sm:text-3xl">{selectedPackage?.title || 'Our camping packages'}</h2>
    {selectedPackage && <div className="mt-3"><p className="text-lg font-semibold text-mountain">₹{stay.price} <span className="text-sm font-normal text-forest/75">{stay.priceUnit}</span></p><p className="mt-2 text-sm text-forest/80">{selectedPackage.accommodation}</p></div>}
    <p className="mt-3 max-w-2xl text-sm leading-7 text-forest/80">Pawna Boating &amp; Jungle River Camp, Yelse, Pawna. Spread across 2 acres, with a swimming pool, boating, a dance floor and a kids play area.</p>
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">{inclusions.map(item => <li key={item} className="flex gap-3 text-sm leading-6"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-river-surface text-jungle"><Icon name={inclusionIcon(item)} className="size-5" /></span><span className="py-1.5">{item}</span></li>)}</ul>
  </section>
}

export default function CampDetails({ stay }) {
  return <div className="mt-12 space-y-8">
    <CampFacilities stay={stay} />
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <section className="rounded-2xl bg-river-surface p-6 max-sm:px-3 sm:p-10" aria-labelledby="schedule-heading">
        <h2 id="schedule-heading" className="flex items-center gap-3 font-display text-2xl text-mountain sm:text-3xl"><Icon name="clock" className="size-6 shrink-0 text-jungle" />Your stay schedule</h2>
        <dl className="mt-6 divide-y divide-jungle/15">{schedule.map(([label, time, icon]) => <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-4 text-sm leading-6"><dt className="flex items-center gap-3"><Icon name={icon} className="size-5 shrink-0 text-jungle" />{label}</dt><dd className="font-semibold text-jungle">{time}</dd></div>)}</dl>
      </section>
      <section className="rounded-2xl border border-sand bg-white p-6 max-sm:px-3 sm:p-10" aria-labelledby="policy-heading">
        <h2 id="policy-heading" className="flex items-center gap-3 font-display text-2xl text-mountain sm:text-3xl"><Icon name="shield" className="size-6 shrink-0 text-jungle" />Booking &amp; cancellation policy</h2>
        <ul className="mt-6 list-disc space-y-4 pl-5 text-sm leading-7">
          <li>Online checkout collects the full package amount. The camp confirms availability and your booking separately.</li>
          <li>For last-minute cancellations, the booking amount is non-refundable. You may postpone your stay within the next 3 months using the same booking amount.</li>
          <li>Children above 5 years are charged.</li>
          <li>Prices may vary on weekends, national holidays and special days.</li>
        </ul>
        <h3 className="mt-8 font-semibold text-mountain">Bookings &amp; enquiries</h3>
        <div className="mt-3 space-y-3">{bookingPhones.map(number => <div key={number} className="flex flex-wrap items-center gap-x-5"><a className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-jungle" href={`tel:+91${number}`}><Icon name="phone" className="size-4" />{number}</a><a className="inline-flex min-h-11 items-center gap-2 text-sm text-jungle underline underline-offset-4" href={`https://wa.me/91${number}`} target="_blank" rel="noopener noreferrer"><Icon name="chat" className="size-4" />WhatsApp</a></div>)}</div>
      </section>
    </div>
  </div>
}
