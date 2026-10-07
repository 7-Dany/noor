import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"
import { SunMoon } from "@/components/icons/sun-moon"

/* PlanFan: two plans fanned from the middle. From lg, hover or focus spreads
   them apart and reveals the emblem behind; below lg they stack in a grid.

     <PlanFan aria-label="Plans">
       <PlanFanEmblem />
       <PlanFanPlan side="start">…</PlanFanPlan>
       <PlanFanPlan side="end">…</PlanFanPlan>
     </PlanFan> */

function PlanFan({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      data-slot="plan-fan"
      className={cn(
        "group/plan-fan relative mx-auto h-120 max-w-250 max-lg:grid max-lg:h-auto max-lg:gap-6 max-lg:md:grid-cols-2",
        className
      )}
      {...props}
    />
  )
}

// right-1/2 + -mr-2.5 puts the card's edge 0.625rem past centre (a slim
// overlap so both cards read separately); same as
// right-[calc(50%-0.625rem)] without the arbitrary value.
const planFanPlanVariants = cva(
  [
    "absolute top-3.5 w-95",
    "transition-transform duration-700 ease-spring motion-reduce:transition-none",
    "max-lg:static max-lg:m-0 max-lg:w-auto max-lg:rotate-0",
  ],
  {
    variants: {
      side: {
        start:
          "right-1/2 z-10 -mr-2.5 -rotate-2 lg:group-focus-within/plan-fan:-translate-x-24 lg:group-focus-within/plan-fan:-rotate-3 lg:group-hover/plan-fan:-translate-x-24 lg:group-hover/plan-fan:-rotate-3",
        end: "left-1/2 z-20 -ml-2.5 rotate-2 lg:group-focus-within/plan-fan:translate-x-24 lg:group-focus-within/plan-fan:rotate-3 lg:group-hover/plan-fan:translate-x-24 lg:group-hover/plan-fan:rotate-3",
      },
    },
    defaultVariants: { side: "start" },
  }
)

function PlanFanPlan({
  className,
  side,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof planFanPlanVariants>) {
  return (
    <div
      data-slot="plan-fan-plan"
      data-side={side}
      className={cn(planFanPlanVariants({ side }), className)}
      {...props}
    />
  )
}

// Spins in behind the cards when the fan opens.
function PlanFanEmblem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="plan-fan-emblem"
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 left-1/2 z-0 -translate-1/2 scale-50 -rotate-50 opacity-0 transition duration-700 ease-spring group-focus-within/plan-fan:scale-100 group-focus-within/plan-fan:rotate-0 group-focus-within/plan-fan:opacity-100 group-hover/plan-fan:scale-100 group-hover/plan-fan:rotate-0 group-hover/plan-fan:opacity-100 motion-reduce:transition-none max-lg:hidden",
        className
      )}
      {...props}
    >
      <SunMoon className="size-30" />
    </div>
  )
}

export { PlanFan, PlanFanPlan, PlanFanEmblem, planFanPlanVariants }
