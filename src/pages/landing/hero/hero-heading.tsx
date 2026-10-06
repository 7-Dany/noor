import { useCyclingWord } from "@/hooks/use-cycling-word"

const WORDS = ["material", "slides", "lessons", "passages", "quizzes"]

/**
 * Hero heading: eyebrow, serif title with a cycling accent word, lead
 * paragraph. The receipt + deck stage is a separate component.
 */
export function HeroHeading() {
  const { index, entering, slotRef, currentRef, enteringRef } =
    useCyclingWord(WORDS.length)

  return (
    <div data-slot="hero-heading" className="text-center">
      <p className="font-mono text-xs tracking-eyebrow text-muted-foreground uppercase">
        Free for teachers · Arabic reading &amp; Quran
      </p>
      <h1 className="mx-auto mt-4 max-w-none font-serif text-hero leading-hero">
        Teach with beautiful,
        <br />
        ready-made{" "}
        <span
          ref={slotRef}
          aria-live="polite"
          className="relative inline-block border-b-2 border-dashed border-terracotta/45 slot-mask"
        >
          <em
            ref={currentRef}
            className="inline-block font-serif whitespace-nowrap text-terracotta italic"
          >
            {WORDS[index]}.
          </em>
          {entering !== null && (
            <em
              ref={enteringRef}
              aria-hidden="true"
              className="absolute top-0 left-0 inline-block font-serif whitespace-nowrap text-terracotta italic"
            >
              {WORDS[entering]}.
            </em>
          )}
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-hero text-base leading-lead text-muted-foreground">
        Slides, lessons and reading passages for Noor Al-Bayan, tajweed,
        vocabulary and the Quran. Open one, project it, and teach.
      </p>
    </div>
  )
}
