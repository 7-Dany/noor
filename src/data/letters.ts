import type { Tone } from "@/components/ui/card"

export type Letter = {
  id: string
  tone: Tone
  glyph: string
  name: string
}

// Tones cycle through the deck, like the home deck's materials.
const TONES = [
  "terracotta",
  "blue",
  "rose",
  "ink",
] as const satisfies readonly Tone[]

// The 29 cards of Noor Al-Bayan's first lesson, in alphabet order. Alif and
// hamza share the first card; alif maqsura closes the set.
const RAW_LETTERS = [
  ["alif", "أ", "Alif · Hamza"],
  ["ba", "ب", "Ba"],
  ["ta", "ت", "Ta"],
  ["tha", "ث", "Tha"],
  ["jeem", "ج", "Jeem"],
  ["ha", "ح", "Ha"],
  ["kha", "خ", "Kha"],
  ["dal", "د", "Dal"],
  ["dhal", "ذ", "Dhal"],
  ["ra", "ر", "Ra"],
  ["zay", "ز", "Zay"],
  ["seen", "س", "Seen"],
  ["sheen", "ش", "Sheen"],
  ["sad", "ص", "Sad"],
  ["dad", "ض", "Dad"],
  ["taa", "ط", "Taa"],
  ["zha", "ظ", "Zha"],
  ["ayn", "ع", "Ayn"],
  ["ghayn", "غ", "Ghayn"],
  ["fa", "ف", "Fa"],
  ["qaf", "ق", "Qaf"],
  ["kaf", "ك", "Kaf"],
  ["lam", "ل", "Lam"],
  ["meem", "م", "Meem"],
  ["noon", "ن", "Noon"],
  ["haa", "ه", "Haa"],
  ["waw", "و", "Waw"],
  ["ya", "ي", "Ya"],
  ["alif-maqsura", "ى", "Alif maqsura"],
] as const

// Stable reference: DeckProvider memoises on `items`.
export const LETTERS: readonly Letter[] = RAW_LETTERS.map(
  ([id, glyph, name], index) => ({
    id,
    glyph,
    name,
    tone: TONES[index % TONES.length],
  })
)
