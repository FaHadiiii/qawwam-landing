import { useCallback, useEffect, useState, type ReactNode } from 'react'
import {
  ThemeContext,
  DEFAULT_ACCENT,
  ACCENT_PRESETS,
  type Theme,
} from './theme-context'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('qawwam-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

function getInitialAccent(): string {
  if (typeof window === 'undefined') return DEFAULT_ACCENT
  const stored = window.localStorage.getItem('qawwam-accent')
  if (stored && ACCENT_PRESETS.some((preset) => preset.value === stored)) {
    return stored
  }
  return DEFAULT_ACCENT
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [accentColor, setAccentColorState] = useState<string>(getInitialAccent)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0F0F0F' : '#FFFFFF')
    }
    window.localStorage.setItem('qawwam-theme', theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', accentColor)
    window.localStorage.setItem('qawwam-accent', accentColor)
  }, [accentColor])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])
  const toggle = useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  )
  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color)
  }, [])

  return (
    <ThemeContext.Provider
      value={{ theme, toggle, setTheme, accentColor, setAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
