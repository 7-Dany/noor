import type { Tone } from "@/components/ui/card"

export type Lesson = {
  id: string
  title: string
  kind: "Lesson" | "Drill" | "Game"
}

export type Section = {
  id: string
  title: string
  summary: string
  lessons: readonly Lesson[]
}

export type Chapter = {
  id: string
  tone: Tone
  title: string
  summary: string
  glyph: string
  lessons: number
  sections?: readonly Section[]
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
      sections: [
        {
          id: "basics",
          title: "The basics",
          summary: "Know the alphabet before you read it.",
          lessons: [
            { id: "alphabet", title: "The Alphabet", kind: "Lesson" },
            {
              id: "shapes-positions",
              title: "Shapes & Positions",
              kind: "Lesson",
            },
            { id: "similar-writing", title: "Similar Writing", kind: "Lesson" },
            {
              id: "similar-pronunciation",
              title: "Similar Pronunciation",
              kind: "Lesson",
            },
          ],
        },
        {
          id: "letters-in-words",
          title: "Letters in Quranic words",
          summary: "One letter at a time, in real words.",
          lessons: [
            { id: "ba", title: "Ba (ب)", kind: "Drill" },
            { id: "ta", title: "Ta (ت)", kind: "Drill" },
            { id: "tha", title: "Tha (ث)", kind: "Drill" },
            { id: "jeem", title: "Jeem (ج)", kind: "Drill" },
            { id: "ha", title: "Ha (ح)", kind: "Drill" },
            { id: "kha", title: "Kha (خ)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-2",
          title: "Letters in Quranic words, part 2",
          summary: "Continuing through the alphabet.",
          lessons: [
            { id: "dal", title: "Dal (د)", kind: "Drill" },
            { id: "dhal", title: "Dhal (ذ)", kind: "Drill" },
            { id: "ra", title: "Ra (ر)", kind: "Drill" },
            { id: "zay", title: "Zay (ز)", kind: "Drill" },
            { id: "seen", title: "Seen (س)", kind: "Drill" },
            { id: "sheen", title: "Sheen (ش)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-3",
          title: "Letters in Quranic words, part 3",
          summary: "Continuing through the alphabet.",
          lessons: [
            { id: "sad", title: "Sad (ص)", kind: "Drill" },
            { id: "dad", title: "Dad (ض)", kind: "Drill" },
            { id: "taa", title: "Taa (ط)", kind: "Drill" },
            { id: "zha", title: "Zha (ظ)", kind: "Drill" },
            { id: "ayn", title: "Ayn (ع)", kind: "Drill" },
            { id: "ghayn", title: "Ghayn (غ)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-4",
          title: "Letters in Quranic words, part 4",
          summary: "Continuing through the alphabet.",
          lessons: [
            { id: "fa", title: "Fa (ف)", kind: "Drill" },
            { id: "qaf", title: "Qaf (ق)", kind: "Drill" },
            { id: "kaf", title: "Kaf (ك)", kind: "Drill" },
            { id: "lam", title: "Lam (ل)", kind: "Drill" },
            { id: "meem", title: "Meem (م)", kind: "Drill" },
            { id: "noon", title: "Noon (ن)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-5",
          title: "Letters in Quranic words, part 5",
          summary: "The last letters of the alphabet.",
          lessons: [
            { id: "haa", title: "Haa (ه)", kind: "Drill" },
            { id: "waw", title: "Waw (و)", kind: "Drill" },
            { id: "ya", title: "Ya (ي)", kind: "Drill" },
          ],
        },
        {
          id: "review",
          title: "Review",
          summary: "Mix everything together.",
          lessons: [
            { id: "mixed-review", title: "Mixed review", kind: "Drill" },
            { id: "letter-hunt", title: "Letter hunt", kind: "Game" },
          ],
        },
      ],
    },
    {
      id: "harakat",
      tone: "blue",
      title: "Harakat",
      summary: "Short vowels: fatha, kasra, dumma.",
      glyph: "مَ",
      lessons: 7,
      sections: [
        {
          id: "fatha",
          title: "Fatha",
          summary: "The short a sound.",
          lessons: [
            { id: "fatha-basics", title: "Fatha basics", kind: "Lesson" },
            { id: "fatha-in-words", title: "Fatha in words", kind: "Drill" },
          ],
        },
        {
          id: "kasra",
          title: "Kasra",
          summary: "The short i sound.",
          lessons: [
            { id: "kasra-basics", title: "Kasra basics", kind: "Lesson" },
            { id: "kasra-in-words", title: "Kasra in words", kind: "Drill" },
          ],
        },
        {
          id: "dumma",
          title: "Dumma",
          summary: "The short u sound.",
          lessons: [
            { id: "dumma-basics", title: "Dumma basics", kind: "Lesson" },
            { id: "dumma-in-words", title: "Dumma in words", kind: "Drill" },
            {
              id: "all-three-together",
              title: "All three together",
              kind: "Drill",
            },
          ],
        },
      ],
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
