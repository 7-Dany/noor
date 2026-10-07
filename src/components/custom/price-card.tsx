import { type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"

/* PriceCard: one plan as a tone-filled slip. Plain HTML only, like DeckCard:
   no Receipt, no shadcn primitives inside. Tone comes from the `tone-*`
   utilities in index.css; every part reads --tone-* and tone-foreground, so
   parts are safe to reorder or drop. Buttons and the barcode are slots the
   consumer passes in.

     <PriceCard tone="terracotta">
       <PriceCardHeader><span>Plan 2 of 2</span><SunMoon className="size-5" /></PriceCardHeader>
       <PriceCardTitle>Premium</PriceCardTitle>
       <PriceCardDescription>Everything in Free, and more</PriceCardDescription>
       <PriceCardFeatures>
         <PriceCardFeature value="01">All kinds of games</PriceCardFeature>
       </PriceCardFeatures>
       <PriceCardFooter>
         <PriceCardTotal>
           <PriceCardAmount>
             <PriceCardLabel>Total</PriceCardLabel>
             <PriceCardValue>$5<PriceCardUnit>USD / month</PriceCardUnit></PriceCardValue>
           </PriceCardAmount>
           <Barcode />
         </PriceCardTotal>
         <Button variant="light" size="pill">Go Premium</Button>
       </PriceCardFooter>
     </PriceCard> */

// A tone is three CSS vars; add one line here + three vars in index.css.
const priceCardVariants = cva(
  "relative flex min-h-107.5 flex-col rounded-xl bg-linear-155 from-(--tone-from) to-(--tone-to) px-5 pt-4 pb-5.5 text-tone-foreground shadow-xl shadow-foreground/10 sm:px-6.5 lg:h-107.5 dark:shadow-black/30",
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

function PriceCard({
  className,
  tone,
  ...props
}: ComponentProps<"article"> & VariantProps<typeof priceCardVariants>) {
  return (
    <article
      data-slot="price-card"
      className={cn(priceCardVariants({ tone }), className)}
      {...props}
    />
  )
}

// Plan label left, kicker or <SunMoon /> right, dashed rule underneath.
function PriceCardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="price-card-header"
      className={cn(
        "mb-3 box-content flex h-5 items-center justify-between gap-4 border-b border-dashed border-tone-foreground/40 pb-2 font-mono text-(length:--text-micro) tracking-eyebrow text-tone-foreground/80 uppercase",
        className
      )}
      {...props}
    />
  )
}

function PriceCardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="price-card-title"
      className={cn("font-serif text-3xl leading-9", className)}
      {...props}
    />
  )
}

function PriceCardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="price-card-description"
      className={cn(
        "mb-3 text-(length:--text-caption) leading-5 text-tone-foreground/80 lg:truncate",
        className
      )}
      {...props}
    />
  )
}

function PriceCardFeatures({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="price-card-features"
      className={cn("flex flex-col text-sm", className)}
      {...props}
    />
  )
}

// Ruled row. `value` is the small mono index on the right ("01").
function PriceCardFeature({
  value,
  className,
  children,
  ...props
}: ComponentProps<"li"> & { value?: string }) {
  return (
    <li
      data-slot="price-card-feature"
      className={cn(
        "flex min-h-7 items-baseline justify-between gap-3 border-b border-tone-foreground/25 leading-7",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {value ? (
        <span className="font-mono text-xs tabular-nums">{value}</span>
      ) : null}
    </li>
  )
}

// Pinned to the bottom so plans with fewer features keep one layout.
function PriceCardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="price-card-footer"
      className={cn("mt-auto flex flex-col gap-3", className)}
      {...props}
    />
  )
}

function PriceCardTotal({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="price-card-total"
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-4 gap-y-2",
        className
      )}
      {...props}
    />
  )
}

function PriceCardAmount({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="price-card-amount"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function PriceCardLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="price-card-label"
      className={cn(
        "font-mono text-(length:--text-tiny) leading-7 tracking-eyebrow text-tone-foreground/80 uppercase",
        className
      )}
      {...props}
    />
  )
}

function PriceCardValue({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="price-card-value"
      className={cn(
        "flex items-baseline gap-1.5 font-serif text-(length:--text-display) leading-none",
        className
      )}
      {...props}
    />
  )
}

function PriceCardUnit({ className, ...props }: ComponentProps<"small">) {
  return (
    <small
      data-slot="price-card-unit"
      className={cn("font-sans text-sm text-tone-foreground/80", className)}
      {...props}
    />
  )
}

export {
  PriceCard,
  PriceCardHeader,
  PriceCardTitle,
  PriceCardDescription,
  PriceCardFeatures,
  PriceCardFeature,
  PriceCardFooter,
  PriceCardTotal,
  PriceCardAmount,
  PriceCardLabel,
  PriceCardValue,
  PriceCardUnit,
  priceCardVariants,
}
