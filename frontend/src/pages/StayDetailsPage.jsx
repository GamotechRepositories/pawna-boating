import StayGallery from '../components/StayGallery'
import villaOne from '../assets/villa-1.jpg'
import villaTwo from '../assets/villa-02.jpg'
import villaFour from '../assets/villa-04.jpg'
import { useParams } from 'react-router-dom'
import { useContent } from '../controllers/useContent'
import Button from '../components/Button'
import Icon from '../components/Icon'
import CampDetails from '../components/CampDetails'
import StayCard from '../components/StayCard'
import NotFoundPage from './NotFoundPage'

export default function StayDetailsPage() {
  const { data: stays, loading: staysLoading, error: staysError } = useContent('staying_experiences')
  const { stayId } = useParams()
  const stay = stays.find(item => item.id === stayId)
  if (staysLoading) return <p role="status" className="page-width py-12">Loading stay…</p>
  if (staysError) return <p role="status" className="page-width py-12">{staysError}</p>
  if (!stay) return <NotFoundPage />

  return <section className="page-width pb-12 pt-4 md:pb-20 md:pt-6">
    <div className="grid overflow-hidden rounded-2xl border border-sand bg-white shadow-sm lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <StayGallery key={stay.id} name={stay.id === 'villa' ? 'Villa Stay' : stay.name} images={stay.id === 'villa' ? [stay.image, villaOne, villaTwo, villaFour] : [stay.image]} />
      <div className="min-w-0 self-center px-3 py-5 sm:p-6 lg:p-8">
        {stay.tag && <p className="text-xs font-semibold uppercase tracking-widest text-jungle">{stay.tag}</p>}
        <h1 className={`${stay.tag ? 'mt-2' : ''} font-display text-2xl leading-tight text-balance text-mountain sm:text-3xl lg:text-4xl`}>{stay.name}</h1>
        <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-3xl font-semibold tabular-nums text-mountain">₹{stay.price}<span className="text-sm font-normal text-forest/75">{stay.priceUnit}</span></p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-forest/80">{stay.description}</p>
        {stay.id === 'villa' && <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-jungle/5 px-3 py-1.5 text-xs font-semibold text-jungle"><Icon name="flame" className="size-4" />Private bonfire included</p>}
        <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-sand py-4">
          <div><dt className="flex items-center gap-2 text-xs text-forest/65"><Icon name="login" className="size-4 text-jungle" />Check-in</dt><dd className="mt-1.5 text-sm font-semibold text-forest">4 pm onwards</dd></div>
          <div><dt className="flex items-center gap-2 text-xs text-forest/65"><Icon name="logout" className="size-4 text-jungle" />Check-out</dt><dd className="mt-1.5 text-sm font-semibold text-forest">11 am</dd></div>
        </dl>
        <div className="mt-5"><Button href={`/plan-your-visit?stay=${stay.id}`} className="w-full bg-[#F8C454]! hover:bg-[#edb63e]! sm:w-auto">Plan this stay</Button></div>
        <p className="mt-3 max-w-xl text-xs leading-5 text-forest/65">Prices may vary on weekends, national holidays and special days. Children above 5 years are charged.</p>
      </div>
    </div>
    <CampDetails stay={stay} />
    <section className="mt-14" aria-labelledby="other-stays-heading">
      <h2 id="other-stays-heading" className="font-display text-2xl text-mountain sm:text-3xl">Explore our other stays</h2>
      <div className="mt-8 flex items-start py-2 snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>div]:min-w-0 [&>div]:flex-none [&>div]:basis-[calc((100%_-_0.75rem)/1.2)] [&>div]:snap-start sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible lg:grid-cols-3">{stays.filter(item => item.id !== stay.id).map((item, index) => <StayCard carousel key={item.id} stay={item} index={index} title={item.id === 'villa' ? 'Villa Stay' : item.name} />)}</div>
    </section>
  </section>
}
