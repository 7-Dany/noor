import type { ComponentProps } from "react"

import { cn } from "cn"
import { DeckProvider } from "@/components/custom/deck"

import { MATERIALS } from "./data"
import { MaterialDeck } from "./material-deck"
import { MaterialReceipt } from "./material-receipt"

// The receipt is a sibling of the deck, so the provider wraps both.
function MaterialStack({ className, ...props }: ComponentProps<"section">) {
  return (
    <DeckProvider items={MATERIALS}>
      <section
        aria-label="Your plan and first material"
        className={cn(
          // Mobile: column, deck first. ≥901px: receipt and deck side by side.
          "relative mx-auto mt-20 flex w-full max-w-205 flex-col gap-3.5 min-[901px]:block min-[901px]:h-125.5",
          className
        )}
        {...props}
      >
        <MaterialReceipt className="order-2 -rotate-2 max-[900px]:scale-95 min-[901px]:absolute min-[901px]:top-0 min-[901px]:left-0 min-[901px]:h-117.5 min-[901px]:w-100 min-[901px]:-rotate-4" />
        <MaterialDeck className="order-1 mt-9 mb-2 h-125 max-[900px]:-mb-3 max-[900px]:[--deck-spread:6px] max-[900px]:[--deck-tilt-step:2deg] max-[900px]:[--deck-zoom:.88] min-[901px]:absolute min-[901px]:top-0 min-[901px]:left-106 min-[901px]:m-0 min-[901px]:h-117.5 min-[901px]:w-106.25" />
      </section>
    </DeckProvider>
  )
}

export { MaterialStack }
