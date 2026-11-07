import SectionHeading from '../components/SectionHeading'
import StayCard from '../components/StayCard'
import { useContent } from '../controllers/useContent'
export default function StaysPage() {
  const { data: stays, loading: staysLoading, error: staysError } = useContent('staying_experiences')
  return <section className="page-width pb-16 pt-4 md:pb-24 md:pt-6"><SectionHeading eyebrow="" title="Four stays. Your kind of escape." description="From the simplicity of camping to space for the whole group, find a base for your days outdoors. Select a stay to start your visit plan." /><div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4">{staysLoading && <p role="status">Loading stays…</p>}{staysError && <p role="status">{staysError}</p>}{!staysLoading && !staysError && !stays.length && <p>No stays are currently available.</p>}{stays.map((stay,index) => <StayCard key={stay.id} stay={stay} index={index} />)}</div><div className="mt-14 rounded-xl border border-sand bg-white p-6 max-sm:px-3 text-[13px] sm:text-sm leading-6 sm:leading-7">Prices may vary on weekends, national holidays and special days. Children above 5 years are charged. Online checkout collects the full package amount; the camp confirms availability separately. Check-in from 4 pm; check-out at 11 am.</div></section>
}
