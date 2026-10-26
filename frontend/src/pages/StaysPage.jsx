import SectionHeading from '../components/SectionHeading'
import StayCard from '../components/StayCard'
import { stays } from '../utility/content'
export default function StaysPage() {
  return <section className="page-width py-16 md:py-24"><SectionHeading eyebrow="Sleep somewhere different" title="Four stays. Your kind of escape." description="From the simplicity of camping to space for the whole group, find a base for your days outdoors. Select a stay to start your visit plan." /><div className="grid gap-x-10 gap-y-14 md:grid-cols-2">{stays.map((stay,index) => <StayCard key={stay.id} stay={stay} index={index} />)}</div><div className="mt-14 rounded-xl border border-sand bg-white p-6 text-[13px] sm:text-sm leading-6 sm:leading-7">Planning a stay? Confirm rates, availability, capacity, amenities, meals, and check-in times with the camp before booking. Images are illustrative, and do not show verified accommodation.</div></section>
}
