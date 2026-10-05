"use client"

import { useEffect, useState, type ComponentProps } from "react"

import { cn } from "cn"
import {
  DeckCard,
  DeckContent,
  DeckControls,
  DeckIndicator,
  DeckNext,
  DeckPrevious,
  DeckProvider,
  useDeck,
  type DeckItem,
} from "@/components/ui/deck"
import {
  Barcode,
  Receipt,
  ReceiptDivider,
  ReceiptFooter,
  ReceiptPerks,
  ReceiptPremium,
  ReceiptGlyph,
  ReceiptHeader,
  ReceiptItem,
  ReceiptItemValue,
  ReceiptLabel,
  ReceiptList,
  ReceiptSpecimen,
  ReceiptSpecimenBody,
  ReceiptSpecimenDescription,
  ReceiptSpecimenTitle,
  ReceiptTitle,
  ReceiptTotal,
  ReceiptTotalLabel,
  ReceiptTotalValue,
} from "@/components/ui/receipt"

/* Receipt + Deck stack. The receipt is a sibling of the deck that prints the
   active card's contents, so we use <DeckProvider> directly (see deck.tsx). */

type Material = DeckItem & {
  title: string
  note: string
  summary: string
  stat: { label: string; value: string }
  cta: string
  disabled?: boolean
  receipt: {
    glyph: string
    label: string
    name: string
    description: string
    rows: [string, string][]
    totalLabel: string
    total: string
  }
}

// Stable reference: DeckProvider memoises on `items`.
const MATERIALS: readonly Material[] = [
  {
    id: "noor-al-bayan",
    tone: "terracotta",
    title: "Noor Al-Bayan",
    note: "Material one,",
    summary:
      "Ten chapters, about 167 lessons: letters, harakat, madd, sukoon, shaddah, tanween and hamza, plus 43 reading passages and games.",
    stat: { label: "Chapters · Lessons", value: "10 · ~167" },
    cta: "Open material",
    receipt: {
      glyph: "بَ",
      label: "Letter + fatha",
      name: "Ba, as in “ba”",
      description: "A fatha on a letter gives the short “a” sound.",
      rows: [
        ["Letters", "01"],
        ["Harakat", "02"],
        ["Madd", "03"],
        ["Sukoon", "04"],
        ["Shaddah to games", "05–10"],
      ],
      totalLabel: "Total lessons",
      total: "~167",
    },
  },
  {
    id: "tajweed-mastery",
    tone: "blue",
    title: "Tajweed Mastery",
    note: "Material two,",
    summary:
      "Five chapters, 21 lessons of ready-to-teach slides on the rules of recitation.",
    stat: { label: "Chapters · Lessons", value: "5 · 21" },
    cta: "Open material",
    receipt: {
      glyph: "مِنۢ بَعْدِ",
      label: "Iqlab",
      name: "Noon sakinah + ba",
      description: "The noon turns into a hidden meem before ba.",
      rows: [
        ["Noon sakinah & tanween", "01"],
        ["Meem sakinah", "02"],
        ["Madd", "03"],
        ["Qalqalah & heavy letters", "04"],
        ["Stopping & starting", "05"],
      ],
      totalLabel: "Total lessons",
      total: "21",
    },
  },
  {
    id: "vocab-grammar",
    tone: "rose",
    title: "Vocab & Grammar",
    note: "Material three,",
    summary:
      "Three chapters, about 10 lessons: nouns, flashcards and practice exercises for the class.",
    stat: { label: "Chapters · Lessons", value: "3 · ~10" },
    cta: "Open material",
    receipt: {
      glyph: "كِتَابٌ",
      label: "Noun + tanween",
      name: "Kitab, “a book”",
      description: "Tanween marks an indefinite noun.",
      rows: [
        ["Nouns", "01"],
        ["Flashcards", "02"],
        ["Quizzes", "03"],
      ],
      totalLabel: "Total lessons",
      total: "~10",
    },
  },
  {
    id: "quran-library",
    tone: "ink",
    title: "Quran Library",
    note: "Material four,",
    summary:
      "A classroom reference: all 604 mushaf pages, browsed by page or by Juz.",
    stat: { label: "Juz · Pages", value: "30 · 604" },
    cta: "Coming soon",
    disabled: true,
    receipt: {
      glyph: "ٱلْفَاتِحَةُ",
      label: "Page 1 · Juz 1",
      name: "Al-Fatihah",
      description: "Begin at the first page of the mushaf.",
      rows: [
        ["Juz 1", "pp. 1–21"],
        ["Juz 2", "pp. 22–41"],
        ["Juz 3", "pp. 42–61"],
        ["Juz 4", "pp. 62–81"],
        ["26 more Juz", "to p. 604"],
      ],
      totalLabel: "Mushaf pages",
      total: "604",
    },
  },
]

