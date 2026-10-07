import {
  createContext,
  use,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { cn } from "cn"
import { HugeiconsIcon } from "@hugeicons/react"

/* Deck: stacked cards, one on top. Plain HTML only, no outside slots. */

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

// Card look. A tone is three CSS vars; add one line + three vars in index.css.
const deckCardVariants = cva(
  [
    "absolute inset-0 flex cursor-grab flex-col justify-between gap-4 rounded-xl bg-linear-160 from-(--tone-from) to-(--tone-to) px-6.5 py-6 text-tone-foreground shadow-deck dark:shadow-black/40",
    "before:absolute before:inset-x-6 before:top-3.5 before:border-t before:border-dashed before:border-tone-foreground/40",
    "z-(--deck-z) translate-x-(--deck-x) translate-y-(--deck-y) scale-(--deck-scale) rotate-(--deck-rotate)",
    "transition duration-700 ease-spring motion-reduce:transition-none",
    // Top card flies off before dropping to the back.
    "data-[leaving]:-translate-x-9/10 data-[leaving]:translate-y-4 data-[leaving]:-rotate-12 data-[leaving]:opacity-0 data-[leaving]:duration-(--deck-leave-ms) data-[leaving]:ease-in",
  ],
  {
    variants: {
      tone: {
        terracotta: "tone-terracotta",
        blue: "tone-blue",
        rose: "tone-rose",
        ink: "tone-ink",
      },
    },
    defaultVariants: {
      tone: "terracotta",
    },
  }
)

type DeckTone = NonNullable<VariantProps<typeof deckCardVariants>["tone"]>

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

interface DeckContextValue {
  state: DeckState
  actions: DeckActions
  meta: DeckMeta
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

const DeckContext = createContext<DeckContextValue | null>(null)

// Must be used inside <Deck>.
function useDeck() {
  const context = use(DeckContext)
  if (!context) throw new Error("useDeck must be used within <Deck>.")
  return context
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

  const value = useMemo<DeckContextValue>(() => {
    const count = ids.length
    const activeIndex = Math.max(0, ids.indexOf(machine.activeId))
    const indexOf = (id: string) => ids.indexOf(id)

    return {
      state: {
        items,
        activeIndex,
        activeId: ids[activeIndex],
        leavingId: machine.leavingId,
      },
      actions: {
        next: () => dispatch({ type: "START_NEXT" }),
        previous: () => dispatch({ type: "PREVIOUS", ids }),
        select: (id) => dispatch({ type: "SELECT", id, ids }),
      },
      meta: {
        count,
        indexOf,
        positionOf: (id) => (indexOf(id) - activeIndex + count) % count,
      },
    }
  }, [items, ids, machine])

  return <DeckContext value={value}>{children}</DeckContext>
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

// Keyboard + pointer behavior for the deck surface.
function useDeckGestures() {
  const { actions } = useDeck()
  const startX = useRef<number | null>(null)

  return {
    onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        actions.next()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        actions.previous()
      }
    },
    onPointerDown(event: PointerEvent) {
      startX.current = event.clientX
    },
    onPointerUp(event: PointerEvent) {
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
    onPointerCancel() {
      startX.current = null
    },
  }
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

// One card. Pose arrives as --deck-* vars; tone comes from deck `items`.
function DeckCard({
  value,
  className,
  style,
  ...props
}: ComponentProps<"div"> & { value: string }) {
  const { state, meta } = useDeck()
  const item = state.items[meta.indexOf(value)]
  if (!item) {
    throw new Error(`<DeckCard value="${value}"> is not in the deck's items.`)
  }
  const position = meta.positionOf(value)
  const isActive = position === 0

  return (
    <div
      data-slot="deck-card"
      data-position={position}
      data-leaving={state.leavingId === value ? "" : undefined}
      role="group"
      aria-roledescription="slide"
      inert={!isActive}
      aria-hidden={!isActive}
      style={
        {
          "--deck-x": `calc(${position} * var(--deck-spread, ${SPREAD_PX}px))`,
          "--deck-y": `${position * -RISE_PX}px`,
          "--deck-rotate": `calc(${TILT_DEG}deg + ${position} * var(--deck-tilt-step, ${TILT_STEP_DEG}deg))`,
          "--deck-scale": `calc(${1 - position * SHRINK_STEP} * var(--deck-zoom, 1))`,
          "--deck-z": meta.count - position,
          "--deck-leave-ms": `${LEAVE_MS}ms`,
          ...style,
        } as CSSProperties
      }
      className={cn(deckCardVariants({ tone: item.tone }), className)}
      {...props}
    />
  )
}

// "Label 2 of 4". `value` is the card it sits in.
function DeckIndicator({
  value,
  className,
  children,
  ...props
}: ComponentProps<"p"> & { value: string }) {
  const { meta } = useDeck()

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
  children = <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const { actions } = useDeck()

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
  children = <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const { actions } = useDeck()

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

export {
  Deck,
  DeckProvider,
  DeckContent,
  DeckCard,
  DeckIndicator,
  DeckControls,
  DeckPrevious,
  DeckNext,
  deckCardVariants,
  useDeck,
  type DeckItem,
  type DeckTone,
  type DeckContextValue,
}
