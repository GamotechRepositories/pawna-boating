import { Link } from 'react-router-dom'
import { motion as Motion, useReducedMotion } from 'motion/react'
import Icon from './Icon'
const MotionLink = Motion.create(Link)

export default function Button({ children, href, secondary = false, className = '', ...props }) {
  const reducedMotion = useReducedMotion()
  const interaction = {
    whileHover: reducedMotion ? undefined : { y: -2 },
    whileTap: reducedMotion ? undefined : { scale: 0.97 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }
  const classes = `inline-flex min-h-12 items-center justify-center gap-4 rounded-lg px-4 py-3 sm:px-6 text-[13px] sm:text-sm font-semibold transition-colors duration-400 ease-in-out ${secondary ? 'bg-jungle text-white hover:bg-mountain' : 'bg-primary text-forest hover:bg-secondary'} ${className}`
  if (href?.startsWith('/')) return <MotionLink {...interaction} to={href} className={classes} {...props}>{children}<Icon name="arrow" /></MotionLink>
  return href ? <Motion.a {...interaction} href={href} className={classes} {...props}>{children}<Icon name="arrow" /></Motion.a> : <Motion.button {...interaction} className={classes} {...props}>{children}<Icon name="arrow" /></Motion.button>
}
