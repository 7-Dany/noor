import {
  createContext,
  use,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useReducer,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
  type SyntheticEvent,
} from "react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Card, TONE_CLASSES, type Tone } from "@/components/ui/card"
import { pad } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"

/* Deck: stacked cards, one on top. Plain HTML only, no outside slots.
   DeckRail (bottom of this file) is an optional strip that drives the same
   deck; it only needs a <Deck> or <DeckProvider> above it. */

// Distance one rail arrow press scrolls the track.
const SCROLL_STEP_PX = 320

// Leave animation length (ms); mirrored as --deck-leave-ms per card.
const LEAVE_MS = 240

// Drag (px) that counts as a swipe; movement below this counts as a tap.
const SWIPE_THRESHOLD_PX = 40
const TAP_SLOP_PX = 6

// Taps here never advance the deck. Disabled buttons swallow pointer
// events, so they are matched by selector instead of defaultPrevented.
const INTERACTIVE_SELECTOR = "button, a, [data-deck-interactive]"

// Stack geometry: card k (0 = top) offsets by k × step. A parent can tune it
// with --deck-spread, --deck-tilt-step and --deck-zoom (whole-stack scale).
const SPREAD_PX = 18 // sideways px per card
const RISE_PX = 14 // upward px per card
const TILT_DEG = 4 // top-card rotation
const TILT_STEP_DEG = 2.5 // extra rotation per card behind
const SHRINK_STEP = 0.035 // scale lost per card

// Cards deeper than this stay parked at the last visible pose, invisible and
// without children, so a deck of any length costs a fixed number of nodes.
const MAX_DEPTH = 3

type DeckTone = Tone

type DeckItem = { id: string; tone: DeckTone }

// Consumer view: derived from the machine + items.
interface DeckState {
  items: readonly DeckItem[]
  activeIndex: number
  activeId: string
  leavingId: string | null // card flying to the back, null when idle
}

interface DeckActions {
  next: () => void
  previous: () => void
  select: (id: string) => void
}

interface DeckMeta {
  count: number
  indexOf: (id: string) => number
  positionOf: (id: string) => number // 0 = on top, 1 = next down, …
}

// Split so swipes (state) never re-render pure controls (actions).
const DeckStateContext = createContext<{
  state: DeckState
  meta: DeckMeta
} | null>(null)

const DeckActionsContext = createContext<{
  actions: DeckActions
} | null>(null)

// Must be used inside <Deck>.
function useDeckState() {
  const context = use(DeckStateContext)
  if (!context) throw new Error("useDeckState must be used within <Deck>.")
  return context
}

// Must be used inside <Deck>.
function useDeckActions() {
  const context = use(DeckActionsContext)
  if (!context) throw new Error("useDeckActions must be used within <Deck>.")
  return context
}
// Minimal reducer state; everything else is derived.
interface DeckMachine {
  activeId: string
  leavingId: string | null
}

// Order-dependent actions carry `ids` to keep the reducer pure.
type DeckAction =
  | { type: "START_NEXT" }
  | { type: "COMMIT_NEXT"; ids: readonly string[] }
  | { type: "PREVIOUS"; ids: readonly string[] }
  | { type: "SELECT"; id: string; ids: readonly string[] }

// Id `delta` steps from `fromId`, wrapping around.
function stepId(ids: readonly string[], fromId: string, delta: number) {
  const count = ids.length
  const from = Math.max(0, ids.indexOf(fromId))
  return ids[(from + delta + count) % count]
}

function createInitialMachine(
  ids: readonly string[],
  defaultId?: string
): DeckMachine {
  if (ids.length === 0) throw new Error("<Deck> needs at least one item.")
  const activeId = defaultId && ids.includes(defaultId) ? defaultId : ids[0]
  return { activeId, leavingId: null }
}

// idle -START_NEXT-> leaving -COMMIT_NEXT-> idle (next on top)
// idle -PREVIOUS/SELECT-> idle; leaving -SELECT-> idle (cancels advance)
// START_NEXT/PREVIOUS while leaving are ignored.
function deckReducer(state: DeckMachine, action: DeckAction): DeckMachine {
  switch (action.type) {
    case "START_NEXT":
      if (state.leavingId) return state
      return { ...state, leavingId: state.activeId }
    case "COMMIT_NEXT":
      if (!state.leavingId) return state
      return {
        activeId: stepId(action.ids, state.activeId, 1),
        leavingId: null,
      }
    case "PREVIOUS":
      if (state.leavingId) return state
      return { ...state, activeId: stepId(action.ids, state.activeId, -1) }
    case "SELECT":
      if (!action.ids.includes(action.id)) return state
      return { activeId: action.id, leavingId: null }
  }
}

