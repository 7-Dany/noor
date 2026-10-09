import { useCyclingWord } from "@/hooks/use-cycling-word"
import {
  Heading,
  HeadingEyebrow,
  HeadingLead,
  HeadingTitle,
} from "@/components/sections/heading"

const WORDS = ["material", "slides", "lessons", "passages", "quizzes"]

export function HeroHeading() {
  const { index, entering, slotRef, currentRef, enteringRef } = useCyclingWord(
    WORDS.length
  )

  return (
    <Heading data-slot="hero-heading">
      <HeadingEyebrow>
        Free for teachers · Arabic reading &amp; Quran
      </HeadingEyebrow>
      <HeadingTitle>
        Teach with beautiful,
        <br />
        ready-made <span className="sr-only">{WORDS[0]}.</span>
        <span
          ref={slotRef}
          aria-hidden="true"
          className="relative inline-block border-b-2 border-dashed border-terracotta/45 slot-mask"
        >
          <em
            ref={currentRef}
            className="inline-block font-serif whitespace-nowrap text-terracotta-accent italic"
          >
            {WORDS[index]}.
          </em>
          {entering !== null && (
            <em
              ref={enteringRef}
              className="absolute top-0 left-0 inline-block font-serif whitespace-nowrap text-terracotta-accent italic"
            >
              {WORDS[entering]}.
            </em>
          )}
        </span>
      </HeadingTitle>
      <HeadingLead>
        Slides, lessons and reading passages for Noor Al-Bayan, tajweed,
        vocabulary and the Quran. Open one, project it, and teach.
      </HeadingLead>
    </Heading>
  )
}
