import type { Tone } from "@/components/ui/card"

export type Chapter = {
  id: string
  tone: Tone
  title: string
  summary: string
  glyph: string
  lessons: number
}

// Placeholder copy and counts from the earlier prototype: replace with the
// real chapter data. Stable references, like MATERIALS.
const CHAPTERS: Record<string, readonly Chapter[]> = {
  "noor-al-bayan": [
    {
      id: "letters",
      tone: "terracotta",
      title: "Letters",
      summary:
        "Meet the 30 letters, their shapes, and master each one in Quranic words.",
      glyph: "ب",
      lessons: 31,
    },
    {
      id: "harakat",
      tone: "blue",
      title: "Harakat",
      summary: "Short vowels: fatha, kasra, dumma.",
      glyph: "مَ",
      lessons: 7,
    },
    {
      id: "tanween",
      tone: "rose",
      title: "Tanween",
      summary: "Double vowels: tanween fatha, kasra, dumma.",
      glyph: "مً",
      lessons: 3,
    },
    {
      id: "sukoon",
      tone: "ink",
      title: "Sukoon",
      summary: "Letters at rest: reading with sukoon.",
      glyph: "مْ",
      lessons: 3,
    },
    {
      id: "madd",
      tone: "terracotta",
      title: "Madd",
      summary: "Stretching sounds: alif, waw, yaa.",
      glyph: "و",
      lessons: 3,
    },
    {
      id: "shaddah",
      tone: "blue",
      title: "Shaddah",
      summary: "Doubled letters with every vowel.",
      glyph: "مّ",
      lessons: 4,
    },
    {
      id: "hamza-laam",
      tone: "rose",
      title: "Hamza & Laam",
      summary: "Two hamzas, two laams: joining rules.",
      glyph: "ء",
      lessons: 2,
    },
    {
      id: "reading-passages",
      tone: "ink",
      title: "Reading Passages",
      summary: "Reading fluency, part by part.",
      glyph: "ق",
      lessons: 8,
    },
    {
      id: "games",
      tone: "terracotta",
      title: "Games",
      summary: "Playful drills for the class.",
      glyph: "ل",
      lessons: 3,
    },
    {
      id: "general-topics",
      tone: "blue",
      title: "General Topics",
      summary: "Extra topics for the teacher.",
      glyph: "ن",
      lessons: 2,
    },
  ],
}

const NONE: readonly Chapter[] = []

// Materials without chapters yet return an empty list.
export function getChapters(materialId: string) {
  return CHAPTERS[materialId] ?? NONE
}
