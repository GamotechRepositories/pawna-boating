import StayGallery from '../components/StayGallery'
import villaOne from '../assets/villa-1.jpg'
import villaTwo from '../assets/villa-02.jpg'
import villaFour from '../assets/villa-04.jpg'
import { useParams } from 'react-router-dom'
import { stays } from '../utility/content'
import Button from '../components/Button'
import CampDetails from '../components/CampDetails'
import StayCard from '../components/StayCard'
import NotFoundPage from './NotFoundPage'

export default function StayDetailsPage() {
  const { stayId } = useParams()
  const stay = stays.find(item => item.id === stayId)
  if (!stay) return <NotFoundPage />

  return <section className="page-width pb-12 pt-4 md:pb-20 md:pt-6">
    <div className="grid overflow-hidden rounded-2xl border border-sand bg-white shadow-sm lg:grid-cols-[2fr_3fr]">
      {stay.id === 'villa'
        ? <StayGallery key={stay.id} name="Villa Stay" images={[stay.image, villaOne, villaTwo, villaFour]} />
        : <img src={stay.image} alt={stay.name} className="h-64 w-full self-center object-contain sm:h-80 lg:h-96" />}
      <div className="self-center p-4 sm:p-5 lg:p-6">
        {stay.tag && <p className="text-xs font-semibold uppercase tracking-widest text-jungle">{stay.tag}</p>}
        <h1 className="mt-3 font-display text-4xl text-mountain sm:text-5xl">{stay.name}</h1>
        <p className="mt-5 text-2xl font-semibold text-mountain">₹{stay.price} <span className="text-sm font-normal text-forest/75">{stay.priceUnit}</span></p>
        <p className="mt-5 text-sm leading-7 text-forest/80">{stay.description}</p>
        {stay.id === 'villa' && <p className="mt-4 text-sm font-semibold text-jungle">Private bonfire included</p>}
        <p className="mt-5 text-sm leading-7">Check-in from 4 pm · Check-out at 11 am<br />Yelse, Pawna</p>
        <div className="mt-7"><Button href={`/plan-your-visit?stay=${stay.id}`}>Plan this stay</Button></div>
        <p className="mt-4 text-xs leading-6 text-forest/70">Prices may vary on weekends, national holidays and special days. Children above 5 years are charged.</p>
      </div>
    </div>
    <CampDetails stay={stay} />
    <section className="mt-14" aria-labelledby="other-stays-heading">
      <h2 id="other-stays-heading" className="font-display text-2xl text-mountain sm:text-3xl">Explore our other stays</h2>
      <div className="mt-8 flex items-start py-2 snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>div]:min-w-0 [&>div]:flex-none [&>div]:basis-[calc((100%_-_0.75rem)/1.2)] [&>div]:snap-start sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible lg:grid-cols-3">{stays.filter(item => item.id !== stay.id).map((item, index) => <StayCard carousel key={item.id} stay={item} index={index} title={item.id === 'villa' ? 'Villa Stay' : item.name} />)}</div>
    </section>
  </section>
}
