import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export const DEFAULT_ACCENT = '#2965e4'

export interface AccentPreset {
  id: string
  value: string
  label: string
}

export const ACCENT_PRESETS: readonly AccentPreset[] = [
  { id: 'dark', value: '#2d2d2d', label: 'Dark Charcoal' },
  { id: 'pink', value: '#e32979', label: 'Magenta Pink' },
  { id: 'blue', value: '#2965e4', label: 'Brand Blue' },
] as const

export interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
  accentColor: string
  setAccentColor: (color: string) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function useAccent() {
  const { accentColor, setAccentColor } = useTheme()
  return { accentColor, setAccentColor }
}
