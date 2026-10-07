import { Fragment, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import {
  DeckCard,
  DeckContent,
  DeckControls,
  DeckIndicator,
  DeckNext,
  DeckPrevious,
} from "@/components/custom/deck"
import { SunMoon } from "@/components/icons/sun-moon"

import { MATERIALS, type Material } from "@/data/materials"

function MaterialCard({ material }: { material: Material }) {
  return (
    <DeckCard value={material.id}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-20 -z-10 font-arabic text-watermark leading-none text-tone-foreground/13 select-none"
      >
        {material.watermark}
      </span>
      <SunMoon className="absolute top-7 right-6 size-18" />
      <div className="flex flex-col gap-10">
        <DeckIndicator value={material.id}>Material</DeckIndicator>
        <div>
          <p className="font-serif text-premium text-sun italic">
            {material.note}
          </p>
          <h2 className="mt-1 font-serif text-display leading-display text-balance italic">
            {material.title}.
          </h2>
          <p className="mt-4 max-w-lead text-base leading-copy">
            {material.summary}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-stretch gap-5">
          {material.stats.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="border-l border-dashed border-tone-foreground/45"
                />
              )}
              <div>
                <p className="font-serif text-display leading-none">
                  {stat.value}
                </p>
                <p className="mt-1.5 font-mono text-micro tracking-eyebrow uppercase opacity-85">
                  {stat.label}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="flex items-center justify-between">
          {/* Wrapper keeps taps on a disabled (pointer-events-none) button
              from flipping the card; see INTERACTIVE_SELECTOR in deck.tsx. */}
          <div data-deck-interactive>
            <Button variant="tone" size="pill" disabled={material.disabled}>
              {material.cta}
            </Button>
          </div>
          <DeckControls>
            <DeckPrevious />
            <DeckNext />
          </DeckControls>
        </div>
      </div>
    </DeckCard>
  )
}

function MaterialDeck(props: Omit<ComponentProps<"div">, "children">) {
  return (
    <DeckContent {...props}>
      {MATERIALS.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </DeckContent>
  )
}

export { MaterialDeck }
