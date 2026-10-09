import { type ComponentProps } from "react"
import { Link } from "react-router"

import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import {
  CardDescription,
  CardNote,
  CardStat,
  CardStats,
  CardTitle,
} from "@/components/ui/card"
import {
  DeckCard,
  DeckContent,
  DeckControls,
  DeckIndicator,
  DeckNext,
  DeckPrevious,
  DeckProvider,
  useDeckState,
} from "@/components/custom/deck"
import { Barcode, SunMoon } from "@/components/icons"
import {
  Receipt,
  ReceiptDivider,
  ReceiptFooter,
  ReceiptGlyph,
  ReceiptHeader,
  ReceiptItem,
  ReceiptItemValue,
  ReceiptLabel,
  ReceiptList,
  ReceiptPerks,
  ReceiptPremium,
  ReceiptSpecimen,
  ReceiptSpecimenBody,
  ReceiptSpecimenDescription,
  ReceiptSpecimenTitle,
  ReceiptTitle,
  ReceiptTotal,
  ReceiptTotalLabel,
  ReceiptTotalValue,
} from "@/components/custom/receipt"
import { useSettled } from "@/hooks/use-settled"
import { pad } from "@/lib/utils"

import { getMaterial, type Material } from "@/data/materials"

/* Stack: deck + receipt printing the active card, one composite.
   Primitives (Deck, Receipt, Card) keep their own APIs; this file owns
   the data, the layout, and the wiring between them.

   Stack (items)
   ├── StackReceipt → Receipt (tone) + Receipt* slots
   └── DeckContent → StackCard × n → DeckCard + Card* slots + DeckControls */

// The receipt is a sibling of the deck, so the provider wraps both.
function Stack({
  items,
  className,
  ...props
}: { items: readonly Material[] } & ComponentProps<"section">) {
  return (
    <DeckProvider items={items}>
      <section
        aria-label="Your plan and first material"
        className={cn(
          "relative mx-auto mt-20 flex w-full max-w-205 flex-col gap-3.5 min-[901px]:block min-[901px]:h-125.5",
          className
        )}
        {...props}
      >
        <StackReceipt className="order-2 -rotate-2 max-[900px]:scale-95 min-[901px]:absolute min-[901px]:top-0 min-[901px]:left-0 min-[901px]:h-117.5 min-[901px]:w-100 min-[901px]:-rotate-4" />
        <DeckContent className="order-1 mt-9 mb-2 h-125 max-[900px]:-mb-3 max-[900px]:deck-compact min-[901px]:absolute min-[901px]:top-0 min-[901px]:left-106 min-[901px]:m-0 min-[901px]:h-117.5 min-[901px]:w-106.25">
          {items.map((material) => (
            <StackCard key={material.id} material={material} />
          ))}
        </DeckContent>
      </section>
    </DeckProvider>
  )
}

function StackCard({ material }: { material: Material }) {
  return (
    <DeckCard value={material.id} tone={material.tone}>
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
          <CardNote>{material.note}</CardNote>
          <CardTitle pattern="material">{material.title}.</CardTitle>
          <CardDescription pattern="material">
            {material.summary}
          </CardDescription>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <CardStats>
          {material.stats.map((stat) => (
            <CardStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </CardStats>
        <div className="flex items-center justify-between">
          <Link
            to={`/materials/${material.id}`}
            className={buttonVariants({ variant: "tone", size: "pill" })}
          >
            {material.cta}
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
          <DeckControls>
            <DeckPrevious />
            <DeckNext />
          </DeckControls>
        </div>
      </div>
    </DeckCard>
  )
}

// Prints the active deck card, so it must render inside <DeckProvider>.
function StackReceipt(props: ComponentProps<"article">) {
  const { state, meta } = useDeckState()
  const { shown, swapping } = useSettled(state.activeId)
  const material = getMaterial(shown)
  const { receipt } = material

  return (
    <Receipt tone={material.tone} {...props}>
      <div
        data-swapping={swapping ? "" : undefined}
        className="flex flex-col transition duration-150 data-swapping:translate-y-1 data-swapping:opacity-0 motion-reduce:transition-none"
      >
        <ReceiptHeader>
          <span>Contents · Free to teach</span>
          <span>
            No. {pad(meta.indexOf(shown) + 1, meta.count)} of{" "}
            {pad(meta.count, meta.count)}
          </span>
        </ReceiptHeader>
        <ReceiptTitle>{material.title}</ReceiptTitle>
        <ReceiptDivider />
        <ReceiptSpecimen>
          <ReceiptGlyph>{receipt.glyph}</ReceiptGlyph>
          <ReceiptSpecimenBody>
            <ReceiptLabel>{receipt.label}</ReceiptLabel>
            <ReceiptSpecimenTitle>{receipt.name}</ReceiptSpecimenTitle>
            <ReceiptSpecimenDescription>
              {receipt.description}
            </ReceiptSpecimenDescription>
          </ReceiptSpecimenBody>
        </ReceiptSpecimen>
        <ReceiptDivider />
        <ReceiptList>
          {receipt.rows.map(([name, value]) => (
            <ReceiptItem key={name}>
              <span>{name}</span>
              <ReceiptItemValue>{value}</ReceiptItemValue>
            </ReceiptItem>
          ))}
        </ReceiptList>
        <ReceiptDivider variant="solid" />
        <ReceiptTotal>
          <ReceiptTotalLabel>{receipt.totalLabel}</ReceiptTotalLabel>
          <ReceiptTotalValue>{receipt.total}</ReceiptTotalValue>
        </ReceiptTotal>
        <ReceiptFooter>
          <div className="flex min-w-0 flex-col">
            <ReceiptPremium>Premium</ReceiptPremium>
            <ReceiptPerks>quizzes, notes, tracking</ReceiptPerks>
          </div>
          <Barcode />
        </ReceiptFooter>
      </div>
    </Receipt>
  )
}

export { Stack }
