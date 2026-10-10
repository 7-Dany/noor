import { type ComponentProps } from "react"

import { cn } from "cn"
import { CardNote, CardTitle, CardWatermark } from "@/components/ui/card"
import {
  DeckCard,
  DeckContent,
  DeckControls,
  DeckCounter,
  DeckNext,
  DeckPrevious,
  DeckProvider,
  DeckRail,
  DeckRailArrow,
  DeckRailItem,
  DeckRailTrack,
} from "@/components/custom/deck"
import { SunMoon } from "@/components/icons"
import type { Letter } from "@/data/letters"

/* LetterDeck: one letter per card, plus a rail of every letter underneath.
   The provider wraps both, so the rail and the deck share one active letter.

   LetterDeck (items)
   ├── DeckContent → LetterCard × n → DeckCard + Card* slots + DeckControls
   └── DeckRail → DeckRailArrow, DeckRailTrack → DeckRailItem × n */

function LetterDeck({
  items,
  className,
  ...props
}: { items: readonly Letter[] } & ComponentProps<"section">) {
  return (
    <DeckProvider items={items}>
      <section
        aria-label="Letters"
        className={cn(
          "mx-auto flex w-full max-w-280 flex-col items-center gap-16",
          className
        )}
        {...props}
      >
        {/* The stack fans up and to the right; padding keeps it centred. */}
        <div className="w-full max-w-140 pe-14 pt-10 max-[900px]:pe-8">
          <DeckContent
            aria-label="Letters"
            className="h-110 max-[900px]:deck-compact"
          >
            {items.map((letter) => (
              <LetterCard key={letter.id} letter={letter} />
            ))}
          </DeckContent>
        </div>
        <DeckRail className="w-full">
          <DeckRailArrow direction="left" />
          {/* Arabic reads right to left, so the alphabet starts on the right. */}
          <DeckRailTrack dir="rtl">
            {items.map((letter) => (
              <DeckRailItem
                key={letter.id}
                value={letter.id}
                lang="ar"
                aria-label={letter.name}
              >
                {letter.glyph}
              </DeckRailItem>
            ))}
          </DeckRailTrack>
          <DeckRailArrow direction="right" />
        </DeckRail>
      </section>
    </DeckProvider>
  )
}

function LetterCard({ letter }: { letter: Letter }) {
  return (
    <DeckCard value={letter.id} tone={letter.tone}>
      <CardWatermark pattern="specimen">{letter.glyph}</CardWatermark>
      <SunMoon className="absolute top-5 right-6 size-7.5" />
      <DeckCounter value={letter.id} />
      <div className="flex items-end justify-between gap-4">
        <div>
          <CardNote>The letter,</CardNote>
          <CardTitle pattern="material">{letter.name}.</CardTitle>
        </div>
        <DeckControls>
          <DeckNext aria-label="Next letter" />
          <DeckPrevious aria-label="Previous letter" />
        </DeckControls>
      </div>
    </DeckCard>
  )
}

export { LetterDeck }
