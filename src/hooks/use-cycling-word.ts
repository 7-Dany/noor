import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"

const CYCLE_MS = 2800
const SLIDE_MS = 520

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeToReducedMotion(notify: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", notify)
  return () => query.removeEventListener("change", notify)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerSnapshot() {
  return false
}

// Cycles 0..count-1 on a timer with a printer slide: old word out up,
// new word in up, slot width tweened so neighbours hold still. Reduced
// motion: static first word, no timer.
//
// The interval stays non-reactive on purpose: it advances from a ref
// mirror of the committed index, so renders never reset it.
export function useCyclingWord(count: number) {
  const [index, setIndex] = useState(0)
  const [entering, setEntering] = useState<number | null>(null)
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  )
  const slotRef = useRef<HTMLSpanElement>(null)
  const currentRef = useRef<HTMLElement>(null)
  const enteringRef = useRef<HTMLElement>(null)
  const busyRef = useRef(false)
  const indexRef = useRef(0)

  // Ref mirror of the committed index, for the interval.
  useEffect(() => {
    indexRef.current = index
  })

  const commit = useCallback((next: number) => {
    setIndex(next)
    setEntering(null)
    busyRef.current = false
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      if (busyRef.current) return
      busyRef.current = true
      setEntering((indexRef.current + 1) % count)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion, count])

  // Slide the words and tween the slot width; commit on finish.
  useEffect(() => {
    if (entering === null) return
    const slot = slotRef.current
    const old = currentRef.current
    const next = enteringRef.current
    if (!slot || !old || !next) {
      commit(entering)
      return
    }
    const options: KeyframeAnimationOptions = {
      duration: SLIDE_MS,
      easing: "cubic-bezier(.22,.9,.3,1)",
      fill: "forwards",
    }
    const out = old.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      options
    )
    const inn = next.animate(
      [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
      options
    )
    const w0 = old.getBoundingClientRect().width
    const w1 = next.getBoundingClientRect().width
    const widen = slot.animate(
      [{ width: `${w0}px` }, { width: `${w1}px` }],
      options
    )
    let done = false
    Promise.all([out.finished, inn.finished, widen.finished])
      .then(() => {
        if (!done) commit(entering)
      })
      .catch(() => {})
    return () => {
      done = true
      for (const animation of [out, inn, widen]) {
        try {
          animation.cancel()
        } catch {
          // Already finished: nothing to cancel.
        }
      }
    }
  }, [entering, commit])

  return { index, entering, slotRef, currentRef, enteringRef }
}
