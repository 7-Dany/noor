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

// Noor Al-Bayan chapter structure from the founder. Titles and order are
// real; lesson counts without sections underneath are provisional until the
// content pass fills them in. Stable references, like MATERIALS.
const CHAPTERS: Record<string, readonly Chapter[]> = {
  "noor-al-bayan": [
    {
      id: "letters",
      tone: "terracotta",
      title: "Letters",
      summary: "The alphabet first: names, shapes, and sounds.",
      glyph: "ا",
      lessons: 2,
      sections: [
        {
          id: "first-steps",
          title: "First steps",
          summary: "Know the alphabet before you read it.",
          lessons: [
            { id: "alphabet", title: "The Alphabet", kind: "Lesson" },
            {
              id: "shapes-positions",
              title: "Shapes & Positions",
              kind: "Lesson",
            },
          ],
        },
      ],
    },
    {
      id: "letter-groups",
      tone: "blue",
      title: "Letters groups",
      summary:
        "Letters that look or sound alike, learned in groups so they stick.",
      glyph: "ب",
      lessons: 2,
      sections: [
        {
          id: "confusables",
          title: "Easily mixed letters",
          summary: "Side by side until the difference is obvious.",
          lessons: [
            { id: "similar-writing", title: "Similar Writing", kind: "Lesson" },
            {
              id: "similar-pronunciation",
              title: "Similar Pronunciation",
              kind: "Lesson",
            },
          ],
        },
      ],
    },
    {
      id: "ta-marbutah",
      tone: "rose",
      title: "Ta marbutah",
      summary: "The tied ta: how it sounds in joining and in pause.",
      glyph: "ة",
      lessons: 2,
    },
    {
      id: "letters-in-words",
      tone: "ink",
      title: "Letters in quranic words",
      summary: "Every letter drilled inside real Quranic words.",
      glyph: "ق",
      lessons: 29,
      sections: [
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
      id: "fatha-shapes",
      tone: "terracotta",
      title: "Fatha letters shapes",
      summary:
        "How each letter's shape carries a fatha, from first to last form.",
      glyph: "بَ",
      lessons: 3,
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
      id: "madd",
      tone: "rose",
      title: "Madd",
      summary: "Stretching sounds: alif, waw, yaa.",
      glyph: "و",
      lessons: 3,
    },
    {
      id: "tanween",
      tone: "ink",
      title: "Tanween",
      summary: "Double vowels: tanween fatha, kasra, dumma.",
      glyph: "مً",
      lessons: 3,
    },
    {
      id: "sukoon",
      tone: "terracotta",
      title: "Sukoon",
      summary: "Letters at rest: reading with sukoon.",
      glyph: "مْ",
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
      id: "two-hamza",
      tone: "rose",
      title: "Two Hamza",
      summary: "Hamzat al-wasl and hamzat al-qat: sounded or dropped.",
      glyph: "ء",
      lessons: 1,
    },
    {
      id: "two-lam",
      tone: "ink",
      title: "Two lam",
      summary: "Solar and lunar laam: when the laam melts into what follows.",
      glyph: "ل",
      lessons: 1,
    },
    {
      id: "arabic-passages",
      tone: "terracotta",
      title: "Arabic passages",
      summary: "Connected reading, passage by passage toward fluency.",
      glyph: "ع",
      lessons: 8,
    },
    {
      id: "general-topics",
      tone: "blue",
      title: "General topics",
      summary: "Extra topics for the teacher.",
      glyph: "ن",
      lessons: 2,
    },
    {
      id: "games",
      tone: "rose",
      title: "Games",
      summary: "Playful drills for the class.",
      glyph: "؟",
      lessons: 3,
    },
  ],
}

const NONE: readonly Chapter[] = []

// Materials without chapters yet return an empty list.
export function getChapters(materialId: string) {
  return CHAPTERS[materialId] ?? NONE
}
