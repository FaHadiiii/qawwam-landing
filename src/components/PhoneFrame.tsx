import { useTheme } from '../lib/theme-context'

interface PhoneFrameProps {
  name: string
  alt: string
  className?: string
  glow?: boolean
}

export function PhoneFrame({ name, alt, className, glow = true }: PhoneFrameProps) {
  const { theme } = useTheme()
  const src = `/screenshot/${theme}/${name}.png`

  return (
    <div className={`relative mx-auto w-[280px] sm:w-[300px] ${className ?? ''}`}>
      {glow && (
        <div
          aria-hidden
          className="absolute -inset-8 rounded-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl"
        />
      )}
      <div className="relative overflow-hidden rounded-[44px] border border-border bg-surface p-2 shadow-2xl dark:border-dark-border dark:bg-dark-surface">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-[9/19] w-full rounded-[36px] object-cover"
        />
      </div>
    </div>
  )
}
