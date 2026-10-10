import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/* Card: one shell for every card. Omit `tone` for the neutral shadcn
   surface (dashboard, dialogs); set it for a tone slip (materials,
   plans, deck). `pattern` picks the baked layout: "material" (catalog
   card), "chapter" (light surface, tone only as an accent) or "price"
   (plan slip). "deck" is the swipe-stack frame: same surface contract,
   pose arrives as --deck-* vars.

   All visual classes live in this file (generated-component rule), so
   app code passes structure only — no layout classes on Card slots:

      <Card tone="terracotta" pattern="material">
        <CardHeader pattern="material"><span>Material 1 of 4</span><SunMoon className="size-7.5" /></CardHeader>
        <CardWatermark>ن</CardWatermark>
        <CardNote>Start here,</CardNote>
        <CardTitle pattern="material">Noor Al-Bayan.</CardTitle>
        <CardDescription pattern="material">Letters, harakat…</CardDescription>
        <CardStats><CardStat value="10" label="Chapters" /></CardStats>
        <CardFooter pattern="material"><Button variant="tone" size="pill">Open material</Button></CardFooter>
      </Card> */

// A tone is three CSS vars; add one line here + three vars in index.css.
const cardVariants = cva("group/card relative flex flex-col rounded-xl", {
  variants: {
    tone: {
      terracotta: "tone-terracotta",
      blue: "tone-blue",
      rose: "tone-rose",
      ink: "tone-ink",
    },
    pattern: {
      material:
        "isolate overflow-hidden bg-linear-155 from-(--tone-from) to-(--tone-to) px-5 pt-5 pb-6 text-tone-foreground shadow-card md:min-h-100 md:px-7 md:pt-5.5 md:pb-7 data-[size=sm]:min-h-0",
      chapter:
        "isolate min-h-24 overflow-hidden border bg-card px-4 py-3.5 text-card-foreground transition duration-200 motion-reduce:transition-none in-[a]:hover:-translate-y-0.5 in-[a]:hover:border-(--tone-text)/50",
      price:
        "min-h-107.5 bg-linear-155 from-(--tone-from) to-(--tone-to) px-5 pt-4 pb-5.5 text-tone-foreground shadow-xl shadow-foreground/10 sm:px-6.5 lg:h-107.5 dark:shadow-black/30",
      deck: [
        "absolute inset-0 cursor-grab justify-between gap-4 bg-linear-160 from-(--tone-from) to-(--tone-to) px-6.5 py-6 text-tone-foreground shadow-deck dark:shadow-black/40",
        "before:absolute before:inset-x-6 before:top-3.5 before:border-t before:border-dashed before:border-tone-foreground/40",
        "z-(--deck-z) translate-x-(--deck-x) translate-y-(--deck-y) scale-(--deck-scale) rotate-(--deck-rotate)",
        "transition duration-700 ease-spring motion-reduce:transition-none",
        // Top card flies off before dropping to the back.
        "data-[leaving]:-translate-x-9/10 data-[leaving]:translate-y-4 data-[leaving]:-rotate-12 data-[leaving]:opacity-0 data-[leaving]:duration-(--deck-leave-ms) data-[leaving]:ease-in",
      ],
    },
  },
})

type Tone = NonNullable<VariantProps<typeof cardVariants>["tone"]>
type CardPattern = NonNullable<VariantProps<typeof cardVariants>["pattern"]>

function Card({
  className,
  tone,
  pattern = "material",
  size = "default",
  ...props
}: React.ComponentProps<"article"> &
  VariantProps<typeof cardVariants> & { size?: "default" | "sm" }) {
  return (
    <article
      data-slot="card"
      data-size={size}
      data-tone={tone ?? undefined}
      data-pattern={tone ? pattern : undefined}
      className={cn(
        tone
          ? cardVariants({ tone, pattern })
          : "gap-(--card-spacing) overflow-hidden bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 data-[size=sm]:[--card-spacing:--spacing(3)]",
        className
      )}
      {...props}
    />
  )
}

const cardHeaderVariants = cva(
  "flex items-center justify-between gap-4 font-mono tracking-eyebrow uppercase",
  {
    variants: {
      pattern: {
        material:
          "border-b border-dashed border-tone-foreground/40 pb-3 text-tiny",
        chapter:
          "justify-start text-(length:--text-tiny) text-(--tone-text) *:last:text-muted-foreground",
        price:
          "mb-3 box-content h-5 border-b border-dashed border-tone-foreground/40 pb-2 text-(length:--text-micro) text-tone-foreground/80",
      },
    },
    defaultVariants: { pattern: "material" },
  }
)
function CardHeader({
  className,
  pattern,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardHeaderVariants>) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ pattern }), className)}
      {...props}
    />
  )
}

const cardTitleVariants = cva("font-serif", {
  variants: {
    pattern: {
      material:
        "mt-1.5 mb-3.5 text-card-title leading-display font-medium italic",
      chapter: "mt-1 text-xl leading-tight font-medium",
      price: "text-3xl leading-9",
    },
  },
  defaultVariants: { pattern: "material" },
})

function CardTitle({
  className,
  pattern,
  ...props
}: React.ComponentProps<"h3"> & VariantProps<typeof cardTitleVariants>) {
  return (
    <h3
      data-slot="card-title"
      className={cn(cardTitleVariants({ pattern }), className)}
      {...props}
    />
  )
}

