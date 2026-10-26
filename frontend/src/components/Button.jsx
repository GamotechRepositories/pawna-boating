import Icon from './Icon'
export default function Button({ children, href, secondary = false, className = '', ...props }) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-4 rounded-lg px-6 py-3 text-[13px] sm:text-sm font-semibold transition-colors ${secondary ? 'bg-jungle text-white hover:bg-mountain' : 'bg-primary text-forest hover:bg-secondary'} ${className}`
  return href ? <a href={href} className={classes} {...props}>{children}<Icon name="arrow" /></a> : <button className={classes} {...props}>{children}<Icon name="arrow" /></button>
}
