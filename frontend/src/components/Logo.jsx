import pawnaLogo from '../assets/pawnaLogo-Photoroom.png'

export default function Logo({ footer = false }) {
  return (
    <a
      href="/"
      aria-label="Pawna Boating & Jungle River Camp home"
      className={`inline-flex shrink-0 items-center justify-center rounded-lg ${footer ? 'p-3' : 'p-1'}`}
    >
      <img
        src={pawnaLogo}
        alt="Pawna Boating & Jungle River Camp"
        width="1288"
        height="937"
        className={`w-auto object-contain ${footer ? 'h-32' : 'h-12 sm:h-16'}`}
      />
    </a>
  )
}
