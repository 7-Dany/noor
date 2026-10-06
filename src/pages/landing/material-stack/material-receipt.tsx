"use client"

import { useEffect, useState, type ComponentProps } from "react"

import { useDeck } from "@/components/ui/deck"
import {
  Barcode,
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
} from "@/components/ui/receipt"

import { getMaterial } from "./data"

// Lags `value` by `ms` so the old content can fade out before the swap.
function useSettled<T>(value: T, ms = 150) {
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (value === shown) return
    const timer = window.setTimeout(() => setShown(value), ms)
    return () => window.clearTimeout(timer)
  }, [value, shown, ms])

  return { shown, swapping: value !== shown }
}

// Prints the active deck card, so it must render inside <DeckProvider>.
function MaterialReceipt(props: ComponentProps<"article">) {
  const { state, meta } = useDeck()
  const { shown, swapping } = useSettled(state.activeId)
  const material = getMaterial(shown)
  const { receipt } = material

  return (
    <Receipt tone={material.tone} {...props}>
      <div
        data-swapping={swapping ? "" : undefined}
        className="flex flex-col transition duration-150 data-[swapping]:translate-y-1 data-[swapping]:opacity-0 motion-reduce:transition-none"
      >
        <ReceiptHeader>
          <span>Contents · Free to teach</span>
          <span>
            No. 0{meta.indexOf(shown) + 1} of 0{meta.count}
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

export { MaterialReceipt }
