import { type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"
import { Separator } from "@/components/ui/separator"

/* Receipt: a ruled paper slip, composed like Card. Rows are h-7 on a 1.75rem grid
   (see receipt-ruled in index.css); the top-* nudges seat text on the rules
   (tuned for DM Sans, DM Mono and Fraunces). */

// A tone is three CSS vars; add one line + three vars in index.css.
const receiptVariants = cva(
  [
    "relative flex flex-col rounded-xl border bg-card receipt-ruled p-(--receipt-pad) text-card-foreground shadow-xl shadow-foreground/10 dark:shadow-black/30",
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
        terracotta: "tone-terracotta",
        blue: "tone-blue",
        rose: "tone-rose",
        ink: "tone-ink",
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
}: ComponentProps<"article"> & VariantProps<typeof receiptVariants>) {
  return (
    <article
      data-slot="receipt"
      data-tilt={tilt}
      className={cn(receiptVariants({ tilt, tone }), className)}
      {...props}
    />
  )
}

function ReceiptHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-header"
      className={cn(
        "flex h-7 items-baseline justify-between gap-4 font-mono text-(length:--text-micro) leading-7 tracking-eyebrow text-muted-foreground uppercase *:relative *:top-1 *:text-right",
        className
      )}
      {...props}
    />
  )
}

function ReceiptTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="receipt-title"
      className={cn("h-7 truncate font-serif text-xl leading-7", className)}
      {...props}
    />
  )
}

function ReceiptLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="receipt-label"
      className={cn(
        "relative top-0.75 truncate font-mono text-(length:--text-micro) leading-7 tracking-eyebrow text-(--tone-text) uppercase",
        className
      )}
      {...props}
    />
  )
}

function ReceiptSpecimen({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-specimen"
      className={cn("flex h-28 items-start gap-4", className)}
      {...props}
    />
  )
}

function ReceiptGlyph({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-glyph"
      lang="ar"
      dir="rtl"
      className={cn(
        "h-28 max-w-40 min-w-24 flex-none text-center font-quran text-(length:--text-arabic) leading-28 whitespace-nowrap text-(--tone-text)",
        className
      )}
      {...props}
    />
  )
}

function ReceiptSpecimenBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-specimen-body"
      className={cn("flex min-w-0 flex-col", className)}
      {...props}
    />
  )
}

function ReceiptSpecimenTitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-specimen-title"
      className={cn("truncate font-serif text-lg leading-7", className)}
      {...props}
    />
  )
}

function ReceiptSpecimenDescription({
  className,
  ...props
}: ComponentProps<"p">) {
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

// Zero height, pulled onto the previous rule; solid sits mid-gap.
// dashed / solid styling lives in Separator's variants.
function ReceiptDivider({
  className,
  variant = "dashed",
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="receipt-divider"
      variant={variant}
      className={cn("relative -top-1.5 data-[variant=solid]:top-2", className)}
      {...props}
    />
  )
}

function ReceiptList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="receipt-list"
      className={cn("flex min-h-38 flex-col text-sm", className)}
      {...props}
    />
  )
}

function ReceiptItem({ className, ...props }: ComponentProps<"li">) {
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

function ReceiptItemValue({ className, ...props }: ComponentProps<"span">) {
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

function ReceiptTotal({ className, ...props }: ComponentProps<"div">) {
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

function ReceiptTotalLabel({ className, ...props }: ComponentProps<"span">) {
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

function ReceiptTotalValue({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="receipt-total-value"
      className={cn(
        "relative -top-1.5 font-serif text-3xl leading-7 text-(--tone-text)",
        className
      )}
      {...props}
    />
  )
}

function ReceiptFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-footer"
      className={cn("flex h-10 items-end justify-between gap-4", className)}
      {...props}
    />
  )
}

function ReceiptPremium({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="receipt-premium"
      className={cn(
        "font-serif text-(length:--text-premium) leading-7 text-(--tone-text) italic",
        className
      )}
      {...props}
    />
  )
}

function ReceiptPerks({ className, ...props }: ComponentProps<"p">) {
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
  receiptVariants,
}
