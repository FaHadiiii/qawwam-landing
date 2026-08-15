import type { SVGProps } from 'react'

export type IconName =
  | 'quran'
  | 'clock'
  | 'dua'
  | 'tasbih'
  | 'compass'
  | 'calendar'
  | 'heart'
  | 'chart'
  | 'moon'
  | 'globe'
  | 'sun'
  | 'menu'
  | 'close'
  | 'arrowRight'
  | 'chevronDown'
  | 'play'
  | 'check'
  | 'moonStar'
  | 'sunBright'
  | 'drop'
  | 'plus'

const paths: Record<IconName, React.ReactNode> = {
  quran: (
    <>
      <path d="M12 6c-2.5-2-6-2-8-2v13c2-1 5.5-1 8 1 2.5-2 6-2 8-1V4c-2 0-5.5 0-8 2Zm0 0v13" />
      <path d="M9.5 7.5h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  dua: (
    <>
      <path d="M12 3c-4.5 3-8 3.5-9 3.5V19c5-.5 8 1 9 2 1-1 4-2.5 9-2V6.5c-1 0-4.5-.5-9-3.5Z" />
      <path d="M12 6v15" />
    </>
  ),
  tasbih: (
    <>
      <circle cx="12" cy="19" r="2.5" />
      <path d="M12 6.5a8.5 8.5 0 1 0 8.5 8.5" />
      <circle cx="12" cy="3" r="1.6" />
      <circle cx="7.6" cy="4.6" r="1.3" />
      <circle cx="17.4" cy="6.4" r="1.3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <circle cx="12" cy="14" r="0.2" />
    </>
  ),
  heart: (
    <path d="M12 20.5S3.5 15.5 3.5 9.2A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 8.5 2.2c0 6.3-8.5 11.3-8.5 11.3Z" />
  ),
  chart: (
    <>
      <path d="M4 4v15a1 1 0 0 0 1 1h15" />
      <path d="M8 15v-4M12 15V8M16 15v-6" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  play: <path d="M8 5.5v13l11-6.5Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  moonStar: (
    <>
      <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
      <path d="M17 3v4M15 5h4" />
    </>
  ),
  sunBright: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
    </>
  ),
  drop: <path d="M12 3c3 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-6.5 6-11Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
