import { PricingHeading } from "@/pages/pricing/heading"
import { Plans } from "@/pages/pricing/plans"
import { PricingFaq } from "@/pages/pricing/faq"
import { SitePage } from "@/components/sections/page"

export function PricingPage() {
  return (
    <SitePage bottom="roomy">
      <PricingHeading />
      <Plans />
      <PricingFaq />
    </SitePage>
  )
}
