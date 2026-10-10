import {
  createContext,
  use,
  useMemo,
  type ComponentProps,
  type MouseEvent,
} from "react"
import { cva } from "class-variance-authority"

import { cn } from "cn"
import type { Tone } from "@/components/ui/card"
import { useActiveSection } from "@/hooks/use-active-section"

/* Outline: a sticky section nav beside the sections it tracks. Plain HTML
   only; it knows ids, not what a section holds. The root sets the tone, so
   everything inside reads --tone from the `tone-*` class set there.

   Outline (items, tone)
   ├── OutlineNav → OutlineNavLabel + OutlineNavList
   │     └── OutlineNavItem → OutlineNavLink (value) → OutlineNavIndex
   └── OutlineContent
         └── OutlineSection (value) → OutlineSectionHeader
               (→ OutlineSectionTitle + OutlineSectionMeta)
               + OutlineSectionDescription + anything else

   A link and its section meet by `value`, an id from `items`. */

type OutlineItem = { id: string }

// Stable across renders; the hook keys its store on it.
const outlineDomId = (value: string) => `section-${value}`

interface OutlineContextValue {
  active: string | undefined // DOM id of the active section
  select: (domId: string) => void
}

const OutlineContext = createContext<OutlineContextValue | null>(null)

// Must be used inside <Outline>.
function useOutline() {
  const context = use(OutlineContext)
  if (!context) throw new Error("Outline parts must be used within <Outline>.")
  return context
}

// A tone is three CSS vars; same list as Card (see index.css).
const outlineVariants = cva("grid gap-8 md:grid-cols-4", {
  variants: {
    tone: {
      terracotta: "tone-terracotta",
      blue: "tone-blue",
      rose: "tone-rose",
      ink: "tone-ink",
    },
  },
})

// Root: owns the active section and the tone. `items` must be a stable
// reference (module const or memoised).
function Outline({
  items,
  tone,
  className,
  ...props
}: ComponentProps<"div"> & { items: readonly OutlineItem[]; tone: Tone }) {
  const ids = useMemo(() => items.map((item) => outlineDomId(item.id)), [items])
  const { active, select } = useActiveSection(ids)
  // `select` is stable, so the value changes only with the active section.
  const value = useMemo(() => ({ active, select }), [active, select])

  return (
    <OutlineContext value={value}>
      <div
        data-slot="outline"
        className={cn(outlineVariants({ tone }), className)}
        {...props}
      />
    </OutlineContext>
  )
}

// top-20 clears the sticky site header; the nav stays in the page flow.
function OutlineNav({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      data-slot="outline-nav"
      className={cn("md:sticky md:top-20 md:self-start", className)}
      {...props}
    />
  )
}

function OutlineNavLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="outline-nav-label"
      className={cn(
        "px-3.5 pb-2 font-mono text-(length:--text-tiny) tracking-eyebrow text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

// The 1px rail; the active link's 2px border sits on top of it.
function OutlineNavList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="outline-nav-list"
      className={cn("flex flex-col border-s", className)}
      {...props}
    />
  )
}

function OutlineNavItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="outline-nav-item" className={className} {...props} />
}

// Clicking pins this link as active until the next user scroll; a consumer
// onClick runs first and can cancel that with preventDefault().
function OutlineNavLink({
  value,
  className,
  onClick,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { value: string }) {
  const { active, select } = useOutline()
  const domId = outlineDomId(value)
  const isActive = active === domId

  return (
    <a
      data-slot="outline-nav-link"
      data-active={isActive ? "" : undefined}
      href={`#${domId}`}
      aria-current={isActive ? "location" : undefined}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) select(domId)
      }}
      className={cn(
        "-ms-px flex items-baseline gap-3 border-s-2 border-transparent px-3.5 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-active:border-(--tone-text) data-active:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function OutlineNavIndex({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="outline-nav-index"
      className={cn(
        "font-mono text-(length:--text-caption) text-(--tone-text)",
        className
      )}
      {...props}
    />
  )
}

function OutlineContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="outline-content"
      className={cn("flex min-w-0 flex-col gap-7 md:col-span-3", className)}
      {...props}
    />
  )
}

// Gives OutlineSectionTitle the id its section is labelled by.
const OutlineSectionContext = createContext<string | null>(null)

// scroll-mt-24 clears the sticky site header when jumping to a section;
// keep it in step with HEADER_OFFSET in use-active-section.
function OutlineSection({
  value,
  className,
  ...props
}: ComponentProps<"section"> & { value: string }) {
  const id = outlineDomId(value)
  const titleId = `${id}-title`

  return (
    <OutlineSectionContext value={titleId}>
      <section
        data-slot="outline-section"
        id={id}
        aria-labelledby={titleId}
        className={cn("scroll-mt-24", className)}
        {...props}
      />
    </OutlineSectionContext>
  )
}

function OutlineSectionHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="outline-section-header"
      className={cn(
        "flex items-baseline justify-between gap-3 border-b pb-1.5",
        className
      )}
      {...props}
    />
  )
}

// Must be used inside <OutlineSection>.
function OutlineSectionTitle({ className, ...props }: ComponentProps<"h2">) {
  const titleId = use(OutlineSectionContext)
  if (!titleId) {
    throw new Error("<OutlineSectionTitle> must be used within <OutlineSection>.")
  }

  return (
    <h2
      data-slot="outline-section-title"
      id={titleId}
      className={cn("font-serif text-xl font-medium", className)}
      {...props}
    />
  )
}

function OutlineSectionMeta({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="outline-section-meta"
      className={cn(
        "font-mono text-(length:--text-tiny) tracking-eyebrow text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function OutlineSectionDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="outline-section-description"
      className={cn(
        "mt-1.5 text-(length:--text-caption) text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Outline,
  OutlineNav,
  OutlineNavLabel,
  OutlineNavList,
  OutlineNavItem,
  OutlineNavLink,
  OutlineNavIndex,
  OutlineContent,
  OutlineSection,
  OutlineSectionHeader,
  OutlineSectionTitle,
  OutlineSectionMeta,
  OutlineSectionDescription,
  type OutlineItem,
}
