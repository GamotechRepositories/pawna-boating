import Reveal from './Reveal'
export default function SectionHeading({ eyebrow, title, description, children }) {
  return <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2>{description && <p className="mt-4 max-w-xl leading-6 sm:leading-7 text-forest/75">{description}</p>}</div>{children}</Reveal>
}
