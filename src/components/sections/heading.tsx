import { type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"

function Heading({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="heading"
      className={cn("text-center", className)}
      {...props}
    />
  )
}

function HeadingEyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="heading-eyebrow"
      className={cn(
        "font-mono text-xs tracking-eyebrow text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function HeadingTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      data-slot="heading-title"
      className={cn(
        "mx-auto mt-4 max-w-none font-serif text-hero leading-hero",
        className
      )}
      {...props}
    />
  )
}

function HeadingLead({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="heading-lead"
      className={cn(
        "mx-auto mt-6 max-w-hero text-base leading-lead text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

const headingAccentVariants = cva(
  "underline decoration-dashed decoration-1 underline-offset-8",
  {
    variants: {
      tone: {
        accent: "text-terracotta-accent",
        ink: "text-ink",
      },
    },
    defaultVariants: { tone: "accent" },
  }
)

function HeadingAccent({
  className,
  tone,
  ...props
}: ComponentProps<"em"> & VariantProps<typeof headingAccentVariants>) {
  return (
    <em
      data-slot="heading-accent"
      className={cn(headingAccentVariants({ tone }), className)}
      {...props}
    />
  )
}

export {
  Heading,
  HeadingEyebrow,
  HeadingTitle,
  HeadingLead,
  HeadingAccent,
  headingAccentVariants,
}
