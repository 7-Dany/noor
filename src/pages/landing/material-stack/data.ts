import type { DeckItem } from "@/components/ui/deck"

export type Material = DeckItem & {
  title: string
  note: string
  summary: string
  watermark: string // one Arabic letter, drawn faint on the card
  stats: { value: string; label: string }[] // two, shown as big numerals
  cta: string
  disabled?: boolean
  receipt: {
    glyph: string
    label: string
    name: string
    description: string
    rows: [name: string, value: string][]
    totalLabel: string
    total: string
  }
}

// Stable reference: DeckProvider memoises on `items`.
export const MATERIALS: readonly Material[] = [
  {
    id: "noor-al-bayan",
    tone: "terracotta",
    title: "Noor Al-Bayan",
    note: "Material one,",
    summary:
      "Ten chapters, about 167 lessons: letters, harakat, madd, sukoon, shaddah, tanween and hamza, plus 43 reading passages and games.",
    watermark: "ب",
    stats: [
      { value: "10", label: "Chapters" },
      { value: "~167", label: "Lessons" },
    ],
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
    watermark: "ن",
    stats: [
      { value: "5", label: "Chapters" },
      { value: "21", label: "Lessons" },
    ],
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
    watermark: "ك",
    stats: [
      { value: "3", label: "Chapters" },
      { value: "~10", label: "Lessons" },
    ],
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
    watermark: "ق",
    stats: [
      { value: "30", label: "Juz" },
      { value: "604", label: "Pages" },
    ],
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

const BY_ID = new Map(MATERIALS.map((material) => [material.id, material]))

export function getMaterial(id: string) {
  const material = BY_ID.get(id)
  if (!material) throw new Error(`Unknown material "${id}".`)
  return material
}
