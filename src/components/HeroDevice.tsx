import { useEffect, useState } from 'react'
import { MockFrame } from 'react-mockframe'
import 'react-mockframe/styles/mockframe-iphones.css'
import { useTheme } from '../lib/theme-context'

const DEVICE_W = 375
const DEVICE_H = 812
const ZOOM_DESKTOP = 0.66
const ZOOM_MOBILE = 0.5

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return mobile
}

function DeviceFrame({
  name,
  alt,
  width,
}: {
  name: string
  alt: string
  width: number
}) {
  const { theme } = useTheme()
  const zoom = width / DEVICE_W
  return (
    <div style={{ width, height: DEVICE_H * zoom }}>
      <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
        <MockFrame
          device="iPhone 17"
          color="black"
          hideNotch
          style={{ width: DEVICE_W, height: DEVICE_H }}
        >
          <img
            src={`/screenshot/${theme}/${name}.png`}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </MockFrame>
      </div>
    </div>
  )
}

export function HeroDevice() {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const zoom = isMobile ? ZOOM_MOBILE : ZOOM_DESKTOP

  if (isMobile) {
    return (
      <div className="relative mx-auto w-fit">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl"
          />
          <DeviceFrame name="home" alt="Qawwam home screen with prayer times" width={DEVICE_W * ZOOM_MOBILE} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto">
      <div
        className="relative mx-auto"
        style={{ width: DEVICE_W * zoom + 64, height: DEVICE_H * zoom, perspective: '1400px' }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl"
        />

        {/* Floating accent — quran_1 (behind left) */}
        <div
          aria-hidden
          className="absolute -left-12 top-8 w-[132px] opacity-70"
          style={{ transform: 'rotateY(24deg) rotateX(8deg)' }}
        >
          <DeviceFrame name="quran_1" alt="" width={132} />
        </div>

        {/* Main tilted phone */}
        <div
          className="absolute left-16 top-0"
          style={{
            width: DEVICE_W,
            height: DEVICE_H,
            transform: `rotateY(-14deg) rotateX(6deg) scale(${zoom})`,
            transformOrigin: 'top left',
            transformStyle: 'preserve-3d',
          }}
        >
          <MockFrame
            device="iPhone 17"
            color="black"
            hideNotch
            style={{ width: DEVICE_W, height: DEVICE_H }}
          >
            <img
              src={`/screenshot/${theme}/home.png`}
              alt="Qawwam home screen with prayer times"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </MockFrame>
        </div>
      </div>

      {/* Floor shadow */}
      <div
        aria-hidden
        className="mx-auto mt-5 h-9 w-64 rounded-[100%] bg-black/30 blur-2xl dark:bg-black/60"
        style={{ transform: 'rotateX(12deg)' }}
      />
    </div>
  )
}
