const UNDERLINE = "decoration-dashed decoration-1 underline-offset-8 underline"

/**
 * Pricing heading: eyebrow, title with the two plan names accented, lead.
 * Same structure and rhythm as the landing HeroHeading; only the title
 * content differs (static accents instead of the cycling word).
 */
export function PricingHeading() {
  return (
    <div data-slot="pricing-heading" className="text-center">
      <p className="font-mono text-xs tracking-eyebrow text-muted-foreground uppercase">
        Pricing
      </p>
      <h1 className="mx-auto mt-4 max-w-none font-serif text-hero leading-hero">
        <em className={`${UNDERLINE} text-ink`}>Free</em> to teach.
        <br />
        <em className={`${UNDERLINE} text-terracotta-accent`}>Premium</em> to go
        further.
      </h1>
      <p className="mx-auto mt-6 max-w-hero text-base leading-lead text-muted-foreground">
        Every teacher can open, project and teach. Premium adds games, early
        access and progress tracking.
      </p>
    </div>
  )
}
