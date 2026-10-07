const UNDERLINE = "decoration-dashed decoration-1 underline-offset-8 underline"

/**
 * Materials heading: eyebrow, title with the accent word, lead. Same
 * structure and rhythm as PricingHeading and the landing HeroHeading.
 */
export function MaterialsHeading() {
  return (
    <div data-slot="materials-heading" className="text-center">
      <p className="font-mono text-xs tracking-eyebrow text-muted-foreground uppercase">
        Free for teachers · Arabic reading &amp; Quran
      </p>
      <h1 className="mx-auto mt-4 max-w-none font-serif text-hero leading-hero">
        Choose a{" "}
        <em className={`${UNDERLINE} text-terracotta-accent`}>material.</em>
      </h1>
      <p className="mx-auto mt-6 max-w-hero text-base leading-lead text-muted-foreground">
        Every one is free to use in class. Pick a material and start from any
        lesson.
      </p>
    </div>
  )
}
