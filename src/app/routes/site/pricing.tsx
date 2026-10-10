import { PricingPage } from "@/pages/pricing/page"

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
  return <PricingPage />
}
