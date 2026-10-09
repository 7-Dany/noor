import { PricingHeading } from "@/pages/pricing/heading"
import { Plans } from "@/pages/pricing/plans"
import { PricingFaq } from "@/pages/pricing/faq"

export function PricingPage() {
  return (
    <main className="px-4 pt-12 pb-20 sm:px-10 sm:pt-14">
      <PricingHeading />
      <Plans />
      <PricingFaq />
    </main>
  )
}
