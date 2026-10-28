import { motion as Motion, useReducedMotion } from 'motion/react'
import Icon from './Icon'
export default function Button({ children, href, secondary = false, className = '', ...props }) {
  const reducedMotion = useReducedMotion()
  const interaction = {
    whileHover: reducedMotion ? undefined : { y: -2 },
    whileTap: reducedMotion ? undefined : { scale: 0.97 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }
  const classes = `inline-flex min-h-12 items-center justify-center gap-4 rounded-lg px-6 py-3 text-[13px] sm:text-sm font-semibold transition-colors duration-400 ease-in-out ${secondary ? 'bg-jungle text-white hover:bg-mountain' : 'bg-primary text-forest hover:bg-secondary'} ${className}`
  return href ? <Motion.a {...interaction} href={href} className={classes} {...props}>{children}<Icon name="arrow" /></Motion.a> : <Motion.button {...interaction} className={classes} {...props}>{children}<Icon name="arrow" /></Motion.button>
}
