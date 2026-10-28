import { motion as Motion, useReducedMotion } from 'motion/react'

export default function Reveal({ children, className = '', delay = 0 }) {
  const reducedMotion = useReducedMotion()
  return (
    <Motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 1.1, delay: reducedMotion ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Motion.div>
  )
}
