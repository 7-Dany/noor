import {
  Heading,
  HeadingAccent,
  HeadingEyebrow,
  HeadingLead,
  HeadingTitle,
} from "@/components/sections/heading"

export function PricingHeading() {
  return (
    <Heading data-slot="pricing-heading">
      <HeadingEyebrow>Pricing</HeadingEyebrow>
      <HeadingTitle>
        <HeadingAccent tone="ink">Free</HeadingAccent> to teach.
        <br />
        <HeadingAccent>Premium</HeadingAccent> to go further.
      </HeadingTitle>
      <HeadingLead>
        Every teacher can open, project and teach. Premium adds games, early
        access and progress tracking.
      </HeadingLead>
    </Heading>
  )
}
