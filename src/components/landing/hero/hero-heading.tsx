/**
 * Landing hero heading. Centered eyebrow, serif title with a terracotta
 * italic accent word, and the lead paragraph. The interactive stage
 * (receipt + material deck) is a separate component.
 */
export function HeroHeading() {
  return (
    <div data-slot="hero-heading" className="text-center">
      <p className="font-mono text-xs tracking-eyebrow text-muted-foreground uppercase">
        Free for teachers · Arabic reading &amp; Quran
      </p>
      <h1 className="mx-auto mt-4 max-w-none font-serif text-hero leading-hero">
        Teach with beautiful,
        <br />
        ready-made <em className="text-terracotta">material.</em>
      </h1>
      <p className="mx-auto mt-6 max-w-hero text-base leading-lead text-muted-foreground">
        Slides, lessons and reading passages for Noor Al-Bayan, tajweed,
        vocabulary and the Quran. Open one, project it, and teach.
      </p>
    </div>
  )
}
