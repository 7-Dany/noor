import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"
import { Separator } from "@/components/ui/separator"

/* -------------------------------------------------------------------------- */
/*  Receipt                                                                   */
/*  A paper-slip surface, composed like Card:                                 */
/*  Receipt > ReceiptHeader, ReceiptTitle, ReceiptSpecimen, ReceiptDivider,   */
/*            ReceiptList > ReceiptItem, ReceiptTotal, ReceiptFooter          */
/*  It knows nothing about stacks or materials: content comes from children.  */
/*                                                                            */
/*  Grid contract: the slip is 15 rows of h-7 (1.75rem). Rules sit at         */
/*  --receipt-rule from each row top (see receipt-ruled in index.css); text   */
/*  styles are nudged (top-*) so their baselines land ~1px above it. Nudges   */
/*  are tuned for DM Sans / DM Mono / Fraunces: re-measure if a typeface      */
/*  changes. Dividers are zero-height lines drawn ON a rule, so they cost no  */
/*  row. Specimen = 4 rows, list = 5 (min-h-35), total/footer = 2 rows each   */
/*  (the air above them is on purpose).                                       */
/* -------------------------------------------------------------------------- */

// A tone is three CSS vars; add one line + three vars in index.css.
const receiptVariants = cva(
  [
    "relative flex flex-col rounded-xl border bg-card receipt-ruled p-(--receipt-pad) text-card-foreground shadow-xl shadow-foreground/10",
    "transition-transform duration-700 ease-spring motion-reduce:transition-none",
  ],
  {
    variants: {
      tilt: {
        none: "",
        left: "-rotate-4",
        right: "rotate-4",
      },
      tone: {
        terracotta:
          "[--tone-from:var(--terracotta-from)] [--tone-to:var(--terracotta-to)] [--tone:var(--terracotta)]",
        blue: "[--tone-from:var(--blue-from)] [--tone-to:var(--blue-to)] [--tone:var(--blue)]",
        rose: "[--tone-from:var(--rose-from)] [--tone-to:var(--rose-to)] [--tone:var(--rose)]",
        ink: "[--tone-from:var(--ink-from)] [--tone-to:var(--ink-to)] [--tone:var(--ink)]",
      },
    },
    defaultVariants: { tilt: "none", tone: "terracotta" },
  }
)

function Receipt({
  className,
  tilt = "none",
  tone,
  ...props
}: React.ComponentProps<"article"> & VariantProps<typeof receiptVariants>) {
  return (
    <article
      data-slot="receipt"
      data-tilt={tilt}
      className={cn(receiptVariants({ tilt, tone }), className)}
      {...props}
    />
  )
}

/** One row, two short spans. Last child right-aligned. */
function ReceiptHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-header"
      className={cn(
        "flex h-7 items-baseline justify-between gap-4 font-mono text-(length:--text-micro) leading-7 tracking-eyebrow text-muted-foreground uppercase [&>*]:relative [&>*]:top-1 [&>:last-child]:text-right",
        className
      )}
      {...props}
    />
  )
}

function ReceiptTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="receipt-title"
      className={cn("h-7 truncate font-serif text-xl leading-7", className)}
      {...props}
    />
  )
}

/** Small mono caption. Takes the receipt's tone colour. */
function ReceiptLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="receipt-label"
      className={cn(
        "relative top-0.75 truncate font-mono text-(length:--text-micro) leading-7 tracking-eyebrow text-(--tone) uppercase",
        className
      )}
      {...props}
    />
  )
}

/* Specimen: a large Arabic glyph beside a 4-row caption -------------------- */

function ReceiptSpecimen({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-specimen"
      className={cn("flex h-28 items-start gap-4", className)}
      {...props}
    />
  )
}

function ReceiptGlyph({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-glyph"
      lang="ar"
      dir="rtl"
      className={cn(
        "h-28 max-w-40 min-w-24 flex-none text-center font-arabic text-(length:--text-arabic) leading-28 whitespace-nowrap text-(--tone)",
        className
      )}
      {...props}
    />
  )
}

/** Caption column: label (1 row), title (1 row), description (2 rows). */
function ReceiptSpecimenBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-specimen-body"
      className={cn("flex min-w-0 flex-col", className)}
      {...props}
    />
  )
}

function ReceiptSpecimenTitle({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-specimen-title"
      className={cn("truncate font-serif text-lg leading-7", className)}
      {...props}
    />
  )
}