const cardDescriptionVariants = cva("", {
  variants: {
    pattern: {
      material: "max-w-lead leading-summary opacity-92",
      // Narrower than material: lines stop before the watermark glyph.
      deck: "max-w-[28ch] leading-summary text-pretty opacity-92",
      chapter:
        "mt-1 max-w-lead truncate text-(length:--text-caption) leading-summary text-muted-foreground",
      price:
        "mb-3 text-(length:--text-caption) leading-5 text-tone-foreground/80 lg:truncate",
    },
  },
  defaultVariants: { pattern: "material" },
})

function CardDescription({
  className,
  pattern,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof cardDescriptionVariants>) {
  return (
    <p
      data-slot="card-description"
      className={cn(cardDescriptionVariants({ pattern }), className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

const cardFooterVariants = cva("flex", {
  variants: {
    pattern: {
      material: "mt-4.5",
      chapter:
        "mt-auto pt-5 font-mono text-(length:--text-tiny) tracking-eyebrow text-muted-foreground uppercase",
      price: "mt-auto flex-col gap-3",
    },
  },
  defaultVariants: { pattern: "material" },
})

// Pinned to the bottom so short copy keeps one layout.
function CardFooter({
  className,
  pattern,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardFooterVariants>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ pattern }), className)}
      {...props}
    />
  )
}

// One faint glyph behind the content, set in Scheherazade New Bold.
// Placement and size ride the `pattern` variant below. Size uses
// text-(length:…) on purpose: a bare text-* token shares tailwind-merge's
// group with the text color below and gets dropped, leaving an
// inherited-size (invisible) glyph.
const cardWatermarkVariants = cva(
  "pointer-events-none absolute -z-10 font-quran leading-none font-bold select-none",
  {
    variants: {
      pattern: {
        material:
          "right-3.75 -bottom-2 text-(length:--text-card-watermark) text-tone-foreground/15 group-data-[size=sm]/card:right-6 group-data-[size=sm]/card:bottom-5 group-data-[size=sm]/card:text-(length:--text-card-watermark-lg)",
        deck: "right-3.75 bottom-12 text-(length:--text-deck-watermark) text-tone-foreground/15",
        chapter:
          "right-3 -bottom-2 text-(length:--text-chapter-watermark) text-(--tone-text)/25 transition-colors duration-200 motion-reduce:transition-none in-[a]:group-hover/card:text-(--tone-text)/40",
      },
    },
    defaultVariants: { pattern: "material" },
  }
)

function CardWatermark({
  className,
  pattern,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof cardWatermarkVariants>) {
  return (
    <span
      data-slot="card-watermark"
      aria-hidden="true"
      className={cn(cardWatermarkVariants({ pattern }), className)}
      {...props}
    />
  )
}

function CardNote({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-note"
      className={cn("mt-6.5 font-serif text-xl text-sun italic", className)}
      {...props}
    />
  )
}

const cardStatsVariants = cva("flex", {
  variants: {
    pattern: {
      material: "mt-auto pt-6.5",
      chapter: "mt-auto pt-5",
    },
  },
  defaultVariants: { pattern: "material" },
})

function CardStats({
  className,
  pattern,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardStatsVariants>) {
  return (
    <div
      data-slot="card-stats"
      className={cn(cardStatsVariants({ pattern }), className)}
      {...props}
    />
  )
}

const cardStatVariants = cva("", {
  variants: {
    pattern: {
      material:
        "pr-5.5 not-first:border-l not-first:border-dashed not-first:border-tone-foreground/40 not-first:pl-5.5",
      chapter:
        "pr-4 not-first:border-l not-first:border-dashed not-first:border-border not-first:pl-4 last:pr-0",
    },
  },
  defaultVariants: { pattern: "material" },
})

const cardStatValueVariants = cva("font-serif leading-none", {
  variants: {
    pattern: {
      material: "text-stat",
      chapter: "text-2xl text-card-foreground",
    },
  },
  defaultVariants: { pattern: "material" },
})

const cardStatLabelVariants = cva(
  "font-mono text-micro tracking-eyebrow uppercase",
  {
    variants: {
      pattern: {
        material: "mt-1.5 opacity-85",
        chapter: "mt-1 text-muted-foreground",
      },
    },
    defaultVariants: { pattern: "material" },
  }
)

function CardStat({
  value,
  label,
  pattern,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof cardStatVariants> & {
    value: string
    label: string
  }) {
  return (
    <div
      data-slot="card-stat"
      className={cn(cardStatVariants({ pattern }), className)}
      {...props}
    >
      <p className={cardStatValueVariants({ pattern })}>{value}</p>
      <p className={cardStatLabelVariants({ pattern })}>{label}</p>
    </div>
  )
}

// `value` renders as the small mono index on the right ("01").
function CardRows({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="card-rows"
      className={cn("flex flex-col text-sm", className)}
      {...props}
    />
  )
}

function CardRow({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"li"> & { value?: string }) {
  return (
    <li
      data-slot="card-row"
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

function CardTotal({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-total"
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-4 gap-y-2",
        className
      )}
      {...props}
    />
  )
}

function CardAmount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-amount"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function CardLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="card-label"
      className={cn(
        "font-mono text-(length:--text-tiny) leading-7 tracking-eyebrow text-tone-foreground/80 uppercase",
        className
      )}
      {...props}
    />
  )
}

function CardValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="card-value"
      className={cn(
        "flex items-baseline gap-1.5 font-serif text-(length:--text-display) leading-none",
        className
      )}
      {...props}
    />
  )
}

function CardUnit({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="card-unit"
      className={cn("font-sans text-sm text-tone-foreground/80", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardWatermark,
  CardNote,
  CardStats,
  CardStat,
  CardRows,
  CardRow,
  CardTotal,
  CardAmount,
  CardLabel,
  CardValue,
  CardUnit,
  cardVariants,
  type Tone,
  type CardPattern,
}
