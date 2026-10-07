import { PricingHeading } from "@/pages/pricing/pricing-heading"
import { Plans } from "@/pages/pricing/plans"
import { PricingFaq } from "@/pages/pricing/pricing-faq"

export function meta() {
  return [
    { title: "Pricing · Noor" },
    {
      name: "description",
      content:
        "Noor is free for teachers. Premium adds games, early access and progress tracking for $5 USD per month.",
    },
  ]
}

export default function Pricing() {
  return (
    <main className="px-4 pt-12 pb-20 sm:px-10 sm:pt-14">
      <PricingHeading />
      <Plans />
      <PricingFaq />
    </main>
  )
}
