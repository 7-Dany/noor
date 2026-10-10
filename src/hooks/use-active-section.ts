import { useMemo, useSyncExternalStore } from "react"

// Matches scroll-mt-24 on OutlineSection: where a jumped-to section lands.
const HEADER_OFFSET = 96

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
])

// Active section: the last one whose top has crossed an activation line.
// The line sits under the sticky header and, over the last viewport of
// scrolling, slides down to the viewport bottom. That way trailing sections
// too short to ever reach the header still get their turn, in order.
function locate(ids: readonly string[]) {
  const viewport = window.innerHeight
  const remaining =
    document.documentElement.scrollHeight - viewport - window.scrollY
  // Full travel of the line: header offset down to the viewport bottom.
  const travel = viewport - HEADER_OFFSET
  const line = viewport - Math.min(Math.max(remaining, 0), travel)

  let current: string | undefined = ids[0]
  for (const id of ids) {
    const el = document.getElementById(id)
    // +1 absorbs sub-pixel rounding after an anchor jump.
    if (el && el.getBoundingClientRect().top <= line + 1) current = id
  }
  return current
}

// Scroll position is an external store: React reads it, never mirrors it
// into state. Position alone can't say which link was clicked (near the
// page end the line has already dropped, so neighbours look crossed too),
// so `select` records the click as intent and pins it. The pin holds
// through the jump's own scroll events and is released by the next
// user-driven scroll: wheel, pointer press or a scroll key.
function createStore(ids: readonly string[]) {
  const listeners = new Set<() => void>()
  let active: string | undefined = ids[0]
  let pinned = false

  const set = (next: string | undefined) => {
    if (next === active) return
    active = next
    for (const listener of listeners) listener()
  }

  return {
    getSnapshot: () => active,
    getServerSnapshot: () => ids[0],

    select: (id: string) => {
      pinned = true
      set(id)
    },

    subscribe: (listener: () => void) => {
      listeners.add(listener)

      let frame = 0
      const measure = () => {
        frame = 0
        if (!pinned) set(locate(ids))
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(measure)
      }
      const release = () => {
        pinned = false
      }
      const onKeyDown = (event: KeyboardEvent) => {
        if (SCROLL_KEYS.has(event.key)) release()
      }

      measure()
      window.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule)
      window.addEventListener("wheel", release, { passive: true })
      window.addEventListener("pointerdown", release, { passive: true })
      window.addEventListener("keydown", onKeyDown)

      return () => {
        if (frame) cancelAnimationFrame(frame)
        window.removeEventListener("scroll", schedule)
        window.removeEventListener("resize", schedule)
        window.removeEventListener("wheel", release)
        window.removeEventListener("pointerdown", release)
        window.removeEventListener("keydown", onKeyDown)
        listeners.delete(listener)
      }
    },
  }
}

// `ids` are DOM ids in page order and must be a stable array.
export function useActiveSection(ids: readonly string[]) {
  const store = useMemo(() => createStore(ids), [ids])
  const active = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  )
  return { active, select: store.select }
}