/** Two lines on the ruled grid (13px on 28px leading). */
function ReceiptSpecimenDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-specimen-description"
      className={cn(
        "relative top-0.5 line-clamp-2 text-(length:--text-caption) leading-7 text-pretty text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/* Divider: always a Separator, never a bordered div ------------------------ */

// Zero-height line pulled up onto the previous row's rule (28px - 22px = 6px = top-1.5).
// Solid sits mid-gap between two rules (8px below the row boundary).
// dashed / solid styling lives in Separator's variants.
function ReceiptDivider({
  className,
  variant = "dashed",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="receipt-divider"
      variant={variant}
      className={cn("relative -top-1.5 data-[variant=solid]:top-2", className)}
      {...props}
    />
  )
}

/* Line items --------------------------------------------------------------- */

function ReceiptList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="receipt-list"
      className={cn("flex min-h-38 flex-col text-sm", className)}
      {...props}
    />
  )
}

function ReceiptItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="receipt-item"
      className={cn(
        "flex h-7 items-baseline justify-between gap-3 leading-7",
        className
      )}
      {...props}
    />
  )
}

function ReceiptItemValue({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="receipt-item-value"
      className={cn(
        "font-mono text-xs leading-7 whitespace-nowrap tabular-nums",
        className
      )}
      {...props}
    />
  )
}

/* Total + footer ----------------------------------------------------------- */

function ReceiptTotal({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-total"
      className={cn(
        "mt-2 flex h-12 items-center justify-between gap-4",
        className
      )}
      {...props}
    />
  )
}

function ReceiptTotalLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="receipt-total-label"
      className={cn(
        "font-mono text-(length:--text-tiny) leading-7 tracking-eyebrow text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function ReceiptTotalValue({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="receipt-total-value"
      className={cn(
        "relative -top-1.5 font-serif text-3xl leading-7 text-(--tone)",
        className
      )}
      {...props}
    />
  )
}

function ReceiptFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-footer"
      className={cn("flex h-10 items-end justify-between gap-4", className)}
      {...props}
    />
  )
}

/** Footer lead-in: the emphasised word. One row, tone-coloured serif italic (echoes the deck's "Material one,"). */
function ReceiptPremium({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-premium"
      className={cn(
        "font-serif text-(length:--text-premium) leading-7 text-(--tone) italic",
        className
      )}
      {...props}
    />
  )
}

/** Footer detail line under ReceiptPremium. */
function ReceiptPerks({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-perks"
      className={cn(
        "relative -bottom-1 font-mono text-(length:--text-micro) leading-7 tracking-eyebrow text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

/** Decorative barcode (same bars as the HTML). Hidden from assistive tech. */
function Barcode({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="barcode"
      aria-hidden="true"
      viewBox="0 0 93 28"
      className={cn("mb-1.5 h-7 w-23 flex-none text-foreground", className)}
      {...props}
    >
      <g fill="currentColor">
        <path d="M0 .121h3V28H0z" />
        <path d="M5 .115h2v27.879H5zm4-.019h4v27.879H9z" opacity=".78" />
        <path d="M15 .089h1v27.879h-1z" />
        <path d="M18 .108h3v27.879h-3zm5-.025h2v27.879h-2z" opacity=".78" />
        <path d="M27 .07h5v27.879h-5z" />
        <path d="M34 .057h2v27.879h-2zm4 .02h3v27.879h-3z" opacity=".78" />
        <path d="M43 .064h1v27.879h-1z" />
        <path d="M46 .051h4V27.93h-4zm6-.006h2v27.879h-2z" opacity=".78" />
        <path d="M56 .038h3v27.879h-3z" />
        <path d="M61 .032h5v27.879h-5zm7-.006h2v27.879h-2z" opacity=".78" />
        <path d="M72 .019h3v27.879h-3z" />
        <path d="M77 .013h1v27.879h-1zm3-.007h4v27.879h-4z" opacity=".78" />
        <path d="M86 0h2v27.879h-2z" />
        <path d="M90 .102h3v27.879h-3z" opacity=".78" />
      </g>
    </svg>
  )
}

export {
  Receipt,
  ReceiptHeader,
  ReceiptTitle,
  ReceiptLabel,
  ReceiptSpecimen,
  ReceiptGlyph,
  ReceiptSpecimenBody,
  ReceiptSpecimenTitle,
  ReceiptSpecimenDescription,
  ReceiptDivider,
  ReceiptList,
  ReceiptItem,
  ReceiptItemValue,
  ReceiptTotal,
  ReceiptTotalLabel,
  ReceiptTotalValue,
  ReceiptFooter,
  ReceiptPremium,
  ReceiptPerks,
  Barcode,
  receiptVariants,
}