type DeckProviderProps = {
  items: readonly DeckItem[] // stable reference (module const or memoised)
  defaultId?: string
  children?: ReactNode
}

// Owns deck state; <Deck> renders this. Use directly only when a sibling
// outside the deck frame needs the active card.
function DeckProvider({ items, defaultId, children }: DeckProviderProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const [machine, dispatch] = useReducer(deckReducer, undefined, () =>
    createInitialMachine(ids, defaultId)
  )

  // Reducer stays pure; the leave timer lives here. SELECT clears
  // leavingId first, whose cleanup cancels the pending commit.
  useEffect(() => {
    if (!machine.leavingId) return
    const timer = window.setTimeout(
      () => dispatch({ type: "COMMIT_NEXT", ids }),
      LEAVE_MS
    )
    return () => window.clearTimeout(timer)
  }, [machine.leavingId, ids])

  // id -> index, built once per `items`, so every card/rail lookup is O(1).
  const indexById = useMemo(
    () => new Map(ids.map((id, index) => [id, index])),
    [ids]
  )

  const stateValue = useMemo(() => {
    const count = ids.length
    const activeIndex = indexById.get(machine.activeId) ?? 0
    const indexOf = (id: string) => indexById.get(id) ?? -1

    return {
      state: {
        items,
        activeIndex,
        activeId: ids[activeIndex],
        leavingId: machine.leavingId,
      },
      meta: {
        count,
        indexOf,
        positionOf: (id: string) => (indexOf(id) - activeIndex + count) % count,
      },
    }
  }, [items, ids, indexById, machine])

  // Stable across swipes: dispatch never changes, ids only with `items`.
  const actionsValue = useMemo(
    () => ({
      actions: {
        next: () => dispatch({ type: "START_NEXT" }),
        previous: () => dispatch({ type: "PREVIOUS", ids }),
        select: (id: string) => dispatch({ type: "SELECT", id, ids }),
      },
    }),
    [ids]
  )

  return (
    <DeckStateContext value={stateValue}>
      <DeckActionsContext value={actionsValue}>{children}</DeckActionsContext>
    </DeckStateContext>
  )
}

// Consumer handler runs first; ours is skipped on preventDefault().
function composeHandlers<E extends SyntheticEvent>(
  external: ((event: E) => void) | undefined,
  internal: (event: E) => void
) {
  return (event: E) => {
    external?.(event)
    if (!event.defaultPrevented) internal(event)
  }
}

// Keyboard + pointer behavior for the deck surface. Memoised on `actions`
// (stable across swipes) so consumers never rebind it mid-gesture.
function useDeckGestures() {
  const { actions } = useDeckActions()
  const startX = useRef<number | null>(null)

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Arabic-first: left advances, right goes back.
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        actions.next()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        actions.previous()
      }
    },
    [actions]
  )
  const onPointerDown = useCallback((event: PointerEvent) => {
    startX.current = event.clientX
  }, [])
  const onPointerUp = useCallback(
    (event: PointerEvent) => {
      if (startX.current === null) return
      const dx = event.clientX - startX.current
      startX.current = null

      if (dx < -SWIPE_THRESHOLD_PX) actions.next()
      else if (dx > SWIPE_THRESHOLD_PX) actions.previous()
      else if (
        Math.abs(dx) < TAP_SLOP_PX &&
        !(event.target as HTMLElement).closest(INTERACTIVE_SELECTOR)
      )
        actions.next()
    },
    [actions]
  )
  const onPointerCancel = useCallback(() => {
    startX.current = null
  }, [])

  return useMemo(
    () => ({ onKeyDown, onPointerDown, onPointerUp, onPointerCancel }),
    [onKeyDown, onPointerDown, onPointerUp, onPointerCancel]
  )
}

type DeckProps = ComponentProps<"div"> & Omit<DeckProviderProps, "children">

// Root: provides state + positioning frame. Active-card readers go inside.
function Deck({ items, defaultId, className, ...props }: DeckProps) {
  return (
    <DeckProvider items={items} defaultId={defaultId}>
      <div data-slot="deck" className={cn("relative", className)} {...props} />
    </DeckProvider>
  )
}

