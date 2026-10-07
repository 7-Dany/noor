import { type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"

/* MaterialCard: one material as a tone-filled card, the static sibling of
   DeckCard (same look, no stacking or gestures). Plain HTML only. Tone comes
   from the `tone-*` utilities in index.css; every part reads --tone-* and
   tone-foreground, so parts are safe to reorder or drop. The sun/moon mark
   and the action button are slots the consumer passes in.

     <MaterialCard tone="terracotta">
       <MaterialCardHeader><span>Material 1 of 4</span><SunMoon className="size-7.5" /></MaterialCardHeader>
       <MaterialCardWatermark>ن</MaterialCardWatermark>
       <MaterialCardNote>Start here,</MaterialCardNote>
       <MaterialCardTitle>Noor Al-Bayan.</MaterialCardTitle>
       <MaterialCardSummary>Letters, harakat, madd…</MaterialCardSummary>
       <MaterialCardStats>
         <MaterialCardStat value="10" label="Chapters" />
         <MaterialCardStat value="~167" label="Lessons" />
       </MaterialCardStats>
       <MaterialCardFooter><Button variant="tone" size="pill">Open material</Button></MaterialCardFooter>
     </MaterialCard> */

// A tone is three CSS vars; add one line here + three vars in index.css.
const materialCardVariants = cva(
  "relative isolate flex min-h-100 flex-col overflow-hidden rounded-xl bg-linear-155 from-(--tone-from) to-(--tone-to) px-7 pt-5.5 pb-7 text-tone-foreground shadow-card",
  {
    variants: {
      tone: {
        terracotta: "tone-terracotta",
        blue: "tone-blue",
        rose: "tone-rose",
        ink: "tone-ink",
      },
    },
    defaultVariants: { tone: "terracotta" },
  }
)

function MaterialCard({
  className,
  tone,
  ...props
}: ComponentProps<"article"> & VariantProps<typeof materialCardVariants>) {
  return (
    <article
      data-slot="material-card"
      className={cn(materialCardVariants({ tone }), className)}
      {...props}
    />
  )
}

// Label left, <SunMoon /> right, dashed rule underneath.
function MaterialCardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="material-card-header"
      className={cn(
        "flex items-center justify-between gap-4 border-b border-dashed border-tone-foreground/40 pb-3 font-mono text-tiny tracking-eyebrow uppercase",
        className
      )}
      {...props}
    />
  )
}

// One faint Arabic letter behind the content, bleeding off the bottom edge.
function MaterialCardWatermark({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="material-card-watermark"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute right-6 -bottom-2.5 -z-10 font-arabic text-card-watermark leading-none font-bold text-tone-foreground/15 select-none",
        className
      )}
      {...props}
    />
  )
}

function MaterialCardNote({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="material-card-note"
      className={cn("mt-6.5 font-serif text-xl text-sun italic", className)}
      {...props}
    />
  )
}

function MaterialCardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="material-card-title"
      className={cn(
        "mt-1.5 mb-3.5 font-serif text-card-title leading-display font-medium italic",
        className
      )}
      {...props}
    />
  )
}

function MaterialCardSummary({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="material-card-summary"
      className={cn("max-w-lead leading-summary opacity-92", className)}
      {...props}
    />
  )
}

// Pinned above the footer so cards with short copy keep one layout.
function MaterialCardStats({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="material-card-stats"
      className={cn("mt-auto flex pt-6.5", className)}
      {...props}
    />
  )
}

// Big numeral over a small mono label; dashed rule between neighbours.
function MaterialCardStat({
  value,
  label,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  value: string
  label: string
}) {
  return (
    <div
      data-slot="material-card-stat"
      className={cn(
        "pr-5.5 not-first:border-l not-first:border-dashed not-first:border-tone-foreground/40 not-first:pl-5.5",
        className
      )}
      {...props}
    >
      <p className="font-serif text-stat leading-none">{value}</p>
      <p className="mt-1.5 font-mono text-micro tracking-eyebrow uppercase opacity-85">
        {label}
      </p>
    </div>
  )
}

function MaterialCardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="material-card-footer"
      className={cn("mt-4.5 flex", className)}
      {...props}
    />
  )
}

export {
  MaterialCard,
  MaterialCardHeader,
  MaterialCardWatermark,
  MaterialCardNote,
  MaterialCardTitle,
  MaterialCardSummary,
  MaterialCardStats,
  MaterialCardStat,
  MaterialCardFooter,
  materialCardVariants,
}
