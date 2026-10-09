import { Link } from "react-router"

import { buttonVariants } from "@/components/ui/button"
import { Barcode, SunMoon } from "@/components/icons"
import {
  Card,
  CardAmount,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLabel,
  CardRow,
  CardRows,
  CardTitle,
  CardTotal,
  CardUnit,
  CardValue,
} from "@/components/ui/card"

import {
  PlanFan,
  PlanFanEmblem,
  PlanFanPlan,
} from "@/components/custom/plan-fan"
import { PLANS, type Plan } from "./data"

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <Card tone={plan.tone} pattern="price">
      <CardHeader pattern="price">
        <span>
          Plan {index + 1} of {PLANS.length}
        </span>
        {plan.kicker ? (
          <span>{plan.kicker}</span>
        ) : (
          <SunMoon className="size-5" />
        )}
      </CardHeader>
      <CardTitle pattern="price">{plan.title}</CardTitle>
      <CardDescription pattern="price">{plan.description}</CardDescription>
      <CardRows>
        {plan.features.map((feature, i) => (
          <CardRow key={feature} value={String(i + 1).padStart(2, "0")}>
            {feature}
          </CardRow>
        ))}
      </CardRows>
      <CardFooter pattern="price">
        <CardTotal>
          <CardAmount>
            <CardLabel>Total</CardLabel>
            <CardValue>
              {plan.price}
              {plan.unit ? <CardUnit>{plan.unit}</CardUnit> : null}
            </CardValue>
          </CardAmount>
          <Barcode className="mb-1 text-tone-foreground" />
        </CardTotal>
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
      </CardFooter>
    </Card>
  )
}

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
