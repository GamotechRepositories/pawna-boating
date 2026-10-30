import VideoGallery from '../components/VideoGallery'
import { getawayVideos } from '../utility/videos'
import Reveal from '../components/Reveal'
import { photos, stays, activities } from '../utility/content'
import Button from '../components/Button'
import Icon from '../components/Icon'
import StayCard from '../components/StayCard'
import HomeHighlights from '../components/HomeHighlights'
import HangingPhotoGallery from '../components/HangingPhotoGallery'
import adventureImage from '../assets/p1.jpg'
import playImage from '../assets/play.jpg'
import ImageCarousel from '../components/ImageCarousel'
import ScrollBoat from '../components/ScrollBoat'
import tentImage from '../assets/tent.jpg'
import infoImage from '../assets/info.jpg'
import info2Image from '../assets/info2.jpg'
import locationImage from '../assets/location.jpg'
import partyImage from '../assets/party.jpg'
import homeImage from '../assets/home.png'
export default function HomePage() {
  return <><section className="relative isolate min-h-[650px] overflow-hidden bg-forest text-white"><img src={homeImage} alt="Pawna restaurant and outdoor seating lit up at sunset" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover brightness-50" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/55 to-forest/10" /><Reveal className="page-width pb-36 pt-44 md:pb-40 md:pt-52"><p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.23em]"><span className="h-px w-9 bg-secondary" /> More outside. More alive.</p><h1 className="max-w-3xl font-display text-4xl sm:text-6xl leading-[1.06] tracking-tight md:text-8xl">Leave the rush.<br />Find your <em className="font-normal text-secondary">wild.</em></h1><p className="mt-7 max-w-md text-sm sm:text-base leading-6 sm:leading-7 text-white/85">Wake up to nature. Drift into adventure.<br />Discover stays, river days, and little moments that bring everyone closer.</p><div className="mt-9 flex flex-wrap gap-4"><Button href="/stays">Find your kind of stay</Button><a href="/experiences" className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-white/50 px-6 text-[13px] sm:text-sm font-medium hover:bg-white/10">Explore experiences <Icon name="arrow" /></a></div><div className="mt-16 grid grid-cols-3 gap-3 text-center text-xs leading-5 text-white/85 sm:flex sm:flex-wrap sm:gap-8 sm:text-left sm:leading-normal"><span className="flex min-w-0 flex-col items-center gap-2 sm:flex-row"><Icon name="tent" className="size-6 shrink-0 sm:size-5" /><span>Four ways to stay</span></span><span className="flex min-w-0 flex-col items-center gap-2 sm:flex-row"><Icon name="boat" className="size-6 shrink-0 sm:size-5" /><span>River adventures</span></span><span className="flex min-w-0 flex-col items-center gap-2 sm:flex-row"><Icon name="sun" className="size-6 shrink-0 sm:size-5" /><span>Fun for every age</span></span></div></Reveal><span className="absolute bottom-20 right-8 hidden text-xs tracking-widest text-white/60 md:block">UNPLUG. EXPLORE. RECONNECT.</span></section><HomeHighlights /><section className="page-width pt-4 lg:pt-8"><div className="text-center"><h2 className="section-title"><span className="block">Pick Your</span><span className="block">Staying Experience</span></h2></div><div className="mt-6 sm:mt-14"><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{stays.map((stay,index) => <StayCard key={stay.id} stay={stay} index={index} />)}</div><p className="mt-6 text-xs text-forest/60">Photography is illustrative. Ask about actual accommodation details when planning your visit.</p></div></section><section className="bg-[#0B59BE] pb-12 text-white md:pb-16"><ScrollBoat /><div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:min-h-[560px] md:flex-row md:items-start md:justify-between md:gap-12"><ImageCarousel className="w-full min-w-0 md:w-1/2 md:shrink-0" images={[
    { src: adventureImage, alt: 'Friends wearing life jackets enjoy boating at Pawna Boating and Jungle River Camping.' },
    { src: playImage, alt: 'Outdoor activities at Pawna: cricket, archery, badminton and flying disc, alongside lakeside boating, camping and bonfires.' },
  ]} /><div className="w-full min-w-0 px-5 pb-8 pt-4 sm:px-8 md:max-w-xl md:flex-1 md:self-center md:pb-8 md:pt-4 md:pl-0 md:pr-8"><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-secondary">Go on. Get out there.</p><h2 className="section-title text-white"><span className="block">Good Days</span><span className="block">Don’t Need</span><span className="block">A Screen.</span></h2><div aria-hidden="true" className="mt-6 h-1 w-14 rounded-full bg-secondary" /><p className="mt-6 max-w-md text-base leading-7 text-white/85">A boat ride. One more game. A splash in the pool. Fill your day with the things you never quite find time for.</p><ul className="my-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">{activities.filter(a => ['Boating','Swimming pool','Archery','Kids play area'].includes(a.name)).map(a => <li className="flex items-center gap-3 text-sm font-medium" key={a.name}><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15"><Icon name={a.icon} className="size-6 text-white" /></span>{a.name}</li>)}</ul><Button href="/experiences" secondary>Find your next adventure</Button></div></div></section><HangingPhotoGallery backgroundImage={photos.hero} images={[
    { src: tentImage, alt: 'Pawna tent accommodation.', caption: 'Your outdoor escape' },
    { src: infoImage, alt: 'Pawna getaway information.', caption: 'Plan your getaway' },
    { src: info2Image, alt: 'More information about the Pawna getaway.', caption: 'Discover a little more' },
    { src: locationImage, alt: 'Pawna location information.', caption: 'Find your way here' },
    { src: partyImage, alt: 'Party moments at Pawna.', caption: 'Celebrate together' },
  ]} /><VideoGallery
    spacing="pt-2 pb-6 md:pt-4 md:pb-10"
    videos={getawayVideos}
    eyebrow="The getaway, in motion"
    title="A little closer to being here."
    description="Press play for a glimpse of Pawna. Your next outdoor escape starts with a little inspiration."
  /><section className="page-width py-20"><Reveal className="flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-mountain px-8 py-12 text-white md:px-14"><div><p className="mb-3 text-xs uppercase tracking-[.2em] text-secondary">Collect moments, together</p><h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Your out-of-office starts here.</h2><p className="mt-4 text-white/75">Bring your people. We’ll help you find your kind of escape.</p></div><Button href="/plan-your-visit">Let’s plan your visit</Button></Reveal></section></>
}
