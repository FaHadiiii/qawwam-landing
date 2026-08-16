import { useEffect, useRef, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

export function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

interface ParallaxState {
  shiftX: number
  shiftY: number
}

export function useMouseParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<ParallaxState>({
    shiftX: 0,
    shiftY: 0,
  })
  const raf = useRef<number>(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(min-width: 768px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mq.matches || reduced.matches) return

    const onMove = (e: PointerEvent) => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = 0
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return
        const nx = (e.clientX - rect.left) / rect.width - 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5
        setState({ shiftX: -nx * 16, shiftY: -ny * 10 })
      })
    }
    const onLeave = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = 0
        setState({ shiftX: 0, shiftY: 0 })
      })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return { ref, ...state }
}

export function useScrollParallax(offset = 0.12) {
  const [parallax, setParallax] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = 0
        setParallax(window.scrollY * offset)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [offset])

  return parallax
}

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
