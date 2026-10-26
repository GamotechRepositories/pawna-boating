import palette from '../styles.json'

// Keep styles.json as the single source of truth for brand colours.
export function applyTheme() {
  Object.entries(palette.colors).forEach(([name, color]) => {
    document.documentElement.style.setProperty(`--brand-${name}`, color.hex)
  })
}
