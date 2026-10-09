import { Link } from "react-router"

import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"
import { MoonOrb, SunOrb } from "@/components/icons"

function Cta({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="cta"
      className={cn(
        "relative mx-auto flex w-full max-w-280 flex-wrap items-center justify-between gap-6 overflow-hidden rounded-band bg-cta px-6 py-8 text-cta-foreground sm:px-10 sm:py-9",
        className
      )}
      {...props}
    >
      <SunOrb className="pointer-events-none absolute -top-27.5 -right-25 size-60 max-sm:-top-24 max-sm:-right-18 max-sm:size-52" />
      <MoonOrb className="pointer-events-none absolute -top-27.5 -right-25 size-60 max-sm:-top-24 max-sm:-right-18 max-sm:size-52" />
      {props.children}
    </section>
  )
}

function CtaContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-content"
      className={cn("relative max-sm:pr-20", className)}
      {...props}
    />
  )
}

function CtaTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="cta-title"
      className={cn(
        "font-serif text-cta-title leading-cta-title font-normal",
        className
      )}
      {...props}
    />
  )
}

function CtaDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="cta-description"
      className={cn("mt-1 opacity-85", className)}
      {...props}
    />
  )
}

function CtaAction({
  to,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "to"> & { to: string }) {
  return (
    <Link
      to={to}
      data-slot="cta-action"
      className={buttonVariants({
        variant: "cta",
        size: "pill",
        className: cn("relative mr-30 max-[700px]:mr-0", className),
      })}
      {...props}
    />
  )
}

export { Cta, CtaContent, CtaTitle, CtaDescription, CtaAction }
