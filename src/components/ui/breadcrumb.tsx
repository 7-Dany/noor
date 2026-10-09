import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  MoreHorizontalCircle01Icon,
} from "@hugeicons/core-free-icons"

/* Breadcrumb: mono eyebrow trail, small chevrons, serif-italic current page.
   Omit `tone` for the neutral look; set it (same tones as Card) and the
   current page and chevrons take the material's color. */

// A tone is three CSS vars; same list as Card (see index.css).
const breadcrumbVariants = cva("group/breadcrumb", {
  variants: {
    tone: {
      terracotta: "tone-terracotta",
      blue: "tone-blue",
      rose: "tone-rose",
      ink: "tone-ink",
    },
  },
})

function Breadcrumb({
  className,
  tone,
  ...props
}: React.ComponentProps<"nav"> & VariantProps<typeof breadcrumbVariants>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      data-tone={tone ?? undefined}
      className={cn(breadcrumbVariants({ tone }), className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 font-mono text-(length:--text-tiny) tracking-eyebrow wrap-break-word text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "inline-flex min-h-8 items-center rounded-sm transition-colors outline-none hover:text-foreground hover:underline hover:decoration-dashed hover:decoration-1 hover:underline-offset-8 focus-visible:ring-3 focus-visible:ring-ring/50",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "max-w-[26ch] truncate font-serif text-base font-normal tracking-normal text-foreground normal-case italic group-data-[tone]/breadcrumb:text-(--tone-text)",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "group-data-[tone]/breadcrumb:text-(--tone-text)/70 [&>svg]:size-3",
        className
      )}
      {...props}
    >
      {children ?? (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          strokeWidth={2}
          className="rtl:rotate-180"
        />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  breadcrumbVariants,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
