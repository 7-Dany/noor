import { Link } from "react-router"

import { buttonVariants } from "@/components/ui/button"
import { Barcode } from "@/components/icons/barcode"
import { SunMoon } from "@/components/icons/sun-moon"
import {
  PriceCard,
  PriceCardAmount,
  PriceCardDescription,
  PriceCardFeature,
  PriceCardFeatures,
  PriceCardFooter,
  PriceCardHeader,
  PriceCardLabel,
  PriceCardTitle,
  PriceCardTotal,
  PriceCardUnit,
  PriceCardValue,
} from "@/components/custom/price-card"

import {
  PlanFan,
  PlanFanEmblem,
  PlanFanPlan,
} from "@/components/custom/plan-fan"
import { PLANS, type Plan } from "./data"

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <PriceCard tone={plan.tone} className="max-lg:h-full">
      <PriceCardHeader>
        <span>
          Plan {index + 1} of {PLANS.length}
        </span>
        {plan.kicker ? (
          <span>{plan.kicker}</span>
        ) : (
          <SunMoon className="size-5" />
        )}
      </PriceCardHeader>
      <PriceCardTitle>{plan.title}</PriceCardTitle>
      <PriceCardDescription>{plan.description}</PriceCardDescription>
      <PriceCardFeatures>
        {plan.features.map((feature, i) => (
          <PriceCardFeature
            key={feature}
            value={String(i + 1).padStart(2, "0")}
          >
            {feature}
          </PriceCardFeature>
        ))}
      </PriceCardFeatures>
      <PriceCardFooter>
        <PriceCardTotal>
          <PriceCardAmount>
            <PriceCardLabel>Total</PriceCardLabel>
            <PriceCardValue>
              {plan.price}
              {plan.unit ? <PriceCardUnit>{plan.unit}</PriceCardUnit> : null}
            </PriceCardValue>
          </PriceCardAmount>
          <Barcode className="mb-1 text-tone-foreground" />
        </PriceCardTotal>
        {/* No checkout yet, so both plans go to signup. */}
        <Link
          to="/signup"
          className={buttonVariants({
            variant: "tone",
            size: "pill",
            className: "w-full",
          })}
        >
          {plan.cta}
        </Link>
      </PriceCardFooter>
    </PriceCard>
  )
}

// Free sits on the start side, Premium on the end side.
const SIDES = ["start", "end"] as const

function Plans() {
  return (
    <>
      <PlanFan aria-label="Plans" className="mt-10 max-lg:mb-14">
        <PlanFanEmblem />
        {PLANS.map((plan, i) => (
          <PlanFanPlan key={plan.id} side={SIDES[i]}>
            <PlanCard plan={plan} index={i} />
          </PlanFanPlan>
        ))}
      </PlanFan>
      <p className="mt-2 mb-14 text-center font-mono text-micro tracking-eyebrow text-terracotta-accent uppercase max-lg:hidden">
        ✦ Hover to fan ✦
      </p>
    </>
  )
}

export { Plans }