// Focusable, swipeable, arrow-key surface that positions DeckCards.
function DeckContent({
  className,
  onKeyDown,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}: ComponentProps<"div">) {
  const gestures = useDeckGestures()

  return (
    <div
      data-slot="deck-content"
      role="group"
      aria-roledescription="carousel"
      aria-label="Deck"
      aria-live="polite"
      tabIndex={0}
      className={cn(
        "relative touch-pan-y rounded-xl outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      onKeyDown={composeHandlers(onKeyDown, gestures.onKeyDown)}
      onPointerDown={composeHandlers(onPointerDown, gestures.onPointerDown)}
      onPointerUp={composeHandlers(onPointerUp, gestures.onPointerUp)}
      onPointerCancel={composeHandlers(
        onPointerCancel,
        gestures.onPointerCancel
      )}
      {...props}
    />
  )
}

// One card: the Card swipe-stack frame. Pose arrives as --deck-* vars;
// `tone` overrides the tone from deck `items` (prefer the prop: it keeps
// data from depending on this file).
function DeckCard({
  value,
  tone,
  className,
  style,
  children,
  ...props
}: ComponentProps<"article"> & { value: string; tone?: DeckTone }) {
  const { state, meta } = useDeckState()
  const index = meta.indexOf(value)
  if (index === -1) {
    throw new Error(`<DeckCard value="${value}"> is not in the deck's items.`)
  }
  const item = state.items[index]
  const position = meta.positionOf(value)
  const isActive = position === 0
  const isHidden = position > MAX_DEPTH
  const depth = Math.min(position, MAX_DEPTH)

  return (
    <Card
      tone={tone ?? item.tone}
      pattern="deck"
      data-position={position}
      data-hidden={isHidden ? "" : undefined}
      data-leaving={state.leavingId === value ? "" : undefined}
      role="group"
      aria-roledescription="slide"
      inert={!isActive}
      aria-hidden={!isActive}
      style={
        {
          "--deck-x": `calc(${depth} * var(--deck-spread, ${SPREAD_PX}px))`,
          "--deck-y": `${depth * -RISE_PX}px`,
          "--deck-rotate": `calc(${TILT_DEG}deg + ${depth} * var(--deck-tilt-step, ${TILT_STEP_DEG}deg))`,
          "--deck-scale": `calc(${1 - depth * SHRINK_STEP} * var(--deck-zoom, 1))`,
          "--deck-z": meta.count - position,
          "--deck-leave-ms": `${LEAVE_MS}ms`,
          ...style,
        } as CSSProperties
      }
      className={className}
      {...props}
    >
      {isHidden ? null : children}
    </Card>
  )
}

// "Label 2 of 4". `value` is the card it sits in.
function DeckIndicator({
  value,
  className,
  children,
  ...props
}: ComponentProps<"p"> & { value: string }) {
  const { meta } = useDeckState()

  return (
    <p
      data-slot="deck-indicator"
      className={cn(
        "font-mono text-micro tracking-widest uppercase opacity-85",
        className
      )}
      {...props}
    >
      {children ? <>{children} </> : null}
      {meta.indexOf(value) + 1} of {meta.count}
    </p>
  )
}

// "02 / 29". `value` is the card it sits in; the figure is data, so it is mono.
function DeckCounter({
  value,
  className,
  ...props
}: ComponentProps<"p"> & { value: string }) {
  const { meta } = useDeckState()

  return (
    <p
      data-slot="deck-counter"
      className={cn(
        "font-mono text-tiny tracking-widest tabular-nums opacity-85",
        className
      )}
      {...props}
    >
      {pad(meta.indexOf(value) + 1, meta.count)} / {pad(meta.count, meta.count)}
    </p>
  )
}

// Button group. Taps in gaps don't flip the card; other controls use
// `data-deck-interactive` for the same.
function DeckControls({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="deck-controls"
      data-deck-interactive
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

// Shared surface for DeckPrevious / DeckNext (not exported).
function DeckControl({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="deck-control"
      className={cn(
        "inline-flex size-8.5 items-center justify-center rounded-full border border-tone-foreground/50 bg-tone-foreground/10 text-inherit transition-colors outline-none hover:bg-tone-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function DeckPrevious({
  children = <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const { actions } = useDeckActions()

  return (
    <DeckControl
      data-slot="deck-previous"
      aria-label="Previous card"
      onClick={composeHandlers(onClick, actions.previous)}
      {...props}
    >
      {children}
    </DeckControl>
  )
}

function DeckNext({
  children = <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const { actions } = useDeckActions()

  return (
    <DeckControl
      data-slot="deck-next"
      aria-label="Next card"
      onClick={composeHandlers(onClick, actions.next)}
      {...props}
    >
      {children}
    </DeckControl>
  )
}

/* DeckRail
   ├── DeckRailArrow (left)
   ├── DeckRailTrack → DeckRailItem × n
   └── DeckRailArrow (right) */

const TrackContext = createContext<RefObject<HTMLDivElement | null> | null>(
  null
)

// Must be used inside <DeckRail>.
function useTrack() {
  const track = use(TrackContext)
  if (!track) throw new Error("DeckRail parts must be used within <DeckRail>.")
  return track
}

function scrollBehavior(smooth = true): ScrollBehavior {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  return smooth && !reduced ? "smooth" : "instant"
}

// Owns the track ref so arrows and the track can find each other.
function DeckRail({ className, ...props }: ComponentProps<"div">) {
  const track = useRef<HTMLDivElement>(null)

  return (
    <TrackContext value={track}>
      <div
        data-slot="deck-rail"
        className={cn("flex items-center gap-2", className)}
        {...props}
      />
    </TrackContext>
  )
}

// The scrolling row. Keeps the active item centred; set `dir` to match the
// content's reading direction.
function DeckRailTrack({
  className,
  ...props
}: Omit<ComponentProps<"div">, "ref">) {
  const { state } = useDeckState()
  const track = useTrack()
  const settled = useRef(false)

  // Effect Event: always reads the latest motion preference and track, yet
  // the effect below re-runs only when the active item changes.
  const centerActive = useEffectEvent((smooth: boolean) => {
    const element = track.current
    const active = element?.querySelector<HTMLElement>("[aria-current='true']")
    if (!element || !active) return
    const rail = element.getBoundingClientRect()
    const item = active.getBoundingClientRect()
    element.scrollBy({
      left: item.left + item.width / 2 - (rail.left + rail.width / 2),
      behavior: scrollBehavior(smooth),
    })
  })

  useEffect(() => {
    // First paint jumps into place; later changes glide.
    centerActive(settled.current)
    settled.current = true
  }, [state.activeId])

  return (
    <div
      ref={track}
      data-slot="deck-rail-track"
      className={cn(
        "rail-fade flex min-w-0 flex-1 gap-2 overflow-x-auto px-10 py-1.5",
        className
      )}
      {...props}
    />
  )
}

// One tap target per deck item. Only the active item is a tab stop; arrow
// keys on the deck move between items.
function DeckRailItem({
  value,
  className,
  ...props
}: ComponentProps<"button"> & { value: string }) {
  const { state, meta } = useDeckState()
  const { actions } = useDeckActions()
  const active = state.activeId === value
  const { tone } = state.items[meta.indexOf(value)]

  return (
    <button
      type="button"
      data-slot="deck-rail-item"
      data-active={active ? "" : undefined}
      aria-current={active ? "true" : undefined}
      tabIndex={active ? 0 : -1}
      onClick={() => actions.select(value)}
      className={cn(
        TONE_CLASSES[tone],
        "flex h-18 w-15 flex-none cursor-pointer items-center justify-center rounded-lg border bg-card font-quran text-4xl leading-none font-bold text-terracotta-accent text-crisp transition-colors outline-none hover:border-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-active:border-transparent data-active:bg-linear-160 data-active:from-(--tone-from) data-active:to-(--tone-to) data-active:text-tone-foreground motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

function DeckRailArrow({
  direction,
  ...props
}: ComponentProps<typeof Button> & { direction: "left" | "right" }) {
  const track = useTrack()

  return (
    <Button
      variant="outline"
      size="icon-lg"
      data-slot="deck-rail-arrow"
      aria-label={`Scroll ${direction}`}
      onClick={() =>
        track.current?.scrollBy({
          left: direction === "left" ? -SCROLL_STEP_PX : SCROLL_STEP_PX,
          behavior: scrollBehavior(),
        })
      }
      {...props}
    >
      <HugeiconsIcon
        icon={direction === "left" ? ArrowLeft01Icon : ArrowRight01Icon}
        className="size-4"
      />
    </Button>
  )
}

export {
  Deck,
  DeckProvider,
  DeckContent,
  DeckCard,
  DeckIndicator,
  DeckCounter,
  DeckControls,
  DeckPrevious,
  DeckNext,
  DeckRail,
  DeckRailTrack,
  DeckRailItem,
  DeckRailArrow,
  useDeckState,
  useDeckActions,
  type DeckItem,
  type DeckTone,
}