const BY_ID = new Map(MATERIALS.map((m) => [m.id, m]))

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

function MaterialReceipt({ className, ...props }: ComponentProps<"article">) {
  const { state, meta } = useDeck()
  const { shown, swapping } = useSettled(state.activeId)
  const material = BY_ID.get(shown)!
  const r = material.receipt

  return (
    <Receipt tone={material.tone} className={className} {...props}>
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
          <ReceiptGlyph>{r.glyph}</ReceiptGlyph>
          <ReceiptSpecimenBody>
            <ReceiptLabel>{r.label}</ReceiptLabel>
            <ReceiptSpecimenTitle>{r.name}</ReceiptSpecimenTitle>
            <ReceiptSpecimenDescription>
              {r.description}
            </ReceiptSpecimenDescription>
          </ReceiptSpecimenBody>
        </ReceiptSpecimen>
        <ReceiptDivider />
        <ReceiptList>
          {r.rows.map(([name, value]) => (
            <ReceiptItem key={name}>
              <span>{name}</span>
              <ReceiptItemValue>{value}</ReceiptItemValue>
            </ReceiptItem>
          ))}
        </ReceiptList>
        <ReceiptDivider variant="solid" />
        <ReceiptTotal>
          <ReceiptTotalLabel>{r.totalLabel}</ReceiptTotalLabel>
          <ReceiptTotalValue>{r.total}</ReceiptTotalValue>
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

// Brand sun (same paths as the HTML). Decorative.
function Sun({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 49 49"
      fill="none"
      className={className}
      {...props}
    >
      <g className="stroke-sun" strokeWidth="1.837">
        <path
          className="fill-sun-deep"
          d="M24.5 33.074a8.575 8.575 0 1 0 0-17.149 8.575 8.575 0 0 0 0 17.15Z"
        />
        <path
          strokeLinecap="round"
          d="M37.975 24.5H44.1m-10.072 9.528 4.331 4.331M24.5 37.975V44.1m-9.529-10.072-4.33 4.331m.384-13.859H4.9m10.071-9.528-4.33-4.331m13.859.384V4.9m9.528 10.072 4.331-4.331"
        />
      </g>
    </svg>
  )
}

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
        <MaterialReceipt className="order-2 -rotate-2 min-[901px]:absolute min-[901px]:top-0 min-[901px]:left-0 min-[901px]:h-117.5 min-[901px]:w-100 min-[901px]:-rotate-4" />
        <DeckContent className="order-1 mt-9 mb-2 h-125 min-[901px]:absolute min-[901px]:top-0 min-[901px]:left-106 min-[901px]:m-0 min-[901px]:h-117.5 min-[901px]:w-106.25">
          {MATERIALS.map((m) => (
            <DeckCard key={m.id} value={m.id}>
              <div className="flex flex-col">
                <DeckIndicator value={m.id}>Material</DeckIndicator>
                <Sun className="absolute top-7 right-6 size-18" />
                <p className="mt-9 font-serif text-(length:--text-premium) leading-premium text-sun italic">
                  {m.note}
                </p>
                <h2 className="mt-1 font-serif text-(length:--text-display) leading-display text-balance italic">
                  {m.title}.
                </h2>
                <p className="mt-4 max-w-lead text-(length:--text-lead) leading-copy">
                  {m.summary}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-mono text-(length:--text-micro) tracking-widest uppercase opacity-85">
                    {m.stat.label}
                  </p>
                  <p className="mt-1 font-serif text-(length:--text-premium) leading-premium">
                    {m.stat.value}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    disabled={m.disabled}
                    className="h-9 cursor-pointer rounded-full bg-tone-foreground px-4 text-sm font-medium text-(--tone) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tone-foreground disabled:cursor-default disabled:opacity-60"
                  >
                    {m.cta}
                  </button>
                  <DeckControls>
                    <DeckPrevious />
                    <DeckNext />
                  </DeckControls>
                </div>
              </div>
            </DeckCard>
          ))}
        </DeckContent>
      </section>
    </DeckProvider>
  )
}

export { MaterialStack, MATERIALS }
