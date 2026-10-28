import VideoGallery from '../components/VideoGallery'
import { getawayVideos } from '../utility/videos'
import Reveal from '../components/Reveal'
import { photos, stays, activities } from '../utility/content'
import Button from '../components/Button'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
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
  return <><section className="relative isolate min-h-[650px] overflow-hidden bg-forest text-white"><img src={homeImage} alt="Pawna restaurant and outdoor seating lit up at sunset" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/55 to-forest/10" /><Reveal className="page-width pb-24 pt-44 md:pb-28 md:pt-52"><p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.23em]"><span className="h-px w-9 bg-secondary" /> More outside. More alive.</p><h1 className="max-w-3xl font-display text-4xl sm:text-6xl leading-[1.06] tracking-tight md:text-8xl">Leave the rush.<br />Find your <em className="font-normal text-secondary">wild.</em></h1><p className="mt-7 max-w-md text-sm sm:text-base leading-6 sm:leading-7 text-white/85">Wake up to nature. Drift into adventure.<br />Discover stays, river days, and little moments that bring everyone closer.</p><div className="mt-9 flex flex-wrap gap-4"><Button href="/stays">Find your kind of stay</Button><a href="/experiences" className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-white/50 px-6 text-[13px] sm:text-sm font-medium hover:bg-white/10">Explore experiences <Icon name="arrow" /></a></div><div className="mt-16 flex flex-wrap gap-8 text-xs text-white/85"><span className="flex items-center gap-2"><Icon name="tent" /> Four ways to stay</span><span className="flex items-center gap-2"><Icon name="boat" /> River adventures</span><span className="flex items-center gap-2"><Icon name="sun" /> Fun for every age</span></div></Reveal><span className="absolute bottom-6 right-8 hidden text-xs tracking-widest text-white/60 md:block">UNPLUG. EXPLORE. RECONNECT.</span></section><HomeHighlights /><section className="page-width py-20 md:py-24"><SectionHeading eyebrow="A place for your kind of getaway" title="Less everyday. More outdoors." description="Slow mornings or full days of play. A quiet escape or the whole gang together. At Paluma, there’s space to make the getaway your own."><a href="/plan-your-visit" className="text-link">Get to know your getaway <Icon /></a></SectionHeading><div className="mt-14"><SectionHeading eyebrow="Make yourself at home" title="Stay close to nature."><a className="text-link" href="/stays">Discover all stays <Icon /></a></SectionHeading><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{stays.map((stay,index) => <StayCard key={stay.id} stay={stay} index={index} />)}</div><p className="mt-6 text-xs text-forest/60">Photography is illustrative. Ask about actual accommodation details when planning your visit.</p></div></section><section className="bg-[#0B59BE] text-white"><ScrollBoat /><div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:min-h-[560px] md:flex-row md:items-start md:justify-between md:gap-12"><ImageCarousel className="w-full min-w-0 md:w-1/2 md:shrink-0" images={[
    { src: adventureImage, alt: 'Friends wearing life jackets enjoy boating at Pawna Boating and Jungle River Camping.' },
    { src: playImage, alt: 'Outdoor activities at Pawna: cricket, archery, badminton and flying disc, alongside lakeside boating, camping and bonfires.' },
  ]} /><div className="w-full min-w-0 px-5 pb-8 pt-4 sm:px-8 md:max-w-xl md:flex-1 md:self-center md:pb-8 md:pt-4 md:pl-0 md:pr-8"><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-secondary">Go on. Get out there.</p><h2 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.08] tracking-tight text-white"><span className="block">Good days</span><span className="block">don’t need</span><span className="block">a screen.</span></h2><div aria-hidden="true" className="mt-6 h-1 w-14 rounded-full bg-secondary" /><p className="mt-6 max-w-md text-base leading-7 text-white/85">A boat ride. One more game. A splash in the pool. Fill your day with the things you never quite find time for.</p><ul className="my-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">{activities.filter(a => ['Boating','Swimming pool','Archery','Kids play area'].includes(a.name)).map(a => <li className="flex items-center gap-3 text-sm font-medium" key={a.name}><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15"><Icon name={a.icon} className="size-6 text-white" /></span>{a.name}</li>)}</ul><Button href="/experiences" secondary>Find your next adventure</Button></div></div></section><HangingPhotoGallery backgroundImage={photos.hero} images={[
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
